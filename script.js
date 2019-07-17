var toDoList ;

function main() {
    searchForElements()
    prepareDOMEvents()
}

function searchForElements() {
    toDoList = document.getElementById('list');
    addTaskButton = document.getElementById('add-task');
    
};

function prepareDOMEvents() {
    toDoList.addEventListener('click', listClickManager);
    addTaskButton.addEventListener('click', addTask);
}

function validateInput(task) {
    if (task == "") {
      alert("Field (title..) is empty!");
      return false;
    }
  }

function addTask() {
    var newTask = document.getElementById("input-text").value;
    if(validateInput(newTask) !== false) {
        var newElement = document.createElement('li');
        
        var newLabel = document.createElement('label');
        newLabel.innerText = newTask;
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
    var target_class = target.className;
    //console.log('target_class',target_class)
    if (target_class==='delete-button'){
        parent.remove();
    } else if (target_class==='mark-button'){
        insert_check(parent);
    } else if (target_class==='edit-button'){
        console.log('tu bedzie edit');
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


document.addEventListener('DOMContentLoaded', main);