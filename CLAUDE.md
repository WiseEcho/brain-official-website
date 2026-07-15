# CLAUDE.md

视频大脑官网**生产仓库**（GitHub: WiseEcho/brain-official-website → Docker 镜像 → K8s 部署，线上 www.shipindanao.com）。设计迭代在 `~/shipindanao_web`，稳定后手工搬运到本仓库。

## 固定环境（禁止临时环境）

| 用途 | 容器 | 地址 | 命令 |
|---|---|---|---|
| 本地开发验证（bind mount，改动即时生效） | `brain-official-website-local` | http://localhost:18080 | `docker compose up -d web` |
| 生产镜像验证（按 Dockerfile 构建） | `brain-official-website-prod-preview` | http://localhost:18081 | `docker compose --profile prod-preview up -d --build prod-preview` |

禁止自起 `python3 -m http.server` 等临时服务器；程序化检查用 curl 打容器地址。

## 镜像构建铁律

1. **必须 `--platform linux/amd64`**：生产节点为 x86。Apple Silicon Mac 上省略此参数会产出 arm64 镜像，部署后容器无法启动、入口 500，且 ARM 本地测试完全测不出（2026-07-14 事故）。推送前 `docker inspect` 核对架构。
2. **构建命令**（Docker Hub 超时场景）：`DOCKER_BUILDKIT=0 docker build --platform linux/amd64 --pull=false -t d-x.cmstop.net/brain-official-website:git-main-<YYYYMMDDHH>-<sha> --build-arg IMAGE_TAG=<同标签> .`
3. **Tailwind 已静态化**：改任何 HTML 的 class 后必须重新生成 `css/tailwind.css`，命令见 `tailwind.config.js` 头部注释（用 `--registry=https://registry.npmmirror.com`）。
4. **回滚**：registry 保留全部历史标签，部署平台换标签即可回滚。本地镜像只留当前版 + 上一稳定版。

## 协作约定

- 文案改动需同步 `index.html` 与 `docs/design-demo.html`。
- 不同类型的改动拆成独立 commit。
- 推送/构建/部署前先与使用者确认。
