const express = require('express');
const app = express();
let PORT = 3000;

function getWelcomeMessage(){
  return 'We will now learn functions !';
}

function getGreetingMessage(userName) {
  return 'Hey ' + userName + "! Are you ready to learn functions with us?";
}

function checkYearsOfExp(yearsOfExp){
  if(yearsOfExp > 0 ){
    return "You have some experience with functions. Great!"
  }else{
    return "No worries. You will start writing functions in no time!"
  }
}

function getTime(days, hours){
  return days * hours;
}

function getModuleCompletion(username, hasCompleted){
  if(hasCompleted){
    return username + " has completed the modules.";
  }else{
    return username + "has not completed the modules.";
  }
}

function getPersonalizedGreeting(city, name){
  return " Hey, " + name + "! What's famous about " + city + " ?";
}

function findAge(birthyear){
  return 2024 - birthyear;
}

function findRequiredTime(days, hours){
  let time = days * hours;
  if(time >=30){
    return "The time being dedicated is sufficient for learning functions";
  }else{
    return "The time being dedicated is insufficient for learning functions";
  }
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

//message
app.get("/message",(req, res) => {
  let yearsOfExp = req.query.yearsOfExp;
  res.send(checkYearsOfExp(yearsOfExp));
})

//hours
app.get("/hours",(req, res) => {
  let days = parseFloat(req.query.days);
  let hours = parseFloat(req.query.hours);
  res.send(getTime(days, hours).toString());
})

//module-completion-status
app.get("/module-completion-status",(req, res) => {
  let username = req.query.username;
  let hasCompleted = req.query.hasCompleted === "true";
  res.send(getModuleCompletion(username, hasCompleted));
})

//personalized-greeting
app.get("/personalized-greeting",(req, res) =>{
  let city = req.query.city;
  let name = req.query.name;
  res.send(getPersonalizedGreeting(city, name));
})

//find-age
app.get("/find-age",(req, res) =>{
  let birthyear = parseInt(req.query.birthyear);
  res.send(findAge(birthyear).toString());
})

//is-time-sufficient
app.get("/is-time-sufficient",(req, res) =>{
  let days = parseFloat(req.query.days);
  let hours = parseFloat(req.query.hours);
  res.send(findRequiredTime(days, hours).toString());
})

app.listen(PORT, ()=>{
  console.log("Server is running on port 3000");
})

