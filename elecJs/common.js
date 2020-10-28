//初始化设置页面方法参数
var contextUrl = "http://192.168.1.33:9003"; 
//http://49.234.203.131:11001   测试 库 http://36.7.154.150:12001  http://192.168.1.33:9003

function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return unescape(r[2]);
   	return null;
}

//验证是否为数字
function isNumber(value) {         
    var patrn = /^(-)?\d+(\.\d+)?$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}

//将时间2020/02/04 12:11:11转化为2020-02-04 12:11:11
function allTimeChange(time){
	var birthArr = time.split(" ")[0].split("/");
	var dayArr = time.split(" ")[1].split(":");
	var month = birthArr[1];
	var day = birthArr[2];
	var h = dayArr[0];
	var m = dayArr[1];
	var s = dayArr[2];	
	month < 10 ? month = "0" + month : month;
	day < 10 ? day = "0" + day : day;
	h < 10 ? h = "0" + h : h;
	var date = birthArr[0]+"-"+month+"-"+day+ " " + h + ":" + m + ":" + s;
	return date;
}


//时间转化2018/4/24 0:00:00转化为 2018-04-24 00:00:00
function allTimeChange1(time){
	var birthArr = time.split(" ")[0].split("/");
	var dayArr = time.split(" ")[1].split(":");
	var month = birthArr[1];// a < b ? return false : ''+ ':' 
	var day = birthArr[2];
	var h = dayArr[0];
	var m = dayArr[1];
	var s = dayArr[2];	
	month < 10 ? month = "0" + month : month;
	day < 10 ? day = "0" + day : day;
	var date = birthArr[0]+"-"+month+"-"+day+ " " + h + ":" + m + ":" + s;
	return date;
}
//验证是否是有效手机号
function isPhoneAvailable(phonevalue){
	var phoneReg = /^1[3-5789]\d{9}$/;
    if(phoneReg.test(phonevalue)){
        return true;
    }else{
        return false;
    }
}

//验证是否是有效国内电话号码(0511-4405222 或 021-87888822)
function istell(str){
	var result=str.match(/\d{3}-\d{8}|\d{4}-\d{7}/);
	if(result==null){
		return false;
	}else{
		return true;
	}
}

//验证是否是有效身份证号码
function IdentityCodeValid(code){ 
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var tip = "";
    var pass= true;
    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
        tip = "身份证号格式错误";
        pass = false;
    }else if(!city[code.substr(0,2)]){
        tip = "身份证号校验位错误";
        pass = false;
    }else{
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++){
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
                    tip = "身份证号校验位错误";
                    pass =false;
            }
        }
    }
    if(!pass) alert(tip);
    return pass;
}
