// Add an event listener to the #add-task input field
// Only addTask if there is text in the input
// Remove the task text in the input once its added
function addTaskHandle() {
    let taskValue = document.getElementById('task-value').value;
    taskValue = taskValue.toLowerCase();
    taskValue = taskValue.charAt(0).toUpperCase() + taskValue.slice(1);
    if (taskValue) addTask(taskValue);
    document.getElementById('task-value').value = '';
}

document.getElementById('add-task').addEventListener('click', addTaskHandle);

//adding a task when pressing <ENTER> on the keyboard
document.getElementById('task-value').addEventListener('keypress', function(e) {
    if (e.key == 'Enter') addTaskHandle();
});

////// TASK FUNCTIONS

// Create a function addTask
const addTask = taskValue => {
    let task = document.createElement('li');
    task.classList.add('task');
    task.classList.add('fill');
    task.draggable = true;
    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', dragEnd);

    let taskContent = document.createElement('div');
    taskContent.classList.add("task-content");
    taskContent.innerText = taskValue;

    let trash = document.createElement('div');
    trash.classList.add('trash');
    trash.innerText = "X";
    trash.addEventListener('click', removeTask);


    task.appendChild(taskContent);
    task.appendChild(trash);

    let tasks = document.getElementById('tasks-added');
    tasks.prepend(task);
  }


// Create a function removeTask
const removeTask = (event) => {
    let task = event.target.parentNode;
    task.remove();
}

////// DRAG & DROP

// Create a variable task to store the selected task
let task;

// Add an event listener dragstart to task
const dragStart = (event) => {
    event.target.className += ' hold';
    task = event.target;
    setTimeout(() => (event.target.className = "invisible"), 0);

}

// Create a dragEnd function
const dragEnd = (event) => {
    event.target.className = 'task fill';
}

// Create dropzones by selecting .dropzone
const dropzones = document.querySelectorAll('.dropzone');

// Create a function dragEnter
const dragEnter = (event) => {
    event.preventDefault();
    if (event.target.nodeName == 'UL') event.target.parentNode.classList.toggle("hovered");
};

// Create a function dragOver
const dragOver = (event) => {
    event.preventDefault();
};

// Create a function dragLeave
const dragLeave = (event) => {
    if (event.target.nodeName == 'UL') event.target.parentNode.classList.toggle("hovered");
};

// Create a function dragDrop
const dragDrop = (event) => {
    event.preventDefault();
    //prevent to append a child in a LI element
    if (event.target.nodeName == 'UL') event.target.appendChild(task);
    //hovered style bug fixed by removing from div
    if (event.target.nodeName == 'UL') event.target.parentNode.classList.toggle("hovered");
};

// Add eventlisteners to each dropzone
dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragenter', dragEnter);
    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('dragleave', dragLeave);
    dropzone.addEventListener('drop', dragDrop);
});
