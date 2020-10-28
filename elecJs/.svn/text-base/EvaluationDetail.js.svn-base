	mui.back = function() {
		plus.webview.currentWebview().close();//关闭弹窗 
	}
    //获取到部门id
	function UrlSearch() {
		var name,value; 
		var str=location.href; //取得整个地址栏
		var num=str.indexOf("?") 
		str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
		var arr=str.split("&"); //各个参数放到数组里
		for(var i=0;i < arr.length;i++){ 
		    num=arr[i].indexOf("="); 
		    if(num>0){ 
			    name=arr[i].substring(0,num);
			    value=arr[i].substr(num+1);
			    this[name]=value;
		    } 
		} 
	} 
	var Request=new UrlSearch(); //实例化
	var Fid=Request.Fid;
	var LaudCount = Request.laud;
	var CollectCount;
	CollectCount = Request.collect;
//	console.log(Request);	
	$(function(){
		if(LaudCount=='NaN'){
			LaudCount='赞';
		}
		PjDetail(); //详情信息
		RList(); //回复列表
	})
    function PjDetail(){  
		$.ajax({			
			url: contextUrl+"/ExternalInfo.svc/EvalInfoByFid",
			timeout: 3000,
			data: {
				Fid: Fid,
			},
			type: "GET",
			cache:false,
	        contentType:'application/json; charset=utf-8',
	        dataType: "json", 
			success: function(result){
				var json = eval(result);
//				console.log(json);
                if (json[0].HeadPhotoPath != '' && json[0].HeadPhotoPath != 'AA==') {  //头像
					$("#dPj-tx").html("<img src='"+json[0].HeadPhotoPath+"' />");
				}else{
					$("#dPj-tx").html("<img src='../img1/yh-tx.png' />");
				}
				userNames = json[0].UserName;
				if (json[0].UserName != '') {//用户名
					$("#d-nickname").html(json[0].UserName);    
				}else{
					if(json[0].Reply != '' && json[0].Reply.length < 13){
						$("#d-nickname").html(json[0].Reply.substring(0,4)+"*******");
					}else{
						$("#d-nickname").html(json[0].Reply);
					}					 
				}
				if (json[0].PhotoEvalPath != '' && json[0].PhotoEvalPath != 'AA==') {
					var str = '';
//					$("#d-img").html("<li style='text-align:center;'><img src='"+json[0].PhotoEvalPath+"' style='width:65%;'/></li>");
				    str+="<li class='xs' style='width:50%;height:15rem;margin-left:25%;'>";
				    str+="<figure><div>";
				    str+="<a href='"+json[0].PhotoEvalPath+"' data-size='1600x1600'>";
				    str+="<img src='"+json[0].PhotoEvalPath+"' class='img_tx'/>";
				    str+="</a>";
				    str+="</div></figure>";
				    str+="</li>";
				    $("#d-img").html(str);
				}
				$("#d-time").html(json[0].DateEval);    //时间
				$("#d-pj-ctext").html(json[0].Ctext);    //评论内容
				$("#d-reply").css("display", "block");
				if (json[0].Reply != '') {
					$("#d-reply").html(json[0].Reply).attr("disabled", "disabled");
					$("#d-tijiao").css("display", "none");
				}else{
					$("#d-reply").removeAttr("disabled");
					$("#d-tijiao").css("display", "block");
				}	
				if (LaudCount != '0') {  //点赞数
					$("#dz-num").html(LaudCount);
				}
			},
			complete: function(XMLHttpRequest, textStatus){
				if (textStatus=='timeout') {
					alert('网络延迟,请稍后再试！');
				}
			}
		});
	}
	
	function RList(){   
		$.ajax({
			url: contextUrl+"/ExternalInfo.svc/GetReplyEvalList",
			data: {
				Fid: Fid,
			},
			type: "GET",
			cache:false,
	        contentType:'application/json; charset=utf-8',
	        dataType: "json",
			success: function(data) {
				if (data != ""){
					var json = eval(data);
//					console.log(json)				
					CollectCount = json.length;
					var str = '';
					$.each(json, function(index, items) {
						str +="<li style='margin-bottom:20px;'>";
						str +="<div class='other-reply-top clearfix'>";
						str +="<div class='other-reply-tx pull-left'>";
						if (items.HeadPhotoPath != '' && items.HeadPhotoPath !='AA==') {
							str +="<img src='"+items.HeadPhotoPath+"'/>";
						}else{
							str +="<img src='../img1/yh-tx.png'/>";
						}
						str +="</div>";
						str +="<div class='other-reply-xx pull-left'>";
						if(items.UserPurview=='2'){//执法者身份
							str +="<p class='other-reply-name' style='color:#319B83;'>"+items.UserName+"<span style='background:linear-gradient(to bottom,rgba(112,228,213,1),rgba(50,184,200,1));color:#fff;margin-left:5px;padding:1px 2px;border-radius:4px;'>监管者</span></p>";
						}else{
							str +="<p class='other-reply-name' style='color:#319B83;'>"+items.UserName+"</p>";
						}
						str +="<p class='other-reply-time'>"+items.DateReply+"</p>";
						str +="</div>";
						str +="</div>";
						str +="<div class='other-reply'>"+items.Ctext+"</div>";
						str +="</li>";
					});
					$("#other-reply-list").html(str);	
					if (CollectCount != 0) {
						$("#pl-num").html(CollectCount+'评论');
					}
				}else{
					$("#other-reply-list").html('暂无评论').css('text-align','center').css('marginTop','4rem').css('color','#D3D3D3').css('fontSize','1.5rem');
				}
			},
			complete: function(XMLHttpRequest, textStatus){
				if (textStatus=='timeout') {
					alert('网络延迟,请稍后再试！');
				}
			}
		});
	}
	










