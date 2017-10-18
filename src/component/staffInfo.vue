<template>
	<div>
		<load-more  :on-infinite="onInfinite" :dataList="scrollData">
      <div class="slide" id="slide">
        <i class="icon icon-109" id='back'></i>
        <i class="mood-icon" v-if='userBean.mood===1'></i>
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
            <dt class='staff-name' v-text='userBean.nick_name'></dt>
            <dd>
                <div class="staff-price price">&yen;{{userBean.price}}</div>
                <div>已接单：{{receviewOrder_num}}</div>
            </dd>
        </dl>
      </div>
      <div class="container">
        <div class="staff-info">
          <ul class="info-box">
              <li class="border-bottom-1px"><span><i class="info-icon-special"></i><strong>特长</strong></span><em id="info-special" v-text='userTypeBean.utype_name'></em></li>
              <li class="border-bottom-1px"><span><i class="info-icon-age"></i><strong>年龄</strong></span><em id="info-age">{{userBean.birthday|birthFilter}}</em></li>
              <li class="border-bottom-1px"><span><i class="info-icon-h"></i><strong>身高</strong></span><em id="info-h">{{userBean.height}}cm</em></li>
              <li class="border-bottom-1px"><span><i class="info-icon-w"></i><strong>体重</strong></span><em id="info-w">{{userBean.weight}}kg</em></li>
              <li class="border-bottom-1px"><span><i class="info-icon-area"></i><strong>籍贯</strong></span><em id="info-area">{{userBean.province}}{{userBean.city}}</em></li>
              <li class="border-bottom-1px"><span><i class="info-icon-love"></i><strong>兴趣爱好</strong></span><em id="info-love" v-text='userBean.hobby'></em></li>
          </ul>
          <div class="tags">
              <button class="weui_btn weui_btn_primary btn-checkced border-1px" v-for="(item,index) in tags" v-text="item"></button>
          </div>
        </div>
        <div class="comments">
            <h1>评论</h1>
            <ul class="comments-box">
                <li class="comments-list" v-for='(item,index) in feedbckList' :key='index'>
                    <dl>
                        <dt class="avater">
                            <img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg">
                        </dt>
                        <dd class="border-bottom-1px">
                            <div class="name">
                                <span class="color-6" v-text='item.customer.wechat_name'></span>
                                <span class="rate">
                                  <i v-for='(starItem,starIndex) in 5' :class='{"selected":starIndex<=item.feedbackBean.star}'></i>
                                </span>
                            </div>
                            <div class="content" v-text='item.feedbackBean.comment'></div>
                            <div class="date color-9">{{item.feedbackBean.create_time|dateFilter}}&nbsp;{{item.feedbackBean.create_time|timeFilter}}</div>
                        </dd>
                    </dl>
                </li>
            </ul>
          </div>
      </div>
    </load-more>
    <!-- <div class="op-btn primary-bg" @touchstart='predate' v-if='userBean.state===1'>
      立即预约
    </div>
    <div class="op-btn bg-c" v-if='userBean.state===0'>
      忙碌中
    </div> -->
	</div>
</template>
<script type="text/ecmascript-6">
	import loadMore from '../component/loadMore';
  	export default {
    	name: 'staffInfo',
    	data(){
    		return {
	        	scrollData: {
		          noFlag: false //暂无更多数据显示
		        },
		        page: 1,
		        pageSize: 10,
		        total_page: 0,
		        query: {},
		        userBean: {},
		        userTypeBean: {},
		        receviewOrder_num: '',
		        tags: [],
		        feedbckList: [],
	    	}
    	},
    	filters: {birthFilter,dateFilter,timeFilter},
	    components:{
	      	loadMore
	    },
	    methods: {
	      onInfinite(done) {
	        let more = this.$el.querySelector('.load-more');
	        if (this.page>=this.totalPage) {
	            more.style.display = 'none';
	            this.scrollData.noFlag = true;
	        }else{
	            this.page++;
	            this.getComment();
	            more.style.display = 'none';
	        }
	        done();
	      },
	      getDetail(){
	        let params = {
	          token: getCookie('token'),
	          employee_id: this.query.id
	        }
	        $.ajax({
	          url: `${baseAjax}/user/getEmployeeDetail.jhtml`,
	          type: 'GET',
	          dataType: 'json',
	          data: params,
	          success: res=>{
	            let {code,data,desc} =res;
	            if (code===0) {
	              this.userBean = data.employee.userBean;
	              this.tags = data.employee.userBean.tags.split(",");
	              this.userTypeBean = data.employee.userTypeBean;
	              this.receviewOrder_num = data.employee.receviewOrder_num;
	            }else{
	              error(desc)
	            }
	          }
	        });
	      },
	      getComment(){
	        let params = {
	          token: getCookie('token'),
	          employee_id: this.query.id,
	          page: this.page,
	          pageSize: this.pageSize
	        }
	        $.ajax({
	          url: `${baseAjax}/user/listEmployeeReview.jhtml`,
	          type: 'GET',
	          dataType: 'json',
	          data: params,
	          success: res=>{
	            let {code,data,desc} =res;
	            if (code===0) {
	              this.feedbckList = this.feedbckList.concat(data.feedbckList.data);
	            }else{
	              error(desc)
	            }
	          }
	        });
	      },
	      getRoom(){
	        let params ={
	          token: getCookie('token')
	        }
	        $.ajax({
	          url: `${baseAjax}/order/listAllRoom.jhtml`,
	          type: 'GET',
	          dataType: 'json',
	          data: params,
	          success: res=>{
	            let {code,data,desc} =res;
	            if (code===0) {
	              let room = data.roomList;
	              let roomList  = [];
	              for (let i = 0; i < room.length; i++) {
	                  let item = {
	                    text: room[i].room_name,
	                    value: room[i].room_id
	                  };
	                  roomList.push(item);
	              }
	              this.roomPicker = new Picker({
	                data: [roomList],
	                title: ""
	              });
	            }else{
	              error(desc)
	            }
	          }
	        });
	      },
	      predate(){
	        this.roomPicker.show();
	        this.roomPicker.on('picker.select',(val, index)=> {
	          this.createOrder(val[0]);
	        });
	      },
	      createOrder(id){
	        let params ={
	          token: getCookie('token'),
	          employee_id: this.query.id,
	          room_id: id
	        }
	        $.ajax({
	          url: `${baseAjax}/order/createOrder.jhtml`,
	          type: 'POST',
	          dataType: 'json',
	          data: params,
	          success: res=>{
	            let {code,data,desc} =res;
	            if (code===0) {
	              
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
		        this.getRoom();
		        this.getDetail();
		        this.getComment();
	    	})
	    }
  	}
</script>
<style type="text/css" lang='scss' scoped>
@import "../../static/css/mixin";
  .rate>i{
    display: inline-block;
    width: .24rem;
    height: .24rem;
    margin-left: .06rem;
    @include bg-image('../../static/images/star');
  }
  .rate>.selected{
    @include bg-image('../../static/images/star-selected');
  }
   .mood-icon{
	    display: inline-block;
	    width: .42rem;
	    height: .42rem;
	    position: absolute;
	    right: .2rem;
	    top: .2rem;
	    z-index: 100;
	    @include bg-image('../../static/images/sunny');
	}
  </style>