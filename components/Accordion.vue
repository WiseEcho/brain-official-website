<template>
  <div class="accordion-wrapper">
    <div
      v-for="(item, index) in dataList"
      :key="index"
      class="accordion-item"
      :class="!item.isCollapse ? 'accordion-active' : ''"
      @mouseenter="onHover(item)"
      @mouseleave="onHover(item)"
      @click="onClick(item)"
    >
      <img alt="" :src="item.img" loading="eager" class="accordion-layer" />
      <div class="accordion-overlay"></div>
      <!-- title -->
      <p
        class="title text-font"
        style="color: white; z-index: 3; position: relative"
        >{{ item.title }}
      </p>
      <!-- desc -->
      <p
        v-if="!item.isCollapse"
        style="color: white; z-index: 3; position: relative"
        class="sub-title text-font"
      >
        {{ item.desc }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  type dataType = {
    title: string;
    desc: string;
    img: string;
    isCollapse: boolean;
  };

  type propsType = {
    data: dataType[];
    trigger: 'hover' | 'click';
  };

  type PropsType = Partial<propsType>;

  const props = withDefaults(defineProps<PropsType>(), {
    data: () => [],
    trigger: 'click',
  });
  const dataList = ref<dataType[]>(props.data);

  const openChangeHandler = (item: any) => {
    dataList.value.forEach((itm) => {
      itm.isCollapse = true;
    });
    dataList.value.forEach((itm) => {
      if (itm.title === item.title) {
        itm.isCollapse = false;
      }
    });
  };

  function onClick(item: any) {
    if (props.trigger === 'click') {
      openChangeHandler(item);
    }
  }

  function onHover(item: any) {
    if (props.trigger === 'hover') {
      openChangeHandler(item);
    }
  }
</script>

<style scoped lang="less">
  .accordion-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    gap: 10px;

    .accordion-item {
      flex: 1 1 11.25rem;
      background-color: gray;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      box-sizing: border-box;
      justify-content: center;
      align-items: flex-start;
      overflow: hidden;
      position: relative;
      padding: 1rem;
      transition:
        flex 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        min-width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        min-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      .sub-title {
        margin: 0;
      }

      .accordion-layer {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .accordion-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4); // 0.4 可调整，越大越黑
      z-index: 1;
      pointer-events: none; // 避免遮罩影响点击
    }

    .accordion-active {
      flex-basis: 24rem;
    }
  }

  @media (min-width: 1024px) {
    .accordion-wrapper {
      height: 22.5rem;
      .accordion-item {
        min-width: 11.25rem;
        transition:
          flex 0.3s ease,
          min-width 0.3s ease;

        .title {
          font-size: 1.5rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .accordion-wrapper {
      padding: 0 1rem;
      height: auto;
      max-height: 60rem;
      flex-direction: column;
      .accordion-item {
        min-width: 8rem;
        flex-basis: 4rem; // 这里设置未激活时的高度
        transition: flex-basis 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        .title {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .sub-title {
          font-size: 14px;
        }
      }

      .accordion-active {
        flex-basis: 16rem; // 激活时的高度
      }
    }
  }
</style>
