const cart = []

const NumberOfItems = localStorage.length

for (let i = 0 ; i < NumberOfItems ; i++ ) {
    const item = localStorage.getItem(localStorage.key(i))
    const itemsObject = JSON.parse(item)
    cart.push(itemsObject)
}