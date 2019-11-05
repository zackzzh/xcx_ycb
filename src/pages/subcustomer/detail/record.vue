<template>
  <div class="detail-record" v-if="recordList && recordList.length>0">
    <div class="record-title">
      操作记录
    </div>
    <div class="record-list">
      <div class="record-image">
        <image src="/static/images/customers/detailcolor.png"></image>
      </div>
      <div class="start-line"></div>
      <div class="list-item" v-for="(item, index) in recordList" :key="index">
        <div class="item-left">
          <div class="round">
            <div class="dit"></div>
          </div>
          <div class="line"></div>
        </div>
        <div class="item-right">
          <div class="time">{{item.createtime}}</div>
          <div class="content"> <span v-if="item.username">{{item.username}}</span> <span
              v-if="item.remark">{{item.remark}}</span>
          </div>
          <div class="time">{{item.record}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['recordList']
  }

</script>

<style lang="less">
  .detail-record {
    padding: 0px 32rpx;
    color: #4C4C4C;
    font-size: 30rpx;

    .record-title {
      margin-bottom: 40rpx;
    }
  }

  .record-list {
    .record-image {
      width: 34rpx;
      height: 34rpx;

      image {
        width: 34rpx;
        height: 34rpx;
      }
    }

    .start-line {
      position: relative;
      left: 14rpx;
      height: 40rpx;
      width: 2px;
      background: #1765C5;
    }

    .list-item {
      display: flex;
      position: relative;
      margin-left: 5rpx;

      .item-left {
        margin-right: 60rpx;

        .round {
          margin: 10rpx 0px;
          width: 20rpx;
          height: 20rpx;
          border: 1px solid #1765C5;
          border-radius: 50%;
          position: relative;

          .dit {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 6rpx;
            height: 6rpx;
            background: #1765C5;
            border-radius: 50%;
          }
        }

        .line {
          position: relative;
          left: 10rpx;
          height: 160rpx;
          width: 2px;
          background: #1765C5;
        }
      }

      .item-right {
        .time {
          color: #9A9A9A;
          margin-bottom: 27rpx;
        }

        .content {
          color: #4A4A4A;
        }
      }
    }
  }

</style>
