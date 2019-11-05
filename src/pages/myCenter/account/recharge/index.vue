<template>
  <div class="rechargeDivType">
    <!-- 头部卡片 -->
    <div class="headDivType">
      <img :src="bgImgUrl">
      <div class="balanceDivType">
        <van-row>
          <van-col span="16">
            <div class="balanceType">
              &nbsp;余额
              <span>￥{{balancePoints.balance}}</span>
            </div>
          </van-col>
          <van-col span="8">
            <div class="integralType">
              <div>
                积分&nbsp;&nbsp;&nbsp;
                <span>{{balancePoints.points}}分</span>
              </div>
              <div>
                余额&nbsp;&nbsp;&nbsp;
                <span>{{balancePoints.balance}}元</span>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- 充值金额选择 -->
    <div class="moneyType">
      <div class="titleType">充值金额</div>
      <van-stepper
        input-class="inputType"
        :value="chooseMoney"
        step="1000"
        min="0"
        integer
        @minus="onMinus"
        @change="handlerMoney"
      />
    </div>
    <!-- 支付方式选择 -->
    <div class="paymentDivType">
      <div class="titleType">支付方式</div>
      <van-radio-group :value="radioVal" @change="radioChange">
        <van-cell-group>
          <van-cell
            clickable
            :data-name="index"
            v-for="(item,index) in payType"
            :key="item.id"
            @click="radioClick(index)"
          >
            <van-radio :name="index"/>
            <div slot="icon">
              <img class="iconImgType" :src="item.iconUrl">
            </div>
            <div slot="title">&nbsp;&nbsp;{{item.title}}</div>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>

    <van-button custom-class="submitType" type="info" @click="handlerSubmit">确认充值</van-button>
    <!-- 充值订单弹窗 -->
    <order-dialog
      :bankInfo="bankInfoFun"
      :isBand="isBand"
      :isShowDialog="isShowDialog"
      :isShowPay="isShowPay"
      :topTitle="topTitle"
      :money="chooseMoney"
      @closeDialog="closeDialog"
      @onConfirm="handlerConfirm"
      @handlerOrder="handlerOrder"
    />
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
import rechargeData from "./rechargeData";
import orderDialog from "./orderDialog";

export default {
  components: {
    orderDialog
  },
  computed: {
    balancePoints() {
      // 获取积分
      return this.$store.getters["account/getBalancePoints"];
    },
    bankInfoFun() {
      // 获取银行信息
      return this.$store.getters["account/getPaymentInfo"];
    }
  },
  data() {
    return {
      bgImgUrl: "/static/images/myCenter/recharge/bgImg.png",
      chooseMoney: 3000,
      topTitle: "微信支付二维码",
      btnTitle: "其他支付方式",
      isShowDialog: false,
      isShowPay: false,
      isBand: false,
      payType: rechargeData.rechargePayType, // 支付方式选择
      radioVal: 0
    };
  },
  methods: {
    onMinus(val) {
      // console.log("点击减少", this.chooseMoney);
      if (this.chooseMoney < 3000) {
        this.$toast.fail("充值金额不得低于3000");
        this.chooseMoney = 3000;
      }
    },
    handlerMoney(val) {
      // 充值金额
      const {
        mp: { detail }
      } = val;
      this.chooseMoney = detail;
    },
    handlerSubmit() {
      // console.log("确认充值");
      if (this.chooseMoney % 1000 === 0 && this.chooseMoney >= 3000) {
        this.isShowDialog = true;
        switch (this.radioVal) {
          case 0: // 微信支付
            // this.payWehchat(res);

            this.isBand = false;
            this.topTitle = "二维码支付";
            break;
          case 1: // 其他支付
            this.isBand = true;
            this.topTitle = "其他支付方式";
            break;

          default:
            this.isShowDialog = false;
            this.isBand = false;
            break;
        }
      } else {
        this.$toast.fail("充值金额为1000的倍数，最低3000");
      }
    },
    handlerOrder() {
      // 访问充值接口
      this.isShowDialog = false;
      this.$myApi.account.recharge(this.chooseMoney).then(res => {
        if (res.code === 200) {
          this.isShowPay = true;
          this.$toast.success(res.msg);
        } else {
          this.$toast.fail(res.msg);
        }
      });
    },
    payWehchat(val) {
      // 发起微信支付，调用微信支付接口
      this.isShowDialog = false;
      this.isBand = false;
      // 微信支付
      this.$myApi.account.wxPayment(val.orderno).then(res => {
        // console.log("发起微信支付", res);
        if (res.code === 200) {
          wx.requestPayment({
            ...res,
            success: res => {
              // console.log("发起微信支付成功", res);
              this.$toast.success("支付成功");
              // 返回上一页，延迟一秒
              this.$goBackOne(2);
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
    },
    closeDialog() {
      // 弹窗关闭
      // 弹窗确认按钮recharge
      this.isShowPay = false;
      this.isShowDialog = false;
    },
    handlerConfirm() {
      // 返回上一页，延迟一秒
      this.$goBackOne(2);
      this.closeDialog();
    },
    radioChange(val) {
      // 选择支付方式
      const {
        mp: { detail }
      } = val;
      this.radioVal = parseInt(detail);
    },
    radioClick(val) {
      // console.log("触发单元格支付方式", val);
      this.radioVal = val;
    }
  }
};
</script>

<style lang="less">
.rechargeDivType {
  position: relative;
  margin: 0 30rpx;
  .headDivType {
    img {
      width: 100%;
      height: 230rpx;
      box-shadow: 6rpx 6rpx 21rpx rgba(85, 120, 228, 0.36);
    }
    .balanceDivType {
      position: absolute;
      top: 0;
      width: 100%;
      color: #ffffff;
      .balanceType {
        margin: 60rpx 60rpx 60rpx 60rpx;
        font-size: 30rpx;
        span {
          display: block;
          font-size: 60rpx;
        }
      }
    }
    .integralType {
      margin: 100rpx 0 0 0;
      font-size: 22rpx;
      line-height: 38rpx;
    }
  }
  .moneyType {
    margin: 20rpx 0;
    padding: 30rpx 0;
    border: 1px solid #dfdfdf;
    border-radius: 10rpx;
    text-align: center;
    box-shadow: 0 6rpx 21rpx 0 rgba(85, 120, 228, 0.36);
    .titleType {
      margin-bottom: 20rpx;
    }
    .inputType {
      width: 50%;
      color: rgba(0, 0, 0, 1);
    }
  }
  .activeMoneyType {
    border: 1px solid #5473e4;
    color: #5473e4;
  }
  .paymentDivType {
    margin: 20rpx 0;
    .titleType {
      margin-bottom: 10rpx;
      font-size: 32rpx;
    }
    .iconImgType {
      width: 40rpx;
      height: 40rpx;
    }
  }
  .agreementDivType {
    text-align: center;
    font-size: 28rpx;
    span {
      cursor: pointer;
      color: #5473e4;
    }
  }
  .submitType {
    width: 100%;
    margin: 30rpx 0;
    border: 0;
    border-radius: 10rpx;
    background: -webkit-linear-gradient(
      left,
      #556fe3,
      #6fe3ff
    ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(
      right,
      #556fe3,
      #6fe3ff
    ); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(
      right,
      #556fe3,
      #6fe3ff
    ); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #556fe3, #6fe3ff);
    /* 标准的语法（必须放在最后） */
  }
  .dialogDivType {
    margin: 20rpx 0;
    text-align: center;
    .payMoneyType {
      margin: 10rpx 0;
      font-size: 70rpx;
      color: #0097ff;
    }
    .bonusPointsType {
      font-size: 24rpx;
    }
  }
  .van-popup {
    height: auto;
  }
}
</style>
