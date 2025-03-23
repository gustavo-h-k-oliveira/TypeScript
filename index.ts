type Pizza = { 
    id: number
    name: string
    price: number
}

type UpdatedPizza = Partial<Pizza>

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

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza  {
    const pizza: Pizza = {
        id: nextPizzaId++,
        ...pizzaObj
    }
    menu.push(pizza)
    return pizza
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

function updatePizza(id: number, updates: UpdatedPizza) {
    const foundPizza = menu.find(pizza => pizza.id === id)
    if (!foundPizza) {
        console.error("Pizza not found!")
        return
    }
    Object.assign(foundPizza, updates)
    return foundPizza
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

// Type constraint using 'extends' to ensure the presence of the 'id' property.
function getDetail<T extends { id: number }>(array: T[], id: number): T | undefined {
    const item = array.find(item => item.id === id)
    if (!item) {
        console.error(`${id} was not found in the array!`)
        return
    }
    return item
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({ name: "Spicy Sausage", price: 11 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)
completeOrder(2) // Non existent

console.log("\nFunção getPizzaDetail:")
console.log(getPizzaDetail(3))
console.log(getPizzaDetail("Veggie"))

console.log("\nFunção getDetail:")
console.log(getDetail(menu, 7))
console.log(getDetail(orderQueue, 1))

console.log("\nFunção updatePizza:")
console.log(updatePizza(3, { price: 8 }))
console.log(updatePizza(5, { name: "Pork Bacon Ranch" }))

console.log("\nVariáveis globais:")
console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)
