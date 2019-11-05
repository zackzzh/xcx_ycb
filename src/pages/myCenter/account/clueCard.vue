<template>
  <!-- 线索卡 -->
  <div class="clueDivType">
    <!-- 线索卡 -->
    <!-- L线索和T线索 -->
    <div v-for="item in demoData" :key="item.id">
      <div v-if="configInfo[item.state] === '1'">
        <div class="titleType">{{item.title}}</div>
        <div class="cellDivType">
          <!-- L列表和T列表 -->
          <van-cell
            title-width="90rpx"
            :title="cellItem.title"
            v-for="(cellItem, indexI) in item.list"
            :id="cellItem.varType"
            :key="cellItem.indexCell"
            @click="handlerCell(item,cellItem)"
          >
            <div>{{valueData[item.varType][cellItem.varType]}}</div>
            <div class="arrowType" slot="right-icon"></div>
          </van-cell>
          <!-- 多择框   
            chooseLPrice: false, //选择L线索
            chooseTPrice: false, //选择T线索
            choosePoints: false //选择积分
          -->
          <div class="selectDivType" @click="handlerSelect(item)">
            <div class="selectType">
              <van-icon
                v-if="item.varType === 'lPrice'? chooseLPrice: chooseTPrice"
                name="success"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 品牌，车型，城市，数量，弹窗 -->
    <clue-popup
      :isShow="isShowPopup"
      :position="popupPosition"
      :varType="varType"
      :cellVarType="cellVarType"
      :brandList="brandFun"
      :lModelList="lModelList"
      :tModelList="tModelList"
      :city="cityFun"
      :letterArr="letterArr"
      @onClose="onClose"
      @getModelById="getModelById"
      @pickerChange="pickerChange"
      @cityConfirm="cityConfirm"
    />
    <!-- 积分卡 -->
    <div class="bottomDivType">
      <div class="titleType">
        是否使用积分
        <!-- 多选框 -->
        <div class="selectType" @click="handlerSelect('积分')">
          <van-icon v-if="choosePoints" name="success"/>
        </div>
      </div>
      <div class="payType">
        <van-row>
          <van-col span="6">
            <div>消耗积分</div>
          </van-col>
          <van-col custom-class="inputType" span="18">
            <van-field
              :value="inputValue"
              placeholder="请输入消耗积分"
              border="false"
              @change="inputChange"
            />
          </van-col>
        </van-row>

        <div>积分余额&nbsp;&nbsp;&nbsp;&nbsp;{{usedPointsFun}}</div>
      </div>
    </div>

    <!-- 支付方式 -->
    <pay-type
      :payType="orderPayType"
      :radioVal="radioVal"
      @radioChange="radioChange"
      @radioClick="radioClick"
    />

    <van-button custom-class="submitType" type="info" @click="handlerSubmit">确认</van-button>

    <!-- 订单弹框 -->
    <order-dialog
      :isShow="isShowDialog"
      :data="form"
      :balancePoints="balancePoints"
      @closeDialog="closeDialog"
    />
  </div>
</template>

<script>
import orderDialog from "./orderDialog";
import payType from "./payType";
import cluePopup from "./cluePopup";

import rechargeData from "./recharge/rechargeData";

import provinces from "./provinces";

export default {
  components: {
    orderDialog,
    payType,
    cluePopup
  },
  props: ["demoData", "balancePoints", "brandList", "configInfo"],
  onLoad() {
    // 展示数据，重置数据
    this.valueData = {
      lPrice: {
        title: "普通类型线索",
        brand: "",
        model: "",
        city: "",
        count: "",
        brandAndModel: null
      },
      tPrice: {
        title: "精准类型线索",
        brand: "",
        model: "",
        city: "",
        count: "",
        brandAndModel: null
      }
    };
    this.inputValue = null;
    this.chooseLPrice = false; //选择L线索
    this.chooseTPrice = false; //选择T线索
    this.choosePoints = false; //选择积分
  },
  computed: {
    // 品牌
    brandFun() {
      // 写字母
      const brand = this.brandList.map(item => {
        item.letter = item.namePinyin.match(/^\w{1}/)[0];
        item.key = item.namePinyin.match(/^\w+/)[0];
        return item;
      });

      const letterBrand = [];
      const letterBrandObj = {};
      // [{ this.letterArr
      //   title: "A",
      //   list: []
      // }]
      for (const item of this.letterArr) {
        letterBrandObj[item] = [];
        for (const o of brand) {
          if (o.letter === item) {
            letterBrandObj[item].push(o);
          }
        }
        letterBrandObj[item] = this.listSort(letterBrandObj[item]);
      }
      // for (const item of brand) {
      //   const index = this.letterArr.indexOf(item.letter);
      //   if (item.letter === this.letterArr[index]) {
      //     letterBrandObj[item.letter] = []
      //     letterBrandObj[item.letter].push(item);
      //     // letterBrand.push(item)
      //   } else {
      //   }
      // }
      // brand.map((item, index) => {
      //   // if (item.letter === letterBrand[item.letter]) {
      //   //   letterBrand[item.letter].push(item);
      // console.log("进来", letterBrandObj);
      //   // }
      // });
      // console.log("item,index", letterBrand, brand);

      // // 排序
      // brand.sort(function(a, b) {
      //   const nameA = a["namePinyin"].toUpperCase(); // ignore upper and lowercase
      //   const nameB = b["namePinyin"].toUpperCase(); // ignore upper and lowercase
      //   if (nameA < nameB) {
      //     return -1;
      //   }
      //   if (nameA > nameB) {
      //     return 1;
      //   }
      //   return 0;
      // });

      // const brand = this.brandList.sort(function(a, b) {
      //   const nameA = a["namePinyin"].toUpperCase(); // ignore upper and lowercase
      //   const nameB = b["namePinyin"].toUpperCase(); // ignore upper and lowercase
      //   if (nameA < nameB) {
      //     return -1;
      //   }
      //   if (nameA > nameB) {
      //     return 1;
      //   }
      //   return 0;
      // });

      // console.log("brand", brand);
      // return brand.map(item => {
      //   item.letter = item.namePinyin.match(/^\w{1}/)[0];
      //   item.key = item.namePinyin.match(/^\w+/)[0];
      //   return item;
      // });
      return letterBrandObj;
    },
    // 积分
    usedPointsFun() {
      const balancePoints = this.balancePoints.points - this.inputValue;
      if (balancePoints > 0) {
        return balancePoints || this.balancePoints.points;
      } else {
        return 0;
      }
    },
    // 城市
    cityFun() {
      return [{ values: this.provinces }, { values: this.provinces[0].city }];
    }
  },
  data() {
    return {
      orderPayType: rechargeData.orderPayType, // 支付方式表格
      radioVal: 0, // 单选默认项
      isShowDialog: false, //订单弹窗
      lModelList: [], // 模型列表
      tModelList: [], // 模型列表
      varType: "", // 判断是L 还是T
      cellVarType: null, // 线索cell对应的，品牌，车型，城市，数量，触发对应弹窗
      // 展示数据
      valueData: {
        lPrice: {
          title: "L类型线索",
          brand: "",
          model: "",
          city: "",
          count: "",
          brandAndModel: null
        },
        tPrice: {
          title: "T类型线索",
          brand: "",
          model: "",
          city: "",
          count: "",
          brandAndModel: null
        }
      },
      chooseLPrice: false, //选择L线索
      chooseTPrice: false, //选择T线索
      choosePoints: false, //选择积分
      form: {
        usedPoints: 0,
        list: {}
      },
      inputValue: null, // 积分
      isShowPopup: false, // 品牌，车型，城市，数量弹窗显示
      popupPosition: "right", // 品牌，车型，城市，数量弹窗显示位置
      provinces,
      letterArr: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ]
    };
  },
  methods: {
    listSort(val) {
      return val.sort(function(a, b) {
        const nameA = a["namePinyin"].toUpperCase(); // ignore upper and lowercase
        const nameB = b["namePinyin"].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    },
    handlerCell(val, value) {
      this.isShowPopup = true;
      // 触发单元格
      // 设置，当前是L , 还是T
      this.varType = val.varType;
      // 点击的是一行，品牌，车型，城市，数量popupPosition
      this.cellVarType = value.varType;
      if (value.varType === "brand") {
        this.popupPosition = "right";
      } else {
        this.popupPosition = "bottom";
      }
    },
    getModelById(val) {
      // // 选择的品牌，根据品牌ID获取型号
      // // 展示车品牌
      this.valueData[this.varType]["brand"] = val.name;
      Object.assign(this.valueData[this.varType], val);
      this.onClose();
    },
    pickerChange(val) {
      // 线索选择，数据整理
      const {
        mp: { detail },
        target: { id, value }
      } = val;
      if (id === "count") {
        // 当前选择的数量
        this.valueData[this.varType][id] = detail;
      }
    },
    inputChange(val) {
      // console.log("消耗积分数", val);
      const {
        mp: { detail }
      } = val;
      if (detail < this.balancePoints.points) {
        this.inputValue = detail;
      } else {
        this.inputValue = this.balancePoints.points;
      }
    },
    handlerSelect(val) {
      // 多选
      // chooseLPrice: false, //选择L线索
      // chooseTPrice: false, //选择T线索
      // choosePoints: false //选择积分
      if (val.id === "key02-1") {
        // 选择L
        this.chooseLPrice = !this.chooseLPrice;
      } else if (val.id === "key02-2") {
        // 选择T
        this.chooseTPrice = !this.chooseTPrice;
      } else if (val === "积分") {
        this.choosePoints = !this.choosePoints;
      }
    },
    radioChange(val) {
      // 选择支付方式
      const {
        mp: { detail }
      } = val;
      this.radioVal = parseInt(detail);
    },
    radioClick(val) {
      // console.log("触发单元格支付方式", val);
      this.radioVal = val;
    },
    handlerSubmit(val) {
      // 提交表单
      this.isShowDialog = true;

      this.form = {
        usedPoints: this.inputValue,
        list: {}
      };
      // chooseLPrice: false, //选择L线索
      // chooseTPrice: false, //选择T线索
      // choosePoints: false, //选择积分
      // 用户下单接口（购买线索），传入参数：
      // 普通线索参数lBrandId，lModelId，lCity，lNumber；
      // 精准线索参数tBrandId，tModelId，tCity，tNumber,
      // 使用积分数usedPoints，
      // 支付方式paymentType（0余额、1线下支付、2微信、3支付宝、4其他）选择余额支付时必须填
      if (this.chooseLPrice && this.chooseTPrice) {
        this.form.list = this.valueData;
        // lPrice线索总额
        const lPrice = this.valueData.lPrice.lPrice;
        const lCount = this.valueData.lPrice.count;
        this.form.lPriceSum = lPrice * lCount;
        // tPrice线索总额
        const tPrice = this.valueData.tPrice.tPrice;
        const tCount = this.valueData.tPrice.count;
        this.form.tPriceSum = tPrice * tCount;
        // Price线索总额
        this.form.priceSum = this.form.tPriceSum + this.form.lPriceSum;
      } else if (this.chooseLPrice) {
        this.form.list.lPrice = this.valueData.lPrice;
        // 线索总额
        const lPrice = this.valueData.lPrice.lPrice;
        const lCount = this.valueData.lPrice.count;
        this.form.lPriceSum = lPrice * lCount;
        // Price线索总额
        this.form.priceSum = this.form.lPriceSum;
      } else if (this.chooseTPrice) {
        this.form.list.tPrice = this.valueData.tPrice;
        // 线索总额
        const tPrice = this.valueData.tPrice.tPrice;
        const tCount = this.valueData.tPrice.count;
        this.form.tPriceSum = tPrice * tCount;
        // Price线索总额
        this.form.priceSum = this.form.tPriceSum;
      } else {
        this.isShowDialog = false;
        this.form = { usedPoints: 0, list: {} };
        this.$toast.fail("请选择线索");
      }
      if (!this.choosePoints) {
        this.form.usedPoints = 0;
      }
      // 是否使用积分
      // 支付方式
      this.form.radioVal = this.radioVal;
    },
    // 关闭订单层
    closeDialog(val) {
      this.isShowDialog = false;
    },
    onClose() {
      // 关闭蒙层, 品牌，车型，城市，数量，对应弹窗
      this.isShowPopup = false;
      this.cellVarType = null;
    },
    cityConfirm(val) {
      // 城市选择，确认城市Province
      const { picker, value, index } = val.mp.detail;
      this.valueData[this.varType]["city"] =
        value[0].name + " " + value[1].name;
      this.onClose();
    }
  }
};
</script>

<style lang="less">
.clueDivType {
  margin: 0 30rpx;
  overflow-y: hidden;
  .titleType {
    margin: 30rpx 0;
    font-weight: bold;
  }

  .cellDivType {
    margin: 0 30rpx;
    border-radius: 10rpx;
    text-align: left;
    box-shadow: 0 10rpx 24rpx 0 rgba(153, 174, 223, 0.2);
    .arrowType {
      margin: 18rpx 0 0 8rpx;
      border-radius: 6rpx;
      border-width: 16rpx;
      border-style: solid;
      border-color: #c1c2c2 transparent transparent transparent;
    }

    .selectDivType {
      // 选择框
      margin: 0 0 0 100%;
      padding: 20rpx 0;

      .selectType {
        width: 40rpx;
        height: 40rpx;
        margin-left: -60rpx;
        text-align: right;
        font-size: 40rpx;
        color: #9f9f9f;
        border: 2rpx solid #9f9f9f;
      }
    }
  }

  .bottomDivType {
    margin: 30rpx;
    padding: 30rpx;
    text-align: left;
    box-shadow: 0 10rpx 24rpx 0 rgba(153, 174, 223, 0.2);

    .titleType {
      padding-bottom: 18rpx;
      border-bottom: 2rpx solid #e8e8e8;
      font-size: 34rpx;
      color: #8a8587;

      .selectType {
        width: 40rpx;
        height: 40rpx;
        float: right;
        font-size: 40rpx;
        color: #9f9f9f;
        border: 2rpx solid #9f9f9f;
      }
    }

    .payType {
      margin-top: -10rpx;
      line-height: 42rpx;
      font-size: 32rpx;
      color: #9e9a9c;
      .van-cell {
        padding: 0 30rpx;
      }
    }
  }
  .submitType {
    width: 100%;
    margin-bottom: 30rpx;
    border: 0;
    border-radius: 10rpx;
    background: -webkit-linear-gradient(left, #556fe3, #6fe3ff);
    /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #556fe3, #6fe3ff);
    /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #556fe3, #6fe3ff);
    /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #556fe3, #6fe3ff);
    /* 标准的语法（必须放在最后） */
  }
}
</style>
