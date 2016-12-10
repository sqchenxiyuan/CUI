const electron = require('electron');
// Module to control application life.
const {app, globalShortcut,BrowserWindow,Tray,Menu,ipcMain} = require('electron');
// Module to create native browser window.

const path = require('path');
const url = require('url');

let mainWindow;


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

const ipc = require('electron').ipcMain;
ipc.on('exit',function(){
  mainWindow.hide();
  globalShortcut.register('CommandOrControl+X',() => {
    openWindow();
  });
});


function openWindow () {
  globalShortcut.unregister('CommandOrControl+alt+X');
  mainWindow.show();
}

ipc.on('exit',function(){
  mainWindow.hide();
  globalShortcut.register('CommandOrControl+X',()=>{
    openWindow();
  });
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
