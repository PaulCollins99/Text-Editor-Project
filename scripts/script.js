//JavaScript for the main editor

'use strict';

//An array that is used to track the level of indentation

let indentLog = [];

//double check that you want to overwrite a line

let overwrite = true;
let alreadyChecked = false;

//Active file

let activeFile = "autoSave";

//converts the mainTextArea into an array splitting at each new line

function convertToArray (e) {
    let stringArray = document.getElementById("mainTextArea").value.split("\n");
    return stringArray;
}

//gets current line number for cursor

function getLineNumber() {
    return window.mainTextArea.value.substring(0, window.mainTextArea.selectionStart).split("\n").length;
}

//autoSave function

function setSave () {
    let element = document.getElementById("mainTextArea");
    localStorage.setItem("autoSave", element.value);
}

//create a file with a identifier (saveFile:) followed by a user specified name e.g. saveFile:Filename

//need to finish filename already exists code re-write this section

function saveAs () {
    const value = document.getElementById("mainTextArea").value;
    const title = document.getElementById("saveAsName").value;
    
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).substring(9) == title && alreadyChecked == false) {
            
                overwrite = false
            
        }
    }

    if (overwrite == true || alreadyChecked == true) {
        localStorage.setItem("saveFile:".concat(title), value);
        alreadyChecked = false;
        alert("File saved succesfully")
    } else {
        overwrite = false;
        alreadyChecked = true;
        alert("File name already exists, press save as button again to overwrite the file")
        
    }
}

//Gets localStorage save states

function getSave () {
    let element = document.getElementById("mainTextArea");
    let checkLoad = localStorage.getItem("load");
    if (checkLoad == "none") {
        element.value = localStorage.getItem("autoSave");
    } else {
        activeFile = checkLoad;
        element.value = localStorage.getItem("saveFile:" + checkLoad);
        localStorage.setItem("load", "none");
    }
}

//Handles all keyboard inputs

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

//Moves the line the cursor is on up

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

//Moves the line the cursor is on down

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

//Removes one tab indent on the current line

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

//Adds one tab indent on the current line

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

//Disables the standard function of the tab key when the mainTextArea is selected

function disableTab() {
    let element = document.getElementById("mainTextArea");
    element.onkeydown = function (e) {
        if (e.keyCode === 9) {
            return false;
        }
    };
}

//Populates the openFile select control with al possible files

function populateOptions() {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).substring(0, 9) == "saveFile:") {
            const option = document.createElement("option")
            option.value = localStorage.key(i).substring(9);
            option.textContent = localStorage.key(i).substring(9);
            document.getElementById("openSelect").appendChild(option);
        }
    }
}

//current id and update changes, cache changes user has to save manually to save over the file

function populateSideBar () {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).substring(0, 9) == "saveFile:") {
         const tab = document.createElement("li");
         tab.textContent = localStorage.key(i).substring(9);
         tab.value = localStorage.key(i).substring(9);
         tab.addEventListener('click', updateTextArea);
         document.getElementById("fileBar").appendChild(tab);
        }
    }
}

function updateTextArea (e) {
    let element = document.getElementById("mainTextArea");
    localStorage.setItem("cache:" + activeFile, element.value);
    element.value = localStorage.getItem("saveFile:" + e.target.textContent);    
    activeFile = e.target.textContent;
}
//opens saved file

function openFile () {
    const value = document.getElementById("openSelect").value;
    localStorage.setItem("load", value);
    getSave();
}


//adds all event listeners

function boot() {
    window.mainTextArea.addEventListener('keydown', keydownHandler);
    window.save.addEventListener('click', setSave);
    window.load.addEventListener('click', getSave);
    window.saveAsButton.addEventListener('click', saveAs);
    window.openButton.addEventListener('click', openFile);
    window.addEventListener('unload', setSave);
    setInterval(setSave, 120000);
    getSave();
    disableTab();
    populateOptions();
    populateSideBar();
    window.onbeforeunload = function() {
        return true;
    };
}

window.addEventListener('load', boot);