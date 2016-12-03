document.ready=function(fun){
  var t = setInterval(a,10);//设计一个定时器，循环调用a函数
  function a()
  {
      if(document && document.getElementsByTagName && document.getElementById && document.body)
      {
          fun();
          clearInterval(t);
      }
  }
};

document.ready(function(){
  console.log(document.body.children);
});


window.onload=function(){
  console.log(323);
};
