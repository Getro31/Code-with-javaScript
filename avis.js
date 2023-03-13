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