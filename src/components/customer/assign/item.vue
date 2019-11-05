<template>
  <div>
    <div class="customer-item" v-for="(item, index) in list" :key="index" @click.stop="toDetail(item)">
      <div class="item-left">
        <image src="/static/images/customers/fpt.png" class="left-image" v-show="item.custStatus=='D'" />
        <div class="left-content">
          <div class="name">{{item.customerName}}</div>
          <div class="mobile margin-bottom">
            <span>{{item.customerPhoneEncrypt}}</span>
            <span>{{item.customerProvince}} - {{item.customerCity}}</span>
          </div>
          <div class="line margin-bottom"></div>
          <div class="model margin-bottom">车型：{{item.brandName}} &nbsp; {{item.modelName}} &nbsp; {{item.custCarType}}
          </div>
          <div class="follow margin-bottom">跟进人：<span v-if="item.salesname">{{item.salesname}}</span></div>
          <div class="type">线索类型：<span v-if="item.customerType == 'T'">精准</span><span
              v-if="item.customerType == 'L'">普通</span></div>
        </div>
      </div>
      <div class="item-right">
        <image src="/static/images/customers/fp.png" class="right-image" v-show="item.custStatus=='D'" />
        <div class="right-bottom">
          <image src="/static/images/customers/phone.png" @click.stop="phone(item.customerPhone)" />
          <!-- <button open-type="contact" plain="true" hover-stop-propagation="true" @click.stop="weChat">
            <image src="/static/images/customers/wechat.png" />
          </button> -->
          <image :src="item.checked?'/static/images/customers/checked.png':'/static/images/customers/unchecked.png'"
            class="checked" @click.stop="checkBox(item, index)" />
        </div>
      </div>
    </div>
    <div class="checkAll" @click="checkBoxAll">
      全选
      <image :src="checkAll?'/static/images/customers/checked.png':'/static/images/customers/unchecked.png'"
        class="checked" />
    </div>
  </div>
</template>

<script>
  import store from "@/store";
  export default {
    props: ["list", "checkAll"],
    methods: {
      toDetail(item) {
        let url = "/pages/subcustomer/detail/main?custId=" + item.id
        wx.navigateTo({
          url
        })
      },
      checkBox(item, index) {
        var sum = 0;
        if (item.checked) {
          this.list[index].checked = false;
        } else {
          this.list[index].checked = true;
        }
        this.list.forEach((data, index) => {
          sum += data.checked
          if (this.list.length - 1 == index) {
            if (sum == this.list.length) {
              this.checkAll = true
            } else {
              this.checkAll = false;
            }
            this.$emit('checKOut', this.checkAll)
          }
        });
      },
      checkBoxAll() {
        if (this.checkAll) {
          this.checkAll = false;
          this.list.forEach((data) => {
            data.checked = false;
          })
        } else {
          this.checkAll = true
          this.list.forEach((data) => {
            data.checked = true;
          })
        }
        this.$emit('checKOut', this.checkAll)
      },
      phone(phone) {
        wx.makePhoneCall({
          phoneNumber: phone,
          success: (res) => {}
        })
      },
      weChat() {

      }
    }
  }

</script>

<style lang="less">
  .checkAll {
    display: flex;
    align-items: center;
    font-size: 25rpx;
    color: #454545;
    margin-left: 40rpx;
    margin-bottom: 46rpx;

    image {
      width: 50rpx;
      height: 50rpx;
      margin-left: 10rpx;
    }
  }



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
          margin-right: 36srpx;
        }

        .model {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap
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
      width: 300rpx;
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

        .checked {
          width: 50rpx;
          height: 50rpx;
          margin-left: 50rpx;
        }
      }
    }
  }

</style>
