const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function render() {
  list.innerHTML = '';
  todos.forEach((todo, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${todo}</span>
      <button onclick="remove(${i})">✕</button>
    `;
    list.appendChild(li);
  });
}

function remove(index) {
  todos.splice(index, 1);
  save();
  render();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  todos.push(input.value);
  input.value = '';
  save();
  render();
});

render();
