
const translations = {
  fr: {
    home:"Accueil",
    generator:"Générateur",
    about:"À propos",
    title:"Transformez vos idées en applications",
    subtitle:"Décrivez votre projet et découvrez les meilleures technologies pour le construire.",
    start:"Commencer maintenant →",
    generatorTitle:"Quel projet voulez-vous créer ?",
    generatorDesc:"Écrivez votre idée et notre assistant vous propose trois technologies.",
    ideaLabel:"Décrivez votre idée :",
    typeLabel:"Type de projet :",
    website:"Site web",
    mobile:"Application mobile",
    store:"Boutique en ligne",
    game:"Jeu vidéo",
    dashboard:"Tableau de bord",
    other:"Autre projet",
    generate:"✨ Générer mes technologies",
    recommendations:"Vos 3 technologies recommandées",
    codeTitle:"Votre code de départ",
    copy:"Copier le code",
    download:"↓ Télécharger le code"
  },

  ar: {
    home:"الرئيسية",
    generator:"مولّد المشاريع",
    about:"حول الأكاديمية",
    title:"حوّل أفكارك إلى تطبيقات",
    subtitle:"اكتب فكرة مشروعك واكتشف أفضل التقنيات لإنشائه.",
    start:"ابدأ الآن ←",
    generatorTitle:"ما المشروع الذي تريد إنشاءه؟",
    generatorDesc:"اكتب فكرتك وسيقترح عليك المساعد ثلاث تقنيات.",
    ideaLabel:"اشرح فكرة مشروعك:",
    typeLabel:"نوع المشروع:",
    website:"موقع إلكتروني",
    mobile:"تطبيق هاتف",
    store:"متجر إلكتروني",
    game:"لعبة فيديو",
    dashboard:"لوحة تحكم",
    other:"مشروع آخر",
    generate:"✨ أنشئ اقتراحات التقنيات",
    recommendations:"أفضل 3 تقنيات لمشروعك",
    codeTitle:"الأكواد الأولية لمشروعك",
    copy:"نسخ الكود",
    download:"↓ تحميل الأكواد"
  },

  en: {
    home:"Home",
    generator:"Generator",
    about:"About",
    title:"Turn your ideas into applications",
    subtitle:"Describe your project and discover the best technologies to build it.",
    start:"Start now →",
    generatorTitle:"What project do you want to create?",
    generatorDesc:"Write your idea and our assistant will suggest three technologies.",
    ideaLabel:"Describe your idea:",
    typeLabel:"Project type:",
    website:"Website",
    mobile:"Mobile application",
    store:"Online store",
    game:"Video game",
    dashboard:"Dashboard",
    other:"Other project",
    generate:"✨ Generate my technologies",
    recommendations:"Your 3 recommended technologies",
    codeTitle:"Your starter code",
    copy:"Copy code",
    download:"↓ Download code"
  }
};

const technologies = {
  website: [
    ["🌐","HTML","Structure des pages web."],
    ["🎨","CSS","Design et mise en page."],
    ["⚡","JavaScript","Interactions et fonctionnalités."]
  ],
  mobile: [
    ["⚛️","React Native","Développement mobile multiplateforme."],
    ["🟨","JavaScript","Logique de l'application."],
    ["🔥","Firebase","Authentification et données."]
  ],
  store: [
    ["🌐","HTML","Structure de la boutique."],
    ["🎨","CSS","Design de la boutique."],
    ["⚡","JavaScript","Panier et interactions."]
  ],
  game: [
    ["🎮","JavaScript","Logique du jeu."],
    ["🖼️","HTML Canvas","Affichage graphique."],
    ["🎨","CSS","Interface et menus."]
  ],
  dashboard: [
    ["🌐","HTML","Structure du tableau de bord."],
    ["🎨","CSS","Interface utilisateur."],
    ["⚡","JavaScript","Graphiques et interactions."]
  ],
  other: [
    ["🌐","HTML","Structure de l'application."],
    ["🎨","CSS","Design et présentation."],
    ["⚡","JavaScript","Fonctionnalités interactives."]
  ]
};

const starterCode = {
  html: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mon Projet</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <header>
    <h1>Bienvenue dans mon projet</h1>
  </header>

  <main>
    <h2>Mon application</h2>
    <p>Créé avec OUSSAMA ACADÉMIE.</p>
    <button id="action">Commencer</button>
  </main>

  <script src="script.js"><\/script>
</body>
</html>`,

  css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: #080d1c;
  color: white;
  text-align: center;
}

header {
  padding: 25px;
  background: #121c33;
}

main {
  padding: 60px 20px;
}

button {
  padding: 12px 25px;
  background: #8065ff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
}`,

  js: `const button = document.getElementById("action");

button.addEventListener("click", () => {
  alert("Bienvenue dans votre projet !");
});

console.log("Projet créé avec OUSSAMA ACADÉMIE");`
};

let currentCode = "html";
let currentProject = null;

function changeLanguage(lang) {
  const t = translations[lang];

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.body.classList.toggle("rtl",lang === "ar");

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if(t[key]) el.textContent = t[key];
  });

  document.getElementById("idea").placeholder =
    lang === "ar"
      ? "مثال: أريد إنشاء تطبيق للتجارة الإلكترونية..."
      : lang === "en"
      ? "Example: I want to create an online shopping app..."
      : "Exemple : Je veux créer une application de commerce en ligne...";

  document.getElementById("language").value = lang;

  document.getElementById("projectType").querySelectorAll("option").forEach(option => {
    const key = option.dataset.i18n;
    if(key && t[key]) option.textContent = t[key];
  });

  if(currentProject) renderResults();
}

function toggleMenu() {
  document.getElementById("nav").classList.toggle("open");
}

function generateProject() {
  const idea = document.getElementById("idea").value.trim();
  const type = document.getElementById("projectType").value;

  const lang = document.getElementById("language").value;

  if(!idea) {
    document.getElementById("error").textContent =
      lang === "ar" ? "يرجى كتابة فكرة مشروعك أولاً." :
      lang === "en" ? "Please describe your project first." :
      "Veuillez décrire votre projet.";
    return;
  }

  document.getElementById("error").textContent = "";

  currentProject = {
    idea,
    type,
    technologies: technologies[type]
  };

  renderResults();

  document.getElementById("results").classList.remove("hidden");
  document.getElementById("results").scrollIntoView({
    behavior:"smooth"
  });
}

function renderResults() {
  if(!currentProject) return;

  const lang = document.getElementById("language").value;

  const descriptions = {
    ar: [
      "تقنية لبناء هيكل المشروع.",
      "تقنية لتصميم واجهة المشروع.",
      "تقنية لإضافة الوظائف والتفاعل."
    ],
    fr: [
      "Technologie pour structurer le projet.",
      "Technologie pour concevoir l'interface.",
      "Technologie pour ajouter les fonctionnalités."
    ],
    en: [
      "Technology for the project structure.",
      "Technology for the user interface.",
      "Technology for interactive features."
    ]
  };

  const grid = document.getElementById("technologyList");

  grid.innerHTML = "";

  currentProject.technologies.forEach((tech,i) => {
    const card = document.createElement("div");
    card.className = "tech-card";

    const icon = document.createElement("div");
    icon.className = "tech-icon";
    icon.textContent = tech[0];

    const title = document.createElement("h3");
    title.textContent = tech[1];

    const desc = document.createElement("p");
    desc.textContent = descriptions[lang][i];

    card.append(icon,title,desc);
    grid.appendChild(card);
  });

  showCode(currentCode);
}

function showCode(type,button) {
  currentCode = type;

  document.getElementById("codeOutput").textContent =
    starterCode[type];

  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });

  if(button) button.classList.add("active");
  else {
    document.querySelectorAll(".tab").forEach(tab => {
      if(tab.textContent.toLowerCase().includes(type)) {
        tab.classList.add("active");
      }
    });
  }
}

async function copyCode() {
  const code = starterCode[currentCode];

  try {
    await navigator.clipboard.writeText(code);
    alert("Code copié avec succès !");
  } catch {
    alert("Impossible de copier automatiquement. Sélectionnez le code manuellement.");
  }
}

function downloadProject() {
  const files = [
    ["index.html",starterCode.html],
    ["style.css",starterCode.css],
    ["script.js",starterCode.js]
  ];

  files.forEach(([name,content]) => {
    const blob = new Blob([content], {
      type:"text/plain;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = name;
    a.click();

    URL.revokeObjectURL(url);
  });
}

changeLanguage("fr");
