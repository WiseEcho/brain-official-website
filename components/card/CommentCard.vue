<template>
  <div class="card-item">
    <!-- poster -->
    <div class="top-wrapper">
      <el-image
        alt="brand-logo"
        :src="poster"
        loading="eager"
        fit="cover"
        class="img"
      />
    </div>
    <!-- info -->
    <div class="middle-wrapper text-font">
      <el-text>{{ info }}</el-text>
    </div>
    <!-- footer -->
    <div class="bottom-wrapper">
      <div class="bottom-pane">
        <div class="l text-font">
          <p v-h2 style="font-weight: 600">{{ brand }}</p>
          <p class="sub-title" style="color: #858585">
            {{ brand }}
            <el-divider direction="vertical" />
            {{ sponsor }}
          </p>
        </div>
        <div class="r">
          <el-image
            alt="brand-logo"
            :src="logo"
            fit="contain"
            loading="eager"
            class="logo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  type cardType = {
    poster: string;
    info: string;
    brand: string;
    sponsor: string;
    logo: string;
  };

  type PropsType = Partial<cardType>;

  withDefaults(defineProps<PropsType>(), {
    poster: 'https://picsum.photo/200/300',
    info: '暂无内容',
    brand: '品牌方',
    sponsor: '评价人',
    logo: '/portal/images/portal-logo.svg',
  });
</script>

<style scoped lang="less">
  .card-item {
    width: 100%;
    min-height: 30rem;
    height: fit-content;
    box-sizing: border-box;
    display: grid;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    gap: 1rem;
    grid-template-rows: 1fr auto auto;
    //border: 1px solid #eaeaea;

    .top-wrapper {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    .middle-wrapper {
      width: 100%;
      height: fit-content;
      display: flex;
      max-height: 15rem;
      overflow-y: auto;
      box-sizing: border-box;
      padding: 1rem;
    }

    .bottom-wrapper {
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 1rem;

      .bottom-pane {
        width: 100%;
        height: fit-content;
        display: grid;
        margin-top: auto;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        box-sizing: border-box;

        .l {
          width: 100%;
          height: fit-content;
          display: grid;
          grid-template-rows: 1fr 1fr;

          p {
            margin: 0;
            white-space: nowrap;
          }
        }

        .r {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;

          .logo {
            width: 90px;
            height: 100%;
            display: flex;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .bottom-pane {
      .l {
        .sub-title {
          font-size: 0.8rem;
        }
      }
    }
  }

  @media (min-width: 1024px) {
    .card-item {
      .bottom-wrapper {
        .l {
          gap: 0.5rem;
        }
      }
    }
  }
</style>
