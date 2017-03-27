var path=require('path');
var http=require('http');
var express=require('express');
var ws=require('ws');

var app=express();
app.use(express.static(path.join(__dirname, './public')));

var server=app.listen(3000,()=>{
  console.log('服务器启动');
});

var io=new ws.Server({server});

var linkarr=[];

io.on('connection',function(client){
  join(client);

  client.on('message',function(data){
    sendData(client,JSON.parse(data));
  });
  client.on('close',function(data){
    leave(client);
  });

});

function join(client){

  linkarr.forEach((pepole)=>{
    pepole.send(JSON.stringify({
      type:"message-sys",
      data:{
          msg:"有新的成员加入！现在聊天室有 "+(linkarr.length+1)+" 个人",
          date:new Date().getTime()
      }
    }));
  });

  client.send(JSON.stringify({
    type:"message-sys",
    data:{
        msg:"欢迎加入！现在聊天室有 "+(linkarr.length+1)+" 个人",
        date:new Date().getTime()
    }
  }));

  linkarr.push(client);
}

function leave(client){

  var index=linkarr.indexOf(client);
  linkarr.splice(index,1);

  linkarr.forEach((pepole)=>{
    pepole.send(JSON.stringify({
      type:"message-sys",
      data:{
          msg:"有一位成员离开！现在聊天室有 "+(linkarr.length)+" 个人",
          date:new Date().getTime()
      }
    }));
  });
}

function sendData(client,data){

  linkarr.forEach((pepole)=>{
    if(pepole===client)return;
    pepole.send(JSON.stringify({
      type:"message-other",
      data:{
          msg:data.data.msg,
          date:data.data.date
      }
    }));
  });

}
