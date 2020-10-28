﻿var DeptId,Elenumber;
$(function(){
	$("#Scan_Code").html(nowTime());
	var url = location.search;
	var locationUrl = window.location.href;
	localStorage.setItem("locationUrl",locationUrl);
	if(url.indexOf("?") != -1) { 
		var str = url.substr(1);
		if (str.split('=').length > 1) {
			var reg = new RegExp("(^|&)"+ str.split('=')[0] +"=([^&]*)(&|$)");
			var r = str.match(reg);
			var changeUrl = unescape(r[2]);
			getEncryptAnKang(changeUrl);
		}else{
			var changeUrl = str;
			getDecoding(changeUrl);			
		}
	}
	
})
function goBack(){
	window.history.back(-1);
}
function nowTime(){//当前时间包含时分秒的
	var myDate = new Date();	
	var year = myDate.getFullYear();//获取当前年	
	var month = myDate.getMonth() + 1;//获取当前月
	if( month < 10) month = '0' + month;	
	var day = myDate.getDate();//获取当前日
	if( day < 10) day = '0' + day;
	var h = myDate.getHours(); //获取当前小时数(0-23)
	if( h < 10) h = '0' + h;
	var m = myDate.getMinutes(); //获取当前分钟数(0-59)
	if(m < 10) m = '0' + m;
	var dates = year + '-' + month + "-" + day + " " + h + ':' + m;
	return dates;
}
function todayTimeS(){
	var myDate = new Date();
	//获取当前年
	var year = myDate.getFullYear();
	//获取当前月
	var month = myDate.getMonth() + 1;
	if( month < 10) month = '0' + month;
	//获取当前日
	var day = myDate.getDate();
	if( day < 10) day = '0' + day;
	var h = myDate.getHours();
	if( h < 10) h = '0' + h;
	var m = myDate.getMinutes();
	if( m < 10) m = '0' + m;
	var s = myDate.getSeconds();
	if( s < 10) s = '0' + s;
	var dates = year + '-' + month + "-" + day + ' ' + h +':' +m +':'+s;
	return dates;
}
var time_range = function (beginTime, endTime, nowTime) {  //判断是否在一个时间区间
	var dateBegin = new Date(beginTime.replace(/-/g, "/"));
	var dateEnd = new Date(endTime.replace(/-/g, "/"));
	var dateNow = new Date(nowTime.replace(/-/g, "/"));
	if (dateNow.getTime () - dateBegin.getTime () > 0 && dateNow.getTime () - dateEnd.getTime () < 0) {
		return 0;   //在区间内
	}else{
		return -1;  //不在区间内
	}
}

function getDecoding(urlParm){
	$.ajax({
		url:contextUrl+"/ExternalInfo.svc/GetDencode",
		timeout : 30000, //超时时间设置，单位毫秒
		data: {	
			urlParm: urlParm
		},
		type: "GET",
		cache:false,
        contentType:'application/json; charset=utf-8',
        dataType: "json", 
		beforeSend:function(XMLHttpRequest){ 
			$('#loading').addClass('hover'); //在后台返回success之前显示loading图标
		},
		success: function(data) {
			var datas = JSON.parse(data);
//			console.log(datas);
			if (datas.msg == 'true') {
//				var depId = 'H88895';No=B1-02
				var depId = datas.data.code.split('=')[1].split('&')[0];
				var num = datas.data.code.split('=')[2].split('&')[0];
				DeptId=depId;
				Elenumber=num;
				getHealthCode(depId,num);
			}else{
				alert('暂无数据，请重新加载！');
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert('网络延迟,请稍后再试！');
		},
		complete:function(XMLHttpRequest, textStatus) {
			$("#loading").removeClass("hover"); 
			if(textStatus=='timeout'){//超时,status还有success,error等值的情况
				alert('网络延迟,请稍后再试！');
			}
		}
	});
}

function getEncryptAnKang(urlParm){
	$.ajax({
		url:contextUrl+"/ExternalInfo.svc/EncryptAnKang?ran="+Math.random(),
		timeout : 30000, //超时时间设置，单位毫秒
		data: {	
			toDecrypt: urlParm
		},
		type: "GET",
		cache:false,
        contentType:'application/json; charset=utf-8',
        dataType: "json", 
		beforeSend:function(XMLHttpRequest){ 
			$('#loading').addClass('hover'); //在后台返回success之前显示loading图标
		},
		success: function(data) {
//			console.log(data);
			if (data != '') {
//				var depId = 'H92365';
                DeptId=data;
				getHealthCode(data);
			}else{
				alert('暂无数据，请重新加载！');
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert('网络延迟,请稍后再试！');
		},
		complete:function(XMLHttpRequest, textStatus) {
			$("#loading").removeClass("hover"); 
			if(textStatus=='timeout'){//超时,status还有success,error等值的情况
				alert('网络延迟,请稍后再试！');
			}
		}
	});
}

function getHealthCode(DeptId,Elenumber){
	$.ajax({
		url:contextUrl+"/ExternalInfo.svc/GetElevatorCodeBaseInfo",
		timeout : 30000, //超时时间设置，单位毫秒
		data: {
			DeptId: DeptId,
			ElevatorNumber:Elenumber,
		},
		type: "GET",
		cache:false,
        contentType:'application/json; charset=utf-8',
        dataType: "json", 
		beforeSend:function(XMLHttpRequest){ 
			$('#loading').addClass('hover'); //在后台返回success之前显示loading图标
		},                
		success: function(data) {
			var datas = JSON.parse(data);
//			console.log(datas);
			if (datas.msg == 'true' && datas.data !="") {
				$('#ShopName').html(datas.data.ctext+Elenumber);
				localStorage.setItem("ElevatorNumber",Elenumber);
				$('#ContactPeople').html(datas.data.name);
				$('#ContactWay').html(datas.data.mobile);
				if (datas.data.CodeColor == 'Red') {
					$('#CodeColor').html('红码').parent('p').css('color', '#FA0909');
					$('#CodeDes').html('（高风险需整改）').css('color', '#FA0909');
				}else if (datas.data.CodeColor == 'Green') {
					$('#CodeColor').html('绿码').parent('p').css('color', '#0bd372');
					$('#CodeDes').html('（正常营业中）').css('color', '#0bd372');
				}else if(datas.data.CodeColor == 'Yellow'){
					$('#CodeColor').html('黄码').parent('p').css('color', '#fe9001');
					$('#CodeDes').html('（有风险应整改）').css('color', '#fe9001');
				}else{
					$('#CodeColor').html('灰码').parent('p').css('color', '#6c6969');
					$('#CodeDes').html('（暂未启用）').css('color', '#6c6969');
				}
				var str1=str2=str3=str4=str5=str6='';
				if (datas.data.YearState == '1') {
					str1 +='<img src="img1/gou.png"/>';	
				}else if (datas.data.YearState == '0'){
					str1 +='<img src="img1/cha.png"/>';
				}else{
					str1 +='<img src="img1/zw.png"/>';
				}
				$('#MoningCheck').html(str1);
				if (datas.data.QuarterState == '1') {
					str2 +='<img src="img1/gou.png"/>';	
				}else if (datas.data.QuarterState == '0'){
					str2 +='<img src="img1/cha.png"/>';
				}else{
					str2 +='<img src="img1/zw.png"/>';
				}
				$('#DeviceCheck').html(str2);
				if (datas.data.MonthState == '1') {
					str3 +='<img src="img1/gou.png"/>';	
				}else if (datas.data.MonthState == '0'){
					str3 +='<img src="img1/cha.png"/>';
				}else{
					str3 +='<img src="img1/zw.png"/>';
				}
				$('#AirCheck').html(str3);
				if (datas.data.StartState == '1') {
					str4 +='<img src="img1/gou.png"/>';	
				}else if (datas.data.StartState == '0'){
					str4 +='<img src="img1/cha.png"/>';
				}else{
					str4 +='<img src="img1/zw.png"/>';
				}
				$('#vedioCheck').html(str4);
				if (datas.data.warningState == '1') {
					str5 +='<img src="img1/gou.png"/>';	
				}else if (datas.data.warningState == '0'){
					str5 +='<img src="img1/cha.png"/>';
				}else{
					str5 +='<img src="img1/zw.png"/>';
				}
				$('#WaringCheck').html(str5);
				if (datas.data.examState == '1') {
					str6 +='<img src="img1/gou.png"/>';	
				}else if (datas.data.examState == '0'){
					str6 +='<img src="img1/cha.png"/>';
				}else{
					str6 +='<img src="img1/zw.png"/>';
				}
				$('#PeopleTrain').html(str6);
				$('.addtou').click(function(){
					window.location.href='elecPage/eleEvaluationlist.html?Keyid='+DeptId+'&Elenumber='+Elenumber+'&Ctexts='+datas.data.ctext;
				})
			}else if(datas.msg == 'true' && datas.data ==""){
				$('#ShopName').html('暂无数据');
				$('#ContactPeople').html('暂无数据');
				$('#ContactWay').html('暂无数据');
				$('#CodeColor').html('暂无数据').parent('p').css('color', '#6c6969');
				$('#CodeDes').html('（暂无数据）').css('color', '#6c6969');
				$('#MoningCheck').html('无');
				$('#DeviceCheck').html('无');
				$('#AirCheck').html('无');
				$('#vedioCheck').html('无');
				$('#WaringCheck').html('无');
				$('#PeopleTrain').html('无');
			}else{
				alert('暂无数据，请重新加载！');
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert('网络延迟,请稍后再试！');
		},
		complete:function(XMLHttpRequest, textStatus) {
			$("#loading").removeClass("hover"); 
			if(textStatus=='timeout'){//超时,status还有success,error等值的情况
				alert('网络延迟,请稍后再试！');
			}
		}
	});
}

$('#Downapp').click(function(){
	window.location.href='http://36.7.154.150:8009/APP/NewAPPFinal.apk';
})

$('#login').click(function(){
	window.location.href='eleaccount.html';
})
//点击一键报警按钮
$('#elewarningbao').click(function(){
	var Reply = GetAM();
//	console.log(DeptId);console.log(Reply);console.log(Elenumber);
	$.ajax({
		url: contextUrl+"/ExternalInfo.svc/SetElevatorComment",
		timeout : 30000, //超时时间设置，单位毫秒
		data:JSON.stringify ({//传递参数
			Keyid: DeptId,//商家id
			EvalPj: '4', //评价等级 0好评 1中评 2差评 3投诉  
			Userid: '',
			S1: '1',//环境评分
			S2: '1',//菜品评分
			S3: '1',//服务评分
			Content: '报警',//内容
			PhotoEvalPath:'',//上传图片地址
			Reply: Reply,//游客的ID(根据接口获得)，或投诉时的手机号码 APP上传空值	
			ElevatorNumber:Elenumber,
		}),
		contentType: 'application/json; charset=utf-8',
		type: "post",
		dataType: "json",
		success: function(data) {
			var json = JSON.parse(data);
//			console.log(json);
			if(json >0) {	                    
				alert("报警成功，请等待救援!");
			} else {
				alert("报警失败，请重新报警!");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert('网络延迟,请稍后再试！');
		},
		complete:function(XMLHttpRequest, textStatus) {
			if(textStatus=='timeout'){//超时,status还有success,error等值的情况
				alert('网络延迟,请稍后再试！');
			}
		}
	})
})


function GetAM(){//获得随机账户编号
	var num;
	$.ajax({				
		url: contextUrl+"/ExternalInfo.svc/GetAM",
		timeout: 3000,
		data:{},
		type:"GET",
		cache:false,
		async:false,
		contentType:'application/json;charset=utf-8',
		dataType: "json",
		success: function(result){	              
	        var json = JSON.parse(result);
	        num = json.data.AM;
		},
	});
	return num;
}








