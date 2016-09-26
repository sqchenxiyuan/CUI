var request = require('request');


exports.search=function(wd,callback){
  console.log("==========yahoo:请求中...");
  var out=[];
  request("https://search.yahoo.com/search?p="+encodeURI(wd)+"&b=1&pz=10", function (error, response, body)
  {
    if (!error && response.statusCode == 200) {
        //console.log(body);
        var as=body.match(/<ol[^>]* class="mb-15 reg searchCenterMiddle"[^>]*>((.|\n)*?)<\/ol>/g)[0].match(/<li[^>]* id[^>]*>((.|\n)*?)<\/li>/g);
        //console.log(as);
        as.forEach(function(a,index){
          //console.log(a.match(/<h3[^>]*>((.|\n)*?)<\/h3>/g)[0].match(/<a[^>]*>((.|\n)*?)<\/a>/g)[0]);
          var htmla=a.match(/<h3[^>]*>((.|\n)*?)<\/h3>/g)[0].match(/<a[^>]*>((.|\n)*?)<\/a>/g)[0];
          var id=out.length+1;
          var title=htmla.replace(/(<a[^>]*>|<\/a>|<b>|<\/b>|(<!--(.|\n)*?)-->|\t)/g,"");
          var href=htmla.match(/href="((.|\n)*?)(?=")/)[0].replace(/href="/g,"");
          //console.log(title);
          //console.log(href);
          var data={
            rank:id,
            title:title,
            href:href
          };
          out.push(data);
          // }
        });
        callback(out);
    }
  });
};
