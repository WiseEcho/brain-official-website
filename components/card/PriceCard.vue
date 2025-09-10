<template>
  <el-skeleton
    animated
    :rows="isShow ? 7 : 5"
    :loading="isLoading"
    style="width: 100%"
  >
    <div class="price-card">
      <div class="card-wrapper" :class="getBackground">
        <!-- poster -->
        <div class="poster">
          <img :src="poster" alt="" loading="lazy" />
        </div>
        <!-- price -->
        <div class="price-wrapper">
          <span>{{ price }}</span>
          {{ priceSuffix }}
        </div>
        <p class="origin-price text-font">原价 {{ originPrice }}</p>
        <!-- contact btn -->
        <div
          style="
            width: 100%;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <el-tooltip
            v-model:visible="showTooltip"
            effect="light"
            trigger="click"
          >
            <template #content>
              <div>
                <img
                  src="/images/qrcode_for_gw.jpg"
                  alt="qr-code"
                  style="
                    object-position: center;
                    object-fit: contain;
                    width: 10rem;
                    height: 10rem;
                  "
                  loading="lazy"
                />
              </div>
            </template>
            <el-button
              round
              class="free-use"
              :style="{ width: isShow ? '100%' : 'auto' }"
            >
              购买咨询
            </el-button>
          </el-tooltip>
        </div>
        <!-- info -->
        <ul class="text-font">
          <li>授权席位: {{ count }} 个</li>
          <li>授权广告账户: {{ adAccounts }} 个</li>
          <li>授权存储空间: {{ storageCount }} T</li>
        </ul>
        <!-- footer -->
        <div class="footer text-font">
          <div class="footer-wrapper">
            <span>版本功能</span>
            全功能
          </div>
        </div>
      </div>
    </div>
  </el-skeleton>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import useMobile from '~/hooks/mobile';

  type propsType = {
    background: 'classic' | 'professional' | 'exalted' | undefined;
    poster: string;
    price: string;
    priceSuffix: string;
    originPrice: string;
    count: number;
    adAccounts: number;
    storageCount: number;
    isLoading: boolean;
  };

  type PropsType = Partial<propsType>;
  const showTooltip = ref<boolean>(false);

  const props = withDefaults(defineProps<PropsType>(), {
    background: 'classic',
  });

  const isLoading = ref<boolean>(false);
  const getBackground = computed(() => {
    return props.background;
  });

  const { isShow } = useMobile();
  const imgLoadingHandler = () => {
    isLoading.value = false;
  };

  function onScroll() {
    showTooltip.value = false;
  }

  onMounted(() => {
    // isLoading.value = true;
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
  .price-card {
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 10px;
    box-sizing: border-box;

    .card-wrapper {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      flex-direction: column;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .price-wrapper {
        width: fit-content;
        height: 60px;
        gap: 5px;
        display: flex;
        align-items: baseline;
        position: relative;
        font-size: 12px;

        span {
          font-family: PingFang SC;
          font-weight: 600;
          font-style: Semibold;
          font-size: 34px;
          color: #2d2d2d;
          leading-trim: NONE;
          line-height: 158%;
          letter-spacing: 0;
          vertical-align: middle;
        }

        &::before {
          content: '￥';
          width: auto;
          height: auto;
          font-weight: 600;
          color: black;
          top: 5px;
          left: -10px;
          position: absolute;
        }

        &::after {
          content: '现价';
          width: 2.5rem;
          height: 1.25rem;
          display: flex;
          top: 0;
          position: absolute;
          right: -5px;
          border-radius: 0 5rem 0 5rem;
          align-items: center;
          justify-content: center;
          font-family:
            PingFang SC,
            serif;
          font-weight: 400;
          font-style: Regular;
          font-size: 10px;
          leading-trim: NONE;
          line-height: 158%;
          letter-spacing: 0;
          vertical-align: middle;
        }
      }

      .origin-price {
        margin-top: 0;
        color: gray;
        text-decoration: line-through;
        font-size: 12px;
      }

      ul {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        list-style: none;
        padding: 0;

        li {
          margin-bottom: 1rem;

          &::before {
            content: '';
            width: 4px;
            height: 4px;
            border-radius: 2px;
            background-color: black;
            vertical-align: middle;
            margin-right: 1rem;
          }
        }
      }

      .poster {
        width: 100%;
        display: flex;
        border-radius: 10px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-position: center;
          object-fit: cover;
        }
      }

      .footer {
        width: 100%;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #323232;

        .footer-wrapper {
          width: 11.5rem;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;

          span {
            display: flex;
            width: fit-content;
            height: 100%;
            align-items: center;
            border-radius: 5px;
            padding: 0 0.5rem;
          }
        }
      }
    }
  }

  .classic {
    background: linear-gradient(
      179.97deg,
      rgba(2, 106, 255, 0.1) 10.19%,
      rgba(132, 188, 255, 0) 99.98%
    );

    .price-wrapper {
      &::after {
        color: #0072fa;
        background-color: #b3d6ff80;
      }
    }

    .footer-wrapper {
      span {
        background: linear-gradient(90deg, #66acff 0%, #0072fa 100%);
        color: white;
      }
    }
  }

  .professional {
    background: linear-gradient(
      179.97deg,
      rgba(191, 59, 243, 0.1) 10.19%,
      rgba(180, 56, 240, 0) 99.98%
    );

    .price-wrapper {
      &::after {
        color: #9730ea;
        background-color: #e2b3ff66;
      }
    }

    .footer-wrapper {
      span {
        background: linear-gradient(90deg, #d842f8 0%, #9430e9 100%);
        color: white;
      }
    }
  }

  .exalted {
    background: linear-gradient(
      179.97deg,
      rgba(253, 232, 201, 0.5) 10.19%,
      rgba(253, 232, 201, 0) 99.98%
    );

    .price-wrapper {
      &::after {
        color: #1f1f1f;
        background-color: #fde8c9;
      }
    }

    .footer-wrapper {
      span {
        background: linear-gradient(90deg, #3f3321 0%, #1b1915 100%);
        color: white;
      }
    }
  }

  @media (min-width: 1024px) {
    .price-card {
      padding: 0.5rem;

      .card-wrapper {
        padding: 0.5rem;
      }

      .price-wrapper {
        margin-top: 2rem;
      }

      .footer {
        margin-top: 2rem;
      }

      .origin-price {
        margin-bottom: 1rem;
      }
    }
  }

  @media (max-width: 768px) {
    .price-card {
      width: 100%;
      height: 100%;
      max-width: 17rem;
      box-sizing: border-box;

      .card-wrapper {
        padding: 0.5rem;
      }

      .poster {
        margin-bottom: 0.5rem;
      }
    }
  }
</style>
