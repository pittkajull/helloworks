const menu = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
menu?.addEventListener('click', () => {
  nav.classList.toggle('is-open');
  menu.classList.toggle('is-open');
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => nav?.classList.remove('is-open'));
});
