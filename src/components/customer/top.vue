<template>
  <div class="customer-top">
    <div class="top-left">
      <div class="avatar" @click="handlerHead">
        <image :src="userInfo.picHead?userInfo.picHead:'/static/images/myCenter/setting/member/01.png'" />
        <input type="file">
      </div>
      <div class="info">
        <div>{{userInfo.username}}</div>
        <div>{{userInfo.mobile}}</div>
        <div>{{userInfo.companyName}}</div>
      </div>
    </div>
    <div class="top-right">
      <search :value="keyword" @outSearch="search"></search>
      <div class="right-shuai">
        <image src="/static/images/customers/shaixuan.png" mode="widthFix" @click="filter" />
      </div>
    </div>
  </div>
</template>

<script>
  import search from "./search";
  export default {
    props: ['userInfo', "keyword", "show"],
    methods: {
      search(e) {
        this.$emit('keyword', e)
      },
      filter() {
        this.$store.state.customer.popData = {
          statusKey: null,
          brandKey: null,
          modelKey: null,
          typeKey: null,
          saleKey: null,
        };
        this.$store.state.customer.brandItem = {};
        this.$store.state.customer.modelList = [];
        this.$emit('show', true)
      },
      handlerHead() {
        // 获取图片，或拍照
        wx.chooseImage({
          count: 1,
          sizeType: ["original", "compressed"],
          sourceType: ["album", "camera"],
          success: res => {
            console.log('res', res);
            // 将图片换成base64
            this.userInfo.picHead = res.tempFilePaths[0]
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
                    console.log('上传成功')
                    this.$toast.success(res.msg);
                  } else {
                    console.log('上传失败')
                    this.$toast.fail(res.msg);
                  }
                });
              },
              fail: readFileRej => {
                console.log("转换base64失败");
              }
            });
          }
        });
      }
    },
    components: {
      search
    }
  }

</script>

<style lang="less">
  .customer-top {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    .top-left {
      display: flex;
      align-items: center;
      font-size: 24rpx;

      .avatar {
        width: 120rpx;
        height: 120rpx;
        margin-right: 16rpx;

        image {
          border-radius: 50%;
          width: 120rpx;
          height: 120rpx;
          width: 100%;
        }
      }

      .info {
        color: #5c5c5c;
        display: flex;
        font-size: 0.24rem;
        flex-direction: column;
        justify-content: space-between;
      }
    }
  }

</style>
