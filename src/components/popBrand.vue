<template>
  <van-popup
    :show="show"
    :position="position"
    @close="onClose"
    :close-on-click-overlay="true"
    @click-overlay="onClose"
  >
    <div class="top">
      <div class="back" @click="onClose">
        <van-icon name="arrow-left"/>
      </div>
      <div class="drawer-title">品牌</div>
    </div>
    <div class="popup-content" style="padding-top: 80rpx" v-if="brandDest.length>0">
      <div class="drawer-one" style="margin-bottom: 100rpx;padding: 0;text-indent:20px;">
        <scroll-view scroll-y="true" :scroll-into-view="toIndex" style="height: calc(100vh);">
          <div class="list" v-for="(item, index) in brandDest" :key="index" :id="item.Title">
            <div class="list-top">{{item.Title}}</div>
            <div class="list-item" v-for="(d, dindex) in item.data" :key="dindex">
              <div
                v-for="(c, cindex) in d.List"
                :key="cindex"
                @click.stop="changeStatus(c)"
                :class="['item-content',c.id == brandKey?'item-content-active':'']"
              >{{c.name}}</div>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
    <div class="alphabet">
      <div
        class="alphabet-item"
        v-for="(item, index) in alphabet"
        :key="index"
        @touchstart="onStartLetter(item)"
        @touchend="onEndLetter"
      >{{item}}</div>
    </div>
    <div class="drawer-footer">
      <button class="reset" @click="reset">重置</button>
      <button class="comfirm" @click="onClose">确定</button>
    </div>
  </van-popup>
</template>

<script>
import store from "@/store";
export default {
  data() {
    return {
      brandKey: null,
      brandItem: {},
      brandDest: [],
      toIndex: "",
      alphabet: [
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
  props: ["position", "show", "brandList"],
  methods: {
    onStartLetter(item) {
      this.toIndex = item;
    },
    onEndLetter() {
      this.toIndex = null;
    },
    onClose() {
      this.show = false;
      this.$emit("outShow", this.show, this.brandItem);
    },
    reset() {
      this.brandKey = null;
    },
    changeStatus(item) {
      this.brandItem = item;
      this.brandKey = item.id;
    },
    formatList(arr, keyword) {
      let newArr1 = [];
      let tempArr = [];
      let reg = /\b(\w)|\s(\w)/g;
      let k = 0;
      let firstWord = arr[0][keyword].charAt(0).toUpperCase(); //获取第一个分类字母
      arr.map(v => {
        if (v[keyword]) {
          v[keyword] = v[keyword].replace(reg, m => m.toUpperCase()); //首字母大写
          if (firstWord == v[keyword].charAt(0)) {
            tempArr.push(v);
            newArr1[k] = {
              Title: firstWord,
              List: tempArr
            };
          } else {
            //这里循环到这表示已经第二个字母了
            firstWord = v[keyword].charAt(0); //设置第二字母
            tempArr = []; //把之前的清除掉
            tempArr.push(v); //添加第一个
            newArr1[++k] = {
              //自增
              Title: firstWord,
              List: tempArr
            };
          }
        }
      });
      return newArr1;
    }
  },
  mounted: function() {
    setTimeout(() => {
      if (this.brandList.length > 0) {
        var newList = this.formatList(this.brandList, "namePinyin");
        if (newList.length > 0) {
          var map = {};
          var dest = [];
          for (var i = 0; i < newList.length; i++) {
            var ai = newList[i];
            if (!map[ai.Title]) {
              dest.push({
                Title: ai.Title,
                data: [ai]
              });
              map[ai.Title] = ai;
            } else {
              for (var j = 0; j < dest.length; j++) {
                var dj = dest[j];
                if (dj.Title == ai.Title) {
                  dj.data.push(ai);
                  break;
                }
              }
            }
          }
        }
        dest
          .sort((a, b) => {
            const nameA = a.Title.toUpperCase();
            const nameB = b.Title.toUpperCase();
            if (nameA > nameB) {
              return -1;
            }
            if (nameA < nameB) {
              return 1;
            }
            return 0;
          })
          .reverse();
        this.brandDest = dest;
      }
    }, 1000);
  }
};
</script>

<style lang="less">
.van-popup {
  width: 660rpx;

  // height: 100%;
  .popup-content {
    // overflow-y: auto;
    // height: 90%;
  }

  .top {
    position: fixed;
    top: 0px;
    height: 80rpx;
    background: #fff;
    z-index: 11;
    width: 100%;
    border-bottom: 1xp solid #e5e5e5;

    .back {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 20px;
    }

    .drawer-title {
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-size: 30rpx;
      color: #000000;
    }
  }

  .drawer-one {
    padding-left: 20px;

    .list {
      .list-top {
        height: 24px;
        line-height: 24px;
        background: #cccccc;
        color: #000;
        font-size: 28rpx;
        border-bottom: 1px solid #e5e5e5;
      }

      .list-item {
        .item-content {
          height: 50px;
          line-height: 50px;
          background: #fff;
          color: #666;
          font-size: 32rpx;
          border-bottom: 1px solid #e5e5e5;

          &-active {
            color: #07ccbd;
          }
        }
      }
    }

    // .drawer-list {
    //   display: flex;
    //   align-items: center;
    //   flex-wrap: wrap;
    //   width: 100%;

    //   .drawer-item {
    //     flex-basis: calc(33.3% - 20rpx);
    //     font-size: 24rpx;
    //     color: #808080;
    //     background: #f4f4f4;
    //     text-align: center;
    //     padding: 10px 0px;
    //     margin-right: 30rpx;
    //     margin-bottom: 30rpx;

    //     &:nth-child(3n) {
    //       margin-right: 0rpx;
    //     }

    //     &-active {
    //       color: #07ccbd;
    //       background: #e1fdff;
    //     }
    //   }
    // }
  }

  .alphabet {
    width: 40rpx;
    right: 12rpx;
    position: fixed;
    top: 91rpx;

    .alphabet-item {
      font-size: 24rpx;
      text-align: center;
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
