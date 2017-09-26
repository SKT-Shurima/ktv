<template>
  <div id="app">
     <div class="slide" id="slide">
        <i class="icon icon-109" id='back'></i>
        <ul>
            <li>
                <a href="#">
                  <img src="http://7xr193.com1.z0.glb.clouddn.com/1.jpg" data-src="http://7xr193.com1.z0.glb.clouddn.com/1.jpg" alt="">
              </a>
            </li>
            <li>
                <a href="#">
                  <img src="http://7xr193.com1.z0.glb.clouddn.com/2.jpg" data-src="http://7xr193.com1.z0.glb.clouddn.com/2.jpg" alt="">
              </a>
            </li>
            <li>
                <a href="#">
                  <img src="http://7xr193.com1.z0.glb.clouddn.com/3.jpg" data-src="http://7xr193.com1.z0.glb.clouddn.com/3.jpg" alt="">
              </a>
            </li>
        </ul>
        <div class="dot">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <dl class="price-mask">
            <dt class='staff-name'>林发可</dt>
            <dd>
                <div class="staff-price price">&yen;500</div>
                <div>已接单：5222</div>
            </dd>
        </dl>
    </div>
    <div class="container">
      <div class="staff-info">
        <ul class="info-box">
            <li class="border-bottom-1px"><span><i class="info-icon-special"></i><strong>特长</strong></span><em id="info-special">跳舞</em></li>
            <li class="border-bottom-1px"><span><i class="info-icon-age"></i><strong>年龄</strong></span><em id="info-age">23</em></li>
            <li class="border-bottom-1px"><span><i class="info-icon-h"></i><strong>身高</strong></span><em id="info-h">172cm</em></li>
            <li class="border-bottom-1px"><span><i class="info-icon-w"></i><strong>体重</strong></span><em id="info-w">48kg</em></li>
            <li class="border-bottom-1px"><span><i class="info-icon-area"></i><strong>籍贯</strong></span><em id="info-area">浙江杭州</em></li>
            <li class="border-bottom-1px"><span><i class="info-icon-love"></i><strong>兴趣爱好</strong></span><em id="info-love">爱好跳舞，喝酒</em></li>
        </ul>
        <div class="labels">
            <button class="weui_btn weui_btn_primary border-1px">皮肤白皙</button>
            <button class="weui_btn weui_btn_primary border-1px">眼睛水灵</button>
            <button class="weui_btn weui_btn_primary border-1px">标准身材</button>
        </div>
      </div>
      <div class="comments">
          <h1>评论</h1>
          <ul class="comments-box">
              <li class="comments-list" v-for='(item,index) in 5'>
                  <dl>
                      <dt class="avater">
                          <img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg">
                      </dt>
                      <dd class="border-bottom-1px">
                          <div class="name">
                              <span class="color-6">林发可</span>
                              <span class="rate">
                                <i v-for='(starItem,starIndex) in 5' :class='{"selected":starIndex<=3}'></i>
                              </span>
                          </div>
                          <div class="content">你是好人</div>
                          <div class="date color-9">2017-09-16&nbsp;15:16</div>
                      </dd>
                  </dl>
              </li>
          </ul>
        </div>
    </div>
     <div class="op-btn primary-bg" id='predate' style='display: none;'>
      立即预约
    </div>
    <div class="weui-flex nore-order op-btn" style='display:none;'>
        <div class="weui-flex-item order-time color-9"><i class="time-icon"></i>08:20</div>
        <div class="weui-flex-item reminder blue-bg">催单</div>
        <div class="weui-flex-item cancle-order gray-bg">取消预约</div>
    </div>
    <div class="weui-flex re-order op-btn" style='display:none;'>
        <div class="weui-flex-item order-time color-9"><i class="time-icon"></i>08:20</div>
        <div class="weui-flex-item reminder blue-bg">投诉</div>
        <div class="weui-flex-item cancle-order gray-bg">取消预约</div>
    </div>
     <div class="op-btn gray-bg" style='display:none;'>
      已取消
    </div>
    <div class="weui-flex complete-order op-btn">
        <div class="weui-flex-item reminder blue-bg" @touchstart='payment'>立即支付</div>
        <div class="weui-flex-item cancle-order green-bg" id='reward'>打赏</div>
    </div>
    <pay-for ref='payfor'></pay-for>
  </div>
</template>

<script>
  import payFor from '../../component/payfor'
  export default {
    name: 'app',
    data(){
    	return {

    	}
    },
    components:{
      payFor
    },
    methods: {
      payment(){
        this.$refs.payfor.maskBol = true;
      }
    },
    ceated(){

    },
    mounted(){
    	this.$nextTick(()=>{
    	})
    }

  }
</script>
<style type="text/css" lang='scss' scoped>
@import "../../../static/css/mixin";
  .rate>i{
    display: inline-block;
    width: .24rem;
    height: .24rem;
    margin-left: .06rem;
    @include bg-image('../../../static/images/star');
  }
  .rate>.selected{
    @include bg-image('../../../static/images/star-selected');
  }
</style>
