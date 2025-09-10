<template>
  <div class="statistic-wrapper">
    <div v-for="(item, index) in data" :key="index" class="statistic-item">
      <!-- top -->
      <div class="t">
        <el-statistic
          :value="transitionCounts[index].value"
          :suffix="item.countSuffix"
        />
      </div>
      <!-- bottom -->
      <div class="f">
        {{ item.label }}
        <img class="icon" :src="item.icon" loading="eager" alt="icon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTransition } from '@vueuse/core';

  type propsType = {
    count: number;
    label: string;
    countSuffix: string;
    icon: string;
  };

  type PropsType = {
    data: Partial<propsType>[];
    duration?: number;
  };

  const props = withDefaults(defineProps<PropsType>(), {
    data: () => [],
    duration: 3500,
  });

  const data = ref<Partial<propsType>[]>(props.data || []);

  const transitionCounts = computed(() =>
    data.value.map((item) =>
      useTransition(item.count ?? 0, { duration: props.duration }),
    ),
  );
</script>

<style scoped lang="less">
  .statistic-wrapper {
    width: 100%;
    height: fit-content;
    display: grid;
    box-sizing: border-box;
    justify-content: center;

    .statistic-item {
      width: 100%;
      height: fit-content;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      box-sizing: border-box;
      font-family: PingFang SC;

      .t {
        width: 100%;
        height: fit-content;

        :deep(.el-statistic__content) {
          color: white;
          display: flex;
          justify-content: center;
        }
      }

      .f {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        color: white;
        justify-content: center;
        white-space: nowrap;

        .icon {
          width: 17px;
          height: 17px;
        }
      }
    }
  }

  @media (min-width: 1024px) {
    .statistic-wrapper {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      gap: 1rem;
      max-width: 60rem;

      .statistic-item {
        .t {
          :deep(.el-statistic__content) {
            font-size: 2.5rem;
            font-weight: 600;
            text-align: center;
          }
        }

        .f {
          font-size: 1rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .statistic-wrapper {
      grid-template-columns: auto auto auto auto auto auto;
      grid-template-rows: 1fr 1fr;
      column-gap: 1rem;
      row-gap: 2rem;
      justify-content: center;

      .statistic-item {
        width: auto;
        grid-column: span 2;
        .t {
          :deep(.el-statistic__content) {
            font-size: 1.8rem;
            font-weight: 600;
          }
        }

        .f {
          font-size: 0.8rem;

          .icon {
            width: 14px;
            height: 14px;
            object-fit: contain;
          }
        }
      }

      .statistic-item:nth-child(4) {
        grid-column: span 3;
      }
    }
  }
</style>
