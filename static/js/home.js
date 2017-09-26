$(function(){
	var lazyloadImg = new LazyloadImg({
        el: '.weui-updown [data-src]', //匹配元素
        top: 50, //元素在顶部伸出长度触发加载机制
        right: 50, //元素在右边伸出长度触发加载机制
        bottom: 50, //元素在底部伸出长度触发加载机制
        left: 50, //元素在左边伸出长度触发加载机制
        qriginal: false, // true，自动将图片剪切成默认图片的宽高；false显示图片真实宽高
        load: function(el) {
            el.style.cssText += '-webkit-animation: fadeIn 01s ease 0.2s 1 both;animation: fadeIn 1s ease 0.2s 1 both;';
        },
        error: function(el) {

        }
    });
    $.ajax({
        url: '192.168.31.36:8080/ktv/web/login/login.jhtml',
        type: 'GET',
        dataType: 'json',
        data: '',
    })
    .done(function() {
        console.log("success");
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
    
})

$('.nav-item dl').on('touchstart',function(){
	var tab = $(this).attr('data-item');
	if (tab==='4') {
		location.href = 'ranking.html';
	}
})
 $.confirm('', '"KTV"想要获取您的地理位置，是否允许？', function() {
     console.log('get')
 	 wx.getLocation({  
	  	success: function (res) {  
	   		console.log(JSON.stringify(res));  
	  	},  
	  	cancel: function (res) {  
	    	window.close();
	  	}  
	}); 
    }, function() {
      console.log('esc')
    });
