const { app, BrowserWindow, ipcMain, Notification } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 1650,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    frame: false,
    transparent: true,
    titleBarStyle: 'hidden',
    vibrancy: 'ultra-dark',
    backgroundColor: '#00000000',
    show: false
  });

  ipcMain.on('show-notification', (event, title, description) => {
    const notification = new Notification({
      title,
      body: description,
      icon: 'path/to/notification-icon.png' // Optional: set a custom icon for the notification
    });
    notification.show();
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});