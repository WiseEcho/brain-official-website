import { ref, onMounted } from 'vue';

export const useClient = () => {
  const isClient = ref(false);
  const isServer = ref(false);

  onMounted(() => {
    isClient.value = true;
    isServer.value = false;
  });

  // 在服务端渲染时
  if (process.server) {
    isServer.value = true;
    isClient.value = false;
  }

  return {
    isClient,
    isServer,
  };
};
