let productsArray = []

// Récupération données localStorage
for (var i = 0; i < localStorage.length; i++) {

    const products = localStorage.getItem(localStorage.key(i));
    
    const productObject = JSON.parse(products)
    
    productsArray.push(productObject)
}

/* La fonction renderStorage doit pouvoir afficher les informations 
demandées dans la fonction pour chaque produit se trouvant dans l'array*/
productsArray.forEach((product) => renderStorage(product))

function renderStorage(product) {
    // essayer juste d'afficher le localStorage
}