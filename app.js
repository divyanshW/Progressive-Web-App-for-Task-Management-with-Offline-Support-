document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    
    // Ensure taskInput exists and is an input field
    if (!taskInput || !(taskInput instanceof HTMLInputElement)) {
        console.error("taskInput element not found or is not an input field");
        return;
    }

    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let task = { id: Date.now(), text: taskText };

    if (typeof saveTask === "function") {
        saveTask(task);
    } else {
        console.error("saveTask function is not defined.");
    }

    renderTask(task);
    taskInput.value = ""; // Reset input field
}

function loadTasks() {
    getTasks().then((tasks) => {
        console.log("Loaded tasks:", tasks);

        if (!Array.isArray(tasks) || tasks.length === 0) {
            console.warn("Tasks not found or empty, retrying...");
            setTimeout(loadTasks, 500); // Retry after a delay
            return;
        }

        let ul = document.getElementById("taskList");
        if (!ul) {
            console.error("taskList element not found");
            return;
        }

        ul.innerHTML = ""; // Clear previous content

        tasks.forEach(renderTask);
    }).catch((error) => {
        console.error("Error loading tasks:", error);
    });
}

// Ensure IndexedDB is ready before trying to load tasks
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(loadTasks, 500); // Delay to let IndexedDB initialize
});


// Ensure IndexedDB is ready before running loadTasks()
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(loadTasks, 500); // Small delay to allow IndexedDB to load
});


function renderTask(task) {
    let ul = document.getElementById("taskList");
    if (!ul) {
        console.error("taskList element not found");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `${task.text} <button onclick="deleteTask(${task.id})">Delete</button>`;
    li.setAttribute("data-id", task.id);
    ul.appendChild(li);
}




function deleteTask(id) {
    if (typeof removeTask === "function") {
        removeTask(id);
    } else {
        console.error("removeTask function is not defined.");
    }

    let taskElement = document.querySelector(`li[data-id='${id}']`);
    if (taskElement) {
        taskElement.remove();
    } else {
        console.error("Task element not found for id:", id);
    }
}

