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

