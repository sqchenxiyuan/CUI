var wsc=new WsCilent('ws://125.67.172.200:3000/');

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
  wsc.send("",{
      msg:msg,
      date:new Date().getTime()
  });

  var p=document.createElement('p');
  p.innerHTML=msg;
  p.className="messageBox-my";
  document.getElementById('messageBox').appendChild(p);
}
