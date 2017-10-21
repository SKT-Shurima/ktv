<template>
  <div id="app">
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
	    <div class="withdraw-instruction">提现说明</div>
	</div>
  </div>
</template>

<script>
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
    			return false;
    		}
    		let params = {
	    		token: getCookie('token'),
	    		amount: this.amount
	    	}
	    	$.ajax({
	         	url: `${baseAjax}/user/withdraw.jhtml`,
	          	type: 'POST',
	          	dataType: 'json',
	          	data: params,
	          	success: res=>{
	            	let {code,desc} =res;
	            	if (code===0) {
	            		console.log(desc);
	            	}else{
	              		$.alert('',desc);
	            	}
	          	}
	        });
    	}
    	
    }
  }
</script>
