![](https://github.com/Sieep-Coding/notetaking-app-electron/blob/main/assets/imgs/notezone.png)
========

NoteZone is a modern and intuitive note-taking application built with Electron, HTML, CSS, and JavaScript. 

It provides a user-friendly interface for creating, editing, and managing notes and reminders, along with various customization options for an enhanced user experience.

Features
--------

-   **Note Taking**: Create, edit, and delete notes with a sleek and responsive interface.
-   **Reminder Management**: Set reminders with titles, descriptions, and email notifications.
-   **Email Notifications**: Receive email reminders for important tasks or events.
-   **Customization Options**:
    -   Theme: Choose between a dark or light theme.
    -   Font: Select from a variety of font options (e.g., Poppins, Arial, Verdana).
    -   Accessibility: Enable high contrast mode or larger text for better readability.
-   **Cross-Platform**: Built with Electron, NoteZone can run on Windows, macOS, and Linux.
-   **Persistent Data Storage**: Notes and reminders are stored locally and persist across app sessions.

Configuration
-------------

Before using the email notification functionality, you need to configure your email credentials in the `reminders.js` file:

1.  Open `reminders.js` in a text editor.
2.  Locate the `sendReminderEmail` function.
3.  Replace `'your-email@gmail.com'` with your Gmail email address.
4.  Replace `'your-password'` with your Gmail password.

Note: If you're using a different email service provider, you'll need to update the `createTransport` configuration accordingly.

Project Structure
-----------------

-   `main.js`: The main Electron process file that creates and manages the application window.
-   `index.html`: The main HTML file for the Notes section.
-   `reminders.html`: The HTML file for the Reminders section.
-   `settings.html`: The HTML file for the Settings section.
-   `styles.css`: The CSS file containing the styles for the entire application.
-   `renderer.js`: The JavaScript file that handles the note-taking functionality.
-   `reminders.js`: The JavaScript file that handles the reminder management and email notification functionality.
-   `settings.js`: The JavaScript file that handles the application settings and customization options.
