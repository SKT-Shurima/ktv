<template>
 	 <div id="app">
        <div style='width: 100%;height: 100%;'>
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
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
  	export default {
    	name: 'app',
    	data(){
    		return {
    			loadState: '',
                page: 0, 
                pageSize: 10,
                totalPage: 1,
                financeList: []
    		}
    	},
    	filters: {
    		dateFilter
    	},
        methods:{
            infiniteHandler($state) {
                this.loadState = $state;
                setTimeout(() => {
                    if (this.page>=this.totalPage) {
                        $state.loaded();
                        return false;
                    }else{
                        this.page++ ;
                        this.getList();
                    }
                }, 1000);
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
                            this.loadState.loaded(); 
                        }else{
                          error(code,desc)
                        }
                    }
                });

        	}
        }
  	}
</script>
<style type="text/css" lang='scss' scoped>
    .container{
        position: relative;
        top: .88rem;
        background-color: #fff;
    }
</style>
