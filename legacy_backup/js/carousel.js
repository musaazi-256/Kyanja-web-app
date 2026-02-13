
(function () {
  const scroller = document.getElementById('clubs-scroll');
  const prev = document.getElementById('clubs-prev');
  const next = document.getElementById('clubs-next');
  if (!scroller || !prev || !next) return;

  const items = Array.from(scroller.querySelectorAll('li'));
  if (!items.length) return;

  // TUNABLES
  const THRESHOLD = 6;          // px movement before deciding intent
  const MIN_DRAG_DELTA = 1;     // minimal drag delta to apply (avoid micro jitter)
  const MOMENTUM_MULT = 260;    // px per (px/ms) multiplier for flick
  const MOMENTUM_CLAMP = 900;   // max flick px
  const SNAP_ANIM_MS = 360;     // snapping animation duration

  function step() {
    const first = items[0];
    const gap = parseFloat(getComputedStyle(first.parentElement).gap) || 16;
    return Math.round(first.getBoundingClientRect().width + gap);
  }

  function updateButtons() {
    prev.disabled = scroller.scrollLeft <= 5;
    next.disabled = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 5;
  }

  function snapToNearest(instant = false, extra = 0) {
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let best = null;
    let bestDist = Infinity;
    items.forEach(it => {
      const rect = it.getBoundingClientRect();
      const mid = it.offsetLeft + rect.width / 2;
      const d = Math.abs(mid - center);
      if (d < bestDist) { bestDist = d; best = mid; }
    });
    if (!best) return;
    const target = Math.max(0, Math.min(scroller.scrollWidth - scroller.clientWidth, best - scroller.clientWidth / 2 + extra));
    if (instant) {
      scroller.scrollLeft = Math.round(target);
      updateButtons();
      return;
    }
    // smooth scroll using rAF for consistent timing across browsers
    const start = scroller.scrollLeft;
    const delta = target - start;
    const startTime = performance.now();
    function animate(now) {
      const t = Math.min(1, (now - startTime) / SNAP_ANIM_MS);
      const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic-ish
      scroller.scrollLeft = start + delta * ease;
      if (t < 1) requestAnimationFrame(animate);
      else updateButtons();
    }
    requestAnimationFrame(animate);
  }

  // paddles
  prev.addEventListener('click', () => scroller.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => scroller.scrollBy({ left: step(), behavior: 'smooth' }));

  // wheel -> horizontal on desktop trackpads (keeps previous behavior)
  scroller.addEventListener('wheel', (e) => {
    if (!e.shiftKey && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      scroller.scrollBy({ left: e.deltaY, behavior: 'auto' });
    }
  }, { passive: false });

  // Keyboard
  scroller.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); scroller.scrollBy({ left: -step(), behavior: 'smooth' }); }
    if (e.key === 'ArrowRight') { e.preventDefault(); scroller.scrollBy({ left: step(), behavior: 'smooth' }); }
  });

  // Pointer / touch drag with intent detection + rAF update
  let isDown = false;
  let decided = false;
  let horizontalIntent = false;

  let sx = 0, sy = 0, startScroll = 0;
  let lastX = 0, lastT = 0, velocity = 0;
  let rafId = null;
  let pendingLeft = null;

  function applyPendingLeft() {
    if (pendingLeft == null) return;
    scroller.scrollLeft = pendingLeft;
  }

  function onPointerDown(e) {
    // support PointerEvent and TouchEvent via clientX/clientY
    const cx = e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX);
    const cy = e.clientY ?? (e.touches && e.touches[0] && e.touches[0].clientY);
    if (cx == null) return;
    isDown = true;
    decided = false;
    horizontalIntent = false;
    sx = cx; sy = cy;
    startScroll = scroller.scrollLeft;
    lastX = cx; lastT = performance.now();
    velocity = 0;
    scroller.classList.add('is-dragging');
    // capture pointer when available
    if (e.pointerId !== undefined && scroller.setPointerCapture) {
      try { scroller.setPointerCapture(e.pointerId); } catch (err) {}
    }
  }

  function onPointerMove(e) {
    if (!isDown) return;
    const cx = e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX);
    const cy = e.clientY ?? (e.touches && e.touches[0] && e.touches[0].clientY);
    if (cx == null) return;

    const dx = cx - sx;
    const dy = cy - sy;

    // decide: small threshold first to avoid accidental scrolls
    if (!decided) {
      if (Math.abs(dx) > THRESHOLD || Math.abs(dy) > THRESHOLD) {
        decided = true;
        horizontalIntent = Math.abs(dx) > Math.abs(dy);
      }
    }

    if (decided && horizontalIntent) {
      // prevent vertical page scroll only for horizontal intent
      if (e.cancelable) e.preventDefault();

      // use pendingLeft + rAF to avoid layout thrash
      const targetLeft = startScroll - dx;
      pendingLeft = Math.max(0, Math.min(scroller.scrollWidth - scroller.clientWidth, targetLeft));

      // velocity calculation
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      velocity = (lastX - cx) / dt; // px per ms
      lastX = cx; lastT = now;

      if (!rafId) {
        rafId = requestAnimationFrame(function stepRAF() {
          applyPendingLeft();
          rafId = null;
        });
      }
    } else {
      // vertical intent: allow default page scroll (do nothing)
    }
  }

  function onPointerUp(e) {
    if (!isDown) return;
    isDown = false;
    scroller.classList.remove('is-dragging');

    // release pointer capture
    if (e.pointerId !== undefined && scroller.releasePointerCapture) {
      try { scroller.releasePointerCapture(e.pointerId); } catch (err) {}
    }

    if (decided && horizontalIntent) {
      // flick momentum
      const flick = Math.max(-MOMENTUM_CLAMP, Math.min(MOMENTUM_CLAMP, velocity * MOMENTUM_MULT));
      snapToNearest(true, flick);
    } else {
      // if vertical or undecided, do nothing special
      // small snap to nearest so cards align if user slightly moved
      snapToNearest(true, 0);
    }
    pendingLeft = null;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }

  // attach pointer events (preferred)
  scroller.addEventListener('pointerdown', onPointerDown, { passive: true });
  window.addEventListener('pointermove', onPointerMove, { passive: false });
  window.addEventListener('pointerup', onPointerUp, { passive: true });

  // touch fallbacks just in case
  scroller.addEventListener('touchstart', onPointerDown, { passive: true });
  scroller.addEventListener('touchmove', onPointerMove, { passive: false });
  scroller.addEventListener('touchend', onPointerUp, { passive: true });

  // update buttons on scroll (throttle)
  let btnTimer = 0;
  scroller.addEventListener('scroll', () => {
    clearTimeout(btnTimer);
    btnTimer = setTimeout(updateButtons, 80);
  }, { passive: true });

  // center the first item initially
  function centerInitial() {
    const first = items[0];
    if (!first) return;
    const offset = Math.max(0, first.offsetLeft - (scroller.clientWidth - first.getBoundingClientRect().width) / 2);
    scroller.scrollLeft = offset;
    updateButtons();
  }

  // ensure focusable for keyboard
  scroller.tabIndex = 0;

  centerInitial();
  updateButtons();
})();