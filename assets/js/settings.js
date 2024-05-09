// Get theme buttons
const themeButtons = document.querySelectorAll('.theme-btn');
// Get font buttons
const fontButtons = document.querySelectorAll('.font-btn');
// Get accessibility checkboxes
const highContrastCheckbox = document.getElementById('high-contrast');
const largerTextCheckbox = document.getElementById('larger-text');

// Load saved settings from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
const savedFont = localStorage.getItem('font') || 'Poppins';
const savedHighContrast = localStorage.getItem('highContrast') === 'true';
const savedLargerText = localStorage.getItem('largerText') === 'true';

// Apply saved settings
applyTheme(savedTheme);
applyFont(savedFont);
highContrastCheckbox.checked = savedHighContrast;
largerTextCheckbox.checked = savedLargerText;

// Theme buttons event listeners
themeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.theme;
    applyTheme(theme);
    saveSettings('theme', theme);
  });
});

// Font buttons event listeners
fontButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const font = btn.dataset.font;
    applyFont(font);
    saveSettings('font', font);
  });
});

// Accessibility checkboxes event listeners
highContrastCheckbox.addEventListener('change', () => {
  const highContrast = highContrastCheckbox.checked;
  applyHighContrast(highContrast);
  saveSettings('highContrast', highContrast);
});

largerTextCheckbox.addEventListener('change', () => {
  const largerText = largerTextCheckbox.checked;
  applyLargerText(largerText);
  saveSettings('largerText', largerText);
});

// Apply theme
function applyTheme(theme) {
  document.body.classList.remove('dark', 'light');
  document.body.classList.add(theme);
  themeButtons.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.theme-btn[data-theme="${theme}"]`).classList.add('active');
}

// Apply font
function applyFont(font) {
  document.body.style.fontFamily = `${font}, sans-serif`;
  fontButtons.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.font-btn[data-font="${font}"]`).classList.add('active');
}

// Apply high contrast
function applyHighContrast(highContrast) {
  document.body.classList.toggle('high-contrast', highContrast);
}

// Apply larger text
function applyLargerText(largerText) {
  document.body.classList.toggle('larger-text', largerText);
}

// Save settings to localStorage
function saveSettings(setting, value) {
  localStorage.setItem(setting, value);
}