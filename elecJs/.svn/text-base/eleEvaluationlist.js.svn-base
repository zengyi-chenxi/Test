	var scroll = true;//当备案列表没有内容的时候，就不要再刷新了
	var pagesize = 10;
	var page = 1;
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
	//找出keyid
	var Request=new UrlSearch(); //实例化
	var Keyid=Request.Keyid.split("#")[0];
	var Elenumber=Request.Elenumber.split("#")[0];
	$(function(){
		star(Keyid,Elenumber);
        $('.mui-scroll-wrapper').css('top',$('#st-kg').height()+10);        
	})
	//去评价
	function commentList() {
		window.location.href = 'eleEvaluationfen.html?Keyid='+ Keyid +'&Elenumber='+Elenumber+'&Ctext='+Request.Ctexts;
	}
	//获取好评度
	function star(Keyid,Elenumber){
		$.ajax({
			url: contextUrl+"/ExternalInfo.svc/GetElevatorEvalGoodAndCountStart",
			data: {
				DeptId: Keyid,
				ElevatorNumber:Elenumber,
			},
			type: "GET",
			cache:false,
	        contentType:'application/json; charset=utf-8',
	        dataType: "json",
			success: function(data) {
				var json = JSON.parse(data);
//				console.log(json);
				if (json[0].好评率 == '' && json[0].产品质量 == '' && json[0].卫生服务 == '' && json[0].维修服务 == '') {
					$("#good_score").html('0%');
					var str='', str1='', str2='';
					for (var i=0; i<5; i++) {
						str +="<span style='margin-right: 3px'><img src='../img1/no-start.png'/></span>";
						str1 +="<span style='margin-right: 3px'><img src='../img1/no-start.png'/></span>";
						str2 +="<span style='margin-right: 3px'><img src='../img1/no-start.png'/></span>";
					}
					$("#dish").html(str);
					$("#environment").html(str1);
					$("#service").html(str2);
				}else{
					$("#st-kg").css("display", "block");
					$("#good_score").html(json[0].好评率);
					var str='', str1='', str2='';
					for (var i=0; i<5; i++) {
						if (i<Number(json[0].产品质量)) {
							str +="<span style='margin-right: 3px'><img src='../img1/red-start.png'/></span>";
						}else{
							str +="<span style='margin-right: 3px'><img src='../img1/no-start.png'/></span>";
						}
						if (i<Number(json[0].维修服务)) {
							str1 +="<span style='margin-right: 3px'><img src='../img1/red-start.png'/></span>";
						}else{
							str1 +="<span style='margin-right: 3px'><img src='../img1/no-start.png'/></span>";
						}
						if (i<Number(json[0].卫生服务)) {
							str2 +="<span style='margin-right: 3px'><img src='../img1/red-start.png'/></span>";
						}else{
							str2 +="<span style='margin-right: 3px'><img src='../img1/no-start.png'/></span>";
						}
					}
					$("#dish").html(str);
					$("#environment").html(str1);
					$("#service").html(str2);
				}				
			},
			complete: function(XMLHttpRequest, textStatus){
				if (textStatus == 'timeout') {
					alert('网络延迟,请稍后再试！');
				}
			}
		});
	}

	function OnLoads(ul,self,pageNum){
        	var fragment = document.createDocumentFragment();
	        var li;
	        li = document.createElement('li');
			$.ajax({
				url: contextUrl+"/ExternalInfo.svc/GetElevatorCommentList",
				timeout: 30000, //超时时间设置，单位毫秒
				data:JSON.stringify ({//传递参数
					Keyid: Keyid,
					ElevatorNumber:Elenumber,
					EvalPj: '-1',//评价等级 -1:全部评价,0：好评，1：中评 2：差评，3 投诉
					Page: pageNum,
					PageSize: pagesize,				
				}),
				type: "POST",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(data) {
//					console.log(data)				
					if(data == ''){
					    self.endPullupToRefresh(true);
					}else{
						var json = JSON.parse(data);
						var str = "";
						$.each(json, function(index,arr) {
							str +="<li class='evalslist' style='width:90%;margin:0 auto;margin-bottom:2rem;' Fid='"+json[index].FID+"' collect='"+json[index].ReplyCount+"'>";
							str +="<div class='pj-content-top clearfix' Fid='"+json[index].FID+"' collect='"+json[index].ReplyCount+"'>";
							str +="<div class='pj-top-left pull-left'>";
							if (json[index].HeadPhoto != null && json[index].HeadPhoto != "" && json[index].HeadPhoto != "AA==") {
								str +="<div class='pj_toux'><img src=\"data:image/jpeg;base64," + json[index].HeadPhoto + "\" alt=''></div>";
							}else{
								str +="<div class='pj_toux'><img src='../img1/yh-tx.png' alt='' class='img-responsive center-block'></div>";
							}
							str +="</div>";
							str +="<div class='pj-top-right pull-left'>";
							if (json[index].UserName != '') {
								str +="<div><p class='yh-nickname' style='margin-bottom: 3px;margin-top:0;'>"+json[index].UserName+"</p><p class='pj-time'>"+json[index].DateEval+"</p></div>";
							}else{
								if(json[index].Reply != '' && json[index].Reply.length < 13){
									str +="<div><p class='yh-nickname' style='margin-bottom: 3px;margin-top:0;'>"+json[index].Reply.substring(0,4)+"*******</p><p class='pj-time'>"+json[index].DateEval+"</p></div>";
								}else{
									str +="<div><p class='yh-nickname' style='margin-bottom: 3px;margin-top:0;'>"+json[index].Reply+"</p><p class='pj-time'>"+json[index].DateEval+"</p></div>";
								}							
							}
							str +="<div class='pj-top-right-xx' style='margin:5px 0;'><div>"+json[index].Ctext+"</div></div>";
							if(json[index].PhotoEvalPath !=''){
								str +="<div style='width:100%;'><img src='"+json[index].PhotoEvalPath+"' style='width:5rem;'/></div>";
							}						
							str +="</div>";
							str +="</div>";
							str +="<div class='clearfix' style='margin:0 4.5rem;'>";
							if (json[index].LaudCount == 0) {
								str +="<div class='pj-content-bottom-btm pull-left pl-dzKg' style='margin-right: 6px;'><i class='dz-icon dz-icon"+json[index].FID+"'></i><span class='pl-dzc"+json[index].FID+"'>赞</span></div>";
							}else{
								str +="<div class='pj-content-bottom-btm pull-left pl-dzKg' style='margin-right: 6px;'><i class='dz-icon dz-icon"+json[index].FID+"'></i><span class='pl-dzc"+json[index].FID+"'>"+json[index].LaudCount+"</span></div>";
							}
							if (json[index].ReplyCount == 0) {
								str +="<div class='pj-content-bottom-btm pull-left Reply' Fid='"+json[index].FID+"' collect='"+json[index].ReplyCount+"'><i class='pl-icon'></i><span>评论</span></div>";
							}else{
								str +="<div class='pj-content-bottom-btm pull-left Reply' Fid='"+json[index].FID+"' collect='"+json[index].ReplyCount+"'><i class='pl-icon'></i><span>"+json[index].ReplyCount+"评论</span></div>";
							}											
							str +="</div>";						
							str +="</li>";	                            
						});
                        li.innerHTML=str;
	                    fragment.appendChild(li);
						ul.appendChild(fragment);//注意一定要插入使用appendChild，不是替换里面的数据用innerHTML,否则会出现没有文字提醒以及会出现很大的空白区
	                    self.endPullupToRefresh();
	                    if(pagesize == json.length){
	                        self.endPullupToRefresh(false);
	                    }else{
	                        self.endPullupToRefresh(true);
	                    }
					}
				},					
				error: function(XMLHttpRequest, textStatus, errorThrown){
					alert('网络延迟,请稍后再试！');
				},
				complete: function(XMLHttpRequest, textStatus) {
					if(textStatus=='timeout'){//超时,status还有success,error等值的情况
						alert('网络延迟,请稍后再试！');
					}
				}
			});		
	};
	
    //用mui的方式打开政策资讯详情页面	
	mui("#listnew").on('tap', '.evalslist', function() {
			//获取id 
			var fid = this.getAttribute("Fid");
			var collects = this.getAttribute("collect");
			var cnum;
			if($(".pl-dzc"+fid+"").html()=='有用'){
				cnum = Number(0);
			}else{
				cnum = Number($(".pl-dzc"+fid+"").html());
			}
		    //打开详情页面
			mui.openWindow({
				id: 'eleEvaluationDetail.html',
				url: 'eleEvaluationDetail.html?Fid='+fid+'&laud='+cnum+'&collect='+collects+'&Keyid='+Keyid,	
			});
	});


	
	