	

  function getCode (){
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1),strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  }
	let query=getCode();
	if (getCookie("access_token")) {
		  window.location.href = "module/index.html";
	}
  
	if (!query.code) {
		let callbackUrl = 'ktvweb.zertone2.com';
		const redirectUrl = encodeURIComponent("http://"+callbackUrl+"/index.html" );
		let href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcdb40d3dfe411dab&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
		window.location.href = href;
	}else{
      $.ajax({
          url: `${baseAjax}/login/getWechatTicket.jhtml`,
          type: 'GET',
          dataType: 'json',
          success: res=>{
            let {code,data,desc} = res;
            if (res.code===0) {
                setCookie("ticket",data.ticket,2);
                getUserInfo();
            }else{
                error(code,desc)
            }
          }
      });
  }
	
	// 登录
  function getUserInfo(){
    let params={
      code: query.code
    };
    $.ajax({
      url: `${baseAjax}/login/login.jhtml`,
      type: 'POST',
      dataType: 'json',
      data: params,
      success: res=>{
        let {code,data,desc} =res;
        if (code===0) {
            let userInfo = JSON.stringify(data.user);
            sessionStorage.userInfo = userInfo;
            setCookie("token",data.token,2);
            setCookie("openid",data.user.wechat_openid,2);
            window.location.href = 'module/index.html';
        }else{
            error(code,desc)
        }
      }
    });
  }
    

  
 
    