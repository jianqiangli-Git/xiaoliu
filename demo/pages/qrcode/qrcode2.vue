<template>
  <viwe>
    <view class="container" :style="{width:'100%',height: screenHeight + 'px',overflow:'hidden'}">
      <view class="header" :animation="headerAnimData"
            :style="{height:screenHeight * 0.15 + 'px', transform:`translateY(${(-screenHeight * 0.15)}px)`} ">
        <view style="color: #00B7FF;text-align: center;padding-top: 35px;">品牌方名称</view>
      </view>
      <view class="content" :animation="contentAnimData"
            :style="{height:screenHeight * 0.9 + 'px',transform:`translateY(${screenHeight * 0.9}px)`}">
        <view class="logo">
          <img src="/static/loading_icon.gif" style="width: 100%;height: 100%;border-radius: 100%" alt="">
        </view>
        <view class="arrow" @click="closeAnimation"></view>

        <view class="barCode">
          <image src="/static/barCode.png" alt="" mode="widthFix"/>
        </view>

        <view class="integral_tip">
          每次消费都可扫码来获得会员积分，会员积分可以兑换好礼哦~
        </view>

        <view class="integral">
          <view class="integral_num">我的积分： 10000</view>
          <view class="integral_use_btn">使用</view>
        </view>
      </view>
    </view>
  </viwe>
</template>

<script>
export default {
  name: "qrcode",
  data() {
    return {
      headerAnimData: {},
      contentAnimData: {},
      screenHeight: 0
    }
  },

  onLoad() {
    uni.getSystemInfo({
      success: (res) => {
        console.log('res==>', res);
        this.screenHeight = res.windowHeight + 48;
        console.log('this.screenHeight', this.screenHeight);
      }
    })
  },

  onShow() {
    setTimeout(() => {
      this.toScanCode();
    }, 100)
  },

  methods: {
    toScanCode() {
      this.$headerAnim.translateY(this.screenHeight * 0).step({duration: 1000})
      this.$contentAnim.translateY(-this.screenHeight * 0).step({duration: 1000})
      this.headerAnimData = this.$headerAnim.export()
      this.contentAnimData = this.$contentAnim.export()
    },

    closeAnimation() {
      this.$headerAnim.translateY(-this.screenHeight * 0.15).step({duration: 1000})
      this.$contentAnim.translateY(this.screenHeight * 0.9).step({duration: 1000})

      this.headerAnimData = this.$headerAnim.export()
      this.contentAnimData = this.$contentAnim.export()

      setTimeout(() => {
        uni.switchTab({
          url: this.$tabList[this.$lastPage].pagePath
        })
      }, 1100)
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 100rpx;
  background-color: #E4E8E9;
}

.content {
  position: relative;
  background-color: #ffffff;
  z-index: 100;

  .logo {
    position: absolute;
    top: -50rpx;
    left: 10rpx;
    width: 100rpx;
    height: 100rpx;
    border: 1px solid #000000;
    border-radius: 100%;
    z-index: 1000;
  }

  .arrow {
    position: absolute;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-top: 12px solid #000000;
    right: 10px;
    top: 5px;
    cursor: pointer;
  }

  .barCode {
    position: absolute;
    width: 80%;
    top: 80rpx;
    left: 50%;
    transform: translateX(-50%);
  }

  .integral_tip {
    font-family: "Microsoft YaHei UI";
    width: 80%;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translateX(-50%);
  }

  .integral {
    position: absolute;
    display: flex;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);

    .integral_num {
      flex: auto;
      flex-grow: 2;
      text-align: center;
    }

    .integral_use_btn {
      flex: auto;
      color: #00C777;
      padding-left: 20rpx;
    }

  }
}


</style>
