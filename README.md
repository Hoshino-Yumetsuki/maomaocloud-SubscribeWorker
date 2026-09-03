# maomaocloud-subscribe

猫猫云停用了公开订阅接口 这个项目把它的 v100 私有订阅 还原+解密（双模式解析）成标准 Clash / FlClash 配置 并且实现了一个获取token/uuid的接口

## 公共实例

```
https://maomaocloud-subscribeworker.robotxhub.ai
```

参数二选一：`email+password` 或 `token`（`/full` 的 token 兼容订阅 token 与 auth_data，自动识别）。

> **⚠️ 密码含特殊字符（`#` `!` `@` 等）必须先做 URL 编码**，否则 `#` 之后的字符会被当成链接片段截掉，导致 502。例：密码 `Q78kg123!@#` 在 URL 里要写成 `Q78kg123%21%40%23`。最省心的做法：先用编码后的密码访问一次 `/token` 拿到 `token`，之后订阅 URL 用 `?token=`（token 只有字母数字，永无编码烦恼）。

### /full
解密官方手机app完整私有接口订阅，官方完整配置+所有节点（手机端比电脑端节点多）

```
https://maomaocloud-subscribeworker.robotxhub.ai/full?email=你的邮箱&password=你的密码
https://maomaocloud-subscribeworker.robotxhub.ai/full?token=你的订阅token
```

### /lite
从电脑端APP动态分析提取的部分固定节点信息 + 自动生成订阅

```
https://maomaocloud-subscribeworker.robotxhub.ai/lite?email=你的邮箱&password=你的密码
https://maomaocloud-subscribeworker.robotxhub.ai/lite?token=你的auth_data
```

### /token
账号密码换 `token` / `auth_data` / `uuid`，返回 JSON。拿到 token 后可转用 `/full?token=`（不用每次登录），uuid 即节点密码。

```
https://maomaocloud-subscribeworker.robotxhub.ai/token?email=你的邮箱&password=你的密码
```

都支持 `host=` 指定 API 域名（默认内置几个，随机选 + 自动切换）；`/full` 另有 `ip=1`，把节点域名替换为实时解析的 IP。

## 自部署

```
npm install
npx wrangler deploy
```

## Python

```
python3 fetch_sub_api.py 账号 密码 [API域名] 输出.yaml
```

## 说明

- 节点协议 anytls，密码是账号 uuid（来自 getSubscribe）
- 节点域名是私有 DNS，公网解析不到，需走猫猫云自己的 DoH（阿里 PrivateZone），IP 会变
- 配置可直接用于 FlClash / Clash Verge
- 用 `email+password`（或 `auth_data`）订阅时，响应带标准 `subscription-userinfo` / `profile-title` 头，FlClash 卡片会显示**流量 / 到期 / 机场名**（默认「猫猫云」，可用 `?title=` 改）；纯 `?token=` 订阅不显示流量
- 首页有生成器：输入账号密码直接生成「完整（显示流量）」与「纯 token」两种订阅链接，密码特殊字符自动编码
- 若订阅报 403 / “未返回节点”：多半是**账号套餐已过期或未在官方 App 激活订阅**，与解析服务无关；`/token` 现在会返回 `plan_name` / `expired_at` / `is_plan_expired` 供自查

## 所谓“私有协议”

私有订阅接口 `/api/v100/client/subscribe`，加密是 base64 + AES-128-CBC + base64，密钥硬编码在客户端里（通过动静结合分析得出）：

```
key = 4422a60e08c97f30
iv  = 8c97f304422a60e0
```
逆向过程见 `REVERSE_ENGINEERING.md`。
