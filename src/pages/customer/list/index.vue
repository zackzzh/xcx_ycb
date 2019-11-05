<template>
  <div class="page-customerList">
    <top
      :keyword="data.keyword"
      :show="listShow"
      @keyword="searchKeyword"
      @show="filter"
      :status="status"
    ></top>
    <!-- 底部列表 -->
    <item v-for="(item, index) in list" :key="index" :item="item"></item>
    <div v-if="listLoad">
      <van-loading type="spinner" color="#000"/>
    </div>
    <!-- 弹窗筛选 -->
    <popup position="right" :show="listShow" @outShow="changeShow" :brandList="brandList"></popup>
    <pop-brand :show="showB" position="right" @outShow="changeB" :brandList="brandAlllist"></pop-brand>
  </div>
</template>

<script>
import listData from "./listData";
import item from "@/components/customer/item";
import top from "@/components/customer/list/top";
import popBrand from "@/components/popBrand.vue";
import store from "@/store";
import popup from "@/components/customer/popup";
export default {
  data() {
    return {
      data: listData
    };
  },
  components: {
    item,
    popup,
    top,
    popBrand
  },
  computed: {
    brandList() {
      if (this.$store.state.customer.brandList.length > 8) {
        return this.$store.state.customer.brandList.slice(0, 8);
      } else {
        return this.$store.state.customer.brandList;
      }
    },
    list() {
      return store.state.customer.list;
    },
    listShow() {
      return store.state.customer.listShow;
    },
    listLoad() {
      return store.state.customer.listLoad;
    },
    showB() {
      return this.$store.state.customer.showB;
    },
    status() {
      return store.state.customer.status;
    },
    brandAlllist() {
      return this.$store.state.customer.brandAlllist;
    }
  },
  methods: {
    changeB(e, d) {
      if (d && d.id) {
        this.$store.state.customer.brandItem = d;
        this.$myApi.account.getCarModel(d.id).then(res => {
          this.$store.state.customer.modelList = res.modelList;
        });
      }
      store.state.customer.listShow = true;
      this.$store.state.customer.showB = e;
    },
    filter(e) {
      store.state.customer.listShow = e;
    },
    setTitle(status) {
      var title = "";
      switch (status) {
        case "D":
          title = "待分配";
          break;
        case "N":
          title = "待跟进";
          break;
        case "HABC":
          title = "跟进中";
          break;
        case "Q":
          title = "到店";
          break;
        case "O":
          title = "成交";
          break;
        case "L":
          title = "战败";
          break;
        case "F":
          title = "无效";
          break;
        default:
          title = "所有";
          break;
      }
      wx.setNavigationBarTitle({
        title: title + "客源"
      });
    },
    reload() {
      this.data.list = [];
      this.data.page = 1;
      this.data.limit = 4;
    },
    changeShow(e, d) {
      this.reload();
      store.state.customer.list = [];
      if (
        d.brandId ||
        d.custStatus ||
        d.customerType ||
        d.modelId ||
        d.salesId
      ) {
        store.state.customer.status = d.custStatus;
        this.data.popdata = {
          brandId: d.brandId,
          customerType: d.customerType,
          modelId: d.modelId,
          salesId: d.salesId,
          page: 1,
          limit: 4
        };
      } else {
        this.data.popdata = {
          page: 1,
          limit: 4
        };
      }
      this.queryCustomer(this.data.popdata);
      store.state.customer.listShow = e;
    },
    searchKeyword(e) {
      this.reload();
      this.queryCustomer(e);
    },

    queryCustomer(data) {
      if (store.state.customer.status === "HABC") {
        Object.assign(data, {
          statusList: ["H", "A", "B", "C"]
        });
      } else if (store.state.customer.status === "Q") {
        Object.assign(data, {
          trackingStatus: "Q"
        });
      } else {
        Object.assign(data, {
          status: store.state.customer.status
        });
      }
      this.setTitle(store.state.customer.status);
      this.$api.queryCustomer(data).then(res => {
        if (res.page.list.length > 0) {
          res.page.list.forEach((data, index) => {
            this.data.list.push(data);
            if (res.page.list.length - 1 === index) {
              store.state.customer.list = this.data.list;
              if (res.page.list.length === this.data.limit) {
                store.state.customer.listLoad = true;
              } else {
                store.state.customer.listLoad = false;
              }
            }
          });
        } else {
          store.state.customer.listLoad = false;
        }
      });
    }
  },
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    //模拟加载
    setTimeout(function() {
      // complete
      wx.hideNavigationBarLoading(); //完成停止加载
      wx.stopPullDownRefresh(); //停止下拉刷新
    }, 1500);
    this.reload();
    store.state.customer.listLoad = true;
    let data = {
      limit: this.data.limit,
      page: this.data.page
    };
    this.queryCustomer(data);
  },
  onReachBottom() {
    if (store.state.customer.listLoad) {
      store.state.customer.listLoad = false;
      this.data.page++;
      let data = {
        limit: this.data.limit,
        page: this.data.page
      };
      this.queryCustomer(data);
    }
  },
  onShow: function() {
    this.reload();
    store.state.customer.listLoad = false;
    let data = {
      limit: this.data.limit,
      page: this.data.page
    };
    this.queryCustomer(data);
  },
  onLoad: function(options) {
    store.state.customer.status = options.custStatus;
  }
};
</script>

<style lang="less">
.van-loading {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.page-customerList {
  margin: 0px 10px;
  padding-bottom: 20px;

  .van-popup {
    width: 660rpx;
    height: 100%;
  }
}
</style>
