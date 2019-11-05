<template>
  <!-- 修改密码 -->
  <div class="changePwdDivType">
    <van-field
      :value="form[item.varType]"
      :label="item.title"
      :type="item.type"
      :placeholder="item.placeholder"
      :error-message="errorMessage[item.varType]"
      :id="item.varType"
      v-for="item in demoData"
      :key="item.id"
      :use-button-slot="item.code"
      @change="onChange"
    >
      <div slot="left-icon">
        <!-- phone-o -->
        <img class="iconImgType" :src="item.iconUrl">
      </div>
      <van-button
        slot="button"
        size="small"
        type="info"
        round
        plain
        @click="onClick('getCode')"
      >{{btnTitle}}</van-button>
    </van-field>
    <!-- 安置插槽 -->
    <!-- 完成按钮 -->
    <div style="padding: 0 50rpx">
      <van-button custom-class="submitType" type="info" @click="onClick">完成</van-button>
    </div>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
import changePwdData from "./changePwdData";

import verify from "@/utils/verify";

export default {
  extends: verify,
  mounted() {
    this.userInfo = this.$store.state.common.userInfo;
    this.form.mobile = this.userInfo.mobile;
  },
  data() {
    return {
      inputValue: "",
      demoData: changePwdData,
      userInfo: null,
      form: {
        password: null,
        password2: null,
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
      // // 获取验证码
      // // 启动倒计时
      // // isCountdown防止误操作，控制倒计时
      if (this.isCountdown) {
        this.isCountdown = false;
        // console.log("getLoginMsg", this.form);
        // 获取修改密码验证码
        this.$myApi.setting.getModifyPwdCode().then(res => {
          // 提示信息
          if (res.code === 200) {
            this.$toast.success("发送成功");
          } else {
            this.$toast.fail("发送失败");
          }
        });
        // 启动倒计时
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
        // 启动倒计时 --止
      }
    },
    onChange(val) {
      const {
        currentTarget: { id },
        mp: { detail }
      } = val;
      this.form[id] = detail;
      // this.isSame(this.form)
      this.isemptyStr(detail);
      if (id === "password2") {
        this.isSame(this.form);
      }

      // 设置错误数据
      this.setMap(id, this.errorStr);
      // 设置错误信息
      this.errorMessage = this.setError();
    },
    handlerSubmit() {
      // 确认密码一致，手机正确，表单不为空，
      if (this.notEmpty(this.form)) {
        if (this.isSame(this.form)) {
          // console.log("通过");
          this.$myApi.setting.changePwd(this.form).then(res => {
            if (res.code === 200) {
              this.$toast.success("修改成功");
              // 返回前1页，延时1秒
              this.$goBackOne();
            } else {
              this.$toast.fail("修改失败");
            }
            this.form = {
              password: null,
              password2: null,
              msgCode: null,
              mobile: null
            };
          });
        } else {
          // 设置数据
          this.setMap("password2", "密码不一致");
          // 设置错误信息
          this.errorMessage = this.setError();
        }
      } else {
        // 错误显示
        this.errorMessage = this.setError();
      }
    },
    onClick(val) {
      // 统一验证手机号
      // 验证手机
      if (this.isMobile(this.form)) {
        // 判断是否是注册时的手机号
        if (this.userInfo.mobile !== this.form.mobile) {
          // 设置数据
          this.setMap("mobile", "请输入注册的手机号");
          // 设置错误信息
          this.errorMessage = this.setError();
        } else {
          if (val === "getCode") {
            // 获取验证码
            this.getCode();
          } else {
            // 访问修改密码，已验证手机
            this.handlerSubmit();
          }
        }
      } else {
        // 设置数据
        this.setMap("mobile", "请输入正确的手机号");
        // 设置错误信息
        this.errorMessage = this.setError();
      }
    }
  }
};
</script>

<style lang="less">
.changePwdDivType {
  margin: 0 34rpx;
  text-align: left;
  .iconImgType {
    width: 38rpx;
    height: 42rpx;
    margin-right: 14rpx;
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
