// Run the script after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Select important DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false prevents saving again
    }

    // Function to add a new task to the list
    // save parameter: if true, the task will also be stored in Local Storage
    function addTask(taskText = null, save = true) {
        // If no taskText is passed, get it from input field
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }

        // Prevent adding empty tasks
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create a new list item <li>
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Remove the list item when the remove button is clicked
        removeButton.onclick = function () {
            taskList.removeChild(listItem);

            // Update Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };

        // Append button to list item, then list item to the list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Clear input field if task was typed in
        if (taskText === taskInput.value.trim()) {
            taskInput.value = "";
        }

        // Save to Local Storage if required
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Allow adding tasks with Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load existing tasks from Local Storage on page load
    loadTasks();

});