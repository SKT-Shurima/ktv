$(function(){
	$('.order-tab>span').on('touchstart',function(){
		$('.order-tab>.tab-checked').removeClass('tab-checked');
		$(this).addClass('tab-checked');
		var type = $(this).attr('data-type');
		if (type === 'predate') {
			$('#predate-list').show();
			$('#cancle-list').hide();
		}else{
			$('#predate-list').hide();
			$('#cancle-list').show();
		}
	});
	// 催单
	$('.reminder').on('touchstart',function(){
		$.alert("系统已帮您催单，请耐心等待，谢谢！", "");
	})
	// 取消预约
	$('.cancle-pre').on('touchstart',function(){
		$.confirm("确定取消预约?", "", function() {
          $.toast("取消成功!");
        }, function() {
        });
	});
	// 投诉
	$('.complaints').on('touchstart', function(event) {
		event.preventDefault();
		console.log('投诉');
	});
	// 立即支付
	$('.payment').on('touchstart',function(){
		console.log(2)
	    $('#mask').addClass('mask_visible');
	    $('.pay-box').addClass('box-visible');
	});
	$('.weui_mask').on('touchstart',function(){
	    $('.mask_visible').removeClass('mask_visible');
	    $('.pay-box').removeClass('box-visible');
	});
	// 现金支付
  	$('#cash-pay').on('touchstart',function(){
	    console.log('现金支付');
	});
	// 微信支付
	$('#wx-pay').on('touchstart',function(){
	    $('.pay-box').removeClass('box-visible');
	    $('.reward-box').addClass('box-visible');
	});
	// 购买
	$('#ensure-reward').on('touchstart',function(){
	    $('.mask_visible').removeClass('mask_visible');
	    $('.reward-box').removeClass('box-visible');
	})
})