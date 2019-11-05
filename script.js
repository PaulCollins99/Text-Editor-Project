'use strict';

let indentLog = []

function click(e) {
    console.log(e.target.id);

}

function convertToArray (e) {
    let stringArray = document.getElementById("mainTextArea").value.split("\n");
    return stringArray;
}

function getLineNumber() {
    return window.mainTextArea.value.substring(0, window.mainTextArea.selectionStart).split("\n").length;
}

function keydownHandler(e) {

    if (e.code == "Tab") {
        addIndent();
    }
    if (e.code == "Enter") {
        addBullet()
    }
}

function addBullet () {
    let element = document.getElementById("mainTextArea");
    let stringArray = convertToArray(element);
    let lineNumber = getLineNumber();
    stringArray[lineNumber] = "‣";
    element.value = stringArray.join("\n");

}

function addIndent() {
    let element = document.getElementById("mainTextArea");
    let lineNumber = getLineNumber();
    let stringArray = convertToArray(element);

    element.value = "";
    stringArray[lineNumber - 1] = "\t" + stringArray[lineNumber - 1];
    element.value = stringArray.join("\n");
    if (typeof indentLog[lineNumber] === "undefined") {
        indentLog[lineNumber] = 1;        
    } else {
        indentLog[lineNumber] += 1;        
    }
}

function enableTab(id) {
    let element = document.getElementById(id);
    element.onkeydown = function (e) {
        if (e.keyCode === 9) {
            return false;
        }
    };
}



function boot() {
    window.left.addEventListener('click', click);
    window.right.addEventListener('click', click);
    window.up.addEventListener('click', click);
    window.down.addEventListener('click', click);
    window.mainAdd.addEventListener('click', click);
    window.testButton.addEventListener('click', convertToArray);
    window.mainTextArea.addEventListener('keydown', keydownHandler)
    enableTab("mainTextArea");
}

window.addEventListener('load', boot);