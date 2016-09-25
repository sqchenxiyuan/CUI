var request = require('request');

exports.search=function(wd,callback){
  console.log("请求中...");
  var out=[];
  request("https://www.so.com/s?q="+encodeURI("医院")+"&pn=1", function (error, response, body)
  {
    if (!error && response.statusCode == 200) {
      //console.log(body);
        var as=body.match(/<h3[^>]* class="(res-)?title( )?"[^>]*>( |\n)*<a[^>]*>((.|\n)*?)<\/a>((.|\n)*?)<\/h3>/g);
        console.log(as);
        as.forEach(function(a,index){
          //console.log(index+1);
          //console.log(a.match(/<a[^>]*>((.|\n)*?)<\/a>/g)[0].replace(/(<a[^>]*>|<\/a>|<em>|<\/em>|(<!--(.|\n)*?)-->)/g,""));
          //console.log(a.match(/<a[^>]*>((.|\n)*?)<\/a>/g)[0].match(/href="((.|\n)*?)(?=")/)[0].replace(/href="/g,""));
          var id=index+1;
          var title=a.match(/<a[^>]*>((.|\n)*?)<\/a>/g)[0].replace(/(<a[^>]*>|<\/a>|<em>|<\/em>|(<!--(.|\n)*?)-->)/g,"");
          var linkhref=a.match(/<a[^>]*>((.|\n)*?)<\/a>/g)[0].match(/href="((.|\n)*?)(?=")/)[0].replace(/href="/g,"");
          //console.log(decodeURIComponent(linkhref.split("url=")[1].split("&")[0]));
          var href=decodeURIComponent(linkhref.split("url=")[1].split("&")[0]);
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
};
