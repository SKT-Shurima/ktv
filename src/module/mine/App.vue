<template>
  <div id="app">
	<div class="mine-top primary-bg">
      	<dl>
	        <dt>
	          <img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg">
	        </dt>
	        <dd>
	          紫玫瑰
	        </dd>
	        <dd>
	        	13298881234&nbsp;(微信号)
	        </dd>
     	 </dl>
	</div>
	<div class="row-container">
	    <a class="row border-bottom-1px" href='staffOrder.html' v-if='userInfo.userBean.employee_is===1'>
	        <i class="row-icon icon-order"></i>
	        <span class="row-title">全部订单</span>
	        <img class="row-arrow">
	        <i class="icon icon-108"></i>
	    </a>
	    <a class="row border-bottom-1px" href='userOrder.html' v-else>
	        <i class="row-icon icon-order"></i>
	        <span class="row-title">全部订单</span>
	        <img class="row-arrow">
	        <i class="icon icon-108"></i>
	    </a>
	    <a class="row border-bottom-1px" v-if='userInfo.userBean.employee_is===1'>
	        <i class="row-icon icon-account"></i>
	        <span class="row-title">我的账户</span>
	        <img class="row-arrow">
	        <span class="row-content primary">¥920.00</span>
	        <i class="icon icon-108"></i>
	    </a>
	    <a class="row border-bottom-1px" href='certification.html' v-if='userInfo.userBean.employee_is===1'>
	        <i class="row-icon icon-cer"></i>
	        <span class="row-title">员工认证/签到</span>
	        <img class="row-arrow">
	        <i class="icon icon-108"></i>
	    </a>
	    <a class="row border-bottom-1px" href='protocol.html'>
	        <i class="row-icon icon-protocol"></i>
	        <span class="row-title">用户条款及协议</span>
	        <img class="row-arrow">
	        <i class="icon icon-108"></i>
	    </a>
	    <a class="row border-bottom-1px" href="aboutus.html">
	        <i class="row-icon icon-aboutus"></i>
	        <span class="row-title">关于我们</span>
	        <img class="row-arrow">
	        <i class="icon icon-108"></i>
	    </a>
	</div>
  </div>
</template>

<script>
  export default {
    name: 'app',
   	data(){
   		return{
   			userInfo: {}
   		}
   	},
   	created(){
   		if (sessionStorage.userInfo) {
   			this.userInfo = JSON.parse(sessionStorage.userInfo);
   		}else{

   		}
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