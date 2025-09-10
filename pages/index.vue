<template>
  <div class="view-layout">
    <HomeHeader>
      <template #default>
        <ResourceItem class="bg-white" :data="resourceMap.get('首页素材1')" />
        <ResourceItem class="bg-white" :data="resourceMap.get('首页素材2')">
          <template #title>
            <h2 v-h1 class="resource-title text-font"
              >从投放需求提出到投流复盘全流程</h2
            >
          </template>
          <template #background>
            <BackTwo />
          </template>
        </ResourceItem>
        <ResourceItem class="bg-white" :data="resourceMap.get('首页素材3')" />
      </template>
    </HomeHeader>
  </div>
</template>

<script setup lang="ts">
  import useResource from '~/hooks/resource';
  import BackTwo from '~/components/bg/BackTwo.vue';
  import HomeHeader from '~/components/header/HomeHeader.vue';

  const { resourceMap } = useResource();

  useHead({
    meta: [
      {
        name: 'description',
        content:
          '视频大脑是专为内容营销团队打造的“编、拍、剪、投、察”全流程生产系统。整合策划、拍摄、剪辑、发布、分析，一站式解决视频生产难题，大幅提升团队效率与内容效果。选视频大脑！专为内容营销团队设计的一站式“编拍剪投察”生产系统，无缝协作，数据驱动决策，助力内容效果最大化。',
      },
    ],
  });
</script>

<style scoped lang="less"></style>
