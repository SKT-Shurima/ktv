$(function(){
	$('.order-tab>span').on('touchstart',function(){
		$('.order-tab>.tab-checked').removeClass('tab-checked');
		$(this).addClass('tab-checked');
		var type = $(this).attr('data-type');
		if (type === 'handle') {
			$('#handle-list').show();
			$('#complete-list').hide();
		}else{
			$('#handle-list').hide();
			$('#complete-list').show();
		}
	});

	$('.reject').on('touchstart', function() {
		console.log('接单');
	});
	$('.ensure').on('touchstart', function() {
		console.log('确认');
	});
	$('.cancel').on('touchstart', function() {
		console.log('取消');
	});
})