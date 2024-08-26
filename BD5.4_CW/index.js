const express = require("express");
const app = express();
const PORT = 3000;
const { sequelize } = require("./lib/index.js");
const { user } = require("./models/user.model.js");
const { track } = require("./models/track.model.js");

app.use(express.json());

const tracks = [
  {
    name: "Raabta",
    genre: "Romantic",
    release_year: 2012,
    artist: "Arijit Singh",
    album: "Agent Vinod",
    duration: 4,
  },
  {
    name: "Naina Da Kya Kasoor",
    genre: "Pop",
    release_year: 2018,
    artist: "Amit Trivedi",
    album: "Andhadhun",
    duration: 3,
  },
  {
    name: "Ghoomar",
    genre: "Traditional",
    release_year: 2018,
    artist: "Shreya Ghoshal",
    album: "Padmaavat",
    duration: 3,
  },
  {
    name: "Bekhayali",
    genre: "Rock",
    release_year: 2019,
    artist: "Sachet Tandon",
    album: "Kabir Singh",
    duration: 6,
  },
  {
    name: "Hawa Banke",
    genre: "Romantic",
    release_year: 2019,
    artist: "Darshan Raval",
    album: "Hawa Banke (Single)",
    duration: 3,
  },
  {
    name: "Ghungroo",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "War",
    duration: 5,
  },
  {
    name: "Makhna",
    genre: "Hip-Hop",
    release_year: 2019,
    artist: "Tanishk Bagchi",
    album: "Drive",
    duration: 3,
  },
  {
    name: "Tera Ban Jaunga",
    genre: "Romantic",
    release_year: 2019,
    artist: "Tulsi Kumar",
    album: "Kabir Singh",
    duration: 3,
  },
  {
    name: "First Class",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 4,
  },
  {
    name: "Kalank Title Track",
    genre: "Romantic",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 5,
  },
];

//functions
async function addNewUser(newUser) {
  let result = await user.create(newUser);
  return { newUser: result };
}

async function updateUserById(id, newUserData) {
  let userDetails = await user.findOne({ where: { id } });
  if (!userDetails) {
    return {};
  }
  userDetails.set(newUserData);
  let updatedUser = await userDetails.save();
  return { message: "User updated successfully", updatedUser };
}

//seed data
app.get("/seed_data", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await track.bulkCreate(tracks);
    res.status(200).json({ message: "Database seeded successfully" });
  } catch (err) {
    console.error("Unable to seed data");
    res.status(500).json({ message: err.message });
  }
});

//endpoints
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the BD5.4_CW !" });
});

///users/new
app.post("/users/new", async (req, res) => {
  const newUser = req.body.newUser;
  try {
    let result = await addNewUser(newUser);
    if (result.newUser === null) {
      return res.status(404).json({ message: "Unable to create user" });
    }
    return res
      .status(200)
      .json({ message: "User created successfully", result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

///users/update/:id
app.post("/users/update/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const newUserData = req.body;
  try {
    let result = await updateUserById(id, newUserData);
    if (result === null) {
      return res.status(404).json({ message: "No user found" });
    }
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
