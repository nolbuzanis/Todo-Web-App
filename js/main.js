// SVG Code for todo buttons
var completeSVG = '<svg fill="none" height="24" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"/></svg>';
var deleteSVG = '<svg fill="none" height="24" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>';

function removeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;

    parent.removeChild(item);

    if (document.getElementById('completed').childNode) {
        document.getElementById('separator').classList.toggle('invisible');
    }
}

function completeItem() {
    this.classList.toggle('completeButton');
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    
    var list;
    if (parent.id === 'todo' ){
        console.log('Add to completed');
        list = document.getElementById('completed');
    }
    else {
        list = document.getElementById('todo');
        console.log('Add to todo');
    }
    list.insertBefore(item, list.childNodes[0]);

    

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
}



// When button is pressed, add new todo item if value is not null, i.e, false

document.getElementById('add').addEventListener('click', function() {
    var value = document.getElementById('item').value;
    if (value) {
        addItemTodo(value);
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
        addItemTodo(value);
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
    }
});

