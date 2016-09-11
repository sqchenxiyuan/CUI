var DIYScroll=function(mainW,scroll,content){
	var that=this;
	var mainW=mainW;
	var scroll=scroll;
	var content=content;
	
	var scrollDiv;
	var slider;
	
	(function(){
		
		scrollDiv=document.createElement('div');
		scrollDiv.className="scrollDiv";
		slider=document.createElement('div');
		slider.className="slider";
		scrollDiv.appendChild(slider);
		mainW.appendChild(scrollDiv);
		
		slider.style.height=scroll.clientHeight/content.clientHeight*100+"%";
		
		mainW.addEventListener('mousewheel',function(e){
    		e=e||window.event;
    		var scrollD=scroll.clientHeight/8;
    		var offtop;
    		if(e.wheelDelta>0){//前滚
  				offtop=content.offsetTop+scrollD;
  				if(offtop>0){
  					offtop=0;
  				}
    		}else{//后滚
  				offtop=content.offsetTop-scrollD;
  				if(offtop<scroll.clientHeight-content.clientHeight){
  					offtop=scroll.clientHeight-content.clientHeight;
  				}
    		}
    		
    		content.style.top=offtop+"px";
    		var topPorp=-content.offsetTop/content.clientHeight;
    		//console.log(content.style.top);
    		slider.style.top=topPorp*100+"%";
    		
    		//var scrollE=document.attachEvent('onscroll');
				document.getElementById('mainW').onscroll();
    		return true;
    	});
		mainW.onscroll=function(){
    		
    	}
		mainW.addEventListener('mouseover',function(){
    		window.onmousewheel=function(){return false};
    	});
    	mainW.addEventListener('mouseout',function(){
    		window.onmousewheel=function(){return true};
    	});
    	
    	
    	var draging=false;
    	var sy;
    	var soffsety;
    	slider.addEventListener('mousedown',function(e){
    		draging=true;
    		sy=e.clientY
    		soffsety=slider.offsetTop;
    		window.getSelection().removeAllRanges();
    	});
    	window.addEventListener('mousemove',function(e){
    		if(draging){
    			var ny=soffsety+e.clientY-sy;
    			if(ny<0) ny=0;
    			if(ny>scrollDiv.offsetHeight-slider.offsetHeight) ny=scrollDiv.offsetHeight-slider.offsetHeight;
    			slider.style.top=ny+"px";
    			content.style.top=-ny/scrollDiv.offsetHeight*content.clientHeight+"px";
    		}
		});
		window.addEventListener('mouseup',function(){
			if(draging){
				draging=false;
			}
		});  	
	}())
}