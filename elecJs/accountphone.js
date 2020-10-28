//找出userid
var Request=new UrlSearch(); //实例化
var UserId=Request.UserId;
var btn, nums=60, clock='', strs='';


function UrlSearch(){
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

$(".clearBtn").hide();
$(".clearBtn").click(function(){
	$(this).parent().find('input').val('');
    $(this).hide();
})
$("#IdCard").focus(function(){
	$(this).parent().children(".clearBtn").show();
});
$("#IdCard").blur(function(){
	if($(this).val()==''){
		$(this).parent().children(".clearBtn").hide();
	}
});
$("#Idphone").focus(function(){
	$(this).parent().children(".clearBtn").show();
});
$("#Idphone").blur(function(){
	if($(this).val()==''){
		$(this).parent().children(".clearBtn").hide();
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
	if($('#Idphone').val()==''){
	    alert('请输入手机号！');
	    return false;
	}else{
	    if(isPhoneAvailable($('#Idphone').val()) == false){
	    	alert('请输入正确的手机号！');
	    	return false;
	    }else{
	    	if($('#Phonenumbertwo').val() == '获取验证码'){
	    		btn = thisBtn;
				btn.disabled = true; //将按钮置为不可点击
				btn.value = nums+'s';
				clock = setInterval(doLoop, 1000); //一秒执行一次
	            $.ajax({
					url: contextUrl+"/ExternalInfo.svc/SendMessage",
					timeout : 30000, //超时时间设置，单位毫秒
					data: {	
						phonenum:$('#Idphone').val(),
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
function logn(){
	var UserName,Phone,PWord; 	
	UserName = $("#IdCard").val();
	Phone = $("#Idphone").val();
	PWord = $("#passwordnew").val();
	if( UserName == ''){
		alert('请输入姓名');
		return false;
	}
	if( Phone == ''){
		alert('请输入手机号');
		return false;
	}else{
		if(isPhoneAvailable(Phone) == false){
			alert('请输入正确的手机号！');
			return false;
		}		
	}
	if( PWord == ''){
		alert('请输入新密码');
		return false;
	}
	$.ajax({
			url: contextUrl+"/ExternalInfo.svc/UpdateLoginUserToSiYuan",
			timeout : 30000, //超时时间设置，单位毫秒
			data: {
				UserName: UserName,//社区+姓名
				UserId: UserId, //用户名
				Phone: Phone,//手机号
				PWord: PWord,//密码
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
				}else if(jsons.code == 200){
					//查询成功保存信息
					strs = JSON.stringify(jsons.data);
//					console.log(strs)
					localStorage.setItem("userjsonpeople", strs);
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
