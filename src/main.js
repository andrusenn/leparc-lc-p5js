const { app, BrowserWindow, Menu, dialog } = require('electron')
const os = require("os")
const ip = require("ip")
const fs = require('fs')
const path = require('path')

// Paths
let appPath = app.getAppPath();
let resourcesPath = (app.isPackaged) ? app.getPath("home") + "" : app.getAppPath();

let mainWindow

function createWindow() {
      mainWindow = new BrowserWindow({
            width: 1280,
            height: 720,
            icon: path.join(appPath, 'assets', 'icon.png')
      })
      mainWindow.setMenu(null);
      mainWindow.center();
      //mainWindow.setAlwaysOnTop(true);
      mainWindow.setMenuBarVisibility(false);
      // mainWindow.webContents.setFrameRate(300)
      if (app.isPackaged) {
            // Directorio leparc_resources
            mkdir(path.join(resourcesPath, 'leparc_resources'), () => {
                  // Directorio -> leparc_resources/save
                  mkdir(path.join(resourcesPath, 'leparc_resources', 'save'), () => {
                        writef(path.join(resourcesPath, 'leparc_resources', 'save', 'setup.txt'), '// Hola LeParc!!');
                        writef(path.join(resourcesPath, 'leparc_resources', 'save', 'auxcode.txt'), '// !!');
                        writef(path.join(resourcesPath, 'leparc_resources', 'save', 'draw.txt'), '// ');
                  })
                  // Directorio -> leparc_resources/snippets
                  mkdir(path.join(resourcesPath, 'leparc_resources', 'snippets'))
                  // Directorio -> leparc_resources/media 
                  mkdir(path.join(resourcesPath, 'leparc_resources', 'media'))
                  // Directorio -> leparc_resources/config
                  mkdir(path.join(resourcesPath, 'leparc_resources', 'config'), () => {
                        writef(path.join(resourcesPath, 'leparc_resources', 'config', 'config.txt'), "server-ip=127.0.0.1\nport=7777")
                  })
                  // Directorio -> leparc_resources/extends
                  mkdir(path.join(resourcesPath, 'leparc_resources', 'extends'), () => {
                        writef(path.join(resourcesPath, 'leparc_resources', 'extends', 'lp-extends.js'), "");
                  })
            })
      }
      mainWindow.loadFile('index.html')
      global.settings = {
            renderer: 'p2d'
      }
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
exports.path = function () {
      return path
}
exports.globalSettings = function () {
      return global.settings
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
exports.getIP = function () {
      return ip.address()
}

exports.saveCode = (file, data) => {
      fs.writeFile(path.join(resourcesPath, 'leparc_resources', 'save', file + ".txt"), data, function (err) {
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
      mainWindow.setMenuBarVisibility(false)
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
      if (arguments.length == 1) {
            global.settings.renderer = arguments[0]
      }
      mainWindow.loadFile('index.html');
}
exports.loadImgsBank = function () {
      let source = path.join(resourcesPath, 'leparc_resources', 'images')
      const isDirectory = source => lstatSync(source).isDirectory()
      const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory)
      return getDirectories
      // fs.readdir(appPath + '/leparc_resources/images/', (err, files) => {
      //       if (!err) {
      //             for (let i = 0; i < files.length; i++) {
      //                   fs.readdir(appPath + '/leparc_resources/images/' + files[i], (err, files) => {
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
exports.resourcesPath = function () {
      return resourcesPath;
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
