var str = "", tabnum=0, nums=60, clock='', btn;

//tab切换
$('.account_tab div').click(function() {
    var i = $(this).index();//下标第一种写法
    tabnum = i;
    $(this).addClass('account_tabzhong').siblings().removeClass('account_tabzhong');
    $("#passwordmes").html("").css("display", 'none !important');
    $('.account_tablist .account_tablistcon').eq(i).show().siblings().hide();

});


//显示和隐藏密码	
var demoInput = document.getElementById("password");
function CanLook(){
	if(demoInput.type == "password"){
		demoInput.type = "text";
		showhiden.src = "img1/show.png";
		showhiden.style.marginTop ='15px';
	}else{
		demoInput.type = "password";
		showhiden.src = "img1/hidden.png";
		showhiden.style.marginTop ='20px';
	}
}	

//验证账号
function CheckUserName(){
	$("#passwordmes").html("").css("display", 'none !important');
}
//验证密码
function CheckPwd(){
	$("#passwordmes").html("").css("display", 'none !important');
}



$(".del_icon").hide();
$(".del_icon").click(function(){
	$(this).parent().find('input').val('');
    $(this).hide();
})
$("#loginname").focus(function(){
	$(this).parent().children(".del_icon").show();
});
$("#loginname").blur(function(){
    if($(this).val()==''){
		$(this).parent().children(".del_icon").hide();
	}
});

$("#loginphone").focus(function(){
	$(this).parent().children(".del_icon").show();
});
$("#loginphone").blur(function(){
    if($(this).val()==''){
		$(this).parent().children(".del_icon").hide();
	}
});
//验证是否是有效手机号
function isPhoneAvailable(phonevalue){
	var phoneReg = /^1[3-5789]\d{9}$/;
    if(phoneReg.test(phonevalue)){
        return true;
    }else{
        return false;
    }
}

//发送短信验证码
function Getcode(thisBtn){
	if($('#loginphone').val()==''){
	    alert('请输入手机号！');
	    return false;
	}else{
	    if(isPhoneAvailable($('#loginphone').val()) == false){
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
						phonenum:$('#loginphone').val(),
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

//点击登录
function Login(){
	var loginname,pword; 	
	if(tabnum == 0){//账户密码登录
		loginname = $("#loginname").val();
		pword = $("#password").val();
		if(loginname == "" || pword == "") {
			$("#passwordmes").html("");
			$("#passwordmes").append("账号或密码不可为空。");
			$("#passwordmes").css('display','block')
			return false;
		}
		logns(loginname, pword, tabnum);
	}else if(tabnum == 1){//手机号登录
		loginname = $("#loginphone").val();
		pword = $("#Phonecode").val();
		if(loginname == "" || pword == "") {
			$("#passwordmes").html("");
			$("#passwordmes").append("手机号或验证码不可为空。");
			$("#passwordmes").css('display','block')
			return false;
		}
		if(isPhoneAvailable(loginname) == false){
			alert('请输入有效手机号！')
			return false;
		}
		Checkcode(loginname, pword, tabnum);
	}  
}

function Checkcode(loginname, pword, tabnum){
	if($('#loginphone').val()==''){
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
				Phonenum:loginname,
				VerificationCode:pword,
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
			        	logns(loginname, '', tabnum);		        		
			        }
			    }else{
			        alert('验证失败！');
			    }
			},
	});
}

function logns(loginname, pword, tabnum){
	$.ajax({
			url: contextUrl+"/ExternalInfo.svc/getLoginUserToSiYuan",
			timeout : 30000, //超时时间设置，单位毫秒
			data: {
				LoginName: loginname,//用户名
				PWord: pword, //密码
				IsUser:tabnum,//登录标志 0 用户登录 1 手机号登录
			},
            type: "GET",
			contentType: 'application/json;charset=utf-8',
			dataType: "json",
			beforeSend:function(XMLHttpRequest){ 
				$('#loading').addClass('hover'); //在后台返回success之前显示loading图标
			}, 
			success: function(data) { 
				var jsons = JSON.parse(data);
				console.log(jsons);
				if(jsons.code == 500) {
                    alert(jsons.msg);
				}else if(jsons.code == 505){
					alert(jsons.msg);
					window.location.href="eleaccountphone.html?UserId="+loginname;
				}else if(jsons.code == 200){
					//查询成功保存信息
					var str = JSON.stringify(jsons.data);
					console.log(str)
					localStorage.setItem("userjsonpeople", str);
					window.location.href="elecPage/maintenceRecord.html";
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				alert("网络延迟,请稍后再试！");
			},
			complete:function(XMLHttpRequest, textStatus) {
				$("#loading").removeClass("hover"); 
				if(textStatus=='timeout'){
					alert("网络延迟,请稍后再试！");
				}
			}
	})

}
