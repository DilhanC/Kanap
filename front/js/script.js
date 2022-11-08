fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((res) => {
	let kanaps = res
	kanaps.forEach(kanaps => {
		const {_id, imageUrl, altTxt, name, description} = kanaps

		const anchor = document.createElement("a")
		anchor.href = "product.html?id="+ _id

		const article = document.createElement("article")

		const image = document.createElement("img")
		image.src = imageUrl
		image.alt = altTxt

		const h3 = document.createElement("h3")
		h3.textContent = name
		h3.classList.add("productName")

		const p = document.createElement("p")
		p.textContent = description
		p.classList.add("productDescrisption")

		article.appendChild(image)
		article.appendChild(h3)
		article.appendChild(p)
		const items = document.querySelector("#items")
		if (items != null) {
			items.appendChild(anchor)
			anchor.appendChild(article)
		}
	})
})
.catch((err) => {
	console.log(err)
	document.querySelector("#items").textContent = "Aucun produit disponible à la vente"
})

