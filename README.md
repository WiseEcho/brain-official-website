# 视频大脑官网

本仓库当前是 `www.shipindanao.com` 的纯静态官网发布仓库，页面和资源来自产品提供的静态部署包。

## 分支说明

- `main`：新版官网主分支，当前用于维护和发布产品提供的纯静态官网。
- `legacy/shipindanao-www-nuxt`：老版 `www.shipindanao.com` 官网历史分支，保留原 Nuxt 版本，便于回滚和查历史问题。
- `archive/main-before-static-20260619`：新版静态官网合入前的 `main` 快照，只用于历史留存，不建议继续开发。
- `feature-support-shipindanao-com`：旧的老官网功能分支名，暂时保留是为了兼容可能仍引用该分支的部署或 CI 配置；确认无引用后可删除。

## 目录说明

- `index.html`：官网首页。
- `products.html`、`pricing.html`、`about.html`：主要公开页面。
- `product-*.html`：产品二级详情页，当前由 `robots.txt` 禁止搜索引擎抓取。
- `css/`、`js/`、`images/`：页面样式、脚本和静态资源。
- `nginx.conf`：Docker 镜像内使用的 Nginx 配置，包含旧路径兼容和缓存规则。

## 本地预览

首次拉取仓库后先安装 Tailwind 构建依赖：

```bash
npm install
```

可以在仓库根目录启动任意静态文件服务，例如：

```bash
python3 -m http.server 8080
```

然后访问 `http://127.0.0.1:8080/`。

## 构建镜像

```bash
make docker-build
```

`make docker-build` 会先执行 `npm run build:tailwind`，把页面使用到的 Tailwind class 重新生成到 `css/tailwind.css`，再构建 Nginx 静态镜像。

## 推送镜像

```bash
make pushx
```

`make pushx` 同样会先执行 `npm run build:tailwind`，并在镜像构建时生成 `version.json`，然后使用 `docker buildx` 构建 `linux/amd64` 镜像并推送到默认镜像仓库。
