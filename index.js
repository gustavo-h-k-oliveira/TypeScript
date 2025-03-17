var menu = [
    { id: 1, name: "Margherita", price: 8 },
    { id: 2, name: "Pepperoni", price: 10 },
    { id: 3, name: "Hawaiian", price: 10 },
    { id: 4, name: "Veggie", price: 9 },
];
var cashInRegister = 100;
var nextOrderId = 1;
var orderQueue = [];
function addNewPizza(pizzaObj) {
    menu.push(pizzaObj);
}
function placeOrder(pizzaName) {
    var selectedPizza = menu.find(function (pizzaObj) { return pizzaObj.name === pizzaName; });
    if (!selectedPizza) {
        console.error("".concat(pizzaName, " does not exist in the menu"));
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
        var selectedPizza = menu.find(function (pizzaObj) { return pizzaObj.name === identifier; });
        console.log(selectedPizza);
    }
    else if ((typeof identifier) === 'number') {
        var selectedPizza = menu.find(function (pizzaObj) { return pizzaObj.id === identifier; });
        console.log(selectedPizza);
    }
    else {
        console.log("Identifier ".concat(identifier, " not found."));
    }
}
addNewPizza({ id: 5, name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ id: 6, name: "BBQ Chicken", price: 12 });
addNewPizza({ id: 7, name: "Spicy Sausage", price: 11 });
placeOrder("Chicken Bacon Ranch");
completeOrder(1);
completeOrder(2);
getPizzaDetail(3);
getPizzaDetail("Veggie");
console.log("Menu:", menu);
console.log("Cash in register:", cashInRegister);
console.log("Order queue:", orderQueue);
