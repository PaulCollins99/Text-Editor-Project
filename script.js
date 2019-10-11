'use strict';

function click () {
    console.log("This is a test listener");
    
}

function createButton () {

    let newButton = document.createElement('button');
    newButton.setAttribute(type="button");
    let location = document.getElementById('navigation')
    insertAfter(newButton, location);
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function boot () {
    window.left.addEventListener('click', click);
    window.right.addEventListener('click', click);
    window.up.addEventListener('click', click);
    window.down.addEventListener('click', click);
    window.mainAdd.addEventListener('click', click);
}

window.addEventListener('load', boot);