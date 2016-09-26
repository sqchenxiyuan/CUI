var baidu=require('./spiders/spider_baidu');
var sogo=require('./spiders/spider_sogo');
var s360=require('./spiders/spider_360');
var bing=require('./spiders/spider_bing');
var yahoo=require('./spiders/spider_yahoo');

var searchT="bilibili解析";

var baiduD=[],
    sogoD=[],
    s360D=[],
    bingD=[],
    yahooD=[];

baidu.search(searchT,function(data){
  baiduD=data;
  sogo.search(searchT,function(data){
    sogoD=data;
    s360.search(searchT,function(data){
      s360D=data;
      bing.search(searchT,function(data){
        bingD=data;
        yahoo.search(searchT,function(data){
          yahooD=data;
          outData();
        });


      });
    });
  });
});

function outData(){
  for(var i=0;i<10;i++){
    console.log((i+1)+"\t"+baiduD[i].title+"\t"+baiduD[i].href+"\t\t"+
              (i+1)+"\t"+sogoD[i].title+"\t"+sogoD[i].href+"\t\t"+
            (i+1)+"\t"+s360D[i].title+"\t"+s360D[i].href+"\t\t"+
          (i+1)+"\t"+bingD[i].title+"\t"+bingD[i].href+"\t\t"+
        (i+1)+"\t"+yahooD[i].title+"\t"+yahooD[i].href+"\t\t");
  }
}


// baidu.search(searchT,function(data){
//     data.forEach(function(a,index){
//       console.log(a.title+"\t"+a.href);
//       // if(index>10) return false;
//       // sogoD.push(a);
//     });
// });
