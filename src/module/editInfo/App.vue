<template>
  <div id="app">
  	<div style='width: 100%;height: 100%;'>
    	<edit-info :editBol='true'></edit-info>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import editInfo  from '../../component/editInfo';
  export default {
    components: {
      editInfo
    }
  }
</script>

