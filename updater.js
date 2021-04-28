const { dialog } = require('electron')
const {autoUpdater} = require('electron-updater')

autoUpdater.autoDownload = false

module.exports = () => {
  autoUpdater.checkForUpdates()
  autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Available',
      message: 'A new version of Readit is available. Do you want to update now',
      buttons: ['Update', 'No']
    }, buttonIndex => {
      if (buttonIndex == 0) autoUpdater.downloadUpdate()
    })
  })

  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Update downloaded',
      message: 'Install and restart now?',
      buttons: ['Yes', 'Later']
    }, buttonIndex => {
      if (buttonIndex == 0) autoUpdater.quitAndInstall(false, true)
    })
  })
}