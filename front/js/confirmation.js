const queryString = new URLSearchParams(window.location.search)
const productId = queryString.get("orderId")

const orderId = document.getElementById('orderId')
orderId.innerHTML = productId

localStorage.removeItem("cart")