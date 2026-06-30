# 视频大脑官网 — 设计系统 v1.0

> 适用范围：`brain-official-website` 所有静态页面
> 技术栈：静态 HTML + Tailwind CSS（CDN）+ Vanilla CSS
> 设计原则：**严格遵守现有官网视觉风格，只做系统化梳理，不另起风格**
> 更新日期：2026-06-30

---

## 1. 设计原则

### 1.1 整体调性（继承自现有官网）
- **科技感 + 商业化**：紫色调为主，配合橙/蓝/粉等模块主题色
- **信息密度适中**：卡片式布局，数据指标醒目，适合 B2B 决策场景
- **动效丰富但克制**：微交互用于 hover、滚动进入、流程动画，不干扰阅读
- **渐变与光晕**：Hero 区使用多色渐变 + 网格/光晕背景，营造 AI 产品氛围

### 1.2 不可偏离的现有特征
1. **容器宽度**：`max-w-[1440px]`，水平内边距 `px-4 sm:px-6 lg:px-8`
2. **Hero 背景**：固定使用 `#FAFAFF → #F8F7FF → #FFFFFF → #FFF8FF → #FAF5FF` 五段渐变 + 紫色网格 + 顶部光晕
3. **标题字号**：`text-4xl md:text-5xl lg:text-6xl`，`font-bold tracking-tight text-gray-900 leading-[1.15]`
4. **正文色阶**：标题 `text-gray-900`，副标题 `text-gray-500`，描述 `text-gray-400`
5. **卡片语言**：`bg-white rounded-2xl border border-gray-100 shadow-card`（痛点卡），或 `bg-gray-50 rounded-2xl border border-gray-100`（场景卡）
6. **按钮语言**：主按钮 `bg-gradient-to-r from-brand-600 to-purple-600 rounded-2xl/rounded-full shadow-lg`；次按钮白底灰边
7. **图标语言**：`w-11 h-11 rounded-xl bg-gradient-to-br from-{color}-50 to-{color}-100 text-{color}-600`

---

## 2. 设计令牌（Design Tokens）

### 2.1 颜色系统

#### 品牌色（已在 Tailwind config 中定义）
| Token | 值 | 用途 |
|---|---|---|
| `--brand-50` | `#F5F3FF` | 标签背景、浅底 |
| `--brand-100` | `#EDE9FE` | 选中态、图标底 |
| `--brand-200` | `#DDD6FE` | 边框、分隔 |
| `--brand-300` | `#C4B5FD` | 弱化强调 |
| `--brand-400` | `#A78BFA` | 装饰 |
| `--brand-500` | `#8B5CF6` | 主品牌色 |
| `--brand-600` | `#7C3AED` | 主按钮、链接 |
| `--brand-700` | `#6D28D9` | hover |
| `--brand-800` | `#5B21B6` | 深色强调 |
| `--brand-900` | `#4C1D95` | 标题渐变终点 |

#### 模块主题色（每模块固定）
| 模块 | 主题色 | 浅底 | 图标底 | 使用场景 |
|---|---|---|---|---|
| 爆款洞察 | `#F97316`（orange-500） | `bg-orange-50` | `from-orange-50 to-orange-100` | 洞察模块所有卡片、标签 |
| 素材资产 | `#3B82F6`（blue-500） | `bg-blue-50` | `from-blue-50 to-blue-100` | 素材模块 |
| 成片协同 | `#8B5CF6`（violet-500） | `bg-violet-50` | `from-violet-50 to-violet-100` | 协同模块 |
| 商品投流 | `#EC4899`（pink-500） | `bg-pink-50` | `from-pink-50 to-pink-100` | 投流模块 |
| 数据复盘 | `#10B981`（emerald-500） | `bg-emerald-50` | `from-emerald-50 to-emerald-100` | 数据模块 |
| 协同底座 | `#06B6D4`（cyan-500） | `bg-cyan-50` | `from-cyan-50 to-cyan-100` | 底座模块 |

#### 语义色
| Token | 值 | 用途 |
|---|---|---|
| `--text-primary` | `#111827` | 主标题、重要文字 |
| `--text-secondary` | `#374151` | 次要标题 |
| `--text-description` | `#6B7280` | 描述文字（`text-gray-500`） |
| `--text-muted` | `#9CA3AF` | 辅助说明（`text-gray-400`） |
| `--surface-default` | `#FFFFFF` | 主背景 |
| `--surface-subtle` | `#F9FAFB` | 浅灰背景（`bg-gray-50/50`） |
| `--border-default` | `#E5E7EB` | 默认边框 |
| `--border-subtle` | `#F3F4F6` | 轻边框 |

### 2.2 间距系统

| Token | Tailwind | 用途 |
|---|---|---|
| `--container-px` | `px-4 sm:px-6 lg:px-8` | 容器水平内边距 |
| `--section-py` | `py-20` / `py-16 md:py-20` | Section 垂直间距 |
| `--section-gap` | `gap-12` | 两列布局间距 |
| `--card-grid-gap` | `gap-4 md:gap-5` / `gap-6` | 卡片网格间距 |
| `--card-padding` | `p-5 md:p-6` | 标准卡片内边距 |
| `--card-radius` | `rounded-2xl` | 标准卡片圆角 |
| `--button-radius` | `rounded-2xl` / `rounded-full` | 按钮圆角 |
| `--icon-radius` | `rounded-xl` | 图标容器圆角 |

### 2.3 字号系统

| 元素 | 桌面 | 平板 | 移动端 | 字重 | 颜色 |
|---|---|---|---|---|---|
| Hero 主标题 | `text-6xl` | `text-5xl` | `text-4xl` | `font-bold` | `text-gray-900` |
| Hero 超大数字 | `text-9xl` | `text-8xl` | `text-7xl` | `font-black` | 渐变 |
| Section 标题 | `text-3xl md:text-4xl` | - | `text-2xl` | `font-bold` | `text-gray-900` |
| 副标题 | `text-lg` | - | `text-base` | `font-medium` | `text-gray-500` |
| 描述文字 | `text-sm` | - | `text-sm` | `normal` | `text-gray-400` |
| 小标签 | `text-xs` / `text-[11px]` | - | - | `font-medium` | 视场景 |
| 按钮文字 | `text-lg` / `text-sm` | - | - | `font-semibold` / `font-bold` | - |

### 2.4 阴影系统

| Token | 值 | 用途 |
|---|---|---|
| `--shadow-card` | `0 1px 2px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.03), 0 12px 24px rgba(0,0,0,0.02)` | 标准卡片（已在 main.css） |
| `--shadow-card-hover` | `0 2px 4px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.04), 0 24px 48px rgba(0,0,0,0.06)` | 卡片 hover |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.06)` | 大卡片、按钮 |
| `--shadow-brand` | `0 4px 14px rgba(124, 58, 237, 0.35)` | 紫色按钮投影 |
| `--shadow-popular` | `0 0 40px -8px rgba(139, 92, 246, 0.25)` | 推荐定价卡片 glow |

### 2.5 动效系统

| Token | 值 | 用途 |
|---|---|---|
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | 通用过渡 |
| `--duration-fast` | `150ms` | 按钮、链接 |
| `--duration-base` | `200ms` | hover、焦点 |
| `--duration-card` | `300ms` | 卡片 hover |
| `--duration-reveal` | `600ms` | 滚动进入动画 |

---

## 3. 组件规范

### 3.1 导航栏

```html
<header class="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 transition-shadow">
  <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    <!-- Logo -->
    <a href="index.html" class="flex items-center gap-2 cursor-pointer shrink-0">
      <img src="images/logo.png" alt="视频大脑 Logo" class="h-8 w-auto">
    </a>

    <!-- Desktop Nav -->
    <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
      <a class="text-brand-600 border-b-2 border-brand-600 py-5" href="index.html">首页</a>
      <a class="hover:text-brand-600 py-5 transition-colors" href="products.html">产品</a>
      <a class="hover:text-brand-600 py-5 transition-colors" href="pricing.html">价格</a>
      <a class="hover:text-brand-600 py-5 transition-colors" href="about.html">关于我们</a>
    </nav>

    <!-- Desktop CTA -->
    <div class="hidden md:flex items-center gap-4">
      <a class="text-sm font-medium text-gray-600 hover:text-gray-900" href="https://vms.9466.com/">登录</a>
      <a class="bg-gradient-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity shadow-md shadow-purple-500/30" href="index.html#trial">预约演示</a>
    </div>
  </div>
</header>
```

### 3.2 Hero 区域

#### 首页 Hero
```html
<section id="hero" class="relative pb-24 overflow-hidden pt-20 noise-bg"
  style="background: linear-gradient(135deg, #FAFAFF 0%, #F8F7FF 25%, #FFFFFF 50%, #FFF8FF 75%, #FAF5FF 100%);">
  <!-- 微妙网格背景 -->
  <div class="absolute inset-0 opacity-[0.03]"
    style="background-image: linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px); background-size: 60px 60px;"></div>
  <!-- 顶部光晕 -->
  <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-radial from-brand-200/20 via-transparent to-transparent rounded-full blur-3xl pointer-events-none"></div>

  <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
    <!-- 左侧文案 -->
    <div class="max-w-2xl">
      <h1 class="mb-6">
        <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold border border-brand-200/60 shadow-sm mb-4">
          <span class="material-symbols-outlined text-[16px]">electric_bolt</span>
          视频大脑 · AI驱动的爆款视频生产线
        </span>
        <span class="block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.15] mb-2">
          让内容电商团队效能提升
        </span>
        <span class="inline-block text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none"
          style="background-image: linear-gradient(135deg, #F97316 0%, #8B5CF6 50%, #3B82F6 100%); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          300%
        </span>
      </h1>
      <p class="text-gray-500 text-lg mb-10 leading-relaxed max-w-lg">
        一套系统，打通爆款内容生产全流程。帮助内容电商团队内容生产数字化工业化，持续输出爆款。
      </p>

      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <a href="#" class="w-full sm:w-auto bg-gradient-to-r from-brand-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl hover:shadow-brand-500/25 hover:-translate-y-0.5 transition-all text-lg flex flex-col items-center justify-center shadow-lg shadow-brand-500/20">
          <span>立即免费试用</span>
          <span class="text-xs font-normal opacity-80 mt-1">突破增长瓶颈，快速获取</span>
        </a>
        <a href="#" class="w-full sm:w-auto px-8 py-4 rounded-2xl font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg transition-all text-lg flex flex-col items-center justify-center shadow-sm">
          <span>预约演示产品</span>
          <span class="text-xs font-normal text-gray-400 mt-1">1v1专属演示，带您上手</span>
        </a>
      </div>
    </div>

    <!-- 右侧产品演示 + 数据指标 -->
    <div class="relative hidden lg:flex flex-col gap-6">
      <div class="group relative rounded-2xl overflow-hidden shadow-2xl shadow-brand-500/10 border border-gray-100 bg-gray-900">
        <video src="images/hero-video.mp4" autoplay loop muted playsinline class="w-full h-full object-cover aspect-video"></video>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 glassmorphism p-4 rounded-2xl">
        <div class="text-center">
          <div class="flex items-center justify-center gap-1 mb-1">
            <span class="material-symbols-outlined text-base text-brand-500">groups</span>
            <span class="font-extrabold text-xl text-gray-900 tracking-tight">100+</span>
          </div>
          <p class="text-[11px] text-gray-400 font-medium">服务客户</p>
        </div>
        <!-- 更多指标... -->
      </div>
    </div>
  </div>
</section>
```

### 3.3 痛点卡片

```html
<div class="pain-card bg-white p-5 md:p-6 rounded-2xl shadow-card border border-gray-100/80 group" style="--card-accent: #3B82F6;">
  <div class="w-11 h-11 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
    <span class="material-symbols-outlined">schedule</span>
  </div>
  <h3 class="text-center font-bold text-gray-900 mb-2 text-[15px]">爆款发现晚</h3>
  <p class="text-sm text-center text-gray-400 mb-4 leading-relaxed">错过最佳二创红利期，爆款内容被竞品抢占</p>
  <div class="text-xs text-center text-gray-400 pt-3 border-t border-gray-100/80">
    平均错失红利期 <span class="text-brand-600 font-extrabold text-xl">2.1</span> 天
  </div>
</div>
```

### 3.4 场景卡片

```html
<div class="rounded-2xl bg-gray-50 border border-gray-100 p-6 text-center hover:shadow-xl hover:-translate-y-1 hover:border-brand-200 transition-all duration-300 group">
  <div class="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
    <span class="material-symbols-outlined text-brand-600">shopping_bag</span>
  </div>
  <h3 class="font-bold text-gray-900 text-sm mb-1">短视频带货</h3>
  <p class="text-gray-500 text-xs">爆款素材快速复制，规模化投流放量</p>
</div>
```

### 3.5 模块主题卡片

```html
<div class="bg-orange-50 rounded-2xl p-8 border border-orange-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
  <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
    <span class="material-symbols-outlined text-orange-600">explore</span>
  </div>
  <h3 class="font-bold text-gray-900 mb-2">拍之前先看方向</h3>
  <p class="text-gray-500 text-sm">拍之前先看看市面上什么在爆，什么卖点在跑量</p>
</div>
```

### 3.6 CTA Banner

```html
<div class="relative overflow-hidden bg-gradient-to-r from-brand-50 via-purple-50 to-blue-50 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between shadow-xl border border-brand-100">
  <div class="absolute inset-0 opacity-20"
    style="background-image: radial-gradient(circle at 2px 2px, rgba(139,92,246,0.5) 1px, transparent 0); background-size: 24px 24px;"></div>
  <div class="relative z-10 text-lg font-medium text-gray-700 mb-6 md:mb-0 max-w-xl">
    超 <span class="text-3xl font-black text-brand-600">80%</span> 的打品团队存在以上问题<br class="hidden md:block">
    <span class="text-gray-500 text-base">导致每年浪费大量人力和广告成本</span>
  </div>
  <a href="#" class="relative z-10 bg-gradient-to-r from-brand-600 to-purple-600 text-white px-8 py-3.5 rounded-full font-bold hover:shadow-xl hover:shadow-brand-500/25 hover:-translate-y-0.5 transition-all shadow-lg flex items-center gap-2 shrink-0 group">
    测一测你的团队现状
    <span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
  </a>
</div>
```

### 3.7 定价卡片

```html
<!-- 推荐方案 -->
<div class="pricing-card-popular rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
  style="background: linear-gradient(white, white) padding-box, linear-gradient(135deg, #8B5CF6, #D946EF, #A78BFA, #8B5CF6) border-box; border: 2px solid transparent; box-shadow: 0 0 40px -8px rgba(139, 92, 246, 0.25), 0 8px 24px -4px rgba(0,0,0,0.06);">
  <div class="h-1 w-full bg-gradient-to-r from-brand-500 via-pink-500 to-brand-500" style="background-size: 200% 100%;"></div>
  <div class="p-8">
    <h3 class="text-lg font-semibold text-gray-900">专业版</h3>
    <div class="mt-4 mb-6">
      <span class="text-4xl font-extrabold">¥899</span>
      <span class="text-gray-500">/月</span>
    </div>
    <ul class="space-y-3 text-sm text-gray-600 mb-8">
      <li class="flex items-center gap-2"><span class="material-symbols-outlined text-brand-600 text-sm">check</span>10 人团队</li>
    </ul>
    <a href="#" class="btn-primary w-full text-center rounded-xl py-3">免费试用</a>
  </div>
</div>
```

---

## 4. 布局模式

### 4.1 容器
```html
<div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">...</div>
```

### 4.2 Section 结构
```html
<section class="py-20 bg-gray-50/50">
  <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <h2 class="section-title text-gray-900 mb-4">标题</h2>
      <p class="text-gray-400 text-lg font-medium">副标题</p>
    </div>
    <!-- Content -->
  </div>
</section>
```

### 4.3 常见 Section 类型
1. **Hero**：渐变背景 + 网格 + 光晕，左文右视频/图
2. **痛点区**：`bg-gray-50/50`，标题居中，5 列痛点卡片网格
3. **适用场景**：`bg-white`，4 列场景卡片网格
4. **模块详情**：`bg-white`，左侧模块标签 + 标题，下方主题色卡片 + Tab 切换
5. **工作流程**：`bg-[#fafaff]` + 固定背景 + SVG 流程管道
6. **定价**：渐变 Hero + 3 列定价卡片
7. **CTA Banner**：渐变底 + 点阵装饰
8. **Footer**：深色底 + 多列链接

---

## 5. 视觉元素

### 5.1 Hero 背景公式
每个 Hero 必须包含：
1. 多段 pastel 渐变底色
2. 60px 紫色网格（3% 透明度）
3. 顶部 radial blur-3xl 光晕
4. 可选：浮动 blob（pricing.html）

### 5.2 图标规范
- 使用 **Material Symbols Outlined**
- 容器尺寸：`w-11 h-11`（痛点卡）、`w-12 h-12`（场景卡）、`w-10 h-10`（主题卡）
- 容器圆角：`rounded-xl` 或 `rounded-lg`
- 容器背景：`bg-gradient-to-br from-{color}-50 to-{color}-100`
- 图标颜色：`text-{color}-600`
- hover：`group-hover:scale-110 transition-transform duration-300`

### 5.3 渐变文字
- Hero 大数字：`linear-gradient(135deg, #F97316 0%, #8B5CF6 50%, #3B82F6 100%)`
- 标题强调：`linear-gradient(90deg, #6B46C1, #3B82F6)`（`text-gradient` 类）

### 5.4 玻璃拟态
```css
.glassmorphism {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.5);
}
```

---

## 6. 动效与交互

### 6.1 滚动进入动画
```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-stagger > * {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.reveal-stagger.is-visible > *:nth-child(1) { transition-delay: 0ms; }
.reveal-stagger.is-visible > *:nth-child(2) { transition-delay: 80ms; }
/* ... */
```

### 6.2 Hover 效果
- 卡片：`hover:shadow-xl hover:-translate-y-1 transition-all duration-300`
- 图标容器：`group-hover:scale-110 transition-transform duration-300`
- 按钮：`hover:shadow-xl hover:shadow-brand-500/25 hover:-translate-y-0.5 transition-all`
- 箭头图标：`group-hover:translate-x-1 transition-transform`

### 6.3 流程动画
- SVG 管道渐变 + 流动圆点（`animateMotion`）
- 步骤编号 badge 使用 `step-num-01` 到 `step-num-08` 渐变

---

## 7. 模块主题规范

每个产品模块页面固定使用一个主题色，所有卡片、标签、图标、Tab active 状态都统一：

| 模块 | 标签类 | 卡片背景 | Tab active |
|---|---|---|---|
| 爆款洞察 | `bg-orange-50/80 text-orange-700 border-orange-200/60` | `bg-orange-50 border-orange-100` | `tabs-orange` |
| 素材资产 | `bg-blue-50/80 text-blue-700 border-blue-200/60` | `bg-blue-50 border-blue-100` | `tabs-blue` |
| 成片协同 | `bg-violet-50/80 text-violet-700 border-violet-200/60` | `bg-violet-50 border-violet-100` | `tabs-violet` |
| 商品投流 | `bg-pink-50/80 text-pink-700 border-pink-200/60` | `bg-pink-50 border-pink-100` | `tabs-pink` |
| 数据复盘 | `bg-emerald-50/80 text-emerald-700 border-emerald-200/60` | `bg-emerald-50 border-emerald-100` | `tabs-emerald` |
| 协同底座 | `bg-cyan-50/80 text-cyan-700 border-cyan-200/60` | `bg-cyan-50 border-cyan-100` | `tabs-cyan` |

---

## 8. 可访问性规范

- 所有交互元素焦点环清晰
- 色彩对比度满足正文 ≥ 4.5:1
- 动画支持 `prefers-reduced-motion`
- 图片包含有意义的 `alt`
- 按钮与链接语义正确

---

## 9. 检查清单

新增/修改页面时，逐条确认：

- [ ] 是否使用了 `max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8` 容器
- [ ] Hero 是否使用了标准五段渐变 + 网格 + 光晕
- [ ] 标题字号是否为 `text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]`
- [ ] 副标题是否为 `text-gray-500`，描述是否为 `text-gray-400`
- [ ] 卡片是否使用 `rounded-2xl` 和标准阴影/边框
- [ ] 图标容器是否使用 `w-11 h-11 rounded-xl bg-gradient-to-br from-{color}-50 to-{color}-100`
- [ ] 主按钮是否为 `bg-gradient-to-r from-brand-600 to-purple-600` + `shadow-lg`
- [ ] 模块页面是否统一使用固定主题色
- [ ] 是否包含 `reveal` / `reveal-stagger` 滚动动画类
- [ ] 是否支持 `prefers-reduced-motion`

---

*本设计系统是对现有官网视觉语言的系统化提炼，后续页面必须严格遵循，确保全站一致。*
