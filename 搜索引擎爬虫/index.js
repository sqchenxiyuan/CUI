var baidu=require('./spiders/spider_baidu');
var sogo=require('./spiders/spider_sogo');

// baidu.search("医院",function(data){
//   data.forEach(function(a){
//     //console.log(a.rank);
//     console.log(a.title);
//     console.log(a.href);
//   });
// });
sogo.search("医院",function(data){
  data.forEach(function(a){
    //console.log(a.rank);
    console.log(a.title);
    console.log(a.href);
  });
});
