<template>
  <!-- 个人信息 -->
  <div class="personalDivType">
    <van-cell
      :title="item.title"
      :value="(item.varType === 'picHead')?'':userInfoFun[item.varType]"
      v-for="item in demoData"
      :key="item.id"
    >
      <div v-if="item.varType === 'picHead'" slot="right-icon" @click="handlerHead">
        <img class="imgType" :src="userInfoFun.picHead?userInfoFun.picHead:headUrl">
      </div>
    </van-cell>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
import demoData from "./personalData";

export default {
  computed: {
    userInfoFun() {
      return this.$store.state.common.userInfo;
    }
  },
  data() {
    return {
      demoData,
      headUrl: "/static/images/myCenter/setting/member/01.png"
    };
  },
  methods: {
    handlerHead() {
      // 获取图片，或拍照
       wx.chooseImage({
          count: 1,
          sizeType: ["original", "compressed"],
          sourceType: ["album", "camera"],
          success: res => {
            // 将图片换成base64
            this.$store.state.common.userInfo.picHead = res.tempFilePaths[0]
            wx.getFileSystemManager().readFile({
              filePath: res.tempFilePaths[0],
              encoding: "base64",
              success: readFileRes => {
                //成功的回调
                let url = 'data:image/jpg/png/gif;base64,' + readFileRes.data
                const value = {
                  imgData: url
                };
                const updatePicHead = this.$myApi.setting.updatePicHead(value);
                updatePicHead.then(res => {
                  if (res.code === 200) {
                    // console.log('上传成功')
                    this.$toast.success(res.msg);
                  } else {
                    // console.log('上传失败')
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
.personalDivType {
  margin: 0 20rpx;
  .imgType {
    width: 90rpx;
    height: 90rpx;
  }
}
</style>
