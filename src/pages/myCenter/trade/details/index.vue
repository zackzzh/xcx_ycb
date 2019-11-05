<template>
  <div class="detail">
    <!-- <div class="detail-top">
      <van-cell title="充值订单" is-link />
    </div> -->
    <div class="detail-order">
      <div class="item-top">
        <div class="top-left">
          <van-icon name="description" />
          <span>订单详情</span>
        </div>
        <div class="top-right">
          <span v-if="item.status==='P'">支付成功</span>
          <span v-if="item.status==='D'">待支付</span>
          <span v-if="item.status==='S'">交易成功</span>
          <span v-if="item.status==='T'">退货</span>
          <span v-if="item.status==='C'">已取消</span>
          <span v-if="item.status==='A'">上传支付凭证等待审核</span>
          <span v-if="item.status==='F'">支付失败</span>
        </div>
      </div>
      <van-cell-group>
        <van-cell title="订单编号：" :value="item.orderno" border="false" />
        <van-cell title="订单总价：" :value="item.totalPrice + '元'" border="false" v-if="item.totalPrice" />
        <van-cell title="充值金额：" :value="item.rechargeAmount + '元'" border="false" v-if="item.rechargeAmount" />
        <van-cell title="使用积分：" :value="item.usedPoints + '积分'" border="false" v-if="item.usedPoints" />
        <van-cell title="实际支付：" :value="item.paymentPrice" border="false" v-if="item.paymentPrice" />
        <van-cell title="L型线索：" :value="'品牌：' + item.lBrandName +' 型号：'+ item.lModelName" border="false" v-if="item.lModelId"
          :label="'城市：'+item.lCity+' 数量：'+ item.lNumber" />
        <van-cell title="T型线索：" :value="'品牌：' +  item.tBrandName + ' 型号：'+ item.tModelName" border="false" v-if="item.tModelId"
          :label="'城市：'+item.tCity+' 数量：'+ item.tNumber" />
      </van-cell-group>
    </div>
    <div class="detail-order">
      <van-cell-group>
        <van-cell title="下单时间：" :value="item.createtime" border="false" />
        <van-cell title="支付方式：" :value="paymentType" border="false" />
      </van-cell-group>
    </div>
    <div class="detail-button" v-if="item.status==='D'">
      <van-button round="true" @click="upLoad">上传凭证</van-button>
      <van-button round="true" @click="cancel" custom-class="cancel">取消订单</van-button>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        item: {},
        service: '',
        serviceTitle: '',
        paymentType: '',
        index: null,
      }
    },
    onLoad: function (options) {
      this.index = options.index;
      this.queryOrderDetail({
        orderno: options.orderno
      })
    },
    methods: {
      queryOrderDetail(data) {
        this.$myApi.trade.queryOrderDetail(data)
          .then((res) => {
            this.item = res.orderInfo
            switch (res.orderInfo.paymentType) {
              case 0:
                this.paymentType = '余额'
                break;
              case 1:
                this.paymentType = '线下支付'
                break;
              case 2:
                this.paymentType = '微信'
                break;
              case 3:
                this.paymentType = '支付宝'
                break;
              default:
                this.paymentType = '其他'
                break;
            }
          })
      },
      cancel() {
        this.$myApi.trade.cancelOrder({
            orderno: this.item.orderno
          })
          .then((res) => {
            if (res.code === 200) {
              wx.navigateBack({
                success: () => {
                  this.$toast.success(res.msg);
                }
              })
            }
          })
      },
      upLoad() {
        let url = "/pages/customer/invoice/main?orderno=" + this.item.orderno + '&index=' + this.index
        wx.navigateTo({
          url
        })
      }
    }
  }

</script>

<style lang="less">
  .detail {
    background: #FAFAFA;

    .van-cell__title,
    .van-cell__value {
      flex: 1 20% !important;
    }

    .van-cell__value {
      flex: 1 75% !important;
    }

    .detail-top {
      margin: 20rpx;



      .van-cell {
        border: 1px solid #e5e5e5;
        border-radius: 5px;
        padding-left: 76rpx;
        box-shadow: #666 0px 0px 5px;

        &::before {
          position: absolute;
          top: 30%;
          left: 8%;
          content: '';
          width: 0px;
          height: 30%;
          border: 2px solid #F69D35;
        }
      }
    }

    .detail-order {
      margin: 20rpx;
      padding: 0px 30rpx;
      box-shadow: #666 0px 0px 5px;
      background: #fff;
      border-radius: 5px;

      .item-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 80rpx;
        border-bottom: 1px solid #C6C6C6;
        color: #000000;
        font-size: 24rpx;

        .top-left {
          display: flex;
          align-items: center;
          font-size: 36rpx;

          .van-icon {
            position: relative;
            top: 2px;
            color: #0081FF;
          }

          span {
            margin-left: 20rpx;
          }
        }

        .top-right {
          padding: 0px 10px;
          height: 38rpx;
          text-align: center;
          line-height: 38rpx;
          color: #fff;
          font-size: 26rpx;
          border-radius: 25px 0 0 25px;
          background: #00D5C5;
        }
      }

      .van-cell {
        padding: 10px 0px;
      }
    }

    .detail-button {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      margin-top: 80rpx;
      margin-bottom: 40px;

      .van-button {
        font-size: 28rpx;
        width: 650rpx;
        border-radius: 10rpx;
        background: linear-gradient(to right, #556FE3, #7ABCF3);
        color: #fff;
      }

      .cancel {
        margin-top: 10px;
        background: linear-gradient(to right, #BC7FFF, #D3C8FF);
      }
    }
  }

</style>
