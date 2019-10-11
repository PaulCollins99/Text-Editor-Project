'use strict';
function click (e) {
    console.log(e.target.id);
    
}

function convertToArray (e) {
    let stringArray = document.getElementById("mainTextArea").value.split("\n");
    console.log(stringArray);
}

function boot () {
    window.left.addEventListener('click', click);
    window.right.addEventListener('click', click);
    window.up.addEventListener('click', click);
    window.down.addEventListener('click', click);
    window.mainAdd.addEventListener('click', click);
    window.testButton.addEventListener('click', convertToArray);
}

window.addEventListener('load', boot);