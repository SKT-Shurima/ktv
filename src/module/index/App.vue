<template>
  <div id="app">
      <load-more  :on-infinite="onInfinite" :dataList="scrollData">
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
              <dl @touchstart='typeList("")'>
                <dt class="nav-img-box"><img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt=""></dt>
                <dd>全部</dd>
              </dl>
            </li>
            <li class="nav-item weui-flex-item">
              <dl @touchstart='typeList("new")'>
                <dt class="nav-img-box"><img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt=""></dt>
                <dd>新人</dd>
              </dl>
            </li>
            <li class="nav-item weui-flex-item">
              <dl @touchstart='typeList("hot")'>
                <dt class="nav-img-box"><img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt=""></dt>
                <dd>热门</dd>
              </dl>
            </li>
            <li class="nav-item weui-flex-item">
              <dl>
                <dt class="nav-img-box">
                  <a href="ranking.html">
                      <img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg">
                  </a>
                  </dt>
                <dd>排行榜</dd>
              </dl>
            </li>
          </ul>
          <ul class='weui-flex'>
            <li class="nav-item weui-flex-item" v-for='(item,index) in type' :key='index'>
              <dl @touchstart='typeList(item.utype_id)'>
                <dt class="nav-img-box"><img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt=""></dt>
                <dd v-text='item.utype_name'></dd>
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
                <div class="staff-detail"><span>{{item.birthday|age}}岁</span><em v-text='item.hobby'></em></div>
              </dd>
            </dl>
          </li>
        </ul>
    </load-more>
    <v-footer></v-footer>
  </div>
</template>
 <script type="text/ecmascript-6">
 import loadMore from '../../component/loadMore'
 import vFooter from '../../component/vFooter';
    export default {
        data() {
            return {
                banner: [],
                type: [],
                page: 1, 
                pageSize: 10,
                totalPage: 1, 
                pageStart: 0, // 开始页数
                pageEnd: 0, // 结束页数
                listdata: [], // 下拉更新数据存放数组
                scrollData: {
                    noFlag: false //暂无更多数据显示
                },
                preType: '',
            }
        },
        components: {
          loadMore,vFooter
        },
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
          getType(){
            let params ={
              token: getCookie('token')
            };
            $.ajax({
              url: `${baseAjax}/user/userTypeList.jhtml`,
              type: 'GET',
              dataType: 'json',
              data: params,
              success: res=>{
                let {code,data,desc} =res;
                if (code===0) {
                  this.type = data.userTypeList;
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
          typeList(mask){
            switch(mask){
              case 'new':
                this.getNewList(mask);
                break;
              case 'hot':
                this.getHotList(mask);
                break;
              default:
                this.getTypeList(mask);
                break;
            };
            this.preType = mask;
          },
          getNewList(mask){
            let more = this.$el.querySelector('.load-more');
            let params ={
              token: getCookie('token'),
              page: this.page,
              pageSize: this.pageSize
            }
            $.ajax({
              url: `${baseAjax}/home/listEmployeeByNew.jhtml`,
              type: 'GET',
              dataType: 'json',
              data: params,
              success: res=>{
                let {code,data,desc} =res;
                if (code===0) {
                  let dataList = data.userList.data;
                  this.listdata = mask===this.preType?dataList:this.listdata.concat(this.listdata,dataList);
                  more.style.display = 'none';
                }else{
                  error(desc)
                }
              }
            });
          },
          getTypeList(mask){
            let more = this.$el.querySelector('.load-more');
            let params ={
              token: getCookie('token'),
              utype_id: mask,
              page: this.page,
              pageSize: this.pageSize
            }
            $.ajax({
              url: `${baseAjax}/home/listEmployeeBySearch.jhtml`,
              type: 'GET',
              dataType: 'json',
              data: params,
              success: res=>{
                let {code,data,desc} =res;
                if (code===0) {
                  let dataList = data.userList.data;
                  this.listdata = mask===this.preType?dataList:this.listdata.concat(this.listdata,dataList);
                  more.style.display = 'none';
                }else{
                  error(desc)
                }
              }
            });
          },
          getHotList() {
              
          },
          onInfinite(done) {
            let more = this.$el.querySelector('.load-more');
            if (this.page>=this.totalPage) {
              more.style.display = 'none';
              this.scrollData.noFlag = true;
            }else{
              this.page = this.page < this.totalPage?++this.page:1;
              let mask = this.preType;
              switch(this.preType){
                case 'new':
                  this.getNewList(mask);
                  break;
                case 'hot':
                  this.getHotList(mask);
                  break;
                default:
                  this.getTypeList(mask);
                  break;
              };
              more.style.display = 'none';
            }
            done();
          },
          staffDetail(id){

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
            //       setCookie("token",data.token,10);
                  
            //     }else{
            //       error(desc)
            //     }
            //   }
            // });
            this.getBanner();
            this.search();
            this.getType();
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
</style>
