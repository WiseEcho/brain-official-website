<template>
  <div class="bg-wrapper">
    <div class="bg-config">
      <div class="dot">
        <img src="/images/bg-dot.webp" alt="" loading="lazy" />
      </div>
      <div class="dot-2"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
  .bg-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    user-select: none;

    .bg-config {
      width: 100%;
      height: 100%;
      display: flex;
      background-color: #190038;
      position: relative;

      .dot {
        width: 800px;
        height: 800px;
        display: flex;
        position: absolute;
        top: -40%;
        left: -25%;
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
        top: 50%;
        right: -10%;
        opacity: 0.7;
        user-select: none;
        background-image: url('/images/bg-dot-2.webp');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
</style>
