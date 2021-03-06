const { app } = require('electron');
const log = require('electron-log');
const command = require('./services/command');
const application = require('./services/application');
const win = require('./services/window');
const menu = require('./services/menu');
const config = require('./config');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
log.info('(cat) message');

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', createWindow)
app.on('ready', () => {
  menu.init();
  win.create();
  // application.fetchTemplates();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win.getWin() === null) {
    // createWindow()
    win.create();
  }
});

global.services = {
  locale: app.getLocale(),
  // pkg: pkg,
  command,
  application
};

global.configs = {
  config
};