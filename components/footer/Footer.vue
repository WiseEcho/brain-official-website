<template>
  <div class="content-wrapper">
    <!-- accordion -->
    <div class="accordion">
      <Accordion :data="data" />
    </div>
    <!-- footer-menu -->
    <div class="footer-menu-wrapper">
      <div class="l">
        <!-- logo -->
        <img
          src="/images/portal-logo-dark.svg"
          alt="logo"
          loading="eager"
          class="footer-logo"
        />
        <!-- contact -->
        <div class="contact contact-2">
          <span>售前电话:</span>
          18008627166
        </div>
        <div class="contact">
          <span>商务合作:</span>
          wangshuo@cmstop.com
        </div>
        <!-- qr-code-group -->
        <div class="qrcode-group">
          <div>
            <img src="/images/qrcode_for_gh.png" alt="" loading="eager" />
            <span style="justify-content: center">微信公众号</span>
          </div>
          <div>
            <img src="/images/qrcode_for_gw.jpg" alt="" loading="eager" />
            <span style="justify-content: center">专属顾问</span>
          </div>
        </div>
      </div>
      <div class="r">
        <!-- menus -->
        <div v-for="(item, index) in footerMenus" :key="index" class="menu-col">
          <p v-h2 style="margin-top: 0; font-weight: 600" class="title">{{
            item.label
          }}</p>
          <template v-for="(itm, idx) in item.subMenus" :key="idx">
            <a
              v-if="!itm.tooltip?.open"
              class="link text-font"
              :href="itm.url"
              :target="itm.openBlank ? '_blank' : '_self'"
            >
              {{ itm.label }}
            </a>
            <el-tooltip v-else effect="light">
              <a class="text-font link">{{ itm.label }}</a>
              <template #content>
                <div style="width: 10rem; height: 10rem; overflow: hidden">
                  <img
                    loading="eager"
                    :src="itm.tooltip.img"
                    alt=""
                    style="
                      width: 100%;
                      height: 100%;
                      object-position: center;
                      object-fit: contain;
                    "
                  />
                </div>
              </template>
            </el-tooltip>
          </template>
        </div>
      </div>
    </div>
    <!-- 备案信息 -->
    <a
      href="https://beian.miit.gov.cn/"
      class="copyright text-font"
      target="_blank"
      >京ICP备09082107号-7</a>
  </div>
</template>

<script setup lang="ts">
  // import { useRouter } from 'vue-router';
  import useMenu from '~/hooks/useMenu';

  const BEIAN_NET: string = 'https://beian.miit.gov.cn/';

  type accordionType = {
    title: string;
    desc: string;
    img: string;
    isCollapse: boolean;
  };

  type propsType = {
    data: accordionType[];
  };
  // const router = useRouter();

  type PropsType = Partial<propsType>;

  withDefaults(defineProps<PropsType>(), {
    data: () => [],
  });
  // const onOpenLink = (item: any) => {
  //   if (process.client) {
  //     if (item.openBlank) {
  //       // 空白页打开
  //       window.open(item.url, '_blank');
  //     } else {
  //       router.push(item.url);
  //     }
  //   }
  // };

  // const searchBeian = () => {
  //   if (process.client) {
  //     window.open(BEIAN_NET, '_blank');
  //   }
  // };

  const { footerMenus } = useMenu();
</script>

<style scoped lang="less">
  .content-wrapper {
    @gap-width: 1rem;
    @col-width: 11.25rem;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    max-width: 60rem;

    .accordion {
      width: 100%;
      height: auto;
      min-height: 22.5rem;
      display: flex;
    }

    .footer-menu-wrapper {
      width: 100%;
      height: auto;
      display: grid;
      padding: 0 1rem;
      gap: @gap-width;
      box-sizing: border-box;

      .l {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;

        .contact {
          width: 100%;
          height: auto;
          display: flex;
          gap: @gap-width;
          color: black;
          flex-wrap: wrap;

          span {
            color: gray;
          }
        }

        img {
          width: 100%;
          max-width: @col-width;
          height: 50px;
          object-fit: contain;
        }

        .qrcode-group {
          width: 100%;
          height: auto;
          display: flex;
          gap: @gap-width;
          margin-top: 1rem;

          div {
            width: 5.25rem;
            height: auto;
            overflow: hidden;
            display: flex;
            flex-direction: column;

            span {
              width: 100%;
              height: auto;
              color: gray;
              display: flex;
              font-size: 12px;
              margin-top: 0.5rem;
            }

            img {
              width: 100%;
              height: 5.25rem;
              display: flex;
              object-fit: contain;
              object-position: center;
            }
          }
        }
      }

      .r {
        width: 100%;
        height: 100%;
        display: grid;
        box-sizing: border-box;

        .menu-col {
          width: 100%;
          height: fit-content;
          display: flex;
          flex-direction: column;

          a {
            text-decoration: none;
          }

          .link {
            width: 100%;
            height: auto;
            display: flex;
            color: gray;
            cursor: pointer;
            transition: all 0.5s ease;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }

    .copyright {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      max-height: 60rem;
      margin-bottom: 2rem;
      color: gray;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (min-width: 1024px) {
    .content-wrapper {
      gap: 3rem;

      .footer-menu-wrapper {
        @col-width: 11.25rem;
        grid-template-columns: auto 1fr 1fr 1fr;
        .r {
          grid-column: span 3;
          padding-left: 3rem;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 1rem;

          .menu-col {
            .link {
              margin: 1rem 0;
            }
          }
        }

        .l {
          .contact-2 {
            margin-top: 1rem;
            text-decoration: none;
            color: black;
          }

          .footer-logo {
            height: fit-content;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .content-wrapper {
      .footer-menu-wrapper {
        height: fit-content;
        grid-template-rows: 1fr auto;
        margin-top: 1rem;

        .l {
          justify-content: center;
          align-items: center;

          .contact {
            justify-content: center;
            flex-wrap: wrap;
          }

          .footer-logo {
            height: 2.5rem;
          }

          .contact-2 {
            margin-top: 0.5rem;
          }

          .qrcode-group {
            justify-content: center;
          }
        }

        .r {
          height: fit-content;
          grid-template-columns: auto auto auto auto;
          justify-content: center;
          gap: 0.5rem;

          .menu-col {
            white-space: nowrap;
            .link {
              padding: 0.5rem 0;
            }
          }

          .sub-title {
            font-size: 0.7rem;
          }

          .title {
            margin-bottom: 0.5rem;
          }
        }

        .copyright {
          font-size: 0.8rem;
        }
      }
    }
  }
</style>
