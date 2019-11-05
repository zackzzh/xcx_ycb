<template>
  <!-- 认证特权 -->
  <div class="privilegeDivType">
    <div class="titleDivType">
      <div class="lineDivType leftLineDivType">
        <div class="squareType"></div>
        <div class="lineType"></div>
      </div>
      <div class="titleType">{{demoData.title}}</div>
      <div class="lineDivType">
        <div class="squareType"></div>
        <div class="lineType"></div>
      </div>
    </div>
    <div class="listMainDivType">
      <van-row v-for="item in demoData.list" :key="item.id">
        <div class="rowType">
          <van-col span="5">
            <img class="imgType" :src="item.iconUrl">
          </van-col>
          <van-col span="19">
            <div class="titleType">{{item.title}}</div>
            <div class="subtitleType">{{item.subtitle}}</div>
          </van-col>
        </div>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  props: ["demoData"]
};
</script>

<style scoped lang="less">
.privilegeDivType {
  margin: 60rpx 0 0 0;
  .titleDivType {
    .titleType {
      display: inline-block;
      margin: 0 30rpx 10rpx 30rpx;
      font-size: 32rpx;
      font-weight: bold;
      color: #032bf5;
    }
    .lineDivType {
      display: inline-block;
      .squareType {
        display: inline-block;
        width: 14rpx;
        height: 14rpx;
        transform: rotate(45deg);
        background: rgba(3, 43, 245, 0.5);
      }
      .lineType {
        display: inline-block;
        margin: 0 0 4rpx 0;
        width: 90rpx;
        height: 6rpx;

        background: -webkit-linear-gradient(
          left,
          rgba(3, 43, 245, 0.5) 0%,
          rgba(255, 255, 255, 0.5) 100%
        );
        background: -moz-linear-gradient(
          right,
          rgba(3, 43, 245, 0.5) 0%,
          rgba(255, 255, 255, 0.5) 100%
        );
        background: -o-linear-gradient(
          right,
          rgba(3, 43, 245, 0.5) 0%,
          rgba(255, 255, 255, 0.5) 100%
        );
        background: linear-gradient(
          to right,
          rgba(3, 43, 245, 0.5) 0%,
          rgba(255, 255, 255, 0.5) 100%
        );
      }
    }
    .leftLineDivType {
      transform: rotateY(180deg);
    }
  }
  .listMainDivType {
    .rowType {
      margin: 28rpx 0;
      text-align: left;
      .imgType {
        width: 94rpx;
        height: 94rpx;
      }
      .titleType {
        font-size: 32rpx;
        color: #333333;
      }
      .subtitleType {
        margin-top: 16rpx;
        font-size: 24rpx;
        color: #999999;
      }
    }
  }
}
</style>