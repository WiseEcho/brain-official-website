<template>
  <div class="dot">
    <img src="/images/bg-dot.webp" alt="" loading="lazy" />
  </div>
  <div class="dot-2"></div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
  .dot {
    width: 410px;
    height: 410px;
    display: flex;
    position: absolute;
    top: 20px;
    left: 267px;
    transform: rotate(60deg);
    opacity: 0.3;
    user-select: none;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .dot-2 {
    width: 550px;
    height: 850px;
    display: flex;
    position: absolute;
    top: -335px;
    left: -220px;
    transform: rotate(-150deg);
    opacity: 0.7;
    user-select: none;
    background-image: url('/images/bg-dot-2.webp');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
