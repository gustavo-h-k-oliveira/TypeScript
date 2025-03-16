const menu = [
    { name: "Margherita", price: 8 },
    { name: "Pepperoni", price: 10 },
    { name: "Hawaiian", price: 10 },
    { name: "Meat Feast", price: 12 },
    { name: "Veggie", price: 9 }
]

let cashInRegister = 100
const orderQueue = []
let nextOrderId = 1

function addnewPizza(pizzaObj) {
    menu.push(pizzaObj)
    console.log("Adding pizza: ")
    return menu
}

function placeOrder(pizzaName) {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    cashInRegister += selectedPizza.price
    const newOrder = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" }
    orderQueue.push(newOrder)
    console.log("Placing order: ")
    return newOrder
}

function completeOrder(orderId) {
    const order = orderQueue.find(order => order.id === orderId)
    order.status = "completed"
    console.log("Completing order: ")
    return order
}

cheeseRoyal = { name: "Cheese Royal", price: 12 }

console.log(addnewPizza(cheeseRoyal))

console.log(placeOrder("Cheese Royal"))

console.log(placeOrder("Veggie"))

console.log(completeOrder(1))

console.log(completeOrder(2))

console.log("Order queue: ", orderQueue)

console.log(`R$ ${cashInRegister} at the cash register.`)