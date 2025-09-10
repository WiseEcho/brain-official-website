import { onMounted, onUnmounted, ref } from 'vue';

export default function usePortal() {
  const scrollTrigger = 100; // 当滚动 100 px的时候，更改header的样式
  const scrollTop = ref<number>(0);
  const isScrolled = ref<boolean>(false);

  onMounted(() => {
    if (process.client) {
      const handleScroll = () => {
        scrollTop.value = window?.scrollY || 0;
        isScrolled.value = scrollTop.value > scrollTrigger;
      };

      window.addEventListener('scroll', handleScroll);

      onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
      });
    }
  });

  return {
    scrollTrigger,
    scrollTop,
    isScrolled,
  };
}
