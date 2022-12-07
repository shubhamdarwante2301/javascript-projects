let input = document.getElementById("input");
let totalTask = document.getElementById("total");
let todoList = document.getElementById("todo-list");
let addBtn = document.getElementById("add-todo-btn");
let toast = document.getElementById('toast');

let checkInterval = false;

function clearToast () {
  if(checkInterval == true) {
    return;
  }
  if(toast.childElementCount > 0){
    checkInterval = true;
    let intervalId = setInterval(()=>{
      toast.removeChild(toast.lastChild);
      if(toast.childElementCount == 0){
        clearInterval(intervalId);
        console.log("interval clear");
        checkInterval = false;
      }
    }, 800);
  }
}

function showToast (error) {
  let li = document.createElement('li');
  li.innerText = error;
  toast.insertBefore(li, toast.firstChild);
  clearToast();
}

function getTask (e) {
  if(e.key == 'Enter') {
    let content = input.value;
    if(content == "") {
      showToast("can not add empty task");
    } else {
      input.value = "";
      addTask(content);
    }
  }
}

function addTask (content) {
  let id = Date.now();
  let task = {
    isComplete: false,
    task: content,
    id: id
  }
  window.localStorage.setItem(id, JSON.stringify(task));
  renderTask();
  showToast('Task Addedd');
}

function taskCompleted (taskId) {
  let tempTask = JSON.parse(localStorage.getItem(taskId));
  if(tempTask.isComplete==true) {
    tempTask.isComplete = false;
  } else {
    tempTask.isComplete = true;
  }
  // tempTask.isComplete ? false : true;
  localStorage.setItem(taskId, JSON.stringify(tempTask));
  renderTask();
  showToast("Task Completed");
}

function deleteTask (taskId) {
  localStorage.removeItem(taskId);
  renderTask();
  showToast("Task Deleted");
}

function renderTask () {
  todoList.innerHTML = "";
  for(let i=0; i<localStorage.length; i++) {
    let t = JSON.parse(localStorage.getItem(localStorage.key(i)));
    let li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" id="${t.id}" ${t.isComplete ? "checked" : ""}>
                    <label for="${t.id}">${t.task}</label>
                    <i class="fa-solid fa-trash-can" id="${t.id}"></i>`;
    
    todoList.append(li);
  }
  totalTask.innerText = localStorage.length;
}
renderTask();

input.addEventListener('keypress', getTask);

addBtn.addEventListener('click', ()=>{
  let content = input.value;
    if(content == "") {
      showToast("can not add empty task");
    } else {
      input.value = "";
      addTask(content);
    }
});

document.addEventListener('click', (e)=>{
  if(e.target.classList.contains("fa-trash-can")){
    deleteTask(e.target.id);
  } else if(e.target.getAttribute('type')==="checkbox") {
    taskCompleted(e.target.id);
  }
})

// let arr = [];
// let input = document.getElementById("input");
// let totalTask = document.getElementById("total");
// let todoList = document.getElementById("todo-list");
// console.log(todoList);

// let showError = (error) => {
//   alert(error);
// };

// let findClickedTarget = (e) => {
//   if (e.target.id === "add-todo-btn") {
//     addTask();
//   } else if(e.target.classList.contains('fa-trash-can')) {
//     deleteTask(e);
//   } else if(e.target.getAttribute('data-type')==="checkbox") {
//     taskCompleted(e);
//     console.log("checkbox");
//   }
// };

// let addTask = () => {
//   let content = input.value;
//   let generateId = Date.now()
//   if (content != "") {
//     let myTask = {
//       completed: false,
//       text: content,
//       id: generateId,
//     };
//     arr.push(myTask);
//     renderTask();
//   } else {
//     showError("can not add empty task");
//   }
//   input.value = "";
// };

// let taskCompleted = (e) => {
//   let newArr = arr.map((obj)=>{
//     if(e.target.id === obj.id) {
//       obj.completed = true;
//     }
//     return obj;
//   })
//   arr = newArr;
//   renderTask();
// }

// let deleteTask = (e) => {
//   let newArr = arr.filter((obj)=>{
//     return obj.id != e.target.id;
//   })
//   arr = newArr;
//   renderTask();
//   console.log("deleted", e.target.id);
// }

// let renderTask = () => {
//   todoList.innerHTML = "";
//   arr.map((task) => {
//     let li = document.createElement("li");
//     li.innerHTML = `<input type="checkbox" id="${task.id}" data-type="checkbox">
//                     <label for="${task.id}">${task.completed ? task.text.strike() : task.text}</label>
//                     <i class="fa-solid fa-trash-can" id="${task.id}"></i>`;
//     todoList.append(li);
//   });
//   totalTask.innerText = arr.length;
// };

// document.addEventListener("click", findClickedTarget);
