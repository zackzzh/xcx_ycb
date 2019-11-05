<template>
  <!-- 认证首页 -->
  <div class="authenticationDivType">
    <div class="titleDivType">
      完成认证
      <div class="lineDivType"></div>
    </div>
    <van-row gutter="25">
      <van-col span="12" v-for="item in demoData" :key="item.id">
        <div class="cardDivType">
          <img class="imgType" :src="item.imgUrl">
          <div class="titleType">{{item.title}}</div>
          <!-- 已认证 -->
          <div
            v-if="(item.id === 'key01-1'&& cerStatus.userCertStatus === '1') || (item.id === 'key01-2'&& cerStatus.companyCertStatus === '1')"
            class="authenticatedType"
          >
            <img class="iconType" :src="item.iconUrl">
          </div>
          <div v-else>
            <div class="subtitleType">{{item.subtitle}}</div>
            <!-- 审核中 -->
            <div
              class="btnDivType"
              v-if="(item.id === 'key01-1'&& cerStatus.userCertStatus === '3') || (item.id === 'key01-2'&& cerStatus.companyCertStatus === '3')"
            >审核中...</div>
            <!-- 认证失败 -->
            <div
              class="btnDivType"
              v-else-if="(item.id === 'key01-1'&& cerStatus.userCertStatus === '2') || (item.id === 'key01-2'&& cerStatus.companyCertStatus === '2')"
              @click="handlerScan(item)"
            >认证失败，重新扫描 ></div>
            <!-- 未认证 -->
            <div class="btnDivType" v-else @click="handlerScan(item)">前往扫描 ></div>
          </div>
        </div>
      </van-col>
    </van-row>
    <privilege :demoData="privilegeData"/>
  </div>
</template>

<script>
import privilege from "./privilege";

import authenticationData from "./authenticationData";

export default {
  components: {
    privilege
  },
  created() {},
  mounted() {
    // 认证状态
    this.$myApi.setting.getQueryCertStauts().then(res => {
      this.cerStatus = res;
    });
  },
  computed: {},
  data() {
    return {
      demoData: authenticationData.list,
      privilegeData: authenticationData.privilegeData,
      cerStatus: {}
    };
  },
  methods: {
    handlerScan(val) {
      // console.log("前往扫描", val);
      wx.navigateTo({
        url: val.pathUrl + "?key=" + val.id
      });
    }
  }
};
</script>

<style scoped lang="less">
.authenticationDivType {
  margin: 10rpx 50rpx 0 50rpx;
  text-align: center;
  .titleDivType {
    font-size: 36rpx;
    font-weight: bold;
    color: #333333;
    .lineDivType {
      margin: 10rpx 42% 40rpx;
      height: 6rpx;
      background: #6790f2;
    }
  }
  .cardDivType {
    padding-bottom: 20rpx;
    border-bottom: 10rpx solid #6990f2;
    box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.19);
    .imgType {
      width: 128rpx;
      height: 108rpx;
      margin: 50rpx;
    }
    .titleType {
      font-size: 30rpx;
      font-weight: bold;
      color: #333333;
    }
    .subtitleType {
      margin: 18rpx 0;
      font-size: 24rpx;
      font-weight: bold;
      color: #999999;
    }
    .btnDivType {
      cursor: pointer;
      font-size: 28rpx;
      font-weight: bold;
      color: #6990f2;
    }
    .authenticatedType {
      margin: 40rpx 0 6rpx 0;
      .iconType {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }
}
</style>
