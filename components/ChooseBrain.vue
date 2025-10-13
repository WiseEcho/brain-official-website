<template>
  <div class="segment-content" style="background: transparent">
    <Statistic :data="statisticData" />
    <!-- statistic component -->
    <QuickUse :on-click="jump" class="btn-wra" />
  </div>
</template>

<script setup lang="ts">
 // 域名检测和URL构建工具函数
 const getTargetUrl = (path: string): string => {
    if (!process.client) return path;
    
    const currentHostname = window.location.hostname;
    const targetHostname = 'vms.9466.com';
    
    // 如果当前域名是目标域名，直接使用相对路径
    if (currentHostname === targetHostname) {
      return path;
    }
    
    // 如果不是目标域名，构建完整URL
    const currentProtocol = window.location.protocol;
    return `${currentProtocol}//${targetHostname}${path}`;
  };

  const jump = () => {
    if (process.client) {
      const targetUrl = getTargetUrl('/dashboard');
      window.location.href = targetUrl;
    }
    // router.push('/dashboard');
  };
  const statisticData = [
    {
      count: 50,
      countSuffix: '%',
      label: '素材复用度提升',
      icon: '/home/images/icon/up.svg',
    },
    {
      count: 300,
      countSuffix: '%',
      label: '投流效率提升',
      icon: '/home/images/icon/up.svg',
    },
    {
      count: 100,
      countSuffix: '%',
      label: '运营效率提升',
      icon: '/home/images/icon/up.svg',
    },
    {
      count: 40,
      countSuffix: '%',
      label: '创作成本降低',
      icon: '/home/images/icon/down.svg',
    },
    {
      count: 40,
      countSuffix: '%',
      label: '人力成本降低',
      icon: '/home/images/icon/down.svg',
    },
  ];
</script>

<style scoped lang="less">
  .btn-wra {
    margin-top: 1rem;
  }
</style>
