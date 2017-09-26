$(function(){
  	var max = $('#count_max').text();
  	$('#note').on('input', function(){
     	var text = $(this).val();
     	var len = text.length;   
     	$('#count').text(len);    
     	if(len >= max){
      		$(this).val(text.slice(0,39))
   		}else{
       
    	}     
  	});
  	$('.labels>button').on('touchstart',function(){
  		$('.labels>button.btn-checkced').removeClass('btn-checkced');
  		$(this).addClass('btn-checkced');
  	});
  	$('.com-labels>button').on('touchstart',function(){
  		$('.com-labels>button.btn-checkced').removeClass('btn-checkced');
  		$(this).addClass('btn-checkced');
  	});
  	 //评分js
 var arr = ["1分","2分","3分","4分","5分"];
	var num = -1;
	$(".weui-rater a").mouseover(function(){
		var thisL = $(this).index();
		for(var i = 0;i < thisL;i++){
			$(".weui-rater a").eq(i).addClass('checked');
		}
		for(var i = thisL; i < 5;i++){
			$(".weui-rater a").eq(i).removeClass('checked');
		}
		$(this).addClass('checked');
	})
	$(".weui-rater a").mouseout(function(){
		var thisL = $(this).index();
		for(var i = thisL; i < 5;i++){
			$(".weui-rater a").eq(i).removeClass('checked');
		}
	})
	$(".weui-rater").mouseout(function(){
		
		for(var i = 0; i < num;i++){
			$(".weui-rater a").eq(i).addClass('checked');
		}
	})
  $(".weui-rater a").click(function(){
		var thisL = $(this).index();
		$("#fen").html(arr[thisL]);
		$(this).addClass('checked');
		num = thisL+1;
		console.log(num);
	})
})