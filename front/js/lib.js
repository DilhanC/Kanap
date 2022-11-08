function getCart() {
    let cart = JSON.parse(localStorage.getItem('cart'))
    return cart
}


function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart))
}


function getUrlParam() {
    const paramName = new URLSearchParams(window.location.search)
    return paramName
}