var path=require('path');
var http=require('http');
var express=require('express');

var app=express();
app.use(express.static(path.join(__dirname, './public')));

var server=app.listen(3000,()=>{
  console.log('服务器启动');
});
