const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const company = require('./models/company.model.js');
const { sequelize } = require('./lib/index.js');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const companies = [
    {
      'name': 'Tech Innovators',
      'industry': 'Technology',
      'foundedYear': 2010,
      'headquarters': 'San Francisco',
      'revenue': 75000000
    },
    {
      'name': 'Green Earth',
      'industry': 'Renewable Energy',
      'foundedYear': 2015,
      'headquarters': 'Portland',
      'revenue': 50000000
    },
    {
      'name': 'Innovatech',
      'industry': 'Technology',
      'foundedYear': 2012,
      'headquarters': 'Los Angeles',
      'revenue': 65000000
    },
    {
      'name': 'Solar Solutions',
      'industry': 'Renewable Energy',
      'foundedYear': 2015,
      'headquarters': 'Austin',
      'revenue': 60000000
    },
    {
      'name': 'HealthFirst',
      'industry': 'Healthcare',
      'foundedYear': 2008,
      'headquarters': 'New York',
      'revenue': 80000000
    },
    {
      'name': 'EcoPower',
      'industry': 'Renewable Energy',
      'foundedYear': 2018,
      'headquarters': 'Seattle',
      'revenue': 55000000
    },
    {
      'name': 'MediCare',
      'industry': 'Healthcare',
      'foundedYear': 2012,
      'headquarters': 'Boston',
      'revenue': 70000000
    },
    {
      'name': 'NextGen Tech',
      'industry': 'Technology',
      'foundedYear': 2018,
      'headquarters': 'Chicago',
      'revenue': 72000000
    },
    {
      'name': 'LifeWell',
      'industry': 'Healthcare',
      'foundedYear': 2010,
      'headquarters': 'Houston',
      'revenue': 75000000
    },
    {
      'name': 'CleanTech',
      'industry': 'Renewable Energy',
      'foundedYear': 2008,
      'headquarters': 'Denver',
      'revenue': 62000000
    }
  ]

//functions
async function fetchAllCompanies(){
  let result = await company.findAll();
  return { companies: result };
}

async function addNewCompany(newCompany){
  let result = await company.create(newCompany);
  return { newCompany: result };
}

async function updateCompanyById(id, newCompanyData){
  let companyDetails = await company.findOne({ where : { id } });;
  if(companyDetails === null){
    return { message : "No company found"}
  }
  companyDetails.set(newCompanyData);
  await companyDetails.save();
  return { message : "Company updated successfully", companyDetails }
}

async function deleteCompanyById(id){
  let result = await company.destroy({ where : { id } });
  if(result === null){
    return { message : "No company found"}
  }
  return { deletedCompany : result }
}

//endpoints
app.get("/", (req, res) =>{
  res.status(200).json({ message: "Welcome to the BD5.3_HW_3 !" });
})
//seed data
app.get("/seed_data", async (req, res) =>{
  try{
    await sequelize.sync({ force: true });
    await company.bulkCreate(companies);
    res.status(200).json({ message: "Database seeded successfully" });
  }catch(err){
    console.error("Unable to seed data");
    res.status(500).json({ message: err.message });
  }
})

//companies 
app.get("/companies", async (req, res) =>{
  try{
    let result = await fetchAllCompanies();
    if(result.length === 0){
      return res.status(404).json({message : "No companies found"})
    }
    return res.status(200).json(result);
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//companies/new
app.post("/companies/new", async (req, res) =>{
  let newCompany = req.body.newCompany;
  try{
    let result = await addNewCompany(newCompany);
    if(result.newCompany === null){
      return res.status(404).json({message : "Unable to create company"})
    }
    return res.status(200).json({message : "Company created successfully", result })    
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//companies/update/:id
app.post("/companies/update/:id", async (req, res) =>{
  let id = parseInt(req.params.id);
  let newCompanyData = req.body;
  try{
    let result = await updateCompanyById(id, newCompanyData);
    if(result.company === null){
      return res.status(404).json({message : "No company found"})
    }
    return res.status(200).json(result)
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//companies/delete
app.post("/companies/delete", async (req, res) =>{
  let id = parseInt(req.body.id);
  try{
    let result = await deleteCompanyById(id);
    if(result.company === null){
      return res.status(404).json({message : "No company found"})
    }
    return res.status(200).json({'message': 'Company record deleted successfully'})
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})