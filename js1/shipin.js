var DeptId, player, channelName;
//获取地址栏参数
function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return unescape(r[2]);
   	return null;
}

$(function() {
	DeptId = GetQueryString('DeptId');
	channelName = GetQueryString('channelName');
	Onload(DeptId,channelName);
})

//绑定视频信息----实时监控
function Onload(keyid, channelName){
		$.ajax({
            url:contextUrl+"/ExternalInfo.svc/IPCVideoInfoToPublic",
            data:JSON.stringify({	
				DeptId: keyid,
			}),
			type: "POST",
	        contentType:'application/json; charset=utf-8',
	        dataType: "json", 
			success: function(data) {
				var json = JSON.parse(data);
				console.log(json);
				var str = '';
				if(json.data == "" || json.data == null){
					$("#video1").html("<img src='img1/timg2.gif' style='width:100%'/>");
					$(".stopKg").css("display", "block");
					alert('此单位还没有开通视频！');
                }else{
                	$('#video1').css('display','none');
		            $('#video2').css('display','block');
                	$('#ctext').html(json.data[0].Ctext);
					$.each(json.data,function(index,items){
						str +="<div class='monitoring_item'>";
						str +="<a href='#' style='display:block;' class='changeClick' id='"+json.data[index].VideoDeviceId+"' onclick='changeVideo(\""+json.data[index].VideoDeviceId+"\",this)'>";
						if(index == channelName){
							str = str + "<div class='spKg' style='border:1px solid #1FD3B3;'>";
						}else{
							str = str + "<div class='spKg'>";
						}
						if(json.data[index].ChannelPhotoPath !=''){
							str+="<img class='healthvideoimg' src='"+json.data[index].ChannelPhotoPath+"'/>";
							str+="<span style='position:absolute;left:30%;top:30%;width:30%;height:auto;background:transparent;'>";
							str+="<img class='healthvideoimg1' src='img1/play.png'/></span>";
						}else{
							str+="<img class='healthvideoimg' src='img1/no-shipin.png'/>";							
						}	
						if(json.data[index].IsState=='True'){//在线
							str = str + "<span>在线</span>";
						}else{//离线
							str = str + "<span>离线</span>";
						}						
						str = str + "</div>"
						str = str + "<p style='margin-top:5px;'>" + json.data[index].ChannelName + "</p>";					
						str = str + "</a>";
						str = str + "</div>";	
					})
	                if (json.data.length == 3) {
						$("#monitoring").addClass("_flex");
					}else{
						$("#monitoring").removeClass("_flex");
					}
	  				$("#monitoring").append(str);
	  				//初始化视频
	  				player = new TcPlayer('video', {
						"m3u8":json.data[channelName].VideoDeviceId, //请替换成实际可用的播放地址
						"autoplay" : true,      //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
						"poster" : "img1/timg2.gif",
						"width" :  '100%',//视频的显示宽度，请尽量使用视频分辨率宽度
						"height" : '100%'//视频的显示高度，请尽量使用视频分辨率高度
					});
                }
			}
		});	
}
//切换视频播放
function changeVideo(videoUrl, _this) {
		$(_this).children(".spKg").css("border", "1px solid #1FD3B3").parent().parent().siblings().children().children(".spKg").css("border", "none");
		$('.dvideo_img').css('display','none'); 
		$("#video2 p").empty();
		$("#video2 p").html($(_this).children("p").html());
        player.destroy();
		player = new TcPlayer('video', {
				"m3u8":videoUrl, //请替换成实际可用的播放地址
				"autoplay" : true,      //iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
				"poster" : "img1/timg2.gif",
				"width" :  '100%',//视频的显示宽度，请尽量使用视频分辨率宽度
				"height" : '100%'//视频的显示高度，请尽量使用视频分辨率高度
		});       
		$(".stopKg").css("display", "none");
}
