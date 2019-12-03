'use strict';

// function that runs when the page is first loaded

function initialLoad() {
  const fileToLoad = localStorage.getItem('load');
  const element = document.getElementById('mainTextArea');
  if (fileToLoad !== '') {
    element.value = localStorage.getItem(`saveFile:${fileToLoad}`);
    localStorage.setItem('activeFile', fileToLoad);
  } else {
    element.value = localStorage.getItem('Unnamed File');
    localStorage.setItem('activeFile', 'Unnamed File');
  }
}

function save() {
  const element = document.getElementById('mainTextArea');
  if (localStorage.getItem('activeFile') !== 'Unnamed File') {
    localStorage.setItem(`saveFile:${localStorage.getItem('activeFile')}`, element.value);
  } else {
    localStorage.setItem('Unnamed File', element.value);
  }
}

// Allows the user to save a file and give it a new name
function updateTextArea(e) {
  const oldElement = document.querySelector('.highlight');

  if (oldElement != null) {
    oldElement.classList.remove('highlight');
  }

  save();
  e.target.classList.add('highlight');
  const element = document.getElementById('mainTextArea');
  element.value = localStorage.getItem(`saveFile:${e.target.textContent}`);
  localStorage.setItem('activeFile', e.target.textContent);
}

function saveAs() {
  const element = document.getElementById('mainTextArea');
  const title = document.getElementById('saveAsName').value;
  for (let i = 0; i < localStorage.length; i += 1) {
    if (localStorage.key(i).substring(9) === title) {
      // eslint-disable-next-line no-alert
      alert('Please use a different title, to overwrite you current file press quick save');
      return;
    }
  }
  localStorage.setItem(`saveFile:${title}`, element.value);

  const tab = document.createElement('li');
  tab.textContent = title;
  tab.value = title;
  tab.addEventListener('click', updateTextArea);
  document.getElementById('fileBar').appendChild(tab);

  localStorage.setItem('activeFile', title);
}

// Overwrites a save with the same name


// loads the Unnamed File

// Loops through all the saveFiles in the local storage and cuts their names
// out to create a nav list on the side of the page

function populateSideBar() {
  for (let i = 0; i < localStorage.length; i += 1) {
    if (localStorage.key(i).substring(0, 9) === 'saveFile:') {
      const tab = document.createElement('li');
      tab.textContent = localStorage.key(i).substring(9);
      tab.addEventListener('click', updateTextArea);
      document.getElementById('fileBar').appendChild(tab);
    }
  }
}

// Code that allows the user to click on the items to load the corresponding pages


function boot() {
  window.saveAsButton.addEventListener('click', saveAs);
  window.quickSave.addEventListener('click', save);
  window.addEventListener('unload', save);
  initialLoad();
  populateSideBar();
}

window.addEventListener('load', boot);
