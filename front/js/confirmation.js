const orderId = getUrlParam('orderId')
if(orderId === '') {
	document.querySelector(".confirmation").textContent = "Commande introuvable"
}
else {
	const orderIdSpan = document.getElementById('orderId')
	orderIdSpan.innerHTML = orderId
	saveCart([])
}