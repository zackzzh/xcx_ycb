<template>
  <div class="page-customer">
    <!-- 头部 -->
    <top
      :userInfo="userInfo"
      :keyword="demoData.keyword"
      :show="demoData.show"
      @keyword="searchKeyword"
      @show="filter"
    ></top>
    <!-- 轮播 -->
    <slide
      :bannerList="demoData.bannerList"
      :indicatorDots="demoData.indicatorDots"
      :autoplay="demoData.autoplay"
      :interval="demoData.interval"
      :duration="demoData.duration"
    ></slide>
    <!-- 导航 -->
    <navs :navs="demoData.navs" :userInfo="userInfo.roleType"></navs>
    <!-- 底部列表 -->
    <div class="customer-list">
      <div class="customer-title">客户卡</div>
      <item v-for="(item, index) in custList.list" :key="index" :item="item"></item>
      <div class="customer-more" @click="toMore()">查看更多</div>
    </div>
    <!-- 弹窗筛选 -->
    <popup
      :position="demoData.position"
      :show="demoData.show"
      @outShow="changeShow"
      :brandList="brandList"
    ></popup>
    <pop-brand
      :show="showB"
      :position="demoData.position"
      @outShow="changeB"
      :brandList="brandAlllist"
    ></pop-brand>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
import store from "@/store";
import popBrand from "@/components/popBrand.vue";
import item from "@/components/customer/item";
import popup from "@/components/customer/popup";
import top from "@/components/customer/top";
import slide from "@/components/customer/slide";
import navs from "@/components/customer/navs";
import utils from "@/utils/index";
import customerData from "./customerData";
import { isNumber } from "util";
export default {
  data() {
    return {
      demoData: customerData.data
    };
  },
  computed: {
    brandList() {
      if (this.$store.state.customer.brandList.length > 8) {
        return this.$store.state.customer.brandList.slice(0, 8);
      } else {
        return this.$store.state.customer.brandList;
      }
    },
    userInfo() {
      return store.state.common.userInfo;
    },
    custList() {
      return store.state.customer.custList;
    },
    showB() {
      return this.$store.state.customer.showB;
    },
    brandAlllist() {
      return this.$store.state.customer.brandAlllist;
    }
  },
  components: {
    item,
    popup,
    top,
    slide,
    navs,
    popBrand
  },

  methods: {
    changeB(e, d) {
      if (d && d.id) {
        this.$store.state.customer.brandItem = d;
        this.$myApi.account.getCarModel(d.id).then(res => {
          this.$store.state.customer.modelList = res.modelList;
        });
      }
      this.demoData.show = true;
      this.$store.state.customer.showB = e;
    },
    filter(e) {
      this.demoData.show = e;
    },
    changeShow(e, d) {
      if (
        d.brandId ||
        d.custStatus ||
        d.customerType ||
        d.modelId ||
        d.salesId
      ) {
        if (d.custStatus) {
          this.demoData.custStatus = d.custStatus;
        }
        this.demoData.popdata = {
          brandId: d.brandId,
          customerType: d.customerType,
          modelId: d.modelId,
          salesId: d.salesId,
          page: 1,
          limit: 4
        };
      } else {
        this.demoData.popdata = {
          page: 1,
          limit: 4
        };
      }
      this.queryCustomer(this.demoData.popdata);
      this.demoData.show = e;
    },

    toMore() {
      let custStatus = "";
      let url =
        "/pages/customer/list/main?custStatus=" + this.demoData.custStatus;
      wx.navigateTo({
        url
      });
    },

    searchKeyword(e) {
      this.queryCustomer(e);
    },
    queryCustomer(data) {
      if (this.demoData.custStatus === "HABC") {
        Object.assign(data, {
          statusList: ["H", "A", "B", "C"]
        });
      } else if (this.demoData.custStatus === "Q") {
        Object.assign(data, {
          trackingStatus: "Q"
        });
      } else {
        Object.assign(data, {
          status: this.demoData.custStatus
        });
      }
      this.$api.queryCustomer(data).then(res => {
        store.commit("customer/getCustList", res.page);
      });
    }
  },

  onShow() {
    this.$api.homePage({}).then(res => {
      res.custList.list.forEach(data => {
        data.phone = data.customerPhone;
      });
      store.commit("common/getUserInfo", res.userInfo);
      store.commit("customer/getCustList", res.custList);
      this.demoData.bannerList = res.bannerList;
      if (res.userInfo.roleType === "1") {
        this.$api.querySalesList({}).then(res => {
          this.$store.state.customer.userList = res.userList;
        });
        this.demoData.custStatus = "D";
        this.demoData.navs[0].number = res.custList.totalCount;
        this.demoData.navs[1].number = res.total_N;
        this.demoData.navs[2].number = res.total_HABC;
        this.demoData.navs[3].number = res.total_Q;
        this.demoData.navs[4].number = res.total_O;
        this.demoData.navs[5].number = res.total_L;
        this.demoData.navs[6].number = res.total_F;
      } else {
        this.demoData.custStatus = "N";
        this.demoData.navs = [
          {
            name: "待跟进",
            number: res.custList.totalCount,
            image: "/static/images/customers/cn7.png",
            custStatus: "N"
          },
          {
            name: "跟进中",
            number: res.total_HABC,
            image: "/static/images/customers/cn2.png",
            custStatus: "HABC"
          },
          {
            name: "到店",
            number: res.total_Q,
            image: "/static/images/customers/cn3.png",
            custStatus: "Q"
          },
          {
            name: "成交",
            number: res.total_O,
            image: "/static/images/customers/cn4.png",
            custStatus: "O"
          },
          {
            name: "战败",
            number: res.total_L,
            image: "/static/images/customers/cn5.png",
            custStatus: "L"
          },
          {
            name: "无效",
            number: res.total_F,
            image: "/static/images/customers/cn6.png",
            custStatus: "F"
          }
        ];
      }
    });
    this.$api.getAllBrandList({}).then(res => {
      this.$store.state.customer.brandList = res.brandList;
      this.$store.state.customer.brandAlllist = res.brandList;
    });
  }
};
</script>

<style lang="less">
.page-customer {
  margin: 0px 10px;
  padding-bottom: 20px;

  .van-tabbar::-webkit-scrollbar {
    display: none;
  }

  .van-tabbar {
    height: 150rpx;
    margin-bottom: 58rpx;
    overflow-y: hidden;
    overflow-x: auto;
    position: inherit !important;
    .van-tabbar-item--active {
      color: #010101 !important;
    }

    .van-info {
      right: -17px;
      top: 5px;
    }
  }

  .customer-list {
    .customer-title {
      width: 100%;
      text-align: center;
      font-size: 28rpx;
      color: #414141;
      margin-bottom: 30rpx;
    }

    .customer-more {
      text-align: center;
      margin: 40rpx;
      font-size: 30rpx;
      color: #000;
    }
  }
}
</style>
