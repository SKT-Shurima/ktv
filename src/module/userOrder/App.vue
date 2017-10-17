<template>
    <div id="app">
        <load-more  :on-infinite="onInfinite" :dataList="scrollData">
            <header class="primary-header primary-bg">
                <i class="icon icon-109" id='back'></i>
                <div class="order-tab">
                    <span :class="{'tab-checked':tabIndex===1}" @touchstart='getWaitList(true)'>已预约</span>
                    <span :class="{'tab-checked':tabIndex===2}" @touchstart='getCancelList(true)'>已取消</span>
                </div>
            </header>
            <div class="container">
                <ul v-if='tabIndex===1'>
                    <li class="border-bottom-1px" v-for='(item,index) in waitList' :key='index'>
                        <div class="p">
                            <img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt="">
                        </div>
                        <div class="i">
                            <div class="name">
                                <span v-text='item.employeer.nick_name'></span>
                                <em class="price">&yen;{{item.orderDetail.order_price}}</em>
                            </div>
                            <dl class="con">
                                <dt>
                                    <div class="info ellipsis-2">
                                        <span>
                                            {{item.employeer.birthday|birthFilter}}岁
                                        </span>
                                        <em v-text='item.employeer.hobby'></em>
                                    </div>
                                    <div class="status">
                                        <span v-if='item.orderDetail.ostate_id!==3'>
                                            <i class="time-icon"></i>{{nowTime-item.orderDetail.create_time|countDownFilter}}    
                                        </span>
                                        <em class="primary" v-text='item.orderDetail.ostate_name'></em>
                                    </div>
                                </dt>
                                <dd v-if='item.orderDetail.ostate_id===1'>
                                    <button class="weui_btn border-1px color-blue reminder" @touchstart='feedback(item.order_id,3)'>催单</button>
                                    <button class="weui_btn border-1px color-9  cancle-pre" @touchstart='cancelOrder(item.order_id)'>取消预约</button>
                                </dd>
                                <dd v-if='item.orderDetail.ostate_id===2'>
                                    <button class="weui_btn border-1px color-blue complaints" @touchstart='feedback(item.order_id,2)'>投诉</button>
                                    <button class="weui_btn border-1px color-9  cancle-pre" @touchstart='cancelOrder(item.order_id)'>取消预约</button>
                                </dd>
                                <dd v-if='item.orderDetail.ostate_id===3'>
                                    <button class="weui_btn border-1px color-blue payment" @touchstart='payment'>立即支付</button>
                                    <button class="weui_btn border-1px color-green reward" @touchstart='reward(item.orderDetail.employee_id)'>打赏</button>
                                </dd>
                            </dl>
                        </div>
                    </li>
                </ul>
                <ul v-if='tabIndex===2'>
                    <li class="border-bottom-1px" v-for='(item,index) in cancelList' :key='index'>
                        <div class="p">
                            <img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt="">
                        </div>
                        <div class="i">
                            <div class="name">
                                <span v-text='item.employeer.nick_name'></span>
                                <em class="price">&yen;{{item.orderDetail.order_price}}</em>
                            </div>
                            <div class="con2">
                                <div class="info ellipsis-2">
                                    <span>
                                        {{item.employeer.birthday|birthFilter}}岁
                                    </span>
                                    <em v-text='item.employeer.hobby'></em>
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
        </load-more>
    </div>
</template>

<script>
  import payFor from '../../component/payfor';
  import loadMore from '../../component/loadMore';
  export default {
    name: 'app',
    data(){
        return {
            scrollData: {
                    noFlag: false //暂无更多数据显示
                },
            tabIndex: 1,
            page: 0,
            pageSize: 10,
            total_page: 0,
            waitList: [],
            nowTime: 0,
            cancelList: []
        }
    },
    filters:{
        birthFilter,countDownFilter
    },  
    components:{
      payFor,loadMore
    },
    methods:{
        onInfinite(done) {
            let more = this.$el.querySelector('.load-more');
            if (this.page>=this.totalPage) {
                more.style.display = 'none';
                this.scrollData.noFlag = true;
            }else{
                this.tabIndex===1?this.getWaitList():this.getCancelList();
                more.style.display = 'none';
            }
            done();
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
              optarget: 4
            }
            $.ajax({
              url: `${baseAjax}/pay/pay.jhtml`,
              type: 'POST',
              dataType: 'json',
              data: params,
              success: res=>{
                let {code,data,desc} =res;
                if (code===0) {
                  this.cash(data.payParams.pay_sn);
                }else{
                  error(desc)
                }
              }
            });
        },
        getWaitList(mask){
            if (mask&&this.tabIndex===1) {
                return false;
            }
            if (this.tabIndex===2) {
                this.tabIndex=1;
                this.page = 1;
                this.waitList = [];
            } else {
                this.page++; 
            }
            let params =  {
                token: getCookie('token'),
                page: this.page,
                pageSize: this.pageSize
            }
            $.ajax({
                url: `${baseAjax}/order/listCustomerWaitOrder.jhtml`,
                type: 'GET',
                dataType: 'json',
                data: params,
                success: res=>{
                    let {code,data,desc} =res;
                    if (code===0) {
                        this.waitList = this.waitList.concat(data.orderList.data);
                        this.totalPage = data.orderList.total_page;
                    }else{
                      error(desc)
                    }
                }
            });
        },
        cancelOrder(id){
            $.confirm('', '确认取消预约？', ()=>{
                let params = {
                    token: getCookie('token'),
                    order_id: id
                }
                $.ajax({
                    url: `${baseAjax}/order/cancelOrder.jhtml`,
                    type: 'POST',
                    dataType: 'json',
                    data: params,
                    success: res=>{
                        let {code,data,desc} =res;
                        if (code===0) {
                            this.page = 1 ;
                            this.getWaitList();
                        }else{
                          error(desc)
                        }
                    }
                });
            }, ()=>{
                return false;
            });
        },  
        getCancelList(mask){
            if (mask&&this.tabIndex===2) {
                    return false;
                }
            if (this.tabIndex===1) {
                this.tabIndex=2;
                this.page = 1;
                this.cancelList = [];
            } else {
                this.page++; 
            }
            let params =  {
                token: getCookie('token'),
                page: this.page,
                pageSize: this.pageSize
            }
            $.ajax({
                url: `${baseAjax}/order/listCustomerCancleOrder.jhtml`,
                type: 'GET',
                dataType: 'json',
                data: params,
                success: res=>{
                    let {code,data,desc} =res;
                    if (code===0) {
                        this.cancelList = this.cancelList.concat(data.orderList.data);
                        this.totalPage = data.orderList.total_page;
                    }else{
                      error(desc)
                    }
                }
            });
        },
        reward(id){ 
            location.href = `review.html?id=${id}`;
        },
        feedback(id,feedback_type){
            let params = {
                token: getCookie('token'),
                order_id: id,
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
    mounted(){
        this.$nextTick(()=>{
            this.getWaitList();
            setInterval(() => {
                this.nowTime = new Date().getTime();
            }, 1000);
        })
    }
  }
</script>
<style type="text/css" lang='scss' scoped>
    @import '../../../static/css/mixin.scss';
    .time-icon{
        @include bg-image('../../../static/images/time');
    }
</style>
