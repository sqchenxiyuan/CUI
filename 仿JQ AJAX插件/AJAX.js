/*
  obj选项：
  必选： reqURL:请求地址
  可选： reqMethod:请求方法  默认:GET
        reqAsync:请求异同步 默认:异步
        reqData:请求数据    默认:空
        reqHeader:请求头    默认为空   传入JS对象即可
        reqSuccess(data):请求成功时间函数   传入返回的数据
        reqError():请求失败时的响应函数
        reqBefore:发送请求前的函数
*/
function ajax(obj){
	var reqURL=obj.reqURL;
	var reqMethod=obj.reqMethod||"get";
	var reqAsync=(obj.reqAsync===undefined?true:obj.reqAsync);
	var reqData=obj.reqData||"";//直接传数据不解析
	var reqHeader=obj.reqHeader;
	var reqSuccess=obj.reqSuccess;
	var reqError=obj.reqError;
	var reqBefore=obj.reqBefore;
	var reqUserName=obj.reqUserName||"";
	var reqUserPassWord=obj.reqUserPassWord||"";

	var req=new XMLHttpRequest();
	req.onreadystatechange=function(){
		if(req.readyState==4)
		{
			if(req.status==200){
				if(reqSuccess&&typeof reqSuccess === 'function')reqSuccess(req.responseText);
			}else{
				if(reqError&&typeof reqError === 'function')reqError(req.responseText);
			}
		}
	};
	req.open(reqMethod,reqURL,reqAsync,reqUserName,reqUserPassWord);
	if(reqHeader){
		for(var head in reqHeader){
			req.setRequestHeader(head,reqHeader[head]);
		}
	}
	if(reqBefore&&typeof reqBefore === 'function')reqBefore(req);
	req.send(reqData);
}

function get(url,data,success,error){
  var arr=[];
  for(var name in data){
    arr.push(name+"="+data[name]);
  }
  url=url+'?'+arr.join('&');

  ajax({
    reqURL:url,
    reqSuccess:success,
    reqError:error
  });
}

function post(url,data,success,error){
  ajax({
    reqURL:url,
    reqMethod:'post',
    reqData:JSON.stringify(data),
    reqSuccess:success,
    reqError:error
  });
}
