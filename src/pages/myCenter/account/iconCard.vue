<template>
  <!-- 图标卡 -->
  <div class="iconDivType">
    <van-row gutter="20">
      <van-col span="12" v-for="item in demoData" :key="item.id">
        <div class="iconCardDivType" @click="onClick(item)">
          <img :src="item.iconUrl">
          <div class="titleType">{{item.title}}</div>
          <div class="amountType">
            {{balancePoints[item.varType]}}
            <span>{{item.unit}}</span>
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  props: ["demoData", "balancePoints"],
  methods: {
    onClick(val) {
      // console.log("点击事件", val);
      if (val.id === "key01-1") {
        wx.navigateTo({
          url: "/pages/myCenter/account/recharge/main"
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.iconDivType {
  margin: 0 30rpx;
  .iconCardDivType {
    margin: 20rpx 0 0 0;
    padding: 0 0 24rpx 0;
    border-radius: 10rpx;
    box-shadow: 10rpx 10rpx 24rpx rgba(153, 174, 223, 0.2);
    img {
      margin: 20rpx 0 0 0;
      width: 100rpx;
      height: 100rpx;
    }
    .titleType {
      font-size: 32rpx;
      letter-spacing: 2rpx;
    }
    .amountType {
      margin: 10rpx 0 0 0;
      color: #007eff;
    }
  }
}
</style>