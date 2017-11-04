<template>
  <div id="app">
    <div style='width: 100%;height: 100%;'>
      <header class="primary-header primary-bg">
        <i class="icon icon-109" id='back'></i>排行榜
    </header>
    <div class="container">
        <rank-list></rank-list>
    </div>
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
