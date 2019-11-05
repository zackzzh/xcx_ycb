<template>
  <div class="page-invoice">
    <!-- <van-cell title='车主姓名' value="龙小李" />
    <van-cell title='所购车辆' value="途安L280TSI 自动风尚版 7座" /> -->
    <div class="upload">
      <div class="upload-title" v-if="index==0">线索订单上传凭证</div>
      <div class="upload-title" v-if="index==1">充值订单上传凭证</div>
      <div class="upload-title" v-if="index==2">购车发票</div>
      <div class="upload-image" @click="upload">
        <image :src="image" v-if="imageList.length == 0" />
        <div class="imageList" v-else>
          <image :src="item" v-for="(item, index) in imageList" :key="index" />
        </div>
        <span>点击添加</span>
      </div>
    </div>
    <div class="invoice-detail" v-if="index==2">
      <div class="item">1.请核对车主及车辆信息与购车发票一致后再添加购车发票；</div>
      <div class="item">2.发票审核后将无法修改车主及车辆信息;</div>
    </div>
    <div class="invoice-detail" v-if="index==0 || index==1">
      <div class="item">1.该凭证可上传多张，必须把支付凭证清晰上传;</div>
    </div>
    <div class="detail-button">
      <van-button round="true" @click="comfirm">保存</van-button>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        image: '/static/images/customers/invoice.png',
        imageList: [],
        custId: '',
        files: [],
        index: 2,
        orderno: '',
      }
    },
    methods: {
      upload() {
        var that = this;
        wx.chooseImage({
          count: 9,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: (res) => {
            // tempFilePath可以作为img标签的src属性显示图片
            this.imageList = res.tempFilePaths
            res.tempFilePaths.forEach((data) => {
              wx.getFileSystemManager().readFile({
                filePath: data,
                encoding: "base64",
                success: readFileRes => {
                  //成功的回调
                  let url = 'data:image/jpg/png/gif;base64,' + readFileRes.data
                  this.files.push(url)
                },
                fail: readFileRej => {
                  console.log("转换base64失败");
                }
              });
            });
          }
        })
      },
      comfirm() {
        let data = {};
        let res;
        if (this.files.length > 0) {
          switch (this.index) {
            case 0:
              data = {
                orderno: this.orderno,
                files: this.files
              }
              res = this.$myApi.trade.uploadInvoice(data)
              break;
            case 1:
              data = {
                orderno: this.orderno,
                files: this.files
              }
              res = this.$myApi.trade.uploadInvoice(data)
              break;
            default:
              data = {
                custId: this.custId,
                files: this.files
              }
              res = this.$api.uploadInvoice(data)
              break;
          }
          res.then((res) => {
            wx.navigateBack({
              success: () => {
                this.$toast.success(res.msg);
              }
            })
          })
        } else {
          this.$toast.fail('上传图片不能为空');
        }
      }
    },
    onLoad: function (options) {
      console.log('options', options)
      let title = '上传'
      switch (Number(options.index)) {
        case 0:
          title = "上传凭证"
          break;
        case 1:
          title = "上传凭证"
          break;
        default:
          title = "上传发票"
          break;
      }
      wx.setNavigationBarTitle({
        title: title
      })
      this.imageList = [];
      this.files = [];
      this.index = Number(options.index)
      this.orderno = options.orderno;
      this.custId = options.custId;
    }
  }

</script>

<style lang="less">
  .page-invoice {
    padding: 0px 32rpx;

    .van-cell {
      padding: 10px 0px;
    }

    .van-cell__value {
      text-align: left;
      min-width: 256px;

    }

    .upload {
      .upload-title {
        font-size: 14px;
        line-height: 24px;
        color: #333;
        padding: 10px 0px;
      }

      .upload-image {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        background: #F0F0F0;
        padding: 40rpx 0px;
        position: relative;

        image {
          width: 162rpx;
          height: 162rpx;
          margin-bottom: 26rpx;
        }

        .imageList {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          image {
            margin-right: 20px;
          }
        }

        span {
          font-size: 28rpx;
          color: #0097FF;
        }
      }

    }

    .invoice-detail {
      margin-top: 10px;
      font-size: 24rpx;
      color: #919191;

      .item {
        line-height: 20px;
      }
    }

    .detail-button {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 80rpx;

      .van-button {
        font-size: 28rpx;
        width: 650rpx;
        border-radius: 10rpx;
        background: linear-gradient(to right, #556FE3, #7ABCF3);
        color: #fff;
      }
    }
  }

</style>
