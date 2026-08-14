# 视频大脑官网价格方案更新实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 `pricing.html` 的价格方案更新为新的 6 档套餐，并支持月付、年付、2 年、3 年四种周期展示。

**Architecture:** 直接修改 `pricing.html` 中的静态价格卡片、功能对比表和相关内联 JS；移动端功能列表通过现有 JS 从功能对比表自动提取，只需同步标签名称。

**Tech Stack:** HTML, Tailwind CSS (静态化), 原生 JavaScript, Docker 本地验证

## Global Constraints

- 必须使用 Docker 本地环境验证（`docker compose up -d web`，访问 `http://localhost:18080/pricing.html`）
- 若新增 Tailwind class，必须按 `tailwind.config.js` 头部注释重新生成 `css/tailwind.css`
- 文案改动需保持 `pricing.html` 内部一致（不要求同步 `docs/design-demo.html`）
- 企业档（企业标准版/专业版/旗舰版）改为直接展示价格，不再使用「获取专属报价」
- 提交遵循 conventional commits：`feat/fix/docs: 描述`

---

## File Structure

| 文件 |  responsibility |
|---|---|
| `pricing.html:1652-1656` | 周期切换器 HTML |
| `pricing.html:1659-1835` | 6 个价格卡片 |
| `pricing.html:1839-1845` | 移动端套餐切换标签 |
| `pricing.html:1853-2200` | 功能对比大表 |
| `pricing.html:2267-2337` | 价格周期切换 JS |
| `pricing.html:2388-2404` | ROI 计算器价格/名称映射 |
| `css/tailwind.css` | Tailwind 静态化样式（按需重新生成） |

---

### Task 1: 更新周期切换器

**Files:**
- Modify: `pricing.html:1652-1656`

**Interfaces:**
- Consumes: 无
- Produces: 4 个 `data-billing` 按钮：`monthly`, `yearly`, `two-year`, `three-year`

- [ ] **Step 1: 修改周期切换器 HTML**

  将现有的 2 个按钮替换为 4 个按钮：

  ```html
  <div aria-label="计费周期" class="billing-toggle" role="tablist">
    <button aria-selected="true" class="billing-toggle-btn active" data-billing="monthly" role="tab">月付</button>
    <button aria-selected="false" class="billing-toggle-btn" data-billing="yearly" role="tab">年付 <span class="save-badge">省2月</span></button>
    <button aria-selected="false" class="billing-toggle-btn" data-billing="two-year" role="tab">一次买2年 <span class="save-badge">8折</span></button>
    <button aria-selected="false" class="billing-toggle-btn" data-billing="three-year" role="tab">一次买3年 <span class="save-badge">7折</span></button>
  </div>
  ```

- [ ] **Step 2: 验证切换器显示**

  打开 `pricing.html`（本地文件或 Docker），确认 4 个按钮横向排列，文案正确。

---

### Task 2: 更新 6 个价格卡片

**Files:**
- Modify: `pricing.html:1659-1835`

**Interfaces:**
- Consumes: 无
- Produces: 6 个 `pricing-card` 元素，`data-monthly` 为月付价格（整数，无逗号）

- [ ] **Step 1: 替换团队专业版 (Featured) 卡片**

  ```html
  <!-- 团队专业版 (Featured) -->
  <div class="pricing-card featured order-first md:order-none" data-monthly="4800">
    <div class="pricing-card-header-bar"></div>
    <div class="pricing-card-badge">最受欢迎</div>
    <div class="pricing-card-body">
      <h3 class="pricing-card-name">团队专业版</h3>
      <div class="pricing-card-target">适用于专业内容团队</div>
      <div class="pricing-card-price">
        <div class="price-row">
          <span class="price-currency">¥</span>
          <span class="price-value" data-price-value="">4,800</span>
          <span class="price-unit">/ 月</span>
        </div>
        <div class="price-original hidden" data-price-original="">原价 ¥4,800/月</div>
        <div class="price-savings hidden" data-price-savings="">
          <span class="material-symbols-outlined text-[13px]">savings</span>
          年付立省 ¥9,600
        </div>
        <div class="price-yearly-total hidden" data-price-yearly-total="">按年支付 ¥48,000/年</div>
      </div>
      <div class="pricing-card-divider"></div>
      <ul class="pricing-card-quota-list">
        <li><span class="quota-label">企业内部席位</span><span class="quota-value">30个</span></li>
        <li><span class="quota-label">外部协作席位</span><span class="quota-value">不限</span></li>
        <li><span class="quota-label">本地最大存储空间</span><span class="quota-value">30T</span></li>
        <li><span class="quota-label">项目数量</span><span class="quota-value">1000个</span></li>
        <li><span class="quota-label">广告账户</span><span class="quota-value">30个</span></li>
      </ul>
      <button class="pricing-card-btn" onclick="openQRModal()">立即咨询</button>
    </div>
  </div>
  ```

- [ ] **Step 2: 替换团队基础版卡片（原团队入门版位置）**

  ```html
  <!-- 团队基础版 -->
  <div class="pricing-card" data-monthly="1500">
    <div class="pricing-card-header-bar"></div>
    <div class="pricing-card-body">
      <h3 class="pricing-card-name">团队基础版</h3>
      <div class="pricing-card-target">适用于初创小团队</div>
      <div class="pricing-card-price">
        <div class="price-row">
          <span class="price-currency">¥</span>
          <span class="price-value" data-price-value="">1,500</span>
          <span class="price-unit">/ 月</span>
        </div>
        <div class="price-original hidden" data-price-original="">原价 ¥1,500/月</div>
        <div class="price-savings hidden" data-price-savings="">
          <span class="material-symbols-outlined text-[13px]">savings</span>
          年付立省 ¥3,000
        </div>
        <div class="price-yearly-total hidden" data-price-yearly-total="">按年支付 ¥15,000/年</div>
      </div>
      <div class="pricing-card-divider"></div>
      <ul class="pricing-card-quota-list">
        <li><span class="quota-label">企业内部席位</span><span class="quota-value">10个</span></li>
        <li><span class="quota-label">外部协作席位</span><span class="quota-value">不限</span></li>
        <li><span class="quota-label">本地最大存储空间</span><span class="quota-value">10T</span></li>
        <li><span class="quota-label">项目数量</span><span class="quota-value">100个</span></li>
        <li><span class="quota-label">广告账户</span><span class="quota-value">10个</span></li>
      </ul>
      <button class="pricing-card-btn" onclick="openQRModal()">立即咨询</button>
    </div>
  </div>
  ```

- [ ] **Step 3: 替换团队标准版卡片**

  ```html
  <!-- 团队标准版 -->
  <div class="pricing-card" data-monthly="3000">
    <div class="pricing-card-header-bar"></div>
    <div class="pricing-card-body">
      <h3 class="pricing-card-name">团队标准版</h3>
      <div class="pricing-card-target">适用于成长型团队</div>
      <div class="pricing-card-price">
        <div class="price-row">
          <span class="price-currency">¥</span>
          <span class="price-value" data-price-value="">3,000</span>
          <span class="price-unit">/ 月</span>
        </div>
        <div class="price-original hidden" data-price-original="">原价 ¥3,000/月</div>
        <div class="price-savings hidden" data-price-savings="">
          <span class="material-symbols-outlined text-[13px]">savings</span>
          年付立省 ¥6,000
        </div>
        <div class="price-yearly-total hidden" data-price-yearly-total="">按年支付 ¥30,000/年</div>
      </div>
      <div class="pricing-card-divider"></div>
      <ul class="pricing-card-quota-list">
        <li><span class="quota-label">企业内部席位</span><span class="quota-value">20个</span></li>
        <li><span class="quota-label">外部协作席位</span><span class="quota-value">不限</span></li>
        <li><span class="quota-label">本地最大存储空间</span><span class="quota-value">20T</span></li>
        <li><span class="quota-label">项目数量</span><span class="quota-value">500个</span></li>
        <li><span class="quota-label">广告账户</span><span class="quota-value">20个</span></li>
      </ul>
      <button class="pricing-card-btn" onclick="openQRModal()">立即咨询</button>
    </div>
  </div>
  ```

- [ ] **Step 4: 替换企业标准版卡片（改为直接展示价格）**

  ```html
  <!-- 企业标准版 -->
  <div class="pricing-card" data-monthly="7800">
    <div class="pricing-card-header-bar"></div>
    <div class="pricing-card-body">
      <h3 class="pricing-card-name">企业标准版</h3>
      <div class="pricing-card-target">适用于中小型企业</div>
      <div class="pricing-card-price">
        <div class="price-row">
          <span class="price-currency">¥</span>
          <span class="price-value" data-price-value="">7,800</span>
          <span class="price-unit">/ 月</span>
        </div>
        <div class="price-original hidden" data-price-original="">原价 ¥7,800/月</div>
        <div class="price-savings hidden" data-price-savings="">
          <span class="material-symbols-outlined text-[13px]">savings</span>
          年付立省 ¥15,600
        </div>
        <div class="price-yearly-total hidden" data-price-yearly-total="">按年支付 ¥78,000/年</div>
      </div>
      <div class="pricing-card-divider"></div>
      <ul class="pricing-card-quota-list">
        <li><span class="quota-label">企业内部席位</span><span class="quota-value">50个</span></li>
        <li><span class="quota-label">外部协作席位</span><span class="quota-value">不限</span></li>
        <li><span class="quota-label">本地最大存储空间</span><span class="quota-value">50T</span></li>
        <li><span class="quota-label">项目数量</span><span class="quota-value">不限</span></li>
        <li><span class="quota-label">广告账户</span><span class="quota-value">50个</span></li>
      </ul>
      <button class="pricing-card-btn" onclick="openQRModal()">立即咨询</button>
    </div>
  </div>
  ```

- [ ] **Step 5: 替换企业专业版卡片（改为直接展示价格）**

  ```html
  <!-- 企业专业版 -->
  <div class="pricing-card" data-monthly="14800">
    <div class="pricing-card-header-bar"></div>
    <div class="pricing-card-body">
      <h3 class="pricing-card-name">企业专业版</h3>
      <div class="pricing-card-target">适用于大型企业</div>
      <div class="pricing-card-price">
        <div class="price-row">
          <span class="price-currency">¥</span>
          <span class="price-value" data-price-value="">14,800</span>
          <span class="price-unit">/ 月</span>
        </div>
        <div class="price-original hidden" data-price-original="">原价 ¥14,800/月</div>
        <div class="price-savings hidden" data-price-savings="">
          <span class="material-symbols-outlined text-[13px]">savings</span>
          年付立省 ¥29,600
        </div>
        <div class="price-yearly-total hidden" data-price-yearly-total="">按年支付 ¥148,000/年</div>
      </div>
      <div class="pricing-card-divider"></div>
      <ul class="pricing-card-quota-list">
        <li><span class="quota-label">企业内部席位</span><span class="quota-value">100个</span></li>
        <li><span class="quota-label">外部协作席位</span><span class="quota-value">不限</span></li>
        <li><span class="quota-label">本地最大存储空间</span><span class="quota-value">100T</span></li>
        <li><span class="quota-label">项目数量</span><span class="quota-value">不限</span></li>
        <li><span class="quota-label">广告账户</span><span class="quota-value">100个</span></li>
      </ul>
      <button class="pricing-card-btn" onclick="openQRModal()">立即咨询</button>
    </div>
  </div>
  ```

- [ ] **Step 6: 替换企业旗舰版卡片（改为直接展示价格）**

  ```html
  <!-- 企业旗舰版 -->
  <div class="pricing-card" data-monthly="28000">
    <div class="pricing-card-header-bar"></div>
    <div class="pricing-card-body">
      <h3 class="pricing-card-name">企业旗舰版</h3>
      <div class="pricing-card-target">适用于集团/多品牌</div>
      <div class="pricing-card-price">
        <div class="price-row">
          <span class="price-currency">¥</span>
          <span class="price-value" data-price-value="">28,000</span>
          <span class="price-unit">/ 月</span>
        </div>
        <div class="price-original hidden" data-price-original="">原价 ¥28,000/月</div>
        <div class="price-savings hidden" data-price-savings="">
          <span class="material-symbols-outlined text-[13px]">savings</span>
          年付立省 ¥56,000
        </div>
        <div class="price-yearly-total hidden" data-price-yearly-total="">按年支付 ¥280,000/年</div>
      </div>
      <div class="pricing-card-divider"></div>
      <ul class="pricing-card-quota-list">
        <li><span class="quota-label">企业内部席位</span><span class="quota-value">不限</span></li>
        <li><span class="quota-label">外部协作席位</span><span class="quota-value">不限</span></li>
        <li><span class="quota-label">本地最大存储空间</span><span class="quota-value">不限</span></li>
        <li><span class="quota-label">项目数量</span><span class="quota-value">不限</span></li>
        <li><span class="quota-label">广告账户</span><span class="quota-value">不限</span></li>
      </ul>
      <button class="pricing-card-btn" onclick="openQRModal()">立即咨询</button>
    </div>
  </div>
  ```

- [ ] **Step 7: 验证卡片显示**

  在浏览器中确认 6 个卡片名称、价格、配额正确，企业档不再出现「获取专属报价」按钮。

---

### Task 3: 更新价格周期切换 JS

**Files:**
- Modify: `pricing.html:2267-2337`

**Interfaces:**
- Consumes: `.pricing-card[data-monthly]` 的 `data-monthly` 属性
- Produces: 根据 `data-billing` 更新卡片价格、原价、节省提示、总价

- [ ] **Step 1: 替换 updatePrices 函数逻辑**

  将现有逻辑替换为支持 4 周期的逻辑：

  ```javascript
  function updatePrices(billing) {
    cards.forEach(function(card) {
      const monthly = parseInt(card.dataset.monthly, 10);
      const valueEl = card.querySelector('[data-price-value]');
      const originalEl = card.querySelector('[data-price-original]');
      const savingsEl = card.querySelector('[data-price-savings]');
      const totalEl = card.querySelector('[data-price-yearly-total]');
      const unitEl = card.querySelector('.price-unit');

      if (!valueEl) return;

      if (billing === 'monthly') {
        valueEl.textContent = formatCurrency(monthly);
        if (unitEl) unitEl.textContent = '/ 月';
        if (originalEl) originalEl.classList.add('hidden');
        if (savingsEl) savingsEl.classList.add('hidden');
        if (totalEl) totalEl.classList.add('hidden');
        return;
      }

      const yearlyOriginal = monthly * 12;
      let total, equivalentMonthly, periodMonths, label, savingsLabel;

      if (billing === 'yearly') {
        total = monthly * 10;
        periodMonths = 12;
        label = '按年支付';
        savingsLabel = '年付立省';
      } else if (billing === 'two-year') {
        total = monthly * 10 * 2 * 0.8;
        periodMonths = 24;
        label = '一次买2年';
        savingsLabel = '一次买2年立省';
      } else if (billing === 'three-year') {
        total = monthly * 10 * 3 * 0.7;
        periodMonths = 36;
        label = '一次买3年';
        savingsLabel = '一次买3年立省';
      }

      equivalentMonthly = Math.round(total / periodMonths);
      const saved = Math.round(yearlyOriginal * (periodMonths / 12) - total);

      valueEl.textContent = formatCurrency(equivalentMonthly);
      if (unitEl) unitEl.textContent = '/ 月';
      if (originalEl) {
        originalEl.textContent = '原价 ¥' + formatCurrency(monthly) + '/月';
        originalEl.classList.remove('hidden');
      }
      if (savingsEl) {
        savingsEl.innerHTML = '<span class="material-symbols-outlined text-[13px]">savings</span> ' + savingsLabel + ' ¥' + formatCurrency(saved);
        savingsEl.classList.remove('hidden');
      }
      if (totalEl) {
        totalEl.textContent = label + ' ¥' + formatCurrency(Math.round(total));
        totalEl.classList.remove('hidden');
      }
    });
  }
  ```

- [ ] **Step 2: 验证周期切换**

  在浏览器中依次点击「月付」「年付」「一次买2年」「一次买3年」，确认：
  - 团队基础版：月付 ¥1,500；年付等效 ¥1,250，总价 ¥15,000；2 年等效 ¥1,000，总价 ¥24,000；3 年等效 ¥875，总价 ¥31,500
  - 企业旗舰版：月付 ¥28,000；年付等效 ¥23,333，总价 ¥280,000；2 年等效 ¥18,667，总价 ¥448,000；3 年等效 ¥16,333，总价 ¥588,000

---

### Task 4: 更新功能对比表

**Files:**
- Modify: `pricing.html:1853-2200`

**Interfaces:**
- Consumes: 无
- Produces: 6 列表头、新功能清单 tbody，供 `js/main.js` 移动端提取

- [ ] **Step 1: 更新表头**

  将 `thead` 中的 6 个方案名称更新为：团队基础版、团队标准版、团队专业版、企业标准版、企业专业版、企业旗舰版。

- [ ] **Step 2: 重建 tbody**

  按以下结构重建 `tbody`：
  1. `module-row`: 基础用量及功能
  2. quota-row: 企业内部席位 — 10 / 20 / 30 / 50 / 100 / 不限
  3. quota-row: 本地最大存储空间 — 10T / 20T / 30T / 50T / 100T / 不限
  4. quota-row: 广告账户（巨量千川&巨量广告&磁力金牛&腾讯广告&TikTok）— 10 / 20 / 30 / 50 / 100 / 不限
  5. Agent员工、爆款素材 — 全部 √
  6. `module-row`: 内容中台
  7. 列出用户提供的所有内容中台功能项，全部 √，仅「项目协同」在团队基础版为 ×
  8. `module-row`: 广告投流
  9. 列出所有广告投流功能项，全部 √
  10. `module-row`: 数据报表
  11. 列出任务报表、素材报表、成片报表、数据洞察（账户/成片/商品/计划分析），全部 √
  12. `module-row`: 部署方式
  13. 桌面应用部署：全部 √
  14. NAS设备部署（需NAS设备支持）：团队基础版/标准版 ×，其余 √

  每行格式示例：
  ```html
  <tr class="quota-row"><td>企业内部席位</td><td class="compare-num">10个</td><td class="compare-num">20个</td><td class="compare-num">30个</td><td class="compare-num">50个</td><td class="compare-num">100个</td><td class="compare-unlimited">不限</td></tr>
  ```

  √ 使用：`<span class="material-symbols-outlined compare-check">check_circle</span>`
  × 使用：`<span class="material-symbols-outlined compare-cross">remove</span>`

- [ ] **Step 3: 验证表格**

  在桌面端浏览器中展开功能对比表，确认：
  - 6 列表头名称正确
  - 基础用量数字正确
  - 项目协同仅在团队基础版为 ×
  - NAS 设备部署在团队基础版/标准版为 ×

---

### Task 5: 更新 ROI 计算器映射

**Files:**
- Modify: `pricing.html:2388-2404`

**Interfaces:**
- Consumes: 无
- Produces: 新的 `getPlanPrice` 和 `getPlanName` 返回值

- [ ] **Step 1: 替换 getPlanPrice 和 getPlanName**

  ```javascript
  function getPlanPrice(teamSize) {
    if (teamSize <= 10) return 15000;
    if (teamSize <= 20) return 30000;
    if (teamSize <= 30) return 48000;
    if (teamSize <= 50) return 78000;
    if (teamSize <= 100) return 148000;
    return 280000;
  }

  function getPlanName(teamSize) {
    if (teamSize <= 10) return '团队基础版';
    if (teamSize <= 20) return '团队标准版';
    if (teamSize <= 30) return '团队专业版';
    if (teamSize <= 50) return '企业标准版';
    if (teamSize <= 100) return '企业专业版';
    return '企业旗舰版';
  }
  ```

- [ ] **Step 2: 验证 ROI 计算器**

  在 `pricing.html` 的 ROI 计算区域拖动团队规模滑块，确认：
  - 5 人 → 团队基础版，软件投入 ¥15,000/年
  - 15 人 → 团队标准版，软件投入 ¥30,000/年
  - 25 人 → 团队专业版，软件投入 ¥48,000/年
  - 40 人 → 企业标准版，软件投入 ¥78,000/年
  - 80 人 → 企业专业版，软件投入 ¥148,000/年
  - 150 人 → 企业旗舰版，软件投入 ¥280,000/年

---

### Task 6: 更新移动端套餐标签

**Files:**
- Modify: `pricing.html:1839-1845`

**Interfaces:**
- Consumes: 无
- Produces: 6 个 `data-plan` 标签名称

- [ ] **Step 1: 修改标签按钮**

  将第一个按钮从「团队入门版」改为「团队基础版」：

  ```html
  <button class="mobile-plan-tab px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-gray-100 text-gray-700" data-plan="团队基础版">团队基础版</button>
  <button class="mobile-plan-tab px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-gray-100 text-gray-700" data-plan="团队标准版">团队标准版</button>
  <button class="mobile-plan-tab active px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-brand-600 text-white" data-plan="团队专业版">团队专业版</button>
  <button class="mobile-plan-tab px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-gray-100 text-gray-700" data-plan="企业标准版">企业标准版</button>
  <button class="mobile-plan-tab px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-gray-100 text-gray-700" data-plan="企业专业版">企业专业版</button>
  <button class="mobile-plan-tab px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-gray-100 text-gray-700" data-plan="企业旗舰版">企业旗舰版</button>
  ```

- [ ] **Step 2: 验证移动端视图**

  使用浏览器 DevTools 切换到移动端宽度，确认：
  - 6 个标签可横向滚动
  - 点击不同标签，下方功能列表正确切换
  - 团队基础版标签显示的功能列表中「项目协同」为 —

---

### Task 7: Tailwind 检查与最终验证

**Files:**
- Modify (conditional): `css/tailwind.css`

**Interfaces:**
- Consumes: 所有 HTML 改动
- Produces: 最终可部署的页面

- [ ] **Step 1: 检查是否需要重新生成 Tailwind**

  如果本计划中的改动仅使用了现有 Tailwind class，则跳过。如果新增 class（例如周期按钮的宽度调整），按 `tailwind.config.js` 头部注释执行：

  ```bash
  npx tailwindcss -i tailwind.input.css -o css/tailwind.css --minify --registry=https://registry.npmmirror.com
  ```

- [ ] **Step 2: 启动 Docker 本地环境**

  ```bash
  docker compose up -d web
  ```

- [ ] **Step 3: 访问并验证**

  打开 `http://localhost:18080/pricing.html`，完成以下检查：
  - [ ] 4 个周期切换按钮正常
  - [ ] 6 个价格卡片名称、价格、配额正确
  - [ ] 周期切换后所有卡片价格、节省提示、总价正确
  - [ ] 功能对比表 6 列表头、模块划分、√/× 正确
  - [ ] ROI 计算器推荐方案正确
  - [ ] 移动端标签和功能列表正确

- [ ] **Step 4: Commit 最终改动**

  ```bash
  git add pricing.html
  # 如果 css/tailwind.css 改动也添加
  git add css/tailwind.css
  git commit -m "feat(pricing): 更新价格方案为6档套餐并支持4种付费周期"
  ```

---

## Self-Review

**1. Spec coverage:**
- 6 档价格卡片：Task 2
- 4 周期切换：Task 1 + Task 3
- 功能对比表重建：Task 4
- ROI 计算器：Task 5
- 移动端适配：Task 6
- Tailwind 与验证：Task 7

无遗漏。

**2. Placeholder scan:**
- 无 TBD/TODO
- 所有步骤包含具体代码或命令
- 价格数据完整

**3. Type consistency:**
- `data-billing` 值统一为：`monthly`, `yearly`, `two-year`, `three-year`
- `data-monthly` 统一为整数字符串
- 6 档名称统一：团队基础版、团队标准版、团队专业版、企业标准版、企业专业版、企业旗舰版
