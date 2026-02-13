// ✅ Counter animation
function animateCounters() {
  const counters = document.querySelectorAll(".count");

  counters.forEach(counter => {
    let target = +counter.dataset.target;
    let value = 0;
    let increment = target / 90; // ~3 seconds

    function update() {
      value += increment;
      if (value < target) {
        counter.textContent = Math.floor(value);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    }
    update();
  });
}

window.addEventListener("load", animateCounters);

