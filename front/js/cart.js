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
		inputQty.addEventListener("change", event => {
			let index = cart.findIndex(element => (element.id == cartItem.id && element.color == cartItem.color))
			if(index != -1) {
				cart[index].quantity = Number(inputQty.value)
				localStorage.setItem("cart", JSON.stringify(cart))
				location.reload()
			}
		})

		// Supprimer un élément
		pDelete.addEventListener("click", event => {
			let index = cart.findIndex(element => (element.id == cartItem.id && element.color == cartItem.color))
			cart.splice(index, 1);
			localStorage.setItem("cart", JSON.stringify(cart))
			location.reload()
		})
	})
	.catch((err) => console.log(err))
}

// Envoi formulaire
document.querySelector("#order").addEventListener("click", function (e) {
	let valid = true
	for (let input of document.querySelectorAll(".cart__order__form__question")) {
		if (input.reportValidity() != valid) {
			alert("Veuillez vérifier les informations du formulaire")
		}
		else {
			const result = fetch("http://localhost:3000/api/products/order", {
				method: 'POST',
				headers: {
					'Accept': 'application/json', 
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					contact: {
						firstName: document.getElementById("firstName").value,
						lastName: document.getElementById("lastName").value,
						address: document.getElementById("address").value,
						city: document.getElementById("city").value,
						email: document.getElementById("email").value,
						},
					products: cart,
				})	
			})
			result.then((res) => res.json())
			.then((res) => {
				window.location.href = `confirmation.html?id=${res.orderId}`
				// localStorage.clear()
			})
		}
	}
})