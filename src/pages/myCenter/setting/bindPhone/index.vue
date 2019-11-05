<template>
  <!-- 绑定手机 -->
  <div class="bindPhoneDivType">
    <van-field
      :value="value"
      :label="item.title"
      :placeholder="item.placeholder"
      v-for="item in demoData"
      :id="item.varType"
      :key="item.id"
      :use-button-slot="item.code"
      :error-message="errorMessage[item.varType]"
      @change="onChange"
    >
      <van-button slot="button" size="small" type="info" round plain @click="getCode">{{btnTitle}}</van-button>
    </van-field>

    <!-- 完成按钮 -->
    <div style="padding: 0 50rpx">
      <van-button custom-class="submitType" type="info" @click="handlerSubmit">完成</van-button>
    </div>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
import verify from "@/utils/verify";

import bindPhoneData from "./bindPhoneData";

export default {
  extends: verify,
  data() {
    return {
      demoData: bindPhoneData,
      form: {
        msgCode: null,
        mobile: null
      },
      errorMessage: {},
      value: "",
      isCountdown: true, //控制验证码倒计时
      btnTitle: "获取验证码"
    };
  },
  methods: {
    getCode() {
      // 启动倒计时
      // isCountdown防止误操作，控制倒计时
      // console.log("获取验证码");
      if (this.isMobile(this.form)) {
        if (this.isCountdown) {
          // 获取绑定手机验证码
          this.$myApi.setting.getBoundCode(this.form).then(res => {
            if (res.code === 200) {
              this.$toast.success(res.msg);
            } else {
              this.$toast.fail(res.msg);
            }
          });

          // 启动倒计时 --起--
          this.isCountdown = false;
          let times = 60;
          this.btnTitle = times + " 秒";
          const countdown = setInterval(() => {
            times -= 1;
            this.btnTitle = times + " 秒";
            if (times === 0 || this.isCountdown) {
              clearInterval(countdown);
              this.btnTitle = "获取验证码";
              this.isCountdown = true;
            }
          }, 1000);
          // 启动倒计时 --止--
        }
      } else {
        this.setMap("mobile", "请输入正确的手机号");
        this.errorMessage = this.setError();
        // console.log("请输入正确的手机号", this.errorMessage);
      }
    },
    onChange(val) {
      // console.log("改变", val);
      const {
        currentTarget: { id },
        mp: { detail }
      } = val;
      this.form[id] = detail;

      this.isemptyStr(detail);
      this.setMap(id, this.errorStr);
      this.errorMessage = this.setError();
    },
    handlerSubmit() {
      // 验证是否为空
      if (this.notEmpty(this.form)) {
        // 验证手机号
        if (this.isMobile(this.form)) {
          this.$myApi.setting.setBoundPhone(this.form).then(res => {
            if (res.code === 200) {
              this.$toast.success(res.msg);
              this.clearMap();
              // 修改成功，1秒后，跳转至登录页
              setTimeout(() => {
                wx.reLaunch({
                  url: "/pages/start/main"
                });
              }, 1000);
            } else {
              this.$toast.fail(res.msg);
            }
          });
        } else {
          this.setMap("mobile", "请输入正确的手机号");
          this.errorMessage = this.setError();
          // console.log("请输入正确的手机号", this.errorMessage);
        }
      } else {
        this.errorMessage = this.setError();
      }
    }
  }
};
</script>

<style lang="less">
.bindPhoneDivType {
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
