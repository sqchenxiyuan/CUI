var x=0;

function add(){
    setTimeout(()=>{
        x++;
        add();
    },100);
}
add();

addEventListener("connect", function(e){

    var port = e.ports[0];

    port.addEventListener('message', function(e) {
      port.postMessage(x);
    });

    port.start(); //用onmessage绑定，必须要显式启动端口通信

});
