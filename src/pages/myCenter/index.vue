<template>
  <!-- 个人中心 -->
  <div class="myMainDivType">
    <img class="imgType" :src="demoData.bgImgUrl">
    <!-- 头部样式 -->
    <div class="headDivType">
      <div class="baseInfoDivType">
        <div @click="handlerHead">
          <img :src="userInfoFun.picHead?userInfoFun.picHead:demoData.headImgUrl">
        </div>
        <div>{{userInfoFun.username?userInfoFun.username: "11"}}</div>
        <div class="phoneType">{{userInfoFun.mobile?userInfoFun.mobile: "22"}}</div>
      </div>
    </div>
    <!-- 页面跳转选项 -->
    <div class="linkDivType">
      <div :key="item.id" v-for="item in demoData.list">
        <van-cell
          v-if="userInfoFun.roleType !== item.roleType"
          :value="item.inform?noticeTotal: ''"
          @click="handlerClick(item)"
          is-link
        >
          <div slot="icon">
            <img class="iconImgType" :src="item.iconUrl">
          </div>
          <div slot="title">
            <div style="display: inline">&nbsp;&nbsp;&nbsp;{{item.title}}</div>
          </div>
        </van-cell>
      </div>
    </div>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>

import myCenterData from "./myCenterData";

export default {
  mounted() {
    this.getQueryNotice();
    // 用户信息
    wx.setNavigationBarTitle({
      title: "个人中心"
    });
  },
  computed: {
    userInfoFun() {
      return this.$store.state.common.userInfo;
    },
    noticeTotal() {
      // 未读条数,动态
      const noticeData = this.$store.getters["inform/getNoticeList"];
      // 未读条数
      return noticeData.total_unread || "";
    }
  },
  data() {
    return {
      demoData: myCenterData.data,
      noticeList: null, // 未读条数
      form: {
        imgData: null
      }
    };
  },
  methods: {
    getQueryNotice() {
      // 获取通知消息
      const queryNotice = this.$myApi.inform.queryNotice();
      queryNotice.then(res => {
        if (res.code === 200) {
          this.$store.commit("inform/setNoticeList", res);
        }
      });
    },
    handlerClick(val) {
      wx.navigateTo({
        url: val.pathUrl
      });
    },
    handlerHead() {
      // 获取图片，或拍照
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: res => {
          // 将图片换成base64
          this.$store.state.common.userInfo.picHead = res.tempFilePaths[0];
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0],
            encoding: "base64",
            success: readFileRes => {
              //成功的回调
              let url = "data:image/jpg/png/gif;base64," + readFileRes.data;
              const value = {
                imgData: url
              };
              const updatePicHead = this.$myApi.setting.updatePicHead(value);
              updatePicHead.then(res => {
                if (res.code === 200) {
                  // console.log("上传成功");
                  this.$toast.success(res.msg);
                } else {
                  // console.log("上传失败");
                  this.$toast.fail(res.msg);
                }
              });
            },
            fail: readFileRej => {
              // console.log("转换base64失败");
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.myMainDivType {
  .imgType {
    width: 100%;
  }

  .headDivType {
    position: relative;
    margin: 0 20rpx;

    .baseInfoDivType {
      position: absolute;
      bottom: -60rpx;
      width: 100%;
      border-radius: 10px;
      text-align: center;
      box-shadow: 6rpx 6rpx 16rpx rgba(0, 0, 0, 0.1);
      background: #ffffff;

      img {
        width: 150rpx;
        height: 150rpx;
        margin: -75rpx 0 30rpx 0;
        border-radius: 50%;
      }

      .phoneType {
        margin: 20rpx 0 60rpx 0;
        font-size: 32rpx;
        color: #999999;

        span {
          cursor: pointer;
          font-size: 28rpx;
          color: #3198ff;
        }
      }
    }
  }

  .linkDivType {
    margin: 100rpx 0 0 0;

    .iconImgType {
      width: 40rpx;
      height: 40rpx;
    }
  }
}
</style>
