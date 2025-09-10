<template>
  <div class="price-group">
    <div
      v-if="isShow"
      v-for="(item, index) in groupPrice"
      :key="index"
      class="price-card-wrapper"
    >
      <PriceCard
        :background="item.background as themeType"
        :poster="item.poster"
        :price="item.price"
        :price-suffix="item.priceSuffix"
        :count="item.count"
        :ad-accounts="item.adAccounts"
        :origin-price="item.originPrice"
        :storage-count="item.storageCount"
      />
    </div>
    <div v-else class="price-mobile-wrapper">
      <client-only>
        <Swiper
          :modules="[swiperModules.Navigation, swiperModules.Pagination]"
          :slides-per-view="1"
          :space-between="30"
          :pagination="{ clickable: true }"
          style="width: 100%; height: 100%"
        >
          <SwiperSlide
            v-for="(item, index) in groupPrice"
            :key="index"
            style="display: flex; justify-content: center"
          >
            <PriceCard
              :background="item.background as themeType"
              :poster="item.poster"
              :price="item.price"
              :price-suffix="item.priceSuffix"
              :count="item.count"
              :ad-accounts="item.adAccounts"
              :origin-price="item.originPrice"
              :storage-count="item.storageCount"
            />
          </SwiperSlide>
        </Swiper>
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
  import PriceCard from '~/components/card/PriceCard.vue';
  import useMobile from '~/hooks/mobile';
  const { $swiperModules } = useNuxtApp();
  const swiperModules = $swiperModules;
  type themeType = 'classic' | 'professional' | 'exalted' | undefined;

  const { isShow } = useMobile();

  const groupPrice = [
    {
      background: 'classic',
      poster: '/home/images/price/cv-company.png',
      price: '7500',
      priceSuffix: '元/月',
      originPrice: '120000元/年',
      count: 30,
      adAccounts: 20,
      storageCount: 6,
    },
    {
      background: 'professional',
      poster: '/home/images/price/pv-company.png',
      price: '12500',
      priceSuffix: '元/月',
      originPrice: '200000元/年',
      count: 50,
      adAccounts: 50,
      storageCount: 10,
    },
    {
      background: 'exalted',
      poster: '/home/images/price/lv-company.png',
      price: '25000',
      priceSuffix: '元/月',
      originPrice: '400000元/年',
      count: 100,
      adAccounts: 100,
      storageCount: 100,
    },
  ];
</script>

<style scoped lang="less">
  .price-group {
    width: 100%;
    height: auto;
    display: grid;
    gap: 1rem;
    box-sizing: border-box;

    .price-card-wrapper {
      width: 100%;
      height: fit-content;
      display: flex;
      box-sizing: border-box;
    }

    .price-mobile-wrapper {
      width: 100%;
      height: 30rem;
      display: flex;
      box-sizing: border-box;
      flex-direction: column;

      :deep(.swiper-pagination) {
        bottom: 0 !important;
      }
    }
  }

  @media (min-width: 1024px) {
    .price-group {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
    }
  }

  @media (max-width: 768px) {
    .price-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
</style>
