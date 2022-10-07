fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addProducts(data))

        // colors: ["Blue","White","Black"],
        // _id: "107fb5b75607497b96722bda5b504926",
        // name: "Kanap Sinopé",
        // price: 1849,
        // imageUrl: "http://localhost:3000/images/kanap01.jpeg",
        // description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        // altTxt: "Photo d'un canapé bleu, deux places"

function addProducts(data) {
    const {_id, imageUrl, altTxt, name, description} = data[0]
    
    const anchor = makeAnchor(_id)
    const article = document.createElement ("article")
    const image = makeImage(imageUrl, altTxt)
    const h3 = makeH3(name)
    const p = makeParagraph(description)

    appendElementsToArticle(article, image, h3, p)
    appendArticleToAnchor(anchor, article)
}

function appendElementsToArticle(article, image, h3, p){
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
}

function makeAnchor(id) {
    const anchor = document.createElement("a")
    anchor.href = ".../product01.jpg" + id
    return anchor
}
    
function appendArticleToAnchor(anchor, article) {
    const items = document.querySelector("#items")
    if (items) {
        items.appendChild(anchor)
        anchor.appendChild(article)
        console.log(items)
    }
}

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    image.removeAttribute("title")
    image.removeAttribute("style")
    return image
}

function makeH3(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}

function makeParagraph(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescrisption")
    return p
}