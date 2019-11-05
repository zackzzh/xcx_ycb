<template>
  <!-- 完善信息 --未做表单认证-- -->
  <div class="telephoneDivType">
    <van-field
      :label="item.title"
      :placeholder="item.placeholder"
      :required="item.required"
      v-for="item in demoData"
      :id="item.varType"
      :key="item.id"
      :error-message="errorMessage[item.varType]"
      @change="onChange"
    ></van-field>

    <!-- 完成按钮 -->
    <div style="padding: 0 50rpx">
      <van-button custom-class="submitType" type="info" @click="handlerSubmit">提交</van-button>
    </div>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
import joinData from "./joinData";
import verify from "@/utils/verify"; // 表单验证

export default {
  extends: verify,
  data() {
    return {
      demoData: joinData,
      btnTitle: "获取验证码",
      // 管理员手动添加销售人员接口，传入参数：mobile手机号，username姓名
      form: {
        mobile: null,
        username: null
      },
      errorMessage: {}
    };
  },
  methods: {
    onChange(val) {
      // console.log("onChange", val);
      const {
        currentTarget: { id },
        mp: { detail }
      } = val;
      this.form[id] = detail;
      // 判断是否为空
      this.isemptyStr(detail);
      // 设置错误信息，单条
      this.setMap(id, this.errorStr);
      // 获取错误信息
      this.errorMessage = this.setError();
    },
    handlerSubmit() {
      // 判断是否为空
      if (this.notEmpty(this.form)) {
        // 验证手机号
        if (this.isMobile(this.form)) {
          this.$myApi.setting.addSalesByAdmin(this.form).then(res => {
            if (res.code === 200) {
              this.$toast.success(res.msg);
              // 返回前1页，延时1秒
              this.$goBackOne(2);
            } else {
              this.$toast.fail(res.msg);
            }
          });
        } else {
          // 设置错误信息，单条
          this.setMap("mobile", "请输入正确的手机号");
          // 获取错误信息
          this.errorMessage = this.setError();
        }
      } else {
        // 获取错误信息
        this.errorMessage = this.setError();
      }
    }
  }
};
</script>

<style lang="less">
.telephoneDivType {
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
