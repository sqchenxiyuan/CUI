function starts_lines(dom){
	var canva=null;
	var cxt=null;
	var mousepoint=null;
	var canoffset=null;
	var pointslist=null;
	var drawing=false;
	var config={
		pointSize:1.5,				//点的大小
		lineSize:1,					//线的大小
		pointColor:"black",			//点的颜色
		backgroundColor:"white",	//背景颜色
		lineColor:"rgb(0,0,0)",		//线的颜色（必须使用rgb（））
		maxSpeed:50,				//每秒移动距离
		UPS:120,					//每秒更新次数
		FPS:60,						//每秒渲染次数
		speedSlowdown:0.8,			//碰撞边缘减速比例
		speedaccelerate:0.3,		//与鼠标链接加速比例
		onepointareasize:100,		//边长方块一个点
		distanceofPoint:100,		//点与点链接的最大距离
		distanceofMouse:150			//点与鼠标链接的最大距离
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
		
		
		var areasize=config.onepointareasize;
		//初始化点
		pointslist=[];
		for(var i=0;i<canva.width*canva.height/areasize/areasize;i++){
			pointslist[i]=new point({x:(i*areasize)%canva.width+areasize/2,
				y:(i*areasize)/canva.height*areasize+areasize/2});
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
		update();
	}
	function stop(){
		drawing=false;
	}
	
	function setConfig(newconfig){
		for(var i in config){
			if(newconfig[i]){
				config[i]=newconfig[i];
			}
		}
		console.log(config);
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
			cxt.lineWidth=config.lineSize;
			for(var j=i+1;j<pointslist.length;j++){
				var p2=pointslist[j]
				var d=(p.position.x-p2.position.x)*(p.position.x-p2.position.x)
				+(p.position.y-p2.position.y)*(p.position.y-p2.position.y);
				d=Math.sqrt(d);
				if(d<config.distanceofPoint){
					cxt.beginPath();
					cxt.moveTo(p.position.x,p.position.y);
					cxt.lineTo(p2.position.x,p2.position.y);
					cxt.strokeStyle=colorstrb+(config.distanceofPoint-d)/config.distanceofPoint+")";
					cxt.stroke();
					cxt.closePath();
				}
			}
			
			var x2=(p.position.x-mousepoint.x)*(p.position.x-mousepoint.x);
			var y2=(p.position.y-mousepoint.y)*(p.position.y-mousepoint.y);
			var d=x2+y2;
			d=Math.sqrt(d);
			if(d<config.distanceofMouse){
				cxt.beginPath();
				cxt.moveTo(p.position.x,p.position.y);
				cxt.lineTo(mousepoint.x,mousepoint.y);
				cxt.strokeStyle=colorstrb+(config.distanceofMouse-d)/config.distanceofMouse+")";
				cxt.stroke();
				cxt.closePath();
			}
		}
	
		setTimeout(function(){
			if(drawing)draw();
		},1000/config.FPS);
	};
	function update(){
		
		for(var i=0;i<pointslist.length;i++){
			var p=pointslist[i];
			
			var x2=(p.position.x-mousepoint.x)*(p.position.x-mousepoint.x);
			var y2=(p.position.y-mousepoint.y)*(p.position.y-mousepoint.y);
			var d=x2+y2;
			d=Math.sqrt(d);
			if(d<config.distanceofMouse){
				var bi=(config.distanceofMouse-d)/config.distanceofMouse;
				var addspeed=config.speedaccelerate*config.maxSpeed*bi*bi/config.UPS;
				p.speed.x+=addspeed/d*(mousepoint.x-p.position.x);
				p.speed.y+=addspeed/d*(mousepoint.y-p.position.y);
			}
		}
		
		pointslist.update();
		
		setTimeout(function(){
			if(drawing)update();
		},1000/config.UPS);
	}
	//每个点的构建函数
	var point=function(_position){
		this.size=config.pointSize;
		this.position=_position;
		this.speed={x:(Math.random()*config.maxSpeed*2-config.maxSpeed)/config.UPS,
		y:(Math.random()*config.maxSpeed*2-config.maxSpeed)/config.UPS}
		this.update=function(){
			var upsspeed=config.maxSpeed/config.UPS;
			this.position.x+=this.speed.x;
			if(this.position.x>=canva.width||this.position.x<0){
				if(this.position.x>=canva.width){
					this.position.x=canva.width-1;
				}else{
					this.position.x=0;
				}
				this.speed.x=-this.speed.x;
				if(Math.abs(this.speed.x)>upsspeed||Math.abs(this.speed.x)>upsspeed){
					this.speed.x*=config.speedSlowdown;
					this.speed.x*=config.speedSlowdown;
				}
			}
			this.position.y+=this.speed.y;
			if(this.position.y>=canva.height||this.position.y<0){
				if(this.position.y>=canva.height){
					this.position.y=canva.height-1;
				}else{
					this.position.y=0;
				}
				this.speed.y=-this.speed.y;
				if(Math.abs(this.speed.y)>upsspeed||Math.abs(this.speed.y)>upsspeed){
					this.speed.x*=config.speedSlowdown;
					this.speed.y*=config.speedSlowdown;
				}
			}
		}
	}
	
	
	return {
		init:init,
		start:start,
		stop:stop,
		setConfig:setConfig
	}
}