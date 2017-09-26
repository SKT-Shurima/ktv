$(function(){
	$('.weui_uploader_input_wrp').on('touchend',function(){
		$.actions({
          	actions: [
	            {
	               	text: "拍照",
	               	className: "bg-blue f-white",
	               	onClick: function() {
		                console.log('拍照')
		            }
	            },
	            {
	              	text: "相册选取",
	              	className: "bg-green f-white",
	              	onClick: function() {
		                console.log('相册选取')
		            }
	            },
          	]
        });
	});
	// 选择类别
	var types = [
	    {
	      text: '小清新',
	      value: 1
	    }, {
	      text: '高颜值',
	      value: 2
	    },{
	      text: '才艺',
	      value: 3
	    }
	];
	var typePicker = new Picker({
	    data: [types],
	    title: ''
	});
	$('#types').on('touchstart',function(){
		typePicker.show();
	});
	typePicker.on('picker.select', function (val, index) {
	    $('#types').val(types[index].text);
	});
	// 选择籍贯
	var province = [];
	var city = [];
	(function(){
		for (var i = 0; i < cities.length; i++) {
			var proItem = {
				text: cities[i].name,
				value: cities[i].id
			};
			province.push(proItem);
		}
		initCity(0);
	})();
	function initCity(index){
		var nextAddresses = cities[index].nextAddresses;
		city = [];
		for (var j = 0; j < nextAddresses.length; j++) {
			var cityItem = {
				text: nextAddresses[j].name,
				value: nextAddresses[j].id
			};
			city.push(cityItem);
		}
	}
	var cityPicker = new Picker({
		    data: [province,city],
		    title: '',
		    selectedIndex: [0,0]
		});
	$('#nativePlace').on('touchstart',function(){
		cityPicker.show();
	});
	cityPicker.on('picker.change', function (e,index) {
	    if (e===0) {
	    	initCity(index);
	    	cityPicker.refillColumn(1, city);
	    	cityPicker.scrollColumn(1, 0);
	    }
	});
	cityPicker.on('picker.select', function (val, index) {
		setTimeout(function(){
			var area = province[index[0]].text + city[index[1]].text;
    		$('#nativePlace').val(area);
		},300);
	});
	// 选择出生日期
	var dateY = [],dateM=[],dateD=[];
	(function(){
		var year = new Date().getFullYear();
		for (var y = 1970; y < year; y++) {
			var yItem = {
				text: y+'年',
				value: y
			};
			dateY.push(yItem);
		}
		for (var m = 1; m < 13; m++) {
			var mItem = {
				text: m+'月',
				value: m<10?'0'+m:m
			}
			dateM.push(mItem);
		}
		initDays(30);
	})();
	function initDays(days){
		dateD =[];
		for(var d = 1 ;d<=days;d++){
			var dItem = {
				text: d+'日',
				value: d<10?'0'+d:d
			};
			dateD.push(dItem);
		}
	}
	var datePicker = new Picker({
		    data: [dateY,dateM,dateD],
		    title: '',
		    selectedIndex: [0,0,0]
		});
	$('#chooseDate').on('touchstart',function(){
		datePicker.show();
	});
	datePicker.on('picker.change', function (e,index) {
	    if (e===1) {
	    	var selectedIndex = datePicker.selectedIndex;
	    	var days = new Date(dateY[selectedIndex[0]].value,dateM[selectedIndex[1]].value,0).getDate();
	    	initDays(days);
	    	datePicker.refillColumn(2, dateD);
	    	datePicker.scrollColumn(2, 0);
	    }
	});
	datePicker.on('picker.select', function (val, index) {
		setTimeout(function(){
			var birthday = dateY[index[0]].value +'-'+dateM[index[1]].value+'-'+dateD[index[2]].value;
    		$('#chooseDate').val(birthday);
		},300);
	});
	// 评价
	$('.labels>.weui_btn').on('touchstart',function(){
		$(this).hasClass('btn-checked')? $(this).removeClass('btn-checked'):$(this).addClass('btn-checked');
	})
});
function previewImage(file) {
    var MAXWIDTH = 100;
    var MAXHEIGHT = 200;
     return;
    if (file.files && file.files[0]) {
        var reader = new FileReader();
        reader.onload = function (evt) {
        	var fileNum = $('.weui_uploader_file').length;
        	if (fileNum<=9) {
        		$('.avater-list-box').css('width', (fileNum+2)*88+"px");
        		var lis = '<li class="weui_uploader_file" style="background-image:url('+evt.target.result+')"></li>';
	        	$('#avater-list').append(lis);
	        	
        	}else{
        		$.toptips('已到达最大上传量','warning');
        	}
        };
        reader.readAsDataURL(file.files[0]);
        console.log(file.files[0]);
    }
}
