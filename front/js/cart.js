// Get current cart

let cart = JSON.parse(localStorage.getItem('cart'))

// Récupération données localStorage
for(i in cart) {

	let cartItem = cart[i]

	var totalQuantity = 0
	var totalPrice = 0

	// Récuperation autres données via l'API
	fetch(`http://localhost:3000/api/products/${cartItem.id}`)
	.then((res) => res.json())
	.then((res) => {
		let product = res

		// Création éléments de la page
		const section = document.querySelector("#cart__items")

		const article = document.createElement("article")
		article.classList.add("cart__item")
		article.dataset.id = cartItem.id
		article.dataset.color = cartItem.color

		const divImage = document.createElement("div")
		divImage.classList.add("cart__item__img")
		const image = document.createElement("img")
		image.src = product.imageUrl
		image.alt = product.altTxt

		const divContent = document.createElement("div")
		divContent.classList.add("cart__item__content")

		const divDescription = document.createElement("div")
		divDescription.classList.add("cart__item__content__description")

		const productName = document.createElement("h2")
		productName.textContent = product.name
		const productColor = document.createElement("p")
		productColor.textContent = cartItem.color
		const productPrice = document.createElement("p")

		const divSettings = document.createElement("div")
		divSettings.classList.add("cart__item__content__settings")

		const divQty = document.createElement("div")
		divQty.classList.add("cart__item__content__settings__quantity")

		const pQty = document.createElement("p")
		pQty.innerText = "Quantité:"

		const inputQty = document.createElement("input")
		inputQty.type = "number"
		inputQty.classList.add("itemQuantity")
		inputQty.name = "itempQuantity"
		inputQty.min = "1"
		inputQty.max = "99"
		inputQty.value = cartItem.quantity

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
		
		// TotalQty et TotalPrice
		totalQuantity += Number(cartItem.quantity)
		totalPrice += Number(product.price * cartItem.quantity)
	
		document.getElementById("totalQuantity").innerHTML = totalQuantity
		document.getElementById("totalPrice").innerHTML = totalPrice

		// Modification quantity
		let inputs = document.querySelectorAll('.itemQuantity')
		for (let input of Array.from(inputs)) {
			input.addEventListener("change", event => {
				let indexId = event.target.getAttribute("data-id")
				let indexColor = event.target.getAttribute("data-color")
				let index = cart.findIndex(element => (element.id == indexId && element.color == indexColor))
				if(index != -1) {
				Number(cart[index].quantity) = Number(input.value)
				localStorage.setItem("cart", JSON.stringify(cart))
				location.reload()
				}
			})
		}

		// Supprimer un élément
		let buttons = document.querySelectorAll('.deleteItem')
  		for (let button of Array.from(buttons)) {
			button.addEventListener("click", event => {
				let indexId = event.target.getAttribute("data-id")
				let indexColor = event.target.getAttribute("data-color")
				let index = cart.findIndex(element => (element.id == indexId && element.color == indexColor))
				cart = cart.filter(cart => (!cart[index]))
				localStorage.setItem("cart", JSON.stringify(cart))
				location.reload()
			})
		}
	})
	.catch((err) => console.log(err))
}

// Envoi formulaire
// let postToServer = fetch("http://localhost:3000/api/products/order", {
// 	method: 'POST',
// 	headers: {
// 		'Accept': 'application/json', 
// 		'Content-Type': 'application/json'
// 	}
	
// }