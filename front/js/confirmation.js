getUrlParam()
const productId = paramName.get("orderId")

const orderId = document.getElementById('orderId')
orderId.innerHTML = productId

localStorage.removeItem("cart")