const { app, BrowserWindow, Menu, dialog } = require("electron");
const os = require("os");
const ip = require("ip");
const fs = require("fs-extra");
const path = require("path");
const url = require("url");
// Paths
let appPath = app.getAppPath();
let resourcesPath = app.isPackaged
    ? app.getPath("home") + ""
    : app.getAppPath();
// config
let config = {};
try {
    config = require(path.join(
        resourcesPath,
        "leparc_resources",
        "config",
        "config.js",
    ));
} catch (e) {
    //
}
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 450,
        frame: config.env ? config.env.frame : true,
        alwaysOnTop: config.env ? config.env.alwaysOnTop : false,
        icon: path.join(appPath, "assets", "icon.png"),
        webPreferences: {
            nodeIntegration: true,
        },
    });
    mainWindow.setMenu(null);
    mainWindow.center();
    //mainWindow.setAlwaysOnTop(true);
    mainWindow.setMenuBarVisibility(false);
    if (app.isPackaged) {
        // Directorio leparc_resources
        mkdir(path.join(resourcesPath, "leparc_resources"), () => {
            // Directorio -> leparc_resources/save
            mkdir(path.join(resourcesPath, "leparc_resources", "save"), () => {
                writef(
                    path.join(
                        resourcesPath,
                        "leparc_resources",
                        "save",
                        "auxcode.txt",
                    ),
                    "// Hola LeParc!!",
                );
            });
            // Directorio -> leparc_resources/snippets
            mkdir(
                path.join(resourcesPath, "leparc_resources", "snippets"),
                () => {
                    fs.copy(
                        path.join(appPath, "leparc_resources", "snippets"),
                        path.join(
                            resourcesPath,
                            "leparc_resources",
                            "snippets",
                        ),
                        () => {
                            chmodall(
                                path.join(
                                    resourcesPath,
                                    "leparc_resources",
                                    "snippets",
                                ),
                            );
                        },
                    );
                },
            );
            // Directorio -> leparc_resources/libs
            mkdir(path.join(resourcesPath, "leparc_resources", "libs"));
            // Directorio -> leparc_resources/media
            mkdir(path.join(resourcesPath, "leparc_resources", "media"));
            // Directorio -> leparc_resources/config
            mkdir(
                path.join(resourcesPath, "leparc_resources", "config"),
                () => {
                    writef(
                        path.join(
                            resourcesPath,
                            "leparc_resources",
                            "config",
                            "config.txt",
                        ),
                        "server-ip=127.0.0.1\nport=7777\nosc-ip=127.0.0.1\nosc-port=12345\nmfr=0.001",
                    );
                    writef(
                        path.join(
                            resourcesPath,
                            "leparc_resources",
                            "config",
                            "config.js",
                        ),
                        "let cnf = {\n// Window frame\nframe : true,\n// Win always on top\nalwaysOnTop: false}\n",
                    );
                },
            );
            // Directorio -> leparc_resources/extends
            mkdir(
                path.join(resourcesPath, "leparc_resources", "extends"),
                () => {
                    fs.copy(
                        path.join(appPath, "leparc_resources", "extends"),
                        path.join(resourcesPath, "leparc_resources", "extends"),
                        () => {
                            chmodall(
                                path.join(
                                    resourcesPath,
                                    "leparc_resources",
                                    "extends",
                                ),
                            );
                        },
                    );
                },
            );
        });
    }
    mainWindow.loadFile("index.html");
    global.settings = {
        renderer: "p2d",
    };
    // mainWindow.webContents.openDevTools();
    // mainWindow.webContents.openDevTools({ mode: 'detach' })

    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});
exports.exit = function () {
    app.exit();
};
exports.path = function () {
    return path;
};
exports.globalSettings = function () {
    return global.settings;
};
exports.setFull = function () {
    mainWindow.setKiosk(true);
    mainWindow.setMenu(null);
    mainWindow.setMenuBarVisibility(false);
};
exports.setUnFull = function () {
    mainWindow.setKiosk(false);
    mainWindow.setMenu(null);
    mainWindow.setMenuBarVisibility(false);
};
exports.getMemory = function () {
    return Math.round((os.freemem() / os.totalmem()) * 100);
};
exports.getIP = function () {
    return ip.address();
};

exports.saveCode = (file, data) => {
    fs.writeFile(
        path.join(resourcesPath, "leparc_resources", "save", file + ".txt"),
        data,
        function (err) {
            if (err) throw err;
        },
    );
};
exports.resizeWin = function (w, h) {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    } else if (mainWindow.isKiosk()) {
        mainWindow.setKiosk(false);
    }
    mainWindow.setMenuBarVisibility(false);
    mainWindow.setBounds({ width: w, height: h });
    mainWindow.center();
};
exports.devTools = function (open) {
    if (open) {
        mainWindow.webContents.openDevTools({ mode: "right" });
    } else {
        mainWindow.webContents.closeDevTools();
    }
};
exports.reload = function () {
    if (arguments.length == 1) {
        global.settings.renderer = arguments[0];
    }
    mainWindow.loadFile("index.html");
};
exports.resourcesPath = function () {
    return resourcesPath;
};
exports.getMediaBanks = function (dir) {
    let files = fs.readdirSync(dir);
    let res = [];
    let folderName = [];
    files.forEach((file) => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            if (!folderName.includes(file)) {
                folderName.push(file.trim());
            }
            let path2 = path.join(dir, file);
            let files2 = fs.readdirSync(path2);
            files2.forEach((file2) => {
                if (!fs.statSync(path.join(path2, file2)).isDirectory()) {
                    res.push(path.join(path2, file2));
                }
            });
        }
    });
    return {
        paths: res,
        folderName: folderName,
    };
};

// Utils
function mkdir(path, fn) {
    fs.mkdir(path, (err) => {
        if (!err) {
            fs.chmod(path, "0777", function (err) {
                if (!err) {
                    if (typeof fn == "function") {
                        fn();
                    }
                }
            });
        }
    });
}
function chmodall(dir) {
    let files = fs.readdirSync(dir);
    files.forEach(function (file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            fs.chmod(path.join(dir, file), "0777");
        }
    });
}
function writef(path, content, fn) {
    fs.writeFile(path, content, function (err) {
        if (!err) {
            fs.chmod(path, "0777", function (err) {
                if (!err) {
                    if (typeof fn == "function") {
                        fn();
                    }
                }
            });
        }
    });
}
