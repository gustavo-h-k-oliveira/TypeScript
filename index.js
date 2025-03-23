var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var pizza = __assign({ id: nextPizzaId++ }, pizzaObj);
    menu.push(pizza);
    return pizza;
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
function updatePizza(id, updates) {
    var foundPizza = menu.find(function (pizza) { return pizza.id === id; });
    if (!foundPizza) {
        console.error("Pizza not found!");
        return;
    }
    Object.assign(foundPizza, updates);
    return foundPizza;
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
// Type constraint using 'extends' to ensure the presence of the 'id' property.
function getDetail(array, id) {
    var item = array.find(function (item) { return item.id === id; });
    if (!item) {
        console.error("".concat(id, " was not found in the array!"));
        return;
    }
    return item;
}
addNewPizza({ name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ name: "BBQ Chicken", price: 12 });
addNewPizza({ name: "Spicy Sausage", price: 11 });
placeOrder("Chicken Bacon Ranch");
completeOrder(1);
completeOrder(2); // Non existent
console.log("\nFunção getPizzaDetail:");
console.log(getPizzaDetail(3));
console.log(getPizzaDetail("Veggie"));
console.log("\nFunção getDetail:");
console.log(getDetail(menu, 7));
console.log(getDetail(orderQueue, 1));
console.log("\nFunção updatePizza:");
console.log(updatePizza(3, { price: 8 }));
console.log(updatePizza(5, { name: "Pork Bacon Ranch" }));
console.log("\nVariáveis globais:");
console.log("Menu:", menu);
console.log("Cash in register:", cashInRegister);
console.log("Order queue:", orderQueue);
