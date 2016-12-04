// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//渲染进程
const ipc = require('electron').ipcRenderer;

document.getElementById('12').addEventListener('click',function(){
ipc.send('exit');
});