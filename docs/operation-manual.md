# 视频大脑官网 开发运维手册

> 本文档面向非技术背景的操作人员，所有命令都可以直接复制粘贴执行。

---

## 一、环境准备

开发前需要安装以下工具：

| 工具 | 用途 | 下载地址 |
|---|---|---|
| AI 工具（Claude Code 等） | 协助修改代码 | 按团队要求安装 |
| Git | 代码版本管理 | macOS 通常自带，终端输入 `git --version` 检查 |
| Docker Desktop | 本地预览 + 构建镜像 | https://www.docker.com/products/docker-desktop |
| 代理软件 | 访问 GitHub、Docker 镜像仓库 | 按团队要求配置 |

**检查安装是否成功：**

```bash
git --version
docker --version
docker compose version
```

如果都能显示版本号，说明环境 OK。

---

## 二、项目目录

官方仓库位置（以后所有操作都在这个目录）：

```
~/Projects/brain-official-website
```

进入项目目录：

```bash
cd ~/Projects/brain-official-website
```

关键文件说明：

| 文件/目录 | 说明 |
|---|---|
| `index.html` | 官网首页 |
| `products.html` | 产品页 |
| `pricing.html` | 价格页 |
| `about.html` | 关于我们页 |
| `product-*.html` | 产品二级详情页 |
| `css/main.css` | 样式文件 |
| `js/main.js` | 交互脚本 |
| `images/` | 图片、GIF 等素材 |
| `nginx.conf` | 生产环境 Nginx 配置 |
| `Dockerfile` | 镜像构建文件 |
| `Makefile` | 编译和推送镜像命令 |
| `docker-compose.yml` | 本地开发环境配置 |

---

## 三、本地开发流程

### 1. 启动本地预览

确保在项目目录下：

```bash
cd ~/Projects/brain-official-website
docker compose up -d
```

然后打开浏览器访问：

```bash
open http://127.0.0.1:18080
```

> 本地服务使用 18080 端口。如果以后这个端口被其他程序占用，可以修改 `docker-compose.yml` 里的端口。

### 2. 修改页面

用 AI 工具或代码编辑器修改文件，例如：

- 改首页内容 → 编辑 `index.html`
- 改样式 → 编辑 `css/main.css`
- 改交互 → 编辑 `js/main.js`

改完后**刷新浏览器**即可看到效果。

### 3. 停止本地服务

```bash
cd ~/Projects/brain-official-website
docker compose down
```

---

## 四、Git 提交与推送

修改完成后，需要把代码提交到 GitHub 的 `main` 分支。

### 1. 查看改了哪些文件

```bash
cd ~/Projects/brain-official-website
git status
```

### 2. 添加修改的文件

```bash
git add .
```

### 3. 提交代码

```bash
git commit -m "feat: 这里写你改了什么"
```

提交信息格式建议：

- `feat: 新增某某功能或页面`
- `fix: 修复某某问题`
- `update: 更新某某内容`
- `refactor: 重构某某代码`

### 4. 推送到远程仓库

```bash
git push origin main
```

推送成功后，GitHub 上的 `main` 分支就更新了。

---

## 五、编译并上传镜像

代码推送到 GitHub 后，需要在本地执行编译命令，生成 Docker 镜像并推送到镜像仓库。

```bash
cd ~/Projects/brain-official-website
make pushx
```

执行过程中会：

1. 使用 Dockerfile 构建镜像
2. 生成版本号（格式如 `git-main-2026062515-abc1234`）
3. 推送到镜像仓库 `d-x.cmstop.net`

命令执行完成后，终端会输出类似：

```
d-x.cmstop.net/brain-official-website:git-main-2026062515-abc1234
```

**把这串地址复制下来，后面上线要用。**

> 注意：执行 `make pushx` 需要有访问 `d-x.cmstop.net` 镜像仓库的权限。

---

## 六、上线部署（火山容器平台）

### 1. 登录容器管理平台

打开：https://volc-panel.vms.9466.com/e03eef7378

使用团队文档中「有公网 IP 的机器 01」的账号密码登录。

### 2. 拉取镜像

1. 打开：https://volc-panel.vms.9466.com/containers/image
2. 进入路径：**容器 → 镜像 → 拉取镜像**
3. 在输入框中粘贴刚才 `make pushx` 输出的镜像地址
4. 点击确认，等待拉取完成

### 3. 升级容器

1. 打开：https://volc-panel.vms.9466.com/containers/container
2. 搜索：`front-shipindanao`
3. 点击该容器右侧的 **更多 → 升级**
4. 在镜像地址框中粘贴刚才的镜像地址
5. 点击确认，等待升级完成

### 4. 线上验证

打开官网查看效果：

https://www.shipindanao.com

---

## 七、回滚（如果上线后出问题）

如果升级后发现页面有问题，可以在火山平台重新升级回上一个镜像版本。

1. 进入：https://volc-panel.vms.9466.com/containers/container
2. 搜索 `front-shipindanao`
3. 点击 **更多 → 升级**
4. 填入上一个稳定的镜像地址
5. 确认升级

---

## 八、完整流程速查表

```bash
# 1. 进入项目
cd ~/Projects/brain-official-website

# 2. 启动本地预览
docker compose up -d
open http://127.0.0.1:18080

# 3. 修改页面，刷新浏览器验证

# 4. 停止本地服务
docker compose down

# 5. 提交代码
git add .
git commit -m "feat: 描述修改内容"
git push origin main

# 6. 编译并上传镜像
make pushx

# 7. 复制输出的镜像地址，去火山平台拉取镜像并升级容器

# 8. 访问 https://www.shipindanao.com 验证
```

---

## 九、常见问题

### Q1: 本地打不开 `http://127.0.0.1:18080`

检查 Docker Desktop 是否正在运行：

```bash
docker ps
```

如果没有容器运行，重新启动：

```bash
cd ~/Projects/brain-official-website
docker compose up -d
```

### Q2: `git push` 提示没有权限

检查当前目录是不是官方仓库：

```bash
cd ~/Projects/brain-official-website
git remote -v
```

应该显示：

```
origin  https://github.com/WiseEcho/brain-official-website.git
```

### Q3: `make pushx` 失败

检查：

1. Docker Desktop 是否正在运行
2. 是否有访问镜像仓库 `d-x.cmstop.net` 的网络权限
3. 当前是否在项目根目录下

### Q4: 修改了多个页面，怎么确认都正确

本地预览时，依次访问这些页面检查：

- 首页：http://127.0.0.1:18080/
- 产品页：http://127.0.0.1:18080/products.html
- 价格页：http://127.0.0.1:18080/pricing.html
- 关于页：http://127.0.0.1:18080/about.html

### Q5: 更新了 header/footer，需要检查哪些页面

因为这个项目是纯静态 HTML，没有模板系统，header 和 footer 是复制到每个 HTML 文件里的。

修改后需要检查所有页面：

```
index.html
products.html
pricing.html
about.html
product-insight.html
product-assets.html
product-collaboration.html
product-data.html
product-ad.html
product-platform.html
404.html
```

---

## 十、重要提醒

1. **只在官方仓库操作**：`~/Projects/brain-official-website`，不要回到旧目录 `/Users/wangshuo/shipindanao_web` 修改。
2. **提交前先在本地验证**：确保页面显示正常再 push。
3. **保留镜像地址**：`make pushx` 输出的镜像地址是上线必填信息。
4. **非高峰时段上线**：避免在用户访问量大的时段更新容器。
5. **上线后立刻验证**：打开 https://www.shipindanao.com 检查关键页面。

---

**最后更新**：2026-06-25
