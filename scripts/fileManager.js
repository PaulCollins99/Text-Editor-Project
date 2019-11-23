'use strict';

let activeFile;

function initialLoad() {
    let fileToLoad = localStorage.getItem("load");
    let element = document.getElementById("mainTextArea");
    if (fileToLoad != "") {
        element.value = localStorage.getItem("saveFile:" + fileToLoad);
        activeFile = fileToLoad;
    } else {
        element.value = localStorage.getItem("Unnamed File");
        activeFile = "Unnamed File";
    }
}

function saveAs() {
    let element = document.getElementById("mainTextArea");
    let title = document.getElementById("saveAsName").value;
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).substring(9) == title) {
            alert("Please use a different title, to overwrite you current file press quick save");
            return;
        }
    }
    localStorage.setItem("saveFile:" + title, element.value);

    const tab = document.createElement("li");
    tab.textContent = title;
    tab.value = title;
    tab.addEventListener('click', updateTextArea);
    document.getElementById("fileBar").appendChild(tab);

    activeFile = title;

}

function save() {
    let element = document.getElementById("mainTextArea");
    if (activeFile != "Unnamed File") {
        localStorage.setItem("saveFile:" + activeFile, element.value);
    } 
    else {
        localStorage.setItem("Unnamed File", element.value);
    }
}

function load() {
    let element = document.getElementById("mainTextArea");
    element.value = localStorage.getItem("Unnamed File");
}


function populateSideBar() {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).substring(0, 9) == "saveFile:") {
            const tab = document.createElement("li");
            tab.textContent = localStorage.key(i).substring(9);
            tab.addEventListener('click', updateTextArea);
            document.getElementById("fileBar").appendChild(tab);
        }
    }
}

function updateTextArea(e) {

    
    let oldElement = document.querySelector(".highlight")
    
    if (oldElement != null) {
        oldElement.classList.remove("highlight")
    }
    

    save();
    e.target.classList.add("highlight")
    let element = document.getElementById("mainTextArea");
    element.value = localStorage.getItem("saveFile:" + e.target.textContent);
    activeFile = e.target.textContent;
}

function boot() {
    window.saveAsButton.addEventListener('click', saveAs);
    window.quickSave.addEventListener('click', save);
    window.addEventListener('unload', save);
    initialLoad();
    populateSideBar();
}

window.addEventListener('load', boot);