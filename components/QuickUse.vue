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

      if (process.client) {
        const targetUrl = getTargetUrl('/dashboard');
        window.location.href = targetUrl;
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
