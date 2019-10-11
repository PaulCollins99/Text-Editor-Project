'use strict';

function click () {
    console.log("This is a test listener");
    
}

function addClick () {
    let newButton = createButton("button", "awadwadwa", "mainAdd");
    let newTextInput = document.createElement('textinput');
    removeAddButton("mainAdd");
    newButton.addEventListener('click', addClick);
    let location = document.getElementById('navigation')
    location.appendChild(newButton);
}

function createButton (type, text, id) {
    let button = document.createElement('button');
    button.type = type;
    button.textContent = text;
    button.id = id;
    return button;
}

function removeAddButton (id) {
    let button = document.getElementById(id);
    button.remove()

}

function createTextInput () {

}

function boot () {
    window.left.addEventListener('click', click);
    window.right.addEventListener('click', click);
    window.up.addEventListener('click', click);
    window.down.addEventListener('click', click);
    window.mainAdd.addEventListener('click', addClick);
}

window.addEventListener('load', boot);