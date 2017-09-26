<template>
  <div id="app">
     <div class="order-wrap">
	      <i class="icon icon-109" id='back'></i>
	      <dl class="staff-info">
	        <dt>
	          <img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg">
	        </dt>
	        <dd>
	          紫玫瑰
	        </dd>
	      </dl>
	      <div class="weui-loadmore weui-loadmore-line">
	        <span class="weui-loadmore-tips">打赏她小费</span>
	      </div>
	      <div class="labels">
	        <button class="weui_btn  border-1px color-6 btn-checkced">不赏</button>
	        <button class="weui_btn  border-1px color-6">8.8元</button>
	        <button class="weui_btn  border-1px color-6">18.8元</button>
	        <button class="weui_btn  border-1px color-6">88.8元</button>
	      </div>
	      <div class="amount-box">
	        <label>其他金额：</label><input type="number" pattern="[0-9]*" onkeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" class="input-box"><span class="color-6">元</span>
	      </div>
	      <div class="weui-loadmore weui-loadmore-line">
	        <span class="weui-loadmore-tips">给她来个评价</span>
	      </div>
	      <div class="rate weui-rater">
	          <a data-num = "0" class="weui-rater-box"> 
	            <span class="weui-rater-inner">★</span> 
	          </a>
	          <a data-num = "1" class="weui-rater-box">
	            <span class="weui-rater-inner">★</span>
	          </a>
	          <a data-num = "2" class="weui-rater-box">
	            <span class="weui-rater-inner">★</span>
	          </a>
	          <a data-num = "3" class="weui-rater-box">
	            <span class="weui-rater-inner">★</span>
	          </a>
	          <a data-num = "4" class="weui-rater-box">
	            <span class="weui-rater-inner">★</span>
	          </a>
	      </div>
	      <div class="com-labels">
	        <button class="weui_btn  border-1px color-6">态度好</button>
	        <button class="weui_btn  border-1px color-6">服务热情</button>
	        <button class="weui_btn  border-1px color-6">温柔体贴</button>
	      <div class="note-box">
	        <input type="text" placeholder="其他意见和建议" class="input-box" id='note'><i class="color-9"><span id='count'>0</span>/<span id='count_max'>40</span></i>
	      </div>
	    </div>
	    <div class="op-btn primary-bg">
	      确认
	    </div>
	</div>
  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>
