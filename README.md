# 视频大脑官网

本仓库当前是 `www.shipindanao.com` 的纯静态官网发布仓库，页面和资源来自产品提供的静态部署包。

## 目录说明

- `index.html`：官网首页。
- `products.html`、`pricing.html`、`about.html`：主要公开页面。
- `product-*.html`：产品二级详情页，当前由 `robots.txt` 禁止搜索引擎抓取。
- `css/`、`js/`、`images/`：页面样式、脚本和静态资源。
- `nginx.conf`：Docker 镜像内使用的 Nginx 配置，包含旧路径兼容和缓存规则。

## 本地预览

可以在仓库根目录启动任意静态文件服务，例如：

```bash
python3 -m http.server 8080
```

然后访问 `http://127.0.0.1:8080/`。

## 构建镜像

```bash
make docker-build
```

## 推送镜像

```bash
make pushx
```

`make pushx` 会在镜像构建时生成 `version.json`，然后使用 `docker buildx` 构建 `linux/amd64` 镜像并推送到默认镜像仓库。
