<template>
  <div class="float-btn-group" :class="getPosition">
    <slot name="content" />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  type propsType = {
    position: 'top' | 'bottom' | '';
  };

  type PropsType = Partial<propsType>;

  const props = withDefaults(defineProps<PropsType>(), {
    position: 'top',
  });

  const getPosition = computed(() => {
    return `${props.position}`;
  });
</script>

<style scoped lang="less">
  .float-btn-group {
    width: auto;
    height: auto;
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: 16px;
    z-index: 12;
  }

  .top {
    top: 30%;
  }

  .bottom {
    bottom: 10%;
  }

  @media (min-width: 1024px) {
    .top {
      right: 3rem;
    }

    .bottom {
      right: 3rem;
    }
  }

  @media (max-width: 768px) {
    .top {
      right: 1.5rem;
    }

    .bottom {
      right: 1.5rem;
    }
  }
</style>
