<template>
  <div>
       <div class="staff-info primary-bg">
	      <i class="icon icon-109" id='back'></i>
	      <dl class="info-box">
	        <dt class="avater">
	        	<img :src="user.wechat_portrait"  @load='successLoadAvater' @error='errorLoadAvater' class="default-avater">
	        </dt>
	        <dd class="name ellipsis-1" v-text='user.wechat_name'>
	        </dd>
	      </dl>
	   </div>
	   <div class="container">
	      <div class="upload-avater">
	        <div class="upload-limit color-9">
	          个人图册（上限10张）
	        </div>
	        <div class="weui_uploader_input_wrp">
	        	<input class="weui_uploader_input" type="file" accept="image/jpg,image/jpeg,image/png,image/gif" @change="previewImage($event)"/>
	        </div>
	        <div class="avater-list-wrap" id='avater-list'>
	              <ul class="avater-list-box" :style='{width: (images.length)*92+"px"}'>
	              	<li v-for='(item,index) in images' :key='index' :style='{backgroundImage: `url(${item.urls})`}' class="weui_uploader_file">
	              		<i class="icon icon-95" @touchstart='delImg(index)'></i>
	              	</li>
	              </ul>
	        </div>
	      </div>
	      <ul class="base-info">
	          <li class="border-bottom-1px cell"><label class="cell-label">姓名</label><input type="text" placeholder="请输入真实姓名" :disabled="editBol" class="cell-input" v-model='real_name' /></li>
	          <li class="border-bottom-1px cell"><label class="cell-label">花名</label><input type="text" placeholder="请输入花名" :disabled="editBol" class="cell-input" v-model='nick_name' /></li>
	          <li class="border-bottom-1px cell" @touchstart='chooseType'><label class="cell-label">类别</label><input type="text" placeholder="点击选择类别" class="cell-input" disabled style="padding-right: .3rem;" v-model='utype' /><i class="icon icon-108"></i></li>
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
		            <button class="weui_btn  border-1px color-9" :class='{"btn-checkced":item.checkBol}' v-for='(item,index) in labels' v-text='item.text' @touchstart='item.checkBol=!item.checkBol'></button>
		        </div>
	      	</div>
	   	</div>
	   	<div class="mask" v-show='chooseBol'>
	   		<vueCropper
			  ref="cropper"
			  :img="cropper.img"
			  :outputSize="cropper.size"
			  :outputType="cropper.outputType"
			  :prevent-white-space="false"
			  :info='cropper.info'
			  :canScale='cropper.canScale'
			  :autoCrop="cropper.autoCrop"
			  :autoCropWidth="cropper.width"
			  :autoCropHeight="cropper.height"
			  :fixedBox="cropper.fixedBox"
			  :fixed='cropper.fixed'
			  :full='cropper.full'
			  :fixedNumber='cropper.fixedNumber'
			  style='background: rgba(0,0,0,.9);'
			></vueCropper>
			<div class="choose-op">
				<span @touchstart='chooseBol=false;'>取消</span>
				<span @touchstart='finish'>选取</span>
			</div>
	   	</div>
	   	<div class="op-btn primary-bg op-btn-disable" v-if='!(real_name&&nick_name&&utype_id!==""&&height&&weight&&province_id!==""&&city_id!==""&&birthday!==""&&hobby&&tags.length&&images.length)'>
	      保存
	    </div>
	   	<div class="op-btn primary-bg" v-else @touchstart='auth'>
	      保存
	    </div>
  	</div>
</template>

<script type="text/ecmascript-6">
	import {getInfo} from '../common/js/mixins';
	import VueCropper from "vue-cropper" ;
	var myScroll;
	setTimeout(()=>{
		myScroll = new iScroll('avater-list',{vScrollbar:false,hScrollbar:false,});
	},300);
  	export default {
	    name: 'editInfo',
	    data(){
	    	return{
	    		chooseBol: false,
	    		cropper: {
		          	img: '',
		          	info: false,
		          	size: 1,
		          	canScale: false,
		          	outputType: 'jpeg',
		          	autoCrop: true,
		          	autoCropWidth: 300,
		          	autoCropHeight: 400,
		          	fixed: true,
		          	fixedNumber: [3,4],
		          	fixedBox: true,
		          	full: true
		        },
	    		typePicker:'',
	    		typeList: '',
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
				utype: '',
				height: '',
				weight: '',
				province_id: '',
				province: '',
				city_id: '',
				city: '',
				birthday: '',
				hobby: '',
				mood: 1,
				images: [],
				labels: [{
					text: '小酒窝',
					checkBol: false
				},{
					text: '皮肤白皙',
					checkBol: false
				},{
					text: '鼻梁高',
					checkBol: false
				},{
					text: '标准身材',
					checkBol: false
				},{
					text: 'A4腰',
					checkBol: false
				},{
					text: '眼睛水灵',
					checkBol: false
				}],
				size: 0
	    	}
	    },
	    props: ["editBol"],
	    mixins: [getInfo],
	    components:{
	      	VueCropper
	    },
	    watch:{
	    	labels:{
	    		handler(newVal,oldVal){
	    			let tags = [];
		    		for(let j=0;j<newVal.length;j++){
		    			if (newVal[j].checkBol) {
		    				tags.push(newVal[j].text);
		    			}
		    		}
		    		this.tags = tags;
	    		},
	    		deep: true
	    	}
	    },
	    methods:{
	    	initData(){
	    		this.real_name = this.user.real_name;
	    		this.nick_name = this.user.nick_name;
	    		this.height = this.user.height;
	    		this.weight = this.user.weight;
	    		this.province_id = this.user.province_id;
	    		this.province = this.user.province;
	    		this.city_id = this.user.city_id;
	    		this.city = this.user.city;
	    		this.area = this.province+this.city;
	    		this.hobby = this.user.hobby;
	    		this.mood =  this.user.mood;
	    		this.birthday  = this.user.birthday;
	    		this.birDate = dateFilter(this.birthday);
	    		this.utype_id = this.user.utype_id;
	    		this.utype = this.user.utype_name;
	    		let images = this.user.index_image.split(',');
	    		for(let i=0;i<images.length;i++){
	    			let objItem = {
    					urls: `${this.qnhost}${images[i]}`,
    					key: images[i] 
		    		}
		    		images[i] = objItem;
	    		}
	    		this.images = images;
	    		let tags = this.tags,labels=this.labels;
	    		let temp = {};
	    		tags.forEach(item=>temp[item]=true);
	    		labels.forEach((item,index)=>temp[item.text]?labels[index].checkBol=true:"");
	    		temp = null;
	    		setTimeout(()=>{
		        	myScroll.refresh();
		        },300)
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
							this.typeList = type;
	                	}else{
	                  		error(code,desc)
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
	    	getQnToken(){
	    		let params = {
	    			token: getCookie("token")
	    		}
	    		$.ajax({
	    			url: `${baseAjax}/home/getQNToken.jhtml`,
	    			type: 'GET',
	    			dataType: 'json',
	    			data: params,
	    			success: res=>{
		            let {code,data,desc} =res;
		            if (code===0) {
		              setCookie("QnToken",data.QNToken,.1);
		            }else{
		              error(code,desc)
		            }
		          }
	    		});
	    	},
	    	chooseFile(){
	    		 var f = this.$refs.chooseInput;
	    		 f.click();
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
	            if (!files.length) {
	            	return false;
	            }
	            if (this.images.length>=10) {
	            	$.alert("","最多选取十张图片");
	            	return false;
	            }
	            this.chooseBol=true;
	            this.cropper.img=src;
	    	},
	    	finish(){
	    		this.$refs.cropper.getCropData((data) => {
	    			var i = data.indexOf(',');
	    			data = data.slice(i+1);
					this.uploadImg(data);
				});
	    	},
	    	uploadImg(pic){
			 	$.ajax({
                    url: 'http://up.qiniup.com/putb64/-1',
                    type: 'POST',
                    dataType: 'json',
                    cache: false,
                    data: pic,
                    processData: false,
                    contentType: false,
                    headers:{
                    	"Content-Type": "application/octet-stream",
                    	"Authorization": "UpToken "+ getCookie('QnToken')
                    },
                    success:(res)=>{
                    	let key = res.key;
                    	let objItem = {
	    					urls: `${this.qnhost}${key}`,
	    					key: key 
			    		}
				        this.images.push(objItem);
				        this.chooseBol=false;
				        setTimeout(()=>{
				        	myScroll.refresh();
				        },300)
                    }
                });
            },
	    	delImg(index){
	    		setTimeout(()=>{
	    			this.images.splice(index,1);
	    			myScroll.refresh();
	    		},300);
	    	},
	    	chooseType(){
	    		this.typePicker.show();
				this.typePicker.on('picker.select',(val, index)=> {
				    this.utype_id = val[0];
				    this.utype = this.typeList[index].text;
				});
	    	},
	    	chooseArea(){
	    		this.cityPicker.show();
	    		let update;
	    		this.cityPicker.on('picker.change', (e,index)=> {
				    if (e===0) {
				    	update = false;
			    		this.initcityArr(index);
				    	this.cityPicker.refillColumn(1, this.cityArr);
				    	this.cityPicker.scrollColumn(1, 0);
				    	update = true;
				    }
				});
				this.cityPicker.on('picker.select', (val, index)=> {
					if (!update) {
						return false;
					}
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
	    	auth(){
	    		let index_image=[],images=this.images;
	    		for(let i=0;i<images.length;i++){
	    			index_image.push(images[i].key);
	    		}
	    		let params = {
	    			token: getCookie('token'),
					real_name: this.real_name,
					nick_name: this.nick_name,
					utype_id: this.utype_id,
					height: this.height,
					weight: this.weight,
					province_id: this.province_id,
					province: this.province,
					city_id: this.city_id,
					city: this.city,
					birthday: this.birthday,
					hobby: this.hobby,
					mood: this.mood,
					index_image: index_image.join(","),
					tags: this.tags.join(',')
	    		}
	    		$.ajax({
	    			url: `${baseAjax}/user/auth.jhtml`,
	    			type: 'POST',
	    			dataType: 'json',
	    			data: params,
	    			success: res=>{
			            let {code,desc} =res;
			            if (code===0) {
			              window.location.href = 'mine.html';
			            }else{
			              $.alert(desc);
			            }
			        }
	    		});
	    	},
	    },
	    mounted(){
	    	this.$nextTick(()=>{
	    		this.userInfo();
	    		this.getType();
	    		let QnToken = getCookie("QnToken");
	    		if (!QnToken) {
	    			this.getQnToken();
	    		}
	    		setTimeout(()=>{
	    			this.initArea();
	    			this.initDate();
	    		},600);
	    	})
	    }
  	}
</script>
<style type="text/css" lang='scss' scoped>
	@import '../common/css/mixin';
	.default-avater{
		@include bg-image('../common/img/default-avater');
	}
	.mood-sunny{
		@include bg-image('../common/img/sunny-unselected');
	}
	.mood-sunny.selected{
		@include bg-image('../common/img/sunny');
	}
	.mood-unsunny{
		@include bg-image('../common/img/unsunny-unselected');
	}
	.mood-unsunny.selected{
		@include bg-image('../common/img/unsunny');
	}
</style>
