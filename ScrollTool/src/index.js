document.ready=function(fun){
    var t = setInterval(a,10);//设计一个定时器，循环调用a函数
    function a(){
        if(document && document.getElementsByTagName && document.getElementById && document.body)
        {
            fun();
            clearInterval(t);
        }
    }
};

document.ready(function(){
  var items=Array.from(document.querySelectorAll('[data-scroll]'));
  items.forEach(function(item){
    item.onclick=function(){return false;};
    item.addEventListener('click',scrollEvent);
  });
});


function scrollEvent(){
  var to=this.getAttribute('href').replace(/^#/,'');

  var todom=document.getElementById(to);
  scrollTo(todom);
}

function scrollTo(dom){
  console.log(dom.offsetTop);
  console.log(document.body.scrollTop);
  setScroll(document.body,dom.offsetTop,500);
}

function setScroll(dom,to,speed){
  var starttime=new Date().getTime();
  var starttop=dom.scrollTop;
  var delay=Math.abs(starttop-to)/(speed*window.screen.availHeight/100)*1000;

  startScroll();

  function startScroll(){
    if(change()){
      setTimeout(startScroll,10);
    }
  }

  function change(){
    var nowtime=new Date().getTime();
    var p=(nowtime-starttime)/delay;
    if(p>1)p=1;
    dom.scrollTop=starttop+(to-starttop)*p;

    if(p===1){
      return false;
    }else{
      return true;
    }
  }
}
