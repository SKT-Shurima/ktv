<template>
  <div id="app">
    <header class="primary-header primary-bg">
	    <i class="icon icon-109" id='back'></i>关于我们
	  </header>
	  <div class="container">
      关于我们
      <ul>
      <!-- <li v-for='item in icons'>
         <i class="icon" :class='item'></i>
      </li> -->
    </ul>
    <div style="width: 300px;height: 300px;">
      <vueCropper
        ref="cropper2"
        :img="example2.img"
        :outputSize="example2.size"
        :outputType="example2.outputType"
        :info="example2.info"
        :canScale="example2.canScale"
        :autoCrop="example2.autoCrop"
        :autoCropWidth="example2.width"
        :autoCropHeight="example2.height"
        :fixed="example2.fixed"
        :fixedNumber="example2.fixedNumber"
      ></vueCropper>
    </div>
    
</div>
	  
  </div>
</template>

<script>
  import VueCropper from "vue-cropper"  
  export default {
    name: 'app',
    data(){
    	return{
    		icons: [],
        example2: {
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
          fixed: true,
          fixedNumber: [4, 3]
        }
      }
    },
    components:{
      VueCropper
    },
    mounted(){
        this.$nextTick(()=>{
        	var icons = [];
            for(let i = 1; i <125;i++){
               var item = `icon-${i}`;
               icons.push(item);
            }
            this.icons = icons;
        });
    }
  }
</script>
<style type="text/css" lang='scss' scoped>
  #app{
    font-size: .5rem;
  }
  .container{
    position: fixed;
    top: 1rem;
  }
</style>
