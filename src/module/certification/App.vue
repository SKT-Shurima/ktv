<template>
  <div id="app">
       <div class="staff-info primary-bg">
	      <i class="icon icon-109" id='back'></i>
	      <dl class="info-box">
	        <dt class="avater">
	          <img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt="">
	        </dt>
	        <dd>
	          <div class="name ellipsis-1" v-text='userBean.wechat_name'></div>
	          <div class="wxid ellipsis-1">{{userBean.phone}}&nbsp;(微信号)</div>
	        </dd>
	      </dl>
	   </div>
	   <div class="container">
	      <div class="upload-avater">
	        <div class="upload-limit color-9">
	          个人图册（上限10张）
	        </div>
	        <div class="avater-list-wrap">
	            <div class="avater-list-box" :style='{width: (images.length+1)*90+"px"}'>
	              <ul class="weui_uploader_files">
	              	<li v-for='(item,index) in images' :key='index' :style='{backgroundImage: `url(${item})`}' class="weui_uploader_file">
	              		<i class="icon icon-95" @touchstart='delImg(index)'></i>
	              	</li>
	              </ul>
	              <div class="weui_uploader_input_wrp">
	              	<input class="weui_uploader_input" type="file" accept="image/jpg,image/jpeg,image/png,image/gif" @change="previewImage($event)"/>
	              </div> 
	            </div>
	        </div>
	      </div>
	      <ul class="base-info">
	          <li class="border-bottom-1px cell"><label class="cell-label">姓名</label><input type="text" placeholder="请输入真实姓名" class="cell-input" v-model='token' /></li>
	          <li class="border-bottom-1px cell"><label class="cell-label">花名</label><input type="text" placeholder="请输入花名" class="cell-input" v-model='nick_name' /></li>
	          <li class="border-bottom-1px cell" @touchstart='chooseType'><label class="cell-label">类别</label><input type="text" placeholder="点击选择类别" class="cell-input" disabled style="padding-right: .3rem;" v-model='type' /><i class="icon icon-108"></i></li>
	      </ul>
	      <ul class="base-info">
	          <li class="border-bottom-1px cell"><label class="cell-label">身高(cm)</label><input type="number" pattern="[0-9]*" onkeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" placeholder="请输入身高" class="cell-input" v-model='height' /></li>
	          <li class="border-bottom-1px cell"><label class="cell-label">体重(kg)</label><input type="number" pattern="[0-9]*" onkeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" placeholder="请输入体重" class="cell-input" v-model='weight'/></li>
	          <li class="border-bottom-1px cell"><label class="cell-label">籍贯</label><input type="text" placeholder="点击选择籍贯" class="cell-input" disabled style="padding-right: .3rem;" v-model='area' @touchend='chooseArea' /><i class="icon icon-108"></i></li>
	          <li class="border-bottom-1px cell"><label class="cell-label">出生日期</label><input type="text" placeholder="点击选择出生日期" class="cell-input" disabled  style="padding-right: .3rem;" v-model='birDate' @touchend='chooseDate'/><i class="icon icon-108"></i></li>
	      </ul>
	      	<ul class="base-info">
		          <li class="border-bottom-1px cell"><label class="cell-label">兴趣爱好</label><input type="text" placeholder="请输入兴趣爱好" class="cell-input" v-model='hobby' /></li>
		          <li class="border-bottom-1px cell"><label class="cell-label">心情</label><span class="mood-icon"><i @touchstart='mood=1' class='mood-sunny' :class='{"selected":mood===1}'></i><i @touchstart='mood=2' class="mood-unsunny" :class='{"selected":mood===2}'></i></span></li>
	     	</ul>
	      	<div class="tag">
		        <h1>标签</h1>
		        <div class="labels">
		            <button class="weui_btn  border-1px color-9" :class='{"btn-checkced":item.index===index}' v-for='(item,index) in labels' v-text='item.text' @touchstart='item.index=item.index===index?"":index'></button>
		        </div>
	      	</div>
	   	</div>
	   	<div class="mask" v-show='chooseBol'>
	   		<vueCropper
			  ref="cropper"
			  :img="cropper.img"
			  :outputSize="cropper.size"
			  :outputType="cropper.outputType"
			  :info="cropper.info"
			  :canScale="cropper.canScale"
			  :autoCrop="cropper.autoCrop"
			  :autoCropWidth="cropper.width"
			  :autoCropHeight="cropper.height"
			  :fixed="cropper.fixed"
			  :fixedNumber="cropper.fixedNumber"
			  style='background: rgba(0,0,0,.9);'
			></vueCropper>
			<div class="choose-op">
				<span @touchstart='chooseBol=false;'>取消</span>
				<span @touchstart='finish2("base64")'>选取</span>
			</div>
	   	</div>
	   	<div class="op-btn primary-bg">
	      保存
	    </div>
  	</div>
</template>

<script type="text/ecmascript-6">
	import {getInfo} from '../../../static/js/mixins';
	import VueCropper from "vue-cropper"  
  	export default {
	    name: 'app',
	    data(){
	    	return{
	    		chooseBol: false,
	    		cropper: {
		          	img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
		          	info: true,
		          	size: 1,
		          	outputType: 'jpeg',
		          	canScale: false,
		          	autoCrop: true,
		          	// 只有自动截图开启 宽度高度才生效
		          	autoCropWidth: 300,
		          	autoCropHeight: 250,
		          	// 开启宽度和高度比例
		          	fixed: false,
		          	fixedNumber: [1, 1]
		        },
	    		typePicker:'',
	    		type: '',
	    		cityPicker: '',
	    		provinceArr: [],
	    		cityArr: [],
	    		area: '',
	    		datePicker: '',
	    		dateY: [],
	    		dateM: [],
	    		dateD: [],
	    		birDate: '',
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
				mood: 1,
				index_image: '',
				tags:'',
				images: [],
				labels: [{
					text: '小酒窝',
					index: ''
				},{
					text: '皮肤白皙',
					index: ''
				},{
					text: '鼻梁高',
					index: ''
				},{
					text: '标准身材',
					index: ''
				},{
					text: 'A4腰',
					index: ''
				},{
					text: '眼睛水灵',
					index: ''
				}],
	    	}
	    },
	    mixins: [getInfo],
	    components:{
	      	VueCropper
	    },
	    methods:{
	    	finish2(type){
	    		this.$refs.cropper.getCropData((data) => {
					console.log(data);
				})
	    	},
	    	getType(){
	            let params ={
	              	token: getCookie('token')
	            };
	            $.ajax({
	              	url: `${baseAjax}/user/listUserType.jhtml`,
	              	type: 'GET',
	              	dataType: 'json',
	              	data: params,
	              	success: res=>{
	                	let {code,data,desc} =res;
	                	if (code===0) {
	                		let type = [];
	                		for(let i = 0;i<data.userTypeList.length;i++){
	                			let item = {
	                				text: data.userTypeList[i].utype_name,
	                				value: data.userTypeList[i].utype_id
	                			};
	                			type.push(item);
	                		};
	                  		this.typePicker = new Picker({
						    	data: [type],
						    	title: ''
							});
	                	}else{
	                  		error(desc)
	               		}
	              	}
	            });
	        },
	        initArea(){
	        	var provinceArr = [];
				for (let i = 0; i < cities.length; i++) {
					var proItem = {
						text: cities[i].name,
						value: cities[i].id
					};
					provinceArr.push(proItem);
				}
				this.provinceArr = provinceArr;
				this.initcityArr(0);
				this.cityPicker = new Picker({
				    data: [this.provinceArr,this.cityArr],
				    title: '',
				    selectedIndex: [0,0]
				});
	        },
	        initcityArr(index){
	        	var nextAddresses = cities[index].nextAddresses;
				var cityArr = [];
				for (var j = 0; j < nextAddresses.length; j++) {
					var cityArrItem = {
						text: nextAddresses[j].name,
						value: nextAddresses[j].id
					};
					cityArr.push(cityArrItem);
				}
				this.cityArr = cityArr;
	        },
	        initDate(){
	        	var dateY = [],dateM=[];
	        	var year = new Date().getFullYear();
				for (var y = 1970; y < year; y++) {
					var yItem = {
						text: y+'年',
						value: y
					};
					dateY.push(yItem);
				}
				this.dateY = dateY;
				for (var m = 1; m < 13; m++) {
					var mItem = {
						text: m+'月',
						value: m
					}
					dateM.push(mItem);
				}
				this.dateM = dateM;
				this.initDays(30);
				this.datePicker = new Picker({
				    data: [this.dateY,this.dateM,this.dateD],
				    title: '',
				    selectedIndex: [0,0,0]
				});
	        },
	        initDays(days){
	        	var  dateD =[];
				for(var d = 1 ;d<=days;d++){
					var dItem = {
						text: d+'日',
						value: d
					};
					dateD.push(dItem);
				}
				this.dateD = dateD;
	        },	
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
	    	},
	    	choosePhoto(){
	    		$.actions({
		          	actions: [
			            {
			               	text: "拍照",
			               	className: "bg-blue f-white",
			               	onClick: function() {
				                console.log('拍照')
				            }
			            },
			            {
			              	text: "相册选取",
			              	className: "bg-green f-white",
			              	onClick: function() {
				                console.log('相册选取')
				            }
			            },
		          	]
		        });
	    	},
	    	choosePhotos(){
	    		 var inputObj=document.createElement('input')
		         inputObj.setAttribute('id','_ef');
		         inputObj.setAttribute('type','file');
		         inputObj.setAttribute("style",'visibility:hidden');
		         document.body.appendChild(inputObj);
		         inputObj.click();
		         inputObj.value ;
	    	},
	    	previewImage(e){
	    		var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
			    for (var i = 0, len = files.length; i < len; ++i) {
	                var file = files[i];

	                if (url) {
	                    src = url.createObjectURL(file);
	                } else {
	                    src = e.target.result;
	                }
	            }
	            this.images.push(src);
	    	},
	    	delImg(index){
	    		setTimeout(()=>{
	    			this.images.splice(index,1);
	    		},300);
	    		
	    	},
	    	chooseType(){
	    		this.typePicker.show();
				this.typePicker.on('picker.select',(val, index)=> {
				    this.utype_id = val[0];
				});
	    	},
	    	chooseArea(){
	    		this.cityPicker.show();
	    		this.cityPicker.on('picker.change', (e,index)=> {
				    if (e===0) {
				    	this.initcityArr(index);
				    	this.cityPicker.refillColumn(1, this.cityArr);
				    	this.cityPicker.scrollColumn(1, 0);
				    }
				});
				this.cityPicker.on('picker.select', (val, index)=> {
					this.province_id = val[0];
					this.city_id = val[1];
					this.province = this.provinceArr[index[0]].text;
					this.city = this.cityArr[index[1]].text;
					this.area = this.provinceArr[index[0]].text +' '+ this.cityArr[index[1]].text;
				});
	    	},
	    	chooseDate(){
	    		this.datePicker.show();
	    		this.datePicker.on('picker.change',(e,index)=> {
				    if (e===1) {
				    	var selectedIndex = this.datePicker.selectedIndex;
				    	var days = new Date(this.dateY[selectedIndex[0]].value,this.dateM[selectedIndex[1]].value,0).getDate();
				    	this.initDays(days);
				    	this.datePicker.refillColumn(2, this.dateD);
				    	this.datePicker.scrollColumn(2, 0);
				    }
				});
				this.datePicker.on('picker.select',(val, index)=> {
					setTimeout(()=>{
						this.birDate = this.dateY[index[0]].value +'-'+this.dateM[index[1]].value+'-'+this.dateD[index[2]].value;
						this.birthday = new Date(val[0],val[1]-1,val[2]).getTime();
					},300);
				});
	    	},
	    	checkTag(index){
	    		let labels = this.labels;
	    		labels[index].index = labels[index].index===index?"":index;
	    	}
	    },
	    mounted(){
	    	this.$nextTick(()=>{
	    		this.userInfo();
	    		this.getType();
	    		this.initArea();
	    		this.initDate();
	    	})
	    }
  	}
</script>
<style type="text/css" lang='scss' scoped>
	@import '../../../static/css/mixin.scss';
	.mood-sunny{
		@include bg-image('../../../static/images/sunny-unselected');
	}
	.mood-sunny.selected{
		@include bg-image('../../../static/images/sunny');
	}
	.mood-unsunny{
		@include bg-image('../../../static/images/unsunny-unselected');
	}
	.mood-unsunny.selected{
		@include bg-image('../../../static/images/unsunny');
	}
</style>
