<template>
  <div id="app">
    <div style='width: 100%;height: 100%;'>
      <staff-info :get-state='true' @sendstate='getState'></staff-info>
      <div class="op-btn primary-bg" @touchstart='predate' v-if='state==1'>
        立即预约
      </div>
      <div class="op-btn bg-c" v-if='state==0'>
        已被预约
      </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import staffInfo from '../../component/staffInfo'
  export default {
    name: 'app',
    data(){
    	return {
        roomPicker: '',
        state: 1,
        query: {},
        predateBol: true
      }
    },
    components:{
      staffInfo
    },
    methods: {
      getState(state){
        this.state = state;
      },
      getRoom(){
        let params ={
          token: getCookie('token')
        }
        $.ajax({
          url: `${baseAjax}/order/listAllRoom.jhtml`,
          type: 'GET',
          dataType: 'json',
          data: params,
          success: res=>{
            let {code,data,desc} =res;
            if (code===0) {
              let room = data.roomList;
              let roomList  = [];
              for (let i = 0; i < room.length; i++) {
                  let item = {
                    text: room[i].room_name,
                    value: room[i].room_id
                  };
                  roomList.push(item);
              }
              this.roomPicker = new Picker({
                data: [roomList],
                title: ""
              });
            }else{
              error(code,desc)
            }
          }
        });
      },
      predate(){
        if (!this.predateBol) {
          return false;
        }
        this.predateBol = false;
        this.roomPicker.show();
        this.roomPicker.on('picker.select',(val, index)=> {
          this.createOrder(val[0]);
        });
      },
      createOrder(id){
        let params ={
          token: getCookie('token'),
          employee_id: this.query.employee_id,
          room_id: id
        }
        $.ajax({
          url: `${baseAjax}/order/createOrder.jhtml`,
          type: 'POST',
          dataType: 'json',
          data: params,
          success: res=>{
            let {code,data,desc} =res;
            if (code===0) {
              let employee_id=this.query.employee_id,order_id=data.order.order_id;
              window.location.replace(`orderDetail.html?employee_id=${employee_id}&order_id=${order_id}`);
            }else{
              $.alert('',desc);
              this.predateBol = true;
            }
          }
        });
      }
    },
    created(){
      this.query = getRequest();
    },
    mounted(){
      this.$nextTick(()=>{
        this.getRoom();
      })
    }
  }
</script>