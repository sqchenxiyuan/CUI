/*
 * 插件名:Autograph(签名)
 * 作者:SQchenxiyuan
 * 版本:1.0
 * 简介:将一个画布canvas实现签名功能
 * 传入参数:  a:画布的引用
 * 获取参数:操作函数(自行绑定到对应功能按钮上)
 */
var Autograph=function(a){
	
	//绘画路径存储
	var strokes=[];
	
	//画布对象引用
	var board=a;
	
	//context获取
	var context=board.getContext('2d');
	
	//是否在绘画
	var drawing=false;
	
	//总绘画数
	var storkenum=0;
	
	//绘画点数
	var drawnum=0;
	
	
	//初始化设置
	board.style.cursor='crosshair';
	board.style.cursor='crosshair';
	context.fillStyle="antiquewhite";
	context.strokeStyle='#010';
	context.lineWidth=2;
	context.lineCap='round';
	context.fillRect(0,0,500,500);
	
	var mousedown=function (e){
		drawing=true;
		strokes[storkenum]=[];
		strokes[storkenum][drawnum]={x:e.offsetX,y:e.offsetY};
		drawnum++;
		updatedraw();
	};
	var mousemove=function(e){
		if(drawing){
			strokes[storkenum][drawnum]={x:e.offsetX,y:e.offsetY};
			drawnum++;
			updatedraw();
		}
	};
	var mouseup=function(e){
		//updatedraw();
		drawing=false;
		storkenum++;
		drawnum=0;
	};
	var updatedraw=function(){
		context.fillStyle="antiquewhite";
		context.fillRect(0,0,500,500);
		var l=strokes.length;
		
		for(var i=0;i<l;i++){
			
			var stroke=strokes[i];
			var l2=stroke.length;
			context.beginPath();
			context.moveTo(stroke[0].x,stroke[0].y);
			for(var j=1;j<l2;j++){
				context.lineTo(stroke[j].x,stroke[j].y);
			}
			context.stroke();
			context.closePath();
		}
		
		for(var i=0;i<l;i++){
			
			var stroke=strokes[i];
			var l2=stroke.length;
			context.beginPath();
			context.moveTo(stroke[0].x+1,stroke[0].y-1);
			for(var j=1;j<l2;j++){
				context.lineTo(stroke[j].x+1,stroke[j].y-1);
			}
			context.stroke();
			context.closePath();
		}
		
		for(var i=0;i<l;i++){
			context.fillStyle="#000000";
			var stroke=strokes[i];
			var l2=stroke.length;
			drawpoint(stroke[0].x,stroke[0].y);
			drawpoint(stroke[0].x+1,stroke[0].y-1);
			for(var j=1;j<l2;j++){
				drawpoint(stroke[j].x,stroke[j].y);
				drawpoint(stroke[j].x+1,stroke[j].y-1);
			}
		}
		
		
		
	};
	var drawpoint=function(a,b){
		context.beginPath();
		context.arc(a,b,1,0,Math.PI*2,true);
		context.closePath();
		context.fill();
	};

	var revoke=function(){
			strokes.pop();
			storkenum=strokes.length;
			updatedraw();
			console.log(123);
	};
	
	board.addEventListener('mousedown',mousedown);
	board.addEventListener('mousemove',mousemove);
	board.addEventListener('mouseup',mouseup);
	
	return {
		revoke:revoke
	}
}
			
			
			
			
			
			