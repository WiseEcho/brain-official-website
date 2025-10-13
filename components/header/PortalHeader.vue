<template>
  <div class="view-header">
    <!-- l -->
    <div class="l">
      <h1 @click="goHome" class="header-logo">
        <img :src="headerLogo" title="" alt="logo" loading="eager" />
      </h1>
      <div class="header-menu">
        <template v-for="(item, index) in portalMenu" :key="index">
          <el-button
            v-if="!item.subMenu || item.subMenu?.showMode !== getDevice"
            type="text"
            round
            :class="checkActive(item)"
            @click="onClick(item.route)"
          >
            {{ item.name }}
          </el-button>
          <el-popover
            v-else-if="item.subMenu && item.subMenu.showMode === getDevice"
            trigger="hover"
            popper-style="width: fit-content"
          >
            <template #reference>
              <el-button
                type="text"
                round
                :class="checkActive(item)"
                @click="onClick(item.route)"
              >
                {{ item.name }}
                <el-icon style="margin-left: 5px"><ArrowDown /></el-icon>
              </el-button>
            </template>
            <template #default>
              <div class="dropdown-wrapper">
                <div
                  v-for="(itm, idx) in item.subMenu.datas"
                  :key="idx"
                  class="dropdown-item"
                  @click="onClick(itm.href as string)"
                >
                  <h3
                    style="
                      margin: 0;
                      align-items: center;
                      display: flex;
                      gap: 0.2rem;
                    "
                  >
                    <img
                      style="
                        width: 16px;
                        height: fit-content;
                        object-fit: contain;
                      "
                      alt=""
                      :src="itm.icon"
                      loading="eager"
                    />
                    {{ itm.name }}
                  </h3>
                  <p style="color: rgb(80, 66, 136)">{{ itm.desc }}</p>
                </div>
              </div>
            </template>
          </el-popover>
        </template>
      </div>
    </div>
    <!-- r -->
    <div v-hidden class="r">
      <el-button @click="jump" type="text" round>登录</el-button>
      <QuickUse :on-click="freeuse" style="margin: 0" label="免费试用" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, watch } from 'vue';
  import useMobile from '~/hooks/mobile';
  import useMenu from '~/hooks/useMenu';
  import useHeader from '~/hooks/header';
  import QuickUse from '~/components/QuickUse.vue';
  import { ArrowDown } from '@element-plus/icons-vue';

  const { portalMenu, onHighlight, highLightHandler, headerThemeList } =
    useMenu();
  const route = useRoute();
  const router = useRouter();
  const { getDevice } = useMobile();
  const { anchorHandler } = useHeader();
  const onClick = async (index: any) => {
    portalMenu.value.forEach((item: any) => {
      item.isCheck = item.index === route.name;
    });
    await router.push(index);
  };
  const goHome = () => {
    if (process.client) {
      window.location.href = '/';
    }
  };
  const headerLogo = computed(() => {
    const currentRouteName = route.name as string;
    const isInWhiteList = headerThemeList.includes(currentRouteName);

    return isInWhiteList
      ? '/home/images/portal-logo.svg'
      : '/home/images/portal-logo-dark.svg';
  });
  const checkActive = (item: any) => {
    if (headerThemeList.includes(route.name as string)) {
      return item.isCheck ? 'btn-hover' : '';
    } else {
      return item.isCheck ? 'btn-active' : '';
    }
  };

  // 域名检测和URL构建工具函数
  const getTargetUrl = (path: string): string => {
    if (!process.client) return path;
    
    const currentHostname = window.location.hostname;
    const targetHostname = 'vms.9466.com';
    
    // 如果当前域名是目标域名，直接使用相对路径
    if (currentHostname === targetHostname) {
      return path;
    }
    
    // 如果不是目标域名，构建完整URL
    const currentProtocol = window.location.protocol;
    return `${currentProtocol}//${targetHostname}${path}`;
  };

  const jump = () => {
    if (process.client) {
      const targetUrl = getTargetUrl('/login');
      window.location.href = targetUrl;
    }
  };

  const freeuse = () => {
    if (process.client) {
      const targetUrl = getTargetUrl('/dashboard');
      window.location.href = targetUrl;
    }
  };

  onHighlight(route.name as string);

  onMounted(() => {
    anchorHandler();
  });

  watch(
    () => route.fullPath,
    async () => {
      await highLightHandler(route.name as string);
      anchorHandler();
      // console.log(route.name);
    },
  );
</script>

<style scoped lang="less">
  .view-header {
    @flex-gap: 1rem;
    width: 100%;
    max-width: 60rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: @flex-gap;
    background-color: transparent;
    margin: 0 auto;

    :deep(.el-button) {
      color: white;
      border: none;
      outline: none;
      align-items: center;
      box-sizing: border-box;
    }

    :deep(.el-button:hover) {
      background-color: #777c8480 !important;
    }

    .btn-hover {
      background-color: #777c8480 !important;
    }

    .btn-active {
      background-color: #9a66f926 !important;
    }

    .l {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      box-sizing: border-box;

      .header-logo {
        width: 5.625rem;
        height: 2.5rem;
        cursor: pointer;
        flex-shrink: 0;
        font-weight: 500;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
        }
      }

      .header-menu {
        width: fit-content;
        height: 100%;
        display: flex;
        align-items: center;
      }
    }

    .r {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: @flex-gap;
    }
  }

  @media (min-width: 1024px) {
    .view-header {
      .l {
        padding: 0 1rem;
        gap: 1rem;

        .header-logo {
          width: 5.625rem;
          min-width: 4rem;
        }

        .header-menu {
          gap: 1rem;

          :deep(.el-button) {
            font-size: 1rem;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .view-header {
      .l {
        gap: 1rem;

        .header-menu {
          gap: 0.1rem;

          :deep(.el-button) {
            font-size: 0.9rem;
            align-items: center;
            padding: 0 1rem;
            line-height: 2rem;
          }

          .el-button + .el-button {
            margin-left: 0.2rem;
          }
        }
      }
    }
  }

  @media (max-width: 375px) {
    .view-header {
      .l {
        .header-logo {
          width: 3rem;
        }

        .header-menu {
          gap: 0.5rem;
        }
      }
    }
  }

  .dropdown-wrapper {
    width: 38rem;
    height: fit-content;
    display: grid;
    grid-template-rows: 90px 90px;
    grid-template-columns: 300px 300px;
    row-gap: 0.5rem;
    overflow: hidden;
    box-sizing: border-box;

    .dropdown-item {
      width: 100%;
      max-width: 290px;
      height: fit-content;
      display: flex;
      flex-direction: column;
      padding: 0.5rem;
      cursor: pointer;
      gap: 0.5rem;
      border-radius: 10px;
      transition: all 0.3s ease;
      text-decoration: none;
      color: black;
      box-sizing: border-box;

      &:hover {
        background-color: #9a66f926;
        color: #190038;
      }

      p {
        margin: 0;
        font-size: 12px;
      }
    }
  }
</style>

<style lang="less">
  .free-use {
    background: linear-gradient(0.25turn, #fd775e, #d328f3);
    color: white !important;
    border: none !important;
  }
</style>
