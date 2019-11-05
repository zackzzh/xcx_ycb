<template>
  <div>
    <!-- 订单弹窗 -->
    <van-dialog
      use-slot
      async-close
      :title="orderTitle"
      :show="isShowDialog"
      show-cancel-button
      @cancel="closeDialog"
      @confirm="orderConfirm"
    >
      <div class="orderDivType">
        <div>充值金额&nbsp;&nbsp;{{money}}</div>
        <div>奖励积分&nbsp;&nbsp;{{money/10}}</div>
      </div>
    </van-dialog>

    <!-- 支付弹窗 -->
    <van-dialog
      use-slot
      async-close
      :title="topTitle"
      :show="isShowPay"
      show-cancel-button
      @cancel="closeDialog"
      @confirm="onConfirm"
    >
      <div class="qrImgDivType">
        <!-- 微信二维码 -->
        <img v-if="!isBand" :src="bankInfo.wechatCode">
        <!-- 银行 -->
        <div v-else class="payBankDivType">
          <div>账户名：{{bankInfo.bankAccount}}</div>
          <div>账户号：{{bankInfo.bankCardno}}</div>
          <div>开户行：{{bankInfo.bankName}}</div>
        </div>
        <div style="margin: 0 10rpx;">支付成功后，请截图上传到【交易记录】中的上传凭证并联系客服</div>
        <div class="customerServiceType">客服微信号：{{bankInfo.serviceWechat}}</div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  props: ["bankInfo", "isBand", "isShowDialog", "topTitle", "money","isShowPay"],
  data() {
    return {
      orderTitle: "确认金额",
      isShow: false
    };
  },
  methods: {
    //   关闭弹窗
    closeDialog() {
      // this.isShow = false;
      this.$emit("closeDialog");
    },
    // 下订单
    orderConfirm() {
      // this.isShow = true;
      this.$emit("handlerOrder");
      // this.$emit("closeDialog");
    },
    // 支付弹窗确认
    onConfirm() {
      this.$emit("onConfirm");
    }
  }
};
</script>

<style scoped lang="less">
.qrImgDivType {
  text-align: center;
  .payBankDivType {
    margin: 40rpx 0;
    text-align: left;
    div {
      margin: 20rpx 80rpx;
    }
  }
  img {
    margin: 20rpx 0;
    width: 300rpx;
    height: 300rpx;
  }
  .customerServiceType {
    margin: 20rpx 0;
    font-size: 30rpx;
    color: rgba(0, 0, 0, 0.65);
  }
  .otherPayType {
    margin: 0 50rpx 30rpx 0;
    cursor: pointer;
    text-align: right;
    color: #00af00;
  }
}
.orderDivType {
  margin: 30rpx 0 30rpx 50rpx;
}
</style>