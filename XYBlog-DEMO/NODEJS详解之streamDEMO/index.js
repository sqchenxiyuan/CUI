let fs=require('fs');
let path=require('path');
let length=0;

let fileReadStream=fs.createReadStream(path.resolve(__dirname,'./test-out.txt'),{
    // encoding:'utf-8'
})

fileReadStream.on('data',function(data){
    length+=data.length;
})

fileReadStream.on('end',function(){
    fileReadStream.read('./test.txt');
    console.log('没有更多的数据啦!');

    console.log(length);
    let fileWriteStream=fs.createWriteStream(path.resolve(__dirname,'./test-out.txt'),{
    start:length+1,
    flags:'r+',
    defaultEncoding :'utf-8'
    })

    fileWriteStream.write('123123！');

})

fileReadStream.on('close',function(){
    console.log('文件读取完毕！');
})
