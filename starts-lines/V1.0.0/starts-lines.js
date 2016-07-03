function starts_lines(dom){
	var canva=null;
	var cxt=null;
	var mousepoint=null;
	var canoffset=null;
	var pointslist=null;
	var drawing=false;
	var config={
		pointSize:1.5,
		lineSiez:1,
		pointColor:"black",
		backgroundColor:"white",
		lineColor:"rgb(0,0,0)"
	};
	
	function init(){
		//查看是否已创建过，已创建过先移除
		if(canva) canva.remove();
		
		//创建画布
		canva=document.createElement("canvas");
		dom.appendChild(canva);
		canva.style.position="absolute";
		canva.style.zIndex=0;
		if(dom==document.body)
		{
			canva.width=dom.scrollWidth;
			canva.height=dom.scrollHeight;
		}else{
			canva.width=dom.offsetWidth;
			canva.height=dom.offsetHeight;
		}
		cxt=canva.getContext("2d");
		
		
		//设置鼠标移动时的坐标
		mousepoint={x:0,y:0};
		canoffset=getoffset(canva);
		function getoffset(dom){
			var x=0,y=0;
			while(dom!=document.body){
				x += dom.offsetLeft;
				y += dom.offsetTop;
				dom=dom.offsetParent;
			}
			return {offsetLeft:x,offsetTop:y};
		}
		canva.onmousemove=function(e){
		//console.log(e.clientX+document.body.scrollLeft-this.offsetLeft);
		//console.log(e.clientY+document.body.scrollTop-this.offsetTop);
		mousepoint.x=e.clientX+document.body.scrollLeft-canoffset.offsetLeft;
		mousepoint.y=e.clientY+document.body.scrollTop-canoffset.offsetTop;
		}
		
		
		
		
		//点的列表
		pointslist=[];
		for(var i=0;i<canva.width*canva.height/10000;i++){
			pointslist[i]=new point({x:(i*100+50)%canva.width,y:(i*100+50)/canva.height*100+50},{x:Math.random()*2-1,y:Math.random()*2-1});
			//console.log(i);
			//pointslist[i].speed.x=Math.random()*2-1;
			//pointslist[i].speed.y=Math.random()*2-1;
			//console.log(pointslist[i].speed.x+"=="+pointslist[i].speed.y);
			//pointslist[i].position.x=(i*100+50)%canva.width;
			//pointslist[i].position.y=(i*100+50)/canva.height*100+50;
		}
		pointslist.update=function(){
			for(var i=0;i<this.length;i++){
				this[i].update();
			}
		}
		
	}
	
	function start(){
		drawing=true;
		draw();
	}
	function stop(){
		drawing=false;
	}
	
	function draw(){
		cxt.fillStyle=config.backgroundColor;
		cxt.fillRect(0,0,canva.width,canva.height);
		
		
		for(var i=0;i<pointslist.length;i++){
			//划点
			var p=pointslist[i]
			cxt.beginPath();
			cxt.arc(p.position.x,p.position.y,p.size,0,Math.PI*2,true);
			cxt.fillStyle=config.pointColor;
			cxt.fill();
			cxt.closePath();
			
			//划线
			var colorstrb="rgba"+config.lineColor.substring(3,config.lineColor.length-1)+",";
			cxt.lineWidth=config.lineSiez;
			for(var j=i+1;j<pointslist.length;j++){
				var p2=pointslist[j]
				var d=(p.position.x-p2.position.x)*(p.position.x-p2.position.x)
				+(p.position.y-p2.position.y)*(p.position.y-p2.position.y);
				d=Math.sqrt(d);
				if(d<100){
					cxt.beginPath();
					cxt.moveTo(p.position.x,p.position.y);
					cxt.lineTo(p2.position.x,p2.position.y);
					cxt.strokeStyle=colorstrb+(100-d)/100+")";
					cxt.stroke();
					cxt.closePath();
				}
			}
			
			var d=(p.position.x-mousepoint.x)*(p.position.x-mousepoint.x)
				+(p.position.y-mousepoint.y)*(p.position.y-mousepoint.y);
			d=Math.sqrt(d);
			if(d<200){
				cxt.beginPath();
				cxt.moveTo(p.position.x,p.position.y);
				cxt.lineTo(mousepoint.x,mousepoint.y);
				cxt.strokeStyle=colorstrb+(200-d)/200+")";
				cxt.stroke();
				cxt.closePath();
			}
		}
	
		
		
		setTimeout(function(){
			pointslist.update();
			if(drawing)draw();
		},20);
	};
	
	//每个点的属性
	var point=function(_position,_speed){
		this.size=config.pointSize;
		this.position=_position;
		this.speed=_speed;
		this.update=function(){
			this.position.x+=this.speed.x;
			if(this.position.x>=canva.width||this.position.x<0){
				this.speed.x=-this.speed.x;
			}
			this.position.y+=this.speed.y;
			if(this.position.y>=canva.height||this.position.y<0){
				this.speed.y=-this.speed.y;
			}
		}
	}
	
	
	return {
		init:init,
		start:start,
		stop:stop
	}
}