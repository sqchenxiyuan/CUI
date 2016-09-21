var Modle={};
var View={};
var Control={};



var testModle={
	data:"",
	setData:function(data){
		this.data=data;
		this.dataChange();
	},
	getData:function(data){
		return this.data;
	},
	dataChange:function(){
		testView.update();
	}
}

var testView={
	init:function(){
		document.getElementById("test").addEventListener('keyup',this.onchange);
		document.getElementById("test").addEventListener('keydown',this.onchange);
		document.getElementById("test").addEventListener('keyup',function(){
			console.log(234);
		})
	},
	onchange:function(){
		testControl.putdata(document.getElementById("test").value);
	},
	update:function(){
		var ps=document.getElementsByClassName('test');
		for(var i=0;ps[i];i++){
			ps[i].innerHTML=testModle.getData();
		}
	}
};

var testControl={
	init:function(){
		testView.init();
	},
	putdata:function(data){
		testModle.setData(data);
	}
}

testView.init();