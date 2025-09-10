import { Swiper, SwiperSlide } from 'swiper/vue';
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  EffectFlip,
} from 'swiper/modules';

// 导入Swiper样式
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-coverflow';

export default defineNuxtPlugin((nuxtApp) => {
  // 全局注册Swiper组件
  nuxtApp.vueApp.component('Swiper', Swiper);
  nuxtApp.vueApp.component('SwiperSlide', SwiperSlide);

  // 提供Swiper模块供组件使用
  return {
    provide: {
      swiperModules: {
        Navigation,
        Pagination,
        Scrollbar,
        Autoplay,
        EffectFade,
        EffectCube,
        EffectCoverflow,
        EffectFlip,
      },
    },
  };
});
