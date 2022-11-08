// Get current cart in localStorage
function getCart() {
	let cart = []
	let cartJson = localStorage.getItem('cart')
	if(cartJson !== null) {
		cart = JSON.parse(cartJson)
	}
	return cart
}

// Save cart in localStorage
function saveCart(cart = []) {
	localStorage.setItem('cart', JSON.stringify(cart))
}

// Get param value from current url
function getUrlParam(paramName = '') {
	const queryString = new URLSearchParams(window.location.search)
	const value = queryString.get(paramName)
	if(value === null) return ''
	return value
}

// Find a product in cart from localStorage
function findProductFromCart(productId = '', productColor = '') {
	// Get Cart
	let cart = getCart()

	// Find index of cart matching product
	let index = cart.findIndex(element => (element.id == productId && element.color == productColor))

	// Return index
	return index;
}

// Add a product in cart from localStorage
function addProductToCart(productId = '', productColor = '', quantity = 0) {
	// Get current cart
	let cart = getCart()
	// Add to localStorage
	const cartItem = {
		id: productId,
		color: productColor,
		quantity: Number(quantity),
	}
	// Find product in existing cart
	let index = findProductFromCart(cartItem.id, cartItem.color)
	if(index === -1) {
		// Not Found
		cart.push(cartItem)
	}
	else {
		// Found
		cart[index].quantity = Number(cart[index].quantity) + Number(quantity);
	}
	// Save cart
	saveCart(cart)
}

// Delete a product in cart from localStorage
function deleteProductToCart(productId = '', productColor = '') {

}

// Update a product quantity in cart from localStorage
function updateProductQuantityFromCart(productId = '', productColor = '', quantity = 0) {

}