fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addProducts(data))

function addProducts(dataa) {
    const imageUrl = dataa[0].imageUrl

    const anchor = document.createElement("a")
    anchor.href = imageUrl
    anchor.text = "canap 1"
    const items = document.querySelector("#items")
    if (items) {
        items.appendChild(anchor)
    }
}