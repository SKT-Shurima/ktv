<template>
	<div>
		<div class="mask" :class='{"mask_visible":maskBol}' @touchstart='maskBol=false'></div>
	    <div class="pay-box" :class='{"box-visible":payBol}'>
	      <h1 class="border-bottom-1px">请选择支付方式</h1>
	      <ul>
	        <li class="border-bottom-1px" @touchstart='payBol=false;rewardBol=true;optype=2;'>
	          <i class="cash"></i>现金支付
	        </li>
	        <li class="border-bottom-1px" @touchstart='payBol=false;rewardBol=true;optype=1;'>
	          <i class="wx"></i>微信支付
	        </li>
	      </ul>
	      <div class="op-btn gray-bg" style='position: absolute;' @touchstart='payBol=false;maskBol=false;'>取消</div>
	    </div>
	    <div class="reward-box" :class='{"box-visible":rewardBol}'>
	        <ul>
	          <li class="reward-list">
	            <dl :class="{'border-1px':order_amount===0.01}" @touchstart='order_amount=0.01;'>
	              <dt class="reward-icon-300"></dt>
	              <dd>300</dd>
	            </dl>
	          </li>
	          <li class="reward-list">
	            <dl :class="{'border-1px':order_amount===400}" @touchstart='order_amount=400;'>
	              <dt class="reward-icon-400"></dt>
	              <dd>400</dd>
	            </dl>
	          </li>
	          <li class="reward-list">
	            <dl :class="{'border-1px':order_amount===500}" @touchstart='order_amount=500;'>
	              <dt class="reward-icon-500"></dt>
	              <dd>500</dd>
	            </dl>
	          </li>
	          <li class="reward-list">
	            <dl :class="{'border-1px':order_amount===600}" @touchstart='order_amount=600;'>
	              <dt class="reward-icon-600"></dt>
	              <dd>600</dd>
	            </dl>
	          </li>
	          <li class="reward-list">
	            <dl :class="{'border-1px':order_amount===700}" @touchstart='order_amount=700;'>
	              <dt class="reward-icon-700"></dt>
	              <dd>700</dd>
	            </dl>
	          </li>
	          <li class="reward-list">
	            <dl :class="{'border-1px':order_amount===800}" @touchstart='order_amount=800;'>
	              <dt class="reward-icon-800"></dt>
	              <dd>800</dd>
	            </dl>
	          </li>
	          <li class="reward-list">
	            <dl :class="{'border-1px':order_amount===900}" @touchstart='order_amount=900;'>
	              <dt class="reward-icon-900"></dt>
	              <dd>900</dd>
	            </dl>
	          </li>
	          <li class="reward-list">
	            <dl :class="{'border-1px':order_amount===1000}" @touchstart='order_amount=1000;'>
	              <dt class="reward-icon-1000"></dt>
	              <dd>1000</dd>
	            </dl>
	          </li>
	        </ul>
	        <div class="op-btn primary-bg" @touchstart='ensureReward' style='position: absolute;'>
	          购买
	        </div>
	    </div>
	</div>
</template>
<script type='text/esmascript-6'>
	export default {
		data(){
			return{
				maskBol: false,
				payBol: false,
				rewardBol: false,
				order_amount: '',
				optype: ''
			}
		},
		watch:{
			maskBol:{
				handler(newVal,oldVal){
					if (newVal) {
						this.payBol=true;
					}else{
						this.payBol=false;
						this.rewardBol=false;
					}
				}
			}
		},
		methods: {
			ensureReward(){
				let payObj = {
					optype: this.optype,
					order_amount: this.order_amount
				}
				this.$emit('payType',payObj);
				this.rewardBol = false;
				this.maskBol=false;
				this.order_amount ='';
			},
		}
	}
</script>
<style type="text/css" scoped lang='scss'>
@import '../common/css/mixin';
@import '../common/css/payfor';
.reward-icon-300{
	@include bg-image('../common/img/pay300');
}
.reward-icon-400{
	@include bg-image('../common/img/pay400');
}
.reward-icon-500{
	@include bg-image('../common/img/pay500');
}
.reward-icon-600{
	@include bg-image('../common/img/pay600');
}
.reward-icon-700{
	@include bg-image('../common/img/pay700');
}
.reward-icon-800{
	@include bg-image('../common/img/pay800');
}
.reward-icon-900{
	@include bg-image('../common/img/pay900');
}
.reward-icon-1000{
	@include bg-image('../common/img/pay1000');
}
.cash{
	 @include bg-image('../common/img/cash');
}
.wx{
	 @include bg-image('../common/img/wx');
}
.reward-box{
	z-index: 10010;
}
</style>