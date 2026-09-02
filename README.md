# 🐱 猫猫云订阅转换器 (MaoMaoCloud Subscribe Worker)

本项目是一个部署在 **Cloudflare Worker** 上的轻量订阅桥接与转换服务。

针对猫猫云 6.0 官方客户端（Cat 客户端）隐藏/关闭公开 Clash 订阅链接的问题，通过逆向分析客户端底层 API 接口，实现直接通过个人 Token / 凭证提取节点并生成标准 **Clash / Flclash / Mihomo / Clash Verge** 完整配置，无需运行官方定制客户端。

---

## 🌟 核心特性

- **绕过专用 App**：直接模拟官方客户端请求，提取真实节点配置。
- **完美兼容 Flclash**：自动补齐标准规则组（分流、自动测速、故障转移、漏网之鱼）及 Meta DNS 配置。
- **全平台适用**：可在 Android、iOS、Windows、macOS、Linux 上的任意第三方 Clash / Mihomo 客户端中使用。
- **极速低延迟**：运行于 Cloudflare 全球边缘网络，零冷启动开销。
- **内置 Web UI**：打开 Worker 首页即可可视化生成订阅链接并一键复制。

---

## 🚀 部署方法

### 方式一：使用 Wrangler CLI 命令行部署

1. **克隆或进入本项目目录：**
   ```bash
   cd maomaocloud-SubscribeWorker
   ```

2. **安装依赖：**
   ```bash
   npm install
   ```

3. **本地开发调试：**
   ```bash
   npm run dev
   ```

4. **一键部署至 Cloudflare Workers：**
   ```bash
   npx wrangler deploy
   ```

---

### 方式二：Cloudflare Dashboard 网页端直接粘贴

1. 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)。
2. 进入 **Compute (Workers & Pages)** -> **Create application** -> **Create Worker**。
3. 将 `src/index.js` 中的全部代码复制粘贴到 Worker 编辑器中。
4. 点击 **Deploy** 部署。

---

## 📖 使用指南

### 1. 获取你的 Token / 凭证
- 登录猫猫云网页版后台。
- 在用户中心或抓包中获取你的 `token`（即订阅 token 或 32 位鉴权 key）。

### 2. 生成订阅链接

你可以直接访问部署好的 Worker 域名：`https://<你的worker名称>.workers.dev`，在 Web 界面输入 Token 生成链接。

或者直接拼接订阅 URL：
```text
https://<你的worker名称>.workers.dev/sub?token=你的Token&host=https://猫猫云官网或API域名
```

#### 参数说明：
| 参数 | 说明 | 必填 | 默认值 |
| :--- | :--- | :--- | :--- |
| `token` | 用户的订阅 Token 或 Authorization 凭证 | **是** | 无 |
| `host` | 猫猫云 API 接口地址或当前官网域名 | 否 | `https://api.maomao.cloud` |
| `target` | 目标格式：`clash` (默认) 或 `raw` (原始节点列表) | 否 | `clash` |

### 3. 在 Flclash / 第三方客户端中导入
1. 打开 **Flclash** / **Clash Verge** / **Clash Nyanpasu** 等客户端。
2. 添加订阅（配置），将上述生成的 URL 粘贴进去。
3. 点击保存并更新订阅即可正常使用所有节点。

---

## 🔍 技术原理分析

通过对猫猫云 6.0 客户端二进制 (`CatCore` + `libapp.so`) 分析：
1. **内核本质**：官方 `CatCore` 本质为打包裁剪的 **Mihomo (Clash.Meta)** 核心。
2. **鉴权机制**：客户端调用 `/api/v1/user/getSubscribe` 或 `/api/v1/client/subscribe` 接口拉取订阅。
3. **转换封装**：本 Worker 代理了该过程，并重新组装了标准的 Clash Proxy Groups 与 Rules 规则集，使第三方客户端能够直接加载。
