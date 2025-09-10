<template>
  <div class="segment-content">
    <div class="segment-wrapper">
      <BackOne />
      <div class="portal-content swiper">
        <PortalSwiper :data="swiperItems" />
      </div>
    </div>
    <slot name="default" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import BackOne from '~/components/bg/BackOne.vue';
  import PortalSwiper from '~/components/PortalSwiper.vue';

  const swiperItems = ref([
    {
      title: '短视频营销协同数智化平台',
      desc: '编 拍 剪 审 投 评 全程赋能',
      btnText: '立即免费试用',
      route: '#',
      showUrl: '/home/video/视频大脑视频.mp4',
      type: 'video',
    },
    {
      title: '专属T级本地协同资产库|让素材协同便捷高效',
      desc: '批量打标上传 极速存储 精准检索 逐帧审批 按需共享',
      btnText: '立即免费试用',
      route: '#',
      showUrl: '/home/images/swiper/swiper-1.webp',
      type: 'image',
    },
    {
      title: '一站式智能化投流管理平台|让投放盯盘更智能',
      desc: '多账户聚合  批量搭建计划 智能盯盘 计划模板 投放报表',
      btnText: '立即免费试用',
      route: '#',
      showUrl: '/home/images/swiper/swiper-2.webp',
      type: 'image',
    },
    {
      title: '多维度数据洞察分析平台|让数据驱动增长',
      desc: '创作报表 投放报表 素材互动数据',
      btnText: '立即免费试用',
      route: '#',
      showUrl: '/home/images/swiper/swiper-3.webp',
      type: 'image',
    },
  ]);
</script>

<style scoped lang="less">
  .segment-content {
    @swiper-height: 22rem;
    width: 100%;
    height: fit-content;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;

    .segment-wrapper {
      width: 100%;
      height: auto;
      display: flex;
      color: black;
      background-color: #190038;
      position: relative;
      overflow: hidden;
      justify-content: center;
    }

    .dot {
      width: 410px;
      height: 410px;
      display: flex;
      position: absolute;
      top: 20px;
      left: 267px;
      transform: rotate(60deg);
      opacity: 0.3;
      user-select: none;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .dot-2 {
      width: 550px;
      height: 850px;
      display: flex;
      position: absolute;
      top: -335px;
      left: -220px;
      transform: rotate(-150deg);
      opacity: 0.7;
      user-select: none;
      background-image: url('/images/bg-dot-2.webp');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }

    .swiper {
      min-height: @swiper-height;
      height: auto;
      z-index: 1;
      padding-top: 16px;
      margin-top: 4rem;
      margin-bottom: 1rem;
    }
  }
</style>

<style lang="less">
  .segment-content {
    align-items: center;
    justify-content: center;
  }
</style>
