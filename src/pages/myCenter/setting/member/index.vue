<template>
  <!-- 公司成员 -->
  <div class="memberDivType">
    <div class="headDivType">
      <div>
        <img class="logoType" :src="userInfo.picHead||demoData.logoUrl">
        <div class="companyType">{{userInfo.companyName}}</div>
      </div>
      <div class="iconType" @click="handlerIcon">
        <van-icon name="friends-o"/>
      </div>
    </div>
    <!-- 成员卡 -->
    <member-card :demoData="userList" @handlerRemove="handlerRemove"/>
    <!-- 弹窗 -->
    <van-popup custom-class="popupType" :show="isShowPopup" @close="onClose">
      <div class="popupDivType">
        <div class="titleType">{{title}}</div>
        <img class="imgType" :src="qrUrl">
        <div class="subtitleType">{{subtitle}}</div>
        <div class="contentType">{{content}}</div>
        <div class="joinDivType" @click="handlerJoin">管理员添加成员</div>
      </div>
    </van-popup>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
import memberCard from "./memberCard";

import memberData from "./memberData";

export default {
  components: {
    memberCard
  },
  mounted() {
    // 用户信息，公司名
    this.userInfo = this.$store.state.common.userInfo;
    // this.companyName = userInfo.companyName;
    // 获取成员信息
    this.getMemberList();
    this.isShowPopup = false;
  },
  data() {
    return {
      userInfo: {},
      demoData: memberData,
      userList: null,
      isShowPopup: false,
      title: "扫码加入",
      qrUrl: null,
      subtitle: "请让成员用微信扫描下方的二维码",
      content: "二维码仅能使用一次"
    };
  },
  methods: {
    getMemberList() {
      // 获取成员列表
      this.$myApi.setting.getMemberList().then(res => {
        if (res.code === 200) {
          this.userList = res.userList;
        }
      });
    },
    handlerIcon() {
      // 点击添加图标
      this.$myApi.setting.getAddSalesCode().then(res => {
        if (res.code === 200) {
          this.qrUrl = res.codeUrl;
        }
      });
      // 打开添加弹窗
      this.isShowPopup = true;
    },
    onClose() {
      // 关闭弹窗
      this.isShowPopup = false;
    },
    handlerRemove(val) {
      // console.log("移除成员", val);
      this.$myApi.setting.delSalesByAdmin(val).then(res => {
        if (res.code === 200) {
          this.$toast.success(res.msg);
          this.getMemberList();
        } else {
          this.$toast.fail(res.msg);
        }
      });
    },
    handlerJoin() {
      // 管理员添加成员
      this.onClose();
      wx.navigateTo({
        url: "/pages/myCenter/setting/member/join/main"
      });
    }
  }
};
</script>

<style lang="less">
.memberDivType {
  margin: 30rpx 30rpx 0 30rpx;
  .headDivType {
    display: flex;
    justify-content: space-between;
    .logoType {
      margin-right: 20rpx;
      width: 82rpx;
      height: 82rpx;
    }
    .companyType {
      display: inline-block;
      transform: translateY(-20rpx);
      font-size: 38rpx;
      color: #282828;
    }
    .iconType {
      transform: translateY(10rpx);
      font-size: 68rpx;
    }
  }
  .popupType {
    height: auto;
    border-radius: 20rpx;
    .popupDivType {
      text-align: center;
      .titleType {
        padding: 32rpx 0;
        font-size: 36rpx;
        font-weight: bold;
        border-bottom: 1rpx solid rgba(94, 95, 95, 0.41);
      }
      .imgType {
        margin: 20rpx 0;
        width: 300rpx;
        height: 300rpx;
      }
      .subtitleType {
        font-size: 30rpx;
        color: rgba(0, 0, 0, 0.8);
      }
      .contentType {
        margin: 36rpx 0 20rpx 0;
        font-size: 30rpx;
        color: rgba(0, 0, 0, 0.5);
      }

      .joinDivType {
        margin: 0 50rpx 50rpx 0;
        cursor: pointer;
        text-align: right;
        color: #00af00;
      }
    }
  }
}
</style>
