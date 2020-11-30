let recapTableauPanier = document.getElementById("recap-panier");

let panier = JSON.parse(localStorage.getItem("panier"));
const product = [];
let total = 0;

if(panier != null && panier.length > 0) {

    document.getElementById("panier-vide").remove();

    /* Création de la structure du tableau panier */
    let recapTableau = document.createElement("table");
    let headerLineContent = document.createElement("thead");
    let lineArticle = document.createElement("tbody");
    let headerLineTab = document.createElement("tr");
    let colPhotoArticle = document.createElement("th");
    let colProduitNom = document.createElement("th");
    let colNomVide = document.createElement("th");
    let colPrix = document.createElement("th");
    let colDelArticle = document.createElement("th");

    /* Ajout d'attributs tableau de récapitulatif */
    recapTableau.setAttribute("class", "table table-striped");
    colPhotoArticle.setAttribute("scope", "mini-photo col");
    colProduitNom.setAttribute("scope", "article col");
    colNomVide.setAttribute("scope", "col");
    colPrix.setAttribute("scope", "article col");
    colPrix.setAttribute("class", "text-right");
    
    /* Mise en place de la structure */
    recapTableauPanier.appendChild(recapTableau);
    recapTableau.appendChild(headerLineContent);
    recapTableau.appendChild(lineArticle);
    headerLineContent.appendChild(headerLineTab);
    headerLineTab.appendChild(colPhotoArticle);
    headerLineTab.appendChild(colProduitNom);
    headerLineTab.appendChild(colNomVide);
    headerLineTab.appendChild(colPrix);
    headerLineTab.appendChild(colDelArticle);

    /* Entêtes du tableau */
    colPhotoArticle.textContent = "";
    colProduitNom.textContent = "Article";
    colNomVide.textContent = "";
    colPrix.textContent = "Prix";
    colDelArticle.textContent = "";

    console.log(panier);
    for (let i = 0; i < panier.length; i++) {
        product.push(panier[i]._id);
        const euro = new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        });

        console.log(i);
        
        /* Ajout des lignes articles au tableau  */
        let ligneArticle = document.createElement("tr");
        let lignePhotoArticle = document.createElement("td");
        let photoArticle = document.createElement("img");
        let nomArticle = document.createElement("td");
        let colVide = document.createElement("td");
        let prixArticle = document.createElement("td");
        let delArticle = document.createElement("td");
        let btDelArticle = document.createElement("button");
        let removeArticle = document.createElement("i");

        /* Ajout d'attributs aux lignes articles */
        ligneArticle.setAttribute("id", "article" + [i]);
        photoArticle.setAttribute("src", panier[i].imageUrl);
        photoArticle.setAttribute("width","50");
        photoArticle.setAttribute("height","50");
        
        prixArticle.setAttribute("class", "text-right");
        delArticle.setAttribute("class", "text-right");
        btDelArticle.setAttribute("class", "btn btn-sm btn-danger");
        btDelArticle.setAttribute("id", "corbeille");
        removeArticle.setAttribute("class", "fa fa-trash");

        /* Agencement structure panier.html */
        lineArticle.appendChild(ligneArticle); // <tr>
        ligneArticle.appendChild(lignePhotoArticle); // <td>
        lignePhotoArticle.appendChild(photoArticle); // <img>
        ligneArticle.appendChild(nomArticle);
        ligneArticle.appendChild(colVide);
        ligneArticle.appendChild(prixArticle);
        ligneArticle.appendChild(delArticle);
        delArticle.appendChild(btDelArticle);
        btDelArticle.appendChild(removeArticle);


        nomArticle.textContent = panier[i].name;
        console.log(panier[i].name);

        prixArticle.textContent = euro.format(panier[i].price/100);
        
        removeArticle.addEventListener("click", (event) => {this.deleteArticle(i);})

    };

    /* suppression ligne article */

    deleteArticle = (i) => {
        panier.splice(i, 1);
            localStorage.clear();
            localStorage.setItem("panier", JSON.stringify(panier));
            window.location.reload();
    };

    /* création de la ligne du tableau:  TOTAL */

    let ligneTotalArticle = document.createElement("tr");   
    let colLigneTotalArticle1 = document.createElement("td");
    let colLigneTotalArticle2 = document.createElement("td");   
    let colLigneTotalArticle3 = document.createElement("td");   
    let strongTotalArticle = document.createElement("strong");  
    let colLigneTotal = document.createElement("td");   
    let strongColLigneTotal = document.createElement("strong");
    let colLigneTotalArticle4 = document.createElement("td");

    /* Ajout d'attribut à la ligne Total */

    ligneTotalArticle.setAttribute("id", "ligne-total");
    colLigneTotalArticle3.setAttribute("class", "text-right");
    colLigneTotal.setAttribute("class", "text-right");
    colLigneTotal.setAttribute("id", "total");

    lineArticle.appendChild(ligneTotalArticle); 
    ligneTotalArticle.appendChild(colLigneTotalArticle1);
    ligneTotalArticle.appendChild(colLigneTotalArticle2);   
    ligneTotalArticle.appendChild(colLigneTotalArticle3);   
    colLigneTotalArticle3.appendChild(strongTotalArticle);  
    ligneTotalArticle.appendChild(colLigneTotal);   
    colLigneTotal.appendChild(strongColLigneTotal);
    ligneTotalArticle.appendChild(colLigneTotalArticle4);   


    strongTotalArticle.textContent = "TOTAL";

    /* FORMAT en euro des prix */
    const euro = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    });

    /* Calcul en addition du total */
    
    panier.forEach((panier) => {
        total += panier.price / 100;
    });

    /* Affichage prix total à payer */ 
    console.log(euro.format(total));
    strongColLigneTotal.textContent = euro.format(total);
};

/**************** FORMULAIRE DU PANIER *******************/

function verification() {
    
    /* Construction d'une expression régulière RegEx */
    let checkNumber = /[0-9]/;
    let checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/;
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let mail = document.getElementById("mail").value;
    let adresse = document.getElementById("adresse").value;
    let ville = document.getElementById("ville").value;

    if( nom == "" || checkNumber.test(nom) == true || checkSpecialCharacter.test(nom) == true ) {
        alert("Veuillez entrer votre nom!");
        return false;
    } else {
        console.log("nom OK");
    }
    if( prenom == "" || checkNumber.test(prenom) == true || checkSpecialCharacter.test(prenom) == true ) {
        alert("Veuillez entrer votre prenom!");
        return false;
    } else {
        console.log("prénom OK");
    }
    if( checkMail.test(mail) == false ) {
        alert("Veuillez entrer votre adresse électronique!");
        return false;
    } else {
        console.log("mail OK");
    }
    if( checkSpecialCharacter.test(adresse) == true || adresse == "" )  {
        alert("Veuillez vérifier les informations concernant votre adresse postale!");
        return false;
    } else {
        console.log("adresse OK");
    }
    if( checkSpecialCharacter.test(ville) == true || ville == "" || checkNumber.test(ville) == true )  {
        alert("Veuillez entrer votre ville correctement!");
        return false;
    } else {
        console.log("ville OK");
    }
    //Si le formulaire est bon => création de l'objet contact
    
    const contact = {
        lastName: nom,
        firstName: prenom,
        address: adresse,
        city: ville,
        email: mail,
    };
    return contact;
}


// Vérification du panier

function checkPanier() {
    /* verification du panier s'il y a 1 produit */
    let panier = JSON.parse(localStorage.getItem("panier"));
    
    /* Si le panier est vide ou null */
    if (panier.length < 1 || panier == null) { 
        alert("Votre panier est vide");
        console.log("Le panier est vide");
        return false;
    } else {
        console.log("Le panier n'est pas vide");
        return true;
    }
};

checkPanier();

function commander (){
    let url = 'http://localhost:3000/api/teddies/order';

    const formulaire = document.getElementById("formulaire");

    formulaire.addEventListener('submit', function (e) {
        e.preventDefault();
        const verif = verification();
        if(!verif){
            alert('Attention: \n Une erreur s\'est produite dans le formulaire');
            return;
        }
        console.log(verif, product);

        fetch( url, {
            method: 'POST', 
            body: JSON.stringify({products: product, contact: verif}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            sessionStorage.setItem("order", JSON.stringify(response));
            //window.location = "./confirmation.html";
            window.location.href = "confirmation.html?orderId=" + response.orderId + '&contact=' + response.contact.firstName + '&total=' + total;
        })
        .catch(error => alert(error));
        
    });
}
commander();












