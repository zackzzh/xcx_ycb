<template>
  <div class="page-detail">
    <div class="detail-top">
      <image src="/static/images/customers/detail.png" mode="widthFix"></image>
      <div class="top-releative">
        <div class="top-info">
          <div class="info-name">{{custInfo.customerName}}</div>
          <div class="info-mobile">{{custInfo.customerPhoneEncrypt}}</div>
          <span class="area">{{custInfo.customerProvince}} - {{custInfo.customerCity}}</span>
          <div class="info-list">
            <span :class="{'active':custStatus==='H'}" @click="custStatusChange('H')">H</span>
            <span :class="{'active':custStatus==='A'}" @click="custStatusChange('A')">A</span>
            <span :class="{'active':custStatus==='B'}" @click="custStatusChange('B')">B</span>
            <span :class="{'active':custStatus==='C'}" @click="custStatusChange('C')">C</span>
          </div>
        </div>
        <div class="top-list">
          <van-cell
            title="跟进负责人"
            :value="custInfo.salesname"
            v-if="userInfo.roleType === '1'"
            is-link
            @click="datetime(4)"
          />
          <van-cell title="跟进负责人" :value="custInfo.salesname" v-else/>
          <van-cell title="跟进时间" :value="trackingDate" is-link @click="datetime(1)"/>
          <van-cell title="品牌" :value="custInfo.brandName" is-link @click="datetime(2)"/>
          <van-cell title="型号" :value="custInfo.modelName" is-link @click="datetime(3)"/>
          <pop-brand
            :position="'right'"
            :show="showB"
            @outShow="changeShow"
            :brandList="brandAlllist"
          ></pop-brand>
        </div>
        <van-popup
          :show="showM"
          @click-overlay="onClose(2)"
          position="'bottom'"
          @close="onClose(2)"
          v-if="showM"
          custom-style="top:58%;left: 0%;width: 750rpx"
        >
          <van-picker
            :columns="modelList"
            @change="change($event,2)"
            value-key="model"
            show-toolbar
            title="选择型号"
            @confirm="comfirm($event,2)"
            @cancel="cancel(2)"
          />
        </van-popup>
        <van-popup
          :show="showS"
          @click-overlay="onClose(3)"
          position="'bottom'"
          @close="onClose(3)"
          v-if="showS"
          custom-style="top:58%;left: 0%;width: 750rpx"
        >
          <van-picker
            :columns="userList"
            @change="change($event,3)"
            value-key="username"
            show-toolbar
            title="选择销售员"
            @confirm="comfirm($event,3)"
            @cancel="cancel(3)"
          />
        </van-popup>
        <van-popup
          :show="show"
          @click-overlay="onClose(1)"
          position="'bottom'"
          @close="onClose(1)"
          v-if="show"
          custom-style="top:58%;left: 0%;width: 750rpx"
        >
          <van-datetime-picker
            type="datetime"
            :title="valuet"
            :value="currentDate"
            @confirm="comfirm($event,1)"
            @change="change($event,1)"
            @cancel="cancel(1)"
            :loading="true"
          />
        </van-popup>
      </div>
    </div>
    <div class="mid-nav">
      <div
        class="nav-item"
        v-for="(item, index) in navs"
        :key="index"
        @click="tabs(index,item.custStatus)"
      >
        <image :src="item.image" mode="widthFix" v-if="key == index"></image>
        <div class="item-content">
          <div class="dit" v-if="key == index" :class="{'five':index==navs.length-1}"></div>
          <div class="item-sround" :style="{background:item.background?item.background :''}"></div>
          <div
            class="line"
            :style="{background:item.background?item.background :''}"
            v-if="index<navs.length-1"
          ></div>
        </div>
        <div :class="{'one':index==0}">{{item.name}}</div>
      </div>
    </div>
    <div class="mid-content">
      <van-cell title="上传发票" is-link v-if="key==='2'" @click="toInvoice"/>
      <div class="content-item">
        <div class="item-left">付款类型</div>
        <div class="item-right">
          <div class="button">
            <div class="button-item" :class="{'button-active':pay}" @click="cutover(0)">全款</div>
            <div class="button-item" :class="{'button-active':!pay}" @click="cutover(0)">贷款</div>
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="item-left">是否置换</div>
        <div class="item-right">
          <div class="button">
            <div class="button-item" :class="{'button-active':swap}" @click="cutover(1)">是</div>
            <div class="button-item" :class="{'button-active':!swap}" @click="cutover(1)">否</div>
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="item-left">上牌城市</div>
        <div class="item-right">
          <div class="button">
            <div class="button-item" :class="{'button-active':board}" @click="cutover(2)">本地</div>
            <div class="button-item" :class="{'button-active':!board}" @click="cutover(2)">异地</div>
          </div>
        </div>
      </div>
      <van-cell title="备注" is-link @click="toRemark"/>
    </div>
    <div class="detail-button">
      <van-button round="true" @click="save">保存</van-button>
    </div>
    <record :recordList="recordList"></record>
    <van-toast id="van-toast"/>
  </div>
</template>
<script>
import utils from "@/utils/index";
import popBrand from "@/components/popBrand";
import record from "./record";
export default {
  data() {
    return {
      position: "right",
      modelList: [],
      showB: false,
      showM: false,
      showS: false,
      custId: "",
      custStatus: "",
      trackingDate: "请选择",
      valuet: "",
      show: false,
      key: null,
      pay: false,
      swap: false,
      board: false,
      currentDate: new Date().getTime(),
      custInfo: {},
      recordList: [],
      brandId: "",
      modelId: "",
      navs: [
        {
          name: "跟进中",
          background: "#3199DC",
          custStatus: "N",
          image: "/static/images/customers/detailActive.png"
        },
        {
          name: "到店",
          background: "#2facb6",
          custStatus: "Q",
          image: "/static/images/customers/detailActive1.png"
        },
        {
          name: "成交",
          background: "#2cba9a",
          custStatus: "O",
          image: "/static/images/customers/detailActive2.png"
        },
        {
          name: "战败",
          custStatus: "L",
          background: "#35af8c",
          image: "/static/images/customers/detailActive3.png"
        },
        {
          name: "失效",
          custStatus: "F",
          background: "#2acd71",
          image: "/static/images/customers/detailActive4.png"
        }
      ]
    };
  },
  components: {
    popBrand,
    record
  },
  computed: {
    userList() {
      return this.$store.state.customer.userList;
    },
    userInfo() {
      return this.$store.state.common.userInfo;
    },
    brandAlllist() {
      return this.$store.state.customer.brandAlllist;
    }
  },
  methods: {
    changeShow(e, d) {
      if (d.id) {
        this.custInfo.brandName = d.name;
        this.custInfo.modelName = "请选择";
        this.modelId = "";
        this.brandId = d.id;
        this.$myApi.account.getCarModel(d.id).then(res => {
          this.modelList = res.modelList;
        });
      }
      this.showB = e;
    },
    tabs(index, item) {
      if (index !== 1) {
        this.custStatus = item;
      }
      this.key = String(index);
    },
    datetime(index) {
      switch (index) {
        case 1:
          this.show = true;
          let date = new Date();
          this.valuet = utils.formatTime(date, 0);
          break;
        case 2:
          this.showB = true;
          break;
        case 3:
          this.showM = true;
          break;
        case 4:
          this.showS = true;
          break;
      }
    },
    custStatusChange(status) {
      if (this.key === "1" || this.key === "0") {
        this.custStatus = status;
      }
    },
    change(e, index) {
      switch (index) {
        case 1:
          const year =
            e.mp.detail.children[0].data.initialOptions[
              e.mp.detail.children[0].data.currentIndex
            ];
          const month =
            e.mp.detail.children[1].data.initialOptions[
              e.mp.detail.children[1].data.currentIndex
            ];
          const day =
            e.mp.detail.children[2].data.initialOptions[
              e.mp.detail.children[2].data.currentIndex
            ];
          const hour =
            e.mp.detail.children[3].data.initialOptions[
              e.mp.detail.children[3].data.currentIndex
            ];
          const second =
            e.mp.detail.children[4].data.initialOptions[
              e.mp.detail.children[4].data.currentIndex
            ];
          this.valuet =
            year + "-" + month + "-" + day + "  " + hour + ":" + second;
          break;
        case 2:
          break;
        case 3:
          break;
      }
    },
    onClose(index) {
      switch (index) {
        case 1:
          this.show = false;
          break;
        case 2:
          this.showM = false;
          break;
        case 3:
          this.showS = false;
          break;
      }
    },
    cancel(index) {
      switch (index) {
        case 1:
          this.show = false;
          break;
        case 2:
          this.showM = false;
          break;
        case 3:
          this.showS = false;
          break;
      }
    },
    comfirm(e, index) {
      switch (index) {
        case 1:
          this.show = false;
          let d = new Date(e.mp.detail);
          this.trackingDate = utils.formatTime(d, 0);
          break;
        case 2:
          this.custInfo.modelName = e.mp.detail.value.model;
          this.modelId = e.mp.detail.value.id;
          this.showM = false;
          break;
        case 3:
          this.custInfo.salesname = e.mp.detail.value.username;
          this.custInfo.salesId = e.mp.detail.value.userId;
          this.showS = false;
          break;
      }
    },
    toRemark() {
      let url = "/pages/customer/remark/main";
      wx.navigateTo({
        url
      });
    },
    toInvoice() {
      let url =
        "/pages/customer/invoice/main?custId=" + this.custId + "&index=2";
      wx.navigateTo({
        url
      });
    },
    cutover(index) {
      switch (index) {
        case 0:
          this.pay = !this.pay;
          break;
        case 1:
          this.swap = !this.swap;
          break;
        case 2:
          this.board = !this.board;
          break;
      }
    },
    save() {
      let custPaymentMode;
      let isReplace;
      let custLicenseCity;
      if (this.pay) {
        custPaymentMode = "全款";
      } else {
        custPaymentMode = "贷款";
      }
      if (this.swap) {
        isReplace = 1;
      } else {
        isReplace = 0;
      }
      if (this.board) {
        custLicenseCity = "本地";
      } else {
        custLicenseCity = "异地";
      }
      if (this.trackingDate === "请选择") {
        this.trackingDate = null;
      } else {
        if (this.trackingDate.length < 19) {
          this.trackingDate = this.trackingDate + ":00";
        }
      }
      let data = {
        remark: this.$store.state.common.remark,
        id: this.custId,
        custStatus: this.custStatus,
        trackingDate: this.trackingDate,
        salesId: this.custInfo.salesId,
        brandId: this.brandId,
        modelId: this.modelId,
        custPaymentMode: custPaymentMode,
        isReplace: isReplace,
        custLicenseCity: custLicenseCity
      };
      if (this.key === "1") {
        Object.assign(data, {
          trackingStatus: "Q"
        });
      }
      this.$api.addTrackingRecord(data).then(res => {
        wx.navigateBack({
          success: () => {
            this.$store.state.customer.list = [];
            this.$toast.success(res.msg);
          }
        });
      });
    }
  },
  onLoad: function(options) {
    this.modelData = [];
    this.trackingDate = "请选择";
    this.valuet = "";
    this.show = false;
    this.pay = false;
    this.swap = false;
    this.board = false;
    this.currentDate = new Date().getTime();
    this.custId = options.custId;
    console.log("custId", this.custId);
    this.$api
      .queryDetail({
        custId: this.custId
      })
      .then(res => {
        this.custStatus = res.custInfo.custStatus;
        switch (this.custStatus) {
          case "H":
          case "A":
          case "B":
          case "N":
          case "D":
          case "C":
            if (res.custInfo.trackingStatus === "Q") {
              this.key = "1";
            } else {
              this.key = "0";
            }
            break;
          case "O":
            this.key = "2";
            break;
          case "L":
            this.key = "3";
            break;
          case "F":
            this.key = "4";
            break;
        }
        if (this.custStatus === "N") {
          this.custStatus = "H";
        }
        if (res.custInfo.custPaymentMode) {
          this.pay = true;
        } else {
          this.pay = false;
        }
        if (res.custInfo.custLicenseCity) {
          this.board = true;
        } else {
          this.board = false;
        }
        if (res.custInfo.isReplace === "0") {
          this.swap = false;
        } else {
          this.swap = true;
        }
        if (res.custInfo.trackingDate) {
          this.trackingDate = res.custInfo.trackingDate;
        }
        this.brandId = res.custInfo.brandId;
        this.modelId = res.custInfo.modelId;
        this.custInfo = res.custInfo;
        this.recordList = res.recordList;
      });
  }
};
</script>

<style lang="less">
.page-detail {
  .van-cell {
    padding: 10px 0px;
  }

  .van-cell__value {
    font-size: 26rpx;
    min-width: 400rpx;
  }

  .detail-top {
    display: flex;
    justify-content: center;
    position: relative;

    image {
      width: 100%;
      position: absolute;
      z-index: 10;
    }

    .top-releative {
      position: relative;
      z-index: 11;
      width: 100%;
      padding: 0px 32rpx;

      .top-info {
        margin: 0 auto;
        box-sizing: border-box;
        padding: 30rpx 60rpx 50rpx 60rpx;
        box-shadow: 2rpx 2rpx 5rpx #999;
        height: 300rpx;
        margin-top: 180rpx;
        border-radius: 12rpx;
        background-color: #fff;
        width: 510rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 50rpx;

        .info-name {
          color: #010101;
          font-size: 32rpx;
          margin-bottom: 10rpx;
        }

        .info-mobile {
          color: #4c4c4c;
          font-size: 30rpx;
          margin-bottom: 20rpx;
        }

        .area {
          display: inline-block;
          text-align: center;
          padding: 10rpx;
          font-size: 20rpx;
          color: #fff;
          background-color: #b4b4b4;
          border-radius: 25px;
          margin-bottom: 20rpx;
        }

        .info-list {
          span {
            display: inline-block;
            width: 80rpx;
            height: 40rpx;
            text-align: center;
            line-height: 40rpx;
            font-size: 24rpx;
            border: 1px solid #000;
            color: #000;
            border-radius: 10rpx;
            margin-right: 8px;
          }

          span:nth-last-child(1) {
            margin-right: 0px;
          }

          .active {
            color: #fff;
            background: #000;
          }
        }
      }

      .popBrand {
        top: 58%;
        left: 0%;
        width: 750rpx;

        .van-picker__title {
          max-width: 55%;
        }
      }
    }
  }

  .mid-nav {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 10;
    padding: 60rpx 150rpx;

    .nav-item {
      display: flex;
      flex-direction: column;
      font-size: 20rpx;
      color: #4c4c4c;
      position: relative;

      .item-content {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 6rpx;
        position: relative;

        .line {
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          width: 62rpx;
          height: 6rpx;
        }

        .dit {
          position: absolute;
          top: 50%;
          left: 12%;
          transform: translate(-12%, -50%);
          width: 20rpx;
          height: 20rpx;
          border-radius: 50%;
          background: #fff;
        }

        .five {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .item-sround {
          width: 40rpx;
          height: 40rpx;
          border-radius: 50px;
        }
      }
    }

    .one {
      position: relative;
      left: -5px;
    }

    image {
      position: absolute;
      top: -26rpx;
      width: 24rpx;
      height: 24rpx;
      left: 4px;
    }
  }

  .mid-content {
    padding: 0 32rpx;
    margin-bottom: 70rpx;

    .content-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      font-size: 14px;
      line-height: 24px;
      color: #333;
      width: 100%;
      box-sizing: border-box;
      border-bottom: 1rpx solid #e5e5e5;

      .item-left {
        flex: 1;
      }

      .item-right {
        flex: 1;
        min-width: 400rpx;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 12px;

        .button {
          display: flex;
          align-items: center;
          height: 40rpx;
          line-height: 40rpx;
          color: #c3c4c4;
          background: #fff;
          border: 1px solid #585858;
          border-radius: 10rpx;

          .button-item {
            width: 80rpx;
            text-align: center;
          }

          &-active {
            background: #585858;
            color: #fff;
          }
        }
      }
    }
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
      background: linear-gradient(to right, #556fe3, #7abcf3);
      color: #fff;
    }
  }
}
</style>
