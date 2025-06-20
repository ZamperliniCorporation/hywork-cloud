document.addEventListener("DOMContentLoaded", function () {
  const text = "A maneira mais inteligente de criar sua intranet";
  const element = document.querySelector("#typing-text span");
  const fadeMenu = document.querySelector(".fade-in-menu");
  const gif = document.querySelector(".fade-gif");
  const paragraph = document.querySelector(".fade-paragraph");
  const button = document.querySelector(".fade-button");

  const menuLateral = document.querySelector(".menu-lateral");
  const menuItems = document.querySelectorAll(".menu-item");
  const contentItems = document.querySelectorAll(".conteudo-item");

  const ctaTypingEl = document.querySelector("#cta-typing span");
  const ctaTextEl = document.querySelector(".cta-text");
  const ctaBtn = document.querySelector(".cta-btn");
  const ctaLogo = document.querySelector(".cta-logo");
  const menuToggle = document.getElementById("menu-toggle");
  const menuNav = document.querySelector(".menu");


  if (menuToggle && menuNav) {
  menuToggle.addEventListener("click", () => {
    menuNav.classList.toggle("open");
  });
}

  let index = 0;

  if (fadeMenu) {
    fadeMenu.classList.add("show");
  }

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;

      if (index === 10 && gif) gif.classList.add("show");
      if (index === 28 && paragraph) paragraph.classList.add("show");
      if (index === 37 && button) button.classList.add("show");

      setTimeout(type, 50);
    }
  }

  setTimeout(type, 400);

  function handleModelosFade() {
    const modelos = document.querySelectorAll(".section-modelos .modelo-item");
    const windowBottom = window.innerHeight + window.scrollY;
    const sectionTop = document.querySelector(".section-modelos")?.getBoundingClientRect().top + window.scrollY;

    if (windowBottom > sectionTop + 100) {
      modelos.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add("show");
        }, 150 * i);
      });
    }
  }

  function handlePrecosFade() {
    const planos = document.querySelectorAll(".section-precos .plano-card");
    const windowBottom = window.innerHeight + window.scrollY;
    const sectionTop = document.querySelector(".section-precos")?.getBoundingClientRect().top + window.scrollY;

    if (windowBottom > sectionTop + 100) {
      planos.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add("show");
        }, 200 * i);
      });
    }
  }

  function handleScrollAnimation() {
    const fadeLeft = document.querySelectorAll(".fade-left");
    const fadeRight = document.querySelectorAll(".fade-right");
    const fadeUps = document.querySelectorAll(".fade-up");
    const windowBottom = window.innerHeight + window.scrollY;

    [...fadeLeft, ...fadeRight, ...fadeUps].forEach((el) => {
      const elementTop = el.getBoundingClientRect().top + window.scrollY;
      if (windowBottom > elementTop + 100) el.classList.add("show");
    });
  }

  function handleLiberdadeFade() {
    const texto = document.querySelector(".fade-liberdade-texto");
    const botoes = document.querySelectorAll(".fade-liberdade-botoes .fade-up");
    const botaoFinal = document.querySelector(".fade-liberdade-botao");
    const windowBottom = window.innerHeight + window.scrollY;

    if (texto && botaoFinal) {
      const topTexto = texto.getBoundingClientRect().top + window.scrollY;
      if (windowBottom > topTexto + 80 && !texto.classList.contains("show")) {
        texto.classList.add("show");
        botoes.forEach((btn, i) =>
          setTimeout(() => btn.classList.add("show"), 150 * i)
        );
        setTimeout(() => botaoFinal.classList.add("show"), 150 * botoes.length + 200);
      }
    }
  }

  function handleRecursosFade() {
    const titulo = document.querySelector(".fade-recursos-titulo");
    const cards = document.querySelectorAll(".section-recursos .card-inner.fade-up");
    const windowBottom = window.innerHeight + window.scrollY;

    if (titulo) {
      const topTitulo = titulo.getBoundingClientRect().top + window.scrollY;
      if (windowBottom > topTitulo + 80 && !titulo.classList.contains("show")) {
        titulo.classList.add("show");
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add("show");
            setTimeout(() => {
              card.classList.add("jump");
              setTimeout(() => card.classList.remove("jump"), 500);
            }, 300);
          }, 150 * i);
        });
      }
    }
  }

  function updateActiveLine() {
    const activeItem = document.querySelector(".menu-item.active");
    if (activeItem) {
      const activeIndex = activeItem.getAttribute("data-index");
      menuLateral.className = "menu-lateral active-index-" + activeIndex;
    } else {
      menuLateral.className = "menu-lateral active-index-0";
    }
  }

  function activateMenuByIndex(i) {
    if (i < 0 || i >= menuItems.length) return;
    menuItems.forEach((item) => item.classList.remove("active"));
    contentItems.forEach((c) => c.classList.remove("active"));
    menuItems[i].classList.add("active");
    contentItems[i].classList.add("active");
    updateActiveLine();
  }

  updateActiveLine();

  let currentIndex = 0;
  let autoRotate = setInterval(() => {
    currentIndex = (currentIndex + 1) % menuItems.length;
    activateMenuByIndex(currentIndex);
  }, 4000);

  menuItems.forEach((item, i) => {
    item.addEventListener("click", () => {
      activateMenuByIndex(i);
      clearInterval(autoRotate);
    });
  });

  function typeCtaText() {
    const ctaText = "Pronto para transformar sua forma de comunicar?";
    let i = 0;
    function typingStep() {
      if (i < ctaText.length) {
        ctaTypingEl.textContent += ctaText.charAt(i);
        i++;
        setTimeout(typingStep, 50);
      } else {
        if (ctaTextEl) setTimeout(() => ctaTextEl.classList.add("show"), 300);
        if (ctaBtn) setTimeout(() => ctaBtn.classList.add("show"), 800);
        if (ctaLogo) setTimeout(() => ctaLogo.classList.add("show"), 1000);
      }
    }
    typingStep();
  }

  function handleCtaFade() {
    const ctaSection = document.querySelector(".cta-final");
    if (!ctaSection || !ctaTypingEl || ctaTypingEl.textContent.length > 0) return;
    const ctaTop = ctaSection.getBoundingClientRect().top + window.scrollY;
    if (window.innerHeight + window.scrollY > ctaTop + 80) {
      typeCtaText();
    }
  }

  window.addEventListener("scroll", () => {
    handleScrollAnimation();
    handleLiberdadeFade();
    handleRecursosFade();
    handleModelosFade();
    handlePrecosFade();
    handleCtaFade();
  });

  window.addEventListener("load", () => {
    handleScrollAnimation();
    handleLiberdadeFade();
    handleRecursosFade();
    handleModelosFade();
    handlePrecosFade();
    handleCtaFade();
  });

  handleScrollAnimation();
  handleLiberdadeFade();
  handleRecursosFade();
  handleModelosFade();
  handlePrecosFade();
  handleCtaFade();

  // Abrir e fechar modal de demonstração
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modal-close');
  const openModalButtons = document.querySelectorAll('.open-modal');

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  });

  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });
});
