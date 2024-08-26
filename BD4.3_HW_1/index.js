const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

//db connection
(async () => {
  db = await open({
    filename: "database.sqlite",
    driver: sqlite3.Database,
  });
})();

//functions
async function filterByGender(gender) {
  let query = "SELECT * FROM employees WHERE gender = ?";
  let result = await db.all(query, [gender]);
  return { employees: result };
}

async function filterByDepartment(department) {
  let query = "SELECT * FROM employees WHERE department = ?";
  let result = await db.all(query, [department]);
  return { employees: result };
}

async function filterByJobTitle(job_title) {
  let query = "SELECT * FROM employees WHERE job_title = ?";
  let result = await db.all(query, [job_title]);
  return { employees: result };
}

async function filterByLocation(location) {
  let query = "SELECT * FROM employees WHERE location = ?";
  let result = await db.all(query, [location]);
  return { employees: result };
}

//endpoints
app.get("/", (req, res) => {
  res.status(200).json({ message: "Conneced to BD4.3_HW_1" });
});

//employees/gender/:gender
app.get("/employees/gender/:gender", async (req, res) => {
  let gender = req.params.gender;
  try {
    let result = await filterByGender(gender);
    if (result.employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//employees/department/:department
app.get("/employees/department/:department", async (req, res) => {
  let department = req.params.department;
  try {
    let result = await filterByDepartment(department);
    if (result.employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//employees/job_title/:job_title
app.get("/employees/job_title/:job_title", async (req, res) => {
  let job_title = req.params.job_title;
  try {
    let result = await filterByJobTitle(job_title);
    if (result.employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

///employees/location/:location
app.get("/employees/location/:location", async (req, res) => {
  let location = req.params.location;
  try {
    let result = await filterByLocation(location);
    if (result.employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
