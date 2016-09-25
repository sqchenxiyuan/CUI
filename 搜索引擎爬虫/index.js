var baidu=require('./spider_baidu');

baidu.search("医院",function(data){
  data.forEach(function(a){
    console.log(a.title);
    console.log(a.href);
  });
});
