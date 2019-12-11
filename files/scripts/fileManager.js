'use strict';

/**
 * function that runs when the page is first loaded
 */
function initialLoad() {
  const fileToLoad = localStorage.getItem('load');
  const element = document.getElementById('mainTextArea');
  if (fileToLoad !== '') {
    if (fileToLoad === 'Unnamed File') {
      element.value = localStorage.getItem('Unnamed File');
      localStorage.setItem('activeFile', 'Unnamed File');
    } else {
      element.value = localStorage.getItem(`saveFile:${fileToLoad}`);
      localStorage.setItem('activeFile', fileToLoad);
    }
  } else {
    element.value = localStorage.getItem('Unnamed File');
    localStorage.setItem('activeFile', 'Unnamed File');
  }
}

/**
 * Save function that runs every 100ms and when certain events are triggered such as exit
 */
function save() {
  const element = document.getElementById('mainTextArea');
  if (localStorage.getItem('activeFile') !== 'Unnamed File') {
    localStorage.setItem(`saveFile:${localStorage.getItem('activeFile')}`, element.value);
  } else {
    localStorage.setItem('Unnamed File', element.value);
  }
}

/**
 * updates the text area with the content of the file you just clicked in the nav section
 */
function updateTextArea(e) {
  const oldElement = document.querySelector('.highlight');

  if (oldElement != null) {
    oldElement.classList.remove('highlight');
  }

  save();
  e.target.classList.add('highlight');
  const element = document.getElementById('mainTextArea');
  if (e.target.textContent === 'Unnamed File') {
    element.value = localStorage.getItem(e.target.textContent);
    localStorage.setItem('activeFile', e.target.textContent);
  } else {
    element.value = localStorage.getItem(`saveFile:${e.target.textContent}`);
    localStorage.setItem('activeFile', e.target.textContent);
  }
}

/**
 * Save as feature which also contains an if statement to stop overwriting
 */
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

/**
 * Loops through all the saveFiles in the local storage and cuts their names
 * out to create a nav list on the side of the page
 */
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

/**
 * autoSave Function. This is put in a seperate function as i need to call a timeout on
 * it or it will overwrite before the autosave can load
 */
function autoSave() {
  setInterval(save, 5000);
}

/**
 * Function to allow the user to delete the current active file
 */
function deleteSave() {
  const element = document.getElementById('mainTextArea');
  if (localStorage.getItem('activeFile') === 'Unnamed File') {
    localStorage.removeItem(localStorage.getItem('activeFile'));
    element.value = localStorage.getItem('Unnamed File');
    localStorage.setItem('activeFile', 'Unnamed File');
  } else {
    localStorage.removeItem(`saveFile:${localStorage.getItem('activeFile')}`);
    element.value = localStorage.getItem('Unnamed File');
    localStorage.setItem('activeFile', 'Unnamed File');
  }
}

/**
 * Boot function that is run when the load event is complete.
 * Contains eventhandlers and timer for autosave
 */
function boot() {
  window.saveAsButton.addEventListener('click', saveAs);
  window.addEventListener('unload', save);
  window.Unnamed_File.addEventListener('click', updateTextArea);
  window.deleteSaveButton.addEventListener('click', deleteSave);
  populateSideBar();
  initialLoad();
  setTimeout(autoSave, 5000);
  window.onbeforeunload = () => true;
}

//
window.addEventListener('load', boot);
