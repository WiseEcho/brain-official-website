import { ref, onMounted, onUnmounted } from 'vue';
import type { Swiper as SwiperType } from 'swiper';

export const useSwiper = () => {
  const swiperInstance = ref<SwiperType | null>(null);
  const isReady = ref(false);

  // 基础配置
  const baseConfig = {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: true,
    pagination: { clickable: true },
    loop: false,
    autoplay: false,
  };

  // 响应式断点配置
  const responsiveBreakpoints = {
    320: { slidesPerView: 1, spaceBetween: 10 },
    768: { slidesPerView: 2, spaceBetween: 15 },
    1024: { slidesPerView: 3, spaceBetween: 20 },
    1440: { slidesPerView: 4, spaceBetween: 25 },
  };

  // 自动播放配置
  const autoplayConfig = {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  };

  // 初始化Swiper
  const initSwiper = (swiper: SwiperType) => {
    swiperInstance.value = swiper;
    isReady.value = true;
  };

  // 销毁Swiper
  const destroySwiper = () => {
    if (swiperInstance.value) {
      swiperInstance.value.destroy(true, true);
      swiperInstance.value = null;
      isReady.value = false;
    }
  };

  // 获取Swiper实例
  const getSwiperInstance = () => swiperInstance.value;

  // 常用方法
  const slideTo = (index: number, speed?: number) => {
    if (swiperInstance.value) {
      swiperInstance.value.slideTo(index, speed);
    }
  };

  const slideNext = (speed?: number) => {
    if (swiperInstance.value) {
      swiperInstance.value.slideNext(speed);
    }
  };

  const slidePrev = (speed?: number) => {
    if (swiperInstance.value) {
      swiperInstance.value.slidePrev(speed);
    }
  };

  const update = () => {
    if (swiperInstance.value) {
      swiperInstance.value.update();
    }
  };

  // 生命周期管理
  onUnmounted(() => {
    destroySwiper();
  });

  return {
    // 状态
    swiperInstance,
    isReady,

    // 配置
    baseConfig,
    responsiveBreakpoints,
    autoplayConfig,

    // 方法
    initSwiper,
    destroySwiper,
    getSwiperInstance,
    slideTo,
    slideNext,
    slidePrev,
    update,
  };
};

// 预设配置
export const swiperPresets = {
  // 基础轮播
  basic: {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: true,
    pagination: { clickable: true },
  },

  // 多列轮播
  multiColumn: {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: true,
    pagination: { clickable: true },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 10 },
      768: { slidesPerView: 2, spaceBetween: 15 },
      1024: { slidesPerView: 3, spaceBetween: 20 },
    },
  },

  // 自动播放轮播
  autoplay: {
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: { clickable: true },
  },

  // 卡片轮播
  cards: {
    slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: true,
    navigation: true,
    pagination: { clickable: true },
  },

  // 全屏轮播
  fullscreen: {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: true,
    pagination: { clickable: true },
    effect: 'fade',
  },
};
