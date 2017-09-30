<template>
  <div id="app">
     <div id="tagnav" class="weui-navigator weui-navigator-wrapper">
      <ul class="weui-navigator-list" style="height: 10px;overflow:hidden;">
        <li><a href="javascript:void(0);">推荐</a></li>
        <li><a href="javascript:void(0);">新人</a></li>
        <li><a href="javascript:void(0);">热门</a></li>
        <li><a href="reward.html">打赏榜</a></li>
        <li><a href="javascript:void(0);">高颜值</a></li>
        <li><a href="javascript:void(0);">小清新</a></li>
        <li><a href="javascript:void(0);">萌妹子</a></li>
        <li><a href="javascript:void(0);">才艺</a></li>
      </ul>
    </div>
    <ul class="container weui-updown">
      <li class="con-list" v-for='(item,index) in listdata' :key='index'>
        <dl>
          <dt>
            <a :href='"staffDetail.html?id="+item.user_id'>
              <img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt="">
            </a>
            <i class="mood-icon" v-if='item.mood===1'></i>
            <div class="staff-mask" v-if='item.state===0'>
              <span>已被预约</span>
            </div>
          </dt>
          <dd>
            <div class="staff-info"><span v-text='item.nick_name'></span><em class="price">&yen;{{item.price}}</em></div>
            <div class="staff-detail"><span>{{item.birthday|age}}岁</span><em v-text='item.hobby'></em></div>
          </dd>
        </dl>
      </li>
    </ul>
    <v-footer></v-footer>
  </div>
</template>

<script>
import vFooter from '../../component/vFooter';
  export default {
    name: 'app',
    data(){
      return{
        listdata: [],
      }
    },
    components:{
      vFooter
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
