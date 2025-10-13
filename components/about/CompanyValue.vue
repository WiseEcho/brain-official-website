<template>
  <div class="company-value">
    <div class="item" v-for="item in values" :key="item">
      <img :src="item" alt="" loading="lazy" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const values: string[] = [
    '/images/info/about-1.webp',
    '/images/info/about-2.webp',
    '/images/info/about-3.webp',
    '/images/info/about-4.webp',
  ];
</script>

<style scoped lang="less">
  .company-value {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    max-width: 60rem;
    width: 100%;
    min-height: 13.875rem;
    margin-bottom: 1rem;
  }

  .item {
    width: calc(25% - 0.75rem); // 4列布局，减去gap
    position: relative;
  }
  .item::before {
    content: '';
    display: block;
    padding-top: 100%; // 保持正方形
  }
  .item img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
    object-position: center;
    background: #f5f5f5;
  }

  @media (max-width: 768px) {
    .item {
      width: calc(50% - 0.5rem); // 2列布局
    }
  }
</style>
