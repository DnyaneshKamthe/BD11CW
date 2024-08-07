const express = require("express");
const app = express();
let PORT = 3000;

// data
let numbers = [1, 2, 3, 4, 5];
let strings = ["hello", "world", "javascript", "node"];

// all functions
function addNumber(numbers, num) {
  numbers.push(num);
  return numbers;
}

function addString(strings, str){
  strings.push(str);
  return strings;
}

function sumNumbers(numbers){
  let sum = 0
  for(let i =0; i < numbers.length; i++){
    sum = sum + numbers[i]
  }
  return sum;
}

function findMax(numbers){
  let max = numbers[0];
  for(let i = 1; i< numbers.length; i++){
    if(numbers[i] > max){
      max = numbers[i]
    }
  }
  return max;
}
// all endpoints
//numbers/add
app.get("/numbers/add", (req, res) => {
  let result = addNumber(numbers, 6);
  res.json(result);
});

//strings/add
app.get("/strings/add", (req, res) =>{
  let result = addString(strings, "express");
  res.json(result);
})

///numbers/sum
app.get("/numbers/sum", (req, res) =>{
  let result = sumNumbers(numbers);
  res.json({sum : result});
})

//numbers/max
app.get("/numbers/max", (req, res) =>{
  let result = findMax(numbers);
  res.json({max : result});
})

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
