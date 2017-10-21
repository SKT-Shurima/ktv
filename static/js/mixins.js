//  获取员工列表
export const getList = {
	data() {
		return {
			type: [],
            page: 0, 
            pageSize: 10,
            totalPage: 0,
            listdata: [], // 下拉更新数据存放数组
            scrollData: {
                noFlag: false //暂无更多数据显示
            },
            preType: '', 
		}
	},	
	methods: {
		getType(){
            let params ={
              token: getCookie('token')
            };
            $.ajax({
              url: `${baseAjax}/user/listUserType.jhtml`,
              type: 'GET',
              dataType: 'json',
              data: params,
              success: res=>{
                let {code,data,desc} =res;
                if (code===0) {
                  this.type = data.userTypeList;
                }else{
                  error(desc)
                }
              }
            });
        },
        onInfinite(done) {
            let more = this.$el.querySelector('.load-more');
            if (this.page>=this.totalPage) {
              more.style.display = 'none';
              this.scrollData.noFlag = true;
            }else{
              this.page = this.page < this.totalPage?++this.page:1;
              let mask = this.preType;
              switch(this.preType){
                case 'new':
                  this.getNewList(mask);
                  break;
                case 'hot':
                  this.getHotList(mask);
                  break;
                default:
                  this.getTypeList(mask);
                  break;
              };
              more.style.display = 'none';
            }
            done();
        },
        typeList(mask){
            switch(mask){
              case 'new':
                this.getNewList(mask);
                break;
              case 'hot':
                this.getHotList(mask);
                break;
              default:
                this.getTypeList(mask);
                break;
            };
            this.preType = mask;
        },
        getNewList(mask){
            let more = this.$el.querySelector('.load-more');
            let params ={
              token: getCookie('token'),
              page: this.page,
              pageSize: this.pageSize
            }
            $.ajax({
              url: `${baseAjax}/home/listEmployeeByNew.jhtml`,
              type: 'GET',
              dataType: 'json',
              data: params,
              success: res=>{
                let {code,data,desc} =res;
                if (code===0) {
                  let dataList = data.userList.data;
                  this.listdata = mask===this.preType?dataList:this.listdata.concat(this.listdata,dataList);
                  more.style.display = 'none';
                }else{
                  error(desc)
                }
              }
            });
        },
        getTypeList(mask){
            let more = this.$el.querySelector('.load-more');
            let params ={
              token: getCookie('token'),
              utype_id: mask,
              page: this.page,
              pageSize: this.pageSize
            }
            $.ajax({
              url: `${baseAjax}/home/listEmployeeBySearch.jhtml`,
              type: 'GET',
              dataType: 'json',
              data: params,
              success: res=>{
                let {code,data,desc} =res;
                if (code===0) {
                  let dataList = data.userList.data;
                  this.listdata = mask===this.preType?dataList:this.listdata.concat(this.listdata,dataList);
                  more.style.display = 'none';
                }else{
                  error(desc)
                }
              }
            });
        },
        getHotList() {
              
        },
	},
	mounted(){
		this.$nextTick(()=>{
			this.getType();
		})
	}
}

//  获取用户/员工信息
export const getInfo = {
  data(){
    return {
      sign: "2",
      userBean: {
        state: "",
        index_image: []
      },
      userTypeBean: {},
      tags: []
    }
  },
  methods: {
    userInfo(){
        // let params ={
        //   token: "MDBmMTQ5ZGEtYWFkMS00YWZhLTk4YmItOTJhNTlmOGZhZGNh",
        // }
        let params ={
          token: getCookie('token'),
        }
        $.ajax({
          url: `${baseAjax}/user/info.jhtml`,
          type: 'GET',
          dataType: 'json',
          data: params,
          success: res=>{
            let {code,data,desc} =res;
            if (code===0) {
              this.sign = data.sign ;
              this.userBean = data.user.userBean;
              this.userTypeBean = data.user.userTypeBean;
              this.tags = data.user.userBean.tags?data.user.userBean.tags.split(","):"";
              if (this.editBol) {
                this.initData();
              }
            }else{
              error(desc)
            }
          }
        });
      }
  }
}