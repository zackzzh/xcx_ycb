<template>
  <!-- 支付方式 -->
  <div class="paymentDivType">
    <div class="titleType">支付方式</div>
    <van-radio-group :value="radioVal" @change="radioChange">
      <van-cell-group>
        <van-cell
          clickable
          :data-name="index"
          v-for="(item,index) in payType"
          :key="item.id"
          @click="radioClick(index)"
        >
          <van-radio :name="index"/>
          <div slot="icon">
            <img class="iconImgType" :src="item.iconUrl">
          </div>
          <div slot="title">&nbsp;&nbsp;{{item.title}}</div>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script>
export default {
  props: ["payType", "radioVal"],
  methods: {
    radioChange(val) {
      // 选择支付方式
      this.$emit("radioChange", val);
    },
    radioClick(val) {
      // 触发单元格支付方式
      this.$emit("radioClick", val);
    }
  }
};
</script>

<style scoped lang="less">
.paymentDivType {
  margin: 20rpx 0;
  .titleType {
    margin-bottom: 10rpx;
    font-size: 32rpx;
  }

  .iconImgType {
    width: 40rpx;
    height: 40rpx;
  }
}
</style>