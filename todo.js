const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;
    if (task.completed) taskText.classList.add("completed");

    taskText.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.className = "btn edit-btn";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    actions.append(editBtn, deleteBtn);
    li.append(taskText, actions);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

function editTask(index) {
  const li = taskList.children[index];
  li.innerHTML = "";

  const input = document.createElement("input");
  input.type = "text";
  input.value = tasks[index].text;
  input.className = "task-edit-input";

  const actions = document.createElement("div");
  actions.className = "actions";

  const saveBtn = document.createElement("button");
  saveBtn.className = "btn save-btn";
  saveBtn.textContent = "Save";
  saveBtn.onclick = () => {
    const updated = input.value.trim();
    if (!updated) return;
    tasks[index].text = updated;
    saveTasks();
    renderTasks();
  };

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "btn cancel-btn";
  cancelBtn.textContent = "Cancel";
  cancelBtn.onclick = renderTasks;

  actions.append(saveBtn, cancelBtn);
  li.append(input, actions);
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

renderTasks();