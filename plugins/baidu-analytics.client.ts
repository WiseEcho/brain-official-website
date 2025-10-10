export default defineNuxtPlugin(() => {
  // 只在客户端运行，检查是否为 vms.9466.com 域名
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    // 只在 vms.9466.com 域名下加载百度统计
    if (hostname === 'vms.9466.com') {
      const script = document.createElement('script');
      script.src = 'https://hm.baidu.com/hm.js?3753ed44e9d8ce682930122fdf63237e';
      script.async = true;
      document.head.appendChild(script);
    }
  }
});

