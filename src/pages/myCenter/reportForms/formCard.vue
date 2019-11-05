<template>
  <div class="formCardDivType">
    <div v-for="item in demoData" :key="item.id">
      <div class="cardDivType">
        <!-- 卡片头部 -->
        <div class="cardHeadDivType">
          <div class="titleType">
            <div class="lineDivType"></div>
            {{item.title}}
          </div>
          <div class="sumDayType">{{subtitle}}</div>
        </div>
        <!-- 统计条 -->
        <div class="progressMainDivType">
          <!-- 数量统计条 -->
          <div class="progressDivType">
            <van-progress
              custom-class="progressType"
              :percentage="data[item.varType]"
              color="linear-gradient(to right, #15ffd8, #93d2fd)"
              :show-pivot="false"
            />
            <span>{{data[item.varType]}}%</span>
          </div>
          <!-- 统计图标 -->
          <div class="countDivType">
            <div class="countType">
              <div class="lineDivType timePercentType"></div>
              &nbsp;数量&nbsp;{{data[item.varType]}}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["demoData", "data","subtitle"]
};
</script>

<style lang="less">
.formCardDivType {
  margin: 30rpx 20rpx 0 20rpx;
  .cardDivType {
    margin: 30rpx 0;
    padding: 50rpx 40rpx 10rpx 10rpx;
    border-radius: 10rpx;
    box-shadow: 2rpx 2rpx 21rpx rgba(0, 0, 0, 0.2);
    .cardHeadDivType {
      display: flex;
      justify-content: space-between;
      .titleType {
        font-size: 30rpx;
        color: #4c8eff;
        .lineDivType {
          display: inline-block;
          width: 8rpx;
          height: 40rpx;
          margin: 0 10rpx -8rpx 0;
          border-radius: 4rpx;
          background: #4c8eff;
        }
      }
      .sumDayType {
        font-size: 26rpx;
      }
    }
    .progressMainDivType {
      margin: 40rpx 0 0 30rpx;
      .progressDivType {
        position: relative;
        .progressType {
          height: 40rpx;
          margin: 40rpx 0;
          border-radius: 20rpx;
        }
        span {
          position: absolute;
          right: 16rpx;
          top: 0;
          font-size: 32rpx;
          color: #cbcbcb;
        }
      }
    }
    .countDivType {
      text-align: left;
      font-size: 22rpx;
      color: #cbcbcb;
      .countType {
        .lineDivType {
          display: inline-block;
          width: 20rpx;
          height: 20rpx;
        }
        .countType {
          background: -webkit-linear-gradient(
            left,
            #7f94fd,
            #c07aff
          ); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(
            right,
            #7f94fd,
            #c07aff
          ); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(
            right,
            #7f94fd,
            #c07aff
          ); /* Firefox 3.6 - 15 */
          background: linear-gradient(to right, #7f94fd, #c07aff);
          /* 标准的语法（必须放在最后） */
        }
        .timePercentType {
          background: -webkit-linear-gradient(
            left,
            #15ffd8,
            #93d2fd
          ); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(
            right,
            #15ffd8,
            #93d2fd
          ); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(
            right,
            #15ffd8,
            #93d2fd
          ); /* Firefox 3.6 - 15 */
          background: linear-gradient(to right, #15ffd8, #93d2fd);
          /* 标准的语法（必须放在最后） */
        }
      }
    }
  }
}
</style>