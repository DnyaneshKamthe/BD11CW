const express = require("express");
const app = express();
let PORT = 3000;

// data
let numbers = [1, 2, 3, 4, 5];

let strings = ["hello", "world", "javascript", "node"];

// functions
function multiplyNumber(numbers, multiplier) {
  let result = [];
  for (let i = 0; i < numbers.length; i++) {
    result.push(numbers[i] * multiplier);
  }
  return result;
}

function concatStrings(strings, suffix) {
  let result = [];
  for (let i = 0; i < strings.length; i++) {
    result.push(strings[i] + suffix);
  }
  return result;
}

function removeOddNumbers(numbers) {
  let result = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
      result.push(numbers[i]);
    }
  }
  return result;
}

function joinStrings(strings) {
  let result = strings[0];
  for (let i = 1; i < strings.length; i++) {
    result = result + " " + strings[i];
  }
  return result;
}

function doubleNumbers(numbers) {
  let result = [];
  for (let i = 0; i < numbers.length; i++) {
    result.push(numbers[i] * 2);
  }
  return result;
}

// endpoints
//numbers/multiply
app.get("/numbers/multiply", (req, res) => {
  let multiplier = parseInt(req.query.multiplier);
  let result = multiplyNumber(numbers, multiplier);
  res.json({ result: result });
});

//strings/concat
app.get("/strings/concat", (req, res) => {
  let suffix = req.query.suffix;
  let result = concatStrings(strings, suffix);
  res.json({ result: result });
});

///numbers/remove-odds
app.get("/numbers/remove-odds", (req, res) => {
  let result = removeOddNumbers(numbers);
  res.json({ result });
});

//strings/join
app.get("/strings/join", (req, res) => {
  let result = joinStrings(strings);
  res.json({ result });
});

//numbers/double
app.get("/numbers/double", (req, res) => {
  let result = doubleNumbers(numbers);
  res.json({ result: result });
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
