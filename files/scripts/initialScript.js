'use strict';

// JavaScript file for the start screen

/**
 * Populates the open file select control with filenames found in local storage
 */
function populateOptions() {
  for (let i = 0; i < localStorage.length; i += 1) {
    if (localStorage.key(i).substring(0, 9) === 'saveFile:') {
      const option = document.createElement('option');
      option.value = localStorage.key(i).substring(9);
      option.textContent = localStorage.key(i).substring(9);
      document.getElementById('openSelect').appendChild(option);
    }
  }
}

/**
 * Opens the editor with the selected file
 */
function navigate() {
  const element = document.getElementById('openSelect');
  window.location.href = 'editor.html';
  localStorage.setItem('load', element.value);
}

/**
 * Opens a completely new file and clears autoSave
 */
function newFile() {
  window.location.href = 'editor.html';
  localStorage.setItem('load', 'Unnamed File');
}

/**
 * Boot function that adds event listeneres to buttons and calls a function to populate a select
 */
function boot() {
  window.openButton.addEventListener('click', navigate);
  window.newFileButton.addEventListener('click', newFile);
  populateOptions();
}

// Event listener to run when load event is complete
window.addEventListener('load', boot);
