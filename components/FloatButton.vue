<template>
  <el-tooltip
    v-if="tooltip"
    v-model:visible="isShow"
    trigger="click"
    effect="light"
    placement="left"
  >
    <div class="float-btn" :class="getConfig">
      <!-- icon -->
      <div v-if="icon" class="icon-wrapper">
        <el-image alt="" fit="contain" :src="icon" :preview="false" />
      </div>
      <!-- desc -->
      <div v-if="desc" class="desc-wrapper text-font">
        <span>{{ desc || '暂无内容' }}</span>
      </div>
    </div>
    <template #content>
      <slot name="tooltip" />
    </template>
  </el-tooltip>
  <div v-else class="float-btn" :class="getConfig">
    <!-- icon -->
    <div v-if="icon" class="icon-wrapper">
      <el-image alt="" fit="contain" :src="icon" :preview="false" />
    </div>
    <!-- desc -->
    <div v-if="desc" class="desc-wrapper text-font">
      <span>{{ desc || '暂无内容' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  type propsType = {
    icon: string;
    desc: string;
    tooltip: string | HTMLElement;
    type: 'primary' | 'default';
    onClick: () => void;
    href: string;
    position: 'top' | 'bottom' | '';
  };

  type PropsTypes = Partial<propsType>;
  const isShow = ref<boolean>(false);

  const props = withDefaults(defineProps<PropsTypes>(), {
    position: '',
    type: 'primary',
  });

  const getConfig = computed(() => {
    return `${props.type} ${props.position}`;
  });

  function onScroll() {
    isShow.value = false;
  }

  onMounted(() => {
    if (process.client) {
      window.addEventListener('scroll', onScroll);
    }
  });

  onBeforeUnmount(() => {
    if (process.client) {
      window.removeEventListener('scroll', onScroll);
    }
  });
</script>

<style scoped lang="less">
  .float-btn {
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    z-index: 12;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    cursor: pointer;
    padding: 0.5rem;

    .icon-wrapper {
      width: auto;
      height: auto;
      display: flex;
    }

    .desc-wrapper {
      font-family: PingFang SC;
      font-weight: 300;
      font-style: Light;
      font-size: 14px;
      leading-trim: NONE;
      line-height: 100%;
      letter-spacing: 0%;
      text-align: center;
      vertical-align: middle;
    }
  }

  .default {
    background-color: white;
    box-shadow: 0px 5px 15.5px -2px #9963fe33;
    color: black;
  }

  .primary {
    background: linear-gradient(180deg, #d255f7 0%, #6881fa 100%);
    box-shadow: 0px 5px 15.5px -2px #9963fe33;
    color: white;
  }

  .top {
    top: 45%;
    right: 3rem;
    position: fixed;
  }

  .bottom {
    bottom: 10%;
    right: 3rem;
    position: fixed;
  }

  @media (min-width: 1024px) {
    .float-btn {
      width: 3.75rem;
      height: 3.75rem;
      padding: 0.5rem;

      .icon-wrapper {
        width: 80%;
        height: fit-content;
      }
    }
  }

  @media (max-width: 768px) {
    .float-btn {
      width: 3rem;
      height: 3rem;

      .icon-wrapper {
        width: 100%;
        height: 100%;
      }

      .desc-wrapper {
        display: none;
      }
    }
  }
</style>
