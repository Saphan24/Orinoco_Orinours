  /* Lien avec la page produit.html */

let detailPhoto = document.getElementById("detailPhoto");

const search = window.location.search;
const param = new URLSearchParams(search);
const id = param.get("id");
if(!localStorage.getItem("panier")){
    localStorage.setItem("panier", JSON.stringify([]));
}

/*Lien avec l'API */

fetch("http://localhost:3000/api/teddies/"+id)
.then(reponse => reponse.json())
.then(element => {
idTeddies(element);
})

function idTeddies(element) {
    console.log(element)

    /* FORMAT en euro des prix */
    const euro = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    });

    /* création produit.html photo */
    let detailContenuPhoto = document.createElement("div");
    let card = document.createElement("div");
    let cardBody = document.createElement("div");
    let photoLink = document.createElement("a");
    let photoProduit = document.createElement("img");

    /* Attribution des classes produit.html */
    detailContenuPhoto.setAttribute("class", "detail_contenu col-12 col-lg-6");
    card.setAttribute("class", "card bg-light mb-3");
    cardBody.setAttribute("class", "card-body");
    photoLink.setAttribute("href", "");
    photoProduit.setAttribute("class", "photo_produit img-fluid");
    photoProduit.setAttribute("src", element.imageUrl);

    /* Agencement des éléments produit.html */
    detailPhoto.appendChild(detailContenuPhoto);
    detailContenuPhoto.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(photoLink);
    photoLink.appendChild(photoProduit);

    /* création produit.html detailProduit */
    let detailProduit = document.createElement("div");
    let detailProduitCard = document.createElement("div");
    let detailProduitCardBody = document.createElement("div");
    let detailPrix = document.createElement("p");
    let detailOption = document.createElement("form");
    let detailOptionForm = document.createElement("div");
    let detailProduitColor = document.createElement("label");
    let detailProduitColorChoix = document.createElement("select");
    let detailSelectColor = document.createElement("option");
    let detailPanier = document.createElement("div");
    let detailAjoutPanier = document.createElement("a");
    let detailIconeAjoutPanier = document.createElement("i");


    /* Ajout d'attributs à produit.html */
    detailProduit.setAttribute("class", "detail_produit col-12 col-lg-6 add_to_cart_block");
    detailProduitCard.setAttribute("class", "card bg-light mb-3");
    detailProduitCardBody.setAttribute("class", "card-body");
    detailPrix.setAttribute("class", "price");
    detailOption.setAttribute("method", "get");
    detailOption.setAttribute("action", "panier.html");
    detailOptionForm.setAttribute("class", "form-group");
    detailProduitColor.setAttribute("for", "colors");
    detailProduitColorChoix.setAttribute("class", "custom-select");
    detailSelectColor.setAttribute("selected", " ");
    detailPanier.setAttribute("class", "form-group");
    detailAjoutPanier.setAttribute("class", "ajout_panier btn btn-success btn-lg btn-block text-uppercase");
    detailIconeAjoutPanier.setAttribute("class", "icone_chariot fa fa-shopping-cart");

    /* Création d'un menu déroulant de couleurs */
    element.colors.forEach(couleur => {
        const option = document.createElement("option");
        option.textContent = couleur;
        detailProduitColorChoix.appendChild(option);
    });

    /* Agencement des éléments dans produit.html */
    detailPhoto.appendChild(detailProduit);
    detailProduit.appendChild(detailProduitCard);
    detailProduitCard.appendChild(detailProduitCardBody);
    detailProduitCardBody.appendChild(detailPrix);
    detailProduitCardBody.appendChild(detailOption);
    detailOption.appendChild(detailOptionForm);
    detailOptionForm.appendChild(detailProduitColor);
    detailOptionForm.appendChild(detailProduitColorChoix);
    detailProduitColorChoix.appendChild(detailSelectColor);
    detailOption.appendChild(detailPanier);
    detailPanier.appendChild(detailAjoutPanier);
    detailAjoutPanier.appendChild(detailIconeAjoutPanier);

    /* Ajout de contenu aux balises produit.html */
    detailPrix.textContent = euro.format(element.price/100);
    detailProduitColor.textContent = 'Couleur';
    detailSelectColor.textContent = 'Selectionner';
    detailIconeAjoutPanier.textContent = ' AJOUTER AU PANIER ';
    
    /* Ajout de description au balise produit.html */

    let descriptionBlocProduit = document.createElement("div");
    let descriptionProduit = document.createElement("div");
    let descriptionProduitCard = document.createElement("div");
    let descriptionProduitCardHeader = document.createElement("div");
    let descriptionProduitCardBody = document.createElement("div");
    let descriptionProduitText = document.createElement("p");

    descriptionBlocProduit.setAttribute("class", "bloc_description row");
    descriptionProduit.setAttribute("class", "description_produit col-12");
    descriptionProduitCard.setAttribute("class", "description_card card border-light mb-3");
    descriptionProduitCardHeader.setAttribute("class", "description_card_header card-header bg-primary text-white text-uppercase");
    descriptionProduitCardBody.setAttribute("class", "card-body");
    descriptionProduitText.setAttribute("class", "card-text");

    detailPhoto.appendChild(descriptionBlocProduit);
    descriptionBlocProduit.appendChild(descriptionProduit);
    descriptionProduit.appendChild(descriptionProduitCard);
    descriptionProduitCard.appendChild(descriptionProduitCardHeader);
    descriptionProduitCard.appendChild(descriptionProduitCardBody);
    descriptionProduitCardBody.appendChild(descriptionProduitText);
    descriptionProduitCardHeader.textContent = "Description";
    descriptionProduitText.textContent = element.description;

    /* Ajout produit au panier */
    detailAjoutPanier.addEventListener("click", function(){
        const panier = JSON.parse(localStorage.getItem("panier"));
        panier.push(element);
        localStorage.setItem("panier", JSON.stringify(panier));
        console.log("Le produit a été ajouté au panier");
        alert("Cet article a été ajouté dans votre panier");
        location.reload();
    })
}
