let baseAjax = '/ktv/web';
let payforAjax = '/ktv/payrefund/';

const setCookie = (c_name,value,expTime)=>{  
	var exdate = new Date();  
	exdate.setTime(exdate.getTime() + expTime *3600 * 1000);  
	document.cookie= c_name + "=" + escape(value)+((expTime==null) ? "" : ";expires="+exdate.toGMTString());  
}
const getCookie = (c_name)=>{  
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
const delCookie = (c_name)=>{  
	var exp = new Date();  
	exp.setTime(exp.getTime() - 1);  
	var cval = getCookie(c_name);  
	if(cval!=null){  
		document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();  
	}
}
const trans = params => {
    // Do whatever you want to transform the data
    let ret = ''
    for (let it in params) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
    }
    return ret ;
}
const getRequest = ()=> {
  	var url = location.search;
   	var theRequest = new Object();
   	if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
      }
   }
   return theRequest;
}
// 过滤器
const transTime = (val)=>{
    if (val < 10) {
      val = "0" + val ;
    }
    return val ;
};
const countDownFilter = (time)=>{
	let totalTime = 10*60000;
	time = totalTime-time;
	if(time>=0){
		let m = parseInt(time / 60000) ,s = parseInt(time % 60000/1000);
		m = transTime(m);
    	s = transTime(s);
		return `${m}:${s}`;
	}else{
		return "00:00";
	}
}
const timeFilter = (time)=>{
	time -= 0;
    var newDate = new Date(time);
    let {h,m}={h:newDate.getHours(),m:newDate.getMinutes()};
    h = transTime(h);
    m = transTime(m);
    return `${h}:${m}`;
}
const birthFilter = (time)=>{
	time*=1000;
	var now = new Date().getFullYear();
    var newDate = new Date(time).getFullYear();
    return now-newDate;
}
const dateFilter  = time =>{
    time-=0;
    var newDate = new Date(time);
    let {y,m,d}={y:newDate.getFullYear(),m:newDate.getMonth()+1,d:newDate.getDate()};
    m = transTime(m);
    d = transTime(d);
    return y +'-' + m + "-" + d ;
}

const error = (msg)=>{
	console.log(msg);
}
$(function(){
	$('#back').on('touchstart',function(){
    	window.history.go(-1);
    });
});
   