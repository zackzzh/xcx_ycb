<template>
  <!-- 通知消息 -->
  <div class="informDivType">
    <van-collapse :value="activeName" @change="onChange" accordion>
      <van-collapse-item :name="item.id" v-for="item in dataFun" :key="item.id" :is-link="false">
        <!-- 标题 -->
        <div class="titleDivType" slot="title">
          <!-- 图标显示 -->
          <div class="imgDivType">
            <img class="imgType" :src="iconUrl">
            <div class="dotType" v-if="item.status === '0'"></div>
          </div>
          <!-- 标题显示 -->
          <div class="contentDivType">
            <div class="titleType">{{item.title}}</div>
            <div class="contentType" v-show="item.id !== isShowMore">{{item.intro}}</div>
          </div>
        </div>
        <!-- 内容 -->
        <div v-html="item.content"></div>
        <!-- 右侧图标 -->
        <div class="rightIconType" slot="right-icon">{{item.createtime}}</div>
      </van-collapse-item>
    </van-collapse>
    <div class="bottomDivType">没有更多通知消息</div>
  </div>
</template>

<script>
export default {
  computed: {
    // 剪切信息 ，通知消息
    dataFun() {
      // 信息列表，通知列表
      const noticeList = this.$store.getters["inform/getNoticeList"].noticeList;
      noticeList.map(item => {
        item.intro = item.content.slice(3, 12) + "...";
      });
      return noticeList;
    }
  },
  data() {
    return {
      data: null,
      activeName: [""],
      isShowMore: null,
      iconUrl: "/static/images/myCenter/inform/icon.png"
    };
  },
  methods: {
    getQueryNotice() {
      // 获取通知消息
      this.$myApi.inform.queryNotice().then(res => {
        if (res.code === 200) {
          this.$store.commit("inform/setNoticeList", res);
        }
      });
    },
    onChange(val) {
      // 点击通知消息时
      const {
        mp: { detail }
      } = val;
      this.activeName = detail;
      this.isShowMore = detail;

      // 标记已读
      this.$myApi.inform.updateNotice(detail).then(res => {
        if (res.code === 200) {
          // 获取列表
          this.getQueryNotice();
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.informDivType {
  margin: 0 20rpx;
  .titleDivType {
    .imgDivType {
      display: inline-block;
      width: 110rpx;
      .imgType {
        width: 90rpx;
        height: 90rpx;
      }
      .dotType {
        transform: translate(-20rpx, -70rpx);
        display: inline-block;
        width: 20rpx;
        height: 20rpx;
        border-radius: 50%;
        background: #ff2a29;
      }
    }
    .contentDivType {
      display: inline-block;
      transform: translateY(-6rpx);
      .titleType {
        font-size: 28rpx;
        color: #3c3c3c;
      }
      .contentType {
        font-size: 26rpx;
        color: #aaaaaa;
      }
    }
  }
  .rightIconType {
    transform: translateY(60rpx);
    font-size: 22rpx;
    color: #aaaaaa;
  }
  .bottomDivType {
    text-align: center;
    font-size: 24rpx;
    color: rgba(0, 0, 0, 0.6);
  }
}
</style>
