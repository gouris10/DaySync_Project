const API_AUTH = "http://localhost:8080/api/auth";
const API_TASK = "http://localhost:8080/api/tasks";

let allTasks = [];

/* ========================= */
/* PAGE LOAD */
/* ========================= */

window.onload = function(){

const username = localStorage.getItem("username");

if(username && document.getElementById("welcomeUser")){
document.getElementById("welcomeUser").innerText = username;
}

if(document.getElementById("taskList")){
loadTasks();
loadTodayCount();
loadProgress();
}

};

function startApp(){

const username = localStorage.getItem("username");

// If user not logged in → redirect
if(!username){
window.location.href = "login.html";
return;
}

// Show username if element exists
const welcomeUser = document.getElementById("welcomeUser");

if(welcomeUser){
welcomeUser.innerText = username;
}

// Only load tasks if task page elements exist
if(document.getElementById("taskList")){
loadTasks();
}

if(document.getElementById("todayCount")){
loadTodayCount();
}

if(document.getElementById("progressBar")){
loadProgress();
}

}

/* ========================= */
/* REGISTER */
/* ========================= */

async function register(){

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

const res = await fetch(API_AUTH + "/register",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({username,password})
});

if(res.ok){
alert("Registration successful");
window.location.href="login.html";
}else{
alert("Registration failed");
}

}


/* ========================= */
/* LOGIN */
/* ========================= */

async function login(){

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

const res = await fetch(API_AUTH + "/login",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({username,password})
});

const user = await res.json();

if(user){
localStorage.setItem("username",username);
window.location.href="index.html";
}else{
alert("Invalid login");
}

}


/* ========================= */
/* LOAD INBOX */
/* ========================= */

async function loadTasks(){

const username = localStorage.getItem("username");

const res = await fetch(API_TASK + "/incomplete?username=" + username);

if(!res.ok){
console.error("API failed");
return;
}

const tasks = await res.json();

if(!Array.isArray(tasks)){
console.error("Tasks not array",tasks);
return;
}

allTasks = tasks;

renderTasks(tasks,false);

}


/* ========================= */
/* LOAD TODAY PAGE */
/* ========================= */

async function loadToday(){

const username = localStorage.getItem("username");

const res = await fetch(API_TASK + "/incomplete?username=" + username);

const tasks = await res.json();

const today = new Date().toISOString().split("T")[0];

const todayTasks = tasks.filter(t => t.dueDate === today);

renderTasks(todayTasks,false);

}


/* ========================= */
/* LOAD COMPLETED PAGE */
/* ========================= */

async function loadCompletedPage(){

const username = localStorage.getItem("username");

const res = await fetch(API_TASK + "/completed?username=" + username);

const tasks = await res.json();

renderTasks(tasks,true);

}


/* ========================= */
/* RENDER TASKS */
/* ========================= */

function renderTasks(tasks,completed){

const list = document.getElementById("taskList");

list.innerHTML="";

tasks.forEach(task => {

list.innerHTML += `

<div class="task-card">

<div class="task-title">${task.title}</div>

<div class="task-info">${task.description || ""}</div>

<div class="task-info">
Category: ${task.category} |
Priority: ${task.priority} |
Due: ${task.dueDate || "-"}
</div>

<div class="task-buttons">

${completed ? "" :
`<button class="complete-btn" onclick="completeTask(${task.id})">
Complete
</button>`}

<button class="delete-btn" onclick="deleteTask(${task.id})">
Delete
</button>

</div>

</div>

`;

});

}


/* ========================= */
/* ADD TASK */
/* ========================= */

async function addTask(){

const username = localStorage.getItem("username");

const title = document.getElementById("title").value;
const description = document.getElementById("description").value;
const category = document.getElementById("category").value;
const priority = document.getElementById("priority").value;
const dueDate = document.getElementById("dueDate").value;

await fetch(API_TASK + "/add",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({
title,
description,
category,
priority,
dueDate,
username
})
});

clearForm();

loadTasks();
loadTodayCount();
loadProgress();

}


/* ========================= */
/* COMPLETE TASK */
/* ========================= */

async function completeTask(id){

await fetch(API_TASK + "/complete/" + id,{
method:"PUT"
});

loadTasks();
loadTodayCount();
loadProgress();

}


/* ========================= */
/* DELETE TASK */
/* ========================= */

async function deleteTask(id){

await fetch(API_TASK + "/delete/" + id,{
method:"DELETE"
});

loadTasks();
loadTodayCount();
loadProgress();

}


/* ========================= */
/* CLEAR FORM */
/* ========================= */

function clearForm(){

document.getElementById("title").value="";
document.getElementById("description").value="";
document.getElementById("dueDate").value="";

}


/* ========================= */
/* TODAY BADGE */
/* ========================= */

async function loadTodayCount(){

const username = localStorage.getItem("username");

const res = await fetch(API_TASK + "/incomplete?username=" + username);

const tasks = await res.json();

const today = new Date().toISOString().split("T")[0];

const todayTasks = tasks.filter(t => t.dueDate === today);

document.getElementById("todayCount").innerText = todayTasks.length;

}


/* ========================= */
/* PROGRESS BAR */
/* ========================= */

async function loadProgress(){

const username = localStorage.getItem("username");

const incompleteRes = await fetch(API_TASK + "/incomplete?username=" + username);
const completedRes = await fetch(API_TASK + "/completed?username=" + username);

const incomplete = await incompleteRes.json();
const completed = await completedRes.json();

const total = incomplete.length + completed.length;

let percent = 0;

if(total > 0){
percent = (completed.length / total) * 100;
}

document.getElementById("progressBar").style.width = percent + "%";

document.getElementById("progressText").innerText =
completed.length + " / " + total + " tasks completed";

}


/* ========================= */
/* FILTERS */
/* ========================= */

function applyFilters(){

let filtered = [...allTasks];

const category = document.getElementById("filterCategory").value;
const priority = document.getElementById("filterPriority").value;
const date = document.getElementById("filterDate").value;

if(category){
filtered = filtered.filter(t => t.category === category);
}

if(priority){
filtered = filtered.filter(t => t.priority === priority);
}

if(date){
filtered = filtered.filter(t => t.dueDate === date);
}

renderTasks(filtered,false);

}


/* ========================= */
/* CLEAR FILTER */
/* ========================= */

function clearFilters(){

document.getElementById("filterCategory").value="";
document.getElementById("filterPriority").value="";
document.getElementById("filterDate").value="";

renderTasks(allTasks,false);

}


/* ========================= */
/* LOGOUT */
/* ========================= */

function logout(){

localStorage.removeItem("username");

window.location.href="login.html";
}
window.addEventListener("DOMContentLoaded", startApp);