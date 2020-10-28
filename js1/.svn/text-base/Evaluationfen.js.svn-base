        $("#content").val("");
		scoreFun($("#starttwo"), {
			fen_d: 20, //每一个a的宽度
			ScoreGrade: 5 //a的个数5
		});
		scoreFun($("#starttwo1"), {
			fen_d: 20, //每一个a的宽度
			ScoreGrade: 5 //a的个数5
		});
		scoreFun($("#starttwo2"), {
			fen_d: 20, //每一个a的宽度
			ScoreGrade: 5 //a的个数5
		});
		
		//匿名评价选择
		var flag = true,clock = '',nums = 60,btn,btn1;
		function changeIcon(){
			if (flag) {
				$("#pj_icon").css({"background":"url(img1/select1.png) no-repeat", "background-size": "100%"});
				flag = false;
			}else{
				$("#pj_icon").css({"background": "url(img1/no_select.png) no-repeat", "background-size": "100%"});
				flag = true;
			}
		}		
		function UrlSearch() {
			var name,value; 
			var str=decodeURI(decodeURI(location.search));
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
		//找出userid
		var Request=new UrlSearch(); //实例化
		var Keyid=Request.Keyid;
//		console.log(Request.Ctext)
		$("#sh-name").html(Request.Ctext);
		
		var EvalPj;
		EvalPj = '0';
		$(".dz_sc_list").click(function(){
			EvalPj = $(this).attr("data-id");
			if (EvalPj == '0') {
				$(this).children().children("i").css({"background":"url(img1/good-light.png) no-repeat", "background-size": "100%"});
				$(this).next().children().children("i").css({"background":"url(img1/middle.png) no-repeat", "background-size": "100%"});
				$(this).next().next().children().children("i").css({"background":"url(img1/poor.png) no-repeat", "background-size": "100%"});
			}else if (EvalPj == '1') {
				$(this).children().children("i").css({"background":"url(img1/middle-light.png) no-repeat", "background-size": "100%"});
				$(this).prev().children().children("i").css({"background":"url(img1/good.png) no-repeat", "background-size": "100%"});
				$(this).next().children().children("i").css({"background":"url(img1/poor.png) no-repeat", "background-size": "100%"});
			}else{
				$(this).children().children("i").css({"background":"url(img1/poor-light.png) no-repeat", "background-size": "100%"});
				$(this).prev().children().children("i").css({"background":"url(img1/middle.png) no-repeat", "background-size": "100%"});
				$(this).prev().prev().children().children("i").css({"background":"url(img1/good.png) no-repeat", "background-size": "100%"});
			}
			
		})		
		$('.Evalcodealertclose img').click(function(){
			$('#Phonenum').val('');
			$('#Evalalert').css('display','none');
		})
		//点击提交评论
		function goUp(thisB) {
			//判读评论
			if($("#content").val() == "") {
				alert("请填写评论!");
				return false;
			}
			if ($("#areascore").text() == '' || $("#foodscore").text() == '' || $("#servicescore").text() == '') {
				alert("请打分!");
				return false;
			}
			if( flag == true ){//只是评价
                $('#Evalalert').css('display','none');
                btn1 = thisB;
				btn1.disabled = true; //将按钮置为不可点击
				submits(EvalPj,GetAM());				
			}else{//投诉举报
				btn1 = thisB;
				$('#Evalalert').css('display','block');				
			}
		}	    
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
	    function Getcode(thisBtn){// 发送短信验证码
	    	if($('#Phonenum').val()==''){
	    		alert('请输入手机号！');
	    		return false;
	    	}else{
	    		if(isNumber($('#Phonenum').val()) == false){
	    			alert('请输入正确的手机号！');
	    			return false;
	    		}else{
	    			if($('#Phonenumber').val() == '获取验证码'){
	    				 btn = thisBtn;
						 btn.disabled = true; //将按钮置为不可点击
						 btn.value = nums+'s';
						 clock = setInterval(doLoop, 1000); //一秒执行一次
	                     $.ajax({
								url: contextUrl+"/ExternalInfo.svc/SendMessage",
								timeout : 30000, //超时时间设置，单位毫秒
								data: {	
									phonenum:$('#Phonenum').val(),
								},
								type: "GET",
								cache:false,
						        contentType:'application/json; charset=utf-8',
						        dataType: "json", 
						        success: function(result){},
						 });
	    			}
	    		}
	    	}	
	    }
	    function doLoop(){
		    nums--;
		    if(nums > 0){
			   btn.value = nums+'s';
		    }else{
			   clearInterval(clock); //清除js定时器
			   btn.disabled = false;
			   btn.value = '获取验证码';
			   nums = 60; //重置时间
			}
		 }
	    $('.Evalcodealertlibutton').click(function(){//判断验证码是否合法
	    	if($('#Phonenum').val()==''){
	    		alert('请输入手机号！');
	    		return false;
	    	}
	    	if($('#Phonecode').val()==''){
	    		alert('请输入验证码！');
	    		return false;
	    	}
	    	$.ajax({
				url: contextUrl+"/ExternalInfo.svc/CheckVerificationCode",
				timeout : 30000, //超时时间设置，单位毫秒
				data: {	
					Phonenum:$('#Phonenum').val(),
					VerificationCode:$('#Phonecode').val(),
				},
				type: "GET",
				cache:false,
				contentType:'application/json; charset=utf-8',
				dataType: "json", 
				success: function(result){ 	
			        var json =JSON.parse(result);
			        if(json.code == '200'){
			        	if(json.data[0].State == 2){//过期
			        		alert('验证码已过期，请重新获取！');
			        		return false;
			        	}else if(json.data[0].State == 3){//验证失败
			        		alert('验证码验证失败，请重新获取！');
			        		return false;
			        	}else if(json.data[0].State == 1){//正常可有通过
			        		$('#Evalalert').css('display','none');	
			        		btn1.disabled = true;
			        		submits(3,$('#Phonenum').val());			        		
			        	}
			        }else{
			        	alert('验证失败！');
			        }
			    },
			});
	    });
	    
	    function Batetopath(photourl){
	    	var paths;
	    	$.ajax({
				url: contextUrl+"/ExternalInfo.svc/ChannelPicPath",
				timeout : 30000,
				data:JSON.stringify({	
					DeptId:Keyid,
					Photo:photourl,
				}),
				type: "POST",
				cache:false,
				async:false,
				contentType:'application/json; charset=utf-8',
				dataType: "json", 
				success: function(result){	
			        $.ajax({
						url: contextUrl+"/ExternalInfo.svc/GetPicHeader",
						timeout : 30000,
						data:{},
						type: "GET",
						cache:false,
						async:false,
						contentType:'application/json; charset=utf-8',
						dataType: "json", 
						success: function(results){	
					        paths = results +'/'+ result;
					    },
					}); 
			    },
			});
			return paths;
	    }
	    
	    function submits(EvalPjs, Reply){//提交评价
	    	var photourl="",PhotoEvalPath=null;
			if ($(".img_tx").length > 0) {  //判断一个标签是否存在
                photourl = $('.xs figure').find("img").attr("src").split(",")[1];
                PhotoEvalPath = Batetopath(photourl);               
			}
//			alert(Keyid);alert(EvalPjs);alert($("#areascore").text());
//			alert($("#foodscore").text());alert($("#servicescore").text());
//			alert($("#content").val());alert(Reply);
//			alert(photourl);alert(PhotoEvalPath);			
			$.ajax({
				url: contextUrl+"/ExternalInfo.svc/SetComment",
				timeout : 30000, //超时时间设置，单位毫秒
			    data:JSON.stringify ({//传递参数
					Keyid: Keyid,//商家id
					EvalPj: EvalPjs, //评价等级 0好评 1中评 2差评 3投诉  
					Userid: '',
					S1: $("#areascore").text(),//环境评分
					S2: $("#foodscore").text(),//菜品评分
					S3: $("#servicescore").text(),//服务评分
					Content: $("#content").val(),//内容
					PhotoEvalPath:PhotoEvalPath,//上传图片地址
					Reply: Reply,//游客的ID(根据接口获得)，或投诉时的手机号码 APP上传空值		
				}),
			    contentType: 'application/json; charset=utf-8',
				type: "post",
				dataType: "json",
				success: function(data) {
	                btn1.disabled = false;
					var json = eval(data);
					if(json >0) {	                    
						alert("评论提交成功!");
                        window.location.href="Evaluationlist.html?Keyid="+Keyid+'&Ctext='+Request.Ctext;
					} else {
						alert("评论提交失败!");
						return false;
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
	                btn1.disabled = false;
					alert('网络延迟,请稍后再试！');
				},
				complete:function(XMLHttpRequest, textStatus) {
	                btn1.disabled = false;
					if(textStatus=='timeout'){//超时,status还有success,error等值的情况
						alert('网络延迟,请稍后再试！');
				　　　}
				}
			})
	    }
        
        
	    