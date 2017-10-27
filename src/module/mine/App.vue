<template>
  <div id="app">
	<div class="mine-top primary-bg">
      	<dl>
	        <dt>
	          <img :src="user.wechat_portrait"  @load='successLoadAvater' @error='errorLoadAvater' class="default-avater">
	        </dt>
	        <dd class="name ellipsis-1" v-text='user.wechat_name'></dd>
     	 </dl>
	</div>
	<div class="row-container">
	    <a class="row border-bottom-1px" href='staffOrder.html' v-if='user.employee_is===1'>
	        <i class="row-icon icon-order"></i>
	        <span class="row-title">全部订单</span>
	        <i class="icon icon-108"></i>
	    </a>
	    <a class="row border-bottom-1px" href='userOrder.html' v-else>
	        <i class="row-icon icon-order"></i>
	        <span class="row-title">全部订单</span>
	        <i class="icon icon-108"></i>
	    </a>
	    <a class="row border-bottom-1px" href='account.html' v-if='user.employee_is===1'>
	        <i class="row-icon icon-account"></i>
	        <span class="row-title">我的账户</span>
	       	<i class="icon icon-108"></i>
	        <span class="primary" style="float: right;">¥{{user.balance.toFixed(2)}}&nbsp;</span>
	    </a>
	    <a class="row border-bottom-1px" href='staffInfo.html' v-if='user.employee_is===1'>
	        <i class="row-icon icon-cer"></i>
	        <span class="row-title">员工签到</span>
	        <i class="icon icon-108"></i>
	    </a>
	    <a class="row border-bottom-1px" href='certification.html' v-else>
	        <i class="row-icon icon-cer"></i>
	        <span class="row-title">员工认证</span>
	        <i class="icon icon-108"></i>
	    </a>
	    <a class="row border-bottom-1px" href='protocol.html'>
	        <i class="row-icon icon-protocol"></i>
	        <span class="row-title">用户条款及协议</span>
	        <i class="icon icon-108"></i>
	    </a>
	    <a class="row border-bottom-1px" href="aboutus.html">
	        <i class="row-icon icon-aboutus"></i>
	        <span class="row-title">关于我们</span>
	        <i class="icon icon-108"></i>
	    </a>
	</div>
	<v-footer></v-footer>
  </div>
</template>
<script type="text/ecmascript-6">
	import vFooter from '../../component/vFooter';
	import {getInfo} from '../../common/js/mixins';
  	export default {
    	name: 'app',
	   	data(){
	   		return{
	   		}
	   	},
	   	mixins: [getInfo],
	   	components: {
          vFooter
        },
        mounted(){
        	this.$nextTick(()=>{
        		this.userInfo();
        	})
        }
  	}
</script>
<style type="text/css" lang='scss' scoped>
@import '../../common/css/mixin';
.default-avater{
	@include bg-image('../../common/img/default-avater');
}
.icon-order{
	@include bg-image('../../common/img/ordericon');
}
.icon-account{
	@include bg-image('../../common/img/account');
}
.icon-cer{
	@include bg-image('../../common/img/cer');
}
.icon-protocol{
	@include bg-image('../../common/img/protocol');
}
.icon-aboutus{
	@include bg-image('../../common/img/aboutus');
}
</style>