<template>
  <div id="app">
  	<staff-info></staff-info>
    <div class="weui-flex nore-order op-btn" v-if='order.ostate_id===1'>
      <div class="weui-flex-item order-time color-9"><i class="time-icon"></i>{{order.create_time|countDownFilter}}</div>
      <div class="weui-flex-item reminder blue-bg"  @touchstart='feedback(3)'>催单</div>
      <div class="weui-flex-item cancle-order gray-bg" @touchstart='cancelOrder'>取消预约</div>
    </div>
    <div class="weui-flex re-order op-btn" v-if='order.ostate_id===2'>
      <div class="weui-flex-item order-time color-9"><i class="time-icon"></i>{{order.create_time|countDownFilter}}</div>
      <div class="weui-flex-item reminder blue-bg" @touchstart='feedback(2)'>投诉</div>
      <div class="weui-flex-item cancle-order gray-bg" @touchstart='cancelOrder'>取消预约</div>
    </div>
    <div class="op-btn gray-bg" v-if='order.ostate_id===4'>
      已取消
    </div>
    <div class="weui-flex complete-order op-btn" v-if='order.ostate_id===3'>
        <div class="weui-flex-item reminder blue-bg" @touchstart='payment'>立即支付</div>
        <div class="weui-flex-item green-bg">
          <a :href='"orderDetail.html?id="+item' style="color: #fff;">打赏</a>
        </div>
    </div>
    <pay-for ref='payfor' @payType='payfor'></pay-for>
  </div>
</template>

<script>
  import staffInfo  from '../../component/staffInfo';
  import payFor from '../../component/payfor';
  export default {
    name: 'app',
    data(){
    	return {
        nowTime: 0,
        order: {}
    	}
    },
    filters:{
      countDownFilter
    },
    components:{
      payFor,staffInfo
    },
    methods: {
      orderDetail(){
        let params = {
          token: getCookie('token'),
          order_id: this.query.id 
        }
        $.ajax({
          url: `${baseAjax}/order/orderDetail.jhtml`,
          type: 'GET',
          dataType: 'json',
          data: params,
          success: res=>{
            let {code,data,desc} =res;
            if (code===0) {
              this.order=data;
            }else{
              error(desc)
            }
          }
        });
      },
      payment(){
        this.$refs.payfor.maskBol = true;
      },
      payfor(payParams){
        let {order_amount,optype} =payParams;
        let params ={
          token: getCookie('token'),
          optype: optype,
          order_amount: order_amount,
          optarget: 1
        }
        $.ajax({
          url: `${baseAjax}/pay/pay.jhtml`,
          type: 'POST',
          dataType: 'json',
          data: params,
          success: res=>{
            let {code,data,desc} =res;
            if (code===0) {
              console.log(data);
            }else{
              error(desc)
            }
          }
        });
      },
      cancelOrder(){
        $.confirm('', '确认取消预约？', ()=>{
          let params = {
              token: getCookie('token'),
              order_id: this.order.order_id
          }
          $.ajax({
              url: `${baseAjax}/order/cancelOrder.jhtml`,
              type: 'POST',
              dataType: 'json',
              data: params,
              success: res=>{
                  let {code,data,desc} =res;
                  if (code===0) {
                    this.orderDetail();
                  }else{
                    error(desc)
                  }
              }
          });
        }, ()=>{
            return false;
        });
      },
      feedback(feedback_type){
        let params = {
            token: getCookie('token'),
            order_id: this.order.order_id,
            comment: feedback_type==2?"投诉":"催单",
            feedback_type: feedback_type
        }
        $.ajax({
            url: `${baseAjax}/order/feedback.jhtml`,
            type: 'POST',
            dataType: 'json',
            data: params,
            success: res=>{
                let {code,data,desc} =res;
                if (code===0) {
                    if (feedback_type==2) {
                        $.alert('',"投诉成功");
                    }else{
                        $.alert('',"系统已帮您催单，请耐心等待，谢谢！");
                    }
                }else{
                  error(desc)
                }
            }
        });
      } 
    },
    created(){
      this.query = getRequest();
    },
    mounted(){
        this.$nextTick(()=>{
          this.orderDetail();
          setInterval(() => {
              this.nowTime = new Date().getTime();
          }, 1000);
        })
    }
  }
</script>
<style type="text/css" lang='scss' scoped>
@import "../../../static/css/mixin";
  .mood-icon{
    display: inline-block;
    width: .42rem;
    height: .42rem;
    position: absolute;
    right: .2rem;
    top: .2rem;
    z-index: 100;
    @include bg-image('../../../static/images/sunny');
  }
</style>
