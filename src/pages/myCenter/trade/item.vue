<template>
  <div class="tradeDivType-item">
    <div class="item-top">
      <div class="top-left">
        <van-icon name="description" />
        <span>订单号：{{item.orderno}}</span>
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
    <div class="item-mid">
      <div class="mid-time">成交时间：{{item.createtime}}</div>
      <div class="mid-service" v-if="item.lBrandId || item.tModelId">服务类型：<span v-if="item.lBrandId">L型线索 </span><span
          v-if="item.tModelId"> T型线索</span></div>
      <div class="mid-service" v-if="item.rechargeAmount">充值类型：
        <span v-if="item.paymentType==='1'">线下支付</span>
        <span v-if="item.paymentType==='2'">微信</span>
        <span v-if="item.paymentType==='3'">支付宝</span>
        <span v-if="item.paymentType==='4'">其他</span>
      </div>
    </div>
    <div class="item-bottom">
      <div class="bottom-left" v-if="item.rechargeAmount">实付款：<span>{{item.rechargeAmount}}元</span></div>
      <div class="bottom-left" v-else>实付款：<span>{{item.paymentPrice}}元</span></div>
      <div class="bottom-right">
        <van-button plain v-if="item.status==='D'" @click="cancel">取消订单</van-button>
        <van-button type="info" @click="toDetail">查看详情</van-button>
        <van-button custom-class="upButton" v-if="item.status==='D'" @click="upLoad">上传凭证</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'active'],
    methods: {
      toDetail() {
        let url = "/pages/myCenter/trade/details/main?orderno=" + this.item.orderno + '&index=' + this.active
        wx.navigateTo({
          url
        })
      },
      cancel() {
        this.$myApi.trade.cancelOrder({
            orderno: this.item.orderno
          })
          .then((res) => {
            if (res.code === 200) {
              this.$emit('cancel', res)
            }
          })
      },
      upLoad() {
        let url = "/pages/customer/invoice/main?orderno=" + this.item.orderno + '&index=' + this.active
        wx.navigateTo({
          url
        })
      }
    }
  }

</script>

<style lang="less">
  .tradeDivType-item {
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    font-size: 28rpx;
    box-shadow: 2px 2px 10px #999;
    background: #fff;
    .item-top {
      padding: 0px 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70rpx;
      border-bottom: 1px solid #EEEEEE;
      color: #0081FF;
      .top-left {
        display: flex;
        align-items: center;
        .van-icon {
          position: relative;
          top: 2px;
          color: #0081FF;
        }
        span {
          margin-left: 20rpx;
          color: #BCBCBC;
          font-size: 26rpx;
        }
      }
    }

    .item-mid {
      padding: 20rpx;
      color: #8E8E8E;
      font-size: 24rpx;
      border-bottom: 1px solid #EDEDED;

      .mid-time {
        margin-bottom: 20rpx;
      }
    }

    .item-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx;

      .bottom-left {
        font-size: 24rpx;
        color: #BCBCBC;

        span {
          color: #EC7E33;
        }
      }

      .bottom-right {
        .van-button {
          padding: 0rpx;
          margin: 0rpx;
          width: 148rpx;
          height: 60rpx;
          text-align: center;
          line-height: 60rpx;
          font-size: 22rpx;
          margin-left: 20rpx;
        }

        .detail {
          background: #0080FF !important;
          color: #fff !important;
        }

        .upButton {
          background: #AAAAAA;
          color: #fff;
        }
      }
    }
  }

</style>
