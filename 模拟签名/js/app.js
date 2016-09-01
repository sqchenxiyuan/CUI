//设置提交按钮的点击事件
var updatebtn=document.getElementById('btn-update');

updatebtn.addEventListener('click',function(){
	var signature_pads=content.signature_pads;
	var out=[];
	for(l=0;signature_pads[l];l++){
		if(signature_pads[l].writed){
			var signature_img=signature_pads[l];
			
			var ulX=signature_img.ulX;
			var ulY=signature_img.ulY;
			
			var img=signature_img.element;
			var w=img.offsetWidth;
			var h=img.offsetHeight;
			
			var lrX=ulX+w;
			var lrY=ulY+h;
			
			var page=signature_img.element.parentElement.attributes['data-page'].nodeValue;
			var sealData=signature_img.sealData;
			
			var signature={
				lrX:lrX,
				lrY:lrY,
				ulX:ulX,
				ulY:ulY,
				page:page,
				sealData:sealData
			};
			out.push(signature);
		}
	}
	console.log(out);
	alert(JSON.stringify(out));
});


//拖拽功能封装(不可跨越父级节点)
var addDragFun=function(element,dragsize){
	var mousedown=false;
	var size=dragsize||0;
	var startX=0;
	var startY=0;
	element.addEventListener('mousedown',startdrag);
	element.addEventListener('mousemove',draging);
	element.addEventListener('mouseup',dragend);
	function startdrag(e){
		var w=element.offsetWidth;
		var h=element.offsetHeight;
		var offsetX=e.offsetX;
		var offsetY=e.offsetY;
		if(offsetX>w*size&&offsetX<w-w*size
			&&offsetY>h*size&&offsetY<h-h*size){
			mousedown=true;
			startX=e.clientX-element.offsetLeft;
			startY=e.clientY-element.offsetTop;
		}
	}
	function draging(e){
		if(mousedown){
			e=e||window.event;
			var newLeft=e.clientX-startX;
			var newTop=e.clientY-startY;
			var w=element.offsetWidth;
			var h=element.offsetHeight;
			if(newLeft<0) newLeft=0;
			if(newTop<0) newTop=0;
			var parentE=element.parentElement||document.body;
			if(newLeft>parentE.offsetWidth-w) newLeft=parentE.offsetWidth-w;
			if(newTop>parentE.offsetHeight-h) newTop=parentE.offsetHeight-h;
			element.style.left=newLeft+"px";
			element.style.top=newTop+"px";
		}
	}
	function dragend(e){
		if(mousedown){
			mousedown=false;
		}
	}
}

//每个工具栏类，附带拖拽功能(可跨越父级节点)
var Tool=function(element){
	this.element=element;

	this.element.addEventListener('mousedown',this._mousedown(this));
	this.element.addEventListener('mousemove',this._mousemove(this));
	this.element.addEventListener('mouseup',this._mouseup(this));
}

Tool.prototype={
	_state:{
		startclientX:0,
		startclientY:0,
		startoffsetX:0,
		startoffsetY:0,
		mousedown:false,
		draging:false,
	},
	_mousedown:function(that){
		return function(e){
			that._state.mousedown=true;
			
			e=e||window.event;
			
			that._state.startclientX=e.clientX;
			that._state.startclientY=e.clientY;
			that._state.startoffsetX=e.offsetX;
			that._state.startoffsetY=e.offsetY;
		}
	},
	_mousemove:function(that){
		return function(e){
			if(that._state.mousedown){
				if(!that._state.mousemove){
					that._state.mousemove=true;
					that.dragstart(e);
				}
				e=e||window.event;
				var moveclientX=e.clientX-that._state.startclientX;
				var moveclientY=e.clientY-that._state.startclientY;
				that.element.style.transform='translate('+moveclientX+'px,'+moveclientY+'px)';
				that.draging(e);
			}
		}
	},
	_mouseup:function(that){
		return function(e){
			if(that._state.mousedown){
				that._state.mousedown=false;
				that._state.mousemove=false;
				that.element.style.transform='translate(0px,0px)';
				that.dragend(e);
			}
		}
	},
	dragend:function(e){
		//console.debug('write your own function when drageend!');
	},
	draging:function(e){
		//console.debug('write your own function when draging!');
	},
	dragstart:function(e){
		//console.debug('write your own function when dragstart!');
	}
}


//创建签名板工具
var tool_signature=new Tool(document.getElementById('tool-signature'));
tool_signature.dragend=function(e){
	var that=this;
	var msg={};
	msg.code=CODES.DRAGEND;
	msg.event=e;
	msg.startoffset={
		x:that._state.startoffsetX,
		y:that._state.startoffsetY
	}
	content.getmsg(msg);
}
tool_signature.dragstart=function(e){
	var msg={};
	msg.code=CODES.DRAGSTART;
	content.getmsg(msg);
}



//全局变量，代表拖拽的状态
var CODES={
	DRAGING:1,
	DRAGEND:2,
}


//文章面板
var content={
	elements:null,
	overing:false,
	dragendmsg:null,
	signature_pads:[],
};

content.elements=document.getElementsByClassName('content');
content.getmsg=function(msg){
	switch(msg.code){
		case CODES.DRAGSTART:{
			for(var l=0;content.elements[l];l++){
				content.elements[l].style.border="1px solid red";
			}
		};break;
		case CODES.DRAGEND:{
			var e=msg.event;
			for(var l=0;content.elements[l];l++){
				content.elements[l].style.border="";
				
				var pos=getPoint(content.elements[l]);
				var w=content.elements[l].offsetWidth;
				var h=content.elements[l].offsetHeight;
				//console.log(e.pageX,pos.x);
				//console.log(e.pageY,pos.y);
				if(e.pageX>pos.x&&e.pageX<pos.x+w
				&&e.pageY>pos.y&&e.pageY<pos.y+h){
					var offsetX=e.pageX-pos.x;
					var offsetY=e.pageY-pos.y;
					console.log(offsetX,offsetY);
					
					var startoffset=msg.startoffset;
	
					var ulX=offsetX-startoffset.x;
					var ulY=offsetY-startoffset.y;
					if(ulX<10) ulX=10;
					if(ulY<10) ulY=10;
					
					
					if(ulX>w-110) ulX=w-110;
					if(ulY>h-110) ulY=h-110;
					
					var newpad=new signature_pad();
					content.signature_pads.push(newpad);
					newpad.init(ulX,ulY);
					content.elements[l].appendChild(newpad.element);
				}
				
			}
			
			//console.log(pages);
			var e=msg.event;
			var pos=getPoint(e)
			//console.log(e.pageX-getPoint(content.elements[0]).x);
			//console.log(e.pageY-getPoint(content.elements[0]).y);
			
		};break;
	}
};
//获取坐标点
function getPoint(e) {
    var x = e.offsetLeft;
    var y = e.offsetTop;
    while (e = e.offsetParent) {
        x += e.offsetLeft; 
        y += e.offsetTop;
    }
    return {
    	x:x,
    	y:y
    };
}


//每个小签名板类
var signature_pad=function(){
	this.ulX=0;
	this.ulY=0;
	this.sealData=null;
	this.element=null;
	this.writed=false;
	
	this.init=function(ulX,ulY){
		this.ulX=ulX;
		this.ulY=ulY;
		this._creat();
		addDragFun(this.element,0.1);
	}
	this.toImg=function(){
		var w=this.element.firstChild.offsetWidth;
		var h=this.element.firstChild.offsetHeight;
		var left=this.element.style.left;
		var top=this.element.style.top;
		var parentE=this.element.parentElement;
		parentE.removeChild(this.element);
		
		
		var img=document.createElement('img');
		img.src=this.sealData;
		img.height=h;
		img.width=w;
		img.style.left=left;
		img.style.top=top;
		img.draggable=false;
		addDragFun(img);
		
		parentE.appendChild(img);
		this.element=img;
		this.writed=true;
	}
}

signature_pad.prototype={
	_creat:function(){
		var that=this;
		var div=document.createElement('div');
		div.className="signature-pad";
		div.style.left=this.ulX+'px';
		div.style.top=this.ulY+'px';
		
		var textarea=document.createElement('textarea');
		textarea.className='pad';
		textarea.innerHTML='双击签名';
		textarea.readOnly=true;
		textarea.addEventListener('dblclick',function(e){
			signature.write(that);
		});
		
		
		var button=document.createElement('button');
		button.className='delete-pad';
		button.addEventListener('click',function(){
			button.parentNode.parentNode.removeChild(button.parentNode);
		});
		
		div.appendChild(textarea);
		div.appendChild(button);
		this.element=div;
	}
}