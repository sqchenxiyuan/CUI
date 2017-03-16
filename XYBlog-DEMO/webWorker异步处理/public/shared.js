let worker = new SharedWorker('worker-shared.js');

worker.port.start();

worker.port.postMessage('');

worker.port.onmessage=function(e){
    console.log(e.data);
};
