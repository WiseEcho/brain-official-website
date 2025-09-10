<template>
  <div class="view-layout">
    <HomeHeader>
      <template #default>
        <ResourceItem
          id="内容中台"
          class="bg-white"
          :data="resourceMap.get('产品素材1')"
        />
        <ResourceItem
          id="工作协同"
          class="bg-white"
          :data="resourceMap.get('产品素材2')"
        />
        <ResourceItem
          id="智能投放"
          class="bg-white"
          :data="resourceMap.get('产品素材3')"
        />
        <ResourceItem
          id="数据复盘"
          class="bg-white"
          :data="resourceMap.get('产品素材4')"
        />
      </template>
    </HomeHeader>
  </div>
</template>

<script setup lang="ts">
  import useResource from '~/hooks/resource';
  import HomeHeader from '~/components/header/HomeHeader.vue';

  const { resourceMap } = useResource();

  useHead({
    meta: [
      { name: 'description', content: '深入了解视频大脑如何通过“编、拍、剪、投、察”五大模块，具体解决内容营销团队在视频策划、制作、协作、发布、分析中的效率与效果难题。探索功能细节！\n' +
          '视频生产流程卡顿？协作混乱？数据分散？视频大脑针对性解决方案来了！详细解析全链路功能如何赋能内容营销团队，实现降本增效。\n' +
          '揭秘视频大脑的核心功能：从AI辅助创意到跨平台数据分析，看我们如何为内容营销团队打造顺畅、高效、数据驱动的视频生产闭环。' }
    ],
  });
</script>

<style lang="less">
  :deep(.arco-anchor-link-item) {
    margin: 0;
    width: 100%;
    height: 100%;
    list-style: none;
  }

  :deep(.arco-anchor-link-item .arco-anchor-link) {
    margin: 0;
    padding: 0;
  }
</style>
