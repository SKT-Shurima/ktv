<template>
  <div id="app">
      <staff-info></staff-info>
  </div>
</template>

<script>
  
  import staffInfo from '../../component/staffInfo'
  export default {
    name: 'app',
    data(){
    	return {
      }
    },
    components:{
      staffInfo
    }
  }
</script>