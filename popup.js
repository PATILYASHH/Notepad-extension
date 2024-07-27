const notes = document.getElementById('notes');
const saveBtn = document.getElementById('save-btn');
const themeToggle = document.getElementById('theme-toggle');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const container = document.getElementById('container');

// Load saved notes and theme
chrome.storage.sync.get(['notes', 'theme'], (result) => {
  if (result.notes) {
    notes.value = result.notes;
  }
  if (result.theme === 'dark') {
    document.body.classList.add('dark');
  }
});

// Save notes
saveBtn.addEventListener('click', () => {
  chrome.storage.sync.set({ notes: notes.value });
});

// Toggle theme
themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  chrome.storage.sync.set({ theme: isDark ? 'dark' : 'light' });
});

// Toggle fullscreen
fullscreenBtn.addEventListener('click', () => {
  chrome.windows.create({
    url: 'popup.html',
    type: 'popup',
    state: 'fullscreen'
  });
});

// Enable drag-and-drop
container.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', '');
});