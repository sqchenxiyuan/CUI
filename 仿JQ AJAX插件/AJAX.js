function ajax(obj){
	var reqURL=obj.reqURL;
	var reqMethod=obj.reqMethod||"get";
	var reqAsync=obj.reqAsync||true;
	var reqData=obj.reqData||"";//直接传数据不解析
	var reqHeader=obj.reqHeader;
	var reqSuccess=obj.reqSuccess;
	var reqError=obj.reqError;
	var reqBefore=obj.reqBefore;

	var req=new XMLHttpRequest();
	req.onreadystatechange=function(){
		if(req.readyState==4)
		{
			if(req.status==200){
				if(reqSuccess)reqSuccess(req.responseText);
			}else{
				if(reqError)reqError(req.responseText);
			}
		}
	};
	req.open(reqMethod,reqURL,reqAsync);
	if(reqHeader){
		for(var head in reqHeader){
			req.setRequestHeader(head,reqHeader[head]);
		}
	}
	if(reqBefore)reqBefore();
	req.send(reqData);
}
