var wsc=new WsCilent('ws://127.0.0.1:3000/');

wsc.listen('message-sys',function(err,data){
    if(err)console.error(err);
    var p=document.createElement('p');
    p.innerHTML=data.msg;
    p.className="messageBox-sys";
    document.getElementById('messageBox').appendChild(p);
});

wsc.listen('message-other',function(err,data){
    if(err)console.error(err);
    var p=document.createElement('p');
    p.innerHTML=data.msg;
    p.className="messageBox-other";
    document.getElementById('messageBox').appendChild(p);
});


document.getElementById('btn-send').addEventListener('click',sendMessage);

function sendMessage(){
  var msg=document.getElementById('message').value;
  wsc.post("",{
      msg:msg,
      date:new Date().getTime()
  });

  var p=document.createElement('p');
  p.innerHTML=msg;
  p.className="messageBox-my";
  document.getElementById('messageBox').appendChild(p);
}
