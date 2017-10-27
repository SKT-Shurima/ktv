<template>
	<div>
		<div v-if='hasCon'>
			<div class="ranking-num weui-flex">
	            <div class="weui-flex-item" v-if='s.user_id'>
	                <dl class="ranking-box">
	                    <dt class="ranking-s-icon">
	                        <div>
	                            <img :src="`${qnhost}${s.index_image}`"  @load='successLoadAvater' @error='errorLoadAvater' class="default-avater">
	                        </div>
	                    </dt>
	                    <dd>
	                        <div class="ranking-s ranking-s-name" v-text='s.nick_name'></div>
	                        <div class="ranking-s ranking-price">&yen;{{s.total_award}}</div>
	                    </dd>
	                </dl>
	            </div>
	            <div class="weui-flex-item" v-if='f.user_id'>
	                <dl>
	                    <dt class="ranking-f-icon">
	                        <div>
	                            <img :src="`${qnhost}${f.index_image}`"  @load='successLoadAvater' @error='errorLoadAvater' class="default-avater">
	                        </div>
	                    </dt>
	                    <dd>
	                        <div class="ranking-f ranking-f-name" v-text='f.nick_name'></div>
	                        <div class="ranking-f ranking-price">&yen;{{f.total_award}}</div>
	                    </dd>
	                </dl>
	            </div>
	            <div class="weui-flex-item" v-if='t.user_id'>
	                <dl class="ranking-box">
	                    <dt class="ranking-t-icon">
	                        <div>
	                            <img :src="`${qnhost}${t.index_image}`"  @load='successLoadAvater' @error='errorLoadAvater' class="default-avater">
	                        </div>
	                    </dt>
	                    <dd>
	                        <div class="ranking-t ranking-t-name" v-text='t.nick_name'></div>
	                        <div class="ranking-t ranking-price">&yen;{{f.total_award}}</div>
	                    </dd>
	                </dl>
	            </div>
	        </div>
	        <ul class="ranking-box weui-updown">
	            <li class="ranking-item border-bottom-1px" v-for="(item,index) in list" :key='index'>
	                <i>{{index+3}}</i>
	                <img :src="`${qnhost}${item.index_image}`"  @load='successLoadAvater' @error='errorLoadAvater' class="default-avater">
	                <strong v-text='item.nick_name'></strong>
	                <span class="primary">&yen;{{item.total_award}}</span>
	            </li>
	        </ul>
		</div>
		<div class="no-container" v-else>
			暂无数据
		</div>
	</div>
	
</template>

<script type="text/ecmascript-6">
  export default {
  	data(){
  		return {
  			f: {},
  			s: {},
  			t: {},
  			list: [],
  			hasCon: false,
        qnhost: qnhost
  		}
  	},
  	methods:{
  		getList(){
  			let params ={
              token: getCookie('token')
            };
            $.ajax({
              url: `${baseAjax}/home/listSortAward.jhtml`,
              type: 'GET',
              dataType: 'json',
              data: params,
              success: res=>{
                let {code,data,desc} =res;
                if (code===0) {
                	let list = data.sortAward;
                	this.hasCon = list.length===0?false:true;
                	this.f = list[0]?list[0]:{};
                	this.s = list[1]?list[1]:{};
                	this.t = list[2]?list[2]:{};
                	if (list.length>=3) {
                		this.list = list.slice(3);
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
  			this.getList();
  		})
  	}
  }
</script>
<style type="text/css" lang='scss' scoped>
    @import '../common/css/mixin';
    .ranking-box{
        padding-top: .47rem;
    }
    .ranking-f-icon{
        position: relative;
        width: 1.96rem;
        height: 2.45rem;
        margin: 0px auto;
        div{
            position: absolute;
            width: 1.4rem;
            height: 1.24rem;
            top: .6rem;
            left: .28rem;
            overflow: hidden;
            img{
                width: 100%;
                border-radius: 50%;
            }
        }
    }
    .ranking-s-icon{
        position: relative;
        width: 1.64rem;
        height: 2rem;
        margin: 0px auto;
        div{
            position: absolute;
            width: 1.21rem;
            height: 1.02rem;
            top: .48rem;
            left: .22rem;
            overflow: hidden;
            img{
                width: 100%;
                border-radius: 50%;
            }
        }
    }
    .ranking-t-icon{
        position: relative;
        width: 1.66rem;
        height: 2rem;
        margin: 0px auto;
        div{
            position: absolute;
            width: 1.21rem;
            height: 1.02rem;
            top: .45rem;
            left: .22rem;
            overflow: hidden;
            img{
                width: 100%;
                border-radius: 50%;
            }
        }
    }
    .default-avater{
      @include bg-image('../common/img/default-avater');
    }
    .ranking-f-icon{
        @include bg-image('../common/img/No1');
    }
    .ranking-s-icon{
        @include bg-image('../common/img/No2');
    }
    .ranking-t-icon{
        @include bg-image('../common/img/No3');
    }
</style>