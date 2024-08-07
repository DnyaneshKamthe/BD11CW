const express = require('express');
const app = express();
let PORT = 3000;

function getWelcomeMessage(){
  return 'Welcome to our services';
}

function getGreetingMessage(userName) {
  return 'Hello ' + userName + " !";
}

function checkPasswordStrength(password){
  if(password.length > 15) {
    return "Password is strong";
  }else{
    return "Password is weak";
  }
}

function getSum(num1,num2){
  return num1+num2;
}

function getSubscriptionStatus(userName, isSubscribed){
  if(isSubscribed){
    return userName + " is subscribed";
  }else{
    return userName + " is not subscribed";
  }
}

function getDiscountedPrice(price, discount){
  return (price - (price * (discount / 100)));
}

function getPersonalizedGreeting(age, gender, name){
  return "Hello " + name + " ! You are a "+ age + " years old " + gender + " .";
}

function getFinalPrice(price, discount, tax){
  let discountedPrice = price - (price * (discount / 100));
  return discountedPrice + (discountedPrice * (tax / 100));
}

function getTotalExerciseTime(running, cycling, swimming){
  return running + cycling + swimming;
}

//welcome
app.get("/welcome",(req, res) => {
  res.send(getWelcomeMessage());
})

//greet
app.get("/greet",(req, res) => {
  let userName = req.query.userName;
  res.send(getGreetingMessage(userName));
})

// check-password
app.get("/check-password",(req, res)=>{
  let password = req.query.password;
  res.send(checkPasswordStrength(password));
})

//sum
app.get("/sum",(req, res)=> {
  let num1 = parseFloat(req.query.num1);
  let num2 = parseFloat(req.query.num2);
  res.send(getSum(num1, num2).toString());
})

//check-subscription
app.get("/subscription-status",(req,res)=>{
  let userName = req.query.userName;
  let isSubscribed = req.query.isSubscribed === 'true';
  res.send(getSubscriptionStatus(userName, isSubscribed));
})

// discounted-price
app.get("/discounted-price",(req,res) => {
  let price = parseFloat(req.query.price);
  let discount = parseFloat(req.query.discount);
  res.send(getDiscountedPrice(price, discount).toString());
})

//personalized-greeting
app.get("/personalized-greeting",(req,res) => {
  let age = parseFloat(req.query.age);
  let gender = req.query.gender;
  let name = req.query.name;
  res.send(getPersonalizedGreeting(age, gender, name));
})

//final-price
app.get("/final-price",(req,res) => {
  let price = parseFloat(req.query.price);
  let discount = parseFloat(req.query.discount);
  let tax = parseFloat(req.query.tax);
  res.send(getFinalPrice(price, discount, tax).toString());
})

// total-exercise-time
app.get("/total-exercise-time",(req,res) => {
  let running = parseFloat(req.query.running);
  let cycling = parseFloat(req.query.cycling);
  let swimming = parseFloat(req.query.swimming); 
  res.send(getTotalExerciseTime(running, cycling, swimming).toString());
})


app.listen(PORT, ()=>{
  console.log("Server is running on port 3000");
})