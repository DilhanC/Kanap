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


// Affichage du localStorage
function renderStorage(product) {

    // Création éléments de la page
    const section = document.querySelector("#cart__items")

    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = product.id
    article.dataset.color = product.color

    const divImage = document.createElement("div")
    divImage.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = product.imageURL
    image.alt = product.altTxt

    const divContent = document.createElement("div")
    divContent.classList.add("cart__item__content")

    const divDescription = document.createElement("div")
    divDescription.classList.add("cart__item__content__description")

    const productName = document.createElement("h2")
    const productColor = document.createElement("p")
    productColor.textContent = product.color
    const productPrice = document.createElement("p")

    const divSettings = document.createElement("div")
    divSettings.classList.add("cart__item__content__settings")

    const divQty = document.createElement("div")
    divQty.classList.add("cart__item__content__settings__quantity")

    const pQty = document.createElement("p")
    pQty.innerText = "Qté:" +" "

    const inputQty = document.createElement("input")
    inputQty.type = "number"
    inputQty.classList.add("itemQuantity")
    inputQty.name = "itempQuantity"
    inputQty.min = "1"
    inputQty.max = "100"
    inputQty.value = product.quantity

    const divDelete = document.createElement("div")
    divDelete.classList.add("cart__item__content__setting__delete")

    const pDelete = document.createElement("p")
    pDelete.classList.add("deleteItem")
    pDelete.innerText = "Supprimer"

    section.appendChild(article)
    article.appendChild(divImage)
    article.appendChild(divContent)

    divImage.appendChild(image)

    divContent.appendChild(divDescription)
    divDescription.appendChild(productName)
    divDescription.appendChild(productColor)
    divDescription.appendChild(productPrice)

    divContent.appendChild(divSettings)
    divSettings.appendChild(divQty)
    divQty.appendChild(pQty)
    divQty.appendChild(inputQty)

    divSettings.appendChild(divDelete)
    divDelete.appendChild(pDelete)

    
    // Récuperation autres données via l'API
    fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((kanaps) => otherData(kanaps))
	  .catch((err) => console.log(err))


}