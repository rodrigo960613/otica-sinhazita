/* =====================================================
  ÓTICA SINHAZITA - SCRIPT.JS
  Funções do menu mobile, carrossel e animações.
===================================================== */

/* =====================================================
  1. MENU MOBILE
===================================================== */
const hamburgerButton = document.getElementById("hamb");
const menu = document.getElementById("menu");

function toggleMobileMenu() {
  menu?.classList.toggle("open");
}

function closeMobileMenu() {
  menu?.classList.remove("open");
}

hamburgerButton?.addEventListener("click", toggleMobileMenu);

document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

/* =====================================================
  2. CARROSSEL DE AVALIAÇÕES
===================================================== */
const carousel = document.getElementById("carousel");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const dotsContainer = document.getElementById("dots");
const reviewCards = [...document.querySelectorAll(".review-card")];

let currentIndex = 0;

function getVisibleCardsCount() {
  return window.innerWidth < 900 ? 1 : 3;
}

function getCarouselStep() {
  if (!reviewCards.length) return 0;
  return reviewCards[0].offsetWidth + 30;
}

function getMaxIndex() {
  return Math.max(0, reviewCards.length - getVisibleCardsCount());
}

function updateDots() {
  [...dotsContainer.children].forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = Math.max(0, Math.min(index, getMaxIndex()));

  carousel.scrollTo({
    left: currentIndex * getCarouselStep(),
    behavior: "smooth",
  });

  updateDots();
}

function goToPreviousSlide() {
  goToSlide(currentIndex - 1);
}

function goToNextSlide() {
  const nextIndex = currentIndex >= getMaxIndex() ? 0 : currentIndex + 1;
  goToSlide(nextIndex);
}

function createDots() {
  dotsContainer.innerHTML = "";

  for (let index = 0; index <= getMaxIndex(); index++) {
    const dot = document.createElement("button");
    dot.ariaLabel = `Ir para avaliação ${index + 1}`;
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  }

  updateDots();
}

prevButton?.addEventListener("click", goToPreviousSlide);
nextButton?.addEventListener("click", goToNextSlide);

window.addEventListener("resize", () => {
  createDots();
  goToSlide(Math.min(currentIndex, getMaxIndex()));
});

createDots();
goToSlide(0);
setInterval(goToNextSlide, 4500);

/* =====================================================
  3. ANIMAÇÕES AO ROLAR A PÁGINA
===================================================== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

/* =====================================================
  4. LINK INÍCIO / VOLTAR AO TOPO
===================================================== */
document.querySelectorAll('a[href="#inicio"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    history.pushState(null, "", "#inicio");

    document.getElementById("inicio")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    closeMobileMenu();
  });
});
