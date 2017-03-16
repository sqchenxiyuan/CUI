function add5billion(){
    var x=0;
    for(var i=0;i<1000000000;i++){
        x++;
        x++;
        x++;
        x++;
        x++;
    }
    return x;
}
this.postMessage(add5billion());
