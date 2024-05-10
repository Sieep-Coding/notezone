const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
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

  mainWindow.loadFile('index.html');

  let isDragging = false;
  let initialMousePosition;

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('mousemove', (event) => {
    if (isDragging) {
        const { screen } = require('electron');
        const currentScreen = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());
        const cursorPosition = screen.getCursorScreenPoint();
        const bounds = mainWindow.getBounds();
        const cursorOffsetX = cursorPosition.x - initialMousePosition.x;
        const cursorOffsetY = cursorPosition.y - initialMousePosition.y;
        const newPositionX = bounds.x + cursorOffsetX;
        const newPositionY = bounds.y + cursorOffsetY;
        const screenBounds = currentScreen.workArea;

        // Ensure the window does not move outside the screen bounds
        const x = Math.max(screenBounds.x, Math.min(screenBounds.x + screenBounds.width - bounds.width, newPositionX));
        const y = Math.max(screenBounds.y, Math.min(screenBounds.y + screenBounds.height - bounds.height, newPositionY));

        mainWindow.setPosition(x, y);
    }
});

mainWindow.on('mousedown', (event) => {
    const { screen } = require('electron');
    const currentScreen = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());
    const screenBounds = currentScreen.workArea;
    const bounds = mainWindow.getBounds();

    // Check if the click is within the draggable area (top few pixels)
    if (
        event.clientY <= bounds.y + 25 &&
        event.clientY >= bounds.y
    ) {
        isDragging = true;
        initialMousePosition = {
            x: event.screenX,
            y: event.screenY
        };
    }
});

mainWindow.on('mouseup', () => {
    isDragging = false;
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