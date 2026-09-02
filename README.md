# maomaocloud-subscribe

猫猫云停用了公开订阅接口 这个项目把它的 v100 私有订阅 还原+解密（双模式解析）成标准 Clash / FlClash 配置 并且实现了一个获取token/uuid的接口

## 公共实例

```
https://maomaocloud-subscribeworker.robotxhub.ai
```

参数二选一：`email+password` 或 `token`（`/full` 的 token 兼容订阅 token 与 auth_data，自动识别）。

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

## 所谓“私有协议”

私有订阅接口 `/api/v100/client/subscribe`，加密是 base64 + AES-128-CBC + base64，密钥硬编码在客户端里（通过动静结合分析得出）：

```
key = 4422a60e08c97f30
iv  = 8c97f304422a60e0
```
逆向过程见 `REVERSE_ENGINEERING.md`。
