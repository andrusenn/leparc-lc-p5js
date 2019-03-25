const { app, BrowserWindow, Menu } = require('electron')
const os = require("os")
const fs = require('fs')
const path = require('path')


// Paths
// let appPath = (app.isPackaged) ? path.resolve(__dirname) : app.getAppPath();
// let savePath = (app.isPackaged) ? path.resolve(__dirname,"..","..") + "" : app.getAppPath();
// let resourcesPath = (app.isPackaged) ? path.resolve(__dirname,"..","..") + "" : app.getAppPath();
let appPath = app.getAppPath();
let savePath = (app.isPackaged) ? app.getPath("home") + "" : app.getAppPath();
let resourcesPath = (app.isPackaged) ? path.resolve(__dirname, "..", "..") + "" : app.getAppPath();

let mainWindow

function createWindow() {
      mainWindow = new BrowserWindow({
            width: 1280,
            height: 720,
            icon: appPath + '/assets/icon.png'
      })
      mainWindow.setMenu(null);
      mainWindow.center();
      //mainWindow.setAlwaysOnTop(true);
      mainWindow.setMenuBarVisibility(false);
      // mainWindow.webContents.setFrameRate(300)
      if (app.isPackaged) {
            // Directorio duchamplc-resources
            mkdir(savePath + '/duchamplc-resources/', () => {
                  // Directorio -> duchamplc-resources/save
                  mkdir(savePath + '/duchamplc-resources/save/', () => {
                        writef(savePath + '/duchamplc-resources/save/setup.txt', '// Hola Duchamp!!');
                        writef(savePath + '/duchamplc-resources/save/aux.txt', '// Code!!');
                        writef(savePath + '/duchamplc-resources/save/draw.txt', '// Hora de livecoding!!');
                  })
                  // Directorio -> duchamplc-resources/libs
                  mkdir(savePath + '/duchamplc-resources/libs/')
                  // Directorio -> duchamplc-resources/images 
                  mkdir(savePath + '/duchamplc-resources/images/')
            })
      }
      mainWindow.loadFile('index.html')

      //mainWindow.webContents.openDevTools()
      // mainWindow.webContents.openDevTools({ mode: 'detach' })

      mainWindow.on('closed', function () {
            mainWindow = null
      })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') {
            app.quit()
      }
})
app.on('activate', function () {
      if (mainWindow === null) {
            createWindow()
      }
})
exports.exit = function () {
      app.exit();
}

exports.setFull = function () {
      mainWindow.setKiosk(true)
      mainWindow.setMenu(null);
      mainWindow.setMenuBarVisibility(false)
}
exports.setUnFull = function () {
      mainWindow.setKiosk(false)
      mainWindow.setMenu(null);
      mainWindow.setMenuBarVisibility(false)
}
exports.getMemory = function () {
      return Math.round((os.freemem() / os.totalmem()) * 100);
}

exports.saveCode = (file, data) => {
      fs.writeFile(savePath + "/duchamplc-resources/save/" + file + ".txt", data, function (err) {
            if (err) throw err;
      });
}
exports.resizeWin = function (w, h) {
      if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
      } else
            if (mainWindow.isKiosk()) {
                  mainWindow.setKiosk(false)
            }
      mainWindow.setBounds({ width: w, height: h });
      mainWindow.center()
}
exports.devTools = function (open) {
      if (open) {
            mainWindow.webContents.openDevTools({ mode: 'right' });
      } else {
            mainWindow.webContents.closeDevTools();
      }
}
exports.reload = function () {
      mainWindow.loadFile('index.html');
}
exports.loadImgsBank = function () {
      let source = appPath + '/duchamplc-resources/images/'
      const isDirectory = source => lstatSync(source).isDirectory()
      const getDirectories = source =>readdirSync(source).map(name => join(source, name)).filter(isDirectory)
      return getDirectories
      // fs.readdir(appPath + '/duchamplc-resources/images/', (err, files) => {
      //       if (!err) {
      //             for (let i = 0; i < files.length; i++) {
      //                   fs.readdir(appPath + '/duchamplc-resources/images/' + files[i], (err, files) => {
      //                         if (!err) {
      //                               if (typeof fn == 'function') {
      //                                     fn(files)
      //                               }
      //                         }
      //                         return false;
      //                   });
      //             }
      //       }
      //       return false;
      // });
}
exports.savePath = function () {
      return savePath;
}

// Utils
function mkdir(path, fn) {
      fs.mkdir(path, err => {
            if (!err) {
                  fs.chmod(path, '0777', function (err) {
                        if (!err) {
                              if (typeof fn == 'function') {
                                    fn()
                              }
                        }
                  });
            }
      });
}
function writef(path, content, fn) {
      fs.writeFile(path, content, function (err) {
            if (!err) {
                  if (typeof fn == 'function') {
                        fn()
                  }
            }
      });
}
