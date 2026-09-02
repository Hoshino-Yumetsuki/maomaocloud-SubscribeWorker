# 猫猫云 (MaoMaoCloud) 客户端逆向工程报告

> 分析对象：`maomao6.0.0.deb`（猫猫云 Cat 客户端 Linux 版）
> 逆向日期：2026-09-02

---

## 一、客户端架构

| 组件 | 说明 |
|---|---|
| `Cat` (25KB) | Flutter Linux GTK 启动器 |
| `CatCore` (35MB) | **魔改 Mihomo (MetaCubeX/Clash.Meta)** Go 内核（statically linked, stripped） |
| `libapp.so` (13MB) | Flutter Dart AOT 业务逻辑 |
| 应用 ID | `cat.cloud`（数据在 `~/.local/share/cat.cloud/`） |

- 猫猫云 App 本质是 **FlClash 的魔改版**（`.desktop` Keywords 含 `FlClash;ClashMeta`）
- 通信：Flutter(Cat) 监听 Unix socket `/tmp/CatSocket_*.sock`，CatCore 作为客户端连接，JSON-RPC 协议
- App 内置 Mihomo 内核并预置"猫猫云"订阅（profile id=`999999`）

---

## 二、动态域名发现机制（官网域名会变的原因）

App 启动时访问阿里 OSS 获取**当前 API 域名**：

```
GET https://maomaoyunapp.oss-cn-beijing.aliyuncs.com/
→ {"api":"https://amaoaamaoa.matach.qqaawwmao.com.nengli.xyz"}
```

App 内置/探测的 API Host（多活）：
- `https://api.brfcdu.cn`
- `https://mmyapi.lnnrhtp.com`
- `https://app.maomao234.com`
- `https://dy.maomaoapi.org`（订阅专用域名）
- `https://amaoaamaoa.matach.qqaawwmao.com.nengli.xyz`（OSS 下发）

> 真实面板域名示例（从浏览器历史确认）：`app.maomao234.com`（"猫猫云官网 稳定如猫的高性价比网络服务"）

---

## 三、API 调用路径（完整逆向确认 ✅）

所有接口前缀均为 `{API_BASE}/api/v1`（App UA 用 `Mozilla/5.0 (dart:io) SuperAccelerator` 或 `NetFlow/v6.0.0 clash-verge Platform/linux`）。

### 1. 登录
```
POST {host}/api/v1/passport/auth/login
Content-Type: application/x-www-form-urlencoded
body: email=<邮箱>&password=<密码>

→ {
  "status":"success",
  "data": {
    "token": "95357dc4...",        // 订阅 token（32位hex）
    "auth_data": "eyJ0eXAiOiJKV1Qi...",  // JWT (HS256)，用于 API 鉴权
    "is_admin": 0, "is_staff": 0
  }
}
```

### 2. 鉴权方式（关键！）
**JWT 直接放 `Authorization` 头，不带 `Bearer ` 前缀**：
```
Authorization: <auth_data JWT>
```
（带 `Bearer ` 会 403 "未登录或登录已过期"；也可用 `?auth_data=<JWT>`）

### 3. 获取订阅元数据
```
GET {host}/api/v1/user/getSubscribe          (Header: Authorization: <JWT>)
→ data: {
    plan_id, token, expired_at, u, d, transfer_enable,
    email, uuid: "913ee7f4-5c20-45cc-ba18-388275bdb764",   // ← vless/anytls 用户UUID
    plan: {...}, subscribe_url, reset_day
}
```
- `subscribe_url` 返回的是 **`/api/v1/client/subscribe?token=...`（v1，返回空！）**
- App 实际使用 **v100** 路径（见下）

### 4. 节点列表（App 展示用）
```
GET {host}/api/v1/user/server/fetch          (Header: Authorization: <JWT>)
→ data: [ { id, type:"anytls", name, rate, tags:[...], is_online, cache_key, last_check_at }, ... ]
```
返回 **101 个节点元数据**（无连接参数）。

### 5. App 专用加密订阅（v100 接口）
```
GET {host}/api/v100/client/subscribe?token=<订阅token>
```
- ⚠️ **路径是 `/api/v100/` 不是 `/api/v1/`**（v1 被服务端关闭，永远返回空 body）
- 对任何 UA 都返回同一份 **342,680 字符 base64 → 257,008 字节加密数据**（静态，与 UA/flag 无关）
- 响应头含标准 `Subscription-Userinfo`、`Profile-Update-Interval: 24`
- 该密文被 App 原样落盘为 `profiles/999999.yaml`

---

## 四、节点数据（解密后的明文结构 ✅）

App 加载后喂给 CatCore 的节点为标准 mihomo anytls 格式：

```json
{
  "alpn": ["h2", "http/1.1"],
  "client-fingerprint": "chrome",
  "name": "1.0x 🇭🇰 香港 HK - 9",
  "password": "<用户的 UUID>",            // = getSubscribe 返回的 uuid
  "port": 60008,
  "server": "gtm-sg-nnu4tneapp20g.maomaogtm.com",
  "skip-cert-verify": true,
  "sni": "osxapps.itunes.apple.com",
  "type": "anytls",
  "udp": true
}
```

**规律（重要）**：
- 协议全部为 **anytls**；SNI 固定伪装 `osxapps.itunes.apple.com`
- **password = 用户 UUID**（所有节点相同，从 getSubscribe 即可获得）
- server 仅 3 个伪装域名：
  - `gtm-sg-nnu4tneapp20g.maomaogtm.com`（主力，HK/各国 1.0x 节点，端口 59999~60199）
  - `gtm-sg-d6a4tnfxt21gzl.maomaogtm.com`（"直连" 0.5x 节点，端口 50000~50199）
  - `us.maomaogtm.com`（美国节点，端口 60129~60138）
- **端口 = 地区基准端口 + 编号**（如 HK-1→60000, KR-1→60100, FR-1→60101 ...）

已从运行内存提取到 **47+ 个节点的完整 name→(server, port) 映射**，见 `MaoMaoCloud_FlClash.yaml` 与 `fetch_sub_api.py` 内置表。

---

## 五、v100 数据解密（逆向进度）

### 已确认
- 解密发生在 **CatCore**（魔改 mihomo）内部。App 通过 socket 下发 JSON-RPC：
  ```
  {"method":"getConfig","data":"<path>/profiles/999999.yaml",...}
  ```
  CatCore 收到后**读取该密文文件并自行解密加载**（内核成功运行、节点可见）。
- 相关符号（Go pclntab / GoReSym 提取）：
  ```
  github.com/metacubex/mihomo/common/convert.DecryptConfig          @0x108D000
  github.com/metacubex/mihomo/common/convert.DecodeAESBase64        (AES + base64 解密)
  github.com/metacubex/mihomo/common/convert.DecodeObfuscatedBase64
  github.com/metacubex/mihomo/common/convert.isValidConfig
  github.com/metacubex/mihomo/common/convert.isYAMLConfig
  github.com/metacubex/mihomo/common/convert.TryDecodeBase64
  ```
- 编译机源码路径泄露：`/home/runner/work/NetAPP/NetAPP/core/Clash.Meta/common/convert/decrypt.go`
  → 项目代号 **NetAPP**，为 cat.cloud 私有魔改（开源 mihomo 中无 DecryptConfig）
- 算法推断：内容先 `DecodeObfuscatedBase64`/`TryDecodeBase64` 还原，再 **AES 解密**（`DecodeAESBase64`），解密失败则回退当普通 YAML（`isYAMLConfig`）。

### 未完成
- **AES 密钥未最终提取**：二进制 stripped（无 DWARF），dlv/gdb 读取局部变量受限；
  已成功在 `DecryptConfig` 设断点并触发（addr 0x108D000 = pclntab 解析的真实地址），
  但需进一步在 `DecodeAESBase64` 入口捕获寄存器以获得 key 字节。

### 替代可行方案（无需解密）
由于节点参数**高度规律且 password=UUID 已知**，通过以下组合即可生成可用配置：
1. 登录 → 拿 `uuid`（=password）与 `token`
2. `server/fetch` → 拿全部节点 id/name
3. 结合已提取的 name→(server,port) 映射表（见 `fetch_sub_api.py`）生成标准 Clash YAML

---

## 六、其他测试结论（避免重复劳动）

- ❌ `/api/v1/client/subscribe`（v1）任何 UA/flag 均返回空 —— 服务端已关闭
- ❌ v100 加任何 `flag=`/`client=`/`type=` 参数均返回同一密文
- ❌ 加密非 gzip/zlib；AES-GCM/CTR 用 token/uuid/常见字符串派生密钥盲测未命中
- ✅ `server/fetch`、`user/getSubscribe`、`user/info` 等 `/api/v1/user/*` 接口**未被关闭**（需 JWT 直放 Authorization）
- ✅ 订阅域名 `dy.maomaoapi.org` 与面板 `api.brfcdu.cn` 共享同一后端
