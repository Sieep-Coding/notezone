window.onload = function() {
    const noteEditor = document.querySelector('.note-editor textarea');
    const charCount = document.querySelector('.char-count');
  
    noteEditor.addEventListener('input', updateCharCount);
    updateCharCount(); // Update character count initially
  
    function updateCharCount() {
      const charCount = noteEditor.value.length;
      charCount.textContent = `${charCount}`;
    }
  };