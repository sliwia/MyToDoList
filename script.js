let $toDoList;
var newTask;
var addTaskButton;
var clearTaskButton;
var editDialog;
var saveButton;
var closeButton;
var delId;
var editId;
var editText;
var editInput;
var authorName = "Liwia";
    /* 
    Funkcja tworzy i pobiera z API pierwszą listę ToDos w html'u
    @param {very_long_type} name           Description.
    @param {type}           very_long_name Description.
    */

function main() {
    searchForElements();
    getInitialToDoList();
    prepareDOMEvents();
}

async function getInitialToDoList(){
    /* 
        Funkcja tworzy i pobiera z API pierwszą listę ToDos w html'u.
    */
    try{
        var toDoListFromApi = await axios.get('http://195.181.210.249:3000/todo/');
    }catch(err) {
        console.log(err);
    }
    
    var toDoListFromApiData = toDoListFromApi.data;
    var filterToDoList = toDoListFromApiData.filter(toDo => {
        return toDo.author==authorName;
    })

    filterToDoList.forEach((toDo) => {
        addNewTask(toDo.title, toDo.id);
        if (toDo.extra == 'done'){
            var activeToDo = document.getElementById(toDo.id).getElementsByClassName("done-icon")[0];
            activeToDo.style.visibility = "visible"; 
        }
    });
}

function searchForElements() {
    /* 
        Funkcja pobierająca elementy z drzewa DOM i przypisuje
         je do zmiennych globalnych.
    */
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
    /* 
        Funkcja która podłącza wywołania funkcji które są uruchamiane 
        po klikniciu purzycisku typu 'button'.
    */
    $toDoList.addEventListener('click', listClickManager);
    addTaskButton.addEventListener('click', addNewElementToList);
    clearTaskButton.addEventListener('click',clearTextInput);
    saveButton.addEventListener('click', addEditTask);
    closeButton.addEventListener('click', closeDialog);
}


async function addNewElementToList(){
    /* 
        Funkcja która uruchamia funkcję do dodania nowego todo,
        wysyła nowy do API.
    */
    if (validateInput(newTask.value) !== false) {
        try{
            await axios.post('http://195.181.210.249:3000/todo/',{
            title: newTask.value,
            author: authorName
        });
        } catch(err) {
            console.log(err);
        }
        try{
            var toDoListFromApi = await axios.get('http://195.181.210.249:3000/todo/');
        } catch(err) {
            console.log(err);
        }
        var maxIdToDo = toDoListFromApi.data[toDoListFromApi.data.length - 1].id;
        addNewTask(newTask.value, maxIdToDo);
    }
}
    
function addNewTask(titleTask, idTask) {
    /* 
        Funkcja tworzca nowe todo, tworzy pojedyczy element w html.
        @param  titleTask       tytuł nowwego ToDo
        @param  idTask          id nowego todo
    */
    
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


function validateInput(task) {
    /*
        Funkcja sprawdzająca czy pole jest puste,
        jeżeli jest puste informuje o tym użytkownika.
        @param  task          tekst nowego todo
    */
    if (task == "") {
      alert("Field (title..) is empty!");
      return false;
    }
}

function clearTextInput(){
    /*
        Funkcja czyszcząca pole z nowym todo
    */
    newTask.value = '';
}

function listClickManager(eventObject) {
    /*
        Funkcja wywołan po kliknięciu buttona edit del lub mark.
        Sprawdza który został wybrany i wywołuje odpowiednią funkcję.
    */
    var target = eventObject.target;
    var parent = target.parentElement;
    var target_class = target.className;
    if (target_class==='delete-button'){
        deleteTask(parent)
    } else if (target_class==='mark-button'){
        insertCheck(parent);
    } else if (target_class==='edit-button'){
        showDialog(parent);
    }
}   

async function deleteTask(elementList){
    /*
       Funkcja usuwająca todo z htmla i z API.
       @param  elementList          todo w formie html
   */
    delId = elementList.id;
    try{
        var delUrl = "http://195.181.210.249:3000/todo/" + delId;
    } catch(err) {
        console.log(err);
    }
   await axios.delete(delUrl)
   elementList.remove();
}

async function insertCheck(elementList){ 
    /*
       Funkcja zaznaczająca czy dany todo jest zrobiony czy nie. 
       Ustawia widoczność labela done, zmienia w API wartość
       extra, ustawiając odpowiednią null lub done.
       @param  elementList          todo w formie html
   */
    var markSpan = elementList.getElementsByClassName("done-icon")[0];
    //var markId = elementList.id; pytanie: czy id zapisać do zmiennej czy może być odwołanie się do niej od razu
    if (markSpan.style.visibility==="visible"){
        markSpan.style.visibility = "hidden";
        try{
            await axios.put('http://195.181.210.249:3000/todo/' + elementList.id, {
            extra: null,
            });
        } catch(err) {
            console.log(err);
        }
        
    } else{
        markSpan.style.visibility = "visible"; 
        try{
            await axios.put('http://195.181.210.249:3000/todo/' + elementList.id, {
            extra: 'done',
            });
        } catch(err) {
            console.log(err);
        }
        
    }
}

function showDialog(elementList) {
    /*
        Funkcja pobierająca todo do edyji, ustawia tekst w polu do edycji,
        wyśwwietla samo okno edycji.
        @param  elementList          todo w formie html
    */
    editId = elementList.id;
    editText = elementList.getElementsByClassName("task-text")[0].innerText;
    editInput.value = editText;
    editDialog.style.display = "block";
}

async function addEditTask(){
    /*
        Funkcja pobierająca edytowany tekst z okna edycji, zapisuje
        zmianę w api i html. Zamyka okno edycji.
    */
    var activeElement = document.getElementById(editId);
    var activeLabel = activeElement.getElementsByClassName("task-text")[0];
    activeLabel.innerText = editInput.value;
    try{
        await axios.put('http://195.181.210.249:3000/todo/' + editId, {
        title: editInput.value,
        });
    } catch(err) {
        console.log(err);
    }
    
    closeDialog();
}

function closeDialog() {
    /*
        Funkcja zamykająca okno edycji.
    */
    editDialog.style.display = "none";
}

document.addEventListener('DOMContentLoaded', main);