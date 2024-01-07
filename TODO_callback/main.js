import data from './tasks.json' assert {type: 'json'};

const STATUS = {
    TO_DO: 'to do',
    IN_PROGRESS: 'in progress',
    DONE: 'done'
};

const PRIORITY = {
    HIGH: 'high',
    MIDDLE: 'middle',
    LOW: 'low'
};

const ERROR = {
    PRIORITY: 'Invalid priority value. Select the correct value : high, middle or low',
    STATUS: 'Invalid status value. Select the correct value : to do, in progress or done',
    INVALID_TASK_NAME: 'Enter a correct task name',
    TASK_IS_NOT_EXIST: 'There is no task with this name',
    TASK_NAME_ALREADY_EXIST: 'A task with the same name already exists',
    INVALID_TASK_NAME_LENGHT: 'The task name should not be shorter than 3 characters and longer than 30 characters',
};

const toDoList = [];

const highPriorityForm = document.forms[0]
const lowPriorityForm = document.forms[1]

const highPriorityList = document.querySelector('#high-priority-list');
const lowPriorityList = document.querySelector('#low-priority-list');

let uniqueId = 0;

const checkTaskNameTitle = (newTaskTitle) => {
    if (newTaskTitle === '') {
        throw new Error(ERROR.INVALID_TASK_NAME);
    }
};

const checkTaskNameLenght = (newTaskTitle) => {
    if (newTaskTitle.length > 30 || newTaskTitle.length < 3) {
        throw new Error(ERROR.INVALID_TASK_NAME_LENGHT);
    }
};

const checkingTheExistenceOfATask = (taskIndex) => {
    if (taskIndex >= 0) {
        toDoList.splice(taskIndex, 1);
        taskList();
    } else {
        throw new Error(ERROR.TASK_IS_NOT_EXIST);
    };
};

const taskList = () => {
    highPriorityList.replaceChildren();
    lowPriorityList.replaceChildren();

    toDoList.forEach(element => {
        createElement(element.id, element.task, element.priority);
    }
    );
};

const createElement = (id, text, priority) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const deleteButton = document.createElement('button');

    const crossIcon = document.createElement('img');
    crossIcon.src = './img/delete-icon.svg';

    deleteButton.classList.add('icon');
    deleteButton.appendChild(crossIcon);

    deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        const taskIndex = toDoList.findIndex(item => item.id === id);
        try {
            checkingTheExistenceOfATask(taskIndex);
        } catch (error) {
            alert('Error: ' + error.message);
            console.log(error.message)
        }

    });

    label.setAttribute('for', `task${id}`);
    label.textContent = text;

    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox-task');
    checkbox.id = `task${id}`;

    li.classList.add('task-item');
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteButton);

    const currentList = priority === PRIORITY.HIGH ? highPriorityList : lowPriorityList;
    currentList.appendChild(li);
}

const addTaskInList = (event) => {
    event.preventDefault();

    try {
        const formId = event.target.id;
        const currentPriority = formId === 'highPriority' ? PRIORITY.HIGH : PRIORITY.LOW;

        const newTaskTitle = event.target.elements[`${formId}TaskTitle`].value;

        event.target.elements[`${formId}TaskTitle`].value = ''

        checkTaskNameTitle(newTaskTitle);
        checkTaskNameLenght(newTaskTitle);

        const newTask = { id: ++uniqueId, task: newTaskTitle, status: STATUS.TO_DO, priority: currentPriority };
        toDoList.push(newTask);
        taskList();
    } catch (error) {
        alert('Error: ' + error.message);
        console.log(error.message)
    }

}

(() => {
    data.tasks.forEach(task => {
        toDoList.push(task)
    })
    uniqueId = data.tasks.length;
    taskList()
})();

highPriorityForm.addEventListener('submit', addTaskInList);
lowPriorityForm.addEventListener('submit', addTaskInList);


