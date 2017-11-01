<template>
  <div id="app">
        <div class="slide">
          <div class="search">
            <span class="primary"><i class="icon icon-4"></i><input type="text" placeholder='搜索员工' class="search-input" v-model='message'  @keyup.enter='searchList' ></span>
          </div>
          <swiper :slider-list='banner'></swiper>
        </div>
        <nav class="nav">
          <ul class="weui-flex">
            <li class="nav-item weui-flex-item">
              <dl @click='typeList("all")'>
                <dt class="nav-img-box"><i class="nav-icon alls-icon"></i></dt>
                <dd>全部</dd>
              </dl>
            </li>
            <li class="nav-item weui-flex-item">
              <dl @click='typeList("new")'>
                <dt class="nav-img-box"><i class="nav-icon newper-icon"></i></dt>
                <dd>新人</dd>
              </dl>
              
            </li>
            <li class="nav-item weui-flex-item">
              <dl @click='typeList("hot")'>
                <dt class="nav-img-box"><i class="nav-icon hot-icon"></i></dt>
                <dd>热门</dd>
              </dl>
            </li>
            <li class="nav-item weui-flex-item">
              <dl>
                <dt class="nav-img-box">
                  <a href="ranking.html">
                      <i class="nav-icon reward-icon"></i>
                  </a>
                  </dt>
                <dd>排行榜</dd>
              </dl>
            </li>
          </ul>
          <ul class='weui-flex'>
            <li class="nav-item weui-flex-item">
              <dl @click='typeList(1)'>
                <dt class="nav-img-box"><i class="nav-icon beau-icon"></i></dt>
                <dd>高颜值</dd>
              </dl>
            </li>
            <li class="nav-item weui-flex-item">
              <dl @click='typeList(2)'>
                <dt class="nav-img-box"><i class="nav-icon fresh-icon"></i></dt>
                <dd>小清新</dd>
              </dl>
            </li>
            <li class="nav-item weui-flex-item">
              <dl @click='typeList(3)'>
                <dt class="nav-img-box"><i class="nav-icon talent-icon"></i></dt>
                <dd>才艺</dd>
              </dl>
            </li>
            <li class="nav-item weui-flex-item">
              <dl @click='typeList(4)'>
                <dt class="nav-img-box"><i class="nav-icon bud-icon"></i></dt>
                <dd>萌妹子</dd>
              </dl>
            </li>
          </ul>
        </nav>
        <ul class="container weui-updown">
          <li class="con-list" v-for='(item,index) in listdata' :key='index'>
            <dl>
              <dt>
                <a :href="`predate.html?employee_id=${item.user_id}`">
                  <img :src="`${qnhost}${item.index_image}`"  @error='errorLoadImg'>
                </a>
                <i class="mood-icon" v-if='item.mood===1'></i>
                <div class="staff-mask" v-if='item.state===0'>
                  <span>已被预约</span>
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
  import swiper from '../../component/swiper';
  import vFooter from '../../component/vFooter';
  import {getList} from '../../common/js/mixins';
    export default {
        data() {
          return {
            banner: [],
            qnhost: qnhost,
            slide: '',
            preMsg: '',
            message: '',
            qnhost: qnhost
          }
        },
        filters:{
          birthFilter
        },
        components: {
          swiper,vFooter
        },
        mixins: [getList],
        methods: {
          getBanner(){
            let params = {
              token: getCookie('token'),
              terminal_type: 4
            }
            $.ajax({
              url: `${baseAjax}/home/index.jhtml`,
              type: 'GET',
              dataType: 'json',
              data: params,
              success: res=>{
                let {code,data,desc} =res;
                if (code===0) {
                  this.banner = data.bannerList;
                }else{
                  error(code,desc)
                }
              }
            });
          }
        },
        mounted(){
          this.$nextTick(()=>{
            this.getBanner();
          })
        }
    }
</script>
<style type="text/css" lang='scss' scoped>
  @import '../../common/css/mixin';
  #app{
    position: relative;
    height: 100vh;
  }
  .mood-icon{
    display: inline-block;
    width: .42rem;
    height: .42rem;
    position: absolute;
    right: .2rem;
    top: .2rem;
    @include bg-image('../../common/img/sunny');
  }
  .nav-icon{
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  .alls-icon{
    @include bg-image('../../common/img/alls');
  }
  .newper-icon{
    @include bg-image('../../common/img/newper');
  }
  .hot-icon{
    @include bg-image('../../common/img/hot');
  }
  .reward-icon{
    @include bg-image('../../common/img/reward');
  }
  .beau-icon{
    @include bg-image('../../common/img/beau');
  }
  .fresh-icon{
    @include bg-image('../../common/img/fresh');
  }
  .talent-icon{
    @include bg-image('../../common/img/talent');
  }
  .bud-icon{
    @include bg-image('../../common/img/bud');
  }
</style>
