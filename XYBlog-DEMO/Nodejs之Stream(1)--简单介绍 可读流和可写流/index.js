let fs=require('fs');
let path=require('path');
let zlib = require('zlib');
let length=0;

// let fileReadStream=fs.createReadStream(path.resolve(__dirname,'./test-out.txt'),{
//     // encoding:'utf-8'
// })

// fileReadStream.on('data',function(data){
//     length+=data.length;
// })
//
// fileReadStream.on('end',function(){
//     fileReadStream.read('./test.txt');
//     console.log('没有更多的数据啦!');
//
//     console.log(length);
// })
//
// fileReadStream.on('close',function(){
//     console.log('文件读取完毕！');
// })

let fileReadStream=fs.createReadStream(path.resolve(__dirname,'./test.txt'));
let gzip = zlib.createGzip();
let fileWriteStream=fs.createWriteStream(path.resolve(__dirname,'./test-out.txt'));

fileReadStream.pipe(gzip).pipe(fileWriteStream,{ end: false });

gzip.on('end',function(){
    fileWriteStream.end('这是被压缩的输出数据！')
});
