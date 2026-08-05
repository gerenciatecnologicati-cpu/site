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
  if (window.innerWidth > 1180 && menu.classList.contains('aberto')) fecharMenu();
});

const mapa = document.getElementById('googleMapaCobertura');
const botoesCidade = Array.from(document.querySelectorAll('.cobertura-cidades button'));
botoesCidade.forEach((botao) => {
  botao.addEventListener('click', () => {
    const destino = botao.dataset.destino;
    mapa.src = 'https://www.google.com/maps?q=' + encodeURIComponent(destino) + '&output=embed';
    mapa.title = 'Mapa da cobertura da Tecnológica TI em ' + destino;
    botoesCidade.forEach((item) => item.classList.toggle('ativo', item === botao));
  });
});

document.getElementById('ano').textContent = new Date().getFullYear();
