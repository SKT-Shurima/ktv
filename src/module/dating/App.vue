<template>
  <div id="app">
    <div id="tagnav" class="weui-navigator weui-navigator-wrapper">
        <ul class="weui-navigator-list" style="height: 10px;overflow:hidden;">
          <li @touchstart='typeList("all")'><a href="javascript:void(0);">推荐</a></li>
          <li @touchstart='typeList("new")'><a href="javascript:void(0);">新人</a></li>
          <li @touchstart='typeList("hot")'><a href="javascript:void(0);">热门</a></li>
          <li><a href="reward.html">打赏榜</a></li>
          <li @touchstart='typeList(1)'><a href="javascript:void(0);">高颜值</a></li>
          <li @touchstart='typeList(2)'><a href="javascript:void(0);">小清新</a></li>
          <li @touchstart='typeList(3)'><a href="javascript:void(0);">才艺</a></li>
          <li @touchstart='typeList(4)'><a href="javascript:void(0);">萌妹子</a></li>
        </ul>
      </div>
    <load-more  :on-infinite="onInfinite" :dataList="scrollData">
      <ul class="container">
        <li class="con-list" v-for='(item,index) in listdata' :key='index'>
          <dl>
            <dt>
              <a :href='"predate.html?employee_id="+item.user_id'>
                <img :src="`${qnhost}${item.index_image}`"  @error='errorLoadImg'>
              </a>
              <i class="mood-icon" v-if='item.mood===1'></i>
              <div class="staff-mask" v-if='item.state===0'>
                <span>忙碌中</span>
              </div>
            </dt>
            <dd>
              <div class="staff-info"><span v-text='item.nick_name'></span><em class="price">&yen;{{item.price}}</em></div>
              <div class="staff-detail ellipsis-1"><span>{{item.birthday|birthFilter}}岁</span><em v-text='item.hobby'></em></div>
            </dd>
          </dl>
        </li>
      </ul>
    </load-more>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import vFooter from '../../component/vFooter';
import loadMore from '../../component/loadMore';
import {getList} from '../../common/js/mixins';
  export default {
    name: 'app',
    data(){
      return{
        tabIndex: 1,
        qnhost: qnhost
      }
    },
    filters:{
      birthFilter
    },
    mixins: [getList],
    components:{
      vFooter,loadMore
    },
    methods: {
    },
    mounted(){
      this.$nextTick(()=>{
        TagNav('#tagnav',{
          type: 'scrollToFirst',
        });
      })
    }
  }
</script>
<style type="text/css" lang='scss' scoped>
@import '../../common/css/mixin';
  .weui-navigator-list{
    .border-bottom-1px::after {
      height: 2px;
      background-color: #f65287;
    }
  }
</style>
