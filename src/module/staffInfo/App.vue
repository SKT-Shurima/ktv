<template>
  <div id="app">
    <div class="staff-info primary-bg">
      <i class="icon icon-109" id='back'></i>
      <em id='edit'>编辑</em>
      <dl class="info-box">
        <dt class="avater">
          <img src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg"  data-src="http://gw2.alicdn.com/bao/uploaded/i4/392314057/TB2kNLbjrBkpuFjy1zkXXbSpFXa_!!392314057.png_250x250.jpg" alt="">
        </dt>
        <dd>
          <div class="name ellipsis-1">林发可</div>
          <div class="wxid ellipsis-1">13611012011(微信号)</div>
        </dd>
        <dd class="signin signin-bg" id='payment'>
          签到
        </dd>
      </dl>
   </div>
   <div class="container">
      <div class="upload-avater">
        <div class="upload-limit color-9">
          个人图册（上限10张）
        </div>
        <div class="avater-list-wrap">
            <div class="avater-list-box">
              <ul class="weui_uploader_files" id='avater-list'></ul>
              <div class="weui_uploader_input_wrp">
                  <!-- <input class="weui_uploader_input" type="file" accept="image/jpg,image/jpeg,image/png,image/gif" onchange="previewImage(this)"/> -->
              </div> 
            </div>
        </div>
      </div>
      <ul class="base-info">
          <li class="border-bottom-1px cell"><label class="cell-label">姓名</label><em>林发可</em></li>
          <li class="border-bottom-1px cell"><label class="cell-label">花名</label><em>可可</em></li>
          <li class="border-bottom-1px cell"><label class="cell-label">类别</label><em>骨感</em></li>
      </ul>
      <ul class="base-info">
          <li class="border-bottom-1px cell"><label class="cell-label">身高(cm)</label><em>172</em></li>
          <li class="border-bottom-1px cell"><label class="cell-label">体重(kg)</label><em>48</em></li>
          <li class="border-bottom-1px cell"><label class="cell-label">籍贯</label><em>浙江温州</em></li>
          <li class="border-bottom-1px cell"><label class="cell-label">出生日期</label><em>1999-01-01</em></li>
      </ul>
      <ul class="base-info">
          <li class="border-bottom-1px cell"><label class="cell-label">兴趣爱好</label><em>抽烟，喝酒，烫头</em></li>
          <li class="border-bottom-1px cell"><label class="cell-label">心情</label></li>
      </ul>
      <div class="tag">
        <h1>标签</h1>
        <div class="labels">
            <button class="weui_btn btn-checked border-1px color-9">小酒窝</button>
            <button class="weui_btn btn-checked border-1px color-9">皮肤白皙</button>
            <button class="weui_btn btn-checked border-1px color-9">鼻梁高</button>
            <button class="weui_btn btn-checked border-1px color-9">标准身材</button>
            <button class="weui_btn btn-checked border-1px color-9">A4腰</button>
            <button class="weui_btn btn-checked border-1px color-9">眼睛水灵</button>
        </div>
      </div>
   </div>
   <div class="op-btn primary-bg">
      切换为忙碌状态
    </div>
    <div class="mask" id='mask'></div>
    <div class="pay-box">
      <h1 class="border-bottom-1px">请选择支付方式</h1>
      <ul>
        <li class="border-bottom-1px" id='cash-pay'>
          <i class="cash"></i>现金支付
        </li>
        <li class="border-bottom-1px" id='wx-pay'>
          <i class="wx"></i>微信支付
        </li>
      </ul>
      <div class="op-btn gray-bg" style='position: absolute;'>取消</div>
    </div>
    <div class="reward-box">
        <ul>
          <li class="reward-list">
            <dl>
              <dt></dt>
              <dd>300</dd>
            </dl>
          </li>
          <li class="reward-list">
            <dl>
              <dt></dt>
              <dd>400</dd>
            </dl>
          </li>
          <li class="reward-list">
            <dl>
              <dt></dt>
              <dd>500</dd>
            </dl>
          </li>
          <li class="reward-list">
            <dl>
              <dt></dt>
              <dd>600</dd>
            </dl>
          </li>
          <li class="reward-list">
            <dl>
              <dt></dt>
              <dd>700</dd>
            </dl>
          </li>
          <li class="reward-list">
            <dl>
              <dt></dt>
              <dd>800</dd>
            </dl>
          </li>
          <li class="reward-list">
            <dl>
              <dt></dt>
              <dd>900</dd>
            </dl>
          </li>
          <li class="reward-list">
            <dl>
              <dt></dt>
              <dd>1000</dd>
            </dl>
          </li>
        </ul>
        <div class="op-btn primary-bg" id='ensure-reward' style='position: absolute;'>
          购买
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>
