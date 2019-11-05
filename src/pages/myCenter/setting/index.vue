<template>
  <!-- 设置 -->
  <div class="settingDivType">
    <div :key="item.id" v-for="item in demoData">
      <van-cell
        v-if="userInfoFun.roleType !== item.roleType"
        @click="handlerClick(item)"
        :is-link="item.isLink"
      >
        <div slot="icon">
          <img class="iconImgType" :src="item.iconUrl">
        </div>
        <div slot="title">
          <div style="display: inline">&nbsp;&nbsp;&nbsp;{{item.title}}</div>
        </div>
      </van-cell>
    </div>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
import settingData from "./settingData";

export default {
  computed: {
    userInfoFun() {
      return this.$store.state.common.userInfo;
    }
  },
  data() {
    return {
      demoData: settingData.itemList
    };
  },
  methods: {
    handlerClick(val) {
      // console.log("跳转至", val);
      if (val.id === "key01-9") {
        this.loginOut(val);
      } else {
        wx.navigateTo({
          url: val.pathUrl
        });
      }
    },
    // 退出注销
    loginOut(val) {
      wx.clearStorage({
        success: res => {
          this.$toast.success("退出成功");
          wx.reLaunch({
            url: val.pathUrl
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.settingDivType {
  margin: 0 20rpx;
  .iconImgType {
    width: 40rpx;
    height: 40rpx;
  }
}
</style>
