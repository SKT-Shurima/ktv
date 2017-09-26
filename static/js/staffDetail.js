$(function(){
  $('#slide').swipeSlide({
    autoSwipe: true, //自动切换默认是
    speed: 3000, //速度默认4000
    continuousScroll: true, //默认否
    transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)', //过渡动画linear/ease/ease-in/ease-out/ease-in-out/cubic-bezier
    lazyLoad: true, //懒加载默认否
    firstCallback: function(i, sum, me) {
        me.find('.dot').children().first().addClass('cur');
    },
    callback: function(i, sum, me) {
        me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
    }
  });
  var data = [
    {
      text: '包厢号001',
      value: 1
    }, {
      text: '包厢号002',
      value: 2
    },{
      text: '包厢号003',
      value: 3
    }
  ];

  var picker = new Picker({
    data: [data],
    title: ''
  });

  picker.on('picker.select', function (selectedVal, selectedIndex) {
    console.log(selectedVal,selectedIndex);
  })

  $('#predate').on('touchstart', function () {
    picker.show();
  });
  // 立即支付
  $('#payment').on('touchstart',function(){
    $('#mask').addClass('mask_visible');
    $('.pay-box').addClass('box-visible');
  });
  $('.weui_mask').on('touchstart',function(){
    $('.mask_visible').removeClass('mask_visible');
    $('.pay-box').removeClass('box-visible');
  });
  // 现金支付
  $('#cash-pay').on('touchstart',function(){
    console.log('现金支付');
  });
  // 微信支付
  $('#wx-pay').on('touchstart',function(){
    $('.pay-box').removeClass('box-visible');
    $('.reward-box').addClass('box-visible');
  });
  // 购买
  $('#ensure-reward').on('touchstart',function(){
    $('.mask_visible').removeClass('mask_visible');
    $('.reward-box').removeClass('box-visible');
  })
});


