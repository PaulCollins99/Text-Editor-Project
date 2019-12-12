'use strict';

// JavaScript for the main editor
// An array that is used to track the level of indentation

let indentLog = [];

/**
 * function that runs when the page is first loaded
 */
function initialLoad() {
  const fileToLoad = localStorage.getItem('load');
  const element = document.getElementById('mainTextArea');
  if (fileToLoad !== '') {
    if (fileToLoad === 'Unnamed File') {
      if (localStorage.getItem('Unnamed File') !== null) {
        const array = JSON.parse(localStorage.getItem('Unnamed File'));
        // eslint-disable-next-line prefer-destructuring
        element.value = array[1];
        indentLog = JSON.parse(array[2]);
      }
      localStorage.setItem('activeFile', 'Unnamed File');
    } else {
      const array = JSON.parse(localStorage.getItem(`saveFile:${fileToLoad}`));
      // eslint-disable-next-line prefer-destructuring
      element.value = array[1];
      indentLog = JSON.parse(array[2]);
      localStorage.setItem('activeFile', fileToLoad);
    }
  } else {
    element.value = localStorage.getItem('Unnamed File');
    localStorage.setItem('activeFile', 'Unnamed File');
  }
}

function saveFile() {
  const wrapperArray = [];
  const title = localStorage.getItem('activeFile');
  const element = document.getElementById('mainTextArea');
  const content = element.value;
  wrapperArray[0] = title;
  wrapperArray[1] = content;
  wrapperArray[2] = JSON.stringify(indentLog);
  if (localStorage.getItem('activeFile') !== 'Unnamed File') {
    localStorage.setItem(`saveFile:${localStorage.getItem('activeFile')}`, JSON.stringify(wrapperArray));
  } else {
    localStorage.setItem('Unnamed File', JSON.stringify(wrapperArray));
  }
}

function updateTextArea(e) {
  const oldElement = document.querySelector('.highlight');

  if (oldElement != null) {
    oldElement.classList.remove('highlight');
  }

  saveFile();
  e.target.classList.add('highlight');
  const element = document.getElementById('mainTextArea');
  if (e.target.textContent === 'Unnamed File') {
    const savedData = localStorage.getItem(e.target.textContent);
    const wrapperArray = JSON.parse(savedData);
    indentLog = JSON.parse(wrapperArray[2]);
    // eslint-disable-next-line prefer-destructuring
    element.value = wrapperArray[1];
    localStorage.setItem('activeFile', e.target.textContent);
  } else {
    const savedData = localStorage.getItem(`saveFile:${e.target.textContent}`);
    const wrapperArray = JSON.parse(savedData);
    indentLog = JSON.parse(wrapperArray[2]);
    // eslint-disable-next-line prefer-destructuring
    element.value = wrapperArray[1];
    localStorage.setItem('activeFile', e.target.textContent);
  }
}


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
  const wrapperArray = [];
  wrapperArray[0] = title;
  wrapperArray[1] = element.value;
  wrapperArray[2] = JSON.stringify(indentLog);
  localStorage.setItem(`saveFile:${title}`, JSON.stringify(wrapperArray));

  const tab = document.createElement('li');
  tab.textContent = title;
  tab.value = title;
  tab.addEventListener('click', updateTextArea);
  document.getElementById('fileBar').appendChild(tab);

  localStorage.setItem('activeFile', title);
}

/**
 * Function to allow the user to delete the current active file
 */
function deleteSave() {
  const element = document.getElementById('mainTextArea');
  if (localStorage.getItem('activeFile') === 'Unnamed File') {
    element.value = '';
  } else {
    localStorage.removeItem(`saveFile:${localStorage.getItem('activeFile')}`);
    const array = JSON.parse(localStorage.getItem('Unnamed File'));
    // eslint-disable-next-line prefer-destructuring
    element.value = array[1];
    localStorage.setItem('activeFile', 'Unnamed File');
  }
}
/**
 *  converts the mainTextArea into an array splitting at each new line
 */

function convertToArray() {
  const stringArray = document.getElementById('mainTextArea').value.split('\n');
  return stringArray;
}


/**
 * gets current line number for cursor
 */
function getLineNumber() {
  return window.mainTextArea.value.substring(0, window.mainTextArea.selectionStart).split('\n').length;
}


/**
 * Moves the line the cursor is on up.
 */

function moveLineUp() {
  const element = document.getElementById('mainTextArea');
  const lineNumber = getLineNumber();
  const stringArray = convertToArray(element);
  const cursorPos = element.selectionStart;

  const temp = stringArray[lineNumber - 1];

  // if statement to stop lines from attemtping to go -

  if (lineNumber - 1 !== 0) {
    stringArray[lineNumber - 1] = stringArray[lineNumber - 2];
    stringArray[lineNumber - 2] = temp;
  }

  element.value = '';
  element.value = stringArray.join('\n');

  element.focus();
  element.setSelectionRange(cursorPos, cursorPos);
}

/**
 * Moves the line the cursor is on down.
 */
function moveLineDown() {
  const element = document.getElementById('mainTextArea');
  const lineNumber = getLineNumber();
  const stringArray = convertToArray(element);
  const cursorPos = element.selectionStart;
  const temp = stringArray[lineNumber - 1];

  stringArray[lineNumber - 1] = stringArray[lineNumber];
  stringArray[lineNumber] = temp;
  element.value = '';
  element.value = stringArray.join('\n');

  element.focus();
  element.setSelectionRange(cursorPos, cursorPos);
}


/**
 * Removes one tab indent on the current line
 */
function outDent() {
  const element = document.getElementById('mainTextArea');
  const lineNumber = getLineNumber();
  const stringArray = convertToArray(element);
  const cursorPos = element.selectionStart;

  element.value = '';
  if (stringArray[lineNumber - 1].substring(0, 1) === '\t') {
    stringArray[lineNumber - 1] = stringArray[lineNumber - 1].substring(1);
    indentLog[lineNumber] -= 1;
  }
  element.value = stringArray.join('\n');

  element.focus();
  element.setSelectionRange(cursorPos - 1, cursorPos - 1);
}

/**
 * Adds one tab indent on the current line
 */
function addIndent() {
  const element = document.getElementById('mainTextArea');
  const lineNumber = getLineNumber();
  const stringArray = convertToArray(element);
  const cursorPos = element.selectionStart + 1;
  if (typeof indentLog[lineNumber] === 'undefined') {
    indentLog[lineNumber] = 1;
  }

  if (indentLog[lineNumber] < 5) {
    element.value = '';
    stringArray[lineNumber - 1] = `\t${stringArray[lineNumber - 1]}`;
    element.value = stringArray.join('\n');
    indentLog[lineNumber] += 1;

    element.focus();
    element.setSelectionRange(cursorPos, cursorPos);
  }
}


/**
 * Handles all keyboard inputs
 * @param {*} e The keyboard event being passed in
 */

function keydownHandler(e) {
  if (e.shiftKey && e.key === 'Tab') {
    outDent();
  } else if (!e.shiftKey && e.key === 'Tab') {
    addIndent();
  }
  if (e.ctrlKey && e.key === 'ArrowUp') {
    moveLineUp();
  } else if (e.ctrlKey && e.key === 'ArrowDown') {
    moveLineDown();
  }

  saveFile();
}

/**
 * A function that allows the user to download their note as a text document.
 */
function downloadToTxt() {
  const value = document.getElementById('mainTextArea').value.replace(/\n/g, '\r\n');
  const blob = new Blob([value], { type: 'text/plain' });
  const element = document.createElement('a');
  element.download = `${localStorage.getItem('activeFile')}.txt`;
  element.href = window.URL.createObjectURL(blob);
  element.target = '_blank';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function importFile() {
  const element = document.getElementById('mainTextArea');
  const fileToImport = document.getElementById('fileToImport');
  const file = fileToImport.files[0];
  const fileReader = new FileReader();

  // eslint-disable-next-line func-names
  fileReader.addEventListener('load', function () {
    element.value = this.result;
  });
  fileReader.readAsText(file);
}

/**
 * Disables the standard function of the tab key when the mainTextArea is selected
 */
function disableTab() {
  const element = document.getElementById('mainTextArea');
  // eslint-disable-next-line consistent-return
  element.onkeydown = (e) => {
    if (e.keyCode === 9) {
      return false;
    }
  };
}

// function generateIndentLog() {
// const stringArray = convertToArray();
//  for (let i = 0; i < stringArray.length; i += 1) {
//    const tabCount = stringArray[i].replace(/[^\t]/g, '').length;
//    indentLog[i] = tabCount;
//  }
// }
//
// function updateSelect() {
//  generateIndentLog();
//  const element = document.getElementById('myList');
//  const currentLine = getLineNumber();
//  element.value = indentLog[currentLine];
// }
//
// function displayCurrentLine() {
//  const element = document.getElementById('currentLine');
//  element.textContent = `Current Line: ${getLineNumber()}`;
// }


/**
 * adds all event listeners, calls the function that disbales tab on the mainTextArea,
 * and add functionallity to allow the user to cancel an unload
 */
function boot() {
  window.importButton.addEventListener('click', importFile);
  window.mainTextArea.addEventListener('keydown', keydownHandler);
  window.left.addEventListener('click', outDent);
  window.right.addEventListener('click', addIndent);
  window.up.addEventListener('click', moveLineUp);
  window.down.addEventListener('click', moveLineDown);
  window.download.addEventListener('click', downloadToTxt);
  window.saveAsButton.addEventListener('click', saveAs);
  window.Unnamed_File.addEventListener('click', updateTextArea);
  window.deleteSaveButton.addEventListener('click', deleteSave);
  populateSideBar();
  disableTab();
  initialLoad();
}

// runs the boot function once the load event is complete
window.addEventListener('load', boot);
