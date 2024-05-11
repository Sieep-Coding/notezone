const fs = require('fs');
const path = require('path');

const notesFilePath = path.join(__dirname, 'notes.json');
let notes = [];

// Load existing notes from the file
function loadNotes() {
  try {
    const data = fs.readFileSync(notesFilePath, 'utf8');
    notes = JSON.parse(data);
    renderNotes();
  } catch (err) {
    // If the file doesn't exist, create it
    fs.writeFileSync(notesFilePath, JSON.stringify([]));
  }
}

// Save notes to the file
function saveNotes() {
  fs.writeFileSync(notesFilePath, JSON.stringify(notes));
}

// Render notes in the note list
function renderNotes() {
  const noteList = document.querySelector('.note-list ul');
  noteList.innerHTML = '';

  notes.forEach((note, index) => {
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = note.title || `Note ${index + 1}`;
    input.addEventListener('change', () => {
      notes[index].title = input.value.trim() || `Note ${index + 1}`;
      saveNotes();
    });

    li.appendChild(input);
    noteList.appendChild(li);
  });
}

// Display a note in the editor
function displayNote(index) {
  const noteEditor = document.querySelector('.note-editor textarea');
  noteEditor.value = notes[index].content || '';
  currentNoteIndex = index;
}

// Save the current note
function saveCurrentNote() {
    const noteEditor = document.querySelector('.note-editor textarea');
    const noteContent = noteEditor.value.trim();
  
    if (currentNoteIndex === null) {
      // Create a new note
      notes.push({
        title: `Note ${notes.length + 1}`,
        content: noteContent
      });
    } else {
      // Update an existing note
      notes[currentNoteIndex].content = noteContent;
    }
  
    saveNotes();
    renderNotes();
    clearEditor();
  }
  
  // Create a new note
  function createNewNote() {
    currentNoteIndex = null;
    clearEditor();
  }
  
  // Delete the current note
  function deleteCurrentNote() {
    if (currentNoteIndex !== null) {
      notes.splice(currentNoteIndex, 1);
      saveNotes();
      renderNotes();
      clearEditor();
    }
  }
  
  // Clear the note editor
  function clearEditor() {
    const noteEditor = document.querySelector('.note-editor textarea');
    noteEditor.value = '';
  }
  
  // Event listeners
  document.querySelector('.save-btn').addEventListener('click', saveCurrentNote);
  document.querySelector('.new-btn').addEventListener('click', createNewNote);
  document.querySelector('.delete-btn').addEventListener('click', deleteCurrentNote);
  document.querySelector('.close-btn').addEventListener('click', () => {
    window.close();
  });
  
  // Render notes in the note list
  function renderNotes() {
    const noteList = document.querySelector('.note-list ul');
    noteList.innerHTML = '';
  
    notes.forEach((note, index) => {
      const li = document.createElement('li');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = note.title || `Note ${index + 1}`;
      input.addEventListener('change', () => {
        notes[index].title = input.value.trim() || `Note ${index + 1}`;
        saveNotes();
      });
      li.appendChild(input);
      noteList.appendChild(li);
    });
  }
  
  // Initialize
  let currentNoteIndex = null;
  loadNotes();