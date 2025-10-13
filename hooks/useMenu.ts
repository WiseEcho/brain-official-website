import { onMounted, ref } from 'vue';

type portalMenuType = {
  name: string;
  route: string;
  isCheck: boolean;
  index: string;
  subMenu?: portalSubMenuType;
};

type portalSubmenuDataType = {
  name: string;
  desc: string;
  href: string;
  icon: string;
};

type portalSubMenuType = {
  showMode: 'pc' | 'mobile';
  datas: Partial<portalSubmenuDataType>[];
};

type footerMenuType = {
  label: string;
  subMenus: {
    label: string;
    url: string;
    openBlank?: boolean;
    tooltip?: any;
  }[];
};

export default function useMenu() {
  const portalMenu = ref<portalMenuType[]>([
    {
      name: '首页',
      route: '/',
      isCheck: true,
      index: 'index',
    },
    {
      name: '产品',
      route: '/product',
      isCheck: false,
      index: 'product',
      subMenu: {
        showMode: 'pc',
        datas: [
          {
            name: '内容中台',
            desc: '本地结构化素材库 快速存储 多标签检索 素材复用 降本增效',
            href: '/product#内容中台',
            icon: '/images/icon/content.svg',
          },
          {
            name: '智能投流',
            desc: '本地结构化素材库 快速存储 多标签检索 素材复用 降本增效',
            href: '/product#智能投放',
            icon: '/images/icon/flow.svg',
          },
          {
            name: '工作协同',
            desc: '自定义搭建内容营销SOP 任务到人 自动提醒事事可追溯 工作协同条理分明',
            href: '/product#工作协同',
            icon: '/images/icon/collaborator.svg',
          },
          {
            name: '数据复盘',
            desc: '自动汇聚互动数据 交易数据等 自动生成报表提高复盘与考核效率',
            href: '/product#数据复盘',
            icon: '/images/icon/data.svg',
          },
        ],
      },
    },
    {
      name: '价格',
      route: '/price',
      isCheck: false,
      index: 'price',
    },
    {
      name: '团队',
      route: '/about',
      isCheck: false,
      index: 'about',
    },
  ]);
  const footerMenus: footerMenuType[] = [
    {
      label: '产品',
      subMenus: [
        {
          label: '内容中台',
          url: '/product#内容中台',
          openBlank: false,
        },
        {
          label: '工作协同',
          url: '/product#工作协同',
          openBlank: false,
        },
        {
          label: '智能投放',
          url: '/product#智能投放',
          openBlank: false,
        },
        {
          label: '数据复盘',
          url: '/product#数据复盘',
          openBlank: false,
        },
      ],
    },
    {
      label: '帮助中心',
      subMenus: [
        {
          label: '视频教程',
          url: 'https://situohezhong.feishu.cn/wiki/Rp97wRMHliwsZVkUI5icRwK4n3e',
          openBlank: true,
        },
        {
          label: '使用手册',
          url: 'https://situohezhong.feishu.cn/wiki/CffjwLIb3ihSJ9kElSgcfKx0nNh',
          openBlank: true,
        },
        {
          label: '专属客服',
          url: '',
          tooltip: {
            open: true,
            img: '/images/qrcode_for_gw.jpg',
          },
        },
      ],
    },
    {
      label: '关于我们',
      subMenus: [
        {
          label: '公司介绍',
          url: '/about',
          openBlank: false,
        },
      ],
    },
    {
      label: '旗下产品',
      subMenus: [
        {
          label: '9466达人营销',
          url: 'https://kol.9466.com/home',
          openBlank: true,
        },
        {
          label: '9466创作助手',
          url: 'https://9466.com/',
          openBlank: true,
        },
        {
          label: '智媒管家',
          url: 'http://newsapp.cmstop.com/',
          openBlank: true,
        },
        {
          label: 'CmsTop',
          url: 'https://www.cmstop.com/',
          openBlank: true,
        },
      ],
    },
  ];
  const whiteList = ['index', 'product', 'price'];
  const headerThemeList = ['index', 'product'];
  const anchorList = ['PortalProduct', 'PortalAbout'];
  function clearHighLight() {
    portalMenu.value.forEach((item) => {
      item.isCheck = false;
    });
  }
  const highLightHandler = async (name: string) => {
    // 清除高亮
    clearHighLight();
    portalMenu.value.forEach((item) => {
      if (item.index === name) {
        item.isCheck = true;
      }
    });
  };
  function onHighlight(index: string | undefined) {
    if (!index) return;
    onMounted(async () => {
      await highLightHandler(index);
    });
  }

  return {
    portalMenu,
    onHighlight,
    highLightHandler,
    whiteList,
    footerMenus,
    anchorList,
    headerThemeList,
  };
}
