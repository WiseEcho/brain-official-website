<template>
  <div class="radio-change">
    <!-- radio group round -->
    <div
      :class="isShow ? '' : datas.length > 4 ? 'more' : 'less'"
      class="radio-wrapper"
    >
      <el-tabs v-model="defaultIndex" :size="getSize">
        <el-tab-pane
          v-for="(item, index) in datas"
          :key="index"
          :label="item.label"
          :name="item.label"
        />
      </el-tabs>
    </div>
    <!-- component -->
    <div
      v-if="data.type !== 'component'"
      class="content-wrapper"
      :class="{ 'is-active': isActive }"
    >
      <el-image
        width="100%"
        height="100%"
        :preview="isPreview"
        fit="contain"
        alt=""
        :src="getImage"
        loading="eager"
      />
    </div>
    <div v-else class="slot-wrapper">
      <component :is="getComp" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import useMobile from '~/hooks/mobile';

  type radioChangePropsType = {
    label: string;
    url?: string;
    slot?: Component | null;
  };

  type propsType = {
    defaultActive: string;
    size?: 'mini' | 'small' | 'medium' | 'large';
    list: radioChangePropsType[];
    type: 'image' | 'component';
  };

  type PropsType = {
    data: propsType;
  };

  const isActive = ref<boolean>(true);
  const { getSize, isPreview, isShow } = useMobile();
  const props = withDefaults(defineProps<PropsType>(), {
    data: () => ({
      defaultActive: '本地存储',
      size: 'medium',
      list: [],
      type: 'image',
    }),
  });
  const defaultIndex = ref<string>(props.data.defaultActive);
  const datas = ref<radioChangePropsType[]>(props.data.list);
  const getImage = computed(() => {
    return (
      datas.value.find((item) => item.label === defaultIndex.value)?.url || ''
    );
  });
  const getComp = computed(() => {
    return (
      datas.value.find((item) => item.label === defaultIndex.value)?.slot ||
      null
    );
  });
  onMounted(() => {
    datas.value = props.data.list;
  });

  watch(
    () => defaultIndex.value,
    () => {
      isActive.value = false;
      nextTick(() => {
        isActive.value = true;
      });
    },
  );
</script>

<style scoped lang="less">
  .radio-change {
    @max-width: 60rem;
    width: 100%;
    max-width: @max-width;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    min-height: 20rem;
    margin-bottom: 2rem;
    box-sizing: border-box;

    .radio-wrapper {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: center;
      overflow-x: auto;
      scrollbar-width: none;
      box-sizing: border-box;

      :deep(.el-tabs) {
        width: fit-content;
        border-radius: 5rem;
        background-color: #9a66f926;
        overflow-x: auto;
        scrollbar-width: none;
        padding: 0.5rem 0.5rem;

        :deep(.el-tabs__active-bar) {
          transition: transform 0.3s cubic-bezier(0.9, 1.5, 0.75, 0.9);
        }

        .el-tabs__header {
          margin: 0;

          .el-tabs__nav-wrap:after {
            display: none;
          }

          .el-tabs__nav {
            gap: 1rem;

            .el-tabs__active-bar {
              display: none;
            }

            .el-tabs__item {
              border-radius: 5rem;
              padding: 0 0.5rem;
              color: #676c7b;
              background-color: transparent;
              outline: none;
              border: none;
              display: flex;
              text-align: center;

              &:hover {
                background: linear-gradient(90deg, #9f2dec 0%, #1438cb 100%);
                color: white;
              }

              &.is-active {
                color: white;
                background: linear-gradient(90deg, #9f2dec 0%, #1438cb 100%);
              }
            }
          }
        }

        label {
          text-wrap: nowrap;
        }
      }
    }

    .content-wrapper {
      width: 100%;
      height: auto;
      min-height: 20rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a66f926;
      border-radius: 10px;
      transform: translateY(20px);
      opacity: 0;

      :deep(.el-image__placeholder) {
        background-color: #f0e7fe;
      }
    }

    .is-active {
      transform: translateY(0) !important;
      opacity: 1 !important;
      transition:
        opacity 0.3s ease-in-out 0.3s,
        transform 0.3s ease-in-out 0.3s,
        max-height 0s ease-in-out 0.3s,
        -webkit-transform 0.3s ease-in-out 0.3s;
    }

    .slot-wrapper {
      width: 100%;
      height: fit-content;
      min-height: 20rem;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
    }
  }

  @media (min-width: 1024px) {
    .content-wrapper {
      padding: 2rem 5rem;
    }

    .radio-wrapper {
      :deep(.el-radio-group) {
        display: flex;
        gap: 0.5rem;
      }
    }
  }

  @media (max-width: 768px) {
    .radio-wrapper {
      width: 100%;
      overflow-x: auto !important;
      scrollbar-width: none;

      .more {
        :deep(.el-radio-group) {
          min-width: max-content !important;
          width: auto !important;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 0.5rem;
        }
      }

      .less {
        :deep(.el-radio-group) {
          min-width: max-content !important;
          width: auto !important;
          display: flex;
          gap: 0.5rem;
        }
      }

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
</style>
