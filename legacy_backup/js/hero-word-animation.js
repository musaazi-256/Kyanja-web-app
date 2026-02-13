
// ✅ Word animation
document.addEventListener("DOMContentLoaded", () => {
  const words = document.querySelectorAll(".word");
  words.forEach((word, i) => {
    setTimeout(() => word.classList.add("fade"), 350 * i);
  });
});

