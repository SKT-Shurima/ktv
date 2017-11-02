<template>
  <div id="app">
    <header class="primary-header primary-bg">
	    <i class="icon icon-109" id='back'></i>充值
	</header>
	<div class="container">
	    <div class="div-1">充值金额</div>
	    <div class="div-2 border-bottom-1px">
	        <span>¥</span>
	        <div>
	            <input type="number" v-model='order_amount' onkeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))">
	        </div>
	    </div>
	    <div class="rechargewithdraw-btn primary-bg" @touchstart='recharge'>充值</div>
	</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'app',
    data(){
    	return {
    		order_amount: ""
    	}
    },
    methods: {
    	recharge(){
    		if (!this.order_amount-0) {
    			return false;
    		}
    		let params = {
    			token: getCookie('token'),
    			optype: 1,
				optarget: 3,
				order_amount: this.order_amount
    		}
    		$.ajax({
	         	url: `${baseAjax}/pay/pay.jhtml`,
	          	type: 'POST',
	          	dataType: 'json',
	          	data: params,
	          	success: res=>{
	            	let {code,desc} =res;
	            	if (code===0) {
		                WeixinJSBridge.invoke('getBrandWCPayRequest',{
		                  "appId":data.payParams.appId,
		                  "nonceStr":data.payParams.nonceStr,
		                  "package":data.payParams.packageName,
		                  "signType":data.payParams.signType,
		                  "timeStamp":data.payParams.timeStamp,
		                  "paySign":data.payParams.paySign
		                }, function(res){
		                  // WeixinJSBridge.log(res.err_msg);
		                  // alert(res.err_code+res.err_desc+res.err_msg);
		                  window.location.href = 'mine.html';
		                });
		            }else{
	              		$.alert('',desc);
	            	}
	          	}
	        });
    	}
    }
  }
</script>
