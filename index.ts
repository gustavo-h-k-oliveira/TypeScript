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

let cashInRegister: number = 100
let nextOrderId: number = 1
let nextPizzaId: number = 5
const orderQueue: Order[] = []

const menu: Pizza[] = [
    { id: 1, name: "Margherita", price: 8 },
    { id: 2, name: "Pepperoni", price: 10 },
    { id: 3, name: "Hawaiian", price: 10 },
    { id: 4, name: "Veggie", price: 9 },
]

function addNewPizza(pizzaObj: Pizza): void  {
    pizzaObj.id = nextPizzaId++
    menu.push(pizzaObj)
}

function placeOrder(pizzaName: string): Order | undefined {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    if (!selectedPizza) {
        console.error(`${pizzaName} does not exist in the menu.`)
        return
    }
    cashInRegister += selectedPizza.price
    const newOrder: Order = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" }
    orderQueue.push(newOrder)
    return newOrder
}

function completeOrder(orderId: number): Order | undefined {
    const order = orderQueue.find(order => order.id === orderId)
    if (!order) {
        console.error(`Id ${orderId} not found.`)
        return
    }
    order.status = "completed"
    return order
}

function getPizzaDetail(identifier: string | number): Pizza | undefined {
    if ((typeof identifier) === 'string') {
        return menu.find(pizzaObj => pizzaObj.name.toLowerCase() === identifier.toLowerCase())
    }
    else if ((typeof identifier) === 'number') {
        return menu.find(pizzaObj => pizzaObj.id === identifier)
    }
    else {
        throw new TypeError(`Identifier ${identifier} must be either a string or a number.`)
    }
}

addNewPizza({ id: 0, name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ id: 0, name: "BBQ Chicken", price: 12 })
addNewPizza({ id: 0, name: "Spicy Sausage", price: 11 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)
completeOrder(2) // Non existent

getPizzaDetail(3)
getPizzaDetail("Veggie")

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)
