<template>
  <!-- 交易记录 -->
  <div class="tradeDivType">
    <div class="nav">
      <div @click="handleSwiper(0)" :class="{'active':active==0}" class="item">
        <div class="item-title">线索订单</div>
      </div>
      <div @click="handleSwiper(1)" :class="{'active':active==1}" class="item">
        <div class="item-title">充值订单</div>
      </div>
    </div>
    <Item
      v-for="(item, index) in list"
      :key="index"
      :item="item"
      @cancel="handelCancel"
      :active="active"
    ></Item>
    <van-toast id="van-toast"/>
    <div v-if="load">
      <van-loading type="spinner" color="#000"/>
    </div>
  </div>
</template>
<script>
import Item from "./item";
export default {
  data() {
    return {
      page: 1,
      limit: 5,
      list: [],
      load: false,
      active: 0
    };
  },
  onShow: function() {
    this.active = 0;
    this.load = false;
    this.reload();
    let data = {
      page: 1,
      limit: 5
    };
    this.queryOrder(data);
  },
  components: {
    Item
  },
  methods: {
    queryOrder(data) {
      this.$myApi.trade.queryOrder(data).then(res => {
        if (res.page.list.length > 0) {
          res.page.list.forEach(data => {
            this.list.push(data);
          });
          if (res.page.list.length === this.limit) {
            this.load = true;
          } else {
            this.load = false;
          }
        } else {
          this.load = false;
        }
      });
    },
    queryRechargeOrder(data) {
      this.$myApi.trade.queryRechargeOrder(data).then(res => {
        if (res.page.list.length > 0) {
          res.page.list.forEach(data => {
            this.list.push(data);
          });
          if (res.page.list.length === this.limit) {
            this.load = true;
          } else {
            this.load = false;
          }
        } else {
          this.load = false;
        }
      });
    },
    reload() {
      this.list = [];
      this.limit = 5;
      this.page = 1;
    },
    handleSwiper(index) {
      this.reload();
      let data = {
        page: 1,
        limit: 5
      };
      this.active = index;
      // return;
      switch (index) {
        case 0:
          this.queryOrder(data);
          break;
        default:
          this.queryRechargeOrder(data);
          break;
      }
    },
    handelCancel(e) {
      this.reload();
      let data = {
        page: 1,
        limit: 5
      };
      if (e) {
        this.$toast.success(e.msg);
        if (this.active === 0) {
          this.queryOrder(data);
        } else {
          this.queryRechargeOrder(data);
        }
      }
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
    this.load = true;
    this.reload();
    let data = {
      limit: this.limit,
      page: this.page
    };
    switch (this.active) {
      case 0:
        this.queryOrder(data);
        break;
      default:
        this.queryRechargeOrder(data);
        break;
    }
  },
  onReachBottom() {
    if (this.load) {
      this.page++;
      let data = {
        limit: this.limit,
        page: this.page
      };
      switch (this.active) {
        case 0:
          this.queryOrder(data);
          break;
        default:
          this.queryRechargeOrder(data);
          break;
      }
    }
  }
};
</script>

<style lang="less">
.tradeDivType {
  .van-loading {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  .nav {
    background: #fafafa;
    margin-bottom: 20rpx;
    display: flex;
    align-items: center;
    height: 80rpx;
    width: 100%;

    .item {
      flex: 1 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: inherit;
      line-height: 80rpx;
      background-color: #d3edfb;

      .item-title {
        width: 120rpx;
        height: inherit;
        line-height: 80rpx;
        position: relative;
        text-align: center;
        font-size: 28rpx;
      }
    }

    .active {
      color: #0080ff;

      .item-title {
        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          content: "";
          width: 100%;
          height: 0;
          border: 1px solid #0080ff;
        }
      }
    }
  }
}
</style>
