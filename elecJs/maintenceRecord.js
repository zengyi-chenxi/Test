﻿var IsSign = 0;//是否定位签到，0代表没用，1是
var userInfo = JSON.parse(localStorage.getItem("userjsonpeople"));
var Elenumber = localStorage.getItem("ElevatorNumber");
var UserId = userInfo[0].UserId;
var DeptId = userInfo[0].DeptId;
$(function(){
	basicInfo();//电梯信息
	EquipMaintenanceType();// 获取电梯维保类型
	ElevatorMaintenanceSignInfo();//维保轨迹
	//getLocation("合肥市高新区中科大先进技术研究院嵌入式一楼");//返回的地址转为经纬度
})
/*维保类型*/
function selectClassify(){
	$(".classifySelect").show();//选择商户类别
}
//选项下拉
$("[class^='inspect_content']").click(function(){
	/*var indexFlag = $(this).attr("class").replace(/[^0-9]/ig,"");
	$(".inspect_content"+indexFlag).find("ul").show();*/
	$(this).toggleClass("hover");
	if($(this).hasClass("hover")){
		$(this).find('i').removeClass("icon-xiajiantou").addClass("icon-shangjiantou");
	}else{
		$(this).find('i').removeClass("icon-shangjiantou").addClass("icon-xiajiantou");
	}
})
//商户属性和商户类型选择项勾选
$(".radioDiv .yuannoxuan").click(function(){
	$(this).parents(".radioDiv").find(".yuannoxuan").removeClass("yuanxuan");
	$(this).addClass("yuanxuan").siblings();
})
/************初始化放置电梯信息************/
function basicInfo(){
	$.ajax({
		url: contextUrl+"/ExternalInfo.svc/getElevatorInfoByFID",
		timeout : 30000, //超时时间设置，单位毫秒
		data: {
			ElevatorNumber: Elenumber,
			DeptId: DeptId, 
		},
	    type: "GET",
		contentType: 'application/json;charset=utf-8',
		dataType: "json",
		beforeSend:function(XMLHttpRequest){ 
			$('#loading').addClass('hover'); //在后台返回success之前显示loading图标
		}, 
		success: function(data) { 
			var datas=JSON.parse(data).data;
			//console.log(datas);
			if(datas != ""){
				$("#BrandName").val(datas[0].BrandName);
				$("#ElevatorAddress").val(datas[0].ElevatorAddress);
				$("#TypeName").val(datas[0].TypeName);
				$("#WeiBaoName").val(datas[0].WeiBaoName);
				$("#Tele").val(datas[0].Tele);
				$("#HelperName").val(datas[0].HelperName);
				//电梯编号
				$("#ElevatorNumber").html(datas[0].ElevatorNumber);
				$("#ElevatorType").val(datas[0].ElevatorType);
				$("#MaintenType").val(datas[0].MaintenType);
				getLocation(datas[0].ElevatorAddress);//返回的地址转为经纬度
				$("#Ctext").val(datas[0].Ctext);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			//alert("网络延迟,请稍后再试！");
		},
		complete:function(XMLHttpRequest, textStatus) {
			$("#loading").removeClass("hover"); 
			if(textStatus=='timeout'){
				alert("网络延迟,请稍后再试！");
			}
		}
	})
}
//获取电梯维保类型
function EquipMaintenanceType(){
	$.ajax({
		url: contextUrl+"/ExternalInfo.svc/GetEquipMaintenanceTypeDropDownList",
		timeout : 30000, //超时时间设置，单位毫秒
		data: {},
	    type: "GET",
		contentType: 'application/json;charset=utf-8',
		dataType: "json",
		beforeSend:function(XMLHttpRequest){ 
			$('#loading').addClass('hover'); //在后台返回success之前显示loading图标
		}, 
		success: function(data) { 
			var datas=JSON.parse(data).data;
			var $str = '<li value="">请选择</li>';
            $.each(datas,function(i,val){
                $str +="<li value='"+val.code+"'>"+val.name+"</li>";
            }); 
            $('.classifySelect ul').html($str);
            $(".classifySelect ul li").click(function(){
				$(".classifySelect").hide();
				$(".arrow").find("span").text($(this).html()).attr("indexclassify",$(this).attr("value"));
				var index = $(this).attr("value");
				$("[class^='inspect_content']").hide();
				$(".inspect_content"+index).show();//对应的表
				$("[class^='inspect_content']").find(".yuannoxuan").removeClass("yuanxuan");
				$(".inspect_content"+index).find(".radioDiv p:first-child").find(".yuannoxuan").addClass("yuanxuan");
				if(index != ""){
					getPreDate(index);
				}else{
					$("#preDate").val("");
				}
			})
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			//alert("网络延迟,请稍后再试！");
		},
		complete:function(XMLHttpRequest, textStatus) {
			$("#loading").removeClass("hover"); 
			if(textStatus=='timeout'){
				alert("网络延迟,请稍后再试！");
			}
		}
	})
}
//上次维保日期
function getPreDate(index){
	$.ajax({
		url: contextUrl+"/ExternalInfo.svc/getElevatorMaintenanceLastTime",
		timeout : 30000, //超时时间设置，单位毫秒
		data: {
			ElevatorNumber: Elenumber,
			MaintenType:index
		},
	    type: "GET",
		contentType: 'application/json;charset=utf-8',
		dataType: "json",
		beforeSend:function(XMLHttpRequest){ 
			$('#loading').addClass('hover'); //在后台返回success之前显示loading图标
		}, 
		success: function(data) { 
			var datas=JSON.parse(data).data;
			if(datas == ""){
				$("#preDate").val(datas);
				$("#nextDate").val(addDate(todayTime(), Number(getDays(index))));
			}else{
				$("#preDate").val(allTimeChange(datas[0].MaintenDate));
				$("#nextDate").val(addDate(timeChange(datas[0].MaintenDate), Number(getDays(index))));
			}
			//下次维保时间
			//$("#nextDate").val(addDate(todayTime(), Number(getDays(index))));
			//console.log(addDate(todayTime(), Number(getDays(index))));
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			//alert("网络延迟,请稍后再试！");
		},
		complete:function(XMLHttpRequest, textStatus) {
			$("#loading").removeClass("hover"); 
			if(textStatus=='timeout'){
				alert("网络延迟,请稍后再试！");
			}
		}
	})
}
//维保轨迹
function ElevatorMaintenanceSignInfo(){
	$.ajax({
		url: contextUrl+"/ExternalInfo.svc/getElevatorMaintenanceSignInfo",
		timeout : 30000, //超时时间设置，单位毫秒
		data: {
			UserId: UserId,
		},
	    type: "GET",
		contentType: 'application/json;charset=utf-8',
		dataType: "json",
		beforeSend:function(XMLHttpRequest){ 
			$('#loading').addClass('hover'); //在后台返回success之前显示loading图标
		}, 
		success: function(data) { 
			var datas=JSON.parse(data).data;
			if(datas != ""){
				var strHtml = '';
	            $.each(datas,function(i,val){
	               	strHtml += '<li>';
					strHtml += '<div class="nearsite-message">';
					strHtml += '<div class="avatar">';
					strHtml += '<img src="../img1/lawpath_dian.png">';
					strHtml += '</div>';
					strHtml += '<div class="contents">';
					strHtml += '<div class="cont_n">'+val.ElevatorName+'</div>';
					strHtml += '<div class="cont_t">';
					strHtml += '<span>维保时间：</span>';
					strHtml += '<span>'+allTimeChange(val.MaintenDate)+'</span>';
					strHtml += '</div>';
					strHtml += '</div>';
					strHtml += '</div>';
					strHtml += '<div class="vertbar"></div>';
					strHtml += '</li>';
	            }); 
				$(".SignMaintence ul").append(strHtml);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			//alert("网络延迟,请稍后再试！");
		},
		complete:function(XMLHttpRequest, textStatus) {
			$("#loading").removeClass("hover"); 
			if(textStatus=='timeout'){
				alert("网络延迟,请稍后再试！");
			}
		}
	})
}
//日期，在原有日期基础上，增加days天数，默认增加1天
function addDate(date, days) {
    if(days == undefined || days == '') {
        days = 1;
    }
    var date = new Date(date);
    date.setDate(date.getDate() + days);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var mm = "'" + month + "'";
    var dd = "'" + day + "'";
    //单位数前面加0
    if(mm.length == 3) {
      month = "0" + month;
    }
    if(dd.length == 3) {
      day = "0" + day;
    }
    var time = date.getFullYear() + "-" + month + "-" + day;
    return time;
}
function getDays(code){
	var getDays = "";
	if(code == "1"){
		getDays = "15"
	}else if(code == "2"){
		getDays = "90"
	}else if(code == "3"){
		getDays = "180"
	}else{
		getDays = "365"
	}
	return getDays;
}
//提交
$(".submitBtn").click(function(){
	var index = $(".arrow span").attr("indexclassify");
	if(index == 0){
		alert("请选择维保类型！");
		return
	}
	if(IsSign == 0){
		alert("请定位签到！");
		return
	}
	if($("#nextDate").val() == ""){
		alert("请选择下次维保时间！")
		return
	}
	if(!compareTime(todayTime(),$("#nextDate").val())){
		alert("请正确选择下次维保时间！")
		return
	}
	var radioArr = [];//$('#div').is(':hidden')
	if($(".cargoLSift").is(':hidden')){//货载电梯显示
		$(".inspect_content"+index).find(".radioDiv").each(function(index,arr){
			if($(arr).find(".yuanxuan").attr("flag") == undefined){
				radioArr.push("0");//
			}else{
				radioArr.push($(arr).find(".yuanxuan").attr("flag"));
			}
		})
	}else{
		$(".inspect_content5").find(".radioDiv").each(function(index,arr){
			if($(arr).find(".yuanxuan").attr("flag") == undefined){
				radioArr.push("0");
			}else{
				radioArr.push($(arr).find(".yuanxuan").attr("flag"));
			}
		})
	}
	var Uattribute = radioArr.join(",");
	$.ajax({
		url: contextUrl+"/ExternalInfo.svc/InsertOrUpdateElevatorMaintenanceRecord",
		timeout : 30000, //超时时间设置，单位毫秒
		data: JSON.stringify({
			IsUpdate:0,
			FID:"",
			UserId:UserId,
			ElevatorNumber:$("#ElevatorNumber").html(),
			ElevatorType:$("#ElevatorType").val(),
			MaintenType:$(".arrow span").attr("indexclassify"),
			MaintenDate:todayTimeS(),
			NextMaintenDate:$("#nextDate").val(),
			Remarks:$("#remarks").val(),
			IsSign:IsSign,
			MaintenanceProject:Uattribute
		}),
        type: "POST",
		contentType: 'application/json;charset=utf-8',
		cache:false,
		dataType: "json",
		beforeSend:function(XMLHttpRequest){ 
			$('#loading').addClass('hover'); //在后台返回success之前显示loading图标
		}, 
		success: function(data) { 
			var jsons = JSON.parse(data);
			if(jsons.msg == "true"){
				alert("发布成功");
				window.location.href = "maintenceComplete.html";
			}else{
				alert("发布失败");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			//alert("网络延迟,请稍后再试！");
		},
		complete:function(XMLHttpRequest, textStatus) {
			$("#loading").removeClass("hover"); 
			if(textStatus=='timeout'){
				alert("网络延迟,请稍后再试！");
			}
		}
	})
})
//签到功能
function addrSign(){
	if(IsSign == 1){
		alert("已经签到成功啦！");
		return
	}
	///////////////////////定位
	var map, geolocation;
	map = new AMap.Map('addressPosition');
	map.plugin('AMap.Geolocation', function() {
	    geolocation = new AMap.Geolocation({
	        enableHighAccuracy: true, //是否使用高精度定位，默认:true
	        timeout: 10000, //超过10秒后停止定位，默认：无穷大
	        maximumAge: 0, //定位结果缓存0毫秒，默认：0
	        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
	        showButton: true, //显示定位按钮，默认：true
	        buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
	        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
	        showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
	        showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
	        panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
	        zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
	    });
	    map.addControl(geolocation);
	    geolocation.getCurrentPosition();
	    AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
	});
	var myplace = ''; //我的位置
	var mycity = ''; //我所在的城市
}
//解析定位结果
function onComplete(data) {
    var str = ['定位成功'];
    str.push('经度：' + data.position.getLng());
    str.push('纬度：' + data.position.getLat());
    var p1 = [];//手机端
    p1.push(data.position);
    var p2 = [];
    p2[0] = $("#postionPC").val().split(",")[0];
    p2[1] = $("#postionPC").val().split(",")[1];
	// 返回 p1 到 p2 间的地面距离，单位：米
	var dis = AMap.GeometryUtil.distance(data.position, p2);
	if(dis>1000){
		alert("不在签到范围内！");
		return false;
	}else{
		IsSign = 1;
		alert("签到成功");
	}
    if (data.accuracy) {
        str.push('精度：' + data.accuracy + ' 米');
    } //如为IP精确定位结果则没有精度信息
    str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
    myplace = data.formattedAddress; //我的位置
    var strHtml = '';
    var ctextAddr= $("#Ctext").val()+" "+$("#ElevatorNumber").html();
    strHtml += '<li>';
	strHtml += '<div class="nearsite-message">';
	strHtml += '<div class="avatar">';
	strHtml += '<img src="../img1/lawpath_dian.png">';
	strHtml += '</div>';
	strHtml += '<div class="contents">';
	strHtml += '<div class="cont_n">'+ctextAddr+'</div>';
	strHtml += '<div class="cont_t">';
	strHtml += '<span>维保时间：</span>';
	strHtml += '<span>'+todayTimeS()+'</span>';
	strHtml += '</div>';
	strHtml += '</div>';
	strHtml += '</div>';
	strHtml += '<div class="vertbar"></div>';
	strHtml += '</li>';
	$(".SignMaintence ul").prepend(strHtml);
}
function getSomeOfMyVal() {
    return myplace + "+" + mycity;
}
function getGeolocation() {
    geolocation.getCurrentPosition();
}
function getLocation (address) {
    $.ajax({
        url: 'https://restapi.amap.com/v3/geocode/geo',
        type: 'get',
        dataType: 'jsonp',
        async:false,
        data:{
        	key: '8ac014ef1b6af3fe65696391d69c5b32',
        	address: address
        },
        success: function (data) {
            //console.log(data.geocodes[0].location)//获取到的经纬度
            positionTel = data.geocodes[0].location;
            $("#postionPC").val(positionTel)
        }
    })
}
