//定时发送插件
var TimerRuner=function(delay){
	
  delay=delay||1000;
  var timeFuns=[];
  var handler=null;

  //添加脉冲事件
  this.addTimeFun=function(timefun){
    timeFuns.push(timefun);
  };
  //添加激发事件
  this.addActiveFun=function(name,fun){
    if(this[name]){
      console.error("there has a function named"+name+"！！");
      return;
    }
    this[name]=function(){
      fun();
      if(handler) return;
      run();
    };
  };

  //设置触发间隔时间
  this.setDelay=function(_delay){
    delay=_delay;
  };

  //手动控制
  this.stop=function(){
  	if(handler) clearTimeout(handler);
  };
  this.start=function(){
  	if(!handler) run();
  };
  this.trigger = function(){
		if(handler)clearTimeout(handler);
		run();
	};

  var run=function(){
    handler=setTimeout(function(){
    	for(var l=0;timeFuns[l];l++){
	      timeFuns[l]();
	    }
      run();
    },delay);
  };
};
