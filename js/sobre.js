const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

function fecharMenu() {
  menu.classList.remove('aberto');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
}

menuToggle.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  menuToggle.setAttribute('aria-expanded', String(aberto));
  menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
});

menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', fecharMenu));
document.addEventListener('click', (evento) => {
  if (menu.classList.contains('aberto') && !menu.contains(evento.target) && !menuToggle.contains(evento.target)) fecharMenu();
});
document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape' && menu.classList.contains('aberto')) {
    fecharMenu();
    menuToggle.focus();
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && menu.classList.contains('aberto')) fecharMenu();
});

document.getElementById('ano').textContent = new Date().getFullYear();
