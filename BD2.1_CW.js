const express = require('express');
const app = express();
let PORT = 3000;

let person = {
  "firstName" : "John",
  "lastName" : "Doe",
  "gender" : "male",
  "age" : 25,
  "isMember": true,   
}

function getFullName(person){
  return person.firstName + " " + person.lastName;
}

function  getFirstNameAndGender(person){
  return {
    firstName : person.firstName,
    gender : person.gender
  }
}

function getIncrementAge(person){
  person.age+= 1
  return person
}

function getFullNameAndMembership(person){
  return {
    fullName : getFullName(person),
    isMember : person.isMember
  }
}

function getFinalPrice(cartTotal, isMember){
  let discount = 0.10;
  let finalPrice;
  if(isMember){
    finalPrice = cartTotal * (1 - discount);
  }else{
    finalPrice = cartTotal;
  }
  return finalPrice;
}

function getShippingCost(cartTotal, isMember){
  let shippingCost;
  if(cartTotal > 500 && isMember){
    shippingCost = 0;
  }else{
    shippingCost = 99;
  }
  return { shippingCost : shippingCost.toFixed(2) };
}

//person
app.get("/person",(req, res) => {
  res.json(person);
})

//person - fullname
app.get("/person/fullname",(req, res) =>{
  let fullName = getFullName(person);
  res.json({FullName : fullName});
})

//person/firstname-gender
app.get("/person/firstname-gender",(req, res) =>{
  let firstNameAndGender = getFirstNameAndGender(person);
  res.json({FirstNameAndGender : firstNameAndGender})
})

//person/increment-age
app.get("/person/increment-age",(req, res) =>{
  let incrementAge = getIncrementAge(person);
  res.json(incrementAge)
})

//person/fullname-membership
app.get("/person/fullname-membership",(req, res) =>{
  let fullNameAndMembership = getFullNameAndMembership(person);
  res.json(fullNameAndMembership)
})

//person/final-price
app.get("/person/final-price",(req, res) =>{
  let cartTotal = parseFloat(req.query.cartTotal);
  let finalPrice = getFinalPrice(cartTotal, person.isMember);
  res.json(finalPrice)
})

//person/shipping-cost
app.get("/person/shipping-cost",(req, res) =>{
  let cartTotal = parseFloat(req.query.cartTotal);
  let shippingCost = getShippingCost(cartTotal, person.isMember); 
  res.json(shippingCost)
})

app.listen(PORT, ()=>{
  console.log("Server is running on port 3000");
})
