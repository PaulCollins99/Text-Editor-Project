'use strict';
let navCount = 0;
function click () {
    console.log("This is a test listener");
    
}

function addClick () {
    let newButton = createButton("button", "+", "mainAdd");
    let newTextInput = createTextInput("nav" + navCount, "text");
    removeElement("mainAdd");
    newButton.addEventListener('click', addClick);
    let location = document.getElementById('navigation')
    location.appendChild(newTextInput);
    location.appendChild(newButton);
}

function createButton (type, text, id) {
    let button = document.createElement('button');
    button.type = type;
    button.textContent = text;
    button.id = id;
    return button;
}

function removeElement (id) {
    let element = document.getElementById(id);
    element.remove();

}

function createTextInput (id, type) {
    let textinput = document.createElement('input');
    textinput.type = type;
    textinput.id = id;
    textinput.placeholder = "Insert Text";
    navCount += 1;
    return textinput;
}

function boot () {
    window.left.addEventListener('click', click);
    window.right.addEventListener('click', click);
    window.up.addEventListener('click', click);
    window.down.addEventListener('click', click);
    window.mainAdd.addEventListener('click', addClick);
}

window.addEventListener('load', boot);