
// SVG Code for todo buttons
var completeSVG = '<svg fill="none" height="24" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="20 6 9 17 4 12"/></svg>';
var deleteSVG = '<svg fill="none" height="24" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>';

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

    item.appendChild(complete);
    item.appendChild(remove);
    list.appendChild(item);
}

// WHen button is pressed, add new todo item if value is not null, i.e, false

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

