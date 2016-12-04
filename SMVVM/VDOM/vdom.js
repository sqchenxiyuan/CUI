document.ready=function(fun){
  var t = setInterval(a,10);//设计一个定时器，循环调用a函数
  function a()
  {
      if(document && document.getElementsByTagName && document.getElementById && document.body)
      {
          clearInterval(t);
          fun();
      }
  }
};

document.ready(function(){
  var vdom=readDom(document.body);
  console.log(vdom);
});


function readDom(node){
    var i;

    var vdom={
        'tag':node.nodeName,
        'attributes':null,
        childrens:null
    };

    if(node.attributes){
        if(node.attributes.length)vdom.attributes={};
        for(i=0;i<node.attributes.length;i++){
            vdom.attributes[node.attributes[i].nodeName]=node.attributes[i].nodeValue;
        }
    }

    
    if(node.childNodes.length)vdom.childrens=[];
    for(i=0;i<node.childNodes.length;i++){
        vdom.childrens.push(readDom(node.childNodes[i]));
    }

    return vdom;
}