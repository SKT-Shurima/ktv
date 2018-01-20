<template>
  <div id="app">
  	<div style='width: 100%;height: 100%;'>
    <header class="primary-header primary-bg">
	    <i class="icon icon-109" id='back'></i>提现
	</header>
	<div class="container">
	    <div class="div-1">提现金额</div>
	    <div class="div-2">
	        <span>¥</span>
	        <div>
	            <input type="number" v-model='amount' onkeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))">
	        </div>
	    </div>
	    <div class="div-3 color-9">提现到我的零钱</div>
	    <div class="rechargewithdraw-btn primary-bg" @touchstart='withdraw'>提现</div>
	    <div class="withdraw-instruction">
	    	<a href="explain.html">提现说明</a>
	    </div>
	</div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'app',
    data(){
    	return {
    		amount: ""
    	}
    },
    methods: {
    	withdraw(){
    		if (!this.amount-0) {
    			$.alert('','请输入提现金额');
    			return false;
    		}
    		let params = {
	    		token: getCookie('token'),
	    		amount: (this.amount-0).toFixed(2)
	    	}
	    	$.ajax({
	         	url: `${baseAjax}/user/withdraw.jhtml`,
	          	type: 'POST',
	          	dataType: 'json',
	          	data: params,
	          	success: res=>{
	            	let {code,desc} =res;
	            	if (code===0) {
	            		window.location.replace('mine.html');
	            	}else{
	              		$.alert('',desc);
	            	}
	          	}
	        });
    	}
    }
  }
</script>