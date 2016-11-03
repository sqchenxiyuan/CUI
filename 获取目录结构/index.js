var fs=require('fs');
var dir={};
readDir("G:/git/cloudsign-wesign/src/main/resources/static",dir,function(){
  outStr(dir,0);
});



function outStr(x,l){
  var str='';
  for(var i=0;i<l;i++){
    str+='  ';
  }
  for(var name in x){
    if(x[name]!==true){
      console.log(str+"+ /"+name);
      outStr(x[name],l+1);
    }
  }
  for(name in x){
    if(x[name]===true){
      console.log(str+"+ -"+name);
    }
  }
}


function readDir(path,dirobj,callback){
  var running=0;
  var end=false;
  fs.readdir(path,function(err, files){
    //console.log(err, files);
    files.forEach(function(filename){
      add();
      var stat=fs.lstatSync(path+'/'+filename);
      if (stat.isDirectory()){
          dirobj[filename]={};
          //console.log(filename+"是文件夹");
          readDir(path+'/'+filename,dirobj[filename],function(){
            del();
          });
      } else {
          dirobj[filename]=true;
          //console.log(filename+"是文件");
          del();
      }

    });
    end=true;
    ended();
  });

  function add(){
    running++;
  }

  function del(){
    running--;
    ended();
  }

  function ended(){
    if(!running&&end){
      if(typeof callback === 'function') callback();
    }
  }

}
