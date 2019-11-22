//JavaScript file for the start screen

'use strict';

//Populates the open file select control with filenames found in local storage

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

//Opens the editor with the selected file

function navigate () {
    let element = document.getElementById("openSelect")
    location.href = "editor.html";
    localStorage.setItem("load", element.value);
}

//Opens a completely new file and clears autoSave

function newFile () {
    location.href = "editor.html";
    localStorage.setItem("load", "Unnamed File");
}

//adds event listeners

function boot() {
    window.openButton.addEventListener('click', navigate);
    window.newFileButton.addEventListener('click', newFile)
    populateOptions();
}

window.addEventListener('load', boot);