const express = require("express");
const app = express();
let PORT = 3000;

//data
let cartItems = [
  { item: 'Book', price: 30 },
  { item: 'Pen', price: 5 },
  { item: 'Notebook', price: 50 },
  { item: 'Bag', price: 125 }
];

let students = [
  { name: 'John', grade: 'A' },
  { name: 'Jane', grade: 'A' },
  { name: 'Jack', grade: 'B' },
  { name: 'Jill', grade: 'C' }
];

let temperatures = [0, 20, 30, 100];

let student_scores = [
  { name: 'John', score: 85 },
  { name: 'Jane', score: 90 },
  { name: 'Jack', score: 70 },
  { name: 'Jill', score: 60 }
];

let sentence = 'The quick brown fox jumps over the lazy dog';

// functions
function calculateTotalPrice(cartItems){
  let total = 0;
  for(let i = 0; i < cartItems.length; i++){
    total = total + cartItems[i].price;
  }
  return total;
}

function filterStudentsByGrade(students, grade){
  let result = [];
  for(let i = 0; i < students.length; i++){
    if(students[i].grade === grade){
      result.push(students[i]);
    }
  }
  return result;
}

function convertCelsiusToFahrenheit(temperatures){
  let result = [];
  for(let i = 0; i < temperatures.length; i++){
    result.push(temperatures[i] * 9/5 + 32);
  }
  return result;
}

function calculateAverageScore(student_scores){
  let total = 0;
  for(let i = 0; i < student_scores.length; i++){
    total = total + student_scores[i].score;
  }
  return total / student_scores.length;
}

function countWords(sentence){
  let result = 0;
  for(let i =0; i < sentence.length; i++){
    if(sentence[i] === " "){
      result = result + 1;
    }
  }
  return result+1 ;
}

// endpoints
//cart/total
app.get("/cart/total", (req, res) =>{
  let totalPrice = calculateTotalPrice(cartItems);
  res.json({totalPrice});
})

//students/filter
app.get("/students/filter", (req, res) =>{
  let grade = req.query.grade;
  let result = filterStudentsByGrade(students, grade);
  res.json({students: result});
})

//temperatures/convert
app.get("/temperatures/convert", (req, res) =>{
  let convertedTemperatures = convertCelsiusToFahrenheit(temperatures);
  res.json({convertedTemperatures: convertedTemperatures})
})

// students/average-score
app.get("/students/average-score",(req, res)=>{
  let averageScore = calculateAverageScore(student_scores);
  res.json({averageScore : averageScore});
})

//sentence/count-words
app.get("/sentence/count-words", (req, res) =>{
  let wordCount = countWords(sentence);
  res.json({wordCount : wordCount});
})


app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
