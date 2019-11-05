<template>
  <!-- 用户协议 -->
  <div class="agreementDivType">
    <div v-html="agreement"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    // 获取协议
    this.$myApi.setting.getAgreement().then(res => {
      if (res.code) {
        this.agreement = res.protocolInfo.content;
      }
    });
  },
  data() {
    return {
      agreement: null
    };
  }
};
</script>

<style scoped lang="less">
.agreementDivType {
  margin: 0 10rpx;
}
</style>
