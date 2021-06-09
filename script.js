const store = {
    products: [
        { title: 'Комплект 1', price: 1500, id: 1, count: 1, image: 'image/set1.jpg' },
        { title: 'Комплект 2', price: 1600, id: 2, count: 1, image: 'image/set2.jpg' },
        { title: 'Комплект 3', price: 1700, id: 3, count: 1, image: 'image/set3.jpg' },
        { title: 'Комплект 4', price: 1800, id: 4, count: 1, image: 'image/set4.jpg' },
        { title: 'Комплект 5', price: 1900, id: 5, count: 1, image: 'image/set5.jpg' },
        { title: 'Комплект 6', price: 2000, id: 6, count: 1, image: 'image/set6.jpg' },
        { title: 'Комплект 7', price: 2100, id: 7, count: 1, image: 'image/set7.jpg' },
        { title: 'Комплект 8', price: 2200, id: 8, count: 1, image: 'image/set8.jpg' },
        { title: 'Комплект 9', price: 2300, id: 9, count: 1, image: 'image/set9.jpg' }
    ],
    cart: []
}

const renderCatalog = () => {
    let html = ''

    store.products.forEach(product => {
        html += ` 
        <div class="page-main-wrapper-product">
        <img class="wrapper-product-image" src="${product.image}" alt="">
        <h1 class="wrapper-product-header">${product.title}</h1>
        <p class="wrapper-product-price"><span class="wrapper-product-price">${product.price}</span> руб</p>
        <button class="wrapper-product-button" data-product-id="${product.id}">Добавить в корзину</button>
        </div>`
    })

    const catalog = document.querySelector('.catalog-products')
    catalog.innerHTML = html
}

const addToCart = (product) => {
    let checkCart = store.cart.find(p => p.id === product.id)
    if (checkCart) {
        product.count++
    } else {
        store.cart.push(product)
    }
}

const bindHandlers = () => {
    const productButton = [...document.querySelectorAll('.wrapper-product-button')]
    productButton.forEach(b => {
        b.addEventListener('click', function () {
            let addingProduct = store.products.find(p => p.id === Number(this.dataset.productId))
            addToCart(addingProduct)
            updateCart()
            renderProductInCart()
        })
    })
}

const updateCart = () => {
    let total = 0
    let count = 0

    store.cart.forEach(p => {
        total += p.count * p.price
        count += p.count
    })

    document.getElementById('total').innerHTML = total
    document.getElementById('count').innerHTML = count
}

const renderProductInCart = () => {
    let html = ''
    store.cart.forEach(p => {
        html += `
        <div class="cart-wpapper-product">
        <img class="cart-wpapper-product-image" src="${p.image}" alt="">
        <p class="cart-wpapper-product-title">${p.title}</p>
        <p class="cart-wpapper-product-price">${p.price}</p>
        <p class="cart-wpapper-product-size">Размер: <span>s</span></p>
        <p class="cart-wpapper-product-count">Количество: <span>${p.count}</span></p>
        </div>`
    })
    document.querySelector('.cart-wrapper').innerHTML = html
}

const viewCart = () => {
    document.querySelector('.wrapper-logo').addEventListener('click', function () {
        document.querySelector('.cart').style.display = 'block'
    })
}

function init() {
    renderCatalog()
    bindHandlers()
    viewCart()
}

window.onload = init