<template>
  <!-- 企业信息 -->
  <div class="enterpriseInfoDivType">
    <van-cell
      :title="item.title"
      :value="companyInfoFun[item.varType]"
      v-for="item in demoData"
      :key="item.id"
      :is-link="item.isLink"
      @click="handlerClick(item)"
    ></van-cell>
      <!-- title-width="100rpx" -->

    <!-- 完成按钮 -->
    <div style="padding: 0 50rpx">
      <van-button custom-class="submitType" type="info" @click="handlerSubmit">完成</van-button>
    </div>
  </div>
</template>

<script>
import methods from "./methods";

import demoData from "./enterpriseInfoData";

export default {
  extends: methods,
  mounted() {
    this.getEnterpriseInfo();
  },
  computed: {
    companyInfoFun() {
      return this.$store.state.setting.companyInfo || {};
    }
  },
  data() {
    return {
      demoData
    };
  },
  methods: {
    handlerClick(val) {
      console.log("企业界面跳转", val);
      wx.navigateTo({
        url: val.pathUrl
      });
    },
    handlerSubmit() {
      // 返回前1页
      wx.navigateBack({
        delta: 1
      });
    }
  }
};
</script>

<style lang="less">
.enterpriseInfoDivType {
  margin: 0 20rpx;
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
}
</style>
