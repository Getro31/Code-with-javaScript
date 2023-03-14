export function ajoutListenersAvis() {
    const piecesElements = document.querySelectorAll(".fiches article button");

    for (let i = 0; i < piecesElements.length; i++) {
      piecesElements[i].addEventListener("click", async function (event) {
           /* ... */
          const id = event.target.dataset.id;
          const result = await fetch(/*`http://localhost:8081/pieces/${id}/avis`*/`https://jsonplaceholder.typicode.com/comments/${id}`);
          const avis = await result.json()
          console.log(avis);
          const pieceElement = event.target.parentElement;
          const avisElement = document.createElement("p");
          for (let i = 0; i < avis.length; i++) {
            avisElement.innerHTML += `${avis[i].name}: ${avis[i].body} <br>`;
          }
      });
      
    }
    
    
}
export function ajoutListenerEnvoyerAvis() {
  const formulaireAvis = document.querySelector(".formulaire-avis");
  formulaireAvis.addEventListener("submit", function (event) {
  /* ... */
  // Désactivation du comportement par défaut du navigateur
      event.preventDefault();
      // Création de l’objet du nouvel avis.
    const avis = {
      pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
      utilisateur: event.target.querySelector("[name=utilisateur").value,
      commentaire: event.target.querySelector("[name=commentaire]").value,
    };
    // Création de la charge utile au format JSON
     const chargeUtile = JSON.stringify(avis);
     // Appel de la fonction fetch avec toutes les informations nécessaires
      fetch("http://localhost:8081/avis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
      });
  });
}

