<template>
  <div>
    <van-tabbar :fixed="false" class="customer-tabbar" active="1">
      <van-tabbar-item v-for="(item, index) in navs" :key="index" :info="item.number>0?item.number:null"
        @click="toList(index,item)">
        <image :src="item.image" mode="widthFix" />
        <div class="customer-tabbar-item">{{item.name}}</div>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import store from "@/store";
  export default {
    props: ['navs'],
    methods: {
      toList(index, item) {
        store.state.customer.list = [];
        let url = "/pages/customer/list/main?custStatus=" + item.custStatus
        wx.navigateTo({
          url
        })
      },
    }
  }

</script>

<style lang="less">
  

  .customer-tabbar {
    image {
      width: 114rpx;
      height: 114rpx;
    }

    .customer-tabbar-item {
      font-size: 0.24rem;
      color: #010101;
      width: 100%;
      text-align: center;
    }
  }

</style>
