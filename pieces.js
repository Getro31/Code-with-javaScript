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
}

const boutonTrier = document.querySelector(".btn-trier");
// Triage
boutonTrier.addEventListener("click", function () {
    // ...
    pieces.sort(function (a, b) {
        return a.prix - b.prix;
    });
    console.log(pieces);
});
//Filtrage
const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.prix <= 35;
   });
 });
// fonction map pour acceder a un attribut d'un objet 
const noms = pieces.map(piece => piece.nom);

//fonction splice pour supprimer des elements indésirable d'un liste
//on utilis la boucle "for" pour parcourir la liste

for(let i = pieces.length -1 ; i >= 0; i--){
   if(pieces[i].prix > 35){
       noms.splice(i,1)
   }
}
console.log(noms)
//Affichage de la liste d'elements restant 
//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
   const nomElement = document.createElement('li');
   nomElement.innerText = noms[i];
   abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
const sectionElements = document.querySelector('.abordables');
sectionElements.appendChild(abordablesElements);