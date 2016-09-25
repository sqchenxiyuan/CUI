var request = require('request');
exports.search=function(wd,callback){
  var out=[];
  request("http://cn.bing.com/search?q="+encodeURI("医院")+"&first=1", function (error, response, body)
  {
    if (!error && response.statusCode == 200) {
        //console.log(body);
        var as=body.match(/<ol[^>]* id="b_results"[^>]*>((.|\n)*?)<\/ol>/g)[0].match(/<li[^>]* class="b_(algo|ans)"[^>]*>((.|\n)*?)<\/li>/g);
        //console.log(as);
        as.forEach(function(a,index){
          //console.log(a.match(/<h2[^>]*>((.|\n)*?)<\/h2>/g)[0].search(/<a[^>]*>((.|\n)*?)<\/a>/g));
          if(a.match(/<h2[^>]*>((.|\n)*?)<\/h2>/g)[0].search(/<a[^>]*>((.|\n)*?)<\/a>/g)!=-1){
            //console.log(index+1);
            var htmla=a.match(/<h2[^>]*>((.|\n)*?)<\/h2>/g)[0].match(/<a[^>]*>((.|\n)*?)<\/a>/g)[0];
            var id=out.length+1;
            var title=htmla.replace(/(<a[^>]*>|<\/a>|<strong>|<\/strong>|(<!--(.|\n)*?)-->)/g,"");
            var href=htmla.match(/href="((.|\n)*?)(?=")/)[0].replace(/href="/g,"");
            //console.log(title);
            //console.log(href);
            var data={
              rank:id,
              title:title,
              href:href
            };
            out.push(data);
          }
        });
        callback(out);
    }
  });
};
