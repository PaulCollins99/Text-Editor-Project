'use strict';

function click () {
    console.log("This is a test listener");
    
}

function createButton () {

    let newButton = document.createElement('button');
    newButton.type = "button";
    newButton.textContent = "+"
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