import { type Component, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import Footer from '~/components/footer/Footer.vue';
import { PortalSwiper, QuickUse } from '#components';
import ChooseBrain from '~/components/ChooseBrain.vue';
import Collaborator from '~/components/Collaborator.vue';
import CompanyValue from '~/components/about/CompanyValue.vue';
import useMenu from '~/hooks/useMenu';
import RadioChange from '~/components/RadioChange.vue';
import GroupPrice from '~/components/price/GroupPrice.vue';
import CompanyPrice from '~/components/price/CompanyPrice.vue';

type resourcePropsType = {
  title: string;
  desc: string;
  img: string;
  slot: Component;
  attr: any;
  header: boolean;
};

type ResourcePropsType = Partial<resourcePropsType>;

export default function useResource() {
  const route = useRoute();
  const windowWidth = ref<number>(0);
  const { whiteList } = useMenu();
  const resourceMap = ref<Map<string, ResourcePropsType>>(
    new Map<string, ResourcePropsType>([
      [
        '首页素材1',
        {
          desc: '降低内耗   提升人效   团队精进   业绩增长',
          img: '/images/resource/resource-1.png',
          title: '内容营销时代企业级爆款视频生产线',
          header: true,
        },
      ],
      [
        '首页素材2',
        {
          desc: '为企业提供可自定义的内容营销SOP助力企业降本增效',
          slot: PortalSwiper,
          header: true,
          attr: {
            data: [
              {
                title: '内容中台',
                desc: '本地结构化素材库 快速存储 多标签检索 素材复用 降本增效',
                defaultIndex: 1,
                showUrl: '/images/home/内容中台.png',
                index: '1',
              },
              {
                title: '工作协同',
                desc: '自定义搭建内容营销SOP 任务到人 自动提醒 工作条理分明',
                defaultIndex: null,
                showUrl: '/images/home/工作协同.png',
                index: '2',
              },
              {
                title: '智能投放',
                desc: '多平台账户一体化管理 批量搭建计划 智能盯盘 自动追投止损',
                defaultIndex: null,
                showUrl: '/images/home/智能投放.png',
                index: '3',
              },
              {
                title: '数据复盘',
                desc: '自动汇聚数据 自动生成报表 提高复盘与考核效率',
                defaultIndex: null,
                showUrl: '/images/home/数据复盘.png',
                index: '4',
              },
            ],
            mode: 'vertical',
          },
        },
      ],
      [
        '首页素材3',
        {
          desc: '高效内容内外协同 支持智能投放 矩阵运营和业务复盘,支撑付费流、自然流、混合流等流量打法',
          img: '/images/resource/resource-3.png',
          title: '激活上下游搭建高效团队',
          header: true,
        },
      ],
      [
        '首页素材4',
        {
          desc: '搭建SOP 快速模式复制 打造爆品',
          img: '/images/resource/resource-3.png',
          slot: ChooseBrain,
          attr: {},
          header: true,
        },
      ],
      [
        '首页素材5',
        {
          slot: Collaborator,
          attr: {},
          header: false,
        },
      ],
      [
        '首页素材6',
        {
          desc: '点击免费试用 把员工从重复性的工作中解放出来 投入更具价值的工作中',
          slot: QuickUse,
          attr: {},
          header: true,
        },
      ],
      [
        '产品素材1',
        {
          desc: '本地结构化素材库 快速存储 多标签检索 素材复用 降本增效',
          title: '内容中台',
          header: true,
          slot: RadioChange,
          attr: {
            data: {
              defaultActive: '本地存储',
              list: [
                {
                  label: '本地存储',
                  url: '/images/content/local-storage.png',
                },
                {
                  label: '精准检索',
                  url: '/images/content/search.png',
                },
                {
                  label: '素材共享',
                  url: '/images/content/resource-share.png',
                },
                {
                  label: '批量上传',
                  url: '/images/content/batch-upload.png',
                },
                {
                  label: '审核批注',
                  url: '/images/content/comment.png',
                },
                {
                  label: '内容复盘',
                  url: '/images/content/content.png',
                },
              ],
              size: 'large',
            },
          },
        },
      ],
      [
        '产品素材2',
        {
          desc: '自定义搭建内容营销SOP 任务到人 自动提醒 事事可追溯 工作协同条理分明',
          img: '/images/swiper/工作协同.png',
          title: '工作协同',
          header: true,
        },
      ],
      [
        '产品素材3',
        {
          desc: '多平台多账户一体化管理 智能化批量搭建计划 智能盯盘 自动追投止损',
          img: '/images/swiper/智能投放.png',
          title: '智能投放',
          header: true,
          attr: {},
        },
      ],
      [
        '产品素材4',
        {
          desc: '自动汇聚互动数据、交易数据等 自动生成报表 提高复盘与考核效率',
          img: '/images/swiper/数据复盘.png',
          title: '数据复盘',
          header: true,
        },
      ],
      [
        '价格素材1',
        {
          desc: '根据您的团队规模和业务需求  选择套餐方案',
          title: '内容营销团队必备',
          header: true,
          slot: RadioChange,
          attr: {
            data: {
              defaultActive: '团队会员',
              size: 'large',
              type: 'component',
              list: [
                {
                  label: '团队会员',
                  url: '#',
                  slot: GroupPrice,
                },
                {
                  label: '企业会员',
                  url: '#',
                  slot: CompanyPrice,
                },
              ],
            },
          },
        },
      ],
      [
        'footer',
        {
          title: '专业陪伴式服务 助您业绩长虹',
          header: true,
          attr: {
            data: [
              {
                title: '业务诊断',
                desc: '专业顾问为您分析业务问题和需求 分享行业最佳实践案例',
                img: '/images/accordion/accordion-1.svg',
                isCollapse: false,
              },
              {
                title: '本地交付',
                desc: '专属顾问协助梳理业务流程&权限架构，制定部署方案',
                img: '/images/accordion/accordion-2.svg',
                isCollapse: true,
              },
              {
                title: '一对一服务',
                desc: '专属顾问为您提供一对一使用咨询服务，并定期回访提供使用培训服务',
                img: '/images/accordion/accordion-3.svg',
                isCollapse: true,
              },
              {
                title: '持续产品迭代',
                desc: '根据业务需求不断优化迭代产品',
                img: '/images/accordion/accordion-4.svg',
                isCollapse: true,
              },
            ],
          },
          slot: Footer,
        },
      ],
      [
        '关于我们1',
        {
          title: '企业价值观',
          header: true,
          attr: {},
          slot: CompanyValue,
        },
      ],
    ]),
  );

  onMounted(() => {
    if (process.client) {
      windowWidth.value = window.innerWidth;
      const handleResize = () => {
        windowWidth.value = window.innerWidth;
      };
      window.addEventListener('resize', handleResize);

      onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize);
      });
    }
  });
  const getSize = computed(() => {
    return windowWidth.value >= 768 ? 'default' : 'small';
  });
  const isShow = computed(() => {
    return whiteList.includes(route.name as string);
  });

  return {
    resourceMap,
    getSize,
    isShow,
  };
}
