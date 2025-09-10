<template>
  <div class="swiper-wrapper">
    <client-only v-if="mode === 'horizontal'">
      <Swiper
        :modules="[
        swiperModules.Navigation,
        swiperModules.Pagination,
        swiperModules.Autoplay,
      ]"
        :slides-per-view="1"
        :space-between="30"
        :pagination="{ clickable: true }"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :loop="true"
        style="width: 100%; height: fit-content; padding-bottom: 2rem"
        @swiper="onSwiper"
      >
        <SwiperSlide v-for="(item, index) in props.data" :key="index">
          <div
            class="swiper-content-wrapper"
            :style="{
            gridTemplateColumns: isShow
              ? item.type === 'video'
                ? '1fr 1fr'
                : '37rem 1fr'
              : undefined,
          }"
          >
            <div class="l">
              <h2 v-h1 style="color: white; font-weight: 500">
                <template v-for="(line, idx) in item.title.split('|')" :key="idx">
                  {{ line }}<br v-if="idx !== item.title.split('|').length - 1" />
                </template>
              </h2>
              <p v-h2 style="color: #afc5e2">{{ item.desc }}</p>
              <div class="btn">
                <QuickUse :label="item.btnText" :on-click="jump" />
              </div>
            </div>
            <div class="r">
              <el-image
                v-if="item.type === 'image'"
                :src="item.showUrl"
                alt=""
                fit="contain"
                style="object-fit: contain; width: 100%"
                class="img-poster"
                loading="eager"
                title=""
              />
              <video
                ref="videoRef"
                v-else-if="item.type === 'video'"
                class="video-player"
                controls
                :src="item.showUrl"
                poster="/images/poster.png"
                @playing="onPlaying"
                @ended="onPlayed"
                @pause="onStopPlaying"
              ></video>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </client-only>
    <div v-else class="vertical-swiper">
      <div class="swiper-content">
        <div class="l">
          <div
            v-for="(item, index) in dataList"
            :key="index"
            class="swiper-selector"
            :class="item.defaultIndex ? 'swiper-selector-active' : ''"
            @click="onClick(item)"
            @mouseenter="onHover(item)"
          >
            <p style="margin: 0; font-size: 1.5rem">{{
              item.title || '暂无标题'
            }}</p>
            <p class="sub-title" style="margin-bottom: 0">{{
              item.desc || '暂无描述'
            }}</p>
            <el-image
              v-if="!isShow && item.defaultIndex"
              :src="currentUrl"
              loading="lazy"
              fit="contain"
              alt=""
              title=""
              style="width: 100%; height: fit-content"
              :style="isShow ? '' : 'margin-top: 1rem'"
            />
          </div>
        </div>
        <div v-if="isShow" class="r">
          <el-image
            alt=""
            class="img"
            loading="lazy"
            :src="currentUrl"
            fit="contain"
            title=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import useMobile from '~/hooks/mobile';

  const { $swiperModules } = useNuxtApp();
  const swiperModules = $swiperModules;
  const carousel = ref();
  const videoRef = ref();

  type PropsType = {
    title: string;
    desc: string;
    route: string;
    showUrl: string;
    btnText: string;
    type: 'image' | 'video';
    defaultIndex?: number | null;
    index?: string;
  };

  const currentUrl = ref<string>('');
  const { isShow, isPc } = useMobile();
  const props = withDefaults(
    defineProps<{
      data?: any[];
      mode?: 'vertical' | 'horizontal';
    }>(),
    {
      data: () => [],
      mode: 'horizontal',
    },
  );
  const dataList = ref<PropsType[]>(props.data);
  const jump = () => {
    if (process.client) {
      window.location.href = '/dashboard';
    }
  };
  function onInitSwiper() {
    dataList.value.forEach((item) => {
      if (item.defaultIndex !== null) {
        currentUrl.value = item.showUrl || '';
      }
    });
  }

  function selectorChangeHandle(item: PropsType) {
    dataList.value.forEach(itm => {
      if (itm.index !== item.index) {
        itm.defaultIndex = null
      } else {
        currentUrl.value = itm.showUrl || '';
        itm.defaultIndex = 1;
      }
    });
  }

  function onClick(item: PropsType) {
    if (isPc()) return;
    selectorChangeHandle(item);
  }

  function onHover(item: PropsType) {
    if (isPc()) {
      selectorChangeHandle(item);
    }
  }

  function onSwiper(swiper: any) {
    carousel.value = swiper;
  }

  // 如果视频开始播放就停止轮播图的滚动
  function onPlaying() {
    if (process.client && carousel.value) {
      carousel.value.autoplay.stop();
    }
  }

  function onStopPlaying() {
    if (process.client && carousel.value) {
      carousel.value.autoplay.start();
    }
  }

  function onPlayed() {
    if (process.client && carousel.value) {
      carousel.value.autoplay.start();
    }
  }

  onMounted(() => {
    onInitSwiper();
  });
</script>

<style scoped lang="less">
  .swiper-wrapper {
    @flex-gap: 1rem;
    @content-height: 17.5rem;
    @max-width: 60rem;
    width: 100%;
    font-family: PingFang SC;
    height: fit-content;
    display: flex;
    box-sizing: border-box;
    transition: all 0.5s ease;

    :deep(.swiper-pagination) {
      .swiper-pagination-bullet {
        width: 2rem;
        border-radius: 1rem;
        height: 5px;
        background-color: #fcfcfc66;
      }

      .swiper-pagination-bullet-active {
        width: 5rem;
        background: #fcfcfcb2 !important;
      }
    }

    .swiper-content-wrapper {
      width: 100%;
      @inner-height: 18rem;
      display: grid;
      height: fit-content;
      box-sizing: border-box;
      color: white;
      padding: 0 1rem;

      :deep(.el-carousel__item) {
        height: 100%;
      }

      .l {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.5rem;

        p {
          margin: 0;
        }
      }

      .r {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;

        .video-player {
          width: 100%;
          border-radius: 10px;
          object-fit: contain;
          background-color: black;
          overflow: hidden;
        }

        .el-image {
          height: 100%;
        }
      }
    }

    .vertical-swiper {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;

      .swiper-content {
        width: 100%;
        max-width: @max-width;
        height: fit-content;
        display: grid;
        overflow: hidden;
        box-sizing: border-box;

        .l {
          width: 100%;
          height: fit-content;
          display: grid;
          grid-template-rows: 1fr auto auto auto;
          gap: @flex-gap;
          box-sizing: border-box;
          padding: 0.5rem;
          transition: all 0.5s ease;

          .swiper-selector {
            height: fit-content;
            display: flex;
            flex-direction: column;
            border-radius: 10px;
            cursor: pointer;
            padding: @flex-gap;
            transition: all 0.5s ease;
            position: relative;
            z-index: 10;
            color: #cccccc;
            box-sizing: border-box;

            //p {
            //  margin: 0;
            //}

            &:hover {
              :deep(.arco-typography) {
                color: #ffffff;
              }
            }
          }

          .swiper-selector::before {
            content: '';
            display: flex;
            position: absolute;
            top: -1px;
            left: -1px;
            right: -1px;
            bottom: -1px;
            border-radius: 10px;
            pointer-events: none;
            z-index: -1;
          }

          .swiper-selector-active {
            background-color: #f3dfff26;

            :deep(.arco-typography) {
              color: #ffffff;
            }

            &::before {
              background-image: linear-gradient(90deg, #8c3aed, #1c90f9);
              padding: 1px; /* 控制描边宽度 */
              -webkit-mask:
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
              -webkit-mask-composite: xor;
              mask-composite: exclude;
            }
          }
        }

        .r {
          width: 100%;
          max-width: @max-width;
          display: flex;
          transition: all 0.5s ease;

          :deep(.el-image__placeholder) {
            background-color: #190038;
          }
        }
      }
    }
  }

  @media (min-width: 1024px) {
    .swiper-content {
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      .sub-title {
        font-size: 1rem;
        margin-top: 0.5rem;
      }
    }

    .video-player {
      height: 80%;
    }

    .title {
      font-size: 1rem;
    }

    .swiper-content-wrapper {
      height: 100%;
      gap: 1rem;
      .l {
        height: 100%;

        .btn {
          margin-top: 2rem;
          height: fit-content;
        }
      }
    }

    .swiper-selector {
      max-width: 26.8rem;
      width: 100%;
    }

    .swiper-selector:hover {
      background-color: #f3dfff26;

      &::before {
        background-image: linear-gradient(90deg, #8c3aed, #1c90f9);
        padding: 1px; /* 控制描边宽度 */
        -webkit-mask:
          linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
      }
    }

    .vertical-swiper {
      padding: 2rem 0;
    }
  }
  @media (max-width: 768px) {
    .swiper-content,
    .swiper-content-wrapper {
      grid-template-rows: auto 1fr;

      .r {
        display: flex;
        width: fit-content;
        height: 100%;
        order: -1;
        align-items: center;
        justify-content: center;

        :deep(.el-image) {
          height: 10rem;
        }

        .video-player {
          max-height: 18rem;
        }

        .img-poster {
          max-height: 12rem;
        }
      }

      .l {
        height: 12rem;
        width: 100%;
        padding: 0.5rem 0;

        .btn {
          margin-top: auto;

          .free-wrapper {
            margin-bottom: 0;
          }
        }

        .swiper-selector {
          width: 100%;

          .sub-title {
            font-size: 1rem;
            margin-top: 0.5rem;
          }
        }
      }
    }

    .swiper-content-wrapper {
      height: fit-content;
    }

    .swiper-content {
      gap: 0.5rem;
    }
  }
</style>

<style lang="less">
  .img {
    width: 100%;
    height: 100%;
  }
</style>
