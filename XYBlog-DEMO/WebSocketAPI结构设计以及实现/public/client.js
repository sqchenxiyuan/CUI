//接口方法
//connect   建立连接,默认会建立，除非没有path
//listen    监听满足需求的API  默认不监听指定请求
//post      推送消息
//postonce  传递特定的消息，伴随标记的消息，服务器返回相同标记的信息，只执行一次
//


;(function(){

    function WsCilent(path){
        this.listenMap={};
        this.keyMap=[];
        this.dataList=[];

        this.ws=null;
        this.path=path;
        if(this.path)this.connect();
    }

    WsCilent.prototype.connect=function(path = this.path){
        if(!window.WebSocket)return false;
        if(this.ws&&this.ws.readyState<=1&&(this.path===path||!path))return;
        this.path=path;

        let listenMap=this.listenMap;
        let keyMap=this.keyMap;
        let dataList=this.dataList;

        this.ws=new WebSocket(path);
        this.ws.addEventListener('open',event => {

            this.ws.addEventListener('message',event => {
                let data=event.data;

                try{
                    data=JSON.parse(data);
                }catch(e){
                    console.info(e);
                    data=event.data;
                }

                if(data.key&&keyMap[data.key]){
                    let foo=keyMap[data.key];
                    keyMap[data.key]=undefined;

                    if(typeof foo === 'function')foo(null,data.data);
                    return ;
                }

                if(listenMap[data.type]){
                    listenMap[data.type].forEach((foo)=>{
                        if(typeof foo === 'function')foo(null,data.data);
                    });
                }
            });

            this.ws.addEventListener('close',event => {
                for(let key in keyMap){
                    if(typeof keyMap[key] === 'function')keyMap[key](event);
                }
                keyMap={};

                listenMap.forEach((foolist)=>{
                    foolist.forEach((foo)=>{
                        if(typeof foo === 'function')foo(event);
                    })
                });
            });

            dataList.forEach((data)=>{
              ws.send(data);
            });
            dataList=[];

        });

        this.ws.addEventListener('error',event => {

            for(let key in keyMap){
                if(typeof keyMap[key] === 'function')keyMap[key](event);
            }
            keyMap={};

            listenMap.forEach((foolist)=>{
                foolist.forEach((foo)=>{
                    if(typeof foo === 'function')foo(event);
                })
            });

            this.ws=null;
            window.alert('WebSocket连接出错');
        });

    }

    WsCilent.prototype.listen=function(type,fun){
        let listenMap=this.listenMap;

        if(!listenMap[type])listenMap[type]=[];
        listenMap[type].push(fun);

        return {
          remove(type,fun){
              return this.remove(type,fun);
          }
        };
    }

    WsCilent.prototype.post=function(type,data){
        let ws=this.ws;
        let dataList=this.dataList;

        data=JSON.stringify({
            type,
            data
        });

        if(!ws||ws.readyState>1){//已关闭
            connectWebSocket();
            dataList.push(data)
        }else{
            ws.send(data);
        }
    }

    WsCilent.prototype.postonce=function(type,data){
        let ws=this.ws;
        let dataList=this.dataList;
        let keyMap=this.keyMap;

        let key=Math.random()*1000000000;
        data=JSON.stringify({
            type,
            data,
            key
        });

        if(!ws||ws.readyState>1){//已关闭
            connectWebSocket();
            dataList.push(data)
        }else{
            ws.send(data);
        }

        keyMap[key]=callback;
    }

    WsCilent.prototype.remove=function(type,fun){
        let listenMap=this.listenMap;

        if(!listenMap[type])return true;
        for(let i=0;i<listenMap[type].length;i++){
          if(listenMap[type][i] === fun){
              listenMap[type].splice(i,1);
          }
        }
        return true;
    }

    window.WsCilent=WsCilent;
}());
