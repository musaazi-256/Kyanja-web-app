
/* Core Values Section Animations */
  
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".core-card");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("opacity-100", "translate-y-0");
      e.target.style.transitionDelay = (e.target.dataset.delay || 0) + "ms";
      io.unobserve(e.target);
    });
  }, { threshold: 0.2 });

  cards.forEach((card, i) => {
    card.dataset.delay = i * 120; // stagger
    card.classList.add("opacity-0", "translate-y-6");
    io.observe(card);
  });
});
/* End Core Values Section Animations */