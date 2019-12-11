'use strict';

// JavaScript for the main editor
// An array that is used to track the level of indentation

const indentLog = [];

// converts the mainTextArea into an array splitting at each new line

function convertToArray() {
  const stringArray = document.getElementById('mainTextArea').value.split('\n');
  return stringArray;
}

// gets current line number for cursor

function getLineNumber() {
  return window.mainTextArea.value.substring(0, window.mainTextArea.selectionStart).split('\n').length;
}

// Moves the line the cursor is on up.

function moveLineUp() {
  const element = document.getElementById('mainTextArea');
  const lineNumber = getLineNumber();
  const stringArray = convertToArray(element);
  const cursorPos = element.selectionStart;

  const temp = stringArray[lineNumber - 1];

  if (lineNumber - 1 !== 0) {
    stringArray[lineNumber - 1] = stringArray[lineNumber - 2];
    stringArray[lineNumber - 2] = temp;
  }

  element.value = '';
  element.value = stringArray.join('\n');

  element.focus();
  element.setSelectionRange(cursorPos, cursorPos);
}

// Moves the line the cursor is on down

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

// Removes one tab indent on the current line

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

// Adds one tab indent on the current line

function addIndent() {
  const element = document.getElementById('mainTextArea');
  const lineNumber = getLineNumber();
  const stringArray = convertToArray(element);
  const cursorPos = element.selectionStart + 1;

  element.value = '';
  stringArray[lineNumber - 1] = `\t${stringArray[lineNumber - 1]}`;
  element.value = stringArray.join('\n');
  if (typeof indentLog[lineNumber] === 'undefined') {
    indentLog[lineNumber] = 1;
  } else {
    indentLog[lineNumber] += 1;
  }

  element.focus();
  element.setSelectionRange(cursorPos, cursorPos);
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
  if (e.key === 'Enter') {
    // add bullet points in here addBullet();
  }
  if (e.ctrlKey && e.key === 'ArrowUp') {
    moveLineUp();
  } else if (e.ctrlKey && e.key === 'ArrowDown') {
    moveLineDown();
  }
}


// A function that allows the user to download their note as a text document.

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

// Disables the standard function of the tab key when the mainTextArea is selected

function disableTab() {
  const element = document.getElementById('mainTextArea');
  // eslint-disable-next-line consistent-return
  element.onkeydown = (e) => {
    if (e.keyCode === 9) {
      return false;
    }
  };
}

// adds all event listeners, calls the function that disbales tab on the mainTextArea,
// and add functionallity to allow the user to cancel an unload

function boot() {
  window.mainTextArea.addEventListener('keydown', keydownHandler);
  window.left.addEventListener('click', outDent);
  window.right.addEventListener('click', addIndent);
  window.up.addEventListener('click', moveLineUp);
  window.down.addEventListener('click', moveLineDown);
  window.download.addEventListener('click', downloadToTxt);
  disableTab();
  window.onbeforeunload = () => true;
}

window.addEventListener('load', boot);
