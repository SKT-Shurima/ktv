<template>
	<div>
		<div class="mask" :class='{"mask_visible":maskBol}' @touchstart='maskBol=false'></div>
	    <div class="pay-box" :class='{"box-visible":payBol}'>
	      <h1 class="border-bottom-1px">请选择支付方式</h1>
	      <ul>
	        <li class="border-bottom-1px">
	          <i class="cash"></i>现金支付
	        </li>
	        <li class="border-bottom-1px" @touchstart='payBol=false;rewardBol=true;optype_id=1;'>
	          <i class="wx"></i>微信支付
	        </li>
	      </ul>
	      <div class="op-btn gray-bg" style='position: absolute;' @touchstart='payBol=false;maskBol=false;'>取消</div>
	    </div>
	    <div class="reward-box" :class='{"box-visible":rewardBol}'>
	        <ul>
	          <li class="reward-list">
	            <dl :class="{'border-1px':order_amount===300}" @touchstart='order_amount=300;'>
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
				listPayType: [],
				optype_id: ''
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
					optype_id: this.optype_id,
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
.reward-box,.pay-box{
    position: fixed;
    left: 0px;
    width: 100%;
    font-size: .3rem;
    background-color: #fff;
    transition: all .3s;
}
.reward-box{
    bottom: 0px;
    bottom: -5rem;
    z-index: 10000;
}
.reward-box>ul{
    overflow: hidden;
    margin:.3rem 0px 1rem;
}
.reward-list{
    float: left;
    width: 25%;
    text-align: center;
    font-size: .24rem;
    margin: 0px 0px .3rem;
}
.reward-list>dl{
   	width: 1.2rem;
   	margin: 0px auto;
}
.reward-list>dl::after{
	border-color: #f65287;
}
.reward-list dt{
   	width: .6rem;
   	height: .6rem;
   	margin: 0px auto;
}
.reward-list dd{
   	line-height: .6rem;
}
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
.pay-box{
    padding-bottom: 2.2rem;
    bottom: -5rem;
    z-index: 9999;
}
.pay-box>h1{
    font-size: .3rem;
    padding: .35rem .4rem;
}
.pay-box li{
    padding: .2rem .4rem;
}
.cash,.wx{
	display: inline-block;
	width: .52rem;
	height: .52rem;
    margin-right: .2rem;
    vertical-align: middle;
}
.cash{
	 @include bg-image('../../static/images/cash');
}
.wx{
	 @include bg-image('../../static/images/wx');
}
.box-visible{
    bottom: 0px;
}
.mask{
	opacity: 0;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    z-index: 1000;
    visibility: hidden;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .6);
}
.mask_visible{
    opacity: 1;
    visibility: visible;
}
</style>