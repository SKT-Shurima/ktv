<template>
  	<div id="app">
    	<div class="account-box primary-bg">
	      	<i class="icon icon-109" id='back'></i>
	      	<dl class="account-info primary-bg">
			    <dt>账户余额(元)</dt>
			    <dd>{{user.balance?user.balance.toFixed(2):"0.00"}}</dd>
			</dl>
	   </div>
	<div class="container">
		<div class="row-container">
		    <a href='accountDetail.html' class="row">
		        <i class="row-icon history-icon"></i>
		        <span class="row-title">历史明细</span>
		        <i class="icon icon-108"></i>
		    </a>
		</div>
		<div class="row-container"  style="margin-top:.3rem;">
		    <a class="row border-bottom-1px" href='recharge.html'>
		        <i class="row-icon recharge-icon"></i>
		        <span class="row-title">充值</span>
		        <i class="icon icon-108"></i>
		    </a>
		    <a class="row" href='withdraw.html'>
		        <i class="row-icon withdraw-icon"></i>
		        <span class="row-title">提现</span>
		        <i class="icon icon-108"></i>
		    </a>
		</div>
	</div>
	
  </div>
</template>

<script type="text/ecmascript-6">
	import {getInfo}  from '../../common/js/mixins';
  	export default {
    	name: 'app',
    	mixins: [getInfo],
    	mounted(){
    		this.$nextTick(()=>{
    			this.userInfo();
    		})
    	}
  	}
</script>
<style type="text/css" lang='scss' scoped>
	@import "../../common/css/mixin";
	.history-icon{
	    @include bg-image('../../common/img/history');
	}
	.recharge-icon{
	    @include bg-image('../../common/img/recharge');
	}
	.withdraw-icon{
	    @include bg-image('../../common/img/withdraw');
	}
</style>