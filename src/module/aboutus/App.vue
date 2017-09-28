<template>
  <div id="app">
    <header class="primary-header primary-bg">
	    <i class="icon icon-109" id='back'></i>关于我们
	</header>
	<div class="container">关于我们</div>
	<ul>
		<li v-for='item in icons'>
			<i class="icon" :class='item'></i>
		</li>
		
	</ul>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
    	return{
    		icons: []
    	}
    },
    mounted(){
        this.$nextTick(()=>{
        	var icons = [];
            for(let i = 1; i <125;i++){
               var item = `icon-${i}`;
               icons.push(item);
            }
            this.icons = icons;
        })
    }
  }
</script>
