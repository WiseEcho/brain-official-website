import { computed, ref, onMounted, onBeforeUnmount } from 'vue';

type elementSizeEnum = '' | 'small' | 'default' | 'large';

export default function useMobile() {
  const windowSize = ref<number>(0);
  const initWindowSize = (index?: number) => {
    windowSize.value = index || 0;
  };
  const getWindowSize = () => {
    return windowSize.value;
  };

  const getSize = computed(() => {
    return windowSize.value >= 768 ? 'default' : ('small' as elementSizeEnum);
  });

  const getPortalSwiperHeight = computed(() => {
    return windowSize.value >= 768 ? '18rem' : '24rem';
  });

  const getPortalSwiperInnerHeight = computed(() => {
    return windowSize.value >= 768 ? '100%' : '25rem';
  });

  const getTitleSize = computed(() => {
    return windowSize.value >= 768 ? '3rem' : '1.5rem';
  });

  const getSubTitle = computed(() => {
    return windowSize.value >= 768 ? '1.5rem' : '1rem';
  });

  const getTypographyHeading = computed(() => {
    return windowSize.value >= 768 ? 1 : 5;
  });

  const isShow = computed(() => {
    return windowSize.value >= 768;
  });

  const getFloatBtnPosition = computed(() => {
    return windowSize.value >= 768 ? 'top' : 'bottom';
  });

  const getDevice = computed(() => {
    return windowSize.value >= 768 ? 'pc' : 'mobile';
  });

  const isPreview = computed(() => {
    return windowSize.value <= 768;
  });

  const getH1Size = computed(() => {
    return windowSize.value >= 768 ? '3rem' : '1.5rem';
  });


  const isPc = () => {
    return windowSize.value >= 768;
  };

  onMounted(() => {
    if (process.client) {
      initWindowSize(window.innerWidth);
      const handleResize = () => {
        initWindowSize(window.innerWidth);
      };
      // console.log('handleResize', windowSize.value);
      window.addEventListener('resize', handleResize);

      onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize);
      });
    }
  });

  return {
    getSize,
    getTypographyHeading,
    isShow,
    getFloatBtnPosition,
    getDevice,
    isPreview,
    initWindowSize,
    getPortalSwiperHeight,
    getPortalSwiperInnerHeight,
    getTitleSize,
    getH1Size,
    getSubTitle,
    isPc,
  };
}
