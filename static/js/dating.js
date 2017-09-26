$(function(){
     var lazyloadImg = new LazyloadImg({
        el: '.weui-updown [data-src]', //匹配元素
        top: 50, //元素在顶部伸出长度触发加载机制
        right: 50, //元素在右边伸出长度触发加载机制
        bottom: 50, //元素在底部伸出长度触发加载机制
        left: 50, //元素在左边伸出长度触发加载机制
        qriginal: false, // true，自动将图片剪切成默认图片的宽高；false显示图片真实宽高
        load: function(el) {
            el.style.cssText += '-webkit-animation: fadeIn 01s ease 0.2s 1 both;animation: fadeIn 1s ease 0.2s 1 both;';
        },
        error: function(el) {

        }
    });
    TagNav('#tagnav',{
        type: 'scrollToFirst',
    });
});
