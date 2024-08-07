const express = require('express');
const app = express();
let PORT = 3000;


function filterEvenNumbers(number){
  return number % 2 === 0;
}

function filterAges(age){
  return age >= 18;
}

function filterLongWords(word){
  return word.length > 5;
}

function filterSmallFiles(file, filterParam){
  return file < filterParam;
}
//even-numbers
let numbers =  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
app.get("/even-numbers", (req, res) =>{
  let result = numbers.filter((num) => filterEvenNumbers(num))
  res.json(result);
})

//adult-ages
let ages = [10, 20, 30, 15, 17, 25];
app.get( "/adult-ages",(req, res) =>{
  let result = ages.filter((age) => filterAges(age));
  res.json(result);
})

//long-words
let words =  ['apple', 'banana', 'cherry', 'date', 'fig', 'grape'];
app.get("/long-words",(req, res) =>{
  let result = words.filter((word) => filterLongWords(word));
  res.json(result);
})

//small-files
let files = [50, 200, 75, 120, 30, 90, 150];
app.get("/small-files",(req, res) =>{
  let filterParam = parseFloat(req.query.filterParam);
  let result = files.filter((file) => filterSmallFiles(file, filterParam));
  res.json(result);
})


app.listen(PORT, ()=>{
  console.log("Server is running on port 3000");
})