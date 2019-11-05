<template>
  <div class="orderDivType">
    <!-- 订单弹层v-else -->
    <van-dialog
      v-if="!isShowPay"
      use-slot
      async-close
      show-cancel-button
      :title="topTitle"
      :show="isShow"
      @cancel="closeDialog"
      @confirm="submitOrder"
    >
      <div>
        <div class="contentDivType">
          <!-- 展示L和T数据 -->
          <div v-for="item in data.list" :key="item.title">
            <div v-if="item.title">
              <div class="titleType">{{item.title}}</div>
              <div v-for="(o,indexO) in titleList" :key="o.title">
                <div class="colDivType">
                  <div>
                    <!-- 标题 -->
                    {{o.title}}&nbsp;
                    <!-- 标题所对应的值 -->
                    <span>{{item[o.varType]}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="payType">
          <div>实际消耗积分&nbsp;&nbsp;{{data.usedPoints || 0}}</div>
          <div>线索总额&nbsp;&nbsp;{{data.priceSum || 0}}元</div>
          <div>支付方式&nbsp;&nbsp;{{payType[data.radioVal]}}</div>
        </div>
      </div>
    </van-dialog>

    <!-- 支付弹窗 v-if="isShowPay"-->
    <van-dialog
      v-else
      use-slot
      async-close
      :title="topTitle"
      :show="isShow"
      show-cancel-button
      @cancel="closePay"
      @confirm="submitPay"
    >
      <div class="payDivType">
        <img v-if="!isBand" :src="bankInfoFun.wechatCode">
        <div v-else class="payBankDivType">
          <div>账户名：{{bankInfoFun.bankAccount}}</div>
          <div>账户号：{{bankInfoFun.bankCardno}}</div>
          <div>开户行：{{bankInfoFun.bankName}}</div>
        </div>
        <div style="margin: 0 10rpx;">支付成功后，请截图上传到【交易记录】中的上传凭证并联系客服</div>
        <div class="customerServiceType">客服微信号：{{bankInfoFun.serviceWechat}}</div>
      </div>
    </van-dialog>

    <van-toast id="van-toast"/>
  </div>
</template>

<script>
export default {
  props: ["isShow", "data", "balancePoints"],
  computed: {
    bankInfoFun() {
      return this.$store.getters["account/getPaymentInfo"];
    }
  },
  data() {
    return {
      topTitle: "确认订单",
      isShowPay: false,
      payType: ["余额", "线下支付", "微信", "其他"],
      titleList: [
        {
          title: "品牌",
          varType: "brand"
        },
        // {
        //   title: "车型",
        //   varType: "model"
        // },
        {
          title: "城市",
          varType: "city"
        },
        {
          title: "数量",
          varType: "count"
        }
      ],
      isBand: false
    };
  },
  methods: {
    submitOrder(val) {
      // 用户下单接口（购买线索），传入参数：
      // 普通线索参数lBrandId，lModelId，lCity，lNumber；
      // 精准线索参数tBrandId，tModelId，tCity，tNumber,
      // 使用积分数usedPoints，
      // 支付方式
      // 数据整理，并访问后端

      // 支付方式paymentType（0余额、1线下支付、2微信、3支付宝、4其他）选择余额支付时必须填
      // 展示支付界面

      const value = {
        paymentType: this.data.radioVal // 支付方式
      };
      // console.log("提交订单", this.data);
      if (this.data.usedPoints === 0 || !this.data.usedPoints) {
        value.usedPoints = undefined;
      } else {
        value.usedPoints = this.data.usedPoints;
      }

      if (this.data.list.lPrice && this.data.list.tPrice) {
        // 设置l数据，设置t数据
        value.lBrandId = this.data.list.lPrice.id;
        value.lCity = this.data.list.lPrice.city.split(" ")[1];
        value.lNumber = this.data.list.lPrice.count;
        value.tBrandId = this.data.list.tPrice.id;
        value.tCity = this.data.list.tPrice.city.split(" ")[1];
        value.tNumber = this.data.list.tPrice.count;
      } else if (this.data.list.lPrice) {
        // 设置l数据
        value.lBrandId = this.data.list.lPrice.id;
        value.lCity = this.data.list.lPrice.city.split(" ")[1];
        value.lNumber = this.data.list.lPrice.count;
      } else if (this.data.list.tPrice) {
        // 设置t数据
        value.tBrandId = this.data.list.tPrice.id;
        value.tCity = this.data.list.tPrice.city.split(" ")[1];
        value.tNumber = this.data.list.tPrice.count;
      }

      // console.log("提交支付数据", value);
      // 访问提交订单接口
      this.$myApi.account.submitOrder(value).then(res => {
        if (res.code === 200) {
          this.$toast.success("提交成功");
          // 展示对应的支付窗口
          this.modePayment(value.paymentType, res);
        } else {
          // this.closePay();
          this.$toast.fail(res.msg);
          // 不成功直接关闭弹窗
          this.closeDialog();
        }
      });
    },
    closeDialog(val) {
      // console.log("取消订单", val);
      this.isShowPay = false;
      this.$emit("closeDialog");
    },
    closePay(val) {
      // console.log("取消支付", val);
      this.isShowPay = false;
      this.topTitle = "确认订单";
      this.closeDialog();
    },
    submitPay(val) {
      // console.log("提交支付", val);
      // 返回上一页，延迟一秒
      this.$goBackOne();
      this.closeDialog();
    },
    modePayment(val, value) {
      // console.log("支付弹窗", val);
      switch (val) {
        case 2: // 微信支付
          this.isShowPay = true;
          this.isBand = false;
          this.topTitle = "扫二维码支付";
          break;
        case 3:
          this.isShowPay = true;
          this.isBand = true;
          this.topTitle = "其他支付";
          // 返回上一页，延迟一秒
          this.$goBackOne();
          this.closeDialog();
          break;
        default:
          // 返回上一页，延迟一秒
          this.$goBackOne();
          this.closeDialog();
          break;
      }
    },
    payWechat() {
      // 微信支付
      this.closeDialog();

      // 微信支付
      this.$myApi.account.wxPayment(value.orderno).then(res => {
        // console.log("发起微信支付", res);
        if (res.code === 200) {
          wx.requestPayment({
            ...res,
            success: res => {
              // console.log("发起微信支付成功", res);
              this.$toast.success("支付成功");
              // 返回上一页，延迟一秒
              this.$goBackOne();
            },
            fail: res => {
              // console.log("发起微信支付失败", res);
              this.$toast.fail("支付失败");
            }
          });
        } else {
          this.$toast.fail(res.msg);
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.orderDivType {
  .payDivType {
    height: auto;
    margin: 20rpx 50rpx 50rpx 50rpx;
    .payBankDivType {
      text-align: left;
      div {
        margin: 20rpx;
      }
    }
    img {
      width: 300rpx;
      height: 300rpx;
    }
    .customerServiceType {
      margin: 20rpx 0 40rpx 0;
      font-size: 30rpx;
      color: rgba(0, 0, 0, 0.65);
      span {
        font-size: 26rpx;
        color: #000000;
      }
    }
    .otherPayType {
      text-align: right;
      color: #00af00;
    }
  }
  .contentDivType {
    margin-top: 20rpx;
    padding: 20rpx 30rpx;
    border-top: 1rpx solid #bebebe;
    border-bottom: 1rpx solid #bebebe;
    text-align: left;
    color: #675f63;
    .titleType {
      margin: 0 0 10rpx 0;
      font-size: 32rpx;
    }
    .colDivType {
      margin: 14rpx 0;
      color: #818181;
      span {
        padding: 2rpx 16rpx;
        border-radius: 10rpx;
        background: #6aacff;
        color: #ffffff;
      }
    }
  }
  .payType {
    margin: 20rpx 30rpx;
    text-align: left;
    line-height: 48rpx;
    font-size: 30rpx;
    color: #9e9a9c;
  }
}
</style>