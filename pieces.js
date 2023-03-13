import { ajoutListenersAvis } from "./avis.js";

// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();
//creation des elements 
/*const article = pieces[0];
const imageElement = document.createElement("img");
imageElement.src = article.image;
const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;
const prixElement = document.createElement("p");
prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
const categorieElement = document.createElement("p");
categorieElement.innerText = article.categorie ?? "(Aucune categories)";
const descriptionElement = document.createElement("p");
descriptionElement.innerText = article.description ?? "Pas de description pour le moment";
const disponibiliteElement = document.createElement("p");
disponibiliteElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
//attachement des elements child dessus a l'element parent fiches
const sectionFiches = document.querySelector(".fiches");
sectionFiches.appendChild(imageElement);
sectionFiches.appendChild(nomElement);
sectionFiches.appendChild(prixElement);
sectionFiches.appendChild(categorieElement);
sectionFiches.appendChild(descriptionElement);
sectionFiches.appendChild(disponibiliteElement);*/

 // article.prix < 35 ? "$" : "$$$"; pour faire un choix entre 2 possibilité
function genererList(pieces){
    for (let i = 0; i < pieces.length; i++) {

        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");
        // On crée l’élément img.
        const imageElement = document.createElement("img");
        // On accède à l’indice i de la liste pieces pour configurer la source de l’image.
        imageElement.src = pieces[i].image;
        // Idem pour le nom, le prix et la catégorie...
        const nomElement = document.createElement("h2");
        nomElement.innerText = pieces[i].nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = pieces[i].categorie ?? "(Aucune categories)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment";
        const disponibiliteElement = document.createElement("p");
        disponibiliteElement.innerText = pieces[i].disponibilite ? "En stock" : "Rupture de stock";
         //Code ajouté
         const avisBouton = document.createElement("button");
         avisBouton.dataset.id = pieces[i].id;
         avisBouton.textContent = "Afficher les avis";
        
        // On rattache la balise article à la section Fiches
        sectionFiches.appendChild(pieceElement);
        // On rattache l’image à pieceElement (la balise article)
        pieceElement.appendChild(imageElement);
        // Idem pour le nom, le prix et la catégorie...
        sectionFiches.appendChild(nomElement);
        sectionFiches.appendChild(prixElement);
        sectionFiches.appendChild(categorieElement);
        sectionFiches.appendChild(descriptionElement);
        sectionFiches.appendChild(disponibiliteElement);
            //Code aJouté
        pieceElement.appendChild(avisBouton);
    }
    ajoutListenersAvis();      
}
genererList(pieces);
const boutonTrier = document.querySelector(".btn-trier");
// Triage
boutonTrier.addEventListener("click", function () {
    // ...
    pieces.sort(function (a, b) {
        return a.prix - b.prix;
    });
    console.log(pieces);
    document.querySelector(".fiches").innerHTML = '';
    genererList(pieces);
});
//Filtrage
const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.prix >= 35;
   });
   document.querySelector(".fiches").innerHTML = '';
   genererList(piecesFiltrees);
 });
//decroissant
const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix;
     });
     console.log(piecesOrdonnees);
     document.querySelector(".fiches").innerHTML = '';
     genererList(piecesOrdonnees);
});

// Filtre pas de description
const boutonNoDescription = document.querySelector(".btn-nodesc");
boutonNoDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description == null;
    });
   console.log(piecesFiltrees);
   document.querySelector(".fiches").innerHTML = '';
   genererList(piecesFiltrees);
});
//

// fonction map pour acceder a un attribut d'un objet 
const noms = pieces.map(piece => piece.nom);
const descElement = pieces.map(piece => piece.description)
const prixElement = pieces.map(piece => piece.prix);
//fonction splice pour supprimer des elements indésirable d'un liste
//on utilis la boucle "for" pour parcourir la liste
//Affichage de la description des elements abordables
for(let i = pieces.length -1 ; i >= 0; i--){
   if(pieces[i].prix > 35){
       noms.splice(i,1);
       descElement.splice(i,1);
       prixElement.splice(i,1);
   }
}
console.log(noms);
console.log(descElement);
console.log(prixElement);
//Affichage de la liste d'elements restant 
//Création de la liste
const abordablesElements = document.createElement('ul');

//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
   const nomElement = document.createElement('li');
   nomElement.innerText =`${noms[i]} 
   - ${descElement[i] ?? "Pas de description"} 
   Prix : ${prixElement[i]} €`;
   abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
const sectionElements = document.querySelector('.abordables');
sectionElements.appendChild(abordablesElements);
//Filtre avec un inputRange
const prix_max = document.querySelector("#prix_max")
prix_max.addEventListener('input', function(){
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= prix_max.value;
    });
    document.querySelector(".fiches").innerHTML = '';
    genererList(piecesFiltrees);
});

