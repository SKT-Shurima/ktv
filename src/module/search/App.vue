<template>
  <div id="app">
    <header class="primary-header primary-bg">
        <i class="icon icon-109" id='back'></i>搜索
    </header>
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
        qnhost: qnhost,
        query: {},
        loadState: '',
        page: 0, 
        pageSize: 10,
        total_page: 1,
        listdata: []
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
      infiniteHandler($state) {
          this.loadState = $state;
          setTimeout(() => {
            if (this.page>=this.total_page) {
              $state.loaded();
              return false;       
            }else{
              ++this.page;
              this.getKeywordList();
            }
          }, 1000);
        },
      getKeywordList(){
        let params = {
            token: getCookie('token'),
            page: this.page,
            pageSize: this.pageSize,
            message: decodeURI(this.query.keyword),
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
                  for (let i = 0; i < dataList.length; i++) {
                      dataList[i].index_image = dataList[i].index_image.split(',')[0];
                  }
                  this.listdata = this.listdata.concat(dataList);
                  this.total_page = data.userList.total_page; 
                  this.loadState.loaded();
                }else{
                  error(desc)
                }
              }
            });
      }
    },
    created(){
      this.query = getRequest();
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
