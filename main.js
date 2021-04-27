// Modules
const {app, BrowserWindow, ipcMain} = require('electron')
const windowStateKeeper = require('electron-window-state')
const readItem = require('./readItem')
const appMenu = require('./menu')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

ipcMain.on('new-item', (event, itemUrl) => {
  readItem(itemUrl, item => {
    event.sender.send('new-item-success', item)
  });
})

function createWindow () {
  const state = windowStateKeeper({
    defaultWidth: 500, defaultHeight: 650
  })

  mainWindow = new BrowserWindow({
    x: state.x, y: state.y,
    width: state.defaultWidth, height: state.defaultHeight,
    minWidth: 350, maxWidth: 650, minHeight: 300,
    webPreferences: { nodeIntegration: true }
  })

  appMenu(mainWindow.webContents)

  mainWindow.loadFile('./renderer/main.html')

  state.manage(mainWindow)

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
