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
  var ndom=buildDom(vdom);
  document.body.appendChild(ndom);
  console.log(ndom);
});


function readDom(node){
    var i;

    var vdom={
        'tag':node.nodeName,
        'attributes':null,
        'childrens':null,
        'value':null
    };

    if(node.nodeName.toUpperCase()==='#TEXT'){
        // if(!node.nodeValue||!/\S/.test(node.nodeValue)) return null;
        if(!node.nodeValue) return null;
        vdom.value=node.nodeValue;
    }

    if(node.attributes){
        if(node.attributes.length)vdom.attributes={};
        for(i=0;i<node.attributes.length;i++){
            vdom.attributes[node.attributes[i].nodeName]=node.attributes[i].nodeValue;
        }
    }

    if(node.childNodes.length)vdom.childrens=[];
    for(i=0;i<node.childNodes.length;i++){
        if(node.childNodes[i].nodeName!='SCRIPT'&&
        node.childNodes[i].nodeName!='STYLE'){
            var x=readDom(node.childNodes[i]);
            if(x)vdom.childrens.push(x);
        }
    }
    return vdom;
}


function buildDom(vdom){
    var ndom;
    if(vdom.tag.toUpperCase()==='#TEXT'){
        ndom=document.createTextNode(vdom.value);
    }else{
        ndom=document.createElement(vdom.tag);

        if(vdom.attributes){
            for(var name in vdom.attributes){
                ndom.setAttribute(name,vdom.attributes[name]);
            }
        }

        if(vdom.childrens){
            vdom.childrens.forEach(function(a){
                ndom.appendChild(buildDom(a));
            });
        }
    }

    return ndom;
}
