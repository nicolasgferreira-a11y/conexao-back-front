document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.getElementById('inicio');
  const parallaxBg = document.getElementById('hero-parallax-bg');

  // Encerra caso os elementos não existam na página
  if (!heroSection || !parallaxBg) return;

  // Velocidade do parallax (valores entre 0.35 e 0.50 deixam o efeito bem visível)
  const velocidade = 0.45;
  let ticking = false;

  function atualizarParallax() {
    const rect = heroSection.getBoundingClientRect();

    // Só calcula o movimento enquanto a seção Hero estiver visível na tela (melhora performance)
    if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
      const scrollY = window.scrollY || window.pageYOffset;
      const deslocamento = (scrollY - heroSection.offsetTop) * velocidade;
      parallaxBg.style.transform = `translate3d(0, ${deslocamento.toFixed(2)}px, 0)`;
    }

    ticking = false;
  }

  function aoRolar() {
    if (!ticking) {
      window.requestAnimationFrame(atualizarParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', aoRolar, { passive: true });
  window.addEventListener('resize', aoRolar, { passive: true });

  // Executa uma vez ao carregar para posicionar corretamente
  atualizarParallax();
});