<template>
  <div>
    <van-popup
      :show="show"
      :position="position"
      @close="onClose"
    >
      <div class="popup-content">
        <div class="drawer-one">
          <div class="drawer-title">状态</div>
          <div class="drawer-list">
            <div
              :class="['drawer-item',item.custStatus == popData.statusKey?'drawer-item-active':'']"
              v-for="(item, index) in status"
              :key="index"
              @click="changeStatus(0,item.custStatus)"
            >
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
        <div class="drawer-one" v-if="userList.length>0">
          <div class="drawer-title">销售顾问</div>
          <div class="drawer-list">
            <div
              :class="['drawer-item',item.userId == popData.saleKey?'drawer-item-active':'']"
              v-for="(item, index) in userList"
              :key="index"
              @click="changeStatus(4,item.userId)"
            >
              <span>{{item.username}}</span>
            </div>
          </div>
        </div>
        <div class="drawer-one" v-if="brandList && brandList.length>0">
          <div class="drawer-two">
            <div class="drawer-title">
              品牌
              <span>{{brandItem.name}}</span>
            </div>
            <div class="drawer-list" v-if="brandList.length>=8">
              <div
                :class="['drawer-item',item.id == popData.brandKey?'drawer-item-active':'']"
                v-for="(item, index) in brandList"
                :key="index"
                @click="changeStatus(1,item.id)"
              >
                <span>{{item.name}}</span>
              </div>
              <div
                :class="['drawer-item','all' == popData.brandKey?'drawer-item-active':'']"
                @click="changeStatus(1,'all')"
              >
                <span>全部</span>
              </div>
            </div>
            <div class="drawer-list" v-else>
              <div
                :class="['drawer-item',item.id == popData.brandKey?'drawer-item-active':'']"
                v-for="(item, index) in brandList"
                :key="index"
                @click="changeStatus(1,item.id)"
              >
                <span>{{item.name}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="drawer-one" v-if="modelList.length>0">
          <div class="drawer-two">
            <div class="drawer-title">车型</div>
            <div class="drawer-list">
              <div
                :class="['drawer-item',item.id == popData.modelKey?'drawer-item-active':'']"
                v-for="(item, index) in modelList"
                :key="index"
                @click="changeStatus(2,item.id)"
              >
                <span>{{item.model}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="drawer-one">
          <div class="drawer-two">
            <div class="drawer-title">线索</div>
            <div class="drawer-list">
              <div
                :class="['drawer-item',item.name == popData.typeKey?'drawer-item-active':'']"
                v-for="(item, index) in customerType"
                :key="index"
                @click="changeStatus(3,item.name)"
              >
                <span>{{item.label}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="drawer-footer">
        <button class="reset" @click="reset">重置</button>
        <button class="comfirm" @click="onClose">确定</button>
      </div>
    </van-popup>
  </div>
</template>
<script>
import store from "@/store";
export default {
  data() {
    return {
      positionB: "right",
      customerType: [
        {
          name: "T",
          label: "精准"
        },
        {
          name: "L",
          label: "普通"
        }
      ]
    };
  },
  props: ["position", "show", "brandList"],
  computed: {
    userList() {
      return this.$store.state.customer.userList;
    },
    modelList() {
      return this.$store.state.customer.modelList;
    },
    brandItem() {
      return this.$store.state.customer.brandItem;
    },
    popData() {
      return this.$store.state.customer.popData;
    },
    status() {
      if (store.state["common"]["userInfo"].roleType === "1") {
        return [
          {
            name: "待分配",
            custStatus: "D"
          },
          {
            name: "待跟进",
            custStatus: "N"
          },
          {
            name: "跟进中",
            custStatus: "HABC"
          },
          {
            name: "到店",
            custStatus: "Q"
          },
          {
            name: "成交",
            custStatus: "O"
          },
          {
            name: "战败",
            custStatus: "L"
          },
          {
            name: "无效",
            custStatus: "F"
          }
        ];
      } else {
        return [
          {
            name: "待跟进",
            custStatus: "N"
          },
          {
            name: "跟进中",
            custStatus: "HABC"
          },
          {
            name: "到店",
            custStatus: "Q"
          },
          {
            name: "成交",
            custStatus: "O"
          },
          {
            name: "战败",
            custStatus: "L"
          },
          {
            name: "无效",
            custStatus: "F"
          }
        ];
      }
    }
  },

  methods: {
    // 第二个弹窗返回brandItem
    onClose() {
      let data = {
        custStatus: this.$store.state.customer.popData.statusKey,
        brandId: this.$store.state.customer.brandItem.id,
        modelId: this.$store.state.customer.popData.modelKey,
        customerType: this.$store.state.customer.popData.typeKey,
        salesId: this.$store.state.customer.popData.saleKey
      };
      this.show = false;
      this.$emit("outShow", this.show, data);
    },
    reset() {
      this.$store.state.customer.brandItem = {};
      this.$store.state.customer.popData.statusKey = null;
      this.$store.state.customer.popData.brandKey = null;
      this.$store.state.customer.popData.modelKey = null;
      this.$store.state.customer.popData.typeKey = null;
      this.$store.state.customer.popData.saleKey = null;
    },
    getModel(id) {
      this.$myApi.account.getCarModel(id).then(res => {
        this.$store.state.customer.modelList = res.modelList;
      });
    },
    changeStatus(type, id) {
      if (id === "all") {
        this.$emit("outShow", false, {});
        this.$store.state.customer.showB = true;
        this.$store.state.customer.popData.brandKey = null;
      } else {
        switch (type) {
          case 0:
            this.$store.state.customer.popData.statusKey = id;
            break;
          case 1:
            this.$store.state.customer.popData.brandKey = id;
            this.$store.state.customer.brandItem.id = id;
            this.getModel(id);
            break;
          case 2:
            this.$store.state.customer.popData.modelKey = id;
            break;
          case 3:
            this.$store.state.customer.popData.typeKey = id;
            break;
          case 4:
            this.$store.state.customer.popData.saleKey = id;
            break;
        }
      }
    }
  }
};
</script>

<style lang="less">
.van-popup {
  width: 660rpx;
  height: 100%;

  .popup-content {
    overflow-y: auto;
    height: 90%;
  }

  .drawer-one {
    padding: 0 45rpx;

    .drawer-title {
      padding-top: 30rpx;
      font-size: 30rpx;
      color: #000000;
      margin-bottom: 38rpx;

      span {
        margin-left: 20px;
        font-size: 28rpx;
        color: #07ccbd;
      }
    }

    .drawer-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;

      .drawer-item {
        flex-basis: calc(33.3% - 20rpx);
        font-size: 24rpx;
        color: #808080;
        background: #f4f4f4;
        text-align: center;
        padding: 10px 0px;
        margin-right: 20rpx;
        margin-bottom: 30rpx;
        &:nth-child(3n) {
          margin-right: 0rpx !important;
        }
        &-active {
          color: #07ccbd;
          background: #e1fdff;
        }
      }
    }
  }

  .drawer-footer {
    position: fixed;
    bottom: 0;
    height: 100rpx;
    width: 100%;
    display: flex;
    align-items: center;

    .reset {
      color: #000;
      background: #fff;
      margin: 0;
      padding: 0;
      width: 50%;
      height: 100%;
      line-height: 100rpx;
      text-align: center;
      font-size: 30rpx;
      border: none;
      border-radius: 0;
    }

    .comfirm {
      border-radius: 0;
      color: #fff;
      background: #07ccbd;
      margin: 0;
      padding: 0;
      width: 50%;
      height: 100%;
      line-height: 100rpx;
      text-align: center;
      font-size: 30rpx;
      border: none;
    }
  }
}
</style>
