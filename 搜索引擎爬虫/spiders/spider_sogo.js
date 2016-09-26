var request = require('request');




exports.search=function(wd,callback){
  console.log("==========sogo:请求中...");
  var out=[];
  request("http://www.sogou.com/web?query="+encodeURI(wd)+"&page=1", function (error, response, body)
  {
    if (!error && response.statusCode == 200) {
        var as=body.match(/<h3[^>]* class="(pt|vrTitle|vrt)"[^>]*>((.|\n)*?)<a[^>]* target="_blank"[^>]*>((.|\n)*?)<\/a>((.|\n)*?)<\/h3>/g);
        //console.log(as);
        as.forEach(function(a,index){
          var id=index+1;
          var title=a.match(/<a[^>]*>((.|\n)*?)<\/a>/g)[0].replace(/(<a[^>]*>|<\/a>|<em>|<\/em>|(<!--(.|\n)*?)-->|\t|\n)/g,"");
          var href=a.match(/href="((.|\n)*?)"/)[0].replace(/href="|"$/g,"");
          // console.log(index+1);
          // console.log(a.match(/href="((.|\n)*?)(?=")/)[0].replace(/href="/g,""));
          // console.log(a.match(/<a[^>]*>((.|\n)*?)<\/a>/g)[0].replace(/(<a[^>]*>|<\/a>|<em>|<\/em>|(<!--(.|\n)*?)-->)/g,""));
          var data={
            rank:id,
            title:title,
            href:href
          };
          out.push(data);
        });
        request("http://www.sogou.com/web?query="+encodeURI(wd)+"&page=2", function (error, response, body)
        {
          if (!error && response.statusCode == 200) {
              var as=body.match(/<h3[^>]* class="(pt|vrTitle|vrt)"[^>]*>((.|\n)*?)<a[^>]* target="_blank"[^>]*>((.|\n)*?)<\/a>((.|\n)*?)<\/h3>/g);
              //console.log(as);
              as.forEach(function(a,index){
                var id=index+1;
                var title=a.match(/<a[^>]*>((.|\n)*?)<\/a>/g)[0].replace(/(<a[^>]*>|<\/a>|<em>|<\/em>|(<!--(.|\n)*?)-->)/g,"");
                var href=a.match(/href="((.|\n)*?)(?=")/)[0].replace(/href="/g,"");
                // console.log(index+1);
                // console.log(a.match(/href="((.|\n)*?)(?=")/)[0].replace(/href="/g,""));
                // console.log(a.match(/<a[^>]*>((.|\n)*?)<\/a>/g)[0].replace(/(<a[^>]*>|<\/a>|<em>|<\/em>|(<!--(.|\n)*?)-->)/g,""));
                var data={
                  rank:id,
                  title:title,
                  href:href
                };
                out.push(data);
              });
              callback(out);
          }
        });
    }
});
};
