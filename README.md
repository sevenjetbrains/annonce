# Petites Annonces

Petit projet HTML / CSS / JS pour s'entraîner avec **git**.
Une page où l'on publie des annonces via un formulaire ; elles s'affichent
dans une grille et sont sauvegardées dans le navigateur (localStorage).

## Lancer le projet

Ouvre simplement `index.html` dans ton navigateur. Aucune installation.

## Fichiers

| Fichier      | Rôle                                             |
|--------------|--------------------------------------------------|
| `index.html` | structure de la page (formulaire + liste)        |
| `style.css`  | mise en forme                                    |
| `script.js`  | logique : ajouter, afficher, supprimer, sauver   |

## Mémo git pour s'entraîner

Démarrer le dépôt :

```bash
git init
git add .
git commit -m "Premier commit : projet de base"
```

Le cycle de tous les jours :

```bash
git status              # voir ce qui a changé
git add script.js       # préparer un fichier précis (ou : git add .)
git commit -m "Ajoute la suppression d'une annonce"
git log --oneline       # voir l'historique
```

Travailler avec une branche :

```bash
git switch -c nouvelle-fonctionnalite   # créer + aller sur une branche
# ... tu fais tes modifications, add, commit ...
git switch main                          # revenir sur main
git merge nouvelle-fonctionnalite        # fusionner
```

Envoyer sur GitHub (une fois le dépôt distant créé) :

```bash
git remote add origin https://github.com/TON-PSEUDO/petites-annonces.git
git push -u origin main
```

## Idées de modifications (une par commit)

Parfait pour s'exercer : fais un petit changement, puis un commit.

1. Changer la couleur d'accent dans `style.css`.
2. Ajouter un champ « téléphone » dans le formulaire.
3. Ajouter une nouvelle catégorie.
4. Afficher la date de publication sur chaque carte.
5. Trier les annonces par prix.
