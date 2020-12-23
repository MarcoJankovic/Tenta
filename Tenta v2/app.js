     // Element Selector //
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');


// eventListener ///
todoForm.addEventListener('submit', function(event) {

  event.preventDefault();
  addTodo(todoInput.value);
});

// Get Document And Add Listener //
document.getElementById('btn-2').addEventListener('click', getJson);

 // Get Local Json Data //
 function getJson() {
  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let output = '';
      data.forEach(function(data) {
        output += `     
        <li>${data.todos}</li>
        `
      });
      document.getElementsByClassName('.output').innerHTML = output;
    })
    .catch(err => console.log(err));
}
getJson();

let todos = [];

function addTodo(item) {

  if (item !== '') {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };

    todos.push(todo);
    addToLocalStorage(todos);
    todoInput.value = '';
  }
}


function renderTodos(todos) {

  todoItemsList.innerHTML = '';
  
  todos.forEach(function(item) {

    const checked = item.completed ? 'checked': null;

    const li = document.createElement('li');

    li.setAttribute('class', 'item');
    li.setAttribute('value', item.id);
 
    if (item.completed === true) {
      li.classList.add('checked');
    }

    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
    todoItemsList.append(li);
  });

}


function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(todos);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  if (reference) {
 
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}


function toggle(id) {
  todos.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  addToLocalStorage(todos);
}


function deleteTodo(id) {
  todos = todos.filter(function(item) {
    return item.id != id;
  });
  addToLocalStorage(todos);
}

getFromLocalStorage();
todoItemsList.addEventListener('click', function(event) {
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('value'));
  }
  if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('value'));
  }
});

