const queryString = new URLSearchParams(window.location.search)
const productId = queryString.get("id")

fetch(`http://localhost:3000/api/products/${productId}`)
	.then((response) => response.json())
	.then((res) => renderProductPage((res)))
    .catch((err) => console.log(err))

function renderProductPage(kanap) {
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
		const cartBtn = document.getElementById("addToCart");
		cartBtn.addEventListener('click', function(event) {
			console.log('clicked');
		});
}

// const queryString = new URLSearchParams(window.location.search);
// const productId = queryString.get("id");

// fetch(`http://localhost:3000/api/products/${productId}`)
//     .then((response) => response.json())
//     .then((res) => data((res)))

// function data(kanap) {
//     const {altTxt, colors, description, imageUrl, name, price} = kanap
//     makeImage(imageUrl, altTxt)
//     makeTitle(name)
//     makePrice(price)
//     makeDescription(description)
//     makeColors(colors)
// }

// function makeImage(imageUrl, altTxt) {
//     const image = document.createElement("img")
//     image.src = imageUrl
//     image.alt = altTxt
//     const parent = document.querySelector(".item__img")
//     if (parent != null) parent.appendChild(image)
// }

// function makeTitle(name) {
//     const h1 = document.querySelector("#title")
//     if (h1 != null) h1.textContent = name
// }

// function makePrice(price) {
//     const span = document.querySelector("#price")
//     if (span != null) span.textContent = price
// }

// function makeDescription(description) {
//     const p = document.querySelector("#description")
//     if (p != null) p.textContent = description
// }

// function makeColors(colors) {
//     const select = document.querySelector("#colors")
//     if (select != null) {
//         colors.forEach((color) => {
//             const option = document.createElement("option")
//             option.value = color
//             option.textContent = color
//             select.appendChild(option)
//         });
//     }
// }