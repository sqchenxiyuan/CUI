(function(){
  window.easyScroll=function(){
    var easyScroll={};
    var label='data-scroll';
    var hashStart='scrollS=';
    var hashEnd='=scrollE';
    var reg=null;

    easyScroll.init=function(){
      reg=new RegExp(hashStart+'(\\S+)'+hashEnd,'g');
      var items=Array.from(document.querySelectorAll(`[${label}]`));
      items.forEach(function(item){
        item.onclick=function(){return false;};
        item.removeEventListener('click',scrollEvent);
        item.addEventListener('click',scrollEvent);
      });
      initScroll();
    };

    function initScroll(){
      var id=null;
      if((id=URL2ID())){
        scrollTo(id);
      }
    }


    function scrollEvent(){
      var to=null;
      if(!(to=this.getAttribute(label))){
        to=this.getAttribute('href');
      }
      if(URL2ID()===to)return;
      ID2URL(to);
      scrollTo(to);
    }

    function scrollTo(to){
      var todom=document.querySelector(to);
      var offsetparent=todom.offsetParent;


      var x=0,y=0;
      var e=todom;
      while(e){
        console.log(e.offsetTop);
        x+=e.offsetTop;
        e=e.offsetParent;
      }

      e=todom.parentElement;
      while(e){
        let h;
        if(e===document.body){
          console.log(e.scrollHeight-e.clientHeight);
          h=e.scrollHeight-e.parentElement.clientHeight;
          y+=e.scrollHeight-e.clientHeight;
        }else{
          console.log(e.scrollHeight-e.clientHeight);
          h=e.scrollHeight-e.clientHeight;
          y+=e.scrollHeight-e.clientHeight;
        }

        let bbb;
        if(x>y){
          setScroll(e,h,500);
        }else{
          console.log(y-x,"==-=-=",e);
          setScroll(e,y-x,500);
          break;
        }
        e=e.parentElement;

      }

      console.log(x,y);
      //
      setScroll(document.body,todom.offsetTop,500);
    }

    function setScroll(dom,to,speed){
      var starttime=new Date().getTime();
      var starttop=dom.scrollTop;
      var delay=Math.abs(starttop-to)/(speed*window.screen.availHeight/100)*1000;

      startScroll();

      function startScroll(){
        if(change()){
          setTimeout(startScroll,15);
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


    function URL2ID(){
      var hash=location.hash;
      if(hash.match(reg)){
        return hash.match(reg)[0].replace(hashStart,'').replace(hashEnd,'');
      }
      return false;
    }

    function ID2URL(id){
      var hash=location.hash;
      if(reg.test(hash)){
        hash=hash.replace(reg,`${hashStart}${id}${hashEnd}`);
      }else{
        hash+=`${hashStart}${id}${hashEnd}`;
      }
      location.hash=hash;
    }

    return easyScroll;
  }();
}());
