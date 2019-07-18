var toDoList ;
var newTask;
var addTaskButton;
var editDialog;
var saveButton;
var closeButton;
var editId;
var editText;
var editInput;

function main() {
    searchForElements()
    prepareDOMEvents()
}

function searchForElements() {
    toDoList = document.getElementById('list');
    newTask = document.getElementById("input-text");
    addTaskButton = document.getElementById('add-task');
    editDialog = document.getElementById("edit-dialog");
    editInput = document.getElementById("edit-input")
    saveButton = document.getElementById("save")
    closeButton = document.getElementById("close");
};

function prepareDOMEvents() {
    toDoList.addEventListener('click', listClickManager);
    addTaskButton.addEventListener('click', addTask);
    saveButton.addEventListener('click', addEditTask)
    closeButton.addEventListener('click', closeDialog);
}

function validateInput(task) {
    if (task == "") {
      alert("Field (title..) is empty!");
      return false;
    }
  }

function countId (){
    var allElementsArray = [];
    var allElements = document.getElementsByTagName('li');
    for(var i = 0; i < allElements.length; i++) {
        allElementsArray.push(Number(allElements[i].id));
    }
    var maxId = Math.max(...allElementsArray)
    return maxId+1;
}
function addTask() {
    newId = countId()
    var titleTask = newTask.value;

    if(validateInput(titleTask) !== false) {
        var newElement = document.createElement('li');
        newElement.id = newId.toString();
        
        var newLabel = document.createElement('label');
        newLabel.classList.add("task-text");
        newLabel.innerText = titleTask;
        newElement.appendChild(newLabel);
        
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

        var newMarkSpan = document.createElement('span');
        newMarkSpan.classList.add("done-icon");
        newMarkSpan.innerText = 'DONE!';
        newElement.appendChild(newMarkSpan);

        toDoList.appendChild(newElement);
    }
}

function listClickManager(eventObject) {
    var target = eventObject.target;
    var parent = target.parentElement;
    var id_element = target.id;
    console.log(id_element)
    var target_class = target.className;
    //console.log('target_class',target_class)
    if (target_class==='delete-button'){
        parent.remove();
    } else if (target_class==='mark-button'){
        insert_check(parent);
    } else if (target_class==='edit-button'){
        showDialog(parent)
    }
}   

function insert_check(elementList){
    var markSpan = elementList.getElementsByClassName("done-icon")[0];
    if (markSpan.style.display === 'none') {
        markSpan.style.display = 'block';
    } else {
        markSpan.style.display = 'none';
    }
}
function showDialog(elementList) {
    editId = elementList.id;
    editText = elementList.getElementsByClassName("task-text")[0].innerText;
    editInput.value = editText;
    editDialog.style.display = "block";
}

function addEditTask(){
    var activeElement = document.getElementById(editId)
    var activeLabel = activeElement.getElementsByClassName("task-text")[0];
    activeLabel.innerText = editInput.value;
    editDialog.style.display = "none";
}

function closeDialog() {
    editDialog.style.display = "none";
}

document.addEventListener('DOMContentLoaded', main);