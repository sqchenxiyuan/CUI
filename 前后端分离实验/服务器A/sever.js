var express=require('express'),
  path=require('path'),
  bodyParser=require('body-parser'),
  cookieParser=require('cookie-parser'),
  session=require('express-session'),
  request = require('request');

app=express();

// app.set('view engine','ejs');
// app.set('views',__dirname+'/views');
// app.set('view options',{layout:false});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized:false,
  cookie:{
    maxAge:1000*60*10 //过期时间设置(单位毫秒)
  }
}));
app.use(function(req, res, next){
  res.locals.user = req.session.user;
  var err = req.session.error;
  res.locals.message = '';
  if (err) res.locals.message = '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
  next();
});

app.get("/text1",function(req,res,next){
  request("http://www.cxyblogbiu.com/ajax/articles/1", function (error, response, body){

    
    res.contentType('JSON');
    res.send(body);
    res.end();
  });
});



app.listen(3000,function(){
	console.log(' - listening on http://*:'+3000);
});
