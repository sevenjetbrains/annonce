/* ==========================================================================
   Petites Annonces — logique JavaScript
   - récupère les valeurs du formulaire
   - crée une carte d'annonce
   - sauvegarde dans le localStorage (les annonces restent après rechargement)
   - permet de supprimer une annonce ou de tout effacer
   ========================================================================== */

// --- On récupère les éléments de la page dont on a besoin -------------------
const form        = document.getElementById("annonce-form");
const grid        = document.getElementById("grid");
const emptyState  = document.getElementById("empty-state");
const counter     = document.getElementById("counter");
const clearAllBtn = document.getElementById("clear-all");
const formError   = document.getElementById("form-error");

const STORAGE_KEY = "annonces";

// Tableau qui contient toutes les annonces en mémoire
let annonces = charger();

// --- Chargement / sauvegarde -----------------------------------------------
function charger() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function sauvegarder() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(annonces));
}

// --- Affichage --------------------------------------------------------------
function afficher() {
  grid.innerHTML = "";

  // On affiche les plus récentes en premier
  annonces
    .slice()
    .reverse()
    .forEach((annonce) => grid.appendChild(creerCarte(annonce)));

  // Compteur + état vide
  const n = annonces.length;
  counter.textContent = n + " annonce" + (n > 1 ? "s" : "");
  emptyState.hidden = n > 0;
  clearAllBtn.hidden = n === 0;
}

// Construit une carte HTML à partir d'un objet annonce
function creerCarte(annonce) {
  const card = document.createElement("article");
  card.className = "card";

  card.innerHTML = `
    <span class="card-tag">${echapper(annonce.categorie)}</span>
    <h3 class="card-title">${echapper(annonce.titre)}</h3>
    <span class="card-price">${annonce.prix} €</span>
    ${annonce.description ? `<p class="card-desc">${echapper(annonce.description)}</p>` : ""}
    <div class="card-meta">
      <span>📍 ${echapper(annonce.ville)}</span>
      <button type="button" class="card-delete" data-id="${annonce.id}">Supprimer</button>
    </div>
  `;

  // Bouton supprimer de cette carte
  card.querySelector(".card-delete").addEventListener("click", () => {
    supprimer(annonce.id);
  });

  return card;
}

// --- Actions ----------------------------------------------------------------
function ajouter(annonce) {
  annonces.push(annonce);
  sauvegarder();
  afficher();
}

function supprimer(id) {
  annonces = annonces.filter((a) => a.id !== id);
  sauvegarder();
  afficher();
}

function toutEffacer() {
  if (confirm("Supprimer toutes les annonces ?")) {
    annonces = [];
    sauvegarder();
    afficher();
  }
}

// --- Soumission du formulaire ----------------------------------------------
form.addEventListener("submit", (event) => {
  event.preventDefault(); // on empêche le rechargement de la page

  const titre = form.titre.value.trim();
  const prix  = form.prix.value.trim();
  const ville = form.ville.value.trim();

  // Validation simple
  if (!titre || !prix || !ville) {
    formError.hidden = false;
    return;
  }
  formError.hidden = true;

  ajouter({
    id: Date.now(),            // identifiant unique basé sur l'heure
    titre: titre,
    prix: prix,
    ville: ville,
    categorie: form.categorie.value,
    description: form.description.value.trim(),
  });

  form.reset();
  form.titre.focus();
});

clearAllBtn.addEventListener("click", toutEffacer);

// --- Petite sécurité : on échappe le texte pour éviter d'injecter du HTML ---
function echapper(texte) {
  const div = document.createElement("div");
  div.textContent = texte;
  return div.innerHTML;
}

// --- Premier affichage au chargement de la page ----------------------------
afficher();
