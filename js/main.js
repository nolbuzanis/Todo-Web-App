// Object to store data from html so the data does not get erased upon reload/ reboot
data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')): {
    todo: [],
    completed: []
}

window.onload = function() {
    
    
    if (data) {
    for (i=0; i<data.todo.length; i++) {
        addItemTodo(data.todo[i]);
    }
}
if (data) {
    for (i=0; i<data.completed.length; i++) {
        addItemCompleted(data.completed[i]);
    }

}
}

// SVG Code for todo buttons
var completeSVG = '<svg fill="none" height="24" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"/></svg>';
var deleteSVG = '<svg fill="none" height="24" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>';

function removeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;

    parent.removeChild(item);

    if (parent.id === 'todo' ){
        data.todo.splice(data.todo.indexOf(item), 1);
    }
    else {
        data.completed.splice(data.completed.indexOf(item), 1);
    }

    updateDataStorage();
}

function completeItem() {
    this.classList.toggle('completeButton');
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    
    var value = item.innerText;

    var list;
    if (parent.id === 'todo' ){
        
        list = document.getElementById('completed');

        //Move item from todo array to completed array in data object
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);
    }
    else {
        list = document.getElementById('todo');
        
        //Move item from completed array to todo array in data object
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }
    list.insertBefore(item, list.childNodes[0]);

    updateDataStorage();
}

// Function creates a new todo item with the value in the input field

function addItemTodo(text) {
    var list = document.getElementById('todo');

    var item = document.createElement('li');
    item.innerHTML = text;

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;

    var remove = document.createElement('button');
    remove.classList.add('delete');
    remove.innerHTML = deleteSVG;

    // Click event for removing item
    remove.addEventListener('click', removeItem);

    // Click even for completing an item
    complete.addEventListener('click', completeItem);

    var div = document.createElement('div');
    div.classList.add('buttons');

    div.appendChild(complete);
    div.appendChild(remove);
    item.appendChild(div);
    list.insertBefore(item, list.childNodes[0]);

    updateDataStorage();
}

// When button is pressed, add new todo item if value is not null, i.e, false

document.getElementById('add').addEventListener('click', function() {
    var value = document.getElementById('item').value;
    if (value) {
        data.todo.push(value);
        addItemTodo(value);
        document.getElementById('item').value = '';
    }
    else {
        console.log('Invalid Entry');
    }
});

// When enter key is pressed:
document.getElementById('item').addEventListener('keypress', function(e) {
    if (e.keyCode == 13) {
    var value = document.getElementById('item').value;
    if (value) {
        data.todo.push(value);
        addItemTodo(value);
        document.getElementById('item').value = '';
        
        updateDataStorage();
    }
    else {
        console.log('Invalid Entry');
    }
    
}
});

document.getElementById('deleteAll').addEventListener('click', function() {
    var target = document.getElementById('todo');
    while(target.childNodes[0]) {
        target.removeChild(target.childNodes[0]);
        data.todo.pop();
    }
    target = document.getElementById('completed');
    while(target.childNodes[0]) {
        target.removeChild(target.childNodes[0]);
        data.completed.pop();
    }

    updateDataStorage();
});

function addItemCompleted(text) {
    var list = document.getElementById('completed');

    var item = document.createElement('li');
    item.innerHTML = text;

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.classList.toggle('completeButton');
    complete.innerHTML = completeSVG;

    var remove = document.createElement('button');
    remove.classList.add('delete');
    remove.innerHTML = deleteSVG;

    // Click event for removing item
    remove.addEventListener('click', removeItem);

    // Click event for completing an item
    complete.addEventListener('click', completeItem);

    var div = document.createElement('div');
    div.classList.add('buttons');

    div.appendChild(complete);
    div.appendChild(remove);
    item.appendChild(div);
    list.insertBefore(item, list.childNodes[0]);
    
    updateDataStorage();
}

function updateDataStorage() {
    localStorage.setItem('todoList', JSON.stringify(data));
}