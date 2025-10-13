# 构建阶段
FROM node:20.18.0 AS builder
WORKDIR /app
COPY . .
RUN npm install --frozen-lockfile
RUN npm run generate # 生成静态站点

# 部署阶段
FROM nginx:1.25.2
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/.output/public ./
# COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
