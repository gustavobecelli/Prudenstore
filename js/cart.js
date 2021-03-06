const body = document.querySelector('body')
const page = document.querySelector('#cart-items')
let cart = []
// it uses BRASIL API to get data from each location
async function getInfosByCEP(cep) {
	await fetch(`https://brasilapi.com.br/api/cep/v1/${cep.toString()}`)
		.then((response) => {
			return response.json()
		})
		.then((data) => {
			if (data.cep) {
				const state = document.querySelector('#state')
				const city = document.querySelector('#city')
				const neighborhood = document.querySelector('#neighborhood')
				const street = document.querySelector('#street')
				state.value = data.state
				city.value = data.city
				neighborhood.value = data.neighborhood
				street.value = data.street
			} else {
				alert('CEP Inválido!')
			}
		})
}
// list all the products in the cart
const listProducts = (array) => {
	const main = document.createElement('section')
	const title = document.createElement('h1')
	title.classList.add('title')
	title.innerHTML = 'Resumo do Pedido'
	main.appendChild(title)
	main.setAttribute('id', 'products')
	let id = 0
	let totalPrice = 0
	array.forEach((item) => {
		const card = document.createElement('section')
		const name = document.createElement('h1')
		const price = document.createElement('h1')
		const button = document.createElement('button')
		const image = document.createElement('img')
		const divEsq = document.createElement('div')
		const divDir = document.createElement('div')
		divEsq.classList.add('flex')
		divEsq.classList.add('flex-space')
		divDir.classList.add('flex')
		divDir.classList.add('flex-space')
		button.setAttribute('onclick', `removeFromCart(${id})`)
		button.classList.add('add-button')
		card.classList.add('card')
		image.setAttribute('src', item.image)
		name.innerHTML = item.name
		price.innerHTML = `R$ ${item.price.toFixed(2)}`
		totalPrice += item.price
		price.classList.add('price')
		button.innerHTML = 'x'
		divEsq.appendChild(image)
		divEsq.appendChild(name)
		divDir.appendChild(price)
		divDir.appendChild(button)
		card.appendChild(divEsq)
		card.appendChild(divDir)
		main.appendChild(card)
		id++
	})
	const card = document.createElement('section')
	const name = document.createElement('h1')
	const price = document.createElement('h1')
	// card.classList.add('card')
	name.innerHTML = 'Preço total do carrinho'
	name.classList.add('price-title')
	price.innerHTML = `R$ ${totalPrice.toFixed(2)}`
	price.classList.add('price')
	price.classList.add('total')

	card.appendChild(name)
	// card.appendChild(category)
	card.appendChild(price)
	main.appendChild(card)
	page.appendChild(main)
	lastDisplayed = array
}
// Remove specific item
const removeFromCart = (id) => {
	cart.splice(id, 1)
	UpdateCart()
	if (cart == null || cart.length == 0) window.location.href = './'
	else {
		removeShownProducts()
		listProducts(cart)
	}
}
// All displayed products
const removeShownProducts = () => {
	const main = document.querySelector('#products')
	main.remove()
}
// Cart List in SessionStorage
const UpdateCart = () => {
	if (cart == null || cart.length == 0) sessionStorage.removeItem('items')
	else {
		const dataToSend = JSON.stringify(cart)
		sessionStorage.setItem('items', dataToSend)
	}
}
// Recover info from sessionStorage
const recoverInfo = () => {
	cart = JSON.parse(sessionStorage.getItem('items'))
	if (cart == null || cart.length == 0) window.location.href = './'
	else listProducts(cart)
}
// Go to shipping page
const addToShipping = () => {
	localStorage.removeItem('items')
	const dataToSend = JSON.stringify(cart)
	sessionStorage.setItem('shipping', dataToSend)
}

recoverInfo()
