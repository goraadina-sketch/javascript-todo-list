
const titleH1 = document.querySelector("#title");
const taskCounter = document.querySelector("#taskCounter");
const completedCounter = document.querySelector("#completedCounter");
const taskInput = document.querySelector("#taskInput");
const prioritySelect = document.querySelector("#prioritySelect");
const addTaskBtn = document.querySelector("#addTaskBtn");

const taskList = document.querySelector("#taskList");

let completedCount = 0;
let taskCount = 0;
let tasks = [];

function updateTitle() {
  if (completedCount === taskCount && taskCount > 0) {
    titleH1.textContent = " Everything Completed!";
  } else {
    titleH1.textContent = "My Todo List";
  }
}

function updateTaskCounter() {
  taskCounter.textContent = ` Task: ${taskCount}`;
}

function updateCompletedCounter() {
  completedCounter.textContent = `Completed: ${completedCount}`;
}

function updatePriorityLabel(priorityLabel, priority) {
  priorityLabel.classList.remove(
    "priority-low",
    "priority-medium",
    "priority-high"
  );

  if (priority === "low") {
    priorityLabel.textContent = "🟢 Low";
    priorityLabel.classList.add("priority-low");
  } else if (priority === "medium") {
    priorityLabel.textContent = "🟡 Medium";
    priorityLabel.classList.add("priority-medium");
  } else {
    priorityLabel.textContent = "🔴 High";
    priorityLabel.classList.add("priority-high");
  }
}

function createTask(taskText, priority) {

  //Create elements
  const newDiv = document.createElement("div");
  const item = document.createElement("p");
  const priorityLabel = document.createElement("span");

  const btnComplete = document.createElement("button");
  const btnDelete = document.createElement("button");
  const btnEdit = document.createElement("button");
  const btnPriority = document.createElement("button");

  btnComplete.classList.add("btn-complete");
  btnEdit.classList.add("btn-edit");
  btnDelete.classList.add("btn-delete");
  btnPriority.classList.add("btn-priority");

  //Configure elements
  item.textContent = taskText;

  btnComplete.textContent = "Complete";
  btnEdit.textContent = "Edit";
  btnDelete.textContent = "Delete";
  btnPriority.textContent = "Change Priority";

  updatePriorityLabel(priorityLabel, priority);

  // Add elements to the task
  newDiv.classList.add("task");

  newDiv.appendChild(priorityLabel);
  newDiv.appendChild(item);
  newDiv.appendChild(btnComplete);
  newDiv.appendChild(btnEdit);
  newDiv.appendChild(btnDelete);
  newDiv.appendChild(btnPriority);

  //Display task
  taskList.appendChild(newDiv);

  //Update state
  taskCount++;
  updateTaskCounter();
  updateTitle();

  //Complete button
  btnComplete.addEventListener("click", () => {
    newDiv.classList.add("completed");

    completedCount++;
    updateCompletedCounter();

    btnComplete.textContent = "Completed";
    btnComplete.disabled = true;
    btnEdit.disabled = true;

    updateTitle();
  });

  //edit button
  let newInput;

  btnEdit.addEventListener("click", () => {
    if (btnComplete.disabled) return;

    if (btnEdit.textContent === "Edit") {
      newInput = document.createElement("input");

      newInput.value = item.textContent;

      newDiv.replaceChild(newInput, item);

      btnEdit.textContent = "Save";
    } else {
      const editedText = newInput.value.trim();

      if (editedText === "") return;

      item.textContent = editedText;

      newDiv.replaceChild(item, newInput);

      btnEdit.textContent = "Edit";
    }
  });

  // delete button
  btnDelete.addEventListener("click", () => {
    if (btnComplete.disabled === true) {
      completedCount--;
      updateCompletedCounter();
    }

    taskCount--;
    updateTaskCounter();

    newDiv.remove();
    updateTitle();
  });

  // Change Priority button
  btnPriority.addEventListener("click", () => {
    if (priority === "low") {
      priority = "medium";
    } else if (priority === "medium") {
      priority = "high";
    } else {
      priority = "low";
    }

    updatePriorityLabel(priorityLabel, priority);
  });
}

addTaskBtn.addEventListener("click", (e) => {
 
  e.preventDefault();

  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (taskText === "") return;

  const task = {
  text: taskText,
  priority: priority,
  completed: false
 };

  tasks.push(task);
  console.log(tasks);

  createTask(taskText, priority);

  taskInput.value = "";
  taskInput.focus();
});
