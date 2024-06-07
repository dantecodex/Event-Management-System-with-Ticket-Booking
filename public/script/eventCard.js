const price = Number(document.getElementById('price').textContent)
const selectQuantity = () => {
    let quantity = document.getElementById('quantity').value
    let totalPrice = document.getElementById('total-price')

    totalPrice.textContent = `$ ${price * quantity}`

}
