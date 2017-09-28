<template>
  <div id="app">
    <header class="primary-header primary-bg">
        <i class="icon icon-109" id='back'></i>
        <div class="order-tab">
            <span :class="{'tab-checked':tabIndex===1}" @touchstart='tabIndex=1;'>已预约</span>
            <span :class="{'tab-checked':tabIndex===2}" @touchstart='tabIndex=2;'>已取消</span>
        </div>
    </header>
    <div class="container">
        <ul v-if='tabIndex===1'>
            <li class="border-bottom-1px">
                <div class="p">
                    <img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt="">
                </div>
                <div class="i">
                    <div class="name">
                        <span>林发可</span>
                        <em class="price">&yen;50</em>
                    </div>
                    <dl class="con">
                        <dt>
                            <div class="info ellipsis-2">
                                <span>
                                    18岁
                                </span>
                                <em>
                                    抽烟，喝酒，抽烟，喝酒，
                                </em>
                            </div>
                            <div class="status">
                                <span>
                                    <i class="time"></i>03:00    
                                </span>
                                <em class="primary">
                                    已接单
                                </em>
                            </div>
                        </dt>
                        <dd style="display:none;">
                            <button class="weui_btn border-1px color-blue reminder">催单</button>
                            <button class="weui_btn border-1px color-9  cancle-pre">取消预约</button>
                        </dd>
                        <dd style="display: none;">
                            <button class="weui_btn border-1px color-blue complaints">投诉</button>
                            <button class="weui_btn border-1px color-9  cancle-pre">取消预约</button>
                        </dd>
                        <dd>
                            <button class="weui_btn border-1px color-blue payment" @touchstart='payment'>立即支付</button>
                            <button class="weui_btn border-1px color-green reward">打赏</button>
                        </dd>
                    </dl>
                </div>
            </li>
        </ul>
        <ul v-if='tabIndex===2'>
            <li class="border-bottom-1px">
                <div class="p">
                    <img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt="">
                </div>
                <div class="i">
                    <div class="name">
                        <span>林发可</span>
                        <em class="price">&yen;50</em>
                    </div>
                    <div class="con2">
                        <div class="info ellipsis-2">
                            <span>
                                18岁
                            </span>
                            <em>
                                抽烟，喝酒，抽烟，喝酒，
                            </em>
                        </div>
                        <div class="status color-9">
                           已取消
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <pay-for ref='payfor'></pay-for>
  </div>
</template>

<script>
  import payFor from '../../component/payfor';
  export default {
    name: 'app',
    data(){
      return {
        tabIndex: 1
      }
    },
    components:{
      payFor
    },
    methods:{
      payment(){
        this.$refs.payfor.maskBol = true;
      }
    },
    mounted(){
        this.$nextTick(()=>{
        })
    }
  }
</script>
