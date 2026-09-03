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

// 拿官方订阅 token（32hex）：登录响应 data.token，或 getSubscribe 返回的 sub.token
async function fetchOfficialToken(host: string, email: string, password: string, token: string): Promise<string> {
  if (token && !/^[0-9a-f]{32}$/i.test(token.trim())) {
    // token 参数是 JWT(auth_data) 而非 32hex：先换订阅 token
    const sub = await maomaoApi<{ token?: string }>(host, "/api/v1/user/getSubscribe", token.trim());
    if (!sub?.token) throw new Error("getSubscribe 未返回订阅 token");
    return sub.token;
  }
  if (token) return token.trim(); // 32hex 订阅 token 直用
  // 登录模式：响应 data.token 即订阅 token
  const resp = await fetch(`${host}/api/v1/passport/auth/login`, {
    method: "POST",
    headers: {
      "User-Agent": UA,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({ email, password }).toString(),
  });
  const data = (await resp.json()) as { status?: string; message?: string; data?: { token?: string } };
  if (data?.status !== "success" || !data?.data?.token) {
    throw new Error(`猫猫云登录失败: ${data?.message ?? resp.status}`);
  }
  return data.data.token;
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
async function handleOfficialSub(url: URL): Promise<Response> {
  const email = url.searchParams.get("email") ?? "";
  const password = url.searchParams.get("password") ?? "";
  const token = url.searchParams.get("token") ?? "";
  const host = url.searchParams.get("host") ?? "";
  const wantIp = url.searchParams.get("ip") === "1";

  if (!token && (!email || !password)) {
    return jsonError(400, "请提供参数: ?email=&password= 或 ?token=<订阅token|auth_data>");
  }

  let lastErr: unknown;
  for (const h of shuffledHosts(host)) {
    try {
      const subToken = await fetchOfficialToken(h, email, password, token);
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
            "Content-Disposition": 'attachment; filename="maomaocloud-official.yaml"',
            "Cache-Control": "no-store",
            "Profile-Update-Interval": "24",
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

async function maomaoLogin(host: string, email: string, password: string): Promise<string> {
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
    data?: { auth_data?: string };
  };
  if (data?.status !== "success" || !data?.data?.auth_data) {
    throw new Error(`猫猫云登录失败: ${data?.message ?? resp.status}`);
  }
  return data.data.auth_data;
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
      const resp = await fetch(`${h}/api/v1/passport/auth/login`, {
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
        throw new Error(`登录失败: ${data?.message ?? resp.status}`);
      }
      const jwt = data.data.auth_data;
      const sub = await maomaoApi<Record<string, unknown>>(h, "/api/v1/user/getSubscribe", jwt);
      const pick = (k: string) => (sub && sub[k] !== undefined ? sub[k] : null);
      return cors(
        new Response(
          JSON.stringify(
            {
              email,
              token: data.data.token ?? null,
              auth_data: jwt,
              uuid: pick("uuid"),
              subscribe_url: pick("subscribe_url"),
              // 订阅状态诊断字段（套餐/到期/流量）
              plan_id: pick("plan_id"),
              plan_name: (sub?.plan as { name?: string } | undefined)?.name ?? null,
              expired_at: pick("expired_at"),
              is_plan_expired: pick("is_plan_expired"),
              transfer_used: pick("transfer_used"),
              transfer_enable: pick("transfer_enable"),
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
}

async function fetchUpstream(hosts: string[], email: string, password: string, token: string): Promise<Upstream> {
  let lastErr: unknown;
  for (const host of hosts) {
    try {
      let jwt = token;
      if (!jwt) jwt = await maomaoLogin(host, email, password);
      const sub = await maomaoApi<{ uuid?: string }>(host, "/api/v1/user/getSubscribe", jwt);
      const uuid = sub?.uuid ?? "";
      if (!uuid) throw new Error("getSubscribe 未返回 uuid");
      const servers = await maomaoApi<{ name?: string }[]>(host, "/api/v1/user/server/fetch", jwt);
      if (!Array.isArray(servers) || servers.length === 0) throw new Error("server/fetch 未返回节点");
      return { jwt, uuid, servers };
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
        "Content-Disposition": 'attachment; filename="maomaocloud.yaml"',
        "Cache-Control": "no-store",
        "Profile-Update-Interval": "24",
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
code{background:#1e293b;padding:2px 6px;border-radius:4px;word-break:break-all;font-size:14px}.box{border:1px solid #334155;border-radius:10px;padding:14px 18px;margin:12px 0}</style>
</head><body>
<h2>maomaocloud sub</h2>
<p style="color:#94a3b8">参数 email+password 或 token 二选一</p>
<div class="box" style="border-color:#b45309;background:#451a03"><b>⚠️ 密码含特殊字符必看</b> — 密码中的 <code>#</code> <code>!</code> <code>@</code> 等必须先做 URL 编码，否则会被截断导致 502。<br>
例：密码 <code>Q78kg123!@#</code> 应写成 <code>Q78kg123%21%40%23</code><br>
也可先访问 <code>/token</code>（用编码后的密码）拿到 <code>token</code>，再改用 <code>?token=&lt;token&gt;</code>（token 无特殊字符，最省心）</div>
<div class="box"><b>/full</b> — 解密官方 v100 订阅，官方完整配置（105 节点）<br>
<code>https://maomaocloud-subscribeworker.robotxhub.ai/full?email=xx%40xx.com&password=<b>编码后密码</b></code><br>
<code>https://maomaocloud-subscribeworker.robotxhub.ai/full?token=&lt;token&gt;</code></div>
<div class="box"><b>/lite</b> — 按逆向节点映射精简拼装<br>
<code>https://maomaocloud-subscribeworker.robotxhub.ai/lite?email=xx%40xx.com&password=<b>编码后密码</b></code><br>
<code>https://maomaocloud-subscribeworker.robotxhub.ai/lite?token=&lt;auth_data&gt;</code></div>
<div class="box"><b>/token</b> — 账号密码换 token / auth_data / uuid / 套餐状态（JSON）<br>
<code>https://maomaocloud-subscribeworker.robotxhub.ai/token?email=xx%40xx.com&password=<b>编码后密码</b></code></div>
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
