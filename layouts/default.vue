<template>
  <el-container class="layout">
    <!-- header -->
    <el-header :class="headerDark" class="header-base">
      <keep-alive>
        <PortalHeader />
      </keep-alive>
    </el-header>
    <!-- content -->
    <el-main
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
        overflow-x: hidden;
      "
    >
      <keep-alive>
        <NuxtPage />
      </keep-alive>
      <ResourceItem v-if="isShow" :data="resourceMap.get('首页素材4')">
        <template #title>
          <h2 v-h1 class="resource-title">选择视频大脑 您可获得什么？</h2>
        </template>
        <template #background>
          <BackTwo />
        </template>
      </ResourceItem>
      <ResourceItem
        v-if="isShow"
        class="bg-white-blur"
        :data="resourceMap.get('首页素材5')"
      />
      <ResourceItem :data="resourceMap.get('首页素材6')">
        <template #title>
          <h2 v-h1 class="resource-title">从繁杂到高效</h2>
          <h2 v-h1 style="margin-top: 0" class="resource-title"
            >视频大脑让每一位团队成员的工作都更有价值</h2
          >
        </template>
        <template #background>
          <BackTwo />
        </template>
      </ResourceItem>
      <ResourceItem class="bg-white-blur" :data="resourceMap.get('footer')" />
    </el-main>
    <!-- float buttons -->
    <FloatButtonGroup :position="getFloatBtnPosition">
      <template #content>
        <FloatButton
          tooltip="18008627166"
          desc="电话咨询"
          type="primary"
          :icon="PHONE"
        >
          <template #tooltip>
            <div
              style="
                width: fit-content;
                height: auto;
                display: flex;
                align-items: center;
              "
            >
              <el-image
                style="width: 20px; height: 20px"
                fit="contain"
                :src="PHONE_ACTIVE"
                :preview="false"
                loading="eager"
                alt=""
              />
              <a
                href="tel:18008627166"
                style="color: black; text-decoration: none"
                >18008627166</a
              >
            </div>
          </template>
        </FloatButton>
        <FloatButton
          tooltip="'微信二维码'"
          desc="微信咨询"
          type="default"
          :icon="WECHAT"
        >
          <template #tooltip>
            <div
              style="
                width: fit-content;
                height: fit-content;
                display: flex;
                flex-direction: column;
              "
            >
              <el-image
                :preview="false"
                style="width: 90px; height: 90px"
                fit="contain"
                alt=""
                :src="QR_CODE"
                loading="eager"
              />
              <span
                class="text-font"
                style="font-size: 14px; text-align: center; align-items: center"
                >扫码加客服</span
              >
            </div>
          </template>
        </FloatButton>
      </template>
    </FloatButtonGroup>
  </el-container>
</template>

<script setup lang="ts">
  import useResource from '~/hooks/resource';
  import useMobile from '~/hooks/mobile';
  import BackTwo from '~/components/bg/BackTwo.vue';
  import PortalHeader from '~/components/header/PortalHeader.vue';
  import useHeader from '~/hooks/header';

  const { resourceMap, isShow } = useResource();
  const { headerDark } = useHeader();
  const { getFloatBtnPosition } = useMobile();
  const PHONE = '/images/icon/phone.png';
  const PHONE_ACTIVE = '/images/icon/phone-logo-active.png';
  const WECHAT = '/images/icon/wechat.png';
  const QR_CODE = '/images/qrcode_for_gw.jpg';

  useSeoMeta({
    ogImage: {
      url: 'https://vms.9466.com/home/images/poster.png',
      type: 'image/png',
    },
    ogSiteName: '9466视频大脑',
    ogType: 'website',
    ogTitle: '视频大脑 - 短视频营销协同数智化平台',
    ogUrl: 'https://vms.9466.com/',
    ogDescription: '视频大脑是专为内容营销团队打造的“编、拍、剪、投、察”全流程生产系统。整合策划、拍摄、剪辑、发布、分析，一站式解决视频生产难题，大幅提升团队效率与内容效果。',
  });
</script>

<style scoped lang="less">
  .layout {
    width: 100%;
    height: auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    background-image: url('/images/portal-bg.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .header-base {
      backdrop-filter: blur(5px);
    }

    .header-active {
      background-color: rgba(25, 0, 56, 0.8) !important;
      border-color: #f4f4f4;

      :deep(.el-button) {
        color: white;
      }
    }

    .header-active-dark {
      background-color: rgba(255, 255, 255, 0.8) !important;
      border-color: #f4f4f4;

      :deep(.el-button) {
        color: black;
      }

      :deep(.el-button:hover) {
        background-color: #9a66f926 !important;
      }

      .btn-hover {
        background-color: #9a66f926 !important;
      }
    }

    :deep(.el-header) {
      height: 72px;
      width: 100%;
      display: flex;
      align-items: center;
      position: fixed;
      justify-content: center;
      border-bottom: 1px solid transparent;
      box-sizing: border-box;
      top: 0;
      left: 0;
      color: white;
      z-index: 15;
      background-color: transparent;
    }
  }
</style>

<style lang="less">
  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
  }

  // 全局统一字体
  .text-font {
    font-family: PingFang SC;
  }

  .segment-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 1rem 1rem 0;
  }

  h2,
  h3 {
    font-weight: 500;
  }

  body {
    margin: 0;
    overflow-x: hidden;
  }

  :deep(.el-header) {
    padding: 0;
  }

  :deep(.el-main) {
    overflow: hidden;
    scroll-behavior: smooth;
    scrollbar-width: thin;
  }

  @media (max-width: 768px) {
    .content-wrapper {
      box-sizing: border-box;
    }
  }
</style>

<style lang="less">
  .view-layout {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .resource-title {
    font-size: 36px;
    line-height: 1.23;
    font-weight: 500;
    white-space: normal;
    overflow-wrap: anywhere;
  }

  .bg-white {
    background: linear-gradient(0deg, #fcf9ff, #ffffff 70%);
  }

  .bg-white-blur {
    backdrop-filter: blur(5px);
    background: rgba(255, 255, 255, 0.75);
  }

  .portal-content {
    @max-width: 60rem;
    width: 100%;
    height: auto;
    max-width: @max-width;
  }

  @media (max-width: 768px) {
    .resource-title {
      color: #03a6fa;
    }
  }

  @media (min-width: 1024px) {
    .resource-title {
       background: linear-gradient(90deg, #c62eec, #0e9afa, #00a9f9);
       -webkit-background-clip: text;
       background-clip: text;
       -webkit-text-fill-color: transparent;
       text-fill-color: transparent;
    }
  }
</style>
