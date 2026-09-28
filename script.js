const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  nav.classList.toggle("is-open", open);
});

nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
    nav.classList.remove("is-open");
  }),
);

document.querySelector("#year").textContent = new Date().getFullYear();

const photos = [
  {
    src: "assets/resultado-1.jpg",
    alt: "Unhas ombré em branco e rosa com glitter",
    caption: "01 / OMBRÉ & BRILHO",
  },
  {
    src: "assets/resultado-2.jpg",
    alt: "Unhas nude com detalhes dourados",
    caption: "02 / DETALHES DOURADOS",
  },
  {
    src: "assets/resultado-3.jpg",
    alt: "Unhas vermelhas com nail art",
    caption: "03 / VERMELHO ATEMPORAL",
  },
  {
    src: "assets/resultado-4.jpg",
    alt: "Unhas francesinhas em branco e rosa",
    caption: "04 / FRANCESINHA MODERNA",
  },
  {
    src: "assets/resultado-5.jpg",
    alt: "Unhas vermelhas brilhantes em formato amendoado",
    caption: "05 / VERMELHO ELEGANTE",
  },
];

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxCount = document.querySelector(".lightbox-count");
let current = 0,
  previousFocus = null,
  touchStart = null;

function showPhoto(index) {
  current = (index + photos.length) % photos.length;
  const photo = photos[current];
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightboxCaption.textContent = photo.caption;
  lightboxCount.textContent = `${String(current + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;
}

function openLightbox(index) {
  previousFocus = document.activeElement;
  showPhoto(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  lightbox.querySelector(".lightbox-close").focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  lightboxImage.removeAttribute("src");
  previousFocus?.focus();
}

document
  .querySelectorAll(".gallery-item")
  .forEach((button) =>
    button.addEventListener("click", () =>
      openLightbox(Number(button.dataset.index)),
    ),
  );

lightbox
  .querySelector(".lightbox-close")
  .addEventListener("click", closeLightbox);
lightbox
  .querySelector(".prev")
  .addEventListener("click", () => showPhoto(current - 1));
lightbox
  .querySelector(".next")
  .addEventListener("click", () => showPhoto(current + 1));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showPhoto(current - 1);
  if (e.key === "ArrowRight") showPhoto(current + 1);
  if (e.key === "Tab") {
    const controls = [...lightbox.querySelectorAll("button")];
    const first = controls[0],
      last = controls[controls.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

lightbox.addEventListener(
  "touchstart",
  (e) => {
    touchStart = e.changedTouches[0].screenX;
  },
  { passive: true },
);

lightbox.addEventListener(
  "touchend",
  (e) => {
    if (touchStart === null) return;
    const delta = e.changedTouches[0].screenX - touchStart;
    if (Math.abs(delta) > 45) showPhoto(current + (delta < 0 ? 1 : -1));
    touchStart = null;
  },
  { passive: true },
);

const looks = [
  {
    src: "assets/resultado-4.jpg",
    alt: "Unhas francesinhas brancas e delicadas",
    title: "A beleza do essencial",
    description: "Francesinha moderna: leve, delicada e sempre atual.",
  },
  {
    src: "assets/resultado-2.jpg",
    alt: "Unhas nude com detalhes dourados",
    title: "Detalhes que encantam",
    description: "Base suave e traços dourados para um visual refinado.",
  },
  {
    src: "assets/resultado-3.jpg",
    alt: "Unhas vermelhas com acabamento brilhante",
    title: "Presença em cada detalhe",
    description:
      "Vermelho intenso e brilho para quem gosta de marcar presença.",
  },
];

const lookImage = document.querySelector("#look-image");
const lookTitle = document.querySelector("#look-title");
const lookDescription = document.querySelector("#look-description");
const lookNumber = document.querySelector("#look-number");
let lookTransition;

document.querySelectorAll(".look-option").forEach((button) =>
  button.addEventListener("click", () => {
    const index = Number(button.dataset.look);

    document.querySelectorAll(".look-option").forEach((option) => {
      const selected = option === button;
      option.classList.toggle("is-active", selected);
      option.setAttribute("aria-pressed", String(selected));
    });

    clearTimeout(lookTransition);
    lookImage.classList.add("is-changing");

    lookTransition = setTimeout(() => {
      const look = looks[index];
      lookImage.src = look.src;
      lookImage.alt = look.alt;
      lookTitle.textContent = look.title;
      lookDescription.textContent = look.description;
      lookNumber.textContent = `${String(index + 1).padStart(2, "0")} / 03`;
      lookImage.classList.remove("is-changing");
    }, 180);
  }),
);
