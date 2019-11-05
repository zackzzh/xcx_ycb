<template>
  <!-- 地址 -->
  <div class="addressDivType">
    <!-- 选项框 -->
    <picker mode="region" :value="region" @change="regionChange">
      <van-cell title="所在地区" :label="companyAddress" @click="handlerCell" is-link/>
    </picker>
    <van-field
      :label="inputData.title"
      :value="value"
      :placeholder="inputData.placeholder"
      :error-message="errorStr"
      type="textarea"
      required
      autosize
      @change="onChange"
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

export default {
  mixins: [methods, verify],
  mounted() {
    // 企业信息
    const companyInfo = this.$store.state.setting.companyInfo;
    this.value = companyInfo.address;
    this.addressInfo = companyInfo.address;
    // 省市区
    const province = companyInfo.province || "";
    const city = companyInfo.city || "";
    const area = companyInfo.area || "";
    const companyAddr = province + " " + city + " " + area;
    this.companyAddress = companyAddr;
  },
  data() {
    return {
      // 修改企业地址信息，传入参数：头部传入token,province省份，city市，area区，address详细地址
      isShowPicker: false,
      inputData: {
        title: "详细地址",
        placeholder: "请输入详细地址"
      },
      companyAddress: "",
      addressInfo: "",
      value: "",
      region: []
    };
  },
  methods: {
    regionChange(val) {
      // 选择省市区
      const {
        mp: {
          detail: { value }
        }
      } = val;
      this.companyAddress = value[0] + " " + value[1] + " " + value[2];
    },
    onChange(val) {
      // 输入框，输入的值
      const {
        mp: { detail }
      } = val;
      this.addressInfo = detail;
      // 非空判断
      this.isemptyStr(detail);
    },
    handlerSubmit() {
      // 提交表单province省份，city市，area区，address详细地址
      const addressArr = this.companyAddress.split(" ");
      const value = {
        province: addressArr[0],
        city: addressArr[1],
        area: addressArr[2],
        address: this.addressInfo
      };
      // 设置企业地址
      this.$myApi.setting.setCompanyAddr(value).then(res => {
        if (res.code === 200) {
          // 获取企业信息
          this.getEnterpriseInfo();
          this.$toast.success(res.msg);
          // 返回前1页，延时1秒
          this.$goBackOne();
        } else {
          this.$toast.fail(res.msg);
        }
      });
    }
  }
};
</script>

<style lang="less">
.addressDivType {
  margin: 0 20rpx;
  .popupType {
    height: auto;
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
