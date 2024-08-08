const express = require("express");
let cors = require('cors');
const app = express();
let PORT = 3000;


app.use(cors());

//data
let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
];

//functions
function addTask(tasks, taskId, text, priority){
  let newTask = { taskId: taskId, text: text, priority: priority };
  tasks.push(newTask);
  return tasks;
}

function sortTasksByPriority(task1, task2){
  return task1.priority - task2.priority;
}

function updateTaskPriorityById(tasks, taskId, priority){
  for(let i = 0 ; i < tasks.length; i++){
    if(tasks[i].taskId === taskId){
      tasks[i].priority = priority;
      break;
    }
  }
  return tasks;
}

function updateTaskTextById(tasks, taskId, text){
  for(let i = 0 ; i < tasks.length; i++){
    if(tasks[i].taskId === taskId){
      tasks[i].text = text;
      break;
    }
  }
  return tasks;
}

function deleteTaskById(tasks, taskId){
  return tasks.filter(ele => ele.taskId !== taskId);
}

function filterByPriority(tasks, priority){
  return tasks.filter(ele => ele.priority === priority);
}

//endpoints
//tasks/add
app.get("/tasks/add", (req, res) =>{
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let result = addTask(tasks, taskId, text, priority);
  res.json({tasks : result})
})

//tasks
app.get("/tasks",(req, res) => {
  res.json({tasks : tasks })
})

//tasks/sort-by-priority
app.get("/tasks/sort-by-priority",(req, res) =>{
  let result = tasks.sort(sortTasksByPriority);
  res.json({tasks :result})
})

//tasks/edit-priority
app.get("/tasks/edit-priority",(req, res) =>{
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = updateTaskPriorityById(tasks, taskId, priority);
  res.json({tasks : result});
})

//tasks/edit-text
app.get("/tasks/edit-text",(req, res) =>{
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = updateTaskTextById(tasks, taskId, text);
  res.json({tasks : result});
})

//tasks/delete
app.get("/tasks/delete",(req, res) =>{
  let taskId = parseInt(req.query.taskId);
  let result = deleteTaskById(tasks, taskId);
  res.json({tasks : result});
})

//tasks/filter-by-priority
app.get("/tasks/filter-by-priority",(req, res) =>{
  let priority = parseInt(req.query.priority);
  let result = filterByPriority(tasks, priority);
  res.json({tasks : result});
})

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});