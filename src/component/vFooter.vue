<template>
	<footer id="footer">
      <div class="weui-flex">
        <div class="weui-flex-item"><a href="index.html"><i class="home footer-icon" :class='{"selected":tabIndex===1}'></i><span :class="{'primary':tabIndex===1}">首页</span></a></div>
      <div class="weui-flex-item"><a href="dating.html"><i class="dating footer-icon" :class='{"selected":tabIndex===2}'></i><span :class="{'primary':tabIndex===2}">约单</span></a></a></div>
      <div class="weui-flex-item"><a href="mine.html"><i class="mine footer-icon" :class='{"selected":tabIndex===3}'></i><span :class="{'primary':tabIndex===3}">我的</span></a></a></div>
    </div>
    </footer>
</template>
<script type='text/esmascript-6'>
	export default {
		data(){
			return{
				tabIndex: 1
			}
		},
		created(){
			let path = location.pathname;
			if (path.indexOf('index')>-1) {
				this.tabIndex = 1;
			}
			if (path.indexOf('dating')>-1) {
				this.tabIndex = 2;
			}
			if (path.indexOf('mine')>-1) {
				this.tabIndex = 3;
			}
		}
	}
</script>
<style type="text/css" scoped lang='scss'>
@import '../common/css/mixin';
#footer{
    width: 100%;
    height: 1rem;   
    position: fixed;
    bottom: 0px;
    left: 0px;
    z-index: 999;
    width: 100%;
    text-align: center;
    font-size: .1rem;
    background-color: #fff;
    box-shadow:  0px 0px 1px 1px #ddd;
}
#footer a{
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    color: #999;
}
#footer a.selected{
    color: #f65287;
}
.footer-icon{
    display: inline-block;
    width: .66rem;
    height: .66rem;
}
.home{
    @include bg-image('../common/img/home-unselected');
}
.home.selected{
    @include bg-image('../common/img/home-selected');
}
.dating{
    @include bg-image('../common/img/dating-unselected')
}
.dating.selected{
    @include bg-image('../common/img/dating-selected');
}
.mine{
    @include bg-image('../common/img/mine-unselected');
}
.mine.selected{
    @include bg-image('../common/img/mine-selected');
}

</style>