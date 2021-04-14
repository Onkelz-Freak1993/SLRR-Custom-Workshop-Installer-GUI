const { ipcRenderer } = require('electron')
const ipc = ipcRenderer

//// Minimize App
minBtn.addEventListener('click', () => {
    ipc.send('minimizeApp')
})
//// Maximize Restore App
maxBtn.addEventListener('click', () => {
    ipc.send('maximizeRestoreApp')
})
//// Close App
closeBtn.addEventListener('click', () => {
    ipc.send('closeApp')
})
