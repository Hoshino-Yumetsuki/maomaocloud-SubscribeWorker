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
const UA = "Mozilla/5.0 (dart:io) SuperAccelerator";
const SNI = "osxapps.itunes.apple.com";

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

async function maomaoApi<T>(host: string, path: string, jwt: string): Promise<T> {
  const resp = await fetch(`${host}${path}`, {
    headers: { "User-Agent": UA, Authorization: jwt, Accept: "application/json" },
  });
  const data = (await resp.json()) as { data?: T };
  return (data?.data ?? data) as T;
}

function shuffledHosts(override?: string): string[] {
  const hosts = override && override.trim() ? [override.replace(/\/+$/, "")] : [...API_HOSTS];
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
    return jsonError(502, `上游获取失败: ${msg}`);
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

function handleHome(): Response {
  const html = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">
<title>maomaocloud sub</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{font-family:system-ui;background:#0f172a;color:#e2e8f0;max-width:720px;margin:40px auto;padding:0 20px}
code{background:#1e293b;padding:2px 6px;border-radius:4px}.box{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:16px 0}</style>
</head><body>
<h1>maomaocloud sub</h1>
<div class="box"><code>/sub?email=xx@xx.com&password=xxxx</code><br><code>/sub?token=&lt;auth_data&gt;</code><br>可选 <code>host</code></div>
</body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    try {
      if (request.method === "OPTIONS") return cors(new Response(null, { status: 204 }));
      if (url.pathname === "/" || url.pathname === "") return handleHome();
      if (url.pathname === "/sub" || url.pathname === "/clash") {
        return await handleSubscribe(url);
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
