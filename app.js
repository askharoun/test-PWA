const app = document.getElementById('app');

const params = new URLSearchParams(window.location.search);
const fromShortcut = params.get('source') === 'shortcut';

const isStandalone =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;

// 🔥 INTERCEPT MODE
if (fromShortcut && isStandalone) {
  app.innerHTML = `
    <h1>😈 Pause.</h1>
    <p>You tried to open Instagram.</p>

    <video autoplay muted playsinline loop width="100%">
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
    </video>

    <button id="continue">Open Instagram Anyway</button>
  `;

  document.getElementById('continue').onclick = () => {
    window.location.href = 'instagram://';
  };

  // optional haptic
  if (navigator.vibrate) navigator.vibrate(200);
  return;
}

// 📝 NORMAL TODO APP
app.innerHTML = `
  <h1>📝 To-Do</h1>

  <form id="todo-form">
    <input id="todo-input" placeholder="Add a task…" required />
    <button>Add</button>
  </form>

  <ul id="todo-list"></ul>
`;

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
      <button onclick="removeTodo(${i})">✕</button>
    `;
    list.appendChild(li);
  });
}

window.removeTodo = i => {
  todos.splice(i, 1);
  save();
  render();
};

form.addEventListener('submit', e => {
  e.preventDefault();
  todos.push(input.value);
  input.value = '';
  save();
  render();
});

render();
