<template>
  <div class="customer-slide">
    <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
      :duration="duration">
      <block v-for="(item, index) in bannerList" :key="index">
        <swiper-item>
          <image :src="item.bannerUrl" class="slide-image" mode="widthFix" />
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
  export default {
    props: ["bannerList", "indicatorDots", "autoplay", "interval", "duration"]
  }

</script>

<style lang="less">
  .customer-slide {
    .slide-image {
      width: 100%;
      height: 363rpx;
    }
  }

</style>
