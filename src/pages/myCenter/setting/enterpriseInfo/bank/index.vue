<template>
  <!-- 银行 -->
  <div class="bankDivType">
    <van-field
      :label="item.title"
      :placeholder="item.placeholder"
      :type="item.type"
      v-for="item in demoData"
      :id="item.varType"
      :key="item.id"
      :error-message="errorMsg[item.varType]"
      @change="onChange"
      required
    />

    <!-- 完成按钮 -->
    <div style="padding: 0 50rpx">
      <van-button custom-class="submitType" type="info" @click="handlerSubmit">保存</van-button>
    </div>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
import methods from "../methods";
import verify from "@/utils/verify";

import bankData from "./bankData";

export default {
  mixins: [methods, verify],
  data() {
    return {
      // 修改企业银行账户信息，传入参数：头部传入token,bankName开户行名称（银行名），bankAccount账户名，bankCardNo账户号（卡号）
      demoData: bankData,
      form: {
        bankName: null,
        bankAccount: null,
        bankCardNo: null
      },
      errorMsg: {}
    };
  },
  methods: {
    onChange(val) {
      // 输入框，数据
      const {
        currentTarget: { id },
        mp: { detail }
      } = val;
      this.form[id] = detail;
      // 验证是否为空，单项
      this.isemptyStr(detail);
      // 设置错误信息，单项
      this.setMap(id, this.errorStr);
      // 获取错误信息
      this.errorMsg = this.setError();
    },
    handlerSubmit() {
      // console.log("保存", this.form);
      // 判断表单是否为空
      if (this.notEmpty(this.form)) {
        this.$myApi.setting.setCompanyBank(this.form).then(res => {
          if (res.code === 200) {
            this.getEnterpriseInfo();
            this.$toast.success(res.msg);
            // 返回前1页，延时1秒
            this.$goBackOne();
          } else {
            this.$toast.fail(res.msg);
          }
        });
      } else {
        this.errorMsg = this.setError();
      }
    }
  }
};
</script>

<style lang="less">
.bankDivType {
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
