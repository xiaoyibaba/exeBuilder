const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

const winConf = require('./win-conf.json')

let win

function createWindow () {
  let x = 0;
  let y = 0;

  if (winConf.otherDisplay) {
    const displays = screen.getAllDisplays();
    if (displays.length > 1) {
      x = displays[displays.length - 1].bounds.x;
      y = displays[displays.length - 1].bounds.y;
    }
  }

  win = new BrowserWindow({
    title: winConf.title,
    frame: false,
    fullscreen: true,
    x,
    y
  });
  win.loadFile(path.resolve(__dirname, './dist/index.html'));

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
