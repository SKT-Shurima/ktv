<template>
  <div id="app">
	<div class="mine-top primary-bg">
      	<dl>
	        <dt>
	          <img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg">
	        </dt>
	        <dd class="name ellipsis-1" v-text='userBean.wechat_name'></dd>
	        <dd class="wxid ellipsis-1">{{userBean.phone}}&nbsp;(微信号)</dd>
     	 </dl>
	</div>
	<div class="row-container">
	    <a class="row border-bottom-1px" href='staffOrder.html' v-if='userBean.employee_is===1'>
	        <i class="row-icon icon-order"></i>
	        <span class="row-title">全部订单</span>
	        <i class="icon icon-108"></i>
	    </a>
	    <a class="row border-bottom-1px" href='userOrder.html' v-else>
	        <i class="row-icon icon-order"></i>
	        <span class="row-title">全部订单</span>
	        <i class="icon icon-108"></i>
	    </a>
	    <a class="row border-bottom-1px" v-if='userBean.employee_is===1'>
	        <i class="row-icon icon-account"></i>
	        <span class="row-title">我的账户</span>
	       	<i class="icon icon-108"></i>
	        <span class="primary" style="float: right;">¥{{userBean.balance.toFixed(2)}}&nbsp;</span>
	    </a>
	    <a class="row border-bottom-1px" href='staffInfo.html' v-if='userBean.employee_is===1'>
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
	import {getInfo} from '../../../static/js/mixins';
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
@import '../../../static/css/mixin';
.icon-order{
	@include bg-image('../../../static/images/ordericon');
}
.icon-account{
	@include bg-image('../../../static/images/account');
}
.icon-cer{
	@include bg-image('../../../static/images/cer');
}
.icon-protocol{
	@include bg-image('../../../static/images/protocol');
}
.icon-aboutus{
	@include bg-image('../../../static/images/aboutus');
}
</style>