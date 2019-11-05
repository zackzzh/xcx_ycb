<template>
  <div class="page-assignPeople">
    <div class="assignPeople-top">
      <h1 class="top-title">已选择{{saleNum}}人</h1>
      <div class="top-detail">请确认分配以下跟进人</div>
    </div>
    <div class="assignPeople-list">
      <div class="list-item" v-for="(item, index) in sale" :key="index">
        <div class="item-left">
          <image src="/static/images/customers/wechat.png" mode="widthFix" />
          {{item.username}}
        </div>
        <div class="item-right">
          <div class="round reduce" @click="reduce(item, index)">-</div>
          <van-field :value="item.number>0?item.number:''" :border="false" @change="changeNumber" :id="index"
            :type="'number'" />
          <div class="round add" @click="add(item, index)">+</div>
        </div>
      </div>
    </div>
    <van-toast id="van-toast" />
    <div class="button">
      <van-button round="true" class="cancel" @click="cancel">取消</van-button>
      <van-button round="true" @click="comfirm">确认分配</van-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sale: [],
        saleNum: '',
        custIds: [],
        salesList: []
      }
    },
    methods: {
      changeNumber(e) {
        if (/^[0-9]+$/.test(e.mp.detail)) {
          this.sale[Number(e.mp.target.id)].number = Number(e.mp.detail)
          let sum = 0;
          this.sale.forEach((data) => {
            sum += data.number;
          })

          if (sum > this.saleNum) {
            this.$toast('销售员分配人数总和大于选中客源总数');
          }
        } else {
          this.sale[Number(e.mp.target.id)].number = null;
        }

      },
      add(item, index) {
        let sum = 0;
        this.sale.forEach((data) => {
          sum += data.number;
        })
        if (sum > this.saleNum) {
          this.$toast('销售员分配人数总和大于选中客源总数');
        } else {
          item.number++;
        }
      },
      reduce(item, index) {
        if (item.number === 0) {
          item.number === null
        } else {
          item.number--;
        }
      },
      comfirm() {
        this.sale.forEach((data, index) => {
          if (data.number > 0) {
            console.log(data);
            this.salesList.push({
              userId: data.userId,
              count: data.number
            })
          }
        })
        if (this.salesList.length == 0) {
          this.$toast("请给销售分配客源数量");
          return;
        }
        this.$api.assigned({
          custIds: this.custIds,
          salesList: this.salesList
        }).then((res) => {
          wx.navigateBack({
            success: () => {
              this.$toast(res.msg);
            }
          })
        })
      },
      cancel() {
        wx.navigateBack({})
      }
    },
    onLoad: function (options) {
      this.sale = [];
      this.custIds = [];
      this.salesList = [];
      this.saleNum = JSON.parse(options.list).length;
      JSON.parse(options.list).forEach((data) => {
        this.custIds.push(data.id)
      })
      this.$api.querySalesList({})
        .then((res) => {
          res.userList.forEach((data) => {
            data.number = null;
            this.sale.push(data);
          });
        })
    }
  }

</script>

<style lang="less">
  .page-assignPeople {
    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 120rpx;

      .cancel {
        opacity: 0.5;
      }

      .van-button {
        margin: 0px 20rpx;
        width: 220rpx;
        background: linear-gradient(to right, #556fe3, #7abcf3);
        color: #fff;
      }
    }

    .assignPeople-list {
      margin-top: 20rpx;
      padding: 0px 40rpx;

      .list-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 88rpx;

        .item-left {
          color: #050505;
          font-size: 30rpx;
          display: flex;
          align-items: center;

          image {
            width: 58rpx;
            height: 58rpx;
            margin-right: 20rpx;
          }
        }

        .item-right {
          display: flex;
          align-items: center;

          .round {
            width: 38rpx;
            height: 38rpx;
            border-radius: 50%;
            text-align: center;

            border: 1px solid #333;
          }

          .add {
            line-height: 38rpx;
          }

          .reduce {
            line-height: 32rpx;
          }

          .van-field__input {
            width: 88rpx;
            text-align: center;
            border-bottom: 1px solid #e5e5e5;
            font-size: 28rpx;
          }
        }
      }
    }

    .assignPeople-top {
      height: 260rpx;
      width: 100%;
      text-align: center;
      font-size: 28rpx;
      color: #fff;
      background: linear-gradient(to right, #1277da, #45cefa);

      .top-title {
        padding-top: 80rpx;
        font-size: 58rpx;
        margin-bottom: 26rpx;
      }
    }
  }

</style>
