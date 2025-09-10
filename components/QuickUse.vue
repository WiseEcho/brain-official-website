<template>
  <div class="free-wrapper">
    <el-button round class="free-use text-font" @click="onClick">{{
      label
    }}</el-button>
  </div>
</template>

<script setup lang="ts">

  type propsType = {
    label: string;
    onClick: () => void;
  };


  type PropsType = Partial<propsType>;
  withDefaults(defineProps<PropsType>(), {
    label: '立即免费试用',
    onClick: () => {
      if (process.client) {
        window.location.href = '/dashboard';
      }
    },
  });
</script>

<style lang="less">
  .free-use {
    background: linear-gradient(0.25turn, #fd775e, #d328f3);
    color: white !important;
    border: none !important;
  }
</style>

<style scoped lang="less">
  .free-wrapper {
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }
</style>
