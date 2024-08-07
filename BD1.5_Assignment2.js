const express = require("express");
const cors = require("cors");
const app = express();
let PORT = 3000;

app.use(cors());

//calculate-returns
app.get("/calculate-returns", (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let marketPrice = parseFloat(req.query.marketPrice);
  let quantity = parseInt(req.query.quantity);
  res.send(((marketPrice - boughtAt) * quantity).toString());
});

// total-returns
app.get("/total-returns", (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);
  res.send((stock1 + stock2 + stock3 + stock4).toString());
});

//calculate-return-percentage
app.get("/calculate-return-percentage", (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let returns = parseFloat(req.query.returns);
  res.send(((returns / boughtAt) * 100).toString());
});

//total-return-percentage
app.get("/total-return-percentage", (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);
  res.send((stock1 + stock2 + stock3 + stock4).toString());
});

//status
app.get("/status", (req, res) => {
  let returnPercentage = parseFloat(req.query.returnPercentage);
  let result;
  if (returnPercentage > 0) {
    result = "profit";
  } else {
    result = "loss";
  }
  res.send(result);
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
