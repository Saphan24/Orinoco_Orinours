/* Lien avec la page index HTML */

let listeProduit = document.getElementById("listeProduit");
let myPresentation = document.createElement('h2');
myPresentation.textContent = "Votre boutique en ligne d'ours en peluche faits à la main"
listeProduit.appendChild(myPresentation);

/*Lien avec l'API */

fetch("http://localhost:3000/api/teddies/")
.then(reponse => reponse.json())
.then(reponse => {
  console.log(reponse)
  reponse.forEach(element => {

    /* création structure index.html */

    const article = document.createElement('article');
    let photoPeluche = document.createElement('div');
    let descriptionPeluche = document.createElement('div');
    let imageUrl = document.createElement('img');
    let name = document.createElement('h3');
    let price = document.createElement('p');
    let bouton = document.createElement('button');

    /* Ajout d'attributs aux balises index.html */
    
    article.setAttribute("class", "présentation_peluche");
    photoPeluche.setAttribute("class", "photo_peluche");
    descriptionPeluche.setAttribute("class", "description_peluche");
    imageUrl.setAttribute("src", element.imageUrl);

    /* Contenues des balises index.html */
    
    name.textContent = element.name;
    price.textContent = element.price;
    imageUrl.textContent = element.imageUrl;
    bouton.textContent = "Détails";

    /* Agencement des éléments dans index.html */

    photoPeluche.appendChild(imageUrl);
    descriptionPeluche.appendChild(name);
    descriptionPeluche.appendChild(price);
    descriptionPeluche.appendChild(bouton);
      
    listeProduit.appendChild(article);
    article.appendChild(photoPeluche);
    article.appendChild(descriptionPeluche);
    photoPeluche.appendChild(imageUrl);

  });
})