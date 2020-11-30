/* récuperation commande */
function recapOrder() {

    //const confirmation = document.getElementById("confirmation-commande");

    if (sessionStorage.getItem("order") != null) {
        let order = JSON.parse(sessionStorage.getItem("order"));
        firstName.innerHTML += "<strong>"+ order.contact.firstName + "</strong>";
        orderId.innerHTML += "<strong>"+ order.orderId + "</strong>";

        console.log(order);
        sessionStorage.removeItem("order");
    } else {
        alert("Merci pour votre commande. \n \n A bientôt");
        window.location = "./index.html";
    };
}
recapOrder();

const product =[];
let total = 0;
let panier = JSON.parse(localStorage.getItem("panier"));

function recapTabOrder () {

    const confirmationRecap = document.getElementById("confirmation-recap");

    const euro = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    });

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
    confirmationRecap.appendChild(recapTableau);
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
    
    /* Affichage commande effectuée */
    console.log(panier)
    for (let i = 0; i < panier.length; i++) {
        product.push(panier[i]._id);
                
        /* Création de la ligne article après validation d'achat en confirmation.html */
        let articleLineConfirm = document.createElement("tr");
        let articleLignePhotoConfirm = document.createElement("td");
        let articlePhotoConfirm = document.createElement("img");
        let articleNomConfirm = document.createElement("td");
        let articleColVide = document.createElement("td");
        let articlePrixConfirm = document.createElement("td");


        /* Attribution des class pour le css tableau de détail de commande confirmation.html */
        articleLineConfirm.setAttribute("id", "article_acheté id "+ i);
        articlePhotoConfirm.setAttribute("class", "photo_article_acheté");
        articlePhotoConfirm.setAttribute("src", panier[i].imageUrl);
        articlePhotoConfirm.setAttribute("width","50");
        articlePhotoConfirm.setAttribute("height","50");
        articlePhotoConfirm.setAttribute("alt", "miniature de l'article acheté");

        articlePrixConfirm.setAttribute("class", "text-right");

        /* Insertion dans le HTML */
        lineArticle.appendChild(articleLineConfirm);
        articleLineConfirm.appendChild(articlePhotoConfirm);
        articleLineConfirm.appendChild(articleNomConfirm);
        articleLineConfirm.appendChild(articleColVide);
        articleLineConfirm.appendChild(articlePrixConfirm);

        /* Contenu des lignes articles */

        articleNomConfirm.textContent = panier[i].name;
        articlePrixConfirm.textContent = euro.format(panier[i].price/100);
        
    };
    
    /* création de la ligne du tableau : Total */
    let articleLineTotalConfirm = document.createElement("tr");
    let colLigneArticleTotal1 = document.createElement("td");
    let colLigneArticleTotal2 = document.createElement("td");
    let articleStrongTotal = document.createElement("strong");  
    let articleColLigneTotal = document.createElement("td");   
    let strongColLigneTotal = document.createElement("strong");
    let colLigneArticleTotal3 = document.createElement("td");

    
    /* Ajout d'attributs à la ligne Total */
    articleLineTotalConfirm.setAttribute("id", "ligne-total-acheté");
    colLigneArticleTotal2.setAttribute("class", "text-right");
    articleColLigneTotal.setAttribute("class", "text-right");
    articleColLigneTotal.setAttribute("id", "TOTAL COMMANDE");
    lineArticle.appendChild(articleLineTotalConfirm);
    articleLineTotalConfirm.appendChild(colLigneArticleTotal1);
    articleLineTotalConfirm.appendChild(colLigneArticleTotal2);
    colLigneArticleTotal2.appendChild(articleStrongTotal);
    articleLineTotalConfirm.appendChild(articleColLigneTotal);
    articleColLigneTotal.appendChild(strongColLigneTotal);
    articleLineTotalConfirm.appendChild(colLigneArticleTotal3);

    articleStrongTotal.textContent = "TOTAL PAYÉ";

    
    //Calcule de l'addition total
    panier.forEach((panier) => {
        total += panier.price / 100;
    });
    
    //Affichage du prix total à payer dans l'addition
    console.log(euro.format(total));
    strongColLigneTotal.textContent = euro.format(total);
    
    localStorage.removeItem("panier");
    
}   
recapTabOrder();

