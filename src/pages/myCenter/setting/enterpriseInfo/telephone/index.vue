<template>
  <!-- 座机 -->
  <div class="telephoneDivType">
    <van-field
      :value="telephone"
      :label="demoData.label"
      type="number"
      :placeholder="demoData.placeholder"
      :error-message="errorStr"
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

export default {
  mixins: [methods, verify],

  mounted() {
    // 设置顶部标题
    wx.setNavigationBarTitle({
      title: "座机"
    });
  },
  data() {
    return {
      demoData: {
        label: "电话号码",
        placeholder: "请输入企业座机号码号码",
        telephone: ""
      }
    };
  },
  methods: {
    onChange(val) {
      // console.log("座机", val);
      const {
        mp: { detail }
      } = val;
      this.telephone = detail;
      //
      this.isemptyStr(detail);
    },
    handlerSubmit() {
      // console.log("座机", this.telephone);
      if (!this.isemptyStr(this.telephone)) {
        this.$myApi.setting.setCompanyPhone(this.telephone).then(res => {
          if (res.code === 200) {
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
