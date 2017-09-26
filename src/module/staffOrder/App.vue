<template>
  <div id="app">
     <header class="primary-header primary-bg">
        <i class="icon icon-109" id='back'></i>
        <div class="order-tab">
            <span class="tab-checked" data-type='handle'>待处理</span>
            <span data-type='complete'>完成</span>
        </div>
    </header>
    <div class="container">
        <ul id="handle-list" style="display:none;">
            <li class="border-bottom-1px">
                <div class="p">
                    <img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt="">
                </div>
                <div class="i">
                    <dl class="con">
                        <dt>
                            <div class="staff-name ellipsis-1">
                               林发可
                            </div>
                            <div class="staff-room ellipsis-2">
                              1918号包厢
                            </div>
                        </dt>
                        <dd style="display:none;" class="staff-op">
                            <button class="weui_btn border-1px color-blue reject">接单</button>
                        </dd>
                        <dd class="staff-op">
                            <button class="weui_btn border-1px color-blue ensure">确认</button>
                            <button class="weui_btn border-1px color-9 cancel">取消</button>
                        </dd>
                    </dl>
                    <div class="status">
                        <span>
                            <i class="time"></i>03:00    
                        </span>
                        <em class="primary">
                            已接单
                        </em>
                    </div>
                </div>
            </li>
        </ul>
        <ul id='complete-list' >
             <li class="border-bottom-1px">
                <div class="p">
                    <img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt="">
                </div>
                <div class="i">
                    <dl class="con">
                        <dt>
                            <div class="staff-name ellipsis-1">
                               林发可
                            </div>
                            <div class="staff-room ellipsis-2">
                              1918号包厢
                            </div>
                        </dt>
                    </dl>
                    <div class="status color-9">
                      已接单
                    </div>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>
