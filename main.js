const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let win

function createWindow () {
  const displays = screen.getAllDisplays();
  let secondaryDisplay;

  if (displays.length > 1) {
    secondaryDisplay = displays[displays.length - 1]
  }

  if (secondaryDisplay) {
    win = new BrowserWindow({
      title: '测试',
      frame: false,
      fullscreen: true,
      x: secondaryDisplay.bounds.x,
      y: secondaryDisplay.bounds.y
    });
    win.loadFile(path.resolve(__dirname, './dist/index.html'));
  }

  win.on('closed', () => {
    win = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
