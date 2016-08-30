window.onload=function(){
	resizeCanvas();
	signaturePad.clear();
	select_normalbtn();
	select_blackbtn();
}

var canvas=document.getElementById('signature-board-canvas');
var signaturePad = new SignaturePad(canvas,{
	backgroundColor:"rgb(242,242,242)"
});

var lightbtn=document.getElementById('btn-light');
var normalbtn=document.getElementById('btn-normal');
var boldbtn=document.getElementById('btn-bold');
var blackbtn=document.getElementById('btn-black');
var bluebtn=document.getElementById('btn-blue');
var redbtn=document.getElementById('btn-red');
var clearbtn=document.getElementById('btn-clear');
var completebtn=document.getElementById('btn-complete');


function resizeCanvas() {
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    signaturePad.clear();
}
window.onresize=resizeCanvas;

lightbtn.addEventListener('click',select_lightbtn);
normalbtn.addEventListener('click',select_normalbtn);
boldbtn.addEventListener('click',select_boldbtn);

blackbtn.addEventListener('click',select_blackbtn);
bluebtn.addEventListener('click',select_bluebtn);
redbtn.addEventListener('click',select_redbtn);


clearbtn.addEventListener('click',function(){
	signaturePad.clear();
});

completebtn.addEventListener('click',function(){
	var data=signaturePad.toDataURL();
	var base64=data.split(',')[1];
	alert(base64);
});

function resetThicknessbtnimg(){
	lightbtn.className="btn-light";
	normalbtn.className="btn-normal";
	boldbtn.className="btn-bold";
}
function select_lightbtn(){
	resetThicknessbtnimg();
	signaturePad.minWidth=0.5*0.7;
	signaturePad.maxWidth=2.5*0.7;
	lightbtn.className="btn-light-select";
}
function select_normalbtn(){
	resetThicknessbtnimg();
	signaturePad.minWidth=0.5;
	signaturePad.maxWidth=2.5;
	normalbtn.className="btn-normal-select";
}
function select_boldbtn(){
	resetThicknessbtnimg();
	signaturePad.minWidth=0.5/0.7;
	signaturePad.maxWidth=2.5/0.7;
	boldbtn.className="btn-bold-select";
}



function resetcolorbtnimg(){
	blackbtn.className="btn-black";
	bluebtn.className="btn-blue";
	redbtn.className="btn-red";
}
function select_blackbtn(){
	resetcolorbtnimg();
	signaturePad.penColor="black";
	blackbtn.className="btn-black-select";
}
function select_bluebtn(){
	resetcolorbtnimg();
	signaturePad.penColor="blue";
	bluebtn.className="btn-blue-select";
}
function select_redbtn(){
	resetcolorbtnimg();
	signaturePad.penColor="red";
	redbtn.className="btn-red-select";
}