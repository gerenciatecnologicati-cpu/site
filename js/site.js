// Tecnológica TI — interações do site

// ----- Menu mobile -----
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

menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    fecharMenu();
  });
});

document.addEventListener('click', (evento) => {
  if (menu.classList.contains('aberto') && !menu.contains(evento.target) && !menuToggle.contains(evento.target)) {
    fecharMenu();
  }
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

// ----- Logo: volta ao topo absoluto da página -----
document.querySelectorAll('a[href="#topo"]').forEach((link) => {
  link.addEventListener('click', (evento) => {
    evento.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// ----- Sombra no cabeçalho ao rolar -----
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('rolou', window.scrollY > 8);
}, { passive: true });

// ----- Carrosséis de banner (principal e secundário) -----
function montarCarrossel(seletorSlide, classeAtivo, caixaPontos, classePonto, intervaloMs) {
  const slides = Array.from(document.querySelectorAll(seletorSlide));
  const caixa = document.getElementById(caixaPontos);
  if (!slides.length || !caixa) return;

  let atual = 0;
  let timer = null;

  slides.forEach((_, i) => {
    const ponto = document.createElement('button');
    ponto.className = classePonto;
    ponto.setAttribute('role', 'tab');
    ponto.setAttribute('aria-label', 'Item ' + (i + 1));
    ponto.addEventListener('click', () => irPara(i));
    caixa.appendChild(ponto);
  });
  const pontos = Array.from(caixa.children);

  function irPara(i) {
    atual = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle(classeAtivo, k === atual));
    pontos.forEach((p, k) => p.classList.toggle(classePonto + '--ativo', k === atual));
    reiniciar();
  }

  function reiniciar() {
    clearInterval(timer);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timer = setInterval(() => irPara(atual + 1), intervaloMs);
    }
  }

  irPara(0);
}

montarCarrossel('.banner__slide', 'banner__slide--ativo', 'pontosBanner', 'banner__ponto', 7000);
montarCarrossel('.banner2__slide', 'banner2__slide--ativo', 'pontosBanner2', 'banner2__ponto', 9000);

// ----- Setas dos trilhos de cards -----
document.querySelectorAll('.trilho__seta').forEach((seta) => {
  seta.addEventListener('click', () => {
    const alvo = document.querySelector('[data-trilho="' + seta.dataset.seta + '"]');
    if (!alvo) return;
    const card = alvo.firstElementChild;
    const passo = card ? card.getBoundingClientRect().width + 24 : 300;
    alvo.scrollBy({ left: passo * Number(seta.dataset.dir), behavior: 'smooth' });
  });
});

// ----- Abas (cobertura/lojas e "o melhor de") -----
document.querySelectorAll('.abas').forEach((abas) => {
  const botoes = Array.from(abas.querySelectorAll('.abas__botao'));
  const paineis = Array.from(abas.parentElement.querySelectorAll(':scope > .abas__painel'));
  botoes.forEach((botao) => {
    botao.addEventListener('click', () => {
      botoes.forEach((b) => b.classList.toggle('abas__botao--ativo', b === botao));
      paineis.forEach((p) => p.classList.toggle('abas__painel--ativo', p.dataset.painel === botao.dataset.aba));
    });
  });
});

// ----- Busca: leva à seção correspondente -----
const mapaBusca = [
  { termos: ['plano', 'fibra', 'internet', 'mega', 'assinar', 'contratar', 'casa'], alvo: '#planos' },
  { termos: ['empresa', 'empresarial', 'dedicado', 'negocio', 'negócio'], alvo: '#planos-empresas' },
  { termos: ['tec tv', 'tectv', 'canal', 'canais', 'televis', 'filme', 'esporte', 'globo', 'sbt', 'espn', 'assistir'], alvo: '#tectv' },
  { termos: ['colocation', 'data center', 'datacenter', 'rack', 'mmr', 'transito', 'trânsito', 'operadora', 'isp'], alvo: '#colocation' },
  { termos: ['boleto', '2a via', '2ª via', 'fatura', 'comprovante', 'pagamento'], alvo: '#autoatendimento' },
  { termos: ['suporte', 'atendimento', 'central', 'whatsapp', 'app', 'aplicativo', 'ajuda'], alvo: '#atendimento' },
  { termos: ['cobertura', 'cidade', 'loja', 'endereco', 'endereço', 'santa maria', 'santana', 'coribe', 'sao felix', 'são félix'], alvo: '#cobertura' },
  { termos: ['consultoria', 'mitiga', 'ddos', 'engenharia', 'trafego', 'tráfego'], alvo: '#consultoria' },
  { termos: ['ipv4', 'bloco', 'bgp', 'asn', 'loa'], alvo: '#ipv4' },
  { termos: ['energia', 'economia', 'desconto', 'combo'], alvo: '#combo-energia' },
  { termos: ['mapa', 'link dedicado', 'rede'], alvo: '#mapa-rede' },
];

document.getElementById('formBusca').addEventListener('submit', (evento) => {
  evento.preventDefault();
  const consulta = document.getElementById('campoBusca').value.trim().toLowerCase();
  let destino = '#planos';
  for (const item of mapaBusca) {
    if (item.termos.some((t) => consulta.includes(t))) { destino = item.alvo; break; }
  }
  document.querySelector(destino).scrollIntoView({ behavior: 'smooth' });
});

// ----- Tec TV: principais canais da grade -----
const CANAIS_TECTV = [
  { n: 'Globo', c: 'abertos' },
  { n: 'SBT', c: 'abertos' },
  { n: 'Globo News', c: 'noticias' },
  { n: 'Record News', c: 'noticias' },
  { n: 'ESPN', c: 'esportes' },
  { n: 'TNT Sports', c: 'esportes' },
  { n: 'CazéTV', c: 'esportes' },
  { n: 'Space HD', c: 'filmes' },
  { n: 'Discovery Channel', c: 'docs' },
  { n: 'Discovery H&H', c: 'docs' },
  { n: 'Discovery Turbo', c: 'docs' },
  { n: 'TLC HD', c: 'docs' },
];

const gradeCanais = document.getElementById('gradeCanais');

function monograma(nome) {
  const palavras = nome.replace(/[^0-9A-Za-zÀ-ÿ ]/g, '').trim().split(/\s+/);
  let letras = palavras.slice(0, 2).map((p) => p[0]).join('');
  if (letras.length < 2 && palavras[0]) letras = palavras[0].slice(0, 2);
  return letras.toUpperCase();
}

// Nome de arquivo esperado em images/logos (ex.: "Globo News" -> globo-news.png)
function slugCanal(nome) {
  return nome.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

CANAIS_TECTV.forEach((canal) => {
  const tile = document.createElement('div');
  tile.className = 'canal canal--' + canal.c;
  const nome = document.createElement('span');
  nome.className = 'canal__nome';
  nome.textContent = canal.n;

  // Exibe o logo se o arquivo existir na pasta (tenta .svg, depois .png); senão, mantém o monograma
  const img = document.createElement('img');
  img.className = 'canal__logo-img';
  img.alt = '';
  const baseLogo = 'images/logos/' + slugCanal(canal.n);
  const extensoesLogo = ['.svg', '.png'];
  let tentativaLogo = 0;
  img.src = baseLogo + extensoesLogo[tentativaLogo];
  img.addEventListener('error', () => {
    tentativaLogo += 1;
    if (tentativaLogo < extensoesLogo.length) {
      img.src = baseLogo + extensoesLogo[tentativaLogo];
      return;
    }
    const mono = document.createElement('span');
    mono.className = 'canal__logo';
    mono.textContent = monograma(canal.n);
    img.replaceWith(mono);
  });

  tile.append(img, nome);
  gradeCanais.appendChild(tile);
});

// ----- Mapa da rede: destaque sincronizado entre mapa e lista + busca -----
const nosMapa = Array.from(document.querySelectorAll('.mapa__no'));
const itensMapa = Array.from(document.querySelectorAll('.mapa__lista li'));

function marcarCidade(id, ligado) {
  document.querySelectorAll('[data-cidade="' + id + '"]').forEach((el) => {
    el.classList.toggle('mapa--ativo', ligado);
  });
}

[...nosMapa, ...itensMapa].forEach((el) => {
  el.addEventListener('mouseenter', () => marcarCidade(el.dataset.cidade, true));
  el.addEventListener('mouseleave', () => marcarCidade(el.dataset.cidade, false));
  el.addEventListener('focus', () => marcarCidade(el.dataset.cidade, true));
  el.addEventListener('blur', () => marcarCidade(el.dataset.cidade, false));
});

// Clicar em um ponto do mapa abre as direções no Google Maps (como no mapa de referência)
const DESTINOS_MAPA = {
  smv: 'Santa Maria da Vitória, BA',
  sfc: 'São Félix do Coribe, BA',
  correntina: 'Correntina, BA',
  santana: 'Santana, BA',
  serradourada: 'Serra Dourada, BA',
  formoso: 'Colônia do Formoso, Santa Maria da Vitória, BA',
  cuscuzeiro: 'Cuscuzeiro, BA',
  porteiras: 'Porteiras de Santa Cruz, BA',
  canapolis: 'Canápolis, BA',
  bjl: 'Bom Jesus da Lapa, BA',
};

const googleMapa = document.getElementById('googleMapa');

function exibirCidadeNoGoogle(id) {
  const destino = DESTINOS_MAPA[id];
  if (!destino || !googleMapa) return;
  const consulta = encodeURIComponent(destino);
  googleMapa.src = 'https://www.google.com/maps?q=' + consulta + '&output=embed';
  googleMapa.title = 'Mapa de ' + destino;
  itensMapa.forEach((item) => item.classList.toggle('mapa--ativo', item.dataset.cidade === id));
}

itensMapa.forEach((item) => {
  item.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) return;
    exibirCidadeNoGoogle(item.dataset.cidade);
  });
});

nosMapa.forEach((no) => {
  no.addEventListener('click', () => {
    exibirCidadeNoGoogle(no.dataset.cidade);
  });
});

const buscaMapa = document.getElementById('buscaMapa');
buscaMapa.addEventListener('input', () => {
  const consulta = buscaMapa.value.trim().toLowerCase();
  itensMapa.forEach((item) => {
    const nome = item.textContent.toLowerCase();
    const some = consulta !== '' && !nome.includes(consulta);
    item.classList.toggle('mapa--oculto', some);
    const no = document.querySelector('.mapa__no[data-cidade="' + item.dataset.cidade + '"]');
    if (no) {
      no.classList.toggle('mapa--oculto', some);
      no.classList.toggle('mapa--ativo', consulta !== '' && !some);
    }
  });
});

// ----- Ano atual no rodapé -----
document.getElementById('ano').textContent = new Date().getFullYear();
