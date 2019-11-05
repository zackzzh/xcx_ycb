<template>
  <!-- 成员卡 -->
  <div class="memberCardDivType">
    <div class="memberCardType" v-for="item in demoData" :key="item.id">
      <img class="imgType" :src="item.picHead||headPic">
      <div class="textDivType">
        <div class="nameType">{{item.username}}</div>
        <div class="positionType">{{position[item.roleType]}}</div>
        <div class="btnDivType" @click="removeMembers(item)">移除</div>
      </div>
    </div>
    <div class="bottomDivType">没有更多成员</div>
  </div>
</template>

<script>
export default {
  props: ["demoData"],
  data() {
    return {
      headPic: "/static/images/myCenter/setting/member/01.png",
      position: ["", "管理员", "销售"]
    };
  },
  methods: {
    removeMembers(val) {
      this.$emit("handlerRemove", val);
    }
  }
};
</script>

<style scoped lang="less">
.memberCardDivType {
  .memberCardType {
    margin: 20rpx 0;
    padding: 45rpx 0 45rpx 30rpx;
    border-radius: 25rpx;
    box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.08);
    .imgType {
      width: 90rpx;
      height: 90rpx;
    }
    div {
      display: inline-block;
    }
    .textDivType {
      width: 80%;
      transform: translateY(-24rpx);
      .nameType {
        margin: 0 80rpx 0 60rpx;
        font-size: 42rpx;
        color: #282828;
      }
      .positionType {
        font-size: 38rpx;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.5);
      }
      .btnDivType {
        //   margin-left: 100%;
        transform: translateY(14rpx);
        float: right;
        font-size: 30rpx;
        font-weight: bold;
        color: #006de4;
      }
    }
  }
  .bottomDivType {
    text-align: center;
    font-size: 24rpx;
    color: rgba(0, 0, 0, 0.6);
  }
}
</style>