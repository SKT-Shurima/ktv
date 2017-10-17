<template>
	<div>
		<div class="mask" :class='{"mask_visible":maskBol}' @touchstart='maskBol=false'></div>
	    <div class="pay-box" :class='{"box-visible":payBol}'>
	      <h1 class="border-bottom-1px">请选择支付方式</h1>
	      <ul>
	        <li class="border-bottom-1px" @touchstart='payBol=false;rewardBol=true;optype=3;'>
	          <i class="balance"></i>余额支付
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
	            <dl :class="{'border-1px':order_amount===3}" @touchstart='order_amount=3;'>
	              <dt class="reward-icon-300"></dt>
	              <dd>300</dd>
	            </dl>
	          </li>
	          <li class="reward-list">
	            <dl :class="{'border-1px':order_amount===4}" @touchstart='order_amount=4;'>
	              <dt class="reward-icon-400"></dt>
	              <dd>400</dd>
	            </dl>
	          </li>
	          <li class="reward-list">
	            <dl :class="{'border-1px':order_amount===5}" @touchstart='order_amount=5;'>
	              <dt class="reward-icon-500"></dt>
	              <dd>500</dd>
	            </dl>
	          </li>
	          <li class="reward-list">
	            <dl :class="{'border-1px':order_amount===6}" @touchstart='order_amount=6;'>
	              <dt class="reward-icon-600"></dt>
	              <dd>600</dd>
	            </dl>
	          </li>
	          <li class="reward-list">
	            <dl :class="{'border-1px':order_amount===7}" @touchstart='order_amount=7;'>
	              <dt class="reward-icon-700"></dt>
	              <dd>700</dd>
	            </dl>
	          </li>
	          <li class="reward-list">
	            <dl :class="{'border-1px':order_amount===8}" @touchstart='order_amount=8;'>
	              <dt class="reward-icon-800"></dt>
	              <dd>800</dd>
	            </dl>
	          </li>
	          <li class="reward-list">
	            <dl :class="{'border-1px':order_amount===9}" @touchstart='order_amount=9;'>
	              <dt class="reward-icon-900"></dt>
	              <dd>900</dd>
	            </dl>
	          </li>
	          <li class="reward-list">
	            <dl :class="{'border-1px':order_amount===10}" @touchstart='order_amount=10;'>
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
		name: 'signin',
		data(){
			return{
				maskBol: false,
				payBol: false,
				rewardBol: false,
				order_amount: '',
				listPayType: [],
				optype: ''
			}
		},
		watch:{
			maskBol:{
				handler(newVal,oldVal){
					if (newVal) {
						this.payBol=true;
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
			getPayType(){
				let params ={
	              token: getCookie('token')
	            }
	            $.ajax({
	              	url: `${baseAjax}/pay/listPayType.jhtml.jhtml`,
	              	type: 'GET',
	              	dataType: 'json',
	              	data: params,
	              	success: res=>{
	                	let {code,data,desc} =res;
	                	if (code===0) {
	                		this.listPayType = data.listPayType;
	                	}else{
	                  		error(desc)
	                	}
	              	}
	            });
			}
		},
		mounted(){
			this.$nextTick(()=>{
				// this.getPayType();
			})
		}
	}
</script>
<style type="text/css" scoped lang='scss'>
@import '../../static/css/mixin';
@import '../../static/css/payfor';
.reward-icon-300{
	@include bg-image('../../static/images/pay300');
}
.reward-icon-400{
	@include bg-image('../../static/images/pay400');
}
.reward-icon-500{
	@include bg-image('../../static/images/pay500');
}
.reward-icon-600{
	@include bg-image('../../static/images/pay600');
}
.reward-icon-700{
	@include bg-image('../../static/images/pay700');
}
.reward-icon-800{
	@include bg-image('../../static/images/pay800');
}
.reward-icon-900{
	@include bg-image('../../static/images/pay900');
}
.reward-icon-1000{
	@include bg-image('../../static/images/pay1000');
}
.balance{
	 @include bg-image('../../static/images/balance');
}
.wx{
	 @include bg-image('../../static/images/wx');
}

</style>