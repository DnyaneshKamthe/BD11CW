const express = require('express');
const app = express();
let PORT = 3000;

let githubPublicData = {
 username : "dnyaneshkamthe",
  fullname : "Dnyanesh Sukhdeo Kamthe",
  email : "dnyaneshkamthe6@gmail.com",
  repositories : 25,
  gists : 12,
  joinedOn : "October 2021",
}

function getProfileUrl(githubPublicData){
  return `https://api.github.com/${githubPublicData.username}`
}

function getPublicEmail (githubPublicData){
  return githubPublicData.email;
}

function getUserBio(githubPublicData){
  return {
    fullName : githubPublicData.fullname,
    joinedOn : githubPublicData.joinedOn,
    email : githubPublicData.email,
  }
}

//github-profile
app.get("/github-profile", (req, res) => {
  let profileUrl = getProfileUrl(githubPublicData);
  res.json({profileUrl: profileUrl});
})

//github-public-email
app.get("/github-public-email", (req, res) =>{
  let publicEmail = getPublicEmail (githubPublicData);
  res.json({PublicEmail: publicEmail});
})

//github-repos-count 
app.get("/github-repos-count", (req, res) =>{
  let reposCount = githubPublicData.repositories;
  res.json({reposCount: reposCount});
})

//github-gists-count
app.get("/github-gists-count", (req, res) =>{
  let gistsCount = githubPublicData.gists;
  res.json({gistsCount: gistsCount});
})

//github-user-bio
app.get("/github-user-bio", (req, res) =>{
  let userBio = getUserBio(githubPublicData);
  res.json(userBio);
})

//github-repo-url
app.get("/github-repo-url", (req, res) =>{
  let repoName = req.query.repoName;
  let repoUrl = `https://api.github.com/${githubPublicData.username}/${repoName}`;
  res.json({repoUrl: repoUrl});
  
})

app.listen(PORT, ()=>{
  console.log("Server is running on port 3000");
})
