/*
陈曦源
2016-9-25
百度搜索爬虫
*/
var http=require("http");
var querystring=require("querystring");
var request = require('request');


exports.search=function(wd,callback){
  console.log("请求中...")
  var out=[];
  var x=0;
  var total=0;
  http.get({
    host:"www.baidu.com",
    path:"/s?wd="+encodeURI(wd)+"&pn=0"
  },function(res){
    var body="";
    res.setEncoding('utf8');
    res.on('data',function(chunk){
      body+=chunk;
    });
    res.on('end',function(){
      var divs=body.match(/<div[^>]*( )*id="[0-9]{1,3}"[^>]*>((.|\n)*?)<\/div>/g);
      total=divs.length;
      divs.forEach(function(a){
        var id=a.match(/ id="[0-9]*"/g)[0].match(/[0-9]+/g)[0];
        a=a.match(/<h3[^>]*>((.|\n)*?)<\/h3>/g)[0];
        var title=a.match(/<a[^>]*>((.|\n)*?)<\/a>/g)[0].replace(/<a[^>]*>/,"").match(/^((.|\n)*)(?=(<\/a))/g)[0].replace(/<em>/g,"").replace(/<\/em>/g,"");
        var linkherf=a.match(/href( )*=( )*"http:\/\/www\.baidu\.com\/link?[^"]*"/g)[0].match(/http(.)*(?=")/)[0];
        var data={};
        data.id=id;
        data.title=title;
        data.linkherf=linkherf;
        out.push(data);
      });
      out.forEach(function(a){
        request(a.linkherf, function (error, response, body)
        {
          if (!error && response.statusCode == 200) {
              var href=response.request.uri.href;
              a.href=href;
              over();
          }
        });
      });
    });
  });


  function over(){
    x++;
    if(x==total){
      callback(out);
    }
  }

};

// var aa="aaaa>>bbbb";
// console.log(aa.match(/(?!=>>)b+/g));
