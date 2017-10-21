<template>
  <div id="app">
      <load-more  :on-infinite="onInfinite" :dataList="scrollData">
        <div class="slide" id="slide">
          <div class="search">
            <span class="primary"><i class="icon icon-4"></i><input type="text" placeholder='搜索员工' class="search-input" @keyup.enter='search' ></span>
          </div>
          <ul>
              <li v-for='(item,index) in 5' :key='index'>
                  <img src="http://static.strongmall.net/upload/goods/2017_07_27/d5f9e34789d2ada6be12baaa0825bf512f876861.png?imageView2/2/w/750/h/750" data-src="http://static.strongmall.net/upload/goods/2017_07_27/d5f9e34789d2ada6be12baaa0825bf512f876861.png?imageView2/2/w/750/h/750" alt="">
              </li>
          </ul>
          <div class="dot">
              <span v-for='item in 5'></span>
          </div>
        </div>
        <nav class="nav">
          <ul class="weui-flex">
            <li class="nav-item weui-flex-item">
              <dl @touchstart='typeList("")'>
                <dt class="nav-img-box"><i class="nav-icon alls-icon"></i></dt>
                <dd>全部</dd>
              </dl>
            </li>
            <li class="nav-item weui-flex-item">
              <dl @touchstart='typeList("new")'>
                <dt class="nav-img-box"><i class="nav-icon newper-icon"></i></dt>
                <dd>新人</dd>
              </dl>
            </li>
            <li class="nav-item weui-flex-item">
              <dl @touchstart='typeList("hot")'>
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
              <dl @touchstart='typeList(1)'>
                <dt class="nav-img-box"><i class="nav-icon beau-icon"></i></dt>
                <dd>高颜值</dd>
              </dl>
            </li>
            <li class="nav-item weui-flex-item">
              <dl @touchstart='typeList(2)'>
                <dt class="nav-img-box"><i class="nav-icon fresh-icon"></i></dt>
                <dd>小清新</dd>
              </dl>
            </li>
            <li class="nav-item weui-flex-item">
              <dl @touchstart='typeList(3)'>
                <dt class="nav-img-box"><i class="nav-icon talent-icon"></i></dt>
                <dd>才艺</dd>
              </dl>
            </li>
            <li class="nav-item weui-flex-item">
              <dl @touchstart='typeList(4)'>
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
                <div class="staff-detail"><span>{{item.birthday|birthFilter}}岁</span><em v-text='item.hobby'></em></div>
              </dd>
            </dl>
          </li>
        </ul>
    </load-more>
    <v-footer></v-footer>
  </div>
</template>
 <script type="text/ecmascript-6">
  import loadMore from '../../component/loadMore';
  import vFooter from '../../component/vFooter';
  import {getList} from '../../../static/js/mixins';
    export default {
        data() {
          return {
            banner: []
          }
        },
        filters:{
          birthFilter
        },
        components: {
          loadMore,vFooter
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
                  error(desc)
                }
              }
            });
          },
          search(){
            let params ={
              token: getCookie('token'),
              messsage: '',
              page: this.page,
              pageSize: 10
            }
            $.ajax({
              url: `${baseAjax}/home/listEmployeeBySearch.jhtml`,
              type: 'GET',
              dataType: 'json',
              data: params,
              success: res=>{
                let {code,data,desc} =res;
                if (code===0) {
                  this.listdata = data.userList.data;
                }else{
                  error(desc)
                }
              }
            });
          },
        },
        mounted(){
          this.$nextTick(()=>{
            let params  ={
              code: '123456'
            }
            // $.ajax({
            //   url: `${baseAjax}/login/login.jhtml`,
            //   type: 'POST',
            //   dataType: 'json',
            //   data: params,
            //   success: res=>{
            //     let {code,data,desc} =res;
            //     if (code===0) {
            //       let userInfo = JSON.stringify(data.user);
            //       sessionStorage.userInfo = userInfo;
            //       setCookie("token",data.token,100);
            //     }else{
            //       error(desc)
            //     }
            //   }
            // });
            this.getBanner();
            this.search();
          })
        }
    }
</script>
<style type="text/css" lang='scss' scoped>
  @import '../../../static/css/mixin.scss';
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
    @include bg-image('../../../static/images/sunny');
  }
  .nav-icon{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .alls-icon{
    @include bg-image('../../../static/images/alls');
  }
  .newper-icon{
    @include bg-image('../../../static/images/newper');
  }
  .hot-icon{
    @include bg-image('../../../static/images/hot');
  }
  .reward-icon{
    @include bg-image('../../../static/images/reward');
  }
  .beau-icon{
    @include bg-image('../../../static/images/beau');
  }
  .fresh-icon{
    @include bg-image('../../../static/images/fresh');
  }
  .talent-icon{
    @include bg-image('../../../static/images/talent');
  }
  .bud-icon{
    @include bg-image('../../../static/images/bud');
  }
</style>
