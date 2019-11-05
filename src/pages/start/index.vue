<template>
  <!-- 启动页 -->
  <div class="startPageDivType">
    <canvas class="canvasType" canvas-id="firstCanvas">
      <div class="btnType" @click="handlerLogin">跳过</div>
    </canvas>
    <image :src="imgUrl" mode="widthFix"></image>
  </div>
</template>

<script>
export default {
  created () {
     this.$myApi.login.getStartImg().then(res => {
       if(res.code === 200){
        //  console.log("获取图片", res.picList[0]);
         this.imgUrl = res.picList[0].bannerUrl
       }
     })
  },
  onShow() {
    // 计算倒计时圆的大小，直径
    wx
      .createSelectorQuery()
      .select(".canvasType")
      .boundingClientRect(res => {
        this.xIndex = res.width / 2;
        this.rIndex = this.xIndex - 2;
      })
      .exec();
      // 启动倒计时
    this.clearTimer = false;
    this.countdownFun("onShow启动");
  },
  data() {
    return {
      times: 3,
      xIndex: 0,
      rIndex: 0,
      clearTimer: false,
      imgUrl: ""
    };
  },
  methods: {
    // 启动倒计时
    countdownFun(val) {
      // 倒计时动画
      // 设置画布
      const context = wx.createCanvasContext("firstCanvas");
      let timeNum = 150;
      const countdown = setInterval(() => {
        timeNum += 1;
        if (timeNum === 350 || this.clearTimer) {
          if (!this.clearTimer) {
            this.handlerLogin();
          }
          clearInterval(countdown);
        }
        // 在画布上画
        this.drawLine(context, timeNum);
      }, 15);
    },
    // 到计时动画实现
    drawLine(context, timeNum) {
      context.setStrokeStyle("rgba(255, 255, 255, 1)");
      context.setLineWidth(2);
      context.arc(
        this.xIndex,
        this.xIndex,
        this.rIndex,
        1.5 * Math.PI,
        timeNum * Math.PI / 100
      );
      context.stroke();
      context.draw();
    },
    handlerLogin() {
      // 启动后，通过判断token，实现跳转
      wx.getStorage({
        key: "token",
        success: res => {
          wx.switchTab({
            url: "/pages/customer/main"
          });
        },
        fail: error => {
          wx.redirectTo({
            url: "/pages/login/main"
          });
        },
        complete: () => {
          this.clearTimer = true;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.startPageDivType {
  position: relative;
  width: 100%;
  height: calc(100vh);
  background: rgba(0, 0, 0, 0.2);

  image {
    width: 100%;
  }

  .canvasType {
    position: absolute;
    top: 30rpx;
    right: 30rpx;
    width: 80rpx;
    height: 80rpx;

    .btnType {
      width: 100%;
      height: 100%;
      line-height: 80rpx;
      text-align: center;
      border-radius: 50%;
      font-size: 24rpx;
      color: #ffffff;
      background: rgba(255, 255, 255, 0.17);
      overflow: hidden;
    }
  }
}
</style>
