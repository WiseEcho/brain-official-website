import { ref } from 'vue';

export default function useLoading() {
  const isLoading = ref<boolean>(false);

  const init = () => {
    isLoading.value = false;
  };

  const toggle = () => {
    isLoading.value = !isLoading.value;
  };

  const setStatus = (value: boolean) => {
    isLoading.value = value;
  };

  const imgLoadingHandle = (callback?: any) => {
    init();
    if (callback) {
      callback();
    }
  };

  return {
    isLoading,
    init,
    toggle,
    setStatus,
    imgLoadingHandle,
  };
}
