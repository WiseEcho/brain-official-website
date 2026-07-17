# 移动端 Hero 改版任务

目标：按用户要求修改 `index.html` Hero 区域移动端表现，同时保持桌面端不变。

- [x] 定位当前 Hero 结构与现有微信客服链接
- [x] 调整布局：移动端视频放在文案上方（桌面端保持右侧双栏）
- [x] 移动端去掉「立即免费试用」按钮
- [x] 移动端新增「立即咨询专属顾问」按钮（白底绿边绿字）
- [x] 桌面端保留原有「立即免费试用 + 预约演示产品」双按钮，并区分主次
- [x] 修复按钮在 640px-1024px 区间文字换行的问题
- [x] 优化移动端两个 CTA 的协调感
- [x] 修改 JS：移动端不再移除 Hero 视频，允许移动端加载视频
- [x] Hero 视频默认自动播放有声；若被浏览器阻止则回退静音播放
- [x] 微信预约面板：「一键添加企业微信」改为「立即咨询专属顾问」，并在 PC 端显示
- [x] 移动端底部固定 CTA：改为「预约演示 + 咨询顾问」，并加高加大、双实心按钮更醒目
- [x] 优化底部固定 CTA 触发逻辑：从「等 Hero 完全离开视口」改为「Hero 顶部滑出 100px 即显示」，更灵活
- [x] 重新生成 `css/tailwind.css` 并更新资源版本号防缓存
- [x] 重建 prod-preview 镜像并验证

验证截图：
- `screenshots/hero-mobile-v7.png`
- `screenshots/hero-desktop-v7.png`
- `screenshots/wechat-panel-desktop.png`
- `screenshots/sticky-cta-v3.png`

---

# 修复：移动端底部固定 CTA 在深层滚动被 footer 触发隐藏

目标：移除 footer 进入视口即隐藏 CTA 的逻辑，让 CTA 在 hero 下方全程保持可见。

- [x] 定位 `js/main.js` 中 sticky CTA 的 IntersectionObserver 逻辑
- [x] 确认 footer 触发导致深层滚动时 CTA 被隐藏
- [x] 移除 footer observer，仅保留 hero sentinel 控制显示
- [x] 更新 `index.html` 中 `main.js` 缓存版本号至 `v=20260717-8`
- [x] 本地 Docker 容器验证：顶部隐藏、滚动 200px 后显示、深层滚动及底部仍显示
- [x] Code Review 通过（移除未使用的 `els.footer` 引用）
- [x] 重建 prod-preview 镜像并验证

验证截图：
- `screenshots/sticky-cta-deep-scroll-v1.png`（本地 bind mount）
- `screenshots/sticky-cta-deep-scroll-prod-preview-v1.png`（prod-preview）
