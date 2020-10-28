var userjson =localStorage.getItem('userjsonpeople');
var UsreJson = JSON.parse(userjson);
//console.log(UsreJson);
var UserId = UsreJson[0].UserId;
var DeptId = UsreJson[0].DeptId;
var UserName = UsreJson[0].UserName;
//var scroll = true;//当备案列表没有内容的时候，就不要再刷新了
var pagesize = 10;
var page = 1;
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
			Type:'',//1、执法者；2、系统内经营单位；3、系统外经营单位
			SearchContent: UserId,//当Type=1，SearchId=UserId;当Type=2，SearchId=经营单位DeptId;3、系统外检查单位的名称
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
                    str +="<div style='width:50%;color:#26a4f6;margin-top:0.5rem;text-align:left;' onclick='Gomylist(1,\""+json[index].UserId+"\");'>"+json[index].UserName+"</div>";
                    str +="<div style='width:35%;color:#999999;'>"+allTimeChange(json[index].InspectTime)+"</div></div>";
                    str +="<p class='Checklistli_topp' style='margin:0 auto;margin-top:0.5rem;'><img src='img1/shangcheng.png'/><span style='color:#26a4f6;'>"+json[index].InspectedCtext+"</span></p>";
                    if(json[index].CheckContent != ''){
                    	str +="<p class='Checklistli_topp' style='margin-top:0.5rem;'>"+json[index].CheckContent+"</p>";
                    }
                    str +="<p class='Checklistli_topp' style='margin:0 auto;'><span style='color:#00baad' class='ctextContent' onclick='ctextContent(\""+json[index].ID+"\",\""+json[index].TableSort+"\",\""+json[index].IsNewRecord+"\");'>全文</span></p>";
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
                    str +="<span class='Checklistli_addrspan' id='"+page+(index+1)+"'>. .</span>";
                    if(json[index].UserId == UserId){//本人登录删除本人评论                            
                        str +="<div class='Checklistli_list' id='addrspanlist"+page+(index+1)+"' style='width:70% !important;'>";
                        if(json[index].LaudList != null){
                            if(json[index].LaudList[0].IsLaud == 0){//没有点赞
	                            str +="<div id='zanlist"+page+(index+1)+"' IndexFlag='1' onclick='Laud(\""+json[index].ID+"\",\""+page+(index+1)+"\",this)' style='width:33%;'><img src='img1/aixin.png' style='padding-top:0.1rem;'/><div>赞</div></div>";
	                        }else{
	                            str +="<div id='zanlist"+page+(index+1)+"' IndexFlag='0' onclick='Laud(\""+json[index].ID+"\",\""+page+(index+1)+"\",this)' style='width:33%;'><img src='img1/aixin.png' style='padding-top:0.1rem;'/><div>取消</div></div>";
	                        }  
                        }else{
                            str +="<div id='zanlist"+page+(index+1)+"' IndexFlag='1' onclick='Laud(\""+json[index].ID+"\",\""+page+(index+1)+"\",this)' style='width:33%;'><img src='img1/aixin.png' style='padding-top:0.1rem;'/><div>赞</div></div>";
                        }                                         
                        str +="<div onclick='ping(\""+json[index].ID+"\",\""+''+"\",\""+page+(index+1)+"\")' style='width:33%;'><img src='img1/xiaokuang.png' style='padding-top:0.15rem;'/><div>评论</div></div>";
                        str +="<div onclick='Deltes(\""+json[index].ID+"\",\""+page+(index+1)+"\")' style='width:33%;float:right;'><img src='img1/delets.png'/><div>删除</div></div>";
                        str +="</div></div>";
                    }else{
                    	str +="<div class='Checklistli_list' id='addrspanlist"+page+(index+1)+"'>";
                        if(json[index].LaudList != null){
                            if(json[index].LaudList[0].IsLaud == 0){//没有点赞
	                            str +="<div id='zanlist"+page+(index+1)+"' IndexFlag='1' onclick='Laud(\""+json[index].ID+"\",\""+page+(index+1)+"\",this)'><img src='img1/aixin.png' style='padding-top:0.1rem;'/><div>赞</div></div>";
		                    }else{
		                        str +="<div id='zanlist"+page+(index+1)+"' IndexFlag='0' onclick='Laud(\""+json[index].ID+"\",\""+page+(index+1)+"\",this)'><img src='img1/aixin.png' style='padding-top:0.1rem;'/><div>取消</div></div>";
		                    }  
                        }else{
                            str +="<div id='zanlist"+page+(index+1)+"' IndexFlag='1' onclick='Laud(\""+json[index].ID+"\",\""+page+(index+1)+"\",this)'><img src='img1/aixin.png' style='padding-top:0.1rem;'/><div>赞</div></div>";
                        }                                         
                        str +="<div onclick='ping(\""+json[index].ID+"\",\""+''+"\",\""+page+(index+1)+"\")'><img src='img1/xiaokuang.png' style='padding-top:0.2rem;'/><div>评论</div></div>";
                        str +="</div></div>";
                    }
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
                        			str +="<p id='commentid' onclick='ping(\""+json[index].ID+"\",\""+arrlist[i].UserId+"\",\""+page+(index+1)+"\")'><span>"+arrlist[i].CommentUserName+"：</span><span style='color:#151515;'>"+arrlist[i].RecordContent+"</span></p>";
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
//点击进入当前商家检查列表
function Gomylist(types, userids){
	window.location.href='Checkmylist.html?type=1&userids='+userids;
}

//点击删除按钮
function Deltes(ids, num){
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
//			console.log(jsons);
//		    if(jsons.code == 200){
		      $('#ckecklistlis'+num).remove();
//		    }else{
//		      alert('删除失败！');
//		    }
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

//点赞和取消赞
function Laud(ids,num, _this){
	var IsAdd = $(_this).attr('IndexFlag');
//	$(_this).removeAttr("onclick");
	$.ajax({
			url: contextUrl+"/ExternalInfo.svc/AddOrDeleteLawerCheckLaud",
			data:JSON.stringify({
				ID: ids,//巡查记录ID
				IsAdd: IsAdd,//1:新增；0：取消
				UserId: UserId,
			}),
			type: "POST",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			beforeSend: function(XMLHttpRequest){
				$("#loading").css('display','block');
			},
			success: function(data) {				
				var jsons= JSON.parse(data);
//				console.log(jsons);
                if(jsons.code == 200){
                	if(IsAdd == 1){//新增                		
                		if($('#dianzanlist'+num).parent().css('display') == 'none'){
                			$('#dianzanlist'+num).parent().show();
                			$('#dianzanlist'+num).parent().parent().show();
                		}
                		$('#dianzanlist'+num).html(jsons.data[0].UserIdName);
                		$('#zanlist'+num).children('div').html('取消');
                		$('#zanlist'+num).attr('IndexFlag',0);
//              		$('#zanlist'+num).click(function(){
//              			Laud(ids,0,num,_this);
//              		});
                	}else{//取消
                		if(jsons.data != ''){
                			$('#dianzanlist'+num).html(jsons.data[0].UserIdName);
                		}else{
                			$('#dianzanlist'+num).parent().hide();   
                			$('#dianzanlist'+num).html('');
                			if($('#lunlist'+num).css('display') == 'none'){//没有评论
                				$('#dianzanlist'+num).parent().parent().hide();
                			}               			
                		}               		
                		$('#zanlist'+num).children('div').html('赞');
                        $('#zanlist'+num).attr('IndexFlag',1);
//              		$('#zanlist'+num).click(function(){
//              			Laud(ids,1,num,_this);
//              		});
                	}
                }
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

//新增或删除评论
function ping(ids, UserIds, num){
	$('#listinput input').val("");
	$('#listinput').show();
	$('#listinput input').focus();
	$('#sendbtn').attr('ids',ids);
	$('#sendbtn').attr('UserIds',UserIds);
	$('#sendbtn').attr('num',num);
}

$('#sendbtn').click(function(e){
	   var ids = $('#sendbtn').attr('ids');
	   var UserIds = $('#sendbtn').attr('UserIds');
	   var num = $('#sendbtn').attr('num');
//	   console.log(ids);console.log(UserIds);console.log(num);
       CheckConment(ids, UserIds, num);
       e.preventDefault();
});	

//评论和回复接口
function CheckConment(ids, UserIds, num){
	var RecordContent = $('#listinput input').val();
//	console.log(ids);console.log(UserIds);console.log(UserId);console.log(RecordContent);
	if(RecordContent != ''){
			$.ajax({
				url: contextUrl+"/ExternalInfo.svc/AddOrDeleteLawerCheckConment",
				data:JSON.stringify({
					ID: ids,//巡查记录ID
					IsAdd: '1',//1:新增；0：取消
					ConmentId:'',//评论ID
					RecordContent:RecordContent,//评论内容
					UserId: UserId,//用户登陆Id
					RepayUserId: UserIds,//回复人（非必传项，如果为回复，传回复人UserId）
				}),
				type: "POST",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				beforeSend: function(XMLHttpRequest){
					$("#loading").css('display','block');
				},
				success: function(data) {	
					var jsons= JSON.parse(data);
					//console.log(jsons);
		            if(jsons.code == 200){
		            	if($('#lunlist'+num).css('display') == 'none'){
	                    	$('#lunlist'+num).show();
	                    }
	                    $('#lunlist'+num).parent().show();	                    
	                    var Commentlist = jsons.data,str='';
                        for(var i=0;i<jsons.data.length;i++){
                            if(Commentlist[i].ReplayUserName == ''){//是评论
                            	if(Commentlist[i].UserId != UserId){//不可回复本人的评论
                                   str +="<p id='commentid' onclick='ping(\""+ids+"\",\""+Commentlist[i].UserId+"\")'><span>"+Commentlist[i].CommentUserName+"：</span><span style='color:#151515;'>"+Commentlist[i].RecordContent+"</span></p>";
                                }else{
                               	   str +="<p><span>"+Commentlist[i].CommentUserName+"：</span><span style='color:#151515;'>"+Commentlist[i].RecordContent+"</span></p>";
                                }
                            }else{//是回复
                                str +="<p><span>"+Commentlist[i].CommentUserName+"<span style='color:#151515;'>回复</span>"+Commentlist[i].ReplayUserName+"：</span><span style='color:#151515;'>"+Commentlist[i].RecordContent+"</span></p>";
                            }                                	
                        } 
                        $('#lunlist'+num).html(str);
		            }
		            $('#listinput').hide();
		            $('#listinput input').val("");	                
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

//禁止微信touchmove冲突
document.addEventListener('touchmove', function (e) {	
    $(".Checklistli_list").hide();
    $('#listinput').hide();　　　　　　　　
    $('#listinput input').val("");
    e.preventDefault();
}, false);

//我要巡查
$("#xunchabtn").click(function(){
	window.location.href='goPatrol.html';
})
//全文
function ctextContent(ID,TableSort,IsNewRecord){
	window.location.href='goPatrolShow.html?ID='+ID+"&TableSort="+TableSort+"&IsNewRecord="+IsNewRecord;
}
