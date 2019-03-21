const { app, BrowserWindow, Menu } = require('electron')
const os = require("os")
const fs = require('fs')
const path = require('path')


// Paths
let appPath = app.getAppPath();
let savePath = (app.isPackaged) ? path.resolve(__dirname, '..', '..', '..', '..') + "" : appPath;
let resourcesPath = (app.isPackaged) ? path.resolve(__dirname, '..', '..', '..', '..') + "" : appPath;

let mainWindow

function createWindow() {
      mainWindow = new BrowserWindow({
            width: 800,
            height: 600
      })
      mainWindow.setMenu(null);
      mainWindow.center();
      //mainWindow.setAlwaysOnTop(true);
      mainWindow.setMenuBarVisibility(false);
      // mainWindow.webContents.setFrameRate(300)
      //if (app.isPackaged) {
      // Crea carpeta config
      // let save_path = savePath + '/save/';
      // fs.mkdir(save_path, err => {
      //       if (!err) {
      //             fs.chmod(save_path, '0777', function (err) {
      //                   if (!err) {
      //                         console.log('cmod')
      //                   }
      //             });
      //       }
      // });
      //}
      // Menu.setApplicationMenu(Menu.buildFromTemplate([
      //       {
      //             label: 'Files',
      //             submenu: [
      //                   {
      //                         label: 'New',
      //                         click: () => console.log("Hello world")
      //                   }
      //             ]
      //       }
      // ]))
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
// exports.debug = function(data){
//       return savePath;
// }
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
      fs.writeFile(appPath + "/save/" + file + ".txt", data, function (err) {
            if (err) throw err;
            //console.log("datos guardados");
      });
}
exports.resizeWin = function (w, h) {
      if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
      }else
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
exports.loadImgsBank = function (fn) {
      fs.readdir(appPath + '/custom/imgs/', (err, files) => {
            if (!err) {
                  if(typeof fn == 'function'){
                        fn(files)
                  }
            }
            return false;
      });
}
