const {app, BrowserWindow, ipcMain}=require("electron");
const path=require("path");

//Create Window Definition
function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: true
    }
  })

  mainWindow.loadFile('./index.html')
  mainWindow.webContents.openDevTools()
}
//End Create Window


//New Window when Ready
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
    if (process.platform === "linux"){
      app.commandLine.appendSwitch("enable-experimental-web-platform-features", true);
    } else {
      app.commandLine.appendSwitch("enable-web-bluetooth", true);
    }
  })
})

//All Closed Exception
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

