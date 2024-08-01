const express = require('express');
const app = express();

app.get("/total-distance",(req,res) => {
  let distance1 = parseFloat(req.query.distance1);
  let distance2 = parseFloat(req.query.distance2);
  let totalDistance = (distance1 + distance2).toString();
  res.send(totalDistance);
})

app.get("/total-time",(req,res) => {
  let time1 = parseFloat(req.query.time1);
  let time2 = parseFloat(req.query.time2);
  let time3 = parseFloat(req.query.time3);
  let totalTime = (time1 + time2 + time3).toString();
  res.send(totalTime);
})


app.get("/average-speed",(req,res) => {
  let totalTime = parseFloat(req.query.totalTime);
  let totalDistance = parseFloat(req.query.totalDistance);
  let averageSpeed = (totalDistance / totalTime).toString();
  res.send(averageSpeed);
})

app.get("/eta",(req,res) => {
  let distance = parseFloat(req.query.distance);
  let time = parseFloat(req.query.time);
  let eta = (distance / time).toString();
  res.send(eta);
})

app.get("/total-calories",(req,res) => {
  let duration1 = parseFloat(req.query.duration1);
  let duration2 = parseFloat(req.query.duration2);
  let caloriesPerMinute  = parseFloat(req.query.caloriesPerMinute );
  let totalCalories  = ((duration1 + duration2)*caloriesPerMinute).toString();
  res.send(totalCalories);
})

app.get("/interest-earned",(req,res) => {
  let principle = parseFloat(req.query.principle);
  let time = parseFloat(req.query.time);
  let rate  = parseFloat(req.query.rate );
  let totalInterest  = ((principle*rate*time) / 100).toString();
  res.send(totalInterest);
})




let PORT = 3000;
app.listen(PORT, ()=>{
  console.log("Server is running on port 3000");
})

