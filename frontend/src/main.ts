import { fetchTasks, addTask, deleteTask } from "./api";
import { Task } from "./types";

// DOM elements
const taskForm = document.getElementById('task-form') as HTMLFormElement
const taskInput = document.getElementById('task-input') as HTMLInputElement
const taskList = document.getElementById('task-list') as HTMLUListElement

const renderTasks = (tasks: Task[]) => {
  taskList.innerHTML = ''; // Clear the list first
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${task.text}
      <button class="delete-btn" data-id="${task.id}">Delete</button>
    `;
    taskList.appendChild(li);
  });

  // Click handlers to all delete buttons
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = Number(btn.getAttribute('data-id')) // Get task ID
      await deleteTask(id); // Call backend
      const tasks = await fetchTasks(); // Refresh the list
      renderTasks(tasks);
    });
  });
};

// Load tasks when the page starts
fetchTasks().then(renderTasks);

// Handle form submission (adding a task)
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent page reload
  const text = taskInput.value.trim();
  if (!text) return // Basic validation (similar to @NotBlank in Java)

  await addTask(text); // Call backend
  taskInput.value = ''; // Clear input
  const tasks = await fetchTasks(); // Refresh list
  renderTasks(tasks);
});