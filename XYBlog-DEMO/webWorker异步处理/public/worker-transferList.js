onmessage=function(e){
    console.log(e.data.x===e.data.y);
    console.log(e.data.x===e.data.z);
    // console.log('worker beforeSend',e.data.x.byteLength);
    // postMessage(e.data,[e.data.x]);
    // console.log('worker afterSend',e.data.x.byteLength);
};
