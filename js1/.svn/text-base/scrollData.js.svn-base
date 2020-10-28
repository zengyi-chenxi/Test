var myScroll,pullDownEl, pullDownOffset,pullUpEl, pullUpOffset,generatedCount = 0;
/**
 * 下拉刷新 （自定义实现此方法）
 * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
 */
function pullUpAction() {//append好的
	setTimeout(function() { // <-- Simulate network congestion, remove setTimeout from production!
		if(scroll){
			page = page + 1;
			OnLoad();
		}
		myScroll.refresh(); // 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}
/**
 * 初始化iScroll控件
 */
function loaded() {
	/*pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;*/
	pullUpEl = document.getElementById('pullUp');
	pullUpOffset = pullUpEl.offsetHeight;
	myScroll = new iScroll('wrapper', {
		scrollbarClass: 'myScrollbar',
		/* 重要样式 */
		useTransition: false,
		/* 此属性不知用意，本人从true改为false */
		//topOffset: pullDownOffset,
		onRefresh: function() {
			if(pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
			}
		},
		onScrollMove: function() {
			if(this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				if(this.y<0){
					pullUpEl.className = 'flip';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
				}
				this.maxScrollY = this.maxScrollY;
			} else if(this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function() {
			if(pullUpEl.className.match('flip')) {
					pullUpEl.className = 'loading';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
					pullUpAction(); // Execute custom function (ajax call?)
			}
			
			/*新增  -- 回到顶部*/
			var scrollToTopBox = document.getElementById('scrollToTop');
			if (scrollToTopBox != '' && scrollToTopBox != null) {
				scrollToTopBox.classList.add('hide');
				var _this = this;
//				var timer=null;
//				var istop=true;
	//			console.log(this.y)
				if (this.y >= -120) {
					scrollToTopBox.classList.add('hide');
				}else{
					scrollToTopBox.classList.remove('hide');
					scrollToTopBox.addEventListener('click', function(e){
						myScroll.scrollTo(0,0,500);
					})
				}
				
			}
			
		},
//		onBeforeScrollStart: function(){
//			if(pullUpEl.className.match('imgtip')) {
//				console.log("吃法")
//			}else{
//				console.log("没哟")
//			}
//		}
	});
	setTimeout(function() {
		document.getElementById('wrapper').style.left = '0';
	}, 800);
}
//初始化绑定iScroll控件 
//document.addEventListener('touchmove', function(e) {
//	//e.preventDefault();
//}, false);
document.addEventListener('DOMContentLoaded', loaded, false);
window.onload = function() {
	var wrap = document.getElementById('wrapper'),
		//pic = document.getElementById('pic'),
		list = document.getElementById('scroller').getElementsByTagName('li'),
		index = 0,
		timer = null;
	if(timer) {

		clearInterval(timer);
		timer = null;
	}
	timer = setInterval(autoplay, 2000);
	function autoplay() {
		index++;
		if(index >= list.length) {
			index = 0;
		}
		changeoptions(index);
	}
	wrap.onmouseover = function() {
		clearInterval(timer);
	}
	wrap.onmouseout = function() {
		timer = setInterval(autoplay, 2000);
	}
	for(var i = 0; i < list.length; i++) {
		list[i].id = i;
		list[i].onmouseover = function() {
			clearInterval(timer);
			changeoptions(this.id);
		}
	}
	function changeoptions(curindex) {
		for(var j = 0; j < list.length; j++) {
			list[j].className = '';
			//pic.style.top = 0;
		}
		if(list>0){
			list[curindex].className = 'active';
			//pic.style.top = -curindex * 150 + 'px';
			index = curindex;
		}
	}
}