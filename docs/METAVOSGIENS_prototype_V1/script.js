const DATA = {
  visible: {
    kicker: "Être visible",
    title: "Être visible",
    questions: [
      "Vous n'avez pas encore de site ?",
      "Votre site ne vous apporte pas assez de contacts ?",
      "On ne vous trouve pas suffisamment sur Google ?"
    ],
    description: "Nous construisons une présence en ligne adaptée à votre activité.",
    tags: ["Site","Google","SEO local","Conversion"],
    cta: "Parler de ma situation"
  },
  time: {
    kicker: "Gagner du temps",
    title: "Gagner du temps",
    questions: [
      "Vous faites encore trop de choses à la main ?",
      "Vos équipes ressaisissent les mêmes informations ?",
      "Vos outils ne communiquent pas entre eux ?"
    ],
    description: "Nous simplifions vos processus et automatisons ce qui peut l'être.",
    tags: ["Automatisation","Intégration","Données","Processus"],
    cta: "Identifier ce que je peux simplifier"
  },
  grow: {
    kicker: "Développer",
    title: "Développer",
    questions: [
      "Vous manquez de prospects ?",
      "Votre acquisition est trop artisanale ?",
      "Vous ne savez pas où vous perdez vos clients ?"
    ],
    description: "Nous structurons votre acquisition pour vous aider à trouver et convertir davantage de clients.",
    tags: ["Prospection","Acquisition","Contenu","Conversion"],
    cta: "Parler de mon acquisition"
  },
  evolve: {
    kicker: "Faire évoluer",
    title: "Faire évoluer",
    questions: [
      "Vos outils ne suivent plus votre entreprise ?",
      "Vous voulez intégrer l'IA mais ne savez pas comment ?",
      "Aucun logiciel ne correspond vraiment à votre métier ?"
    ],
    description: "Nous concevons la solution adaptée à votre façon de travailler.",
    tags: ["IA","Applications","Outils métier","Sur mesure"],
    cta: "Parler de mon projet"
  }
};

const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("overlayClose");

function openOverlay(key){
  const d = DATA[key];
  document.getElementById("overlayKicker").textContent = d.kicker;
  document.getElementById("overlayTitle").textContent = d.title;
  document.getElementById("overlayDescription").textContent = d.description;
  document.getElementById("overlayCta").innerHTML = `${d.cta} <span>→</span>`;
  document.getElementById("overlayQuestions").innerHTML = d.questions.map((q,i) =>
    `<div class="question"><i>${i+1}</i><span>${q}</span></div>`
  ).join("");
  document.getElementById("overlayTags").innerHTML = d.tags.map(t => `<span class="tag">${t}</span>`).join("");
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden","false");
  closeBtn.focus();
  document.body.style.overflow = "hidden";
}
function closeOverlay(){
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}
document.querySelectorAll(".door-card").forEach(btn => btn.addEventListener("click", () => openOverlay(btn.dataset.door)));
closeBtn.addEventListener("click", closeOverlay);
document.querySelector(".overlay-backdrop").addEventListener("click", closeOverlay);
document.addEventListener("keydown", e => { if(e.key === "Escape") closeOverlay(); });

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobileMenu");
menuToggle.addEventListener("click", () => {
  const open = !mobileMenu.classList.contains("open");
  mobileMenu.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});
mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded","false");
}));
