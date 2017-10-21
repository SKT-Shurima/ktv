<template>
    <div id="app">
        <load-more  :on-infinite="onInfinite" :dataList="scrollData">
            <header class="primary-header primary-bg">
                <i class="icon icon-109" id='back'></i>
                <div class="order-tab">
                    <span :class="{'tab-checked':tabIndex===1}" @touchstart='waitDeal(true)'>待处理</span>
                    <span :class="{'tab-checked':tabIndex===2}" @touchstart='complete(true)'>已完成</span>
                </div>
            </header>
            <div class="container">
                <ul v-show='tabIndex===1'>
                    <li class="border-bottom-1px" v-for='(item,index) in waitDealList' :key='index'>
                        <div class="p">
                            <img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt="">
                        </div>
                        <div class="i">
                            <dl class="con">
                                <dt>
                                    <div class="staff-name ellipsis-1" v-text='item.customer.wechat_name'></div>
                                    <div class="staff-room ellipsis-2">
                                      {{item.orderDetail.room_name}}号包厢
                                    </div>
                                </dt>
                                <dd class="staff-op" v-if='item.orderDetail.ostate_id===1'>
                                    <button class="weui_btn border-1px color-blue reject" @touchstart='receiveOrder(item.order_id)'>接单</button>
                                </dd>
                                <dd class="staff-op" v-if='item.orderDetail.ostate_id===2'>
                                    <button class="weui_btn border-1px color-blue ensure" @touchstart='confirmOrder(item.order_id)'>确认</button>
                                    <button class="weui_btn border-1px color-9 cancel" @touchstart='cancelOrder(item.order_id)'>取消</button>
                                </dd>
                            </dl>
                            <div class="status">
                                <span>
                                    <i class="time-icon"></i>{{nowTime-item.orderDetail.create_time|countDownFilter}}    
                                </span>
                                <em class="primary" v-text='item.orderDetail.ostate_name'></em>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul v-show='tabIndex===2'>
                     <li class="border-bottom-1px" v-for='(item,index) in completeList' :key='index'>
                        <div class="p">
                            <img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt="">
                        </div>
                        <div class="i">
                            <dl class="con">
                                <dt>
                                    <div class="staff-name ellipsis-1" v-text='item.customer.wechat_name'>
                                    </div>
                                    <div class="staff-room ellipsis-2">
                                      {{item.orderDetail.room_name}}号包厢
                                    </div>
                                </dt>
                            </dl>
                            <div class="status color-9" v-text='item.orderDetail.ostate_name'></div>
                        </div>
                    </li>
                </ul>
            </div>
        </load-more>
    </div>
</template>

<script>
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
            waitDealList: [],
            nowTime: 0,
            completeList: []
          }
        },
        filters:{
            countDownFilter
        },
        components: {
          loadMore
        },
        methods:{
            onInfinite(done) {
                let more = this.$el.querySelector('.load-more');
                if (this.page>=this.totalPage) {
                    more.style.display = 'none';
                    this.scrollData.noFlag = true;
                }else{
                    this.tabIndex===1?this.waitDeal():this.complete();
                    more.style.display = 'none';
                }
                done();
            },
            waitDeal(mask){
                if (mask&&this.tabIndex===1) {
                    return false;
                }
                if (this.tabIndex===2) {
                    this.tabIndex=1;
                    this.page = 1;
                    this.waitDealList = [];
                } else {
                    this.page++; 
                }
                let params =  {
                    token: getCookie('token'),
                    page: this.page,
                    pageSize: this.pageSize
                }
                $.ajax({
                    url: `${baseAjax}/order/listEmployeeWaitOrder.jhtml`,
                    type: 'GET',
                    dataType: 'json',
                    data: params,
                    success: res=>{
                        let {code,data,desc} =res;
                        if (code===0) {
                            this.waitDealList = this.waitDealList.concat(data.orderList.data);
                            this.totalPage = data.orderList.total_page;
                        }else{
                          error(desc)
                        }
                    }
                });
            },
            // 接单
            receiveOrder(id){
                let params =  {
                    token: getCookie('token'),
                    order_id: id
                }
                $.ajax({
                    url: `${baseAjax}/order/receiveOrder.jhtml`,
                    type: 'POST',
                    dataType: 'json',
                    data: params,
                    success: res=>{
                        let {code,desc} =res;
                        if (code===0) {
                            window.history.back();
                        }else{
                            $.alert('',desc);
                        }
                    }
                });
            },
            // 确认
            confirmOrder(id){
                let params =  {
                    token: getCookie('token'),
                    order_id: id
                }
                $.ajax({
                    url: `${baseAjax}/order/confirmOrder.jhtml`,
                    type: 'POST',
                    dataType: 'json',
                    data: params,
                    success: res=>{
                        let {code,desc} =res;
                        if (code===0) {
                            window.history.back();
                        }else{
                          $.alert('',desc);
                        }
                    }
                });
            },
            //  取消
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
                                window.history.back();
                            }else{
                              $.alert('',desc);
                            }
                        }
                    });
                }, ()=>{
                    return false;
                });
            },
            complete(mask){
                if (mask&&this.tabIndex===2) {
                    return false;
                }
                if (this.tabIndex===1) {
                    this.tabIndex=2;
                    this.page = 1;
                    this.completeList = [];
                } else {
                    this.page++; 
                }
                let params =  {
                    token: getCookie('token'),
                    page: this.page,
                    pageSize: this.pageSize
                }
                $.ajax({
                    url: `${baseAjax}/order/listEmployeeFinishOrder.jhtml`,
                    type: 'GET',
                    dataType: 'json',
                    data: params,
                    success: res=>{
                        let {code,data,desc} =res;
                        if (code===0) {
                            this.completeList = this.completeList.concat(data.orderList.data);
                            this.totalPage = data.orderList.total_page;
                        }else{
                          error(desc)
                        }
                    }
                });
            },

        },
        mounted(){
            this.$nextTick(()=>{
                this.waitDeal();
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
