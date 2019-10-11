'use strict';

let indentLog = []

function click(e) {
    console.log(e.target.id);

}

function convertToArray(e) {
    let stringArray = document.getElementById("mainTextArea").value.split("\n");
    console.log(getLineNumber());

    return stringArray;
}

function getLineNumber() {
    return window.mainTextArea.value.substring(0, window.mainTextArea.selectionStart).split("\n").length;
}

function keydownHandler(e) {

    if (e.code == "Tab") {
        addIndent();
    }

}

function addIndent() {
    let element = document.getElementById("mainTextArea");
    let lineNumber = getLineNumber();
    let stringArray = convertToArray(element);

    element.value = "";
    stringArray[lineNumber - 1] = "\t" + stringArray[lineNumber - 1];
    console.log(stringArray);
    element.value = stringArray.join("\n");
    if (typeof indentLog[lineNumber] === "undefined") {
        indentLog[lineNumber] = 1;
        console.log("here");
        
    } else {
        indentLog[lineNumber] += 1;
        console.log("in else");
        
    }
    console.log(indentLog[lineNumber]);
}

function enableTab(id) {
    var el = document.getElementById(id);
    el.onkeydown = function (e) {
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