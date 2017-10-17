<template>
 	 <div id="app">
  		<load-more  :on-infinite="onInfinite" :dataList="scrollData">
		    <header class="primary-header primary-bg">
			    <i class="icon icon-109" id='back'></i>历史明细
			</header>
			<div class="container">
				<ul v-if='financeList.length'>
				    <li class="account-list border-bottom-1px" v-for="(item,index) in financeList" :key='index'>
				        <div class="account-detail">
				            <span v-text='item.optarget_name'></span>
				            <em>{{item.finance_sign===1?"+":"-"}}{{item.finance_price}}</em>
				        </div>
				        <div class="account-date color-9">{{item.create_time|dateFilter}}</div>
				    </li>
				</ul>
				<div class="no-container" v-else>
					暂无历史明细
				</div>
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
                page: 1, 
                pageSize: 10,
                totalPage: 1,
                financeList: []
    		}
    	},
    	filters: {
    		dateFilter
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
                    this.page++ ;
                    this.getList();
                    more.style.display = 'none';
                }
                done();
            },
        	getList(){
        		let params ={
        			token: getCookie('token'),
        			page: this.page,
        			pageSize: this.pageSize
        		}
        		$.ajax({
                    url: `${baseAjax}/user/listUserHistoryFinance.jhtml`,
                    type: 'GET',
                    dataType: 'json',
                    data: params,
                    success: res=>{
                        let {code,data,desc} =res;
                        if (code===0) {
                            this.financeList = this.financeList.concat(data.financeList.data);
                            this.totalPage = data.financeList.total_page;
                        }else{
                          error(desc)
                        }
                    }
                });

        	}
        },
        mounted(){
        	this.$nextTick(()=>{
        		this.getList();
        	})
        }
  	}
</script>
