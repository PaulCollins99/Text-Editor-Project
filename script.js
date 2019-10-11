'use strict';
let navCount = 0;
function click (e) {
    console.log("You just clicked on " + e.target.id);
    let test = "";
    test = e.target.id;
    console.log(test = test.substring(3));
    
}
//global to store previously clicked on input id's and check against it whenever you click on a new one
function clickOnNavText (e) {
    let element = document.getElementById(e.target.id);
    element.style.marginBottom = "2em";
    let id = e.target.id;
    id = "wrapper" + id.substring(3)
    let wrapper = document.getElementById(id);
    let smallButton = createButton("button", "+", "test");
    wrapper.appendChild(smallButton);
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
    textinput.addEventListener('click', clickOnNavText);
    let wrapped = createWrapper();
    wrapped.appendChild(textinput);
    return wrapped;
}

function createWrapper () {
    let wrapper = document.createElement('div');
    wrapper.id = "wrapper" + navCount;
    return wrapper;
}

function boot () {
    window.left.addEventListener('click', click);
    window.right.addEventListener('click', click);
    window.up.addEventListener('click', click);
    window.down.addEventListener('click', click);
    window.mainAdd.addEventListener('click', addClick);
}

window.addEventListener('load', boot);