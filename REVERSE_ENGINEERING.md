# 猫猫云 (MaoMaoCloud) 客户端逆向工程报告

> 分析对象：
> - `maomao6.0.0.deb` — 猫猫云 Cat 客户端 **Linux 版**（Flutter UI + CatCore Go 内核）
> - `maomao2.3.6.apk` — 猫猫云 Cat 客户端 **Android 版（最新）**（Kotlin/Java + Kr328/ClashForAndroid + 标准 mihomo 内核）
> 逆向日期：2026-09-02 ｜ 状态：**订阅 v100 加密已完整破解 ✅**

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

v100 密文**完整解密后**实际包含 **105 个节点**（flow-map 单行格式，见下），`proxy-groups` 部分由 App/内核额外生成。解密得到的真实 YAML 落在 `/tmp/maomao_FINAL.yaml`（192,743 字节），可作为任何第三方客户端的**官方标准订阅格式**。

---

## 五、v100 数据解密（✅ 已完整破解）

### 解密链路（最终确认，本地可一键复现）
```
GET {host}/api/v100/client/subscribe?token=<token>
   │
   ▼  ① HTTP body：342,680 字符（标准 base64）
base64 解码
   │
   ▼  ② 257,008 字节 AES-128-CBC 密文（16 对齐，PKCS#7）
AES-128-CBC 解密
   key = "4422a60e08c97f30"     ← 硬编码于 CatCore
   iv  = "8c97f304422a60e0"     ← 硬编码于 CatCore
   │
   ▼  ③ 256,992 字节（又是 base64 文本，注意：AES 解密后还有一层 base64）
base64 解码
   │
   ▼  ④ 192,743 字节最终明文 YAML（标准 mihomo 配置）
      （proxies: 105 个 anytls 节点 + proxy-groups + DNS 段）
```

### 密钥提取方法（关键突破）
1. **符号定位**：CatCore stripped 但保留 Go `.gopclntab`；用本机 Go 官方库 `debug/gosym`
   （非 GoReSym，其 VA 有 +0x16B6160 偏差）精确解析出真实地址：
   ```
   convert.DecodeAESBase64    @ 0x1084b80 - 0x1084e60
   convert.aesDecryptCBC      @ 0x1084e60 - 0x1085100   ← AES-CBC 核心（key/iv 为参数）
   convert.DecryptConfig      @ 0x108d680 - 0x108d8c0
   convert.DecodeObfuscatedBase64 @ 0x108dd20
   ```
2. **反汇编 `DecodeAESBase64`**（x86-64 静态可执行，objdump 直读）：key 以 `movabs` 立即数
   写入栈/堆缓冲，逐段拼出两个 16 字节常量：
   ```
   1084bcd: movabs $0x6530366132323434  → "4422a60e"
   1084bdc: movabs $0x3033663739633830  → "08c97f30"   ⇒ 栈区 key = "4422a60e08c97f30"
   1084bff: movabs $0x3430336637396338  → "8c97f304"
   1084c0c: movabs $0x3065303661323234  → "422a60e0"   ⇒ 堆区 iv  = "8c97f304422a60e0"
   ```
3. **实证**：node/openssl `aes-128-cbc` 解密第 ② 步密文 → 输出第 ③ 步 base64，二次解码即得合法 YAML。
   （key/iv 互换会 PKCS#7 padding 校验失败，故顺序确定。）

### 已知事实（原已确认）
- 解密发生在 **CatCore**（魔改 mihomo，项目代号 **NetAPP**，编译路径
  `/home/runner/work/NetAPP/NetAPP/core/Clash.Meta/common/convert/decrypt.go`）。
  App 通过 Unix socket JSON-RPC `{"method":"getConfig","data":".../profiles/999999.yaml"}`
  让 CatCore 读取密文文件后自行解密加载。
- `DecryptConfig` 内部级联：`isYAMLConfig`（明文直通）→ `DecodeAESBase64`（AES 分支）→
  `tryDecodeBase64` → `DecodeObfuscatedBase64`（反转码表分支，本后端未使用）。
- 同类私有客户端（FastLink/白标，同为魔改 mihomo + 私有 DecryptConfig）在开源项目
  `tatanakots/FuckPrivateClient` 中有同构逆向：其 AESKey=`29fe4156850dd48a`（**不通用**，
  猫猫云 NetAPP 内核使用自己的常量，即上面提取的一对）。

### 旧备选方案（已被完整解密取代，保留备查）
在 key 未提取时曾用：登录拿 uuid（=password）+ `server/fetch` 拿节点名 +
name→(server,port) 映射表拼 YAML —— 现在直接解密官方订阅即可，节点永不过期、无需维护映射表。

---

## 六、⭐ 节点域名解析的关键（必须用猫猫云 DoH）

**节点 `server` 域名（`gtm-*.maomaogtm.com`）是私有域名**，只注册在猫猫云的阿里云 PrivateZone 实例中。**公网 DNS 解析不到/解析到错误 IP**（会得到被墙的美国 IP 如 154.23.160.4），导致直连全部超时。

**正确解析方式**（已验证）——使用阿里云专属 DoH：
```
DoH 端点: https://874441-ywvcq20ne9plstif.alidns.com/dns-query   (RFC 8484)
          （该域名解析到 223.5.5.5 / 223.6.6.6）
Host: 874441-ywvcq20ne9plstif.alidns.com
```
查询示例（RFC8484 GET）：`/dns-query?dns=<urlsafe base64 的 DNS 查询包>`

解析结果（**IP 动态轮换**）：
| 节点域名 | 真实入口 IP | 属地 |
|---|---|---|
| `gtm-sg-nnu4tneapp20g.maomaogtm.com`（主力 HK/各国） | 125.94.244.159 / 103.236.65.23 等 | 🇨🇳 广州电信（国内中转） |
| `gtm-sg-d6a4tnfxt21gzl.maomaogtm.com`（0.5x 直连） | 2.27.146.100 | 🇺🇸 洛杉矶 |
| `us.maomaogtm.com`（美国） | 2.27.146.5 | 🇺🇸 洛杉矶 |

> ⚠️ IP 会变化（DoH 返回多 A 轮换），**必须每次解析最新 IP**（见 `fetch_sub_api.py` 的 `resolve_maomao_domain`）。
> 另注：CatCore 内存中出现的 `maomaodns3.com` 也是猫猫云自建 DoH。

**落地到 Clash 配置的两种方式**（脚本已同时采用）：
1. `server:` 直接填解析出的真实 IP
2. DNS 配置 `nameserver`/`proxy-server-nameserver`/`nameserver-policy "+.maomaogtm.com"` 指向猫猫云 DoH

---

## 七、其他测试结论（避免重复劳动）

- ❌ `/api/v1/client/subscribe`（v1）任何 UA/flag 均返回空 —— 服务端已关闭
- ✅ **v100 解密后即官方标准配置**：任意 `flag=`/`client=`/`type=` 参数均返回同一密文，
  因此**无需任何额外参数**，base64→AES→base64 即得标准 Clash YAML
- ✅ 订阅密文对 Android 客户端（标准 mihomo 内核，无解密代码）与 Linux CatCore 返回**完全相同**
  （342,680 B / 257,008 B 尺寸一致）→ 加密完全在服务端 + 内核端，与客户端版本无关
- ✅ `server/fetch`、`user/getSubscribe`、`user/info` 等 `/api/v1/user/*` 接口**未被关闭**（需 JWT 直放 Authorization）
- ✅ 订阅域名 `dy.maomaoapi.org` 与面板 `api.brfcdu.cn` 共享同一后端

---

## 八、Android 客户端 2.3.6 逆向（maomao2.3.6.apk）

### 8.1 架构

| 组件 | 说明 |
|---|---|
| 主包 `com.mt` | Kotlin/Java 业务（`com.mt.maomao`，versionName `2.3.6`） |
| `com.github.kr328.clash.*` | **Kr328/ClashForAndroid** 魔改（服务/Profile/桥接层） |
| `libbridge.so` (22KB) | JNI 桥接（`com.github.kr328.clash.core.bridge.Bridge`） |
| `libclash.so` (47MB) | **标准 MetaCubeX mihomo**（Go 1.26.7，非 NetAPP fork） |
| `libmmkv.so` | 腾讯 MMKV 本地存储 |
| 资源 | assets 内置 `geoip.metadb`/`geosite.dat`/`ASN.mmdb`（GeoIP 库） |

> ⚠️ 关键差异：安卓端内核是**标准 mihomo**，其 `common/convert` 包**没有** `DecryptConfig`/`DecodeAESBase64`
> （pclntab 全量核对）；订阅解密实际**不发生在安卓端** —— 后端 v100 密文由服务端生成，
> 解密参数（key/iv）固定在 **NetAPP(CatCore)** 内核中（见第五节），安卓端仅负责把订阅
> **原样下载落盘**为 profile 交给标准内核加载（解密失败与否都不影响它运行，节点另有来源）。

### 8.2 字符串混淆 StringFog（全部破解 ✅）

- 所有敏感字符串经 `com.mt.StringFog` 混淆：`XOR(byte[], byte[])` 后按 UTF-8 解码（密钥循环异或）。
- 已写自动化脚本（`/tmp/maomao236/stringfog_decrypt.py`）批量还原 **776+ 条字符串**。
- 反编译符号常量：`Base64.padSymbol`=`'='`(0x3D)、`Utf8.REPLACEMENT_BYTE`=`'?'`(0x3F) 等。

### 8.3 订阅流程（与 Linux 版同后端，确认一致）

```
1) POST /api/v1/passport/auth/login（email+password）→ token + auth_data(JWT)
2) GET  /api/v1/user/getSubscribe  → SubBean{ token, uuid, subscribe_url, ... }
   （uuid 即节点 password；字段与 Linux 版 getSubscribe 返回完全一致）
3) 构造订阅 URL（URLKt）：
   handleApiSub(subscribe_url) → subscribe_url + "/api/v100" + "/client/subscribe?token=" + token
   关键：isMaomao() 时强制 path=/api/v100（StringFog 解密确认），绕过标准 /api/v1
4) commitSubEncryptedUrlToFile：下载 v100 → 加密内容 → 落盘为 profile → 交内核
   （函数名直译“提交加密 URL 到文件”；Android 端不自行解密）
```

### 8.4 静态发现（有价值线索）

- `InterceptorKt`：动态 baseUrl 拦截器 + UA；普通 API 走 `/api/v1`（有 `/api/v1`→路径替换逻辑）。
- `AESDecryptor`（Java，AES/CBC/PKCS5Padding）：**全 APK 无调用点**（dex 级确认死代码），
  为白标 SDK 通用遗留，非安卓端实际解密路径。
- `RetrofitHelper`：`Core.queryConfiguration(StringFog 长串)` 从**已加载配置**中按 key 提取
  API 域名（`FC2DA1LM7...` 等 base64 串即配置内查询键）→ 印证“API host 藏在配置内”的设计。
- `ProfileProcessor`：标准 V2Board `subscription-userinfo` 头解析，确认后端为 V2Board/Xboard 系。

### 8.5 端到端实证（2026-09-02）

用已知 token 直接请求 4 个 API host 的 v100 端点，全部返回 HTTP 200 + 342,680 B 密文；
按第五节解密链路成功还原 105 节点标准配置。**结论：安卓 2.3.6 与 Linux 6.0.0 共享同一后端、
同一加密订阅；第三方客户端接入只需实现“base64→AES→base64→YAML”即可，无需逆向任何 App。**
