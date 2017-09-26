$(function(){
	// 立即支付
  	$('#payment').on('touchstart',function(){
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