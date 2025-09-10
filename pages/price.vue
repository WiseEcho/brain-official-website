<template>
  <div class="view-layout">
    <div class="content-wrapper">
      <ResourceItem class="bg-white" :data="resourceMap.get('价格素材1')" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import useResource from '~/hooks/resource';

  const { resourceMap } = useResource();

  useHead({
    meta: [
      { name: 'description', content: '见证内容营销团队的真实转变！视频大脑用户案例显示：视频生产效率提升100%，团队协作时间节省40%，素材复用率提升50%。了解如何实现。\n' +
          '视频大脑不仅仅是工具，更是内容营销团队的增长引擎。了解我们如何帮助客户缩短视频生产周期、提升内容质量、强化数据驱动决策，最终实现营销目标。\n' +
          '投资视频大脑，获得远超工具成本的回报。探索我们如何通过一站式“编拍剪投察”系统，为内容营销团队带来可量化的效率提升与业务增长。' }
    ],
  });
</script>

<style scoped lang="less">
  .content-wrapper {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    padding-top: 4rem;
    background: linear-gradient(0deg, #fcf9ff, #ffffff 80%);
  }
</style>
