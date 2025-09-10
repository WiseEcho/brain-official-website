<template>
  <div class="evaluation">
    <el-carousel
      :interval="3000"
      autoplay
      arrow="never"
      indicator-type="never"
      style="width: 100%"
      height="30rem"
      indicator-position="none"
    >
      <template v-if="isShow">
        <el-carousel-item v-for="(item, index) in dataList" :key="index">
          <div class="card-wrapper">
            <CommentCard
              v-for="(itm, idx) in item"
              :key="idx"
              :poster="itm.poster"
              :info="itm.desc"
              :brand="itm.brand"
              :sponsor="itm.sponsor"
              :logo="itm.brandLogo"
            />
          </div>
        </el-carousel-item>
      </template>
      <template v-else>
        <el-carousel-item v-for="(item, index) in props.data" :key="index">
          <div class="card-wrapper">
            <CommentCard
              :poster="item.poster"
              :info="item.desc"
              :brand="item.brand"
              :sponsor="item.sponsor"
              :logo="item.brandLogo"
            />
          </div>
        </el-carousel-item>
      </template>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
  import { chunk } from 'lodash-es';
  import useMobile from '~/hooks/mobile';
  import CommentCard from '~/components/card/CommentCard.vue';

  type cardType = {
    sponsor: string;
    brand: string;
    brandLogo: string;
    poster: string;
    desc: string;
  };

  type propsType = Partial<cardType>;

  type PropsType = {
    data?: propsType[] | any;
  };

  const props = withDefaults(defineProps<PropsType>(), {
    data: () => [],
  });
  const dataList = ref<any[]>([]);
  const { isShow } = useMobile();
  const getDataChunk = () => {
    if (isShow) {
      // PC 端：每两个一组，保持二维数组结构
      dataList.value = chunk(props.data, 2);
    } else {
      // 移动端：直接使用原始数组
      dataList.value = props.data;
    }
  };

  onMounted(() => {
    getDataChunk();
  });

  watch(
    () => props.data,
    () => {
      getDataChunk();
    },
    {
      deep: true,
      immediate: true,
    },
  );
</script>

<style scoped lang="less">
  .evaluation {
    @min-height: 28rem;
    width: 100%;
    height: auto;
    max-width: 60rem;
    display: flex;
    margin-bottom: 3rem;
    box-sizing: border-box;

    .card-wrapper {
      width: 100%;
      height: 100%;
      display: grid;
      gap: 1rem;
      box-sizing: border-box;
    }
  }

  @media (min-width: 1024px) {
    .card-wrapper {
      grid-template-columns: 1fr 1fr;
      padding: 0 5rem;
    }

    :deep(.arco-carousel-slide, .arco-carousel-card, .arco-carousel-fade) {
      min-height: 30rem;
    }
  }

  @media (max-width: 768px) {
    .card-wrapper {
      grid-template-columns: 1fr;
    }

    :deep(.arco-carousel-slide, .arco-carousel-card, .arco-carousel-fade) {
      min-height: 70rem;
    }
  }
</style>
