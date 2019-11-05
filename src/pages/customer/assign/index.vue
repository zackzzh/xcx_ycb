<template>
  <div class="page-customerList">
    <!-- 头部 -->
    <top :keyword="data.keyword" :show="listShow" @keyword="searchKeyword" @show="filter"></top>
    <!-- 中间列表 -->
    <item :list="list" :checkAll="data.checkAll" @checKOut="checkChange"></item>
    <div v-if="listLoad">
      <van-loading type="spinner" color="#000"/>
    </div>
    <div class="button">
      <van-button round="true" @click="comfirm">确认分配</van-button>
    </div>
    <!-- 弹窗筛选 -->
    <popup position="right" :show="listShow" @outShow="changeShow" :brandList="brandList"></popup>
    <pop-brand :show="showB" position="right" @outShow="changeB" :brandList="brandAlllist"></pop-brand>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
import store from "@/store";
import popBrand from "@/components/popBrand.vue";
import popup from "@/components/customer/popup";
import top from "@/components/customer/assign/top";
import item from "@/components/customer/assign/item";
import assignData from "./assignData";
export default {
  data() {
    return {
      data: assignData
    };
  },
  components: {
    popup,
    top,
    item,
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
      return store.state.customer.assignList;
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
    brandAlllist() {
      return this.$store.state.customer.brandAlllist;
    }
  },
  methods: {
    filter(e) {
      store.state.customer.listShow = e;
    },
    reload() {
      this.data.list = [];
      this.data.page = 1;
      this.data.limit = 4;
    },
    checkChange(e) {
      this.data.checkAll = e;
    },
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
    changeShow(e, d) {
      this.reload();
      this.data.checkAll = false;
      if (
        d.brandId ||
        d.custStatus ||
        d.customerType ||
        d.modelId ||
        d.salesId
      ) {
        this.data.popdata = {
          brandId: d.brandId,
          custStatus: d.custStatus,
          customerType: d.customerType,
          salesId: d.salesId,
          modelId: d.modelId
        };
      } else {
        this.data.popdata = {};
      }
      this.queryCustomer(this.data.popdata);
      store.state.customer.listShow = e;
    },
    searchKeyword(e) {
      this.reload();
      this.queryCustomer(e);
    },
    comfirm() {
      let list = this.data.list.filter(data => {
        return data.checked === true;
      });
      if (list.length === 0) {
        this.$toast("请选择需要分配的客源~");
      } else {
        let url = "/pages/customer/people/main?list=" + JSON.stringify(list);
        wx.navigateTo({
          url
        });
      }
    },
    queryCustomer(data) {
      this.$api.queryCustomer(data).then(res => {
        if (res.page.list.length > 0) {
          res.page.list.forEach(data => {
            data.checked = false;
            this.data.list.push(data);
          });
          store.commit("customer/getAssign", this.data.list);
          if (res.page.list.length === this.data.limit) {
            store.state.customer.listLoad = true;
          } else {
            store.state.customer.listLoad = false;
          }
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
      custStatus: "D",
      limit: this.data.limit,
      page: this.data.page
    };
    this.queryCustomer(data);
  },
  onReachBottom() {
    if (store.state.customer.listLoad) {
      this.data.page++;
      let data = {
        custStatus: "D",
        limit: this.data.limit,
        page: this.data.page
      };
      this.queryCustomer(data);
    }
  },
  onShow: function() {
    this.reload();
    store.state.customer.listLoad = false;
    this.data.keyword = "";
    let data = {
      custStatus: "D",
      limit: this.data.limit,
      page: this.data.page
    };
    this.queryCustomer(data);
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

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);

    .van-button {
      width: 480rpx;
      background: linear-gradient(to right, #556fe3, #7abcf3);
      color: #fff;
    }
  }
}
</style>
