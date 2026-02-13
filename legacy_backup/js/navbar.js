
const menuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // lock scroll
});

closeMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.add('hidden');
  document.body.style.overflow = ''; // restore scroll
});

