<template>
  <div class="segment-content" style="background: transparent">
    <Statistic :data="statisticData" />
    <!-- statistic component -->
    <QuickUse :on-click="jump" class="btn-wra" />
  </div>
</template>

<script setup lang="ts">
  const jump = () => {
    if (process.client) {
      window.location.href = '/dashboard';
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
