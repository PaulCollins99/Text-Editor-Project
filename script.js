'use strict';

function click () {
    console.log("This is a test listener");
    
}

function createButton () {
    let oldButton = document.getElementById("mainAdd");
    let newButton = document.createElement('button');
    newButton.type = "button";
    newButton.textContent = "+";
    newButton.id = "mainAdd";
    oldButton.removeEventListener('click', createButton);
    oldButton.id = "";
    newButton.addEventListener('click', createButton);
    let location = document.getElementById('navigation')
    location.appendChild(newButton);
}


function boot () {
    window.left.addEventListener('click', click);
    window.right.addEventListener('click', click);
    window.up.addEventListener('click', click);
    window.down.addEventListener('click', click);
    window.mainAdd.addEventListener('click', createButton);
}

window.addEventListener('load', boot);