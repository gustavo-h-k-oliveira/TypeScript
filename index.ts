type Pizza = { 
    id: number
    name: string
    price: number
}

type Order = {
    id: number
    pizza: Pizza
    status: "ordered" | "completed" 
}

const menu: Pizza[] = [
    { id: 1, name: "Margherita", price: 8 },
    { id: 2, name: "Pepperoni", price: 10 },
    { id: 3, name: "Hawaiian", price: 10 },
    { id: 4, name: "Veggie", price: 9 },
]

let cashInRegister: number = 100
let nextOrderId: number = 1
const orderQueue: Order[] = []

function addNewPizza(pizzaObj: Pizza) {
    menu.push(pizzaObj)
}

function placeOrder(pizzaName: string): Order | void {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    if (!selectedPizza) {
        console.error(`${pizzaName} does not exist in the menu`)
        return
    }
    cashInRegister += selectedPizza.price
    const newOrder: Order = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" }
    orderQueue.push(newOrder)
    return newOrder
}

function completeOrder(orderId: number): Order | void {
    const order = orderQueue.find(order => order.id === orderId)
    if (!order) {
        console.error(`Id ${orderId} not found.`)
        return
    }
    order.status = "completed"
    return order
}

function getPizzaDetail(identifier: string | number) {
    if ((typeof identifier) === 'string') {
        return menu.find(pizzaObj => pizzaObj.name.toLowerCase() === identifier.toLowerCase())
    }
    else if ((typeof identifier) === 'number') {
        return menu.find(pizzaObj => pizzaObj.id === identifier)
    }
    else {
        console.log(`Identifier ${identifier} not found.`)
    }
}

addNewPizza({ id: 5, name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ id: 6, name: "BBQ Chicken", price: 12 })
addNewPizza({ id: 7, name: "Spicy Sausage", price: 11 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)
completeOrder(2) // Non existent

getPizzaDetail(3)
getPizzaDetail("Veggie")

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)
