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

function setSave () {
    let element = document.getElementById("mainTextArea");
    localStorage.setItem("autoSave", element.value);
}

function saveAs () {
    let value = document.getElementById("mainTextArea").value;
    let title = document.getElementById("saveAsName").value;
    localStorage.setItem("saveFile:".concat(title), value);
}

function getSave () {
    let element = document.getElementById("mainTextArea");
    let checkLoad = localStorage.getItem("load");
    if (checkLoad == "none") {
        element.value = localStorage.getItem("autoSave");
    } else {
        element.value = localStorage.getItem("saveFile:" + checkLoad);
        localStorage.setItem("load", "none");
    }
}

function keydownHandler(e) {
    
    if (e.shiftKey && e.key == "Tab") {
        outDent();
    }
    else if (!e.shiftKey && e.key === "Tab") {
        addIndent();
    }
    if (e.key == "Enter") {
       //add bullet points in here addBullet();
    }
    if (e.ctrlKey && e.key == "ArrowUp") {
        moveLineUp();
    } else if (e.ctrlKey && e.key == "ArrowDown") {
        moveLineDown();
    }
}

function moveLineUp () {
    let element = document.getElementById("mainTextArea");
    let lineNumber = getLineNumber();
    let stringArray = convertToArray(element);
    let cursorPos = element.selectionStart;
    let temp = stringArray[lineNumber - 1];

    if (lineNumber - 1 != 0) {
        stringArray[lineNumber - 1] = stringArray[lineNumber - 2];
        stringArray[lineNumber - 2] = temp
    }

    element.value = "";
    element.value = stringArray.join("\n");
    
    element.focus();
    element.setSelectionRange(cursorPos, cursorPos);

}


function moveLineDown () {
    let element = document.getElementById("mainTextArea");
    let lineNumber = getLineNumber();
    let stringArray = convertToArray(element);    
    let cursorPos = element.selectionStart;
    let temp = stringArray[lineNumber - 1];

    stringArray[lineNumber - 1] = stringArray[lineNumber];
    stringArray[lineNumber] = temp
    element.value = "";
    element.value = stringArray.join("\n");
    
    element.focus();
    element.setSelectionRange(cursorPos, cursorPos);
    }

function outDent () {
    let element = document.getElementById("mainTextArea");
    let lineNumber = getLineNumber();
    let stringArray = convertToArray(element);
    let cursorPos = element.selectionStart;

    element.value = "";
    if (stringArray[lineNumber - 1].substring(0,1) == "\t") {
        stringArray[lineNumber - 1] = stringArray[lineNumber - 1].substring(1);
        indentLog[lineNumber] -= 1;
    }
    element.value = stringArray.join("\n");

    element.focus();
    element.setSelectionRange(cursorPos, cursorPos);
}

function addIndent() {
    let element = document.getElementById("mainTextArea");
    let lineNumber = getLineNumber();
    let stringArray = convertToArray(element);
    let cursorPos = element.selectionStart + 1;

    element.value = "";
    stringArray[lineNumber - 1] = "\t" + stringArray[lineNumber - 1];
    element.value = stringArray.join("\n");
    if (typeof indentLog[lineNumber] === "undefined") {
        indentLog[lineNumber] = 1;        
    } else {
        indentLog[lineNumber] += 1;        
    }

    element.focus();
    element.setSelectionRange(cursorPos, cursorPos);
}

function addBullet () {
    let element = document.getElementById("mainTextArea");
    element.value += "o";

}


function disableTab(id) {
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
  //  window.testButton.addEventListener('click', convertToArray);
    window.mainTextArea.addEventListener('keydown', keydownHandler);
    window.save.addEventListener('click', setSave);
    window.load.addEventListener('click', getSave);
    window.saveAsButton.addEventListener('click', saveAs);
    window.addEventListener('unload', setSave);
    setInterval(setSave, 120000);
    getSave();
    disableTab("mainTextArea");
}

window.addEventListener('load', boot);
