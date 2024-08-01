const express = require('express');
const app = express();


app.get("/name",(req, res)=>{
  let myName = (req.query.name).toUpperCase();
  res.send(myName)
  console.log(myName);
})


app.get("/fullname",(req, res)=>{
  let firstName = req.query.firstName;
  let lastName = req.query.lastName;
  res.send(firstName + " " + lastName);
})

app.get("/date", (req,res) => {
  let month = req.query.month;
  let year = req.query.year;
  res.send(month + ", " + year);
})

app.get("/greet", (req,res) =>{
  const name = req.query.name;
  let greeting = "Namaste " + name + " !";
  res.send(greeting)
})

app.get("/address", (req,res) =>{
  let street = req.query.street;
  let city = req.query.city;
  let state = req.query.state;
  let address = street + ", " + city + ", " + state;
  res.send(address)
})

app.get("/email",(req,res) => {
  let username = req.query.username;
  let domain = req.query.domain;
  let email = username + "@" + domain;
  res.send(email);
  
})

let PORT = 3000;
app.listen(PORT, ()=>{
  console.log("Server is running on port 3000");
})