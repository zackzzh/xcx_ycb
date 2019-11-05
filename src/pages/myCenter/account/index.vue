<template>
  <!-- 账户中心 -->
  <div class="accountDivType">
    <!-- 图标卡 -->
    <icon-card :demoData="demoData.list" :balancePoints="balancePoints"/>
    <!-- 充值按钮 -->
    <div class="payBtnType" @click="handlerPay">充值&nbsp;></div>
    <!-- 线索卡 -->
    <clue-card
      :demoData="demoData.clueList"
      :balancePoints="balancePoints"
      :brandList="brandList"
      :configInfo="configInfo"
    />
  </div>
</template>

<script>
import demoData from "./accountData";

import iconCard from "./iconCard";
import clueCard from "./clueCard";

export default {
  components: {
    iconCard,
    clueCard
  },
  mounted() {
    // 获取车品牌和型号信息接口,品牌信息中有普通线索价格（lPirce）和精准线索价格（tPrice）;
    // 返回数据：points可用积分，balance余额，total_number总共购买线索数，finish_rate线索分配完成比例
    this.$myApi.account.getBrandList().then(res => {
      if (res.code === 200) {
        // 设置头部卡片数据，积分总额等
        this.balancePoints = {
          points: res.points,
          balance: res.balance,
          total_number: res.total_number,
          finish_rate: res.finish_rate
        };
        this.brandList = res.brandList;
        // res.brandList.map(item => {
        //   console.log("brandListItem", item.);
        // });
        // console.log("res.brandList", res.brandList);
        this.configInfo = res.configInfo;
        // 共享积分数据
        this.$store.commit("account/setBalancePoints", this.balancePoints);
      }
    });

    // 设置收款账号
    this.$myApi.account.getPaymentInfo().then(res => {
      if (res.code === 200) {
        this.$store.commit("account/setPaymentInfo", res.bankInfo);
      }
    });
  },
  data() {
    return {
      demoData,
      balancePoints: {},
      pirceList: {},
      brandList: [],
      modelList: [],
      configInfo: {}
    };
  },
  methods: {
    handlerPay() {
      // console.log("点击充值");
      wx.navigateTo({
        url: "/pages/myCenter/account/recharge/main"
      });
    }
  }
};
</script>

<style scoped lang="less">
.accountDivType {
  position: relative;
  text-align: center;
  .payBtnType {
    margin: 40rpx 30rpx -10rpx 0;
    color: #ffa800;
    text-align: right;
    font-size: 48rpx;
    font-weight: bold;
    letter-spacing: 6rpx;
  }
}
</style>
