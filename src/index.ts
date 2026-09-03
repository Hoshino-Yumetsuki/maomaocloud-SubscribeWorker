const NODE_MAP: Record<string, [string, number]> = {
  "1.0x 🇭🇰 香港 HK - 9": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60008],
  "1.0x 🇭🇰 香港 HK - 10": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60009],
  "1.0x 🇯🇵 日本 JP - 9": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60152],
  "1.0x 🇯🇵 日本 JP - 10": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60153],
  "1.0x 🇸🇬 新加坡 SG - 3": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60160],
  "1.0x 🇸🇬 新加坡 SG - 4": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60161],
  "0.5x 🇸🇬 新加坡直连 SG - 17": ["gtm-sg-d6a4tnfxt21gzl.maomaogtm.com", 50022],
  "0.5x 🇸🇬 新加坡直连 SG - 18": ["gtm-sg-d6a4tnfxt21gzl.maomaogtm.com", 50023],
  "0.5x 🇺🇸 美国直连 US - 12": ["gtm-sg-d6a4tnfxt21gzl.maomaogtm.com", 50007],
  "0.5x 🇺🇸 美国直连 US - 13": ["gtm-sg-d6a4tnfxt21gzl.maomaogtm.com", 50008],
  "1.0x 🇭🇰 香港 HK - 家宽": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 59999],
  "1.0x 🇮🇩 印度尼西亚 ID - 1": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 50011],
  "1.0x 🇰🇷 韩国 KR - 1": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60100],
  "1.0x 🇫🇷 法国 FR - 1": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60101],
  "1.0x 🇩🇪 德国 DE - 1": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60102],
  "1.0x 🇬🇧 英国 UK - 1": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60103],
  "1.0x 🇦🇪 迪拜 AE - 1": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60104],
  "1.0x 🇧🇷 巴西 BR - 1": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60105],
  "1.0x 🇬🇷 希腊 GR - 1": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60108],
  "1.0x 🇮🇳 印度 IN - 1": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60109],
  "1.0x 🇧🇪 比利时 BE - 1": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60114],
  "1.0x 🇦🇷 阿根廷 AR - 1": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60115],
  "1.0x 🇲🇽 墨西哥 MX - 1": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60116],
  "1.0x 🇮🇪 爱尔兰 IE - 1": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60117],
  "1.0x 🇵🇭 菲律宾 PH - 1": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60118],
  "1.0x 🇹🇷 土耳其 TR - 1": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60122],
  "1.0x 🇦🇺 澳大利亚 AU - 1": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60123],
  "1.0x 🇲🇾 马来西亚 MY - 1": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60124],
  "1.0x 🇵🇰 巴基斯坦 PK - 1": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60125],
  "1.0x 🇨🇳 台湾 TW - 1": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60126],
  "1.0x 🇨🇳 台湾 TW - 2": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60127],
  "1.0x 🇨🇳 台湾 TW - 3": ["gtm-sg-nnu4tneapp20g.maomaogtm.com", 60128],
  "0.5x 🇺🇸 美国直连 US - 11": ["gtm-sg-d6a4tnfxt21gzl.maomaogtm.com", 50006],
  "0.5x 🇺🇸 美国直连 US - 14": ["gtm-sg-d6a4tnfxt21gzl.maomaogtm.com", 50009],
  "0.5x 🇺🇸 美国直连 US - 15": ["gtm-sg-d6a4tnfxt21gzl.maomaogtm.com", 50010],
  "1.0x 🇺🇸 美国 US - 7": ["us.maomaogtm.com", 60135],
  "1.0x 🇺🇸 美国 US - 8": ["us.maomaogtm.com", 60136],
  "1.0x 🇺🇸 美国 US - 9": ["us.maomaogtm.com", 60137],
  "1.0x 🇺🇸 美国 US - 10": ["us.maomaogtm.com", 60138],
};

const API_HOSTS = [
  "https://api.brfcdu.cn",
  "https://mmyapi.lnnrhtp.com",
  "https://app.maomao234.com",
  "https://dy.maomaoapi.org",
];
const MAOMAO_DOH_HOST = "874441-ywvcq20ne9plstif.alidns.com";
const MAOMAO_DOH_URL = `https://${MAOMAO_DOH_HOST}/dns-query`;
const UA = "Mozilla/5.0 (dart:io) SuperAccelerator";
const SNI = "osxapps.itunes.apple.com";

// ⭐ 逆向提取的 v100 订阅解密常量（见 REVERSE_ENGINEERING.md 第五节）
// 链路: HTTP body(base64) -> AES-128-CBC 解密 -> base64 -> 官方标准 Clash YAML
const AES_KEY = "4422a60e08c97f30";
const AES_IV = "8c97f304422a60e0";

const ipCache = new Map<string, string>();

interface NodeDef {
  name: string;
  server: string;
  port: number;
  password: string;
}

function concatBytes(...arrays: Uint8Array[]): Uint8Array {
  const total = arrays.reduce((n, a) => n + a.length, 0);
  const out = new Uint8Array(total);
  let p = 0;
  for (const a of arrays) {
    out.set(a, p);
    p += a.length;
  }
  return out;
}

function base64UrlEncode(data: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < data.length; i++) bin += String.fromCharCode(data[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function readU16(buf: Uint8Array, off: number): number {
  return (buf[off] << 8) | buf[off + 1];
}

function buildDnsQuery(domain: string): Uint8Array {
  const labels = domain.split(".").map((p) => {
    const label = new Uint8Array(p.length + 1);
    label[0] = p.length;
    for (let i = 0; i < p.length; i++) label[i + 1] = p.charCodeAt(i);
    return label;
  });
  const qname = concatBytes(...labels, new Uint8Array([0]));
  const hdr = new Uint8Array([0x22, 0x22, 0x01, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
  const qtype = new Uint8Array([0x00, 0x01, 0x00, 0x01]);
  return concatBytes(hdr, qname, qtype);
}

function parseDnsResponse(buf: Uint8Array): string | null {
  if (buf.length < 12) return null;
  const ancount = readU16(buf, 6);
  if (ancount === 0) return null;
  let off = 12;
  while (off < buf.length && buf[off] !== 0) off += buf[off] + 1;
  off += 5;
  for (let i = 0; i < ancount && off + 10 <= buf.length; i++) {
    if ((buf[off] & 0xc0) === 0xc0) off += 2;
    else {
      while (off < buf.length && buf[off] !== 0) off += buf[off] + 1;
      off += 1;
    }
    if (off + 10 > buf.length) break;
    const rtype = readU16(buf, off);
    const rdlen = readU16(buf, off + 8);
    off += 10;
    if (rtype === 1 && rdlen === 4 && off + 4 <= buf.length) {
      return `${buf[off]}.${buf[off + 1]}.${buf[off + 2]}.${buf[off + 3]}`;
    }
    off += rdlen;
  }
  return null;
}

async function resolveMaomaoDomain(domain: string): Promise<string | null> {
  if (ipCache.has(domain)) return ipCache.get(domain) ?? null;
  try {
    const q = buildDnsQuery(domain);
    const resp = await fetch(`https://${MAOMAO_DOH_HOST}/dns-query?dns=${base64UrlEncode(q)}`, {
      headers: { Accept: "application/dns-message", "User-Agent": UA },
    });
    const buf = new Uint8Array(await resp.arrayBuffer());
    const ip = parseDnsResponse(buf);
    if (ip) ipCache.set(domain, ip);
    return ip;
  } catch {
    return null;
  }
}

/* ---------------- 官方 v100 订阅解密（模式 B /official） ---------------- */

function b64ToBytes(s: string): Uint8Array {
  const bin = atob(s);
  const u = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
  return u;
}

async function aesCbcDecrypt(keyStr: string, ivStr: string, data: Uint8Array): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(keyStr), { name: "AES-CBC" }, false, [
    "decrypt",
  ]);
  const out = await crypto.subtle.decrypt({ name: "AES-CBC", iv: enc.encode(ivStr) }, key, data);
  return new Uint8Array(out);
}

async function decryptV100(body: string): Promise<string> {
  // ① HTTP body 为 base64（可能带换行）
  const layer1 = b64ToBytes(body.replace(/\s+/g, ""));
  // ② AES-128-CBC 解密（PKCS#7 由 WebCrypto 处理）→ 内层又是一段 base64 文本
  const layer2 = await aesCbcDecrypt(AES_KEY, AES_IV, layer1);
  const innerB64 = new TextDecoder().decode(layer2).trim();
  // ③ 再解一层 base64 → 最终明文 Clash YAML
  const finalBytes = b64ToBytes(innerB64.replace(/\s+/g, ""));
  return new TextDecoder().decode(finalBytes);
}

// —— 订阅信息头（subscription-userinfo / profile-title）：FlClash / mihomo 据此显示流量、到期、机场名 ——
interface UserMeta {
  u?: number; // 已用上行 bytes
  d?: number; // 已用下行 bytes
  total?: number; // 总流量 bytes
  expire?: number; // 到期 unix 秒
  plan?: string; // 套餐/机场名
}
// 默认机场名（FlClash 卡片显示名，可用 ?title= 参数覆盖为自定义名称）
const DEFAULT_TITLE = "猫猫云";

function toNum(v: unknown): number | undefined {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v !== "") {
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

// 从 getSubscribe 返回里兜底提取（不同后端字段名可能不同：u/d/transfer_enable 等）
function metaFromSub(sub: Record<string, unknown> | undefined): UserMeta | undefined {
  if (!sub) return undefined;
  const plan = (sub.plan && typeof sub.plan === "object" ? sub.plan : {}) as Record<string, unknown>;
  const m: UserMeta = {
    u: toNum(sub.u ?? sub.upload),
    d: toNum(sub.d ?? sub.download),
    total: toNum(sub.transfer_enable ?? sub.total),
    expire: toNum(sub.expired_at),
    plan:
      typeof plan.name === "string"
        ? plan.name
        : typeof sub.plan_name === "string"
          ? sub.plan_name
          : undefined,
  };
  if (m.u === undefined && m.d === undefined && m.total === undefined && m.expire === undefined && m.plan === undefined) {
    console.warn("getSubscribe 无可用用户信息字段", Object.keys(sub));
    return undefined;
  }
  return m;
}

// 拼标准 subscription-userinfo 头：upload=..; download=..; total=..; expire=..
function userinfoHeader(m: UserMeta | undefined): string | null {
  if (!m) return null;
  const parts: string[] = [];
  if (m.u !== undefined) parts.push(`upload=${m.u}`);
  if (m.d !== undefined) parts.push(`download=${m.d}`);
  if (m.total !== undefined) parts.push(`total=${m.total}`);
  if (m.expire !== undefined) parts.push(`expire=${m.expire}`);
  return parts.length ? parts.join("; ") : null;
}

// 登录一次拿 auth_data + 订阅 token
async function maomaoLoginInfo(host: string, email: string, password: string): Promise<{ auth: string; token: string }> {
  const resp = await fetch(`${host}/api/v1/passport/auth/login`, {
    method: "POST",
    headers: {
      "User-Agent": UA,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({ email, password }).toString(),
  });
  const data = (await resp.json()) as {
    status?: string;
    message?: string;
    data?: { auth_data?: string; token?: string };
  };
  if (data?.status !== "success" || !data?.data?.auth_data) {
    throw new Error(`猫猫云登录失败: ${data?.message ?? resp.status}`);
  }
  return { auth: data.data.auth_data, token: data.data.token ?? "" };
}

// 用登录态实时取用户信息（失败静默——订阅本体不依赖它）
async function fetchUserMeta(host: string, auth: string): Promise<UserMeta | undefined> {
  try {
    const sub = await maomaoApi<Record<string, unknown>>(host, "/api/v1/user/getSubscribe", auth);
    return metaFromSub(sub);
  } catch {
    return undefined;
  }
}

// 订阅响应附加头：机场名优先 title 参数，其次默认
// 注意：FlClash 实际用 content-disposition 的 filename*（UTF-8）作为配置标题；profile-title 仅其它客户端参考
function subInfoHeaders(meta: UserMeta | undefined, titleParam: string): Record<string, string> {
  const title = titleParam || DEFAULT_TITLE;
  const h: Record<string, string> = {
    "profile-title": title,
    "Content-Disposition": `attachment; filename="maomaocloud.yaml"; filename*=UTF-8''${encodeURIComponent(title)}`,
  };
  const ui = userinfoHeader(meta);
  if (ui) h["subscription-userinfo"] = ui;
  return h;
}

// 可选: 把 flow-map 节点里的 maomaogtm 域名替换为 DoH 解析出的真实 IP
async function replaceMaomaoDomainsWithIp(yaml: string): Promise<string> {
  const doms = new Set<string>();
  for (const m of yaml.matchAll(/server:\s*([a-z0-9.-]+\.maomaogtm\.com)/gi)) doms.add(m[1]);
  for (const d of doms) {
    const ip = await resolveMaomaoDomain(d);
    if (ip) yaml = yaml.replace(new RegExp(`(server:\\s*)${d.replace(/\./g, "\\.")}(\\s*[,}])`, "g"), `$1${ip}$2`);
  }
  return yaml;
}

// 官方直解模式：拉 v100 加密订阅 → AES 解密 → 返回官方标准配置（105 节点 + 官方分流）
// 附带标准订阅头 subscription-userinfo / profile-title（FlClash 据此显示流量、到期、机场名）
async function handleOfficialSub(url: URL): Promise<Response> {
  const email = url.searchParams.get("email") ?? "";
  const password = url.searchParams.get("password") ?? "";
  const token = url.searchParams.get("token") ?? "";
  const authParam = url.searchParams.get("auth") ?? "";
  const host = url.searchParams.get("host") ?? "";
  const wantIp = url.searchParams.get("ip") === "1";
  const titleParam = url.searchParams.get("title") ?? "";

  if (!token && !authParam && (!email || !password)) {
    return jsonError(400, "请提供参数: ?email=&password= 或 ?token=<订阅token|auth_data>");
  }

  let lastErr: unknown;
  for (const h of shuffledHosts(host)) {
    try {
      // 解析登录态 auth 与订阅 token：32hex 直用；auth_data 换订阅 token；否则账号密码登录
      let auth = authParam;
      if (token && !/^[0-9a-f]{32}$/i.test(token.trim())) auth = token.trim();
      let subToken = token && /^[0-9a-f]{32}$/i.test(token.trim()) ? token.trim() : "";
      if (!subToken && auth) {
        const s = await maomaoApi<{ token?: string }>(h, "/api/v1/user/getSubscribe", auth);
        if (!s?.token) throw new Error("getSubscribe 未返回订阅 token");
        subToken = s.token;
      }
      if (!subToken) {
        const li = await maomaoLoginInfo(h, email, password);
        auth = li.auth;
        subToken = li.token;
      }
      if (!subToken) throw new Error("无法取得订阅 token");

      // 流量/到期/套餐信息：能拿到登录态就实时查一次（失败静默，不影响订阅本体）
      const meta = auth ? await fetchUserMeta(h, auth) : undefined;

      const resp = await fetch(`${h}/api/v100/client/subscribe?token=${encodeURIComponent(subToken)}`, {
        headers: { "User-Agent": UA, Accept: "*/*" },
      });
      if (!resp.ok) throw new Error(`v100 HTTP ${resp.status}`);
      const body = await resp.text();
      if (!body) throw new Error("v100 返回空");
      let yaml = await decryptV100(body);
      if (!/proxies:/.test(yaml)) throw new Error("解密结果非合法配置");
      if (wantIp) yaml = await replaceMaomaoDomainsWithIp(yaml);
      return cors(
        new Response(yaml, {
          status: 200,
          headers: {
            "Content-Type": "text/yaml; charset=utf-8",
            "Cache-Control": "no-store",
            "Profile-Update-Interval": "24",
            ...subInfoHeaders(meta, titleParam),
          },
        })
      );
    } catch (err) {
      console.warn("official host failed", { host: h, message: err instanceof Error ? err.message : String(err) });
      lastErr = err;
    }
  }
  return jsonError(
    502,
    hint(`官方订阅获取失败: ${lastErr instanceof Error ? lastErr.message : String(lastErr)}`)
  );
}

// 只取 auth_data 的便捷封装（/lite 上游与旧调用用）
async function maomaoLogin(host: string, email: string, password: string): Promise<string> {
  return (await maomaoLoginInfo(host, email, password)).auth;
}

// /token：账号密码 → token / auth_data / uuid（供 /full?token=、/lite 及手工构造节点用）
async function handleToken(url: URL): Promise<Response> {
  const email = url.searchParams.get("email") ?? "";
  const password = url.searchParams.get("password") ?? "";
  const host = url.searchParams.get("host") ?? "";
  if (!email || !password) {
    return jsonError(400, "请提供参数: ?email=&password=");
  }
  let lastErr: unknown;
  for (const h of shuffledHosts(host)) {
    try {
      const li = await maomaoLoginInfo(h, email, password);
      const jwt = li.auth;
      const sub = await maomaoApi<Record<string, unknown>>(h, "/api/v1/user/getSubscribe", jwt);
      const pick = (k: string) => (sub && sub[k] !== undefined ? sub[k] : null);
      return cors(
        new Response(
          JSON.stringify(
            {
              email,
              token: li.token,
              auth_data: jwt,
              uuid: pick("uuid"),
              subscribe_url: pick("subscribe_url"),
              // 订阅状态诊断字段（套餐/到期/流量）
              plan_id: pick("plan_id"),
              plan_name: (sub?.plan as { name?: string } | undefined)?.name ?? null,
              expired_at: pick("expired_at"),
              is_plan_expired: pick("is_plan_expired"),
              transfer_enable: pick("transfer_enable"),
              upload: pick("u") ?? pick("upload"),
              download: pick("d") ?? pick("download"),
            },
            null,
            2
          ),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Cache-Control": "no-store",
            },
          }
        )
      );
    } catch (err) {
      console.warn("token host failed", { host: h, message: err instanceof Error ? err.message : String(err) });
      lastErr = err;
    }
  }
  return jsonError(502, hint(`获取失败: ${lastErr instanceof Error ? lastErr.message : String(lastErr)}`));
}

async function maomaoApi<T>(host: string, path: string, jwt: string): Promise<T> {
  const resp = await fetch(`${host}${path}`, {
    headers: { "User-Agent": UA, Authorization: jwt, Accept: "application/json" },
  });
  const data = (await resp.json()) as { data?: T };
  return (data?.data ?? data) as T;
}

function shuffledHosts(override?: string): string[] {
  let hosts: string[];
  if (override && override.trim()) {
    let o = override.trim().replace(/\/+$/, "");
    if (!/^https?:\/\//i.test(o)) o = `https://${o}`;
    hosts = [o];
  } else {
    hosts = [...API_HOSTS];
  }
  for (let i = hosts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = hosts[i];
    hosts[i] = hosts[j];
    hosts[j] = t;
  }
  return hosts;
}

interface Upstream {
  jwt: string;
  uuid: string;
  servers: { name?: string }[];
  sub?: Record<string, unknown>;
}

async function fetchUpstream(hosts: string[], email: string, password: string, token: string): Promise<Upstream> {
  let lastErr: unknown;
  for (const host of hosts) {
    try {
      let jwt = token;
      if (!jwt) jwt = await maomaoLogin(host, email, password);
      const sub = await maomaoApi<Record<string, unknown>>(host, "/api/v1/user/getSubscribe", jwt);
      const uuid = typeof sub?.uuid === "string" ? sub.uuid : "";
      if (!uuid) throw new Error("getSubscribe 未返回 uuid");
      const servers = await maomaoApi<{ name?: string }[]>(host, "/api/v1/user/server/fetch", jwt);
      if (!Array.isArray(servers) || servers.length === 0) throw new Error("server/fetch 未返回节点");
      return { jwt, uuid, servers, sub };
    } catch (err) {
      console.warn("host failed", { host, message: err instanceof Error ? err.message : String(err) });
      lastErr = err;
    }
  }
  throw lastErr ?? new Error("所有 API 域名均不可用");
}

async function handleSubscribe(url: URL): Promise<Response> {
  const email = url.searchParams.get("email") ?? "";
  const password = url.searchParams.get("password") ?? "";
  const token = url.searchParams.get("token") ?? "";
  const host = url.searchParams.get("host") ?? "";
  const titleParam = url.searchParams.get("title") ?? "";

  if (!token && (!email || !password)) {
    return jsonError(400, "请提供参数: ?email=&password= 或 ?token=<auth_data>");
  }

  let upstream: Upstream;
  try {
    upstream = await fetchUpstream(shuffledHosts(host), email, password, token);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("upstream error", { message: msg });
    return jsonError(502, hint(`上游获取失败: ${msg}`));
  }

  const { uuid, servers } = upstream;
  const nodes: NodeDef[] = [];
  const seen = new Set<string>();
  for (const s of servers) {
    const nm = s?.name;
    if (!nm || seen.has(nm)) continue;
    seen.add(nm);
    const entry = NODE_MAP[nm];
    if (!entry) continue;
    const [domain, port] = entry;
    const ip = await resolveMaomaoDomain(domain);
    nodes.push({ name: nm, server: ip ?? domain, port, password: uuid });
  }

  if (nodes.length === 0) {
    return jsonError(502, "未能生成任何节点");
  }

  const yaml = buildYaml(nodes, MAOMAO_DOH_HOST);
  return cors(
    new Response(yaml, {
      status: 200,
      headers: {
        "Content-Type": "text/yaml; charset=utf-8",
        "Cache-Control": "no-store",
        "Profile-Update-Interval": "24",
        ...subInfoHeaders(metaFromSub(upstream.sub), titleParam),
      },
    })
  );
}

function buildYaml(nodes: NodeDef[], dohHost: string): string {
  const esc = (s: string) => s.replace(/"/g, '\\"');
  const proxyLines = nodes.map(
    (n) =>
      `  - name: "${esc(n.name)}"\n` +
      `    type: anytls\n` +
      `    server: ${n.server}\n` +
      `    port: ${n.port}\n` +
      `    password: "${n.password}"\n` +
      `    udp: true\n` +
      `    sni: ${SNI}\n` +
      `    skip-cert-verify: true\n` +
      `    client-fingerprint: chrome\n` +
      `    alpn:\n` +
      `      - "h2"\n` +
      `      - "http/1.1"`
  );
  const namesBlock = nodes.map((n) => `      - "${esc(n.name)}"`).join("\n");
  const dohUrl = `https://${dohHost}/dns-query`;

  return `# maomaocloud ${nodes.length} nodes
mixed-port: 7890
allow-lan: false
mode: rule
log-level: info
ipv6: true
dns:
  enable: true
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  default-nameserver:
    - 223.5.5.5
  nameserver:
    - https://doh.pub/dns-query
    - https://dns.alidns.com/dns-query
  proxy-server-nameserver:
    - ${dohUrl}
  nameserver-policy:
    "+.maomaogtm.com": ${dohUrl}
  fallback:
    - https://dns.google/dns-query

proxies:
${proxyLines.join("\n")}

proxy-groups:
  - name: 🚀 节点选择
    type: select
    proxies:
      - ♻️ 自动选择
      - DIRECT
${namesBlock}
  - name: ♻️ 自动选择
    type: url-test
    url: http://cp.cloudflare.com/generate_204
    interval: 300
    tolerance: 50
    proxies:
${namesBlock}
  - name: 🎯 故障转移
    type: fallback
    url: http://cp.cloudflare.com/generate_204
    interval: 300
    proxies:
${namesBlock}
  - name: 🐟 漏网之鱼
    type: select
    proxies:
      - 🚀 节点选择
      - DIRECT

rules:
  - GEOIP,CN,DIRECT
  - MATCH,🐟 漏网之鱼
`;
}

function cors(res: Response): Response {
  const h = new Headers(res.headers);
  h.set("Access-Control-Allow-Origin", "*");
  h.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  h.set("Access-Control-Allow-Headers", "*");
  return new Response(res.body, { status: res.status, headers: h });
}

function jsonError(status: number, message: string): Response {
  return cors(
    new Response(JSON.stringify({ error: message }), {
      status,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    })
  );
}

// 把常见失败转成可操作的提示（密码特殊字符未编码 / 订阅未激活）
function hint(msg: string): string {
  if (/登录失败|邮箱或密码错误|login fail/i.test(msg)) {
    return `${msg}。若密码含 # ! @ 等特殊字符，请先做 URL 编码（#→%23、!→%21、@→%40，如 ?password=p%21%40%23）；` +
      `或先访问 /token?email=..&password=<编码后密码> 取得 token，再改用 ?token=<token> 订阅`;
  }
  if (/\b403\b/.test(msg)) {
    return `${msg}。订阅 token 无效或订阅未激活：请先在官方 App 登录一次以激活订阅，并确认账号存在有效套餐且未过期`;
  }
  return msg;
}

function handleHome(): Response {
  const html = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">
<title>maomaocloud sub</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{font-family:system-ui;background:#0f172a;color:#e2e8f0;max-width:820px;margin:40px auto;padding:0 20px}
code{background:#1e293b;padding:2px 6px;border-radius:4px;word-break:break-all;font-size:13px}.box{border:1px solid #334155;border-radius:10px;padding:14px 18px;margin:12px 0}
label{display:block;margin-top:10px;color:#94a3b8;font-size:13px}
input{background:#0b1220;border:1px solid #334155;color:#e2e8f0;padding:9px 12px;border-radius:6px;width:100%;box-sizing:border-box;margin-top:4px;font-size:14px}
input:focus{outline:none;border-color:#2563eb}
button{background:#2563eb;color:#fff;border:none;padding:10px 16px;border-radius:6px;cursor:pointer;font-size:14px;margin-top:12px}
button:hover{background:#1d4ed8}button:disabled{opacity:.6;cursor:default}
button.cp{margin-top:0;padding:4px 10px;font-size:12px;background:#334155;margin-left:6px;vertical-align:middle}
.ok{color:#4ade80}.err{color:#f87171}.dim{color:#94a3b8;font-size:13px}</style>
</head><body>
<h2>maomaocloud sub</h2>
<p style="color:#94a3b8">输入猫猫云账号密码，一键生成可直接填入 FlClash 的订阅链接（token 格式，密码里的特殊字符不用管）</p>

<div class="box" style="border-color:#16a34a">
<form onsubmit="gen();return false">
  <label for="em">邮箱</label><input id="em" type="email" placeholder="you@example.com" autocomplete="username">
  <label for="pw">密码</label><input id="pw" type="password" placeholder="猫猫云账号密码" autocomplete="current-password">
  <button id="btn" type="submit">生成订阅链接</button>
</form>
<div id="out"></div>
</div>

<div class="box" style="border-color:#b45309;background:#451a03"><b>⚠️ 说明</b> — 密码里的 <code>#</code> <code>!</code> <code>@</code> 等由网页自动编码，不用自己处理。<br>带账号密码的完整链接每次更新都会实时查流量/到期/机场名，FlClash 卡片上直接显示；纯 token 链接订阅照样能用但不显示流量（且不含密码，适合转发）。套餐过期后订阅会返回 403，需先续费。</div>

<div class="box"><b>手动端点（进阶）</b><span class="dim"> · 参数 email+password 或 token 二选一</span><br>
<code>…/full?email=xx%40xx.com&amp;password=编码后密码</code> — 官方完整配置<br>
<code>…/lite?email=xx%40xx.com&amp;password=编码后密码</code> — 精简节点<br>
<code>…/token?email=xx%40xx.com&amp;password=编码后密码</code> — 只换 token（JSON）<br>
<span class="dim">支持 host= 指定 API 域名；/full 另有 ip=1 把节点域名换成实时解析 IP</span></div>

<script>
function gen(){
  var em=document.getElementById('em').value.trim();
  var pw=document.getElementById('pw').value;
  var out=document.getElementById('out');
  var btn=document.getElementById('btn');
  if(!em||!pw){out.innerHTML='<div class="box" style="border-color:#dc2626"><b class="err">请输入邮箱和密码</b></div>';return;}
  btn.disabled=true;btn.textContent='验证中…';
  fetch('/token?email='+encodeURIComponent(em)+'&password='+encodeURIComponent(pw))
    .then(function(r){return r.json().then(function(j){return {ok:r.ok,j:j};});})
    .then(function(x){
      var j=x.j;
      if(!x.ok||!j.token){
        out.innerHTML='<div class="box" style="border-color:#dc2626"><b class="err">生成失败</b><br><code>'+esc(j.error||('HTTP '+x.ok))+'</code></div>';
        return;
      }
      var base=location.origin;
      var qe=encodeURIComponent(em), qp=encodeURIComponent(pw);
      var fullAuth=base+'/full?email='+qe+'&password='+qp;
      var fullTok=base+'/full?token='+j.token;
      var liteAuth=base+'/lite?email='+qe+'&password='+qp;
      var s='<div class="box" style="border-color:#22c55e"><b class="ok">✅ 验证通过</b> — 复制链接粘贴到 FlClash（订阅类型选 Clash）</div>';
      if(j.plan_name){
        var expd='';if(j.expired_at){expd=new Date(j.expired_at*1000).toLocaleString();}
        var over=!!(j.expired_at&&j.expired_at*1000<Date.now());
        s+='<div class="box">套餐：'+esc(j.plan_name)+' ｜ 到期：'+esc(expd)+(over?' <b class="err">（已过期，订阅会 403，请先续费）</b>':' <span class="ok">（有效）</span>')+'</div>';
      }
      s+='<div class="box"><b>/full · 官方完整（推荐，FlClash 显示流量/到期/机场名）</b><br><code id="u1">'+esc(fullAuth)+'</code><button class="cp" type="button" onclick="cp(1,this)">复制</button></div>';
      s+='<div class="box"><b>/full · 纯 token 精简（无流量显示，可放心转发）</b><br><code id="u2">'+esc(fullTok)+'</code><button class="cp" type="button" onclick="cp(2,this)">复制</button></div>';
      s+='<div class="box"><b>/lite · 精简节点</b><br><code id="u3">'+esc(liteAuth)+'</code><button class="cp" type="button" onclick="cp(3,this)">复制</button></div>';
      out.innerHTML=s;
    })
    .catch(function(e){out.innerHTML='<div class="box" style="border-color:#dc2626"><b class="err">网络错误</b><br>'+esc(String(e))+'</div>';})
    .then(function(){btn.disabled=false;btn.textContent='生成订阅链接';});
}
function cp(n,b){
  var t=document.getElementById('u'+n).textContent;
  function done(){b.textContent='已复制';setTimeout(function(){b.textContent='复制';},1600);}
  function fallback(){var ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');}catch(e){}document.body.removeChild(ta);done();}
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,fallback);}else{fallback();}
}
function esc(s){var d=document.createElement('div');d.textContent=String(s==null?'':s);return d.innerHTML;}
</script>
</body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    try {
      if (request.method === "OPTIONS") return cors(new Response(null, { status: 204 }));
      if (url.pathname === "/" || url.pathname === "") return handleHome();
      // /full — 官方全量(推荐): 解密 v100 官方订阅
      if (url.pathname === "/full" || url.pathname === "/official" || url.pathname === "/v100") {
        return await handleOfficialSub(url);
      }
      // /lite — 精简手动(NODE_MAP)
      if (url.pathname === "/lite" || url.pathname === "/sub" || url.pathname === "/clash") {
        return await handleSubscribe(url);
      }
      if (url.pathname === "/token") {
        return await handleToken(url);
      }
      return jsonError(404, "Not Found");
    } catch (err) {
      console.error("worker error", {
        message: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined,
      });
      return jsonError(500, `internal_error: ${err instanceof Error ? err.message : String(err)}`);
    }
  },
};
