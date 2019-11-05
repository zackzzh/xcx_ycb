<template>
  <!-- 报表 -->
  <div class="formMainDivType">
    <!-- 头部图片 -->
    <img class="imgType" :src="demoData.imgUrl">
    <!-- 中间选择跳转条 -->
    <div class="optionsDivType">
      <van-row>
        <!-- 左箭头 -->
        <van-col span="20">
          <!-- 选项 ，跳转-->
          <div class="optionsType">
            <div
              class="titleType"
              v-for="item in demoData.btnList"
              :key="item.id"
              @click="handlerBtn(item)"
            >
              <span>{{reportData[item.varType]}}{{item.unit}}</span>
              {{item.title}}
            </div>
          </div>
          <!-- 右箭头 -->
          <img class="arrowsImgType" :src="demoData.arrowsImgUrl">
        </van-col>
        <van-col span="4">
          <!-- 选择，月，周，日报表 -->
          <div class="selectDivType">
            <img class="imgType" :src="demoData.iconImgUrl">
            <div class="titleType" @click="handlerReport">
              {{selectFormVal}}
              <!-- 边上的箭头样式 -->
              <div class="arrowsType"></div>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 选项框 -->
    <van-popup :show="isShowPicker" position="bottom">
      <van-picker
        :columns="demoData.selectList"
        value-key="title"
        show-toolbar
        close-on-click-overlay
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 报表卡片 -->
    <form-card :demoData="demoData.formList" :data="reportData" :subtitle="subtitle"/>
  </div>
</template>

<script>
import reportFormsData from "./reportFormsData";

import formCard from "./formCard";

export default {
  components: {
    formCard
  },
  mounted() {
    this.getReport();
  },
  data() {
    return {
      reportData: {},
      demoData: reportFormsData,
      selectStr: "下拉列表",
      selectFormVal: "全部",
      subtitle: "全部",
      active: "",
      isShowPicker: false
    };
  },
  methods: {
    getReport(val) {
      // 管理报表数据接口，返回数据：total_cust获取客源总数，
      // total_N待跟进，total_HABC跟进中，total_Q到店，total_O成交，
      // total_L战败，total_F无效，valid_rate有效率，deal_rate成交率，
      // tracking_rate跟进率，tracking_timeliness跟进时效性
      // datetype=date(日),week（周）,month(月)，不传是默认统计全部数据
      this.$myApi.report.getReport(val).then(res => {
        if (res.code === 200) {
          this.reportData = res;
        }
      });
    },
    handlerBtn(val) {
      console.log("点击按钮", val);
    },
    handlerReport(val) {
      // console.log("报表选择", val);
      this.isShowPicker = true;
    },
    onCancel(val) {
      // console.log("选择框取消按钮", val);
      this.isShowPicker = false;
    },
    onConfirm(val) {
      // console.log("选择框确认按钮按钮");
      this.isShowPicker = false;
      const {
        target: { value }
      } = val;
      this.selectFormVal = value.title;
      this.subtitle = value.subtitle;
      // 获取报表
      this.getReport(value.varType);
    }
  }
};
</script>

<style lang="less">
.formMainDivType {
  .van-popup {
    height: auto;
  }
  // position: relative;
  text-align: center;
  .imgType {
    width: 100%;
  }
  .optionsDivType {
    margin: 0 20rpx;
    .optionsType {
      overflow: scroll;
      white-space: nowrap;
      width: 94%;
      display: inline-block;
      .titleType {
        margin: 20rpx;
        display: inline-block;
        font-size: 30rpx;
        span {
          display: block;
          color: #0895ef;
        }
      }
    }
    .arrowsImgType {
      // 箭头图片
      display: inline-block;
      width: 30rpx;
      height: 120rpx;
    }
    .leftArrowsImgType {
      -webkit-transform: rotate(180deg); /* Safari and Chrome */
      -moz-transform: rotate(180deg);
      -ms-transform: rotate(180deg); /* IE 9 */
      -o-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    .selectDivType {
      margin-top: 20rpx;
      .imgType {
        width: 60rpx;
        height: 40rpx;
      }
      .titleType {
        padding: 10rpx;
        border-radius: 10rpx;
        font-size: 20rpx;
        color: #ffffff;
        background: #0000c3;
        .arrowsType {
          margin-bottom: -10rpx;
          display: inline-block;
          border-width: 14rpx;
          border-style: solid;
          border-color: #ffffff transparent transparent transparent;
        }
      }
    }
  }
}
</style>
