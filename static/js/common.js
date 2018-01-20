
// 开发环境
// var baseAjax = '/ktv/web', payforAjax = '/ktv/payrefund/',qnhost='http://oxqmde0yk.bkt.clouddn.com/';
// 本地测试
// var baseAjax = 'http://192.168.31.35:8080/ktv/web', payforAjax = 'http://192.168.31.35:8080/ktv/payrefund/',qnhost='http://oxqmde0yk.bkt.clouddn.com/';
// 本地线上环境
// var baseAjax = 'http://120.26.90.70:8080/ktv/web', payforAjax = 'http://120.26.90.70:8080/ktv/payrefund/',qnhost='http://oxqmde0yk.bkt.clouddn.com/';
  
var baseAjax = 'http://118.31.251.48:8080/ktv/web', payforAjax = 'http://118.31.251.48:8080/ktv/payrefund/',qnhost='http://oxqmde0yk.bkt.clouddn.com/';


var setCookie =  function (c_name,value,expTime){ 
	var exdate = new Date();  
	exdate.setTime(exdate.getTime() + expTime *3600 * 1000);  
	document.cookie= c_name + "=" + escape(value)+((expTime==null) ? "" : ";expires="+exdate.toGMTString());  
}
var getCookie = function (c_name) {  
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
var delCookie = function (c_name){  
	var exp = new Date();  
	exp.setTime(exp.getTime() - 1);  
	var cval = getCookie(c_name);  
	if(cval!=null){  
		document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();  
	}
}
var trans =  function (params){
    // Do whatever you want to transform the data
    var ret = ''
    for (var it in params) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
    }
    return ret ;
}
var getRequest = function(){
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
// 过滤器
var transTime = function (val){
    if (val < 10) {
      val = "0" + val ;
    }
    return val ;
};
var countDownFilter = function(time){
	var totalTime = 10*60000;
	time = totalTime-time;
	if(time>=0){
		var m = parseInt(time / 60000) ,s = parseInt(time % 60000/1000);
		m = transTime(m);
    s = transTime(s);
		return m+":"+s;
	}else{
		return "00:00";
	}
}
var timeFilter = function (time){
	time -= 0;
    var newDate = new Date(time);
    var {h,m}={h:newDate.getHours(),m:newDate.getMinutes()};
    h = transTime(h);
    m = transTime(m);
    return h+":"+m;
}
var birthFilter = function(time){
	var now = new Date().getFullYear();
  var newDate = new Date(time).getFullYear();
  return now-newDate;
}
var dateFilter  = function(time){
    time-=0;
    var newDate = new Date(time);
    var y=newDate.getFullYear(),m=newDate.getMonth()+1,d=newDate.getDate();
    m = transTime(m);
    d = transTime(d);
    return y +'-' + m + "-" + d ;
}

var error = function(code,msg){
	if (code===-1002) {
    $('','请重新登录');
    window.location.href = window.location.origin;
  }else{
    console.log(msg);
  }
}
var auth_token=getCookie('token');
if (!auth_token) {
    wx.closeWindow();
}
function randomString(len) {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}
var jsapi_ticket = getCookie('ticket'),auth_nonceStr = randomString(32),auth_timestamp=parseInt(new Date().getTime()/1000);
var auth_url=location.href.split('#')[0];
var auth_signature="jsapi_ticket="+jsapi_ticket+"&noncestr="+auth_nonceStr+"&timestamp="+auth_timestamp+"&url="+auth_url;
auth_signature = decodeURIComponent(auth_signature);
  wx.config({
      debug: false, 
      appId: 'wxcdb40d3dfe411dab',
      timestamp: auth_timestamp,
      nonceStr: auth_nonceStr ,
      signature: hex_sha1(auth_signature),
      jsApiList: ["getLocation",'hideOptionMenu','showMenuItems']
  });
  wx.ready(function(){
    wx.hideOptionMenu();
    wx.showMenuItems({
      menuList: [
        "menuItem:refresh"
      ],
      success: function (res) {
      },
      fail: function (res) {
      }
    })
    // 获取地理位置信息
    var posInfo = getCookie('posInfo');
    if (!posInfo) {
      wx.getLocation({
          type: 'wgs84',
          success: function (res) {
              var dis = GetDistance(res.latitude,res.longitude,30.1889041686,120.1828122139);
              if (dis>=10000000) {
                $.alert('','不在服务范围内');
                wx.closeWindow();
              }else{
                posInfo = {
                  lat:res.latitude,
                  lng:res.longitude
                }
                posInfo=JSON.stringify(posInfo);
                setCookie('posInfo',posInfo,.05);
              }
          }
      });
    }
  })

wx.error(function(res){
    var  ticketParmas = {
        reflush: true
    } 
    $.ajax({
        url: baseAjax+"/login/getWechatTicket.jhtml",
        type: 'GET',
        dataType: 'json',
        data: ticketParmas,
        success: function(res){
          var {code,data,desc} = res;
          if (res.code===0) {
              setCookie("ticket",data.ticket,.5);
          }else{
              error(code,desc)
          }
        }
    });
});

// 计算两点之间距离
function rad(d){
    return d * Math.PI / 180.0;
}
function GetDistance( lat1,  lng1,  lat2,  lng2){
    var radLat1 = rad(lat1);
    var radLat2 = rad(lat2);
    var a = rad(lat1) - rad(lat2);
    var b = rad(lng1) - rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10  ;
    return s;
}



$(function(){
	$('#back').on('touchstart',function(){
      var lastUrl = document.referrer;
      if (lastUrl) {
        window.history.go(-1);
      }else{
        window.location.replace('index.html');
      }
    	
    });
});