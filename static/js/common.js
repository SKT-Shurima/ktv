let baseAjax = '/ktv/web';

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
const GetRequest = ()=> {
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
const error = (msg)=>{
	console.log(msg);
}
$(function(){
	$('#back').on('touchstart',function(){
    	window.history.go(-1);
    });
});
   