// https://nuxt.com/docs/api/configuration/nuxt-config
import compression from 'vite-plugin-compression';
import process from 'node:process';

export default defineNuxtConfig({
  workspaceDir: '',
  $development: undefined,
  $env: undefined,
  $meta: undefined,
  $production: undefined,
  $test: undefined,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  // 启用SSR模式
  ssr: true,

  modules: ['@element-plus/nuxt', '@nuxt/image-edge', '@nuxtjs/sitemap', 'nuxt-og-image'],

  // 应用配置
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-CN',
      },
      title: '视频大脑 - 短视频营销协同数智化平台',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '视频大脑 - 内容营销数智化平台' },
        {
          name: 'description',
          content:
            '视频大脑是专为内容营销团队打造的“编、拍、剪、投、察”全流程生产系统。整合策划、拍摄、剪辑、发布、分析，一站式解决视频生产难题，大幅提升团队效率与内容效果。选视频大脑！专为内容营销团队设计的一站式“编拍剪投察”生产系统，无缝协作，数据驱动决策，助力内容效果最大化。',
        },
        {
          name: 'keywords',
          content:
            'cmstop,素材库,素材,视频云,腾讯广告,视频营销,NAS,云视频,营销推广,绩效管理,短视频，短视频运营,网络推广,资产管理,电商运营,广告投放,推广,推广引流,千川素材库,广告素材分析,爆款视频拆解,视频剪辑,剪映,必剪,广告联盟,短视频业务,投放素材分析,团队协作,视频投流',
        },
        {
          name: 'baidu-site-verification',
          content: 'codeva-0iFtxFCZHN',
        },
        {
          name: 'msvalidate.01',
          content: '6C718B6C7AB6FA176E4E482759901E92',
        },
        {
          name: 'google-site-verification',
          content: 'bEiV0RTOEXWzbL0pf9ey2pVMtNLEzcd3-lOYlCMiS_E',
        },
        {
          name: 'robots',
          content: 'index, follow',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'http://www.shipindanao.com/' },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            'name': '9466视频大脑',
            'alternateName': '视频大脑 - 短视频营销协同数智化平台',
            'url': 'http://www.shipindanao.com/',
            'publisher': {
              '@type': 'Organization',
              'name': '北京思拓合众科技股份有限公司',
              'logo': {
                '@type': 'ImageObject',
                'url': 'http://www.shipindanao.com/images/portal-logo.svg',
              },
            },
            'image': ['http://www.shipindanao.com/images/poster.png'],
          }),
          // 防止内容被转义
          tagPosition: 'head',
        },
        {
          src: 'https://hm.baidu.com/hm.js?c8170e368a5511532139a5868d886cdc',
          async: true,
        },
        {
          type: 'text/javascript',
          innerHTML: `(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "spc253k3h5");`,
          tagPosition: 'head',
        },
      ],
    },
    // baseURL: process.env.NODE_ENV === 'production' ? '/home/' : '/',
    baseURL: '/',
  },

  // CSS配置
  css: [
    'swiper/css',
    'swiper/css/navigation',
    'swiper/css/pagination',
    'swiper/css/scrollbar',
  ],

  // 构建配置
  build: {
    transpile: ['@arco-design/web-vue', 'swiper'],
  },

  // 静态资源配置
  nitro: {
    // 确保public目录下的文件可以被访问
    serveStatic: true,
    prerender: {
      routes: ['/'], // 指定需要预渲染的路由
    },
  },

  // 运行时配置
  runtimeConfig: {
    // 私有配置（仅在服务端可用）
    apiSecret: '',
    // 公共配置（客户端和服务端都可用）
    public: {
      apiBase:
        process.env.NODE_ENV === 'production'
          ? 'https://api.example.com'
          : 'http://localhost:3000',
    },
  },

  // 开发服务器配置
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },

  // 路由配置
  router: {
    options: {
      strict: false,
    },
  },

  vite: {
    plugins: [
      compression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 10240, // 只压缩大于10kb的文件
        deleteOriginFile: false, // 保留原文件
      }),
    ],
    // 优化Swiper的构建
    optimizeDeps: {
      include: ['swiper'],
    },
  },

  routeRules: {
    '/images/**': {
      headers: {
        'Cache-Control': 'public, max-age=604800, immutable', // 设置图片资源的缓存策略
      },
    },
  },

  sitemap: {
    defaults: {
      changefreq: 'monthly',
    },
    exclude: ['/', '/about', '/product', '/price'],
    cacheMaxAgeSeconds: 6 * 60 * 60,
    autoLastmod: true,
    urls: [
      {
        loc: '/',
        images: [
          {
            loc: 'http://www.shipindanao.com/images/poster.png',
            title: '视频大脑 - 短视频营销协同数智化平台',
          },
        ],
      },
      {
        loc: '/price',
        images: [
          {
            loc: 'http://www.shipindanao.com/images/poster.png',
            title: '视频大脑 - 短视频营销协同数智化平台',
          },
        ],
      },
      {
        loc: '/product',
        images: [
          {
            loc: 'http://www.shipindanao.com/images/poster.png',
            title: '视频大脑 - 短视频营销协同数智化平台',
          },
        ],
      },
      {
        loc: '/about',
        images: [
          {
            loc: 'http://www.shipindanao.com/images/poster.png',
            title: '视频大脑 - 短视频营销协同数智化平台',
          },
        ],
      },
    ],
  },

  site: {
    url: 'http://www.shipindanao.com',
    name: '9466视频大脑',
  },
});
