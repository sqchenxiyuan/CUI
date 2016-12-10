const electron = require('electron');
// Module to control application life.
const {app, globalShortcut,BrowserWindow,Tray,Menu} = require('electron');
// Module to create native browser window.

const path = require('path');
const url = require('url');

const ipc = require('electron').ipcMain;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;



function openWindow () {
  // Create the browser window.

  globalShortcut.unregister('CommandOrControl+X');

  mainWindow.show();
}

ipc.on('exit',function(){
  mainWindow.hide();
  globalShortcut.register('CommandOrControl+X',()=>{
    openWindow();
  });
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', function(){

  //托盘图标
  tray = new Tray(path.join(__dirname,'./res/img/icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ]);
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);





  mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      backgroundColor:'#88000000',
      frame: false,
      transparent:true,
      show:false
  });
  mainWindow.setFullScreen(true);
  mainWindow.setResizable(false);
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  openWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    // app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
