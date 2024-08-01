document.addEventListener('DOMContentLoaded', () => {
    const notepad = document.getElementById('notepad');
    const saveButton = document.getElementById('saveButton');
    const clearButton = document.getElementById('clearButton');
    const darkModeToggle = document.getElementById('darkModeToggle');
  
    // Load saved notes
    chrome.storage.local.get(['note', 'darkMode'], (result) => {
      if (result.note) {
        notepad.value = result.note;
      }
      if (result.darkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
      }
    });
  
    // Save note
    saveButton.addEventListener('click', () => {
      const note = notepad.value;
      chrome.storage.local.set({ note: note }, () => {
        alert('Note saved!');
      });
    });
  
    // Clear note
    clearButton.addEventListener('click', () => {
      notepad.value = '';
      chrome.storage.local.remove(['note']);
    });
  
    // Toggle dark mode
    darkModeToggle.addEventListener('change', () => {
      document.body.classList.toggle('dark-mode', darkModeToggle.checked);
      chrome.storage.local.set({ darkMode: darkModeToggle.checked });
    });
  });
  