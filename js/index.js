let ul = document.getElementById('ul-card')
let navButtons = document.getElementsByClassName('navButtons')

let listDefault = data
let listCamisetas = []
let listAcessorios = []
let listCalcados = []

function separarItens(x) {
    for (let i = 0; i < x.length; i++) {

        if (x[i].tag[0] == ['Camisetas']) {
            listCamisetas.push(x[i])

        } else if (x[i].tag[0] == ['calçados']) {
            listCalcados.push(x[i])
        } else {
            listAcessorios.push(x[i])
        }

    }
}
separarItens(data)

function adciItens(x, y) {

    for (let i = 0; i < x.length; i++) {
        let itens = x[i]
        let templateLi = criarLiVitrine(itens)
        y.appendChild(templateLi)
    }
}
adciItens(listDefault, ul)

for (let j = 0; j < navButtons.length; j++) {
    let navButton = navButtons[j]

    navButton.addEventListener('click', function (event) {
        ul.innerHTML = ""
        let button = event.target
        let idNav = button.id
        if (idNav === "NavTodos") {
            listDefault = data
            adciItens(listDefault, ul)

        } else if (idNav === "NavAcessorios") {
            listDefault = listAcessorios
            adciItens(listDefault, ul)

        } else if (idNav === "NavCalcados") {
            listDefault = listCalcados
            adciItens(listDefault, ul)

        } else {
            listDefault = listCamisetas
            adciItens(listDefault, ul)

        }
    })
}

function criarLiVitrine(itens) {
    let img = itens.img
    let category = itens.tag
    let nome = itens.nameItem
    let description = itens.description
    let preco = itens.value

    let tagLi = document.createElement("li")
    let tagImg = document.createElement("img")
    let tagDiv = document.createElement("div")
    let tagP1 = document.createElement("p")
    let tagH3 = document.createElement("h3")
    let tagSpan = document.createElement("span")
    let tagP2 = document.createElement("p")
    let tagButton = document.createElement("button")

    tagLi.classList.add("card")
    tagImg.classList.add("img-card")
    tagDiv.classList.add("category-back")
    tagP1.classList.add("category")
    tagH3.classList.add("nome")
    tagSpan.classList.add("description")
    tagP2.classList.add("valorVitrine")
    tagButton.classList.add("adiciona-carrinho")
    tagButton.id = itens.id
    tagButton.addEventListener('click', function (event) {

        let elemento = itens;
        let id = (elemento.id);
        let obj = SearchObj(id)

        valorTotal += itens.value
        quantidadeTotal++

        adcItemCarrinho(obj)

        divTotal.classList.add("total")
        divTotal.classList.remove("vazio")
        divTotal.innerHTML = `<div class='quantidade'><span>Quantidade:</span><span>${quantidadeTotal}</span></div><div class='valor'><span>Total</span><span>R$${valorTotal.toFixed(2)}</span></div>`

    })

    tagImg.src = img
    tagImg.alt = nome
    tagImg.title = nome
    tagP1.innerText = category
    tagH3.innerText = nome
    tagSpan.innerText = description
    tagP2.innerText = `R$${preco.toFixed(2)}`
    tagButton.innerText = "Adicionar ao Carrinho"

    tagDiv.appendChild(tagP1)
    tagLi.append(tagImg, tagDiv, tagH3, tagSpan, tagP2, tagButton)
    return tagLi

}

let divCarrinho = document.getElementById("carrinho")
let carrinho = document.getElementById('ul-carrinho')


let valorTotal = 0
let quantidadeTotal = 0
let addProduto = document.getElementsByClassName("adiciona-carrinho")

let divTotal = document.createElement('div')
divTotal.classList.add('vazio')
divTotal.innerHTML = '<span>Carrinho Vazio</span>'
divCarrinho.appendChild(divTotal)

function SearchObj(id) {
    for (let j = 0; j < data.length; j++) {
        let produto = data[j]
        if (produto.id === id) {
            return produto
        }
    }
    return false
}


let ulCarrinho = document.getElementById("ul-carrinho")

function adcItemCarrinho(obj) {


    let tagLi = document.createElement("li")
    let tagImg = document.createElement("img")
    let tagDiv = document.createElement("div")
    let tagH4 = document.createElement("h4")
    let tagP = document.createElement("p")
    let tagButton = document.createElement("button")

    tagLi.classList.add("card-carrinho")
    tagImg.classList.add("img-card-carrinho")
    tagDiv.classList.add("carrinho-description")
    tagH4.classList.add("nome-carrinho")
    tagP.classList.add("valor-carrinho")
    tagButton.classList.add("remover-carrinho")

    let preco = obj.value

    tagImg.src = obj.img
    tagImg.alt = obj.nameItem
    tagImg.title = obj.nameItem
    tagH4.innerText = obj.nameItem
    tagP.innerText = `R$${preco.toFixed(2)}`
    tagButton.innerText = "Remover do Carrinho"



    tagButton.addEventListener('click', function (event) {
        let li = event.path[2]
        li.remove()
        valorTotal -= obj.value
        quantidadeTotal--

        if (quantidadeTotal > 0) {
            divTotal.innerHTML = `<div class='quantidade'><span>Quantidade:</span><span>${quantidadeTotal}</span></div><div class='valor'><span>Total</span><span>R$${valorTotal.toFixed(2)}</span></div>`
        } else {
            divTotal.classList.remove("total")
            divTotal.classList.add("vazio")
            divTotal.innerHTML = '<span>Carrinho Vazio</span>'
        }


    })

    tagDiv.append(tagH4, tagP, tagButton)
    tagLi.append(tagImg, tagDiv,)
    ulCarrinho.appendChild(tagLi)

}


