//Step 1 — Define what should happen
//For the first version, the behavior will be:
//Every task gets an Edit button.
//When you click Edit, the task text becomes editable.
//The Edit button changes to Save.
//When you click Save, the new text replaces the old task text.
//The button changes back to Edit.

const titleH1 = document.querySelector("#title");
const taskCounter = document.querySelector("#taskCounter");
const completedCounter = document.querySelector("#completedCounter");
const taskInput = document.querySelector("#taskInput");
const prioritySelect = document.querySelector("#prioritySelect");
const button = document.querySelector("#button");

const taskList = document.querySelector("#taskList");

let completedCount = 0;
let taskCount = 0;

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
  if (priority === "low") {
    priorityLabel.textContent = "🟢 Low";
    priorityLabel.style.color = "green";
  } else if (priority === "medium") {
    priorityLabel.textContent = "🟡 Medium";
    priorityLabel.style.color = "yellow";
  } else if (priority === "high") {
    priorityLabel.textContent = "🔴 High";
    priorityLabel.style.color = "red";
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

  //Complete the button
  btnComplete.addEventListener("click", () => {
    newDiv.style.background = "lightgreen";
    item.style.color = "darkgreen";

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

button.addEventListener("click", (e) => {
  // 1. Validate
  // 2. Create elements
  // 3. Configure elements
  // 4. Build the task structure
  // 5. Add it to the page
  // 6. Update state and interface
  // 7. Add behavior to the new  buttons
  e.preventDefault();

  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (taskText === "") return;

  createTask(taskText, priority);

  taskInput.value = "";
});
