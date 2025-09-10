<template>
  <div class="segment-content">
    <div v-if="data.header" class="segment-header">
      <h2 v-if="data.title" v-h1 style="color: #504288; font-weight: 500">
        {{ data.title || '暂无标题' }}
      </h2>
      <slot v-else name="title" class="title text-font" />
      <p
        v-if="data.desc"
        :style="{ color: data.title ? '#504288' : '#B7B8BA' }"
        style="margin-top: 0"
        v-h2
      >
        {{ data.desc || '暂无描述' }}
      </p>
      <slot v-else name="desc" class="text-font desc" />
    </div>
    <div v-if="!data.slot" class="resource-content">
      <el-image
        :src="data.img"
        alt="img"
        fit="contain"
        class="img"
        loading="lazy"
      />
    </div>
    <component
      :is="data.slot"
      v-else
      :data="data.attr.data"
      :mode="data.attr.mode"
      class="slot"
    />
    <slot name="background" />
  </div>
</template>

<script setup lang="ts">
  import type { Component } from 'vue';

  type resourcePropsType = {
    title: string;
    desc: string;
    img: string;
    slot: Component | null;
    attr: any;
    header: boolean;
  };
  type ResourcePropsType = Partial<resourcePropsType>;
  type PropsType = {
    data: any;
  };

  withDefaults(defineProps<PropsType>(), {
    data: () => ({
      title: '',
      desc: '',
      img: '',
      slot: null,
      attr: '',
      header: true,
    }),
  });
</script>

<style scoped lang="less">
  .segment-content {
    @max-width: 60rem;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
    box-sizing: border-box;

    :deep(.arco-typography-title) {
      margin-top: 0;
    }

    .resource-content {
      width: 100%;
      height: auto;
      margin: 2rem 0;
      z-index: 10;
    }

    .slot {
      z-index: 10;
    }
  }

  @media (min-width: 1024px) {
    @max-width: 60rem;
    .resource-content {
      max-width: @max-width;
    }

    .slot {
      margin-top: 2rem;
    }
  }

  @media (max-width: 768px) {
    .segment-content {
      .resource-content {
        width: 100%;
      }

      .slot {
        margin-top: 1rem;
      }
    }
  }
</style>

<style lang="less">
  .segment-header {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
    gap: 1rem;

    p,
    h2 {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      text-align: center;
      font-weight: 500;
    }
  }

  @media (min-width: 1024px) {
    .segment-header {
      margin-top: 2rem;
    }
  }

  @media (max-width: 768px) {
    .segment-header {
      margin-top: 1rem;

      .desc {
        line-height: 1.8rem;
      }
    }
  }
</style>
