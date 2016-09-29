var request = require('request');


exports.search=function(wd,callback){
  console.log("==========baidu:请求中...");
  var out=[];
  search_page(wd,1,function(data){
    out=data;
    if(out.length<10){
      search_page(wd,2,function(data){
        data.forEach(function(a){
          out.push(a);
        });
        callback(out);
      });
    }else{
      callback(out);
    }
  });
};

function search_page(wd,page,callback){
  var out=[];
  var x=0;
  var total=0;
  request("http://www.baidu.com/s?wd="+encodeURI(wd)+"&pn="+((page-1)*10), function (error, response, body)
  {
    if (!error && response.statusCode == 200) {
        var h3s=body.match(/<h3[^>]*class="t( [^>]*)?"[^>]*>((.|\n)*?)<\/h3>/g);
        //console.log(h3s);
        h3s.forEach(function(a){
          //console.log(out.length+1);
          //var h3=a.match(/<h3[^>]*>((.|\n)*?)<\/h3>/g)[0];
          var title=a.match(/<a[^>]*>((.|\n)*?)<\/a>/g)[0].replace(/<a[^>]*>/,"").match(/^((.|\n)*)(?=(<\/a))/g)[0].replace(/(<em>|<\/em>|<font[^>]*>|<\/font>|\n)/g,"");
          var linkherf=a.match(/href( )*=( )*"http:\/\/www\.baidu\.com\/[^"]*"/g)[0].match(/http(.)*(?=")/)[0];
          var data={};
          data.rank=out.length+1;
          data.title=title;
          data.linkherf=linkherf;
          out.push(data);
        });
        total=out.length;
        out.forEach(function(a,index){
          request(a.linkherf, function (error, response, body)
          {
            if (!error && response.statusCode == 200) {
                var href=response.request.uri.href;
                a.href=href;
            }else{
              a.href=a.linkherf;
            }
            over();
          });
        });
    }else{
      a.href=a.linkherf;
    }
  });

  function over(){
    x++;
    if(x==total){
      callback(out);
    }
  }
}
