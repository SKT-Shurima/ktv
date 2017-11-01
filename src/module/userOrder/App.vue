<template>
    <div id="app">
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
                        <a :href="`orderDetail.html?employee_id=${item.employeer.user_id}&order_id=${item.order_id}`">
                            <img :src="`${qnhost}${item.employeer.index_image}`" @error='errorLoadImg'>
                        </a>
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
                                <button class="weui_btn border-1px color-blue payment" @touchstart='payment' v-if='item.orderDetail.online_pay===1'>立即支付</button>
                                <button class="weui_btn border-1px color-green reward" @touchstart='reward(item.orderDetail.employee_id)'>打赏</button>
                            </dd>
                        </dl>
                    </div>
                </li>
            </ul>
            <ul v-if='tabIndex===2'>
                <li class="border-bottom-1px" v-for='(item,index) in cancelList' :key='index'>
                    <div class="p">
                        <img :src="`${qnhost}${item.employeer.index_image}`" @error='errorLoadImg'>
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
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </div>
</template>

<script type="text/ecmascript-6">
  import payFor from '../../component/payfor';
  export default {
    name: 'app',
    data(){
        return {
            loadState: '',
            qnhost: qnhost,
            tabIndex: 1,
            page: 0,
            pageSize: 10,
            total_page: 1,
            waitList: [],
            nowTime: 0,
            cancelList: []
        }
    },
    filters:{
        birthFilter,countDownFilter
    },  
    components:{
      payFor
    },
    methods:{
        infiniteHandler($state) {
            this.loadState = $state;
            if (this.page>=this.totalPage) {
                $state.loaded();
                return false; ;
            }else{
                this.tabIndex===1?this.getWaitList():this.getCancelList();
            }
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
                  if (optype==1) {
                    WeixinJSBridge.invoke('getBrandWCPayRequest',{
                      "appId":data.payParams.appid,
                      "nonceStr":data.payParams.nonceStr,
                      "package":data.payParams.prepayid,
                      "signType":"MD5",
                      "timeStamp":data.payParams.timestamp,
                      "paySign":data.payParams.sign
                    }, function(res){
                      // WeixinJSBridge.log(res.err_msg);
                      // alert(res.err_code+res.err_desc+res.err_msg);
                      window.location.href = 'mine.html';
                    });
                  }else{
                    window.location.href = 'mine.html';
                  }
                }else{
                  error(code,desc)
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
                        this.loadState?this.loadState.loaded():'';
                    }else{
                      error(code,desc)
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
                          error(code,desc)
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
                        if (this.loadState) {
                            this.loadState.loaded();
                        }
                    }else{
                      error(code,desc)
                    }
                }
            });
        },
        reward(id){ 
            location.href = `review.html?employee_id=${id}`;
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
                      error(code,desc)
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
    @import '../../common/css/mixin.scss';
    .time-icon{
        @include bg-image('../../common/img/time');
    }
</style>
