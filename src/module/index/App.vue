<template>
  <div id="app">
    <div class="slide" id="slide">
    <div class="search">
      <span class="primary"><i class="icon icon-4"></i><input type="text" placeholder='搜索员工' class="search-input" @keyup.enter='search' ></span>
    </div>
      <ul>
          <li v-for='(item,index) in 5' :key='index'>
              <img src="http://7xr193.com1.z0.glb.clouddn.com/1.jpg" data-src="http://7xr193.com1.z0.glb.clouddn.com/1.jpg" alt="">
          </li>
      </ul>
      <div class="dot">
          <span v-for='item in 5'></span>
      </div>
  </div>
    <nav class="nav">
      <ul class="weui-flex">
        <li class="nav-item weui-flex-item">
          <dl data-item='1'>
            <dt class="nav-img-box"><img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt=""></dt>
            <dd>全部</dd>
          </dl>
        </li>
        <li class="nav-item weui-flex-item">
          <dl data-item='2'>
            <dt class="nav-img-box"><img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt=""></dt>
            <dd>新人</dd>
          </dl>
        </li>
        <li class="nav-item weui-flex-item">
          <dl data-item='3'>
            <dt class="nav-img-box"><img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt=""></dt>
            <dd>热门</dd>
          </dl>
        </li>
        <li class="nav-item weui-flex-item">
          <dl data-item='4'>
            <dt class="nav-img-box"><img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt=""></dt>
            <dd>排行榜</dd>
          </dl>
        </li>
      </ul>
      <ul class='weui-flex'>
        <li class="nav-item weui-flex-item">
          <dl data-item='5'>
            <dt class="nav-img-box"><img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt=""></dt>
            <dd>高颜值</dd>
          </dl>
        </li>
        <li class="nav-item weui-flex-item">
          <dl data-item='6'>
            <dt class="nav-img-box"><img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt=""></dt>
            <dd>小清新</dd>
          </dl>
        </li>
        <li class="nav-item weui-flex-item">
          <dl data-item='7'>
            <dt class="nav-img-box"><img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt=""></dt>
            <dd>萌妹子</dd>
          </dl>
        </li>
        <li class="nav-item weui-flex-item">
          <dl data-item='8'>
            <dt class="nav-img-box"><img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt=""></dt>
            <dd>才艺</dd>
          </dl>
        </li>
      </ul>
    </nav>
    <ul class="container weui-updown">
      <li class="con-list" v-for='(item,index) in employeeList' :key='index'>
        <dl>
          <dt >
            <img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt="" @touchstart='staffDetail(item.user_id)'>
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
      </li>
    </ul>
    <v-footer></v-footer>
  </div>
</template>

<script>
import vFooter from '../../component/vFooter';
import {login,info} from "../../common/api";
  export default {
    name: 'app',
    data(){
      return {
        banner: [],
        employeeList:[],
        page: 1
      }
    },
    components:{
      vFooter
    },
    methods: {
      getIndex(){
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
      getList(){
        let params ={
          token: getCookie('token'),
          page: this.page,
          pageSize: 10
        }
        $.ajax({
          url: `${baseAjax}/home/employeeListByNew.jhtml`,
          type: 'GET',
          dataType: 'json',
          data: params,
          success: res=>{
            let {code,data,desc} =res;
            if (code===0) {
              this.employeeList = data.userList.data;
            }else{
              error(desc)
            }
          }
        });
      },
      search(){
        console.log(12)
      },
      staffDetail(id){
        location.href = `staffDetail.html?user_id=${id}`;
      }
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
        //       setCookie("token",data.token,10);
              
        //     }else{
        //       error(desc)
        //     }
        //   }
        // });
        this.getIndex();
        this.getList();
        
      })
    }
  }
</script>
<style type="text/css" lang='scss' scoped>
  @import '../../../static/css/mixin.scss';
  .mood-icon{
    display: inline-block;
    width: .42rem;
    height: .42rem;
    position: absolute;
    right: .2rem;
    top: .2rem;
    @include bg-image('../../../static/images/sunny');
  }
</style>
