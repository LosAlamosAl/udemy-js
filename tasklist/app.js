/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
// @ts-nocheck

// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
}

// Should refactor this tobe addTaskAndStoreInLS
// Pull out the code that adds the task to the DOM.
// It can be reused.
function addTask(e) {
  e.preventDefault();
  const newTask = taskInput.value;
  if (newTask !== '') {
    const newLi = document.createElement('li');
    newLi.className = 'collection-item';
    taskList.appendChild(newLi);
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></li>';
    newLi.appendChild(link);
    newLi.appendChild(document.createTextNode(newTask));
    taskInput.value = '';
  }
  storeTask(newTask);
}

function removeTask(e) {
  e.preventDefault();
  if (e.target.classList.contains('fa-remove')) {
    if (confirm('Sure?')) {
      removeTaskFromLS(e.target.parentElement.parentElement.textContent);
      e.target.parentElement.parentElement.remove();
    }
  }
}

function clearTasks() {
  if (confirm('Sure?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.lastChild);
    }
    localStorage.removeItem('tasks');
  }
}

function filterTasks(e) {
  const kids = Array.from(taskList.children);
  kids.forEach((elem) => {
    if (elem.textContent.includes(e.target.value)) {
      elem.style.display = 'block';
    } else {
      elem.style.display = 'none';
    }
  });
}

function storeTask(task) {
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
  const tasks = localStorage.getItem('tasks');
  if (tasks === null) {
    return;
  }
  const tasksArray = JSON.parse(tasks);
  tasksArray.forEach((elem) => {
    if (elem !== '') {
      const newLi = document.createElement('li');
      newLi.className = 'collection-item';
      taskList.appendChild(newLi);
      const link = document.createElement('a');
      link.className = 'delete-item secondary-content';
      link.innerHTML = '<i class="fa fa-remove"></li>';
      newLi.appendChild(link);
      newLi.appendChild(document.createTextNode(elem));
    }
  });
}

function removeTaskFromLS(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks === null) return; // This really couldn't happen.

  tasks.forEach((elem, index) => {
    if (task === elem) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
