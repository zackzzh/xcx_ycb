<template>
  <!-- 认证公共表单 -->
  <div class="commonDivType">
    <van-field
      :value="form[item.varType]"
      :label="item.title"
      :placeholder="item.placeholder"
      :required="item.required"
      :type="item.type"
      v-for="item in demoData"
      :id="item.varType"
      :key="item.id"
      :use-button-slot="item.code"
      :error-message="errorMessage[item.varType]"
      @change="onChange"
    ></van-field>
    <!-- 安置插槽 -->
    <div>
      <slot></slot>
    </div>
    <!-- 完成按钮 -->
    <div style="padding: 0 50rpx">
      <van-button custom-class="submitType" type="info" @click="handlerSubmit">完成</van-button>
    </div>
  </div>
</template>

<script>
import verify from "@/utils/verify";

export default {
  extends: verify,
  props: ["demoData", "form", "errorMessage"],
  data() {
    return {
      value: "",
      isCountdown: true, //控制验证码倒计时
      btnTitle: "获取验证码"
    };
  },
  methods: {
    onChange(val) {
      // 输入框改变时
      const {
        currentTarget: { id },
        mp: { detail }
      } = val;
      this.form[id] = detail;
      this.$emit("onChange", id, detail);

    },
    handlerSubmit() {
      // console.log("验证并提交");
      this.$emit("handlerForm", this.form);
    }
  }
};
</script>

<style lang="less">
.commonDivType {
  margin: 0 34rpx;
  text-align: left;
  .iconImgType {
    width: 38rpx;
    height: 42rpx;
    margin-right: 10rpx;
  }
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
