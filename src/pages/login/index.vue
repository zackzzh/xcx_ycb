<template>
  <!-- 登录页 -登录-注册- -->
  <div class="loginMainDivType">
    <!-- <web-view src="https://mp.weixin.qq.com/"></web-view> -->
    <div class="otherBtnType">
      <van-row>
        <van-col offset="6" span="4">
          <div @click="goToSms" :class="{activeBtnType:!demoData.agreement}">
            <img v-if="!demoData.agreement" src="/static/images/login/01.png">
            <div v-else>登录</div>
            <div class="lineDivType"></div>
          </div>
        </van-col>
        <van-col offset="4" span="4">
          <div @click="goToRegister" :class="{activeBtnType:demoData.agreement}">
            <img v-if="demoData.agreement" src="/static/images/login/02.png">
            <div v-else>注册</div>
            <div class="lineDivType"></div>
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 输入框 -->
    <van-field
      input-class="inputType"
      :value="form[item.varType]"
      :type="item.type"
      v-for="(item,index) of demoData.list"
      :id="item.varType"
      :key="item.id"
      :focus="index === 0"
      :placeholder="item.placeholder"
      :required="item.required"
      :use-button-slot="item.code"
      :error-message="errorMessage[item.varType]"
      @input="handlerChange"
    >
      <van-button slot="button" size="small" type="info" round plain @click="getCode">{{btnTitle}}</van-button>
    </van-field>

    <!-- 切换登录页 -->
    <div class="loginBtnDivType" v-if="!demoData.agreement">
      <div @click="goToSms" v-if="!demoData.other">短信登录</div>
      <div @click="goToPassword" v-if="demoData.other">密码登录</div>
    </div>
    <div v-if="demoData.agreement" class="agreementDivType">
      点击确认即同意
      <span @click="toAgreement">《用户使用协议》</span>
    </div>
    <van-button custom-class="submitType" type="info" round @click="handlerSubmit">确认</van-button>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
import loginData from "./loginData"; // 基础数据

import verify from "@/utils/verify"; // 表单验证

export default {
  // 手机验证等验证
  extends: verify,
  mounted() {
    this.demoData = loginData.smsLogin;
    wx.setNavigationBarTitle({
      title: "登录"
    });
  },
  data() {
    return {
      loginData,
      demoData: loginData.smsLogin,
      // mobile手机号，password密码，username姓名，companyName企业名称，msgCode短信验证码
      form: {
        msgCode: null,
        mobile: null
      },
      errorMessage: {}, // 错误信息
      btnTitle: "获取验证码",
      isCountdown: true, //控制验证码倒计时
      isActive: true
    };
  },
  methods: {
    getCode() {
      // 启动倒计时，获取验证码
      // isCountdown防止误操作，控制倒计时
      if (this.isMobile(this.form)) {
        // 验证手机号
        if (this.isCountdown) {
          let getCode;
          if (this.demoData.agreement) {
            // 访问后端获取注册验证码
            getCode = this.$myApi.login.getRegisterCode(this.form);
          } else {
            // 访问后端获取登录验证码
            getCode = this.$myApi.login.getLoginCode(this.form);
          }
          // 访问后端后，获取的数据
          getCode.then(res => {
            if (res.code === 200) {
              this.$toast.success(res.msg);
            } else {
              this.$toast.fail(res.msg);
            }
          });
          // 倒计时 --起--
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
          // 倒计时 --止--
        }
      } else {
        // 设置数据
        this.setMap("mobile", "请输入正确的手机号");
        // 设置错误信息
        this.errorMessage = this.setError();
      }
    },
    handlerChange(val) {
      // 获取单个input数据
      const {
        currentTarget: { id },
        mp: { detail }
      } = val;
      // 动态添加内容
      this.form[id] = detail;
      // 验证是否为空
      this.isemptyStr(detail);
      // 判断是否一样
      if (id === "password2") {
        this.isSame(this.form);
      }

      // 设置错误数据
      this.setMap(id, this.errorStr);
      // 设置错误信息
      this.errorMessage = this.setError();
    },
    handlerSubmit() {
      // 获取表单数据访问后端
      // mobile手机号，password密码，username姓名，companyName企业名称，msgCode短信验证码
      this.isCountdown = true;
      // // 判断是否不为空
      if (this.notEmpty(this.form)) {
        if (this.isMobile(this.form)) {
          let toLogin;
          if (this.demoData.other) {
            // 验证码登录
            toLogin = this.$myApi.login.loginMsg(this.form);
          } else if (this.demoData.passwordLogin) {
            // 密码登录
            toLogin = this.$myApi.login.loginPwd(this.form);
          } else if (this.demoData.agreement) {
            if (this.isSame(this.form)) {
              // 注册&登录
              toLogin = this.$myApi.login.register(this.form);
            } else {
              // 设置数据
              this.setMap("password2", this.errorStr);
              // 设置错误信息
              this.errorMessage = this.setError();
            }
          }
          toLogin.then(res => {
            // console.log("登录成功跳转", res);
            if (res.code === 200) {
              this.$toast.success("登录成功！");
              this.form = {};
              wx.setStorage({
                key: "token",
                data: res,
                success: () => {}
              });
              // 查询用户是否已授权
              this.$myApi.login.isOauth().then(res => {
                if (res.code === 200) {
                  wx.switchTab({
                    url: "/pages/customer/main"
                  });
                } else {
                  // 微信登录
                  wx.login({
                    success: res => {
                      // 访问后端授权
                      this.$myApi.login.getWxOpenid(res.code).then(res => {
                        if (res.code === 200) {
                          wx.switchTab({
                            url: "/pages/customer/main"
                          });
                        }
                      });
                    }
                  });
                }
              });
            } else {
              this.$toast.fail(res.msg);
            }
          });
        } else {
          // 设置数据
          this.setMap("mobile", "请输入正确的手机号");
          // 设置错误信息
          this.errorMessage = this.setError();
        }
      } else {
        // 错误信息
        // Map转为对象
        this.errorMessage = this.setError();
      }
    },

    goToPassword() {
      // 去密码登录
      this.resetData("登录");
      this.form = {
        password: null,
        mobile: null
      };
      this.demoData = loginData.passwordLogin;
    },
    goToSms() {
      // 去短信登录
      this.resetData("登录");
      this.form = {
        msgCode: null,
        mobile: null
      };
      this.demoData = loginData.smsLogin;
    },
    goToRegister() {
      // 去注册
      this.resetData("注册");
      this.form = {
        companyName: null,
        username: null,
        password: null,
        password2: null,
        msgCode: null,
        mobile: null
      };
      this.demoData = loginData.register;
    },
    toAgreement() {
      // 去用户协议
      wx.navigateTo({
        url: "/pages/myCenter/setting/agreement/main"
      });
    },
    resetData(val) {
      // 重置数据
      this.isCountdown = true;
      this.clearMap();
      // 设置错误信息
      this.errorMessage = {};
      // 设置顶部标题
      wx.setNavigationBarTitle({
        title: val
      });
    }
  }
};
</script>

<style lang="less">
.loginMainDivType {
  position: relative;
  margin: 26% 15% 0 15%;
  text-align: center;

  .otherBtnType {
    margin-bottom: 50rpx;

    .activeBtnType {
      // 选中线性渐变参数
      padding-bottom: 16rpx;
      img {
        width: 100%;
        height: 38rpx;
      }
      .lineDivType {
        margin: 16rpx 6%;
        height: 6rpx;
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
  }
  .inputType {
    margin: 14rpx 0 5rpx 0;
    font-size: 30rpx;
  }
  .loginBtnDivType {
    width: 26%;
    margin: 50rpx 0 30rpx 15rpx;
    font-size: 32rpx;
  }
  .submitType {
    margin: 10% 0;
    width: 100%;
    border: 0;
    background: -webkit-linear-gradient(left, #556fe3, #6fe3ff);
    /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(
      right,
      #556fe3,
      #6fe3ff
    ); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #556fe3, #6fe3ff);
    /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #556fe3, #6fe3ff);
    /* 标准的语法（必须放在最后） */
  }
  .agreementDivType {
    margin-top: 20rpx;
    text-align: center;
    font-size: 28rpx;
    span {
      cursor: pointer;
      color: #5473e4;
    }
  }
}
</style>
