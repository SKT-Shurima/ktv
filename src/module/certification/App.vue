<template>
  <div id="app">
       <div class="staff-info primary-bg">
	      <i class="icon icon-109" id='back'></i>
	      <dl class="info-box">
	        <dt class="avater">
	          <img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt="">
	        </dt>
	        <dd>
	          <div class="name ellipsis-1">林发可</div>
	          <div class="wxid ellipsis-1">13611012011(微信号)</div>
	        </dd>
	      </dl>
	   </div>
	   <div class="container">
	      <div class="upload-avater">
	        <div class="upload-limit color-9">
	          个人图册（上限10张）
	        </div>
	        <div class="avater-list-wrap">
	            <div class="avater-list-box">
	              <ul class="weui_uploader_files" id='avater-list'></ul>
	              <div class="weui_uploader_input_wrp">
	                  <!-- <input class="weui_uploader_input" type="file" accept="image/jpg,image/jpeg,image/png,image/gif" onchange="previewImage(this)"/> -->
	              </div> 
	            </div>
	        </div>
	      </div>
	      <ul class="base-info">
	          <li class="border-bottom-1px cell"><label class="cell-label">姓名</label><input type="text" placeholder="请输入真实姓名" class="cell-input" v-model='token' /></li>
	          <li class="border-bottom-1px cell"><label class="cell-label">花名</label><input type="text" placeholder="请输入花名" class="cell-input" v-model='nick_name' /></li>
	          <li class="border-bottom-1px cell"><label class="cell-label">类别</label><input type="text" placeholder="点击选择类别" class="cell-input" disabled style="padding-right: .3rem;" id='types'/><i class="icon icon-108"></i></li>
	      </ul>
	      <ul class="base-info">
	          <li class="border-bottom-1px cell"><label class="cell-label">身高(cm)</label><input type="number" pattern="[0-9]*" onkeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" placeholder="请输入身高" class="cell-input" v-model='height' /></li>
	          <li class="border-bottom-1px cell"><label class="cell-label">体重(kg)</label><input type="number" pattern="[0-9]*" onkeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" placeholder="请输入体重" class="cell-input" v-model='weight'/></li>
	          <li class="border-bottom-1px cell"><label class="cell-label">籍贯</label><input type="text" placeholder="点击选择籍贯" class="cell-input" disabled style="padding-right: .3rem;" id='nativePlace' /><i class="icon icon-108"></i></li>
	          <li class="border-bottom-1px cell"><label class="cell-label">出生日期</label><input type="text" placeholder="点击选择出生日期" class="cell-input" disabled  style="padding-right: .3rem;" id='chooseDate' /><i class="icon icon-108"></i></li>
	      </ul>
	      <ul class="base-info">
	          <li class="border-bottom-1px cell"><label class="cell-label">兴趣爱好</label><input type="text" placeholder="请输入兴趣爱好" class="cell-input" v-model='hobby' /></li>
	          <li class="border-bottom-1px cell"><label class="cell-label">心情</label></li>
	      </ul>
	      <div class="tag">
	        <h1>标签</h1>
	        <div class="labels">
	            <button class="weui_btn  border-1px color-9">小酒窝</button>
	            <button class="weui_btn  border-1px color-9">皮肤白皙</button>
	            <button class="weui_btn  border-1px color-9">鼻梁高</button>
	            <button class="weui_btn  border-1px color-9">标准身材</button>
	            <button class="weui_btn  border-1px color-9">A4腰</button>
	            <button class="weui_btn  border-1px color-9">眼睛水灵</button>
	        </div>
	      </div>
	   </div>
	   <div class="op-btn primary-bg">
	      保存
	    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
    	return{
    		token: '',
				real_name: '',
				nick_name: '',
				utype_id: '',
				height: '',
				weight: '',
				province_id: '',
				province: '',
				city_id: '',
				city: '',
				birthday: '',
				hobby: '',
				mood: '',
				index_image: '',
				tags:''
    	}
    },
    methods:{
    	auth(){
    		let params = {
    			token: '',
				real_name: '',
				nick_name: '',
				utype_id: '',
				height: '',
				weight: '',
				province_id: '',
				province: '',
				city_id: '',
				city: '',
				birthday: '',
				hobby: '',
				mood: '',
				index_image: '',
				tags:''
    		}
    		$.ajax({
    			url: `${baseAjax}`,
    			type: 'POST',
    			dataType: 'json',
    			data: params,
    			success: res=>{
	            let {code,desc} =res;
	            if (code===0) {
	              console.log(desc);
	            }else{
	              error(desc)
	            }
	          }
    		});
    	}
    }
  }
</script>
