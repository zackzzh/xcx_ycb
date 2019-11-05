<template>
  <div class="right-search">
    <input type="text" placeholder="输入姓名和手机号" placeholder-class="search" :value="keyword" @change="changeKeyword">
    <image src="/static/images/customers/search.png" mode="widthFix" @click="search" />
  </div>
</template>

<script>
  export default {
    props: ['keyword', ],
    methods: {
      changeKeyword(e) {
        this.keyword = e.mp.detail.value
      },
      search() {
        let data = {}
        if (this.keyword && this.keyword.length > 0) {
          if (/^[0-9]+$/.test(this.keyword)) {
            data.customerPhone = this.keyword;
          } else {
            data.customerName = this.keyword;
          }
        }
        this.$emit('outSearch', data)
      }
    },
  }

</script>

<style lang="less">
  .top-right {
    display: flex;
    align-items: center;

    .right-search {
      display: flex;
      align-items: center;
      width: 260rpx;
      height: 0.6rem;
      border-radius: 50rpx;
      background-color: #f2f2f2;

      input {
        width: 63%;
        padding: 15rpx 20rpx;
        font-size: 24rpx;
      }

      .search {
        color: #aaaaaa;
        font-size: 20rpx;
      }

      image {
        width: 24rpx;
      }
    }

    .right-shuai {
      margin-left: 20rpx;

      image {
        width: 44rpx;
        margin-top: 8px;
      }
    }
  }

</style>
