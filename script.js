function moverFotos() {
  const fotos = document.querySelectorAll('.foto-romantica');
  const usadas = [];

  const mensagem = document.querySelector('.mensagem');
  const msgRect = mensagem.getBoundingClientRect();

  fotos.forEach(foto => {
    let tentativa = 0;
    let posicaoValida = false;
    let top, left;

    while (!posicaoValida && tentativa < 100) {
      tentativa++;

      const larguraFoto = foto.offsetWidth;
      const alturaFoto = foto.offsetHeight;

      top = Math.random() * (window.innerHeight - alturaFoto - 20);
      left = Math.random() * (window.innerWidth - larguraFoto - 20);

      const colideComMensagem =
        left + larguraFoto > msgRect.left &&
        left < msgRect.right &&
        top + alturaFoto > msgRect.top &&
        top < msgRect.bottom;

      const colideComOutra = usadas.some(pos => {
        const dx = pos.left - left;
        const dy = pos.top - top;
        return Math.sqrt(dx * dx + dy * dy) < larguraFoto;
      });

      if (!colideComMensagem && !colideComOutra) {
        posicaoValida = true;
      }
    }

    if (posicaoValida) {
      foto.style.left = `${left}px`;
      foto.style.top = `${top}px`;
      usadas.push({ left, top });
    }
  });
}

moverFotos();
setInterval(moverFotos, 3000);

// Efeito dos corações
function criarCoracoes() {
  const cores = ['#ffb6c1', '#ffe4e1', '#ffc0cb', '#f8bbd0'];
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = `${Math.random() * window.innerWidth}px`;
  heart.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
  heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}
setInterval(criarCoracoes, 300);

// Música e clique
const musica = document.getElementById('musica');
const btnMusica = document.getElementById('btn-musica');
const clickSound = document.getElementById('click-sound');

function tocarClique() {
  clickSound.currentTime = 0;
  clickSound.play();
}

btnMusica.addEventListener('click', () => {
  tocarClique();
  if (musica.paused) {
    musica.play().then(() => {
      btnMusica.textContent = '⏸ Pausar música';
    });
  } else {
    musica.pause();
    btnMusica.textContent = '▶️ Tocar música';
  }
});

// Tocar automaticamente com fallback
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    musica.volume = 0.5;
    musica.play().then(() => {
      btnMusica.textContent = '⏸ Pausar música';
    }).catch(() => {
      btnMusica.textContent = '▶️ Tocar música';
    });
  }, 500);
});
    

    function atualizarContador() {
    const dataInicial = new Date("2021-02-02T00:00:00");
    const agora = new Date();
    const diffMs = agora - dataInicial;

    const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diffMs / (1000 * 60)) % 60);
    const segundos = Math.floor((diffMs / 1000) % 60);

    const tempo = `${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
    document.getElementById("tempo-decorrido").textContent = tempo;
  }

  setInterval(atualizarContador, 1000);
  atualizarContador();