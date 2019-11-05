<template>
  <!-- 认证表单 -->
  <div class="authFormsDivType">
    <div class="headDivType" :class="{personHeadDivType:isPerson, enterpriseHeadDivType:!isPerson}">
      <!-- 头部字体样式 -->
      <div class="titleDivType">
        <!-- 左边箭头样式 -->
        <div class="lineDivType leftLineDivType">
          <div class="borderType"></div>
          <div class="lineType"></div>
        </div>
        <div class="titleType">
          <span v-for="item in titleArr" :key="item">{{item}}</span>
        </div>
        <!-- 右边箭头样式 -->
        <div class="lineDivType">
          <div class="borderType"></div>
          <div class="lineType"></div>
        </div>
      </div>
    </div>
    <!-- 公共表单 -->
    <common-forms
      :demoData="demoData.fromsList"
      :form="form"
      :errorMessage="errorMessage"
      @handlerForm="handlerForm"
      @onChange="onChange"
    >
      <!-- 拍照 -->
      <picture-card :demoData="demoData" @changePic="changePic"/>
    </common-forms>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
import commonForms from "../common";
import pictureCard from "../common/pictureCard";

import verify from "@/utils/verify";
import authFormsData from "./authFormsData";

export default {
  extends: verify,
  components: {
    commonForms,
    pictureCard
  },
  created() {},
  mounted() {
    // 设置顶部标题
    wx.setNavigationBarTitle({
      title: "完成认证"
    });
  },
  onLoad: function(val) {
    // 用户信息，获取默认电话
    const userInfo = this.$store.state.common.userInfo;
    if (val.key === "key01-2") {
      // 企业认证基础数据
      // 传入参数：companyName企业名称，licenceNo营业执照号，
      // contactsName联系人，contactsPhone联系电话，picLicence营业执照图片base64格式，
      // picContactsCard联系人名片图片base64格式
      this.demoData = this.enterpriseData;
      this.isPerson = false;
      this.form = {
        contactsName: null,
        licenceNo: null,
        companyName: null,
        contactsPhone: userInfo.mobile
      };
    } else {
      // 个人认证，基础数据
      // 个人信息认证页面接口，提交个人认证信息；传入参数：username姓名，idcardNo身份证号，telephone联系电话，
      // picIdcardFont身份证正面图片base64格式，picIdcardBack身份证反面图片base64格式，picCard名片图片base64格式
      // this.$myApi.setting.getQueryCertDetail()
      this.demoData = this.personData;
      this.isPerson = true;
      this.form = {
        username: null,
        idcardNo: null,
        telephone: userInfo.mobile
      };
    }
  },
  computed: {
    titleArr() {
      return this.demoData.title.split("");
    }
  },
  data() {
    return {
      enterpriseData: authFormsData.enterpriseData,
      personData: authFormsData.personData,
      demoData: {},
      isPerson: true,
      picForm: null,
      form: {},
      errorMessage: {}
    };
  },
  methods: {
    changePic(val) {
      // console.log("图片数据", val);
      this.picForm = val;
    },
    onChange(id, detail) {
      // console.log("改变", id, detail);
      this.isemptyStr(detail);
      // 设置错误数据
      this.setMap(id, this.errorStr);
      // 设置错误信息
      this.errorMessage = this.setError();
    },
    handlerForm(val) {
      // console.log("表单数据", this.form);
      // 提交表单
      // 不为空，判断，
      if (this.notEmpty(this.form)) {
        Object.assign(val, this.picForm);
        if (this.isPerson) {
          // 个人认证
          if (this.isMobile(this.form.telephone)) {
            // 验证手机
            // console.log("验证正确个人");
            // 访问后端，做认证操作
            const certification = this.$myApi.setting.setQueryCert(val);
            this.authCert(certification);
          } else {
            // console.log("isPerson手机号验证不通过");
            // 设置错误数据
            this.setMap("telephone", "请输入正确的手机号");
            // 设置错误信息
            this.errorMessage = this.setError();
          }
        } else {
          // 企业认证
          if (this.isMobile(this.form.contactsPhone)) {
            // 验证手机
            // console.log("验证正确企业");
            // 访问后端，做认证操作
            const certification = this.$myApi.setting.setCompanyCert(val);
            this.authCert(certification);
          } else {
            // 设置错误数据
            this.setMap("contactsPhone", "请输入正确的手机号");
            // 设置错误信息
            this.errorMessage = this.setError();
            // console.log("验证不通过", this.setError());
          }
        }
      } else {
        //   // 为空，设置错误信息
        // console.log("验证不通过，为空");
        this.errorMessage = this.setError();
      }
    },
    authCert(certification) {
      // console.log("认证访问后端");
      // 访问后端
      certification.then(res => {
        // console.log("认证成功后", res);
        // 重置图片表单
        this.picForm = null;
        if (res.code === 200) {
          this.$toast.success(res.msg);
          // 返回前2页，延时1秒
          this.$goBackOne(2);
        } else {
          this.$toast.fail(res.msg);
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.authFormsDivType {
  text-align: center;
  .headDivtype {
    width: 100%;
  }
  .personHeadDivType {
    // 身份认证，头部背景
    background: -webkit-linear-gradient(
      left,
      #0097e5,
      #0032a9
    ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(
      right,
      #0097e5,
      #0032a9
    ); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(
      right,
      #0097e5,
      #0032a9
    ); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #0097e5, #0032a9);
    /* 标准的语法（必须放在最后） */
    .titleDivType {
      // 身份认证，头部标题
      margin-bottom: 20rpx;
      padding: 60rpx 0 50rpx 0;
      font-size: 62rpx;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      box-shadow: 6rpx 6rpx 10rpx rgba(0, 0, 0, 0.2);
      .titleType {
        display: inline-block;
        margin: 0 30rpx 0 30rpx;
        span {
          background: -webkit-linear-gradient(
            left,
            rgba(255, 255, 255, 1) 68%,
            rgba(0, 70, 179, 1) 100%
          );
          background: -moz-linear-gradient(
            right,
            rgba(255, 255, 255, 1) 68%,
            rgba(0, 70, 179, 1) 100%
          );
          background: -o-linear-gradient(
            right,
            rgba(255, 255, 255, 1) 68%,
            rgba(0, 70, 179, 1) 100%
          );
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 1) 68%,
            rgba(0, 70, 179, 1) 100%
          );
          -webkit-background-clip: text;
          -moz-background-clip: text;
          -o-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          -moz-text-fill-color: transparent;
          -o-text-fill-color: transparent;
        }
      }
      .lineDivType {
        display: inline-block;
        .borderType {
          display: inline-block;
          margin-bottom: 10rpx;
          width: 18rpx;
          height: 18rpx;
          border: 1rpx solid #c5c6ca;
          transform: rotate(45deg);
        }
        .lineType {
          display: inline-block;
          margin: 0 0 20rpx 2rpx;
          width: 160rpx;
          height: 1rpx;
          background: -webkit-linear-gradient(left, #e2cefd, #3d4561);
          background: -moz-linear-gradient(right, #e2cefd, #3d4561);
          background: -o-linear-gradient(right, #e2cefd, #3d4561);
          background: linear-gradient(to right, #e2cefd, #3d4561);
        }
      }
      .leftLineDivType {
        transform: rotateY(180deg);
      }
    }
  }
  .enterpriseHeadDivType {
    // 企业认证，头部背景
    background: -webkit-linear-gradient(
      left,
      #00cdf4,
      #0063c5
    ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(
      right,
      #00cdf4,
      #0063c5
    ); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(
      right,
      #00cdf4,
      #0063c5
    ); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #00cdf4, #0063c5);
    /* 标准的语法（必须放在最后） */
    .titleDivType {
      // 企业认证，头部标题
      margin-bottom: 20rpx;
      padding: 60rpx 0 50rpx 0;
      font-size: 62rpx;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      box-shadow: 6rpx 6rpx 10rpx rgba(0, 0, 0, 0.2);
      .titleType {
        display: inline-block;
        margin: 0 30rpx 0 30rpx;
        span {
          background: -webkit-linear-gradient(
            left,
            rgba(255, 255, 255, 1) 68%,
            rgba(0, 131, 211, 1) 100%
          );
          background: -moz-linear-gradient(
            right,
            rgba(255, 255, 255, 1) 68%,
            rgba(0, 131, 211, 1) 100%
          );
          background: -o-linear-gradient(
            right,
            rgba(255, 255, 255, 1) 68%,
            rgba(0, 131, 211, 1) 100%
          );
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 1) 68%,
            rgba(0, 131, 211, 1) 100%
          );
          -webkit-background-clip: text;
          -moz-background-clip: text;
          -o-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          -moz-text-fill-color: transparent;
          -o-text-fill-color: transparent;
        }
      }
      .lineDivType {
        display: inline-block;
        .borderType {
          display: inline-block;
          margin-bottom: 10rpx;
          width: 18rpx;
          height: 18rpx;
          border: 1rpx solid #c5c6ca;
          transform: rotate(45deg);
        }
        .lineType {
          display: inline-block;
          margin: 0 0 20rpx 2rpx;
          width: 160rpx;
          height: 1rpx;
          background: -webkit-linear-gradient(left, #e2cefd, #3d4561);
          background: -moz-linear-gradient(right, #e2cefd, #3d4561);
          background: -o-linear-gradient(right, #e2cefd, #3d4561);
          background: linear-gradient(to right, #e2cefd, #3d4561);
        }
      }
      .leftLineDivType {
        transform: rotateY(180deg);
      }
    }
  }
}
</style>
