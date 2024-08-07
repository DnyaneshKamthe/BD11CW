const express = require('express');
const app = express();
let PORT = 3000;

function isPrime(num){
  if(num <= 1){
    return false;
  }
  for(let i = 2; i < num; i++){
    if(num % i === 0){
      return false;
    }
  }
  return true;
}

function filterPrimeNumbers(num){
  return isPrime(num);
}

function filterPositiveNumbers(num){
  return num > 0;
}

function filterNegativeNumbers(num){
  return num < 0;
}

function filterOddNumbers(num){
  return num % 2 !== 0;
}

function filterNumbersGreaterThan(num, value){
  return num > value;
}

function filterNumbersLessThan(num, value){
  return num < value;
}

//prime-numbers
let numbers1 =  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
app.get("/prime-numbers", (req, res) =>{
  let value = req.query.value;
  let result = numbers1.filter(num =>filterPrimeNumbers(num, value));
  res.json(result);
})

//positive-numbers
let numbers2 =  [-10, -5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
app.get("/positive-numbers", (req, res) =>{
  let result = numbers2.filter(num => filterPositiveNumbers(num));
  res.json(result);
})

//negative-numbers
let numbers3 =  [-10, -5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
app.get("/negative-numbers", (req, res) =>{
  let result = numbers3.filter(num => filterNegativeNumbers(num));
  res.json(result);
})

//odd-numbers
let numbers4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
app.get("/odd-numbers", (req, res) =>{
  let result = numbers4.filter(num => filterOddNumbers(num));
  res.json(result);
})

//numbers-greater-than
let numbers5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
app.get("/numbers-greater-than", (req, res) =>{
  let value = req.query.value;
  let result = numbers5.filter(num => filterNumbersGreaterThan(num, value));
  res.json(result);
})

//numbers-less-than
let numbers6 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
app.get("/numbers-less-than", (req, res) =>{
  let value = req.query.value;
  let result = numbers6.filter(num => filterNumbersLessThan(num, value));
  res.json(result);
})

app.listen(PORT, ()=>{
  console.log("Server is running on port 3000");
})