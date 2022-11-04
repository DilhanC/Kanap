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
		inputQty.addEventListener("input", event => {
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
document.querySelector("#order").addEventListener("click", function(event) {
	event.preventDefault()
	if(validateForm() === true) {
		// On prépare le tableau d'IDs
		let productsIds = []
		for(i in cart) {
			productsIds.push(cart[i].id)
		}

		// On envoie la requête
		fetch("http://localhost:3000/api/products/order", {
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
				products: productsIds,
			})
		})
		.then((res) => res.json())
		.then((res) => {
			console.log(res)
			window.location.href = `confirmation.html?orderId=${res.orderId}`
		})
		.catch((err) => {
			console.log(err)
		});
	}
})

function validateForm() {
	let isValid = true

	// Validation du firstName
	let firstNameInput = document.getElementById('firstName')
	let firstNameError = document.getElementById('firstNameErrorMsg')
	let firstNameRegex = new RegExp("^[a-zA-ZÀ-ÿ ,'.-]+$")
	if(firstNameRegex.test(firstNameInput.value)) {
		firstNameError.textContent = ""
	}
	else {
		firstNameError.textContent = "Le nom est invalide"
		isValid = false
	}

	// Validation du lastName
	let lastNameInput = document.getElementById('lastName')
	let lastNameError = document.getElementById('lastNameErrorMsg')
	let lastNameRegex = new RegExp("^[a-zA-ZÀ-ÿ ,'.-]+$")
	if(lastNameRegex.test(lastNameInput.value)) {
		lastNameError.textContent = ""
	}
	else {
		lastNameError.textContent = "Le prénom est invalide"
		isValid = false
	}

	// Validation du address
	let adressInput = document.getElementById('address')
	let adressError = document.getElementById('addressErrorMsg')
	let adressRegex = new RegExp("^[0-9]{1,3}[a-zA-Zéêëèîïâäçù ,'-]+$")
	if(adressRegex.test(adressInput.value)) {
		adressError.textContent = ""
	}
	else {
		adressError.textContent = "L'adresse est invalide"
		isValid = false
	}

	// Validation du city
	let cityInput = document.getElementById('city')
	let cityError = document.getElementById('cityErrorMsg')
	let cityRegex = new RegExp("^[a-zA-Z-éèà]+$")
	if(cityRegex.test(cityInput.value)) {
		cityError.textContent = ""
	}
	else {
		cityError.textContent = "La ville est invalide"
		isValid = false
	}

	// Validation du email
	let emailInput = document.getElementById('email')
	let emailError = document.getElementById('emailErrorMsg')
	let emailRegEx = new RegExp("^[A-Za-z0-9._-]+@[A-Za-z0-9]+\.[A-Za-z]+$")
	if(emailRegEx.test(emailInput.value)) {
		emailError.textContent = ""
	}
	else {
		emailError.textContent = "L'email est invalide"
		isValid = false
	}

	return isValid
}
