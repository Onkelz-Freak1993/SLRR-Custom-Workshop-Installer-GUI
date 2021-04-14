const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ipc = ipcMain

function createWindow () {
  const win = new BrowserWindow({
    width: 1024,
    height: 800,
    minWidth:800,
    minHeight:600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('src/index.html')

  //// Minimize App
  ipc.on('minimizeApp', () => {
    console.log('Clicked on minBtn')
    win.minimize()
})
//// Maximize Restore App
ipc.on('maximizeRestoreApp', () => {
  console.log('Clicked on maxBtn')
  if(win.isMaximized()){
    console.log('Clicked on maxBtn -> Restored')
    win.restore()
  } else {
    console.log('Clicked on maxBtn -> Maximized')
    win.maximize()
  }
})
  //// Close App
  ipc.on('closeApp', () => {
      console.log('Clicked on closeBtn')
      win.close()
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})