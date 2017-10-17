<template>
  <div id="app">
      <header class="primary-header primary-bg">
        <i class="icon icon-109" id='back'></i>打赏榜
    </header>
    <div class="container">
        <rank-list ref='rankList'></rank-list>
    </div>
  </div>
</template>

 <script type="text/ecmascript-6">
 import rankList from '../../component/rankList';
  export default {
    name: 'app',
    components:{
        rankList
    }
  }
</script>
