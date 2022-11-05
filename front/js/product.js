const queryString = new URLSearchParams(window.location.search)
const productId = queryString.get("id")

fetch(`http://localhost:3000/api/products/${productId}`)
.then((res) => res.json())
.then((res) => {
	let kanap = res;
	const {altTxt, colors, description, imageUrl, name, price} = kanap

	// <img>
	const image = document.createElement("img")
	image.src = imageUrl
	image.alt = altTxt
	const parent = document.querySelector(".item__img")
	if (parent != null) parent.appendChild(image)

	// <h1>
	const h1 = document.querySelector("#title")
	if (h1 != null) h1.textContent = name

	// <span class="price">
	const span = document.querySelector("#price")
	if (span != null) span.textContent = price

	// description
	const p = document.querySelector("#description")
	if (p != null) p.textContent = description

	//couleurs
	const select = document.querySelector("#colors")
	if (select != null) {
		colors.forEach((color) => {
			const option = document.createElement("option")
			option.value = color
			option.textContent = color
			select.appendChild(option)
		})
	}

	// Listening CLICK on cart button
	const button = document.querySelector("#addToCart")
	button.addEventListener("click", () => {
		const color = document.querySelector("#colors").value
		const quantity = document.querySelector("#quantity").value
		if (color == null || color === "" || quantity == null || quantity == 0) {
			alert("Veuillez selectionner une couleur ET une quantité pour ajouter le/les produits dans le panier")
		}
		else {
			// Get current cart
			let cart = [];
			let cartJson = localStorage.getItem('cart')
			if(cartJson !== null) {
				cart = JSON.parse(cartJson)
			}

			// Add to localStorage
			const cartItem = {
				id: productId,
				color: color,
				quantity: quantity,
			}
			// Find product in existing cart
			let index = cart.findIndex(item => (item.color == cartItem.color && item.id == cartItem.id))
			if(index === -1) {
				// Not Found
				cart.push(cartItem)
			}
			else {
				// Found
				cart[index].quantity = Number(cart[index].quantity) + Number(quantity);
			}
			// Save cart
			localStorage.setItem('cart', JSON.stringify(cart))
			if (confirm("Votre produit a bien été ajouté au panier, vous allez être redirigé vers le panier.")) {
				open("cart.html")
			}
		}
	})
})
.catch((err) => {
	console.log(err)
});