<template>
	<div>
		<div class="mask" :class='{"mask_visible":maskBol}' @touchstart='maskBol=false'></div>
		<dl class='complain-con' v-show='maskBol'>
			<dt>
				<div class="border-1px">
					<textarea rows="4" maxlength='40' placeholder="请输入意见或建议" v-model='note' autofocus></textarea>
				</div>
				<i class="color-9"><span v-text='note.length'></span>/<span>40</span></i>
			</dt>
			<dd @touchstart='ensure' class="primary-bg">
				确定
			</dd>
		</dl>
	</div>
</template>
<script type='text/esmascript-6'>
	export default {
		data(){
			return{
				maskBol: false,
				note: ''
			}
		},
		watch:{
    		note:{
	    		handler(newVal,oldVal){
	    			if (newVal.length>=40) {
	    				this.note = newVal.slice(0,40);
	    			}
	    		}
	    	}
	    },
	    methods:{
	    	ensure(){
	    		this.maskBol= false;
	    		this.$emit('complain',this.note);
	    	}
	    }
	}
</script>
<style type="text/css" scoped>
	.mask{
		opacity: 0;
	    -webkit-transition-duration: .3s;
	    transition-duration: .3s;
	    z-index: 10013;
	    visibility: hidden;
	    position: fixed;
	    width: 100%;
	    height: 100%;
	    top: 0;
	    left: 0;
	    background: rgba(0, 0, 0, .6);
	}
	.mask_visible{
	    opacity: 1;
	    visibility: visible;
	}
	.complain-con{
		position: fixed;
		z-index: 10015;
		top: 25%;
		left: 0px;
		right: 0px;
		width: 5.6rem;
		margin: auto;
		border-radius: 5px;
		background-color: #fff;
	}
	.complain-con>dt{
		font-size: .3rem;
		padding: .26rem;
	}
	.complain-con>dd{
		font-size: .32rem;
		line-height: .8rem;
		text-align: center;
		color: #fff;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	.complain-con textarea{
		display: inline-block;
	    width: 4.68rem;
	    border: 1px solid #999;
	    border-radius: 5px;
	    line-height: .32rem;
	    outline: none;
	    padding: .2rem;
	}
</style>