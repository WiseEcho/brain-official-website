# 视频大脑-产品官网
## 安装

确保安装依赖：

```bash
# npm
npm install
```

## 开发服务器

在 `http://localhost:3000` 启动开发服务器：

```bash
# npm
npm run dev
```

## 生产环境

构建生产环境应用：

```bash
make pushx
```

本地预览生产环境构建：

```bash
# npm
npm run preview
```

# 开发过程中的QA
## 1.如何替换首页的视频

在/brain-official-website/public/video 中替换视频，如果视频过大，使用https://handbrake.fr/进行压缩替换

## 2.如何发板上线

使用

```bash
make pushx
```
然后，复制最终的镜像到1panel中的容器粘贴

## 3.打包上线后显示502

这是因为打包上线后的内网服务器ip地址，和代理转发到的ip不一致导致的