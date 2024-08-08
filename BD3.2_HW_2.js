const express = require("express");
const app = express();
let PORT = 3000;

//data
let phones = [
  { number: '123-456-7890', owner: 'Alice', type: 'mobile' },
  { number: '987-654-3210', owner: 'Bob', type: 'home' }
];

let accounts = [
  { number: '111122223333', holder: 'Charlie', balance: 5000 },
  { number: '444455556666', holder: 'Dave', balance: 3000 }
];

let licenses = [
  { number: 'D1234567', name: 'Eve', expiryDate: '2026-04-01' },
  { number: 'D7654321', name: 'Frank', expiryDate: '2024-11-15' }
];

let employees = [
  { id: 'E1234', name: 'Grace', department: 'Engineering' },
  { id: 'E5678', name: 'Hank', department: 'Marketing' }
];

let orders = [
  { id: 'ORD12345', customerName: 'Ivy', totalAmount: 150 },
  { id: 'ORD67890', customerName: 'Jake', totalAmount: 200 }
];

//functions
function findPhoneNumber(ele, phoneNumber){
  return ele.number === phoneNumber;
}

function findAccountNumber(ele, accountNumber){
  return ele.number === accountNumber;
}

function findLicenseNumber(ele, licenseNumber){
  return ele.number === licenseNumber;
}

function findByEmployeeId(ele, employeeId){
  return ele.id === employeeId;
}

function findOrderById(ele, orderId){
  return ele.id === orderId;
}

//endpoints
//phones/find
app.get("/phones/find", (req, res) =>{
  let phoneNumber = req.query.phoneNumber;
  let result = phones.find((ele) => findPhoneNumber(ele, phoneNumber));
  res.json({result});
})

///accounts/find
app.get("/accounts/find", (req, res) =>{
  let accountNumber = req.query.accountNumber;
  let result = accounts.find((ele) => findAccountNumber(ele, accountNumber));
  res.json({result});
})

//licenses/find
app.get("/licenses/find", (req, res) =>{
  let licenseNumber = req.query.licenseNumber;
  let result = licenses.find((ele) => findLicenseNumber(ele, licenseNumber))
  res.json({result});
})

//employees/find
app.get("/employees/find", (req, res) =>{
  let employeeId = req.query.employeeId;
  let result = employees.find((ele) => findByEmployeeId(ele, employeeId));
  res.json({result});
})

//orders/find
app.get("/orders/find", (req, res) =>{
  let orderId = req.query.orderId;
  let result = orders.find((ele) => findOrderById(ele, orderId));
  res.json({result});
})

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});