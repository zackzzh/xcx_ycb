<template>
  <div class="page-remark">
    <textarea @input="remark" auto-height placeholder="添加更多备注信息" />
    <div class="detail-button">
      <van-button round="true" @click="comfirm">保存</van-button>
      <van-toast id="van-toast" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: ''
      }
    },
    methods: {
      comfirm() {
        this.$store.state.common.remark = this.value;
        wx.navigateBack({
          success: () => {
            this.$toast.success('添加备注成功');
          }
        })
      },
      remark(e) {
        this.value = e.mp.detail.value
      }
    }
  }

</script>

<style lang="less">
  .page-remark {
    .van-cell {
      padding: 0px;
      margin-bottom: 70rpx;
    }

    textarea {
     padding:20rpx 10rpx;
     height:300rpx !important;
     background:#F0F0F0;
     width:100% !important;
     margin-bottom:20px;
    }

    .detail-button {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 108rpx;

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
