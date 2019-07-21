let $toDoList;
var initialToDoList =[];
var newTask;
var addTaskButton;
var clearTaskButton;
var editDialog;
var saveButton;
var closeButton;
var editId;
var editText;
var editInput;

function main() {
    searchForElements();
    prepareInitialList();
    prepareDOMEvents();
}

function searchForElements() {
    $toDoList = document.getElementById('list');
    newTask = document.getElementById("input-text");
    addTaskButton = document.getElementById('add-task');
    clearTaskButton = document.getElementById('clear-text');
    editDialog = document.getElementById("edit-dialog");
    editInput = document.getElementById("edit-input");
    saveButton = document.getElementById("save");
    closeButton = document.getElementById("close");
};

function prepareDOMEvents() {
    $toDoList.addEventListener('click', listClickManager);
    addTaskButton.addEventListener('click', addNewElementToList);
    clearTaskButton.addEventListener('click',clearTextInput);
    saveButton.addEventListener('click', addEditTask);
    closeButton.addEventListener('click', closeDialog);
}

function prepareInitialList(){
    initialToDoList.forEach((todo,index) => {
        addElementToList(todo,index);
    });
}

function addElementToList(titleElement, index){
    addNewTask(titleElement, index);
}

function addNewElementToList(){
    const idTask = initialToDoList.length + 1;
    addNewTask(newTask.value, idTask);
}

function addNewTask(titleTask,idTask) {
    if(validateInput(titleTask) !== false) {
        var newElement = document.createElement('li');
        newElement.id = idTask.toString();
        
        var newLabel = document.createElement('label');
        newLabel.classList.add("task-text");
        newLabel.innerText = titleTask;
        newElement.appendChild(newLabel);

        var newMarkSpan = document.createElement('span');
        newMarkSpan.classList.add("done-icon");
        newMarkSpan.innerText = 'DONE!';
        newElement.appendChild(newMarkSpan);
        
        var newDelButton = document.createElement('button');
        newDelButton.classList.add("delete-button");
        newDelButton.innerText = 'Delete';
        newElement.appendChild(newDelButton);

        var newEditButton = document.createElement('button');
        newEditButton.classList.add("edit-button");
        newEditButton.innerText = 'Edit';
        newElement.appendChild(newEditButton);

        var newMarkButton = document.createElement('button');
        newMarkButton.classList.add("mark-button");
        newMarkButton.innerText = 'Mark as Done';
        newElement.appendChild(newMarkButton);

        $toDoList.appendChild(newElement);
    }
}

function validateInput(task) {
    if (task == "") {
      alert("Field (title..) is empty!");
      return false;
    }
}

function clearTextInput(){
    newTask.value = '';
}

function listClickManager(eventObject) {
    var target = eventObject.target;
    var parent = target.parentElement;
    //var id_element = target.id;
    var target_class = target.className;
    //console.log(target_class,target_class)
    if (target_class==='delete-button'){
        parent.remove();
    } else if (target_class==='mark-button'){
        insert_check(parent);
    } else if (target_class==='edit-button'){
        showDialog(parent);
    }
}   

function showDialog(elementList) {
    editId = elementList.id;
    editText = elementList.getElementsByClassName("task-text")[0].innerText;
    editInput.value = editText;
    editDialog.style.display = "block";
}

function addEditTask(){
    var activeElement = document.getElementById(editId);
    var activeLabel = activeElement.getElementsByClassName("task-text")[0];
    activeLabel.innerText = editInput.value;
    editDialog.style.display = "none";
}

function closeDialog() {
    editDialog.style.display = "none";
}

function insert_check(elementList){ 
    var markSpan = elementList.getElementsByClassName("done-icon")[0];
    //console.log(markSpan);
    //console.log('markSpan.style.color',markSpan.style.color);
    if (markSpan.style.color === 'gray') {
        markSpan.style.color = 'green';
    } else {
        markSpan.style.color = 'gray';
    }
}
document.addEventListener('DOMContentLoaded', main);