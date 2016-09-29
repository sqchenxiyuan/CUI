var baidu=require('./spiders/spider_baidu');
var sogo=require('./spiders/spider_sogo');
var s360=require('./spiders/spider_360');
var bing=require('./spiders/spider_bing');
var yahoo=require('./spiders/spider_yahoo');

var searchT=[
// "英雄联盟官网",
// "西南科技大学教务处",
// "坦克世界官网",
// "阴阳师官网",
// "战舰世界官网",
// "知乎官网",
// "百度搜索",
// "360搜索",
// "必应搜索",
// "蚂蚁BT",
// "女孩在寝室自缢",
// "陕西现冥界之花",
// "安倍专机撞鸟",
// "马化腾",
// "JS模块化开发",
// "诺贝尔奖",
// "报假火警1288次",
// "神十一载万封信",
// "河中洗澡现僵尸鱼",
// "日本选最正女学生",
//"陆毅",
// "金坷垃",
// "灵能百分百",
// "大主宰",
// "微微一笑很倾城",
// "webpack",
// "vue.js",
// "斗鱼",
// "熊猫",
// "起亚K5",
// "前后端分离",
// "前端框架",
// "马云",
// "英雄联盟的公测时间",
// "QQ的前身",
// "英雄联盟下载",
// "坦克世界下载",
// "战舰世界下载",
// "战机世界下载",
// "亮剑在线观看",
// "QQ下载",
// "QQ音乐下载",
// "陌陌下载",
// "BT搜索",
// "百度云破解版",
// "萝莉云下载",
// "迅雷破解版下载",
// "我的世界下载",
// "在线算命",
// "支付宝下载"
];

var l=0;

start();
function start(){
  if(l<searchT.length){
    ss(searchT[l],function(){
        setTimeout(function(){
          start();
        },1);
    });
  }
  l++;
}

function ss(searchT,callback){
  console.log("查找"+searchT+"中");
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
  var pooling={};
  function outData(){
    console.log("查询样例\t"+searchT);
    console.log("结果\t序号\t标题\tURL\t正确性\t来源:百度\t来源:搜狗\t来源:360\t来源:必应\t来源:雅虎");
    // for(var i=0;i<10;i++){
    //   console.log(
    //             "\t"+(i+1)+"\t"+baiduD[i].title+"\t"+baiduD[i].href+"\t\t"+
    //             (i+1)+"\t"+sogoD[i].title+"\t"+sogoD[i].href+"\t\t"+
    //             (i+1)+"\t"+s360D[i].title+"\t"+s360D[i].href+"\t\t"+
    //             (i+1)+"\t"+bingD[i].title+"\t"+bingD[i].href+"\t\t"+
    //             (i+1)+"\t"+yahooD[i].title+"\t"+yahooD[i].href+"\t\t");
    // }
    add(baiduD,"百度");
    add(sogoD,"搜狗");
    add(s360D,"360");
    add(bingD,"必应");
    add(yahooD,"雅虎");
    var x=1;
    for(var name in pooling){
      console.log("\t"+x+"\t"+pooling[name].title+"\t"+name+"\t\t"+
      pooling[name]["百度"]+"\t"+
      pooling[name]["搜狗"]+"\t"+
      pooling[name]["360"]+"\t"+
      pooling[name]["必应"]+"\t"+
      pooling[name]["雅虎"]+"\t");
      x++;
    }
    if(callback)callback();
  }

  function add(data,searchN){
    data.forEach(function(a,index){
      if(index>=10)return false;
      if(!pooling[a.href]){
        pooling[a.href]={
          title:a.title,
          "百度":"",
          "搜狗":"",
          "360":"",
          "必应":"",
          "雅虎":"",
        };
      }
      pooling[a.href][searchN]=index;
    });
  }
}


// bing.search("金坷垃",function(data){
//     data.forEach(function(a,index){
//       console.log(a.title+"\t"+a.href);
//       // if(index>10) return false;
//       // sogoD.push(a);
//     });
// });
