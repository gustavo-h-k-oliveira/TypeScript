var cashInRegister = 100;
var nextOrderId = 1;
var nextPizzaId = 5;
var orderQueue = [];
var menu = [
    { id: 1, name: "Margherita", price: 8 },
    { id: 2, name: "Pepperoni", price: 10 },
    { id: 3, name: "Hawaiian", price: 10 },
    { id: 4, name: "Veggie", price: 9 },
];
function addNewPizza(pizzaObj) {
    pizzaObj.id = nextPizzaId++;
    menu.push(pizzaObj);
}
function placeOrder(pizzaName) {
    var selectedPizza = menu.find(function (pizzaObj) { return pizzaObj.name === pizzaName; });
    if (!selectedPizza) {
        console.error("".concat(pizzaName, " does not exist in the menu."));
        return;
    }
    cashInRegister += selectedPizza.price;
    var newOrder = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" };
    orderQueue.push(newOrder);
    return newOrder;
}
function completeOrder(orderId) {
    var order = orderQueue.find(function (order) { return order.id === orderId; });
    if (!order) {
        console.error("Id ".concat(orderId, " not found."));
        return;
    }
    order.status = "completed";
    return order;
}
function getPizzaDetail(identifier) {
    if ((typeof identifier) === 'string') {
        return menu.find(function (pizzaObj) { return pizzaObj.name.toLowerCase() === identifier.toLowerCase(); });
    }
    else if ((typeof identifier) === 'number') {
        return menu.find(function (pizzaObj) { return pizzaObj.id === identifier; });
    }
    else {
        throw new TypeError("Identifier ".concat(identifier, " must be either a string or a number."));
    }
}
addNewPizza({ id: 0, name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ id: 0, name: "BBQ Chicken", price: 12 });
addNewPizza({ id: 0, name: "Spicy Sausage", price: 11 });
placeOrder("Chicken Bacon Ranch");
completeOrder(1);
completeOrder(2); // Non existent
getPizzaDetail(3);
getPizzaDetail("Veggie");
console.log("Menu:", menu);
console.log("Cash in register:", cashInRegister);
console.log("Order queue:", orderQueue);
