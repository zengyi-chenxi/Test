//营业执照、健康证上传
//上传头像图片
var imgLoadHtml;//当前点击input
function tcsc(me) {
	imgLoadHtml = me;
	var count= $(".img-list figure").length;
	/*if(count>2){
		alert("最多可上传三张图片");
		return;
	}*/
	$('.td').css('display', 'block');
}
function dis_td() {
	$('.td').css('display', 'none');
}
//拍照
function getImage() {
	var c = plus.camera.getCamera();
	c.captureImage(function(e) {
		plus.io.resolveLocalFileSystemURL(e, function(entry) {
			var s = entry.toLocalURL() + "?version=" + new Date().getTime();
			uploadHead(s); /*上传图片*/
		}, function(e) {
			console.log("读取拍照文件错误：" + e.message);
		});
	}, function(s) {
		console.log("error" + s);
	}, {
		filename: "_doc/head.png"
	})
}
var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');
//瓦片canvas
var tCanvas = document.createElement("canvas");
var tctx = tCanvas.getContext("2d");
var maxsize = 100 * 1024;
function uploadHead(imgPath) {
	var image = new Image();
	image.src = imgPath;
	var figure = document.createElement("figure");
	var div = document.createElement("div");
	var a =  document.createElement("a");
	var span = document.createElement("span");
	var imgHtml = new Image();
	a.appendChild(imgHtml);
	div.appendChild(a);
	figure.appendChild(div);
	$(span).html("×").addClass("delectImg").insertAfter($(a));
	$(imgLoadHtml).parent("ul").prepend(figure);	
	image.onload = function() {
		$(a).attr({"href":imgPath,"data-size":"1600x1600"});
		$(imgHtml).attr("src",imgPath).addClass("img_tx");
		if (imgPath.length <= maxsize) {
      		$(imgHtml).attr("src",imgPath).addClass("img_tx");
    	}else{
    		//图片加载完毕之后进行压缩，然后上传
	        if (image.complete) {
	          	callback();
	        } else {
	          	image.onload = callback;
	        }
    	}
        function callback() {
          	var data = compress(image);
          	//console.log(data);
          	$(imgHtml).attr("src",data).addClass("img_tx");
        }
	}
	//删除上传的图片
	$(".delectImg").click(function(){
		$(this).parents("figure").hide();
	})
}
function galleryImgs() {
	plus.gallery.pick(function(e) {
		var name = e.substr(e.lastIndexOf('/') + 1);
		compressImage(e, name);
	}, function(e) {}, {
		filter: "image"
	});
}
function readURL(input) {
	if(input.files && input.files[0]) {
		var type = input.files[0].type;
		if(type!=""&&(type!=null)){
			var imagePrefix = type.split("/")[0];
			if(imagePrefix!="image"){
				alert("请上传图片格式");
			}else{
				var reader = new FileReader();
				reader.onload = function(e) {
					//$('#blah').attr('src', e.target.result);
					uploadHead(e.target.result);
				}
				reader.readAsDataURL(input.files[0]);
			}
		}else{
			alert("请上传图片格式");
		}
	}
} 
$(function(){
	$("#file,#cameraInput").change(function() {
		//$("#loading").addClass("hover");//上传图片开始转圈
		readURL(this);
	});
})
//使用canvas对大图片进行压缩
function compress(img){
    var initSize = img.src.length;
    var width = img.width;
    var height = img.height;
    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    var ratio;
    if ((ratio = width * height / 4000000) > 1) {
      ratio = Math.sqrt(ratio);
      width /= ratio;
      height /= ratio;
    } else {
      ratio = 1;
    }
    canvas.width = width;
    canvas.height = height;
	//铺底色
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	//如果图片像素大于100万则使用瓦片绘制
	var count;
	if ((count = width * height / 1000000) > 1) {
		count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
		//计算每块瓦片的宽和高
		var nw = ~~(width / count);
	    var nh = ~~(height / count);
	    tCanvas.width = nw;
	    tCanvas.height = nh;
	    for (var i = 0; i < count; i++) {
	        for (var j = 0; j < count; j++) {
	          tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
	          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
	        }
	    }
    } else {
      ctx.drawImage(img, 0, 0, width, height);
    }
    //进行最小压缩
    var ndata = canvas.toDataURL('image/jpeg', 0.2);
    console.log('压缩前：' + initSize);
    console.log('压缩后：' + ndata.length);
    console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
    return ndata;
}
