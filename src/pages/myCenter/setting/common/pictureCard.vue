<template>
<!-- 认证图片 -->
  <div class="pictureCardDivType">
    <div class="subtitleType">{{demoData.subtitle}}</div>

    <van-row gutter="20">
      <van-col span="12" v-for="item in demoData.titleList" :key="item.id">
        <div class="cardDivType" @click="handlerPic(item)">
          <div v-if="!picFun[item.varType]" class="iconMainDivType">
            <div class="iconDivType">
              <div class="iconTopType"></div>
              <div class="iconMiddleType"></div>
              <div class="iconBottomType"></div>
            </div>
            <div class="subtitleCardType">{{subtitle}}</div>
          </div>
          <div v-else>
            <img class="cardImgType" :src="picFun[item.varType]">
          </div>
        </div>
        <div class="titleType">{{item.title}}</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  props: ["demoData"],
  data() {
    return {
      subtitle: "点击拍摄",
      tempFilePaths: null,
      picFun: {
        picIdcardFont: null,
        picIdcardBack: null,
        picCard: null,
        picLicence: null,
        picContactsCard: null
      },
      picForm: {
        picIdcardFont: null,
        picIdcardBack: null,
        picCard: null,
        picLicence: null,
        picContactsCard: null
      }
    };
  },
  methods: {
    handlerPic(val) {
      // console.log("选择图片", val);
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: res => {
          // console.log("拍照res", res);
          this.picFun[val.varType] = res.tempFilePaths[0];
          // 将照片转换成base64
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0],
            encoding: "base64",
            success: readFileRes => {
              //成功的回调
              this.picForm[val.varType] = readFileRes.data;
              this.$emit("changePic", this.picForm);
            },
            fail: readFileRej => {
              // console.log("转换base64失败");
            }
          });
        },
        fail: rej => {
          // console.log("读取失败");
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.pictureCardDivType {
  padding: 0 34rpx;
  text-align: center;
  .subtitleType {
    margin: 60rpx 0 30rpx 0;
    font-size: 24rpx;
    color: #2671e8;
  }
  .titleType {
    margin-bottom: 10rpx;
    font-size: 24rpx;
    color: #666666;
  }
  .cardDivType {
    margin: 16rpx 0;
    width: 100%;
    border-radius: 10rpx;
    border: 1rpx solid #e6e6e6;
    .iconMainDivType {
      margin: 60rpx 0 30rpx 0;
      .subtitleCardType {
        margin-top: 14rpx;
        font-size: 24rpx;
        color: #b5b8c1;
      }
      .iconDivType {
        position: relative;
        margin: 0 30% 0 30%;
        padding: 20rpx 0 10rpx 0;
        border-radius: 10rpx;
        background: #b5b8c1;
        .iconTopType {
          height: 24rpx;
          margin: 0 40%;
          border-radius: 50%;
          background: #ffffff;
        }
        .iconMiddleType {
          height: 12rpx;
          margin: 6rpx 32%;
          border-radius: 6rpx;
          background: #ffffff;
        }
        .iconBottomType {
          height: 12rpx;
          margin: 0 24%;
          border-radius: 6rpx;
          background: #ffffff;
        }
      }
    }
    .cardImgType {
      width: 280rpx;
      height: 188rpx;
    }
  }
}
</style>