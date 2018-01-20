<template>
	<div>
		<div class="mask" :class='{"mask_visible":maskBol}' @touchstart='maskBol=false'></div>
	    <div class="pay-box" :class='{"box-visible":payBol}'>
	      <h1 class="border-bottom-1px">请选择支付方式</h1>
	      <ul>
	        <li class="border-bottom-1px" @touchstart='ensurePay(3)'>
	          <i class="balance"></i>余额支付
	        </li>
	        <li class="border-bottom-1px" @touchstart='ensurePay(1)'>
	          <i class="wx"></i>微信支付
	        </li>
	      </ul>
	      <div class="op-btn bg-c" style='position: absolute;z-index:10006;' @touchstart='payBol=false;maskBol=false;'>取消</div>
	    </div>
	    <div class="sign-amount-wrap" v-show='rewardBol'>
	    	<ul class="sign-amount-box border-bottom-1px">
	    		<li class="sign-amount-list" v-for='(item,index) in signList' :key='index'>
	    			<dl>
	    				<dt>
	    					<span v-text='item.name'></span>
	    					<em>{{item.amount}}元</em>
	    				</dt>
	    				<dd @touchstart='order_amount=item.amount'><i class="icon primary" :class='order_amount===item.amount?"icon-70":"icon-19"'></i></dd>
	    			</dl>
	    		</li>
	    	</ul>
	    	<div class="ensure-sign primary" @touchstart='rewardBol=false;payBol=true;'>
	    		确认签到
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
				order_amount: 50,
				optype: '',
				signList: [{
					name: '一级签到',
					amount: ''
				},{
					name: '二级签到',
					amount: ''
				},{
					name: '三级签到',
					amount: ''
				},{
					name: '四级签到',
					amount: ''
				}]
			}
		},
		watch:{
			maskBol:{
				handler(newVal,oldVal){
					if (newVal) {
						this.rewardBol=true;
					}else{
						this.payBol=false;
						this.rewardBol=false;
					}
				}
			}
		},
		methods: {
			ensurePay(type){
				let payObj = {
					optype: type,
					order_amount: this.order_amount
				}
				this.$emit('payType',payObj);
				this.payBol = false;
				this.maskBol=false;
				this.order_amount = 50;
			}
		},
		mounted(){
			this.$nextTick(()=>{
				let params = {
	    			token: getCookie("token")
	    		}
	    		$.ajax({
	    			url: `${baseAjax}/user/signParam.jhtml`,
	    			type: 'GET',
	    			dataType: 'json',
	    			data: params,
	    			success: res=>{
		            let {code,data,desc} =res;
		            if (code===0) {
		            	let arr = this.signList,signParam=data.signParam,i=0;
						for(var item in signParam){
							arr[i].amount = signParam[item];
							++i;
						}
						this.signList = arr;
		            }else{
		              error(code,desc)
		            }
		          }
	    		});
			})
		}
	}
</script>
<style type="text/css" scoped lang='scss'>
@import '../common/css/mixin';
@import '../common/css/payfor';
.balance{
	 @include bg-image('../common/img/balance');
}
.wx{
	 @include bg-image('../common/img/wx');
}
.sign-amount-wrap{
	position: absolute;
	top: 25%;
	left: 0px;
	right: 0px;
	z-index: 10006;
	margin: auto;
	width: 5.12rem;
	padding: .2rem 0px;
	font-size: .26rem;
	border-radius: 5px;
	background-color: #fff;
	transition: all .3s;
}
.sign-amount-box{
	padding: 0px .6rem;
}
.sign-amount-list{
	dl{
		overflow: hidden;
		height: .7rem;
		line-height: .7rem;
	}
	dt{
		float: left;
		width: 3rem;
		overflow: hidden;
		span{
			float: left;
		}
		em{
			float: right;
			text-align: right;
		}
	}
	dd{
		float: right;
	}
}
.ensure-sign{
	height: .7rem;
	line-height: .7rem;
	font-size: .3rem;
	text-align: center;
}
</style>