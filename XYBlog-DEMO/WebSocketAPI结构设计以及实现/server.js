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

class WsServer{

    constructor(){
        this.connectFoo=[];
        this.closeFoo=[];
        this.registMap={};
        this.registvhttpMap={};

        let ws=new require('ws').Server.apply(this,arguments);
        this.ws=ws;

        ws.on('connection',function(client){

          this.connectFoo.forEach(foo => foo(client))

          client.on('message',function(data){
              data=JSON.parse(data);
              if(data.key!==undefined&&this.registvhttpMap[data.type]){
                  this.registvhttpMap[data.type].call(new WsReq(data),data.data);
              }else if(this.registMap[data.type]){
                  this.registMap[data.type].forEach(foo => foo.call(new WsReq(data),data));
              }
          });

          client.on('close',function(data){
            this.closeFoo.forEach(foo => foo(client))
          });



        });
    }

    connect(foo){
        this.connectFoo.push(foo);
    }

    close(foo){
        this.closeFoo.push(foo);
    }

    regist(type,foo){
        if(!this.registMap[type])this.registMap[type]=[];
        if(this.registMap[type].indexOf(foo))this.registMap[type].push(foo);
    }

    registvhttp(type,foo){
        this.registvhttpMap[type]=foo;
    }
}

class WsReq{

    constructor(data){
        this.reqdata=data;
    }

    send(type,data){
        data=JSON.stringify({
            type,
            data
        });
        if(this.reqdata.key!==undefined)data.key=this.reqdata.key;

        try{
            client.send()
        }catch(e){
            console.error(e)
        }

    }
}
