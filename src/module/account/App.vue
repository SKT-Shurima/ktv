<template>
  <div id="app">
    <header class="primary-header primary-bg">
	    <i class="icon icon-109" id='back'></i>我的账户
	</header>
	<div class="account-top primary-bg">
	    <div>账户余额(元)</div>
	    <div>2000.00</div>
	</div>
	<div class="row-container">
	    <a class="row">
	        <img class="row-icon">
	        <span class="row-title">全部订单</span>
	        <img class="row-arrow">
	    </a>
	</div>
	<div class="row-container"  style="margin-top:.3rem;">
	    <a class="row border-bottom-1px">
	        <img class="row-icon">
	        <span class="row-title">充值</span>
	        <img class="row-arrow">
	    </a>
	    <a class="row">
	        <img class="row-icon">
	        <span class="row-title">提现</span>
	        <img class="row-arrow">
	    </a>
	</div>
  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>
