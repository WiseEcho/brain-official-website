import { useRoute, useRouter } from 'vue-router';
import useMenu from '~/hooks/useMenu';
import usePortal from '~/hooks/portal';
import { computed } from 'vue';

export default function useHeader() {
  const { whiteList, anchorList, headerThemeList } = useMenu();
  const route = useRoute();
  const router = useRouter();
  const { scrollTop } = usePortal();
  const headerDark = computed(() => {
    return headerThemeList.includes(route.name as string)
      ? 'header-active'
      : 'header-dark header-active-dark';
  });
  const headerColor = computed(() => {
    return headerThemeList.includes(route.name as string) ? 'white' : 'black';
  });

  const goHome = () => {
    if (process.client) {
      router.push('/');
    }
  };

  const switchDarkMode = (item: HTMLElement | undefined) => {
    if (item) {
      item.classList.remove('header-active');
      item.classList.remove('header-active-dark');
      if (scrollTop.value > 50) {
        if (whiteList.includes(route.name as string)) {
          item.classList?.add('header-active');
          console.log('add header active css class', item.classList);
        } else {
          item.classList?.add('header-active-dark');
        }
      } else if (whiteList.includes(route.name as string)) {
        item.classList?.remove('header-active');
      } else {
        item.classList?.remove('header-active-dark');
      }
    }
  };

  const anchorHandler = () => {
    if (process.client && anchorList.includes(route.name as string)) {
      const hash: any = route?.hash;
      if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          requestAnimationFrame(() => {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          });
        }
      }
    }
  };

  return {
    switchDarkMode,
    anchorHandler,
    headerDark,
    headerColor,
    goHome,
  };
}
