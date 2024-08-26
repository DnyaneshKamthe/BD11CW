const express = require('express')
const app = express()
const PORT = 3000
const { sequelize } = require('./lib/index.js');
const { chef } = require('./models/chef.model.js');
const { dish } = require('./models/dish.model.js');

app.use(express.json());

//data
const dishes = [
    {
      name: 'Margherita Pizza',
      cuisine: 'Italian',
      preparationTime: 20,
    },
    {
      name: 'Sushi',
      cuisine: 'Japanese',
      preparationTime: 50,
    },
    {
      name: 'Poutine',
      cuisine: 'Canadian',
      preparationTime: 30,
    },
  ]

const chefs = [
    { name: 'Gordon Ramsay', birthYear: 1966 },
    { name: 'Masaharu Morimoto', birthYear: 1955 },
    { name: 'Ricardo Larrivée', birthYear: 1967 },
  ]

//functions
async function addNewChef(newChef){
  let result = await chef.create(newChef);
  return {message :"Chef added successfully", result };
}

async function updateChefById(id, newChefData){
  let chefDetails = await chef.findOne({ where : { id }})
  if(!chefDetails){
    return {};
  }
  chefDetails.set(newChefData);
  let updatedChef = await chefDetails.save();
  return {message :"Chef updated successfully", updatedChef };
}

//endpoints
//seed data
app.get("/seed_data", async (req, res) =>{
  try{
    await sequelize.sync({ force: true });
    await chef.bulkCreate(chefs);
    await dish.bulkCreate(dishes);
    res.status(200).json({ message: "Database seeded successfully" });
  }catch(err){
    console.error("Unable to seed data");
    res.status(500).json({ message: err.message });
  }
})

app.get("/", (req, res) => {
  res.send("Welcome to BD5.4_HW_3 !");
})

//chefs/new
app.post("/chefs/new", async (req, res) =>{
  const newChef = req.body.newChef;
  try{
    const result = await addNewChef(newChef);
    if(result === null){
      return res.status(400).json({ message: "Unable to add new chef" });
    }
    return res.status(201).json(result);
  }catch(err){
    res.status(500).json({ message: err.message });
  }
})

//chefs/update/:id
app.post("/chefs/update/:id", async (req, res) =>{
  const id = req.params.id;
  const newChefData = req.body.newChefData;
  try{
    const result = await updateChefById(id, newChefData);
    if(result === null){
      return res.status(404).json({ message: "Unable to update chef" });
    }
    return res.status(200).json(result);
  }catch(err){
    res.status(500).json({ message: err.message });
  }
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})