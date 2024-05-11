function router() {
    const routes = {
      '/': 'index.html',
      '/notes': 'index.html',
      '/reminders': 'assets/html/reminders.html',
      '/settings': 'assets/html/settings.html',
    };
  
    const contentContainer = document.querySelector('main');
    const navLinks = document.querySelectorAll('nav a');
  
    function loadContent(path) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', routes[path]);
      xhr.onload = function() {
        if (xhr.status === 200) {
          contentContainer.innerHTML = xhr.responseText;
        } else {
          console.error('Error loading content:', xhr.statusText);
        }
      };
      xhr.send();
    }
  
    function handleNavigation(event) {
      event.preventDefault();
      const path = event.target.getAttribute('href');
      window.history.pushState({}, '', path);
      loadContent(path);
    }
  
    window.addEventListener('popstate', () => {
      loadContent(window.location.pathname);
    });
  
    navLinks.forEach(link => link.addEventListener('click', handleNavigation));
  
    loadContent(window.location.pathname);
  }
  
  router();