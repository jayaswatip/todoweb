// Load existing tasks on page load
window.onload = () => {
  loadTasks();
  applyTheme();
};

// Add new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  createTaskElement(taskText, false);
  saveTask(taskText, false);
  taskInput.value = "";
}

// Create list item UI
function createTaskElement(text, completed) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  li.innerHTML = `
    <span onclick="toggleComplete(this)">${text}</span>
    <button class="delete-btn" onclick="deleteTask(this)">X</button>
  `;
  document.getElementById("taskList").appendChild(li);
}

// Toggle task completed
function toggleComplete(span) {
  const li = span.parentElement;
  li.classList.toggle("completed");
  updateStorage();
}

// Delete task
function deleteTask(button) {
  const li = button.parentElement;
  li.remove();
  updateStorage();
}

// Save task to local storage
function saveTask(text, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from storage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}

// Update storage when modified
function updateStorage() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.querySelector("span").innerText;
    const completed = li.classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Toggle dark/light mode
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

// Apply saved theme
function applyTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark-mode");
  }
}
