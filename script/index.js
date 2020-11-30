/* Lien vers la page index HTML */
/* création structure présentation produit peluche index.html */
//let présentation = document.getElementById("présentation");
let myPresentation = document.createElement('h2');


//let listeProduit = document.getElementById("listeProduit");
/*Lien avec l'API */
fetch("http://localhost:3000/api/teddies/")
.then(reponse => reponse.json())
.then(reponse => {
console.log(reponse)
reponse.forEach(element => {

    myPresentation.textContent = "Votre boutique en ligne d'ours en peluche faits à la main"
    présentation.appendChild(myPresentation);
    
    /* création structure pour index.html */
    let article = document.createElement('article');
    let photoPeluche = document.createElement('div');
    let card = document.createElement('a');
    let descriptionToutesPeluches = document.createElement('div');
    let imageUrl = document.createElement('img');
    let name = document.createElement('h3');
    let nameLink = document.createElement('a');
    let description = document.createElement('p');
    let price = document.createElement('h4');
    let bouton = document.createElement('a');
    let boutonDetails = document.createElement('p');
    
    /* création de la constance euro pour formater le nombre dans la devise de la France */
    const euro = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    });
    
    /* Ajout d'attributs aux balises index.html */
    
    article.setAttribute("class", "présentation_peluche col-lg-4 col-md-6 mb-4 mx-auto");
    photoPeluche.setAttribute("class", "photo_peluche card h-100");
    card.setAttribute("href","#");
    imageUrl.setAttribute("class", "card-img-top");
    imageUrl.setAttribute("src", element.imageUrl);
    descriptionToutesPeluches.setAttribute("class", "description_toutes_peluches card-body");
    name.setAttribute("class", "name card-title");
    nameLink.setAttribute("href", "#");
    description.setAttribute("class", "description card-text");
    boutonDetails.setAttribute("class", "bouton_détails text-center mb-auto");
    bouton.href = "produit.html?id=" + element._id;
    
    /* Contenues des balises index.html bloc-2-produit */
    
    name.textContent = element.name;
    price.textContent = euro.format(element.price/100);
    description.textContent = element.description;
    imageUrl.textContent = element.imageUrl;
    boutonDetails.textContent = "En savoir plus";
    
    /* Agencement des éléments dans index.html bloc-2-produit */
    listeProduit.appendChild(article);
    article.appendChild(photoPeluche);
    photoPeluche.appendChild(card);
    card.appendChild(imageUrl);
    photoPeluche.appendChild(descriptionToutesPeluches);
    descriptionToutesPeluches.appendChild(nameLink);
    nameLink.appendChild(name);
    descriptionToutesPeluches.appendChild(price);
    descriptionToutesPeluches.appendChild(description);
    descriptionToutesPeluches.appendChild(bouton);
    bouton.appendChild(boutonDetails);
    });
})
