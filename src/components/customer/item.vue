<template>
  <div class="customer-item" @click.stop="toDetail">
    <div class="item-left">
      <image src="/static/images/customers/fpt.png" class="left-image" v-show="item.custStatus=='D'" />
      <image :src="item.isOverTime==='0'?'/static/images/customers/djt.png':'/static/images/customers/cst.png'"
        class="left-image" v-show="item.custStatus=='N'" />
      <image :src="item.isOverTime==='0'?'/static/images/customers/gjt.png':'/static/images/customers/cst.png'"
        class="left-image"
        v-show="(item.custStatus=='H' || item.custStatus=='A' || item.custStatus=='B' || item.custStatus=='C') && item.trackingStatus !== 'Q' " />
      <image :src="item.isOverTime==='0'?'/static/images/customers/ddt.png':'/static/images/customers/cst.png'"
        class="left-image" v-show="item.trackingStatus==='Q'" />
      <image src="/static/images/customers/cjt.png" class="left-image" v-show="item.custStatus=='O'" />
      <image src="/static/images/customers/zbt.png" class="left-image" v-show="item.custStatus=='L'" />
      <image src="/static/images/customers/wxt.png" class="left-image" v-show="item.custStatus=='F'" />
      <div class="left-content">
        <div class="name">{{item.customerName}}</div>
        <div class="mobile margin-bottom">
          <span>{{item.customerPhoneEncrypt}}</span>
          <span>{{item.customerProvince}} - {{item.customerCity}}</span>
        </div>
        <div class="line margin-bottom"></div>
        <div class="model margin-bottom">车型：{{item.brandName}}&nbsp;&nbsp;{{item.modelName}} &nbsp;&nbsp;
          {{item.custCarType}}</div>
        <div class="follow margin-bottom">跟进人：<span v-if="item.salesname">{{item.salesname}}</span></div>
        <div class="type">线索类型：<span v-if="item.customerType == 'T'">精准</span><span
            v-if="item.customerType == 'L'">普通</span></div>
      </div>
    </div>
    <div class="item-right">
      <image src="/static/images/customers/fp.png" class="right-image" v-show="item.custStatus=='D'" />
      <image :src="item.isOverTime==='0'?'/static/images/customers/dj.png':'/static/images/customers/cs.png'"
        class="right-image" v-show="item.custStatus=='N'" />
      <image :src="item.isOverTime==='0'?'/static/images/customers/gj.png':'/static/images/customers/cs.png'"
        class="right-image"
        v-show="(item.custStatus=='H' || item.custStatus=='A' || item.custStatus=='B' || item.custStatus=='C') && item.trackingStatus !== 'Q'" />
      <image :src="item.isOverTime==='0'?'/static/images/customers/dd.png':'/static/images/customers/cs.png'"
        class="right-image" v-show="item.trackingStatus==='Q'" />
      <image src="/static/images/customers/cj.png" class="right-image" v-show="item.custStatus==='O'" />
      <image src="/static/images/customers/zb.png" class="right-image" v-show="item.custStatus=='L'" />
      <image src="/static/images/customers/wx.png" class="right-image" v-show="item.custStatus=='F'" />
      <div class="right-bottom">
        <image src="/static/images/customers/phone.png" @click.stop="phone(item.customerPhone)" />
       
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'prefix'],
    data() {
      return {
        isShow: true
      }
    },
    methods: {
      toDetail() {
        let url = "/pages/subcustomer/detail/main?custId=" + this.item.id
        wx.navigateTo({
          url
        })
      },
      phone(phone) {
        wx.makePhoneCall({
          phoneNumber: phone,
          success: (res) => {}
        })
      },
      weChat() {}
    },
  }

</script>

<style lang="less">
  .customer-item {
    height: 323rpx;
    box-sizing: border-box;
    box-shadow: 4rpx 4rpx 10rpx #333333;
    border-radius: 24rpx;
    display: flex;
    position: relative;
    justify-content: space-between;
    padding: 22rpx;
    margin-bottom: 30rpx;

    .item-left {
      font-size: 25rpx;
      color: #454545;
      width: 100%;
      flex: 1 100%;

      .left-content {
        margin-left: 18rpx;

        span {
          margin-right: 51rpx;
        }

        .name {
          font-size: 32rpx;
          color: #010101;
          font-weight: bold;
          margin: 20rpx 0;
        }

        .margin-bottom {
          margin-bottom: 15rpx;
        }

        .model {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 225px;
        }

        .mobile {
          font-size: 26rpx;
          color: #454545;
        }

        .line {
          width: 301rpx;
          border: 1rpx solid #e5e5e5;
          margin-bottom: 20rpx;
        }
      }

      .left-image {
        position: absolute;
        height: 323rpx;
        width: 30rpx;
        top: 0px;
        left: 0px;
      }
    }

    .item-right {
      width: 200rpx;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;



      .right-image {
        width: 165rpx;
        height: 165rpx;
      }

      .right-bottom {
        display: flex;
        align-items: center;

        button {
          padding: 0;
          margin: 0;
          width: 40px;
          height: 40px;
          border: none;
          padding: 0;
          margin-left: 10px;
        }
        image {
          width: 80rpx;
          height: 80rpx;
        }
      }
    }
  }

</style>
