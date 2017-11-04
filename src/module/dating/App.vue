<template>
  <div id="app">
    <div class="nav-wrap" id='topNav'>
        <ul class="nav-box swiper-wrapper">
          <li @click='typeList("all")' class="swiper-slide"><a href="javascript:void(0)" class="border-bottom-1px" :class='{"nav-active":navIndex==="all"}'>推荐</a></li>
          <li @click='typeList("new")' class="swiper-slide"><a href="javascript:void(0)"  class="border-bottom-1px" :class='{"nav-active":navIndex==="new"}'>新人</a></li>
          <li @click='typeList("hot")' class="swiper-slide"><a href="javascript:void(0)"  class="border-bottom-1px" :class='{"nav-active":navIndex==="hot"}'>热门</a></li>
          <li class="swiper-slide"><a href="reward.html" class="border-bottom-1px">打赏榜</a></li>
          <li @click='typeList(1)' class="swiper-slide"><a href="javascript:void(0)"  class="border-bottom-1px" :class='{"nav-active":navIndex===1}'>高颜值</a></li>
          <li @click='typeList(2)' class="swiper-slide"><a href="javascript:void(0)"  class="border-bottom-1px" :class='{"nav-active":navIndex===2}'>小清新</a></li>
          <li @click='typeList(3)' class="swiper-slide"><a href="javascript:void(0)"  class="border-bottom-1px" :class='{"nav-active":navIndex===3}'>才艺</a></li>
          <li @click='typeList(4)' class="swiper-slide"><a href="javascript:void(0)" class="border-bottom-1px" :class='{"nav-active":navIndex===4}'>萌妹子</a></li>
        </ul>
      </div>
      <ul class="container">
        <li class="con-list" v-for='(item,index) in listdata' :key='index'>
          <dl>
            <dt>
              <a :href='"predate.html?employee_id="+item.user_id'>
                <img :src="`${qnhost}${item.index_image}`"  @error='errorLoadImg'>
                <i class="mood-icon" v-if='item.mood===1'></i>
                <div class="staff-mask" v-if='item.state===0'>
                  <span>忙碌中</span>
                </div>
              </a>
            </dt>
            <dd>
              <div class="staff-info"><span v-text='item.nick_name'></span><em class="price">&yen;{{item.price}}</em></div>
              <div class="staff-detail ellipsis-1"><span>{{item.birthday|birthFilter}}岁</span><em v-text='item.hobby'></em></div>
            </dd>
          </dl>
        </li>
      </ul>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    <v-footer></v-footer>
</div>
</template>
<script type="text/ecmascript-6">
import vFooter from '../../component/vFooter';
import {getList} from '../../common/js/mixins';
  export default {
    name: 'app',
    data(){
      return{
        qnhost: qnhost
      }
    },
    filters:{
      birthFilter
    },
    mixins: [getList],
    components:{
      vFooter
    },
    mounted(){
      this.$nextTick(()=>{
      
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
