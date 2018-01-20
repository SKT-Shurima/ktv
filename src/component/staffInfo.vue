<template>
	<div>
      <div class="slide">
        <i class="icon icon-109" id='back'></i>
        <i class="mood-icon" v-if='employee.mood===1'></i>
        <swiper :slider-list='index_image'></swiper>
        <dl class="price-mask">
            <dt class='staff-name' v-text='employee.nick_name'></dt>
            <dd>
                <div class="staff-price price">&yen;{{employee.price}}</div>
                <div>已接单：{{employee.receiveOrder_num}}</div>
            </dd>
        </dl>
      </div>
      <div class="container">
        <div class="staff-info">
          <ul class="info-box">
              <li class="border-bottom-1px"><span><i class="info-icon special-icon"></i><strong>特长</strong></span><em v-text='employee.utype_name'></em></li>
              <li class="border-bottom-1px"><span><i class="info-icon age-icon"></i><strong>年龄</strong></span><em>{{employee.birthday|birthFilter}}</em></li>
              <li class="border-bottom-1px"><span><i class="info-icon heigh-icon"></i><strong>身高</strong></span><em>{{employee.height}}cm</em></li>
              <li class="border-bottom-1px"><span><i class="info-icon weight-icon"></i><strong>体重</strong></span><em>{{employee.weight}}kg</em></li>
              <li class="border-bottom-1px"><span><i class="info-icon area-icon"></i><strong>籍贯</strong></span><em>{{employee.province}}{{employee.city}}</em></li>
              <li class="border-bottom-1px"><span><i class="info-icon hobby-icon"></i><strong>兴趣爱好</strong></span><em v-text='employee.hobby'></em></li>
          </ul>
          <div class="tags">
              <button class="weui_btn weui_btn_primary btn-checkced border-1px" v-for="(item,index) in tags" v-text="item"></button>
          </div>
        </div>
        <div class="comments">
            <h1>评论</h1>
            <ul class="comments-box" v-if='feedbckList.length'>
                <li class="comments-list" v-for='(item,index) in feedbckList' :key='index'>
                    <dl>
                        <dt class="avater">
                            <img :src="item.customer.wechat_portrait"  @load='successLoadAvater' @error='errorLoadAvater' class="default-avater">
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
            <div class="no-container" v-else>
				暂无数据
			</div>
        </div>
        <infinite-loading @infinite="infiniteHandler" force-use-infinite-wrapper="true"></infinite-loading>
      </div>
	</div>
</template>
<script type="text/ecmascript-6">
	import swiper from './swiper';
  	export default {
    	name: 'staffInfo',
    	data(){
    		return {
	        	loadState:'',
		        page: 1,
		        pageSize: 10,
		        total_page: 0,
		        query: {},
		        employee: {},
		        tags: [],
		        index_image: [],
		        feedbckList: [],
		        qnhost: qnhost
	    	}
    	},
    	props: ["getState"],
    	filters: {birthFilter,dateFilter,timeFilter},
	    components:{
	      	swiper,InfiniteLoading:VueInfiniteLoading.default,
	    },
	    methods: {
	      infiniteHandler($state) {
	      	this.loadState = $state;
	      	setTimeout(()=>{
	      		if (this.page>=this.total_page) {
		            $state.loaded();
	                return false; ;
		        }else{
		            this.page++;
		            this.getComment();
		        }
	      	},600);
	      },
	      getDetail(){
	        let params = {
	          token: getCookie('token'),
	          employee_id: this.query.employee_id
	        }
	        $.ajax({
	          url: `${baseAjax}/user/getEmployeeDetail.jhtml`,
	          type: 'GET',
	          dataType: 'json',
	          data: params,
	          success: res=>{
	            let {code,data,desc} =res;
	            if (code===0) {
	                this.employee = data.employee;
	                this.tags = data.employee.tags.split(",");
	               	let index_image = data.employee.index_image.split(",");
	                for(let i = 0;i<index_image.length;i++){
	                	index_image[i]={
	                		name: data.employee.nick_name,
	                		image: index_image[i]
	                	}
	                }
	                this.index_image = index_image;
	              	if (this.getState) {
	              		this.$emit('sendstate',this.employee.state);
	              	}
	              	this.loadState?this.loadState.loaded():"";
	            }else{
	              error(code,desc)
	            }
	          }
	        });
	      },
	      getComment(){
	        let params = {
	          token: getCookie('token'),
	          employee_id: this.query.employee_id,
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
	            	this.total_page = data.feedbckList.total_page;
	              	this.feedbckList = this.feedbckList.concat(data.feedbckList.data);
	              	this.loadState.loaded();
	            }else{
	              error(code,desc)
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
		        this.getDetail();
		        this.getComment();
	    	})
	    }
  	}
</script>
<style type="text/css" lang='scss' scoped>
@import "../common/css/mixin";
  .rate>i{
    display: inline-block;
    width: .24rem;
    height: .24rem;
    margin-left: .06rem;
    @include bg-image('../common/img/star');
  }
  .rate>.selected{
    @include bg-image('../common/img/star-selected');
  }
   .mood-icon{
	    display: inline-block;
	    width: .42rem;
	    height: .42rem;
	    position: absolute;
	    right: .2rem;
	    top: .2rem;
	    z-index: 100;
	    @include bg-image('../common/img/sunny');
	}
	.info-icon{
		display: inline-block;
	    width: .42rem;
	    height: .42rem;
	    vertical-align: -.1rem;
	    margin-right: .2rem;
	}
	.special-icon{
		@include bg-image('../common/img/special');
	}
	.age-icon{
		@include bg-image('../common/img/age');
	}
	.heigh-icon{
		@include bg-image('../common/img/heigh');
	}
	.weight-icon{
		@include bg-image('../common/img/weight');
	}
	.area-icon{
		@include bg-image('../common/img/area');
	}
	.hobby-icon{
		@include bg-image('../common/img/hobby');
	}
  </style>