//  获取员工列表
export const getList = {
	data() {
		return {
      page: 1, 
      pageSize: 2,
      total_page: 1,
      listdata: [], // 下拉更新数据存放数组
      scrollData: {
          noFlag: false //暂无更多数据显示
      },
      preType: '', 
		}
	},	
	methods: {
        onInfinite(done) {
            let more = this.$el.querySelector('.load-more');
            if (this.page>=this.total_page) {
              more.style.display = 'none';
              this.scrollData.noFlag = true;
            }else{
              this.page = this.page < this.total_page?++this.page:1;
              this.typeList(this.preType);
              more.style.display = 'none';
            }
            done();
        },
        searchList(){
          this.preMsg = this.message;
          this.listdata =[];
          this.typeList("search");
        },
        typeList(mask){
          this.page = mask!==this.preType?1:this.page;
          let params = {
            token: getCookie('token'),
            page: this.page,
            pageSize: this.pageSize
          }
            switch(mask){
              case 'search':
                params.message = this.preMsg;
                break;
              case 'all':
                params.message = '';
                break;
              case 'new':
                params.new_employee = 1;
                break;
              case 'hot':
                params.hot = 1;
                break;
              case 1:
                params.utype_id = 1;
                break;
              case 2:
                params.utype_id = 2;
                break;
              case 3:
                params.utype_id = 3;
                break;
              case 4:
                params.utype_id = 4;
                break;
            };
            this.getTypeList(mask,params);
        },
        getTypeList(mask,params){
            let more = this.$el.querySelector('.load-more');
            $.ajax({
              url: `${baseAjax}/home/listEmployeeBySearch.jhtml`,
              type: 'GET',
              dataType: 'json',
              data: params,
              success: res=>{
                let {code,data,desc} =res;
                if (code===0) {
                  let dataList = data.userList.data;
                  this.listdata = mask!==this.preType?dataList:this.listdata.concat(dataList);
                  this.total_page = data.userList.total_page;
                  this.preType = mask;
                  more.style.display = 'none';
                }else{
                  error(desc)
                }
              }
            });
        }
	    },
      mounted(){
          this.$nextTick(()=>{
            this.typeList('');
          })
        }
}

//  获取用户/员工信息
export const getInfo = {
  data(){
    return {
      sign: 2,
      user: {
        state: "",
      },
      qnhost: qnhost,
      index_image: [],
      tags: []
    }
  },
  methods: {
    userInfo(){
        let params ={
          token: getCookie('token')
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
              this.user = data.user;
              this.tags = data.user.tags?data.user.tags.split(","):[];
              this.index_image = data.user.index_image?data.user.index_image.split(','):[];
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