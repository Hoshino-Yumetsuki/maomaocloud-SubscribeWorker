# 🐱 猫猫云订阅桥接 (MaoMaoCloud Subscribe Bridge)

猫猫云 6.0 客户端封闭了标准 Clash 订阅（`/api/v1/client/subscribe` 返回空），节点仅通过其定制 App 下发。本项目通过逆向其私有协议，把订阅还原为标准 **Clash / FlClash / Mihomo** 配置，**无需官方 App**。

> 📖 完整逆向分析见 [`REVERSE_ENGINEERING.md`](./REVERSE_ENGINEERING.md)

---

## ✨ 能力

- ✅ 还原猫猫云私有 API 调用路径（登录 / getSubscribe / server/fetch）
- ✅ 识别节点私有域名解析机制（**阿里云 PrivateZone DoH**），动态解析真实入口 IP
- ✅ 生成标准 Clash YAML（anytls 节点 + 规则组 + DNS），实测 **528 Mbps / 全节点连通**
- ✅ 本地 CLI（Python）+ 云端（Cloudflare Workers，TypeScript）双实现

---

## 📦 仓库结构

```
├── src/index.ts              # Cloudflare Worker（TypeScript，订阅 API）
├── fetch_sub_api.py          # 本地自动化 CLI（登录→节点→生成 YAML）
├── examples/MaoMaoCloud_FlClash.yaml   # 生成示例配置（可导入 FlClash）
├── REVERSE_ENGINEERING.md    # 逆向工程文档
├── wrangler.jsonc            # Worker 配置
├── package.json / tsconfig.json
```

---

## ☁️ 方式一：Cloudflare Worker（推荐长期使用）

把 Worker 部署后，得到**一个标准订阅链接**，直接填进 FlClash / Clash Verge 即可。

### 部署

```bash
npm install
npx wrangler login
npx wrangler deploy
```

### 配置账号（Secret，避免密码暴露在链接中）

```bash
npx wrangler secret put MAOMAO_EMAIL     # 猫猫云账号邮箱
npx wrangler secret put MAOMAO_PASSWORD  # 猫猫云账号密码
# 可选
npx wrangler secret put MAOMAO_HOST      # API 域名，默认 https://api.brfcdu.cn
```

### 使用

```
# 订阅链接（配置 Secret 后）
https://<your-worker>.workers.dev/sub

# 或临时用 query 传参（自用）
https://<your-worker>.workers.dev/sub?email=xx@xx.com&password=xxxx
```

FlClash 中新增订阅并填入上述 URL 即可；节点 IP 每次更新时由 Worker 自动解析（动态变化）。

### 本地开发

```bash
npm run dev        # http://localhost:8787
npm run typecheck  # tsc
```

---

## 🐍 方式二：本地 Python CLI

```bash
python3 fetch_sub_api.py <邮箱> <密码> <API域名> 输出.yaml
```

每次运行自动：登录 → 取 UUID → 拉节点列表 → DoH 解析最新 IP → 生成 YAML。

> 生成的 YAML 导入 FlClash 即可（示例见 `examples/`）。

---

## 🔐 原理速览（详见 REVERSE_ENGINEERING.md）

| 步骤 | 说明 |
|---|---|
| 1 登录 | `POST /api/v1/passport/auth/login`（form）→ `auth_data`(JWT) |
| 2 鉴权 | JWT **直放 `Authorization`（无 Bearer）** |
| 3 UUID | `GET /api/v1/user/getSubscribe` → `uuid`（= anytls 节点密码） |
| 4 节点池 | `GET /api/v1/user/server/fetch` → 全量节点（电脑端 ~40 个可用） |
| 5 真实 IP | 节点私有域名必须用猫猫云 **阿里云 PrivateZone DoH** 解析：`https://874441-ywvcq20ne9plstif.alidns.com/dns-query`（RFC 8484） |
| 6 输出 | 标准 Clash YAML（server 填解析 IP + DNS 兜底配置猫猫云 DoH） |

**节点形态**：`anytls`，`password=UUID`，SNI 伪装 `osxapps.itunes.apple.com`，入口 IP 国内为广州电信中转、海外为洛杉矶。

---

## ⚠️ 免责声明

本项目仅供个人学习与技术研究使用。请遵守猫猫云服务条款及当地法律法规，账号凭据请自行妥善保管。
