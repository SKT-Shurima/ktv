<template>
  <div id="app">
    <header class="primary-header primary-bg">
	    <i class="icon icon-109" id='back'></i>用户条款及协议
	</header>
	<div class="container"></div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted(){
    	this.$nextTick(()=>{
    		wx.chooseImage({
			    count: 1, // 默认9
			    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			    success: function (res) {
			        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
			    }
			});
    	})
    }
  }
</script>
