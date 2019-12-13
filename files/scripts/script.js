'use strict';

// JavaScript for the main editor
// An array that is used to track the level of indentation

let indentLog = [];

// ################## File management functions #################

/**
 * function that runs when the page is first loaded. This loads the document that was specified in
 * the splash screen. If new document is specified it loads a clean page. This also allows the user
 * to carry on from where they left of after a refresh or leaving the page
 */
function initialLoad() {
  const fileToLoad = localStorage.getItem('activeFile');
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
  }
}

/**
 * saveFile function works in much the same way as saveAs however it uses the current activeFile as
 *  the name. This function is run on every keypress which removes the need to have a manual save
 *  button
 */

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

/**
 * updates the text area with the content of the file you just clicked in the nav section. This
 *  adds a simple highlight to the clicked file. It changes the content of the textarea by removing
 *  its value and then reconstructing the save file into an array and adding the content portion
 *  into the textarea. It also loads the indentLog into the program and reconstructs it as an array
 */

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

/**
 * Loops through all the saveFiles in the local storage and cuts their names
 * out to create a nav list on the side of the page. This is run on the start of the app
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
 * Save as feature which also contains an if statement to stop overwriting. Cretes a "wrapper"
 *  array that contains all the details needed to save. These details are Title, Content,
 *  Indent Log. This array is stringified as local storage cannot hold arrays. Adds a new list
 *  item to the the nav bar on the side of the screen
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
 * Function to allow the user to delete the current active file If the active file is unnamed it
 *  clears the textarea and logs
 */
function deleteSave() {
  const element = document.getElementById('mainTextArea');
  if (localStorage.getItem('activeFile') === 'Unnamed File') {
    element.value = '';
    indentLog = [];
  } else {
    localStorage.removeItem(`saveFile:${localStorage.getItem('activeFile')}`);
    const array = JSON.parse(localStorage.getItem('Unnamed File'));
    // eslint-disable-next-line prefer-destructuring
    element.value = array[1];
    localStorage.setItem('activeFile', 'Unnamed File');
  }
}

// ################## Textarea functions ###################

/**
 *  converts the mainTextArea into an array splitting at each new line
 */

function convertToArray() {
  const stringArray = document.getElementById('mainTextArea').value.split('\n');
  return stringArray;
}


/**
 * gets current line number for cursor by cutting out from the start of the text to the position of
 *  the cursor and then turning that into an array. This gets the line number as the cursor is
 *  always on the last position meaning its array.length
 */
function getLineNumber() {
  return window.mainTextArea.value.substring(0, window.mainTextArea.selectionStart).split('\n').length;
}


/**
 * Moves the line the cursor is on up. This works in the same way as move line down
 *  however it has a condition that stops the function from running when the line in question is
 *  at the top of the area
 */

function moveLineUp() {
  const element = document.getElementById('mainTextArea');
  const lineNumber = getLineNumber();
  const stringArray = convertToArray(element);
  const cursorPos = element.selectionStart;
  const tempIndentLog = indentLog[lineNumber];
  const temp = stringArray[lineNumber - 1];

  if (lineNumber - 1 !== 0) {
    stringArray[lineNumber - 1] = stringArray[lineNumber - 2];
    stringArray[lineNumber - 2] = temp;
    indentLog[lineNumber] = indentLog[lineNumber - 1];
    indentLog[lineNumber - 1] = tempIndentLog;
  }

  element.value = '';
  element.value = stringArray.join('\n');

  element.focus();
  element.setSelectionRange(cursorPos, cursorPos);
}

/**
 * Moves the line the cursor is on down. This function works by converting the textArea into an
 *  array and then swap the positions of the lines in question. It also swaps the indentLog over
 */
function moveLineDown() {
  const element = document.getElementById('mainTextArea');
  const lineNumber = getLineNumber();
  const stringArray = convertToArray(element);
  const cursorPos = element.selectionStart;
  const temp = stringArray[lineNumber - 1];
  const tempIndentLog = indentLog[lineNumber];

  stringArray[lineNumber - 1] = stringArray[lineNumber];
  stringArray[lineNumber] = temp;
  indentLog[lineNumber] = indentLog[lineNumber + 1];
  indentLog[lineNumber + 1] = tempIndentLog;

  element.value = '';
  element.value = stringArray.join('\n');

  element.focus();
  element.setSelectionRange(cursorPos, cursorPos);
}

/**
 * Removes one tab indent on the current line. This works the same way as addIndent however it
 *  checks to see if the first character of the array position is a tab
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
  saveFile();
}

/**
 * Adds one tab indent on the current line. This is capped at a level of 5. This works
 * by splitting the text area down into an array and then getting the current line the cursor
 *  is on. This van the be used to access the correct position in the array to then add tabs too
 */
function addIndent() {
  const element = document.getElementById('mainTextArea');
  const lineNumber = getLineNumber();
  const stringArray = convertToArray(element);
  const cursorPos = element.selectionStart + 1;
  if (typeof indentLog[lineNumber] === 'undefined') {
    indentLog[lineNumber] = 1;
  }

  if (indentLog[lineNumber] < 6) {
    element.value = '';
    stringArray[lineNumber - 1] = `\t${stringArray[lineNumber - 1]}`;
    element.value = stringArray.join('\n');
    indentLog[lineNumber] += 1;

    element.focus();
    element.setSelectionRange(cursorPos, cursorPos);
    saveFile();
  }
}

// ################## Misc functions ###################

/**
 * Functions used to display to the user the line they are currently on and the indent level
 */

function updateCurrentPosition() {
  const element = document.getElementById('currentLine');
  element.textContent = `Current Line: ${getLineNumber()}`;

  const element2 = document.getElementById('currentIndent');
  if (indentLog[getLineNumber()] === undefined) {
    element2.textContent = 'Current indent level: 1';
  } else {
    element2.textContent = `Current indent level: ${indentLog[getLineNumber()]}`;
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
 * This keeps the formatting so you can re import it on another machine
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

/**
 * Functions used to import .txt files into the app. These keep any indent
 * formatting they may have so this could also be used to share files if needed
 */

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

/**
 * adds all event listeners, calls the function that disbales tab on the mainTextArea,
 * and runs the initail functions that are needed at the start of the app. It also sets
 * up an interval which updates the current line number and tab indent
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
  setInterval(updateCurrentPosition, 100);
}

// runs the boot function once the load event is complete
window.addEventListener('load', boot);
