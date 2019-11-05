<template>
  <div>
    <!-- 品牌，车型，城市，数量，弹窗 -->
    <van-popup
      :show="isShow"
      :position="position"
      close-on-click-overlay
      @click-overlay="onClose"
      @close="onClose"
    >
      <!-- 品牌 -->
      <div class="brandDivType" v-if="cellVarType === 'brand'">
        <div class="titleType">品牌</div>
        <scroll-view style="height: calc(100vh);" :scroll-into-view="scrollId" scroll-y="true">
          <div v-for="(item,index) of letterArr" :key="index" :id="item">
            <div v-if="brandList[item].length>0">
              <div class="letterType" v-once>{{item}}</div>
              <van-cell
                v-for="(o,indexO) of brandList[item]"
                :key="indexO"
                :title="o.name"
                :id="o.key"
                @click="getModelById(o)"
              />
            </div>
          </div>
        </scroll-view>
      </div>
      <!-- 车型 -->
      <!-- <div v-else-if="cellVarType === 'model'">
        <van-picker
          id="model"
          :columns="varType === 'lPrice'?lModelList:tModelList"
          value-key="model"
          show-toolbar
          @cancel="onClose"
          @confirm="pickerChange"
        />
      </div>-->
      <!-- 城市 -->
      <div v-else-if="cellVarType === 'city'">
        <van-picker
          :columns="city"
          value-key="name"
          show-toolbar
          title="选择城市"
          @cancel="onClose"
          @change="cityChange"
          @confirm="cityConfirm"
        />
      </div>

      <!-- 数量 -->
      <div v-else-if="cellVarType === 'count'" class="countDivType">
        <div class="popupTopBarType">
          <div class="btnType" @click="onClose">取消</div>
          <div>购买数量</div>
          <div class="btnType" @click="onClose">确认</div>
        </div>
        <div class="inputType">
          <van-field
            id="count"
            label="数量"
            type="number"
            placeholder="请输入购买数量"
            clearable
            @change="pickerChange"
          />
        </div>
      </div>
    </van-popup>
    <!-- 字母选择器 -->

    <div v-if="cellVarType === 'brand'" class="letterDivType" id="letterDivType">
      <div
        v-for="item of letterArr"
        :id="item"
        :key="item"
        @touchstart="onStartLetter"
        @touchmove="onMoveLetter"
      >{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "isShow",
    "position",
    "varType",
    "cellVarType",
    "brandList",
    "lModelList",
    "tModelList",
    "city",
    "letterArr"
  ],
  data() {
    return {
      letterElTop: 0, // 字母选择器，距离top的高度
      letterElHeight: 0, // 单个字母的高度
      scrollId: null // 跳转的ID
    };
  },
  methods: {
    onClose() {
      this.$emit("onClose");
    },
    getModelById(val) {
      // 选择的品牌，根据品牌ID获取型号
      this.$emit("getModelById", val);
    },
    pickerChange(val) {
      // 车型，数量的选择
      this.$emit("pickerChange", val);
    },
    cityChange(val) {
      // 改变城市
      const { picker, value, index } = val.mp.detail;
      picker.setColumnValues(1, value[0].city);
    },
    cityConfirm(val) {
      this.$emit("cityConfirm", val);
    },
    onStartLetter(val) {
      console.log("选择的字母", val);
      // 点击时选择的字母
      const {
        target: { id }
      } = val;
      // this.toLetterBrand(id);
      this.scrollId = id;

      wx
        .createSelectorQuery()
        .select("#letterDivType")
        .boundingClientRect(res => {
          this.letterElTop = res.top;
          this.letterElHeight = Math.round(res.height / 26);
        })
        .exec();
    },
    onMoveLetter(val) {
      // 移动时选择的字母
      // 字母移动
      const { clientY } = val;
      const moveY = clientY - this.letterElTop;
      // 获取字母
      const letter = this.letterArr[Math.floor(moveY / this.letterElHeight)];
      // this.toLetterBrand(letter);
      this.scrollId = letter;
    }
    // toLetterBrand(val) {
    //   // 通过传过来的字母，找出对应的id
    //   for (const item of this.letterArr) {
    //     if (item === val) {
    //       this.scrollId = item;
    //       break;
    //     }
    //   }
    // }
  }
};
</script>

<style lang="less">
.van-popup {
  height: auto;
}
.brandDivType {
  position: relative;
  // padding: 20rpx;
  text-align: left;
  .titleType {
    padding: 0 20rpx;
  }
  .letterType {
    height: 24px;
    padding: 0 20rpx;
    line-height: 24px;
    background: #cccccc;
    color: #000;
    font-size: 28rpx;
    border-bottom: 1px solid #e5e5e5;
  }
}
.countDivType {
  .popupTopBarType {
    padding: 20rpx 40rpx;
    display: flex;
    justify-content: space-between;
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
    .btnType {
      color: #007eff;
      cursor: pointer;
    }
  }
  .inputType {
    margin: 8% 0 25% 0;
  }
}
// 字母选择样式
.letterDivType {
  position: fixed;
  top: 8rpx;
  right: 4rpx;
  font-size: 32rpx;
  text-align: center;
  overflow-y: hidden;
  z-index: 100;
  div {
    margin: 2rpx 6rpx;
  }
}
</style>