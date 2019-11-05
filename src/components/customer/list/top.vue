<template>
  <div class="top-right">
    <search :value="keyword" @outSearch="search"></search>
    <div class="right-shuai">
      <img src="/static/images/customers/fpb.png" v-if="status==='D'" @click="assign" />
      <img src="/static/images/customers/shaixuan.png" @click="filter" />
    </div>
  </div>
</template>

<script>
  import store from "@/store";
  import search from "../search";
  export default {
    props: ['keyword', "show", "status"],
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
      assign() {
        let url = "/pages/customer/assign/main"
        wx.navigateTo({
          url
        })
      },
    },
    components: {
      search
    }
  }

</script>

<style lang="less">
  .top-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 40rpx;

    .right-search {
      display: flex;
      align-items: center;
      width: 440rpx;
      height: 60rpx;
      border-radius: 50rpx;
      background-color: #f2f2f2;

      input {
        width: 80%;
        padding: 10rpx 16rpx;
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
      margin-top: 6rpx;

      image {
        margin-left: 30rpx;
        width: 44rpx;
        height: 44rpx;
      }
    }
  }

</style>
