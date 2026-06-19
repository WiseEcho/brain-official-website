FROM nginx:1.30.3-alpine

ARG IMAGE_TAG=dev

WORKDIR /usr/share/nginx/html

# 本仓库现在是纯静态官网，不再执行 Nuxt/Node 构建；只复制最终可部署资源。
COPY *.html ./
COPY humans.txt robots.txt sitemap.xml site.webmanifest ./
COPY css ./css
COPY js ./js
COPY images ./images

# 镜像构建时写入版本号，避免发布流程修改仓库内静态文件。
RUN printf '{"data":"%s"}\n' "$IMAGE_TAG" > ./version.json

# 使用项目内 Nginx 配置，处理旧路径兼容、404 和静态资源缓存。
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
