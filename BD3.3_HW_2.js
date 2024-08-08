const express = require("express");
const app = express();
let PORT = 3000;

//data
let products = [
  { productId: 1, name: 'Laptop', inStock: true },
  { productId: 2, name: 'Phone', inStock: true },
  { productId: 3, name: 'Tablet', inStock: false }
];

let employees = [
  { employeeId: 1, name: 'Alice', active: true },
  { employeeId: 2, name: 'Bob', active: true },
  { employeeId: 3, name: 'Charlie', active: false }
];

let orders = [
  { orderId: 1, product: 'Laptop', delivered: false },
  { orderId: 2, product: 'Phone', delivered: true },
  { orderId: 3, product: 'Tablet', delivered: false }
];

let reservations = [
  { reservationId: 1, name: 'John', confirmed: false },
  { reservationId: 2, name: 'Jane', confirmed: true },
  { reservationId: 3, name: 'Jack', confirmed: false }
];

let subscriptions = [
  { subscriptionId: 1, service: 'Netflix', active: false },
  { subscriptionId: 2, service: 'Spotify', active: true },
  { subscriptionId: 3, service: 'Amazon Prime', active: false }
];


//functions
function removeOutOfStockProducts(products){
  return products.filter(ele => ele.inStock);
}

function updateEmployeeStatusById(employees, employeeId, active){
  for(let i = 0; i < employees.length; i++){
    if(employees[i].employeeId === employeeId){
      employees[i].active = active;
      break;
    }
  }
  return employees;
}

function updateOrderStatusById(orders, orderId, delivered){
  for(let i = 0; i < orders.length; i++){
    if(orders[i].orderId === orderId){
      orders[i].delivered = delivered;
      break;
    }
  }
  return orders;
}

function  removeUnconfirmedReservations(reservations){
  return reservations.filter(ele => ele.confirmed);
}

function updateSubscriptionStatusById(subscriptions, subscriptionId, active){
  for(let i = 0; i < subscriptions.length; i++){
    if(subscriptions[i].subscriptionId === subscriptionId){
      subscriptions[i].active = active;
      break;
    }
  }
  return subscriptions;
}

//endpoints
//products/remove-out-of-stock
app.get("/products/remove-out-of-stock",(req, res)=>{
  let result = removeOutOfStockProducts(products);
  res.json(result);
})

//employees/update
app.get("/employees/update",(req, res)=>{
  let employeeId = parseInt(req.query.employeeId);
  let active = req.query.active === "true";
  let result = updateEmployeeStatusById(employees, employeeId, active);
  res.json(result);
})

//orders/update
app.get("/orders/update",(req, res)=>{
  let orderId = parseInt(req.query.orderId);
  let delivered = req.query.delivered === "true";
  let result = updateOrderStatusById(orders, orderId, delivered);
  res.json(result);
})

//reservations/remove-unconfirmed
app.get("/reservations/remove-unconfirmed",(req, res)=>{
  let result = removeUnconfirmedReservations(reservations);
  res.json(result);
})

//subscriptions/update
app.get("/subscriptions/update",(req, res)=>{
  let subscriptionId = parseInt(req.query.subscriptionId);
  let active = req.query.active === "true";
  let result = updateSubscriptionStatusById(subscriptions, subscriptionId, active);
  res.json(result);
})


app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});