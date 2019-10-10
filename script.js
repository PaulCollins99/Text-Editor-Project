'use strict';

function click () {
    console.log("This is a test listener");
    
}

function boot () {
    window.left.addEventListener('click', click)
    window.right.addEventListener('click', click)
    window.up.addEventListener('click', click)
    window.down.addEventListener('click', click)
}

window.addEventListener('load', boot);