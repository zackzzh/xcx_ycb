<template>
  <!-- 联系客服 -->
  <div class="customerSerDivType">
    <!-- 头部图片 -->
    <div class="imgDivType">
      <img class="imgType" :src="demoData.imgUrl">
    </div>
    <!-- 图标 -->
    <div class="iconDivType">
      <div v-for="item in demoData.list" :key="item.id" @click="handlerIcon(item)">
        <img class="iconType" :src="item.iconUrl">
        <div class="titleType">{{item.title}}</div>
      </div>
      <div>
        <button open-type="contact" plain="true" hover-stop-propagation @click.stop="weChat">
          <image class="iconType" src="/static/images/myCenter/setting/customerSer/wechat.png" />
        </button>
        <div class="titleType">微信咨询</div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="bottomType">咨询时间：9:00 - 20:00</div>
    <!-- 弹窗 -->
    <van-dialog title="提示" use-slot async-close :confirmButtonText="confirmText" :show="isShowDialog" show-cancel-button
      @cancel="dialogClose" @confirm="dialogConfirm">
      <div v-if="qqWechatPhone === 3" class="contentDivType">
        <div class="titleType">{{dialogData.title}}</div>
        <div class="phoneNumType" v-if="data && data.qqCode">
          {{data.telephone}}
          <!-- <span>{{dialogData.btnTitle}}</span> -->
        </div>
      </div>
      <div v-else class="codeDivType">
        <img v-if="data && data.qqCode" :src="qqWechatPhone === 2?data.wechatCode:data.qqCode">
        <div v-if="data && data.qqCode">
          {{codeTitle}}&nbsp;&nbsp;&nbsp;{{qqWechatPhone === 2?data.wechatNumber:data.qqNumber}}</div>
      </div>
    </van-dialog>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import customerSerData from "./customerSerData";

  export default {
    mounted() {
      this.$myApi.setting.getService().then(res => {
        // console.log("联系客服成功", res);
        if (res.code === 200) {
          this.data = res.serviceInfo;
        }
      });
    },
    data() {
      return {
        data: {},
        demoData: customerSerData,
        isShowDialog: false,
        confirmText: "确认",
        isPhone: false,
        isWechat: false,
        isQq: false,
        qqWechatPhone: 0,
        codeTitle: "微信号",
        dialogData: customerSerData.contentPhone
      };
    },
    methods: {
      handlerIcon(val) {
        this.isShowDialog = true;
        if (val.id === "key01-1") {
          // QQ
          this.qqWechatPhone = 1;
          this.codeTitle = "QQ号";
          this.confirmText = "确认";
        } else if (val.id === "key01-3") {
          // 电话
          this.qqWechatPhone = 3;
          this.confirmText = "确认呼叫";
        }
      },
      weChat() {

      },
      dialogClose() {
        this.isShowDialog = false;
        // console.log("关闭dialogClose");
      },
      dialogConfirm() {
        this.dialogClose();
        // console.log("dialog确认");
        if (this.qqWechatPhone === 3) {
          // 电话
          wx.makePhoneCall({
            phoneNumber: this.data.telephone,
            success: () => {},
            fail: () => {
              this.$toast.fail("呼叫失败");
            }
          });
        }
      }
    }
  };

</script>

<style lang="less">
  .customerSerDivType {
    .imgDivType {
      margin: 0 50rpx;

      .imgType {
        width: 100%;
        height: 310rpx;
      }
    }

    .iconDivType {
      margin: 50rpx 0 30rpx 0;
      text-align: center;
      display: flex;
      justify-content: space-around;

      button {
        padding: 0;
        margin: 0;
        width: 40px;
        height: 40px;
        border: none;
        padding: 0;
        margin-left: 10px;
      }

      .iconType {
        width: 58rpx;
        height: 60rpx;
      }

      .titleType {
        font-size: 28rpx;
        color: #353b51;
      }
    }

    .van-popup {
      height: auto;
    }

    .contentDivType {
      margin: 30rpx 0;
      text-align: center;

      .titleType {
        margin-bottom: 20rpx;
        font-size: 38rpx;
        color: #3d3237;
      }

      .phoneNumType {
        font-size: 32rpx;
        color: #0079ff;

        span {
          margin-left: 30rpx;
          padding: 4rpx 14rpx;
          border-radius: 5rpx;
          font-size: 28rpx;
          color: #000000;
          background: rgba(94, 95, 95, 0.25);
        }
      }
    }

    .codeDivType {
      text-align: center;

      img {
        width: 320rpx;
        height: 320rpx;
        margin: 20rpx 0 0 0;
      }

      div {
        margin: 10rpx 0 20rpx 0;
      }
    }

    .bottomType {
      text-align: center;
      width: 100%;
      padding: 24rpx 0;
      font-size: 28rpx;
      color: rgba(0, 85, 130, 0.76);
      background: rgba(0, 125, 255, 0.46);
    }
  }

</style>
