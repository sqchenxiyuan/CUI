var express=require('express'),
  path=require('path'),
  bodyParser=require('body-parser');
var tokens={};

app=express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req,res,next){
  res.set({
    "Access-Control-Allow-Origin":"*"
  });
  next();
});

app.post("/api/login",function(req,res,next){
  if(req.body.name=="123"&&req.body.passwd=="123"){
    var token=new Date().getTime();
    tokens[token]=true;
    res.json({
      "data":"success",
      "token": token
    });
  }else{
    res.json({
      error:"no pass"
    });
  }

});

app.get("/api/getdata",function(req,res,next){
  console.log(req.headers);
  if(tokens[req.headers.authorization]){
    res.json({
      yes:"success"
    });
  }else{
    res.json({
      error:"no pass"
    });
  }
});


app.listen(4000,function(){
	console.log(' - listening on http://*:'+4000);
});
