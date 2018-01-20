<template>
  	<div id="app">
        <div style='width: 100%;height: 100%;'>
     	<div class="order-wrap">
	      	<i class="icon icon-109" id='back'></i>
	      	<dl class="staff-info">
		        <dt>
		          <img :src="`${qnhost}${employee.index_image}`"  @load='successLoadAvater' @error='errorLoadAvater' class="default-avater">
		        </dt>
	      	</dl>
	      	<div class="weui-loadmore weui-loadmore-line">
	        	<span class="weui-loadmore-tips">打赏她小费</span>
	      	</div>
	      	<div class="labels">
		        <button class="weui_btn  border-1px color-6" :class='{"btn-checkced":order_amount===""}' @touchstart='order_amount=""'>不赏</button>
		        <button class="weui_btn  border-1px color-6" :class='{"btn-checkced":order_amount===8.8}' @touchstart='order_amount=8.8'>8.8元</button>
		        <button class="weui_btn  border-1px color-6" :class='{"btn-checkced":order_amount===18.8}' @touchstart='order_amount=18.8'>18.8元</button>
		        <button class="weui_btn  border-1px color-6" :class='{"btn-checkced":order_amount===88.8}' @touchstart='order_amount=88.8'>88.8元</button>
	      	</div>
	      	<div class="amount-box">
	        	<label>其他金额：</label><input type="number" pattern="[0-9]*" v-model='order_amount' onkeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))" class="input-box"><span class="color-6">元</span>
	      	</div>
	     	<div class="weui-loadmore weui-loadmore-line">
	        	<span class="weui-loadmore-tips">给她来个评价</span>
	      	</div>
		    <div class="rate">
		        <i class="rate-icon" v-for='(item,index) in 5' :key='index' :class='{"seleted":index<rate}' @touchstart='rate=index+1'></i>
		    </div>
	     	<div class="com-labels">
		        <button class="weui_btn  border-1px color-6" :class='{"btn-checkced":item.checkBol}' v-for="(item,index) in comLabels" :key='index' v-text='item.name' @touchstart='item.checkBol=!item.checkBol'></button>
	    	</div>
	    	<div class="note-box">
		        <input type="text" placeholder="其他意见和建议" class="input-box" v-model='note'><i class="color-9"><span v-text='note.length'></span>/<span>40</span></i>
		    </div>
		    <div class="op-btn primary-bg" @touchstart='submit'>
		      确认
		    </div>
		</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'app',
    data(){
    	return{
    		rate: 0,
    		note: '',
    		employee: {},
    		query: {},
    		order_amount: '',
    		comLabels: [{
    			checkBol: false,
    			name: "态度好"
    		},{
    			checkBol: false,
    			name: "服务热情"
    		},{
    			checkBol: false,
    			name: "温柔体贴"
    		}], 
    		labelNote: '',
            qnhost: qnhost
    	}
    },
    watch:{
    	note:{
    		handler(newVal,oldVal){
    			if (newVal.length>=40) {
    				this.note = newVal.slice(0,40);
    			}
    		}
    	},
    	comLabels:{
    		handler(newVal,oldVal){
    			let labelNote = '';
    			for(let i = 0 ; i < newVal.length;i++){
    				if (newVal[i].checkBol) {
    					labelNote+=newVal[i].name+",";
    				}
    			}
    			this.labelNote = labelNote;
    		},
    		deep: true
    	}
    },
    methods:{
    	getDetail(){
	        let params = {
	          	token: getCookie('token'),
	          	employee_id: this.query.employee_id
	        }
	        $.ajax({
	          	url: `${baseAjax}/user/getEmployeeDetail.jhtml`,
	          	type: 'GET',
	          	dataType: 'json',
	          	data: params,
	          	success: res=>{
		            let {code,data,desc} =res;
		            if (code===0) {
                      data.employee.index_image = data.employee.index_image.split(',')[0]; 
		              this.employee = data.employee;
		            }else{
		              error(code,desc)
		            }
	          	}
	        });
      	},
      	feedback(){
      		let params = {
    			token: getCookie('token'),
				order_id: this.query.order_id,
				comment: this.labelNote+this.note,
				star: this.star?this.start:5,
				feedback_type: 1
	    	}
	    	$.ajax({
                url: `${baseAjax}/order/feedback.jhtml`,
                type: 'POST',
                dataType: 'json',
                data: params,
                success: res=>{
                    let {code,data,desc} =res;
                    if (code===0) {
                        window.location.replace('userOrder.html');
                    }else{
                      error(code,desc)
                    }
                }
            });
      	},
      	review(){
            if (this.order_amount-0===0) {
                this.feedback();
                return false;
            }
    		let params = {
    			token: getCookie('token'),
    			order_id: this.query.order_id,
    			optype: 1,
				optarget: 2,
				order_amount: (this.order_amount-0).toFixed(2)
    		}
    		$.ajax({
	         	url: `${baseAjax}/pay/pay.jhtml`,
	          	type: 'POST',
	          	dataType: 'json',
	          	data: params,
	          	success: res=>{
	            	let {code,data,desc} =res;
	            	if (code===0) {
                        WeixinJSBridge.invoke('getBrandWCPayRequest',{
                          "appId":data.payParams.appId,
                          "nonceStr":data.payParams.nonceStr,
                          "package":data.payParams.packageName,
                          "signType":data.payParams.signType,
                          "timeStamp":data.payParams.timeStamp,
                          "paySign":data.payParams.paySign
                        }, res=>{
                          // WeixinJSBridge.log(res.err_msg);
                          // alert(res.err_code+res.err_desc+res.err_msg);
                          this.feedback();
                        });
	            	}else{
                        $.alert('',desc);
	            	}
	          	}
	        });
    	},
    	submit(){
    		if (!this.labelNote&&!this.note) {
    			$.alert('',"请输入或者选择评价内容");
    			return false;
    		}else{
    			this.review();
    		}
    	}
    },
    created(){
    	this.query = getRequest();
    },
    mounted(){
    	this.$nextTick(()=>{
    		this.getDetail();
    	})
    }
  }
</script>
<style type="text/css" lang='scss' scoped>
	@import '../../common/css/mixin';
    .default-avater{
        @include bg-image('../../common/img/default-avater');
    }
	.rate-icon{
		display: inline-block;
		width: .46rem;
		height: .46rem;
		@include bg-image('../../common/img/star');
	}
	.rate-icon.seleted{
		@include bg-image('../../common/img/star-selected');
	}
</style>
