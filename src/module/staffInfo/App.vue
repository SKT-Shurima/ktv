<template>
  <div id="app">
    <div style='width: 100%;height: 100%;'>
      <div class="staff-info primary-bg">
        <i class="icon icon-109" id='back'></i>
        <a href="editInfo.html" class="edit">编辑</a>
        <dl class="info-box">
          <dt class="avater">
            <img :src="user.wechat_portrait"  @load='successLoadAvater' @error='errorLoadAvater' class="default-avater">
          </dt>
          <dd class="signin" :class='[sign===0?"signin-bg":sign===2?"signed-bg":"signup-bg"]' @touchstart="signin">
            {{sign===0?"签到":sign===2?"已签":"签退"}}
          </dd>
        </dl>
     </div>
   <div class="container">
      <div class="upload-avater">
        <div class="upload-limit color-9">
          个人图册
        </div>
        <div class="avater-list-wrap" id='avater-list'>
              <ul class="avater-list-box" :style='{width: (index_image.length+1)*90+"px"}'>
                <li v-for='(item,index) in index_image' :key='index' :style='{backgroundImage: `url(${qnhost}${item})`}' class="weui_uploader_file">
                </li>
              </ul>
          </div>
      </div>
      <ul class="base-info">
          <li class="border-bottom-1px cell"><label class="cell-label">姓名</label><em v-text='user.real_name'></em></li>
          <li class="border-bottom-1px cell"><label class="cell-label">花名</label><em v-text='user.nick_name'></em></li>
          <li class="border-bottom-1px cell"><label class="cell-label">类别</label><em v-text='user.utype_name'></em></li>
      </ul>
      <ul class="base-info">
          <li class="border-bottom-1px cell"><label class="cell-label">身高(cm)</label><em v-text='user.height'></em></li>
          <li class="border-bottom-1px cell"><label class="cell-label">体重(kg)</label><em v-text='user.weight'></em></li>
          <li class="border-bottom-1px cell"><label class="cell-label">籍贯</label><em>{{user.province}}{{user.city}}</em></li>
          <li class="border-bottom-1px cell"><label class="cell-label">出生日期</label><em>{{user.birthday|birthFilter}}</em></li>
      </ul>
      <ul class="base-info">
          <li class="border-bottom-1px cell"><label class="cell-label">兴趣爱好</label><em v-text='user.hobby'></em></li>
          <li class="border-bottom-1px cell"><label class="cell-label">心情</label><span class="mood-icon"><i class='mood-sunny selected' v-if='user.mood===1'></i><i class="mood-unsunny selected"  v-else></i></span></li>
      </ul>
      <div class="tag">
        <h1>标签</h1>
        <div class="tags">
          <button class="weui_btn  border-1px  btn-checkced" :class='{"btn-checkced":item.index===index}' v-for='(item,index) in tags' v-text='item'></button>
        </div>
      </div>
   </div>
    <div class="op-btn primary-bg" v-if='user.state === 1' @touchstart="toBusy">
      切换为忙碌状态
    </div>
    <div class="op-btn bg-c" v-if='user.state === 0'>
      忙碌中...
    </div>
    <signin ref='payfor' @payType='payfor'></signin>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import {getInfo} from '../../common/js/mixins';
  import signin from  '../../component/signinPayfor';
  export default {
    name: 'app',
    data(){
      return {
      }
    },
    mixins: [getInfo],
    filters: {
      birthFilter
    },
    components:{
      signin
    },
    methods: {
      signin(){
        if (this.sign===0) {
            this.payment();
            return false;
        }else if(this.sign === 2){
            return false;
        }
        let params = {
          token: getCookie('token')
        }
        $.ajax({
          url: `${baseAjax}/user/signout.jhtml`,
          type: 'POST',
          dataType: 'json',
          data: params,
          success: res=>{
            let {code,data,desc} =res;
            if (code===0) {
              this.userInfo();
            }else{
              error(code,desc)
            }
          }
        });
      },
      payment(){
        this.$refs.payfor.maskBol = true;
      },
      payfor(payParams){
        let {order_amount,optype} =payParams;
        let params ={
          token: getCookie('token'),
          optype: optype,
          order_amount: order_amount,
          optarget: 4
        }
        $.ajax({
          url: `${baseAjax}/pay/pay.jhtml`,
          type: 'POST',
          dataType: 'json',
          data: params,
          success: res=>{
            let {code,data,desc} =res;
            if (code===0) {
              if (optype==1) {
                WeixinJSBridge.invoke('getBrandWCPayRequest',{
                  "appId":data.payParams.appId,
                  "nonceStr":data.payParams.nonceStr,
                  "package":data.payParams.packageName,
                  "signType":data.payParams.signType,
                  "timeStamp":data.payParams.timeStamp,
                  "paySign":data.payParams.paySign
                }, function(res){
                  // WeixinJSBridge.log(res.err_msg);
                  // alert(res.err_code+res.err_desc+res.err_msg);
                  window.location.href = 'mine.html';
                });
              }else if (optype==3) {
                    let cashpay = {
                        token: getCookie('token'),
                        pay_sn: data.payParams.pay_sn
                    }
                    $.ajax({
                        url: `${payforAjax}/web/inner.jhtml`,
                        type: 'POST',
                        dataType: 'json',
                        data: cashpay,
                        success: res=>{
                            let {code,desc} =res;
                            if (code===0) {
                                window.location.href = 'mine.html';
                            }else{
                                error(code,desc)
                            }
                        }
                    });
                  }
            }else{
              if (code===-1002) {
                wx.closeWindow();
              }else{
                $.alert('',desc);
              }
            }
          }
        });
      },
      toBusy(){
        let params = {
          token: getCookie('token')
        }
        $.ajax({
          url: `${baseAjax}/user/toBusy.jhtml`,
          type: 'POST',
          dataType: 'json',
          data: params,
          success: res=>{
            let {code,data,desc} =res;
            if (code===0) {
              this.userInfo();
            }else{
              error(code,desc)
            }
          }
        });
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.userInfo();
      })
    } 
  }
</script>
<style type="text/css" lang='scss' scoped>
  @import '../../common/css/mixin';
  .default-avater{
    @include bg-image('../../common/img/default-avater');
  }
  .mood-sunny{
    @include bg-image('../../common/img/sunny-unselected');
  }
  .mood-sunny.selected{
    @include bg-image('../../common/img/sunny');
  }
  .mood-unsunny{
    @include bg-image('../../common/img/unsunny-unselected');
  }
  .mood-unsunny.selected{
    @include bg-image('../../common/img/unsunny');
  }
</style>
