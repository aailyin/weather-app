const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');

// hot reload for electron
// should be commented befor packaging
//require('electron-reload')(__dirname);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win, detailsWin;

function createWindow() {
    win = new BrowserWindow({
        frame: false,
        resizable: false,
        width: 550, 
        height: 350, 
        // Don't show the window until it ready, this prevents any white flickering
        show: false,
        icon: path.resolve(__dirname, 'app', 'css', 'app_icon.png')
    });

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'app/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // just for debugging
    //win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => win = null);

    // Show window when page is ready
    win.once('ready-to-show', function () {
        win.show();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.once('ready', createWindow);

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
    if (win === null) {
        createWindow();
    }
});

//Events
ipcMain.on('close-main-window', (event, arg) => {
    app.quit();
});

// event to open a window and load an extra resource
ipcMain.on('open-details', (event, link) => {
    if (detailsWin) {
        detailsWin.close();
    }

    detailsWin = new BrowserWindow({
        height: 1000,
        width: 1600,
        icon: path.resolve(__dirname, 'app', 'css', 'app_icon.png'),
        webPreferences: {
            nodeIntegration: false
        }
    });

    detailsWin.setMenu(null);
    detailsWin.loadURL(link);
    //detailsWin.webContents.executeJavaScript();
    detailsWin.on('closed', () => detailsWin = null);
});