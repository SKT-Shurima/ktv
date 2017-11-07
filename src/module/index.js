	

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
  function setCookie (c_name,value,expTime){  
    var exdate = new Date();  
    exdate.setTime(exdate.getTime() + expTime *3600 * 1000);  
    document.cookie= c_name + "=" + escape(value)+((expTime==null) ? "" : ";expires="+exdate.toGMTString());  
  }
  function getCookie (c_name){  
    if (document.cookie.length>0){  
      var c_start=document.cookie.indexOf(c_name + "=");  
        if (c_start!=-1){   
        c_start=c_start + c_name.length+1;  
           var c_end=document.cookie.indexOf(";",c_start);  
           if (c_end==-1)   
            c_end = document.cookie.length  
            return unescape(document.cookie.substring(c_start, c_end))  
        }  
    }  
    return ""     
  }
	var query=getCode();
	if (getCookie("access_token")) {
		  window.location.href = "module/index.html";
	}
  
	if (!query.code) {
		var callbackUrl = 'ktvweb.zertone2.com';
		var redirectUrl = encodeURIComponent("http://"+callbackUrl+"/index.html" );
		var href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcdb40d3dfe411dab&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
		window.location.href = href;
	}else{
      var ticketParmas = {
        reflush: false
      } 
      $.ajax({
          url: `${baseAjax}/login/getWechatTicket.jhtml`,
          type: 'GET',
          dataType: 'json',
          data: ticketParmas,
          success: function(res){
            var code=res.code,data=res.data,desc=res.desc;
            if (res.code===0) {
                setCookie("ticket",data.ticket,.5);
                getUserInfo();
            }else{
                error(code,desc)
            }
          }
      });
  }
	
	// 登录
  function getUserInfo(){
    var params={
      code: query.code
    };
    $.ajax({
      url: `${baseAjax}/login/login.jhtml`,
      type: 'POST',
      dataType: 'json',
      data: params,
      success:function(res){
        var code=res.code,data=res.data,desc=res.desc;
        if (code===0) {
            var userInfo = JSON.stringify(data.user);
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
    

  
 
    