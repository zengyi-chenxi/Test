var userjson =localStorage.getItem('userjsonpeople');
var UsreJson = JSON.parse(userjson);
//console.log(UsreJson);
var UserId = UsreJson[0].UserId;
var DeptId = UsreJson[0].DeptId;
var UserName = UsreJson[0].UserName;
//var scroll = true;//当备案列表没有内容的时候，就不要再刷新了
var pagesize = 10;
var page = 1;
var Request=new UrlSearch(); //实例化
var Types=Request.type;
var Userids = Request.userids;

$(function(){
	OnLoad();
})
//加载巡查列表
function OnLoad(){
	$.ajax({
		url:contextUrl+"/ExternalInfo.svc/GetNetInspectRecordList?ran="+Math.random(),
		timeout: 30000, //超时时间设置，单位毫秒
		data:{//传递参数
			UserId: UserId,
			DeptId: DeptId,
			Type: Types,//1、执法者；2、系统内经营单位；3、系统外经营单位
			SearchContent: Userids,//当Type=1，SearchId=UserId;当Type=2，SearchId=经营单位DeptId;3、系统外检查单位的名称
			page: page,
			pageSize: pagesize,						
		},
		type: "GET",		
		cache:false,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		beforeSend:function(XMLHttpRequest){ 
			$('#loading').addClass('hover'); //在后台返回success之前显示loading图标
		}, 
		success: function(data) {
			if (data != '') {  
                var json = JSON.parse(data).data;
			    //console.log(json);
				var str = "";
				$.each(json, function(index,arr) {	
					str +="<li id='ckecklistlis"+page+(index+1)+"'><div class='Checklistli_top'>";
					if(json[index].HeadPhotoPath !=''){
						str +="<div class='Checklistli_topone' style='width:15%;'><img src='"+json[index].HeadPhotoPath+"' /></div>";
					}else{
						str +="<div class='Checklistli_topone' style='width:15%;'><img src='img1/yh-tx.png' /></div>";
					}
                    str +="<div style='width:50%;color:#26a4f6;margin-top:0.5rem;text-align:left;'>"+json[index].UserName+"</div>";
                    str +="<div style='width:35%;color:#999999;'>"+allTimeChange(json[index].InspectTime)+"</div></div>";
                    str +="<p class='Checklistli_topp' style='margin:0 auto;margin-top:0.5rem;'><img src='img1/shangcheng.png'/><span style='color:#26a4f6;'>"+json[index].InspectedCtext+"</span></p>";
                    if(json[index].CheckContent!=""){
                    	str +="<p class='Checklistli_topp' style='margin-top:0.5rem;'>"+json[index].CheckContent+"</p>";
                    }
                    str +="<p class='Checklistli_topp' style='margin:0 auto;'><span style='color:#00baad' onclick='GetContent(\""+json[index].ID+"\",\""+json[index].TableSort+"\",\""+json[index].IsNewRecord+"\")'>全文</span></p>";
                    if(json[index].ContentPhotoPath !=''){
                    	str +="<div class='Checklistli_middle'><div class='my-gallery' data-pswp-uid='"+page+(index+1)+"'>";           	
                    	var arrs = json[index].ContentPhotoPath.split(',');
                        for(var i=0;i<json[index].ContentPhotoPath.split(',').length;i++){
                        	str +="<figure><div><a href='"+arrs[i]+"' data-size='1600x1600'><img src='"+arrs[i]+"'></a></div></figure>";
                        }
                        str +="</div></div>";
                    }
                    str +="<div class='Checklistli_addr' style='position:relative;'><img class='Checklistli_addrimg' src='img1/addr.png'/>";                            
                    str +="<div class='Checklistli_addrdiv'>"+json[index].UploadSite+"</div>";
                    if(json[index].UserId == UserId){//登录人只能删除自己评论的
                    	str +="<span class='Checklistli_addrspan' id='"+page+(index+1)+"'>. .</span>";
                    }
                    str +="<div class='Checklistli_list' id='addrspanlist"+page+(index+1)+"' style='width:30% !important;'>";
                    str +="<div onclick='Deltes(\""+json[index].ID+"\",\""+page+(index+1)+"\",\""+json[index].UserId+"\")' style='width:80%;padding-left:18%;'><img src='img1/delets.png'/><div>删除</div></div>";
                    str +="</div></div>";
                    if(json[index].LaudList != null || json[index].LawerCommentList != null){
                    	str +="<div class='Checklistli_bottm' style='background:#e5e9ec;font-size:1rem;display:block;'>";
                    }else{
                    	str +="<div class='Checklistli_bottm' style='background:#e5e9ec;font-size:1rem;display:none;'>";
                    }
                    if(json[index].LaudList != null){//点赞不为空
                    	str +="<div class='Checklistli_bottmzan'><img src='img1/xiaoxin.png'/>";
                        str +="<span id='dianzanlist"+page+(index+1)+"'>"+json[index].LaudList[0].UserIdName+"</span>";
                        str +="</div>"
                    }else{
                    	str +="<div class='Checklistli_bottmzan' style='display:none;'><img src='img1/xiaoxin.png'/>";
                        str +="<span id='dianzanlist"+page+(index+1)+"'></span>";
                        str +="</div>"
                    }                            
                    if(json[index].LawerCommentList != null){//评论不为空
                    	str +="<div class='Checklistli_bottmlun' id='lunlist"+page+(index+1)+"' style='display:block;'>";
                    	var arrlist = json[index].LawerCommentList;
                        for(var i=0;i<json[index].LawerCommentList.length;i++){
                        	if(arrlist[i].ReplayUserName == ''){//是评论
                        		if(arrlist[i].UserId != UserId){//不可回复本人的评论
                        			str +="<p id='commentid'><span>"+arrlist[i].CommentUserName+"：</span><span style='color:#151515;'>"+arrlist[i].RecordContent+"</span></p>";
                        		}else{
                        			str +="<p><span>"+arrlist[i].CommentUserName+"：</span><span style='color:#151515;'>"+arrlist[i].RecordContent+"</span></p>";
                        		}                           		
                        	}else{//是回复
                        		str +="<p><span>"+arrlist[i].CommentUserName+"<span style='color:#151515;'>回复</span>"+arrlist[i].ReplayUserName+"：</span><span style='color:#151515;'>"+arrlist[i].RecordContent+"</span></p>";
                        	}                                	
                        }                                
                    }else{
                    	str +="<div class='Checklistli_bottmlun' id='lunlist"+page+(index+1)+"' style='display:none;'>";
                    	str +="<p><span></span><span style='color:#151515;'></span></p>";
                    }
                    str +="</div></div>";
                    str +="</li>";					
				});
				$("#Checklist").append(str);
				initPhotoSwipeFromDOM('.my-gallery');//初始化图片放大
				if(json.length < pagesize){
					document.getElementById("pullUp").innerHTML = "<span class='pullUpIcon'></span><span class='pullUpLabel'>没有更多信息...</span>";
				}
				$(".Checklistli_addrspan").click(function(e){
                	var ids = $(this).attr('id');
                	$(".Checklistli_list").hide();
					$('#addrspanlist'+ids).show();
			    });
			}else{
				document.getElementById("pullUp").innerHTML = "<span class='pullUpIcon'></span><span class='pullUpLabel'>没有更多信息...</span>";
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert("网络延迟,请稍后再试！");
		},
		complete: function(XMLHttpRequest, textStatus){
			$("#loading").removeClass("hover");
		}
	});
		
}

//点击删除按钮
function Deltes(ids, num, UserIds){
	if(UserIds == UserId){
		$.ajax({
			url: contextUrl+"/ExternalInfo.svc/DelNetInspectRecordInfoByID",
			data:JSON.stringify({
				ID: ids,//巡查记录ID
				UserId: UserId,//用户登陆Id
			}),
			type: "POST",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			beforeSend: function(XMLHttpRequest){
				$("#loading").css('display','block');
			},
			success: function(data) {
				var jsons= JSON.parse(data);
//				console.log(jsons)
//			    if(jsons.code == 200){
			      $('#ckecklistlis'+num).remove();
//			    }else{
//			      alert('删除失败！');
//			    }
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				alert("网络延迟,请稍后再试！");
			},
			complete:function(XMLHttpRequest, textStatus){
				$("#loading").css('display','none');
				if (textStatus == 'timeout') {
					alert("网络延迟,请稍后再试！");
				}
			}
		});	
	}
}



//获取到部门id
function UrlSearch(){
	var name,value; 
	var str=location.href; //取得整个地址栏
	var num=str.indexOf("?") 
	str=str.substr(num+1); //取得所有参数
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

//点击全文
function GetContent(ID,TableSort,IsNewRecord){
	window.location.href='goPatrolShow.html?ID='+ID+"&TableSort="+TableSort+"&IsNewRecord="+IsNewRecord;
}

//禁止微信touchmove冲突
document.addEventListener('touchmove', function (e) {	
    $(".Checklistli_list").hide();
    $('#listinput').hide();　　　　　　　　
    $('#listinput input').val("");
    e.preventDefault();
}, false);

