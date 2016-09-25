var baidu=require('./spiders/spider_baidu');
var sogo=require('./spiders/spider_sogo');
var s360=require('./spiders/spider_360');
var bing=require('./spiders/spider_bing');
var yahoo=require('./spiders/spider_yahoo');

// baidu.search("医院",function(data){
//   data.forEach(function(a){
//     //console.log(a.rank);
//     console.log(a.title);
//     console.log(a.href);
//   });
// });

// sogo.search("医院",function(data){
//   data.forEach(function(a){
//     console.log(a.rank);
//     console.log(a.title);
//     console.log(a.href);
//   });
// });

// s360.search("医院",function(data){
//   data.forEach(function(a){
//     //console.log(a.rank);
//     console.log(a.title);
//     console.log(a.href);
//   });
// });

// bing.search("医院",function(data){
//   data.forEach(function(a){
//     console.log(a.rank);
//     console.log(a.title);
//     console.log(a.href);
//   });
// });

yahoo.search("医院",function(data){
  data.forEach(function(a){
    console.log(a.rank);
    console.log(a.title);
    console.log(a.href);
  });
});
