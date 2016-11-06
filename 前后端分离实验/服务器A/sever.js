var express=require('express'),
  fs=require('fs'),
  http=require('http'),
  https=require('https'),
  path=require('path'),
  bodyParser=require('body-parser'),
  cookieParser=require('cookie-parser'),
  session=require('express-session'),
  request = require('request');
var privateKey  = fs.readFileSync(__dirname+'/ssl/private.pem', 'utf8');
var certificate = fs.readFileSync(__dirname+'/ssl/file.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};




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

app.post('/login',function(req,res,next){
  request({
  method:"post",
  url:"http://127.0.0.1:4000/api/login",
  headers:{
    "content-type":"application/json"
  },
  form:{
    name:req.body.name,
    passwd:req.body.passwd
  }}, function (err, response, body){
    if(err)console.log(err);
    body=JSON.parse(body);
    req.session.token=body.token;
    console.log(req.session.token);
    res.contentType('JSON');
    res.send(JSON.stringify({
      data:body.data
    }));
    res.end();
  });
});

app.get('/getdata',function(req,res,next){
  console.log(req.session.token);
  if(req.session.token){
    request({
    method:"get",
    url:"http://127.0.0.1:4000/api/getdata",
    headers:{
      "authorization":req.session.token
    }}, function (err, response, body){
      body=JSON.parse(body);
      if(body.error){
        res.send("请重新登录");
        res.end();
      }else{
        res.send("DATA!!!");
        res.end();
      }
    });
  }else {
    res.send("请先登录");
    res.end();
  }
});


app.get('/httpstest',function(req,res,next){
  if(req.protocol === 'https') {
      res.status(200).send('Welcome to Safety Land!');
  }
  else {
      res.status(200).send('Welcome!');
  }
});


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(3000,function(){
	console.log(' - listening on http://*:'+3000);
});

httpsServer.listen(3001,function(){
	console.log(' - listening on http://*:'+3001);
});
