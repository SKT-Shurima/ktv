<template>
  <div id="app">
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
        qnhost: qnhost,
        query: {}
      }
    },
    filters:{
      birthFilter
    },
    mixins: [getList],
    components:{
      vFooter
    },
    methods: {
    },
    created(){
      this.query = getRequest();
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
