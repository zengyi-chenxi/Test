var DeptId;
function goBack(){
	window.history.back(-1);
}

//当前时间包含时分秒的
function nowTime(){
	var myDate = new Date();
	//获取当前年
	var year = myDate.getFullYear();
	//获取当前月
	var month = myDate.getMonth() + 1;
	if( month < 10) month = '0' + month;
	//获取当前日
	var day = myDate.getDate();
	if( day < 10) day = '0' + day;
	var h = myDate.getHours(); //获取当前小时数(0-23)
	if( h < 10) h = '0' + h;
	var m = myDate.getMinutes(); //获取当前分钟数(0-59)
	if(m < 10) m = '0' + m;
//	var s = myDate.getSeconds();
//	if(s < 10) s = '0' + s;
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
$(function(){
	$("#Scan_Code").html(nowTime());
	var url = location.search;
//	var changeUrl;
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
//				var depId = 'H11192';
				var depId = datas.data.code.split('=')[1].split('&')[0];
				DeptId=depId;
				getHealthCode(depId);
				getHealthInfor(depId);
				changevedio(depId);
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
//				console.log(depId)
                DeptId=data;
				getHealthCode(data);
				getHealthInfor(data);
				changevedio(data);
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

function getHealthCode(DeptId){
	$.ajax({
		url:contextUrl+"/ExternalInfo.svc/GetHealthCodeDetail?ran="+Math.random(),
		timeout : 30000, //超时时间设置，单位毫秒
		data: {
			DeptId: DeptId,
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
				var MoningCheckData = datas.data[0].MoningCheck;
				var DeviceCheckData = datas.data[0].DeviceCheck;
				var AirCheckData = datas.data[0].AirCheck;
				
//				console.log(datas.data[0].BusssinessTime)
				if (datas.data[0].BusinessTime == '') {
					$.each(MoningCheckData, function(index, item) {
						if (time_range(item.StartTime, item.EndTime, todayTimeS()) == 0) {//在范围内
							var str = '';
							if (item.TimeResult == '未完成') {
								str +='<img src="img1/cha.png"/>';//<span>'+item.TimeResult+'</span>
							}else{
								str +='<img src="img1/gou.png"/>';//<span>'+item.TimeResult+'</span>
							}
							$('#MoningCheck').html(str);
						}else{	//不在范围内
	//						MoningCheck_i++;
	//						console.log(MoningCheck_i)
	//						if (MoningCheck_i == time_p) {
		                        $('#MoningCheck').html('<img src="img1/zw.png"/>');
//								$('#MoningCheck').html('暂未营业');
	//						}
							
						}
					});
					$.each(DeviceCheckData, function(index, item) {
						if (time_range(item.StartTime, item.EndTime, todayTimeS()) == 0) {
							var str = '';
							if (item.TimeResult == '未完成') {
								str +='<img src="img1/cha.png"/>';//<span>'+item.TimeResult+'</span>
							}else{
								str +='<img src="img1/gou.png"/>';//<span>'+item.TimeResult+'</span>
							}
							$('#DeviceCheck').html(str);
						}else{
	//						DeviceCheck_i++;
	//						if (DeviceCheck_i == time_p) {
		                        $('#DeviceCheck').html('<img src="img1/zw.png"/>');
//								$('#DeviceCheck').html('暂未营业');
	//						}
						}
					});
					$.each(AirCheckData, function(index, item) {
						if (time_range(item.StartTime, item.EndTime, todayTimeS()) == 0) {
							var str = '';
							if (item.TimeResult == '未完成') {
								str +='<img src="img1/cha.png"/>';//<span>'+item.TimeResult+'</span>
							}else{
								str +='<img src="img1/gou.png"/>';//<span>'+item.TimeResult+'</span>
							}
							$('#AirCheck').html(str);
						}else{
	//						AirCheck_i++;
	//						if (AirCheck_i == time_p) {
							    $('#AirCheck').html('<img src="img1/zw.png"/>');
//								$('#AirCheck').html('暂未营业');
	//						}
						}
					});
				}else{
					var time_p = datas.data[0].BusinessTime.split(',').length;
//					console.log(time_p)
					var MoningCheck_i=0, DeviceCheck_i=0, AirCheck_i=0;
					$.each(MoningCheckData, function(index, item) {
						if (time_range(item.StartTime, item.EndTime, todayTimeS()) == 0) {//在范围内
							var str = '';
							if (item.TimeResult == '未完成') {
								str +='<img src="img1/cha.png"/>';//<span>'+item.TimeResult+'</span>
							}else{
								str +='<img src="img1/gou.png"/>';//<span>'+item.TimeResult+'</span>
							}
							$('#MoningCheck').html(str);
						}else{	//不在范围内
							MoningCheck_i++;
							if (MoningCheck_i == time_p) {
								$('#MoningCheck').html('<img src="img1/zw.png"/>');								
							}							
						}
					});
					$.each(DeviceCheckData, function(index, item) {
						if (time_range(item.StartTime, item.EndTime, todayTimeS()) == 0) {
							var str = '';
							if (item.TimeResult == '未完成') {
								str +='<img src="img1/cha.png"/>';//<span>'+item.TimeResult+'</span>
							}else{
								str +='<img src="img1/gou.png"/>';//<span>'+item.TimeResult+'</span>
							}
							$('#DeviceCheck').html(str);
						}else{
							DeviceCheck_i++;
							if (DeviceCheck_i == time_p) {
								$('#DeviceCheck').html('<img src="img1/zw.png"/>');
//								$('#DeviceCheck').html('暂未营业');
							}
						}
					});
					$.each(AirCheckData, function(index, item) {
						if (time_range(item.StartTime, item.EndTime, todayTimeS()) == 0) {
							var str = '';
							if (item.TimeResult == '未完成') {
								str +='<img src="img1/cha.png"/>';//<span>'+item.TimeResult+'</span>
							}else{
								str +='<img src="img1/gou.png"/>';//<span>'+item.TimeResult+'</span>
							}
							$('#AirCheck').html(str);
						}else{
							AirCheck_i++;
							if (AirCheck_i == time_p) {
								$('#AirCheck').html('<img src="img1/zw.png"/>');
//								$('#AirCheck').html('暂未营业');
							}
						}
					});
				}				
				if (datas.data[0].CodeColor == 'Red') {
					$('#CodeColor').html('红码').parent('p').css('color', '#FA0909');
					$('#CodeDes').html('（高风险需整改）').css('color', '#FA0909');
				}else if (datas.data[0].CodeColor == 'Green') {
					$('#CodeColor').html('绿码').parent('p').css('color', '#0bd372');
					$('#CodeDes').html('（正常营业中）').css('color', '#0bd372');
				}else if(datas.data[0].CodeColor == 'Yellow'){
					$('#CodeColor').html('黄码').parent('p').css('color', '#fe9001');
					$('#CodeDes').html('（有风险应整改）').css('color', '#fe9001');
				}else{
					$('#CodeColor').html('灰码').parent('p').css('color', '#6c6969');
					$('#CodeDes').html('（暂未营业）').css('color', '#6c6969');
				}				
				$('#lr_number').html(datas.data[0].PerCustomerRecord);
			}else if(datas.msg == 'true' && datas.data ==""){
				$('#MoningCheck').html('无');
				$('#DeviceCheck').html('无');
				$('#AirCheck').html('无');
				$('#lr_number').html('无');
				$('#CodeColor').html('暂无数据').parent('p').css('color', '#6c6969');
				$('#CodeDes').html('（暂无数据）').css('color', '#6c6969');
				alert('暂无数据，请重新加载！');
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

function getHealthInfor(DeptId){
	$.ajax({
		url:contextUrl+"/ExternalInfo.svc/GetHealthCodeBaseInfo",
		timeout : 30000, //超时时间设置，单位毫秒
		data: {
			DeptId: DeptId
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
				$('#ShopName').html(datas.data.ctext);
				$('#ContactPeople').html(datas.data.name);
				$('#ContactWay').html(datas.data.mobile);
				if(datas.data.examState=='1'){//1：参加了考试；0：没有参加考试；空值：没有基本数据，数据不存在
					$('#PeopleTrain').html('<img src="img1/gou.png"/>');
				}else if(datas.data.examState=='0'){
					$('#PeopleTrain').html('<img src="img1/cha.png"/>');
				}else{
					$('#PeopleTrain').html('<img src="img1/zw.png"/>');
				}
				if(datas.data.warningState=='0'){//0：基本数据存在但没有预警信息，1：有预警信息；空值：没有基本数据，数据不存在
					$('#WaringCheck').html('<img src="img1/gou.png"/>');
				}else if(datas.data.warningState=='1'){
					$('#WaringCheck').html('<img src="img1/cha.png"/>');
				}else{
					$('#WaringCheck').html('<img src="img1/zw.png"/>');
				}
				if(datas.data.isState=='True'){//True:在线；False:不在线；空值：没有基本数据，数据不存在
					$('#vedioCheck').html('<img src="img1/gou.png"/>');
				}else if(datas.data.isState=='False'){
					$('#vedioCheck').html('<img src="img1/cha.png"/>');
				}else{
					$('#vedioCheck').html('<img src="img1/zw.png"/>');
				}
				$('.addtou').click(function(){
					window.location.href='Evaluationlist.html?Keyid='+DeptId+'&Ctexts='+datas.data.ctext;
				})
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

function changevedio(DeptId){
	$.ajax({
            url:contextUrl+"/ExternalInfo.svc/IPCVideoInfoToPublic",
            data:JSON.stringify({	
				DeptId:DeptId,//'H65875'DeptId 'H19001'
			}),
			type: "POST",
	        contentType:'application/json; charset=utf-8',
	        dataType: "json", 
			success: function(data) {
				var json = JSON.parse(data);
//				console.log(json);
				var $str = '';
				if(json.data == "" || json.data == null){
//					alert('此商家暂无云视频！');
                    $('#healthveido').css('display','none');
                }else{
                	$('#healthveido').css('display','block');
                    $.each(json.data,function(index,items){
						$str+="<li onclick='lookvedio(\""+DeptId+"\",\""+index+"\",this)'><div class='spKgs' style='width:100%;position:relative;'>";
						if(json.data[index].ChannelPhotoPath !=''){
							$str+="<img class='healthvideoimg' src='"+json.data[index].ChannelPhotoPath+"'/>";
							$str+="<span style='position:absolute;left:35%;top:25%;width:30%;height:auto;'>";
							$str+="<img class='healthvideoimg1' src='img1/play.png'/></span>";
						}else{
							$str+="<img class='healthvideoimg' src='img1/no-shipin.png'/>";							
						}	
						$str+="<span style='position:absolute;right:10px;top:0;background:#1FD3B3;color:#fff;padding:0 5px;'>";
						if(json.data[index].IsState=='True'){//在线
							$str +="<span>在线</span>";
						}else{//离线
							$str +="<span>离线</span>";
						}	
						$str+="</span>";
						$str+="</div><p>"+json.data[index].ChannelName+"</p>";
						$str+="</li>";
					})
                    $(".healthvideo").html($str);
                }
			}
	});
}

function lookvedio(deptId, channelName, _this){
	$(_this).children(".spKgs").children('.healthvideoimg').css("border", "1px solid #1FD3B3").parent().parent().siblings().children(".spKgs").children('.healthvideoimg').css("border", "none");
	window.location.href='shipin.html?DeptId='+deptId+'&channelName='+channelName;
}

$('#login').click(function(){
	window.location.href='account.html';
})















