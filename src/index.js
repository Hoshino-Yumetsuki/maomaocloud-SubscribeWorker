/**
 * MaoMaoCloud Subscribe Worker
 * 
 * 用于解析猫猫云(MaoMaoCloud / V2Board / Xboard 架构)客户端 API，
 * 绕过官方专用 App（Cat 客户端），输出标准 Clash / Flclash / Mihomo 订阅配置及通用节点列表。
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 跨域预检与处理
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "*",
        },
      });
    }

    // 路由分发
    if (url.pathname === "/" || url.pathname === "") {
      return handleHome(request, url);
    }

    if (url.pathname === "/sub" || url.pathname === "/clash" || url.pathname === "/api/v1/client/subscribe") {
      return handleSubscribe(request, url, env);
    }

    if (url.pathname === "/login") {
      return handleLoginProxy(request, env);
    }

    return new Response("404 Not Found", { status: 404 });
  },
};

/**
 * 首页：提供简易 Web UI 配置与说明
 */
function handleHome(request, url) {
  const workerOrigin = url.origin;
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>猫猫云订阅转换器 - MaoMaoCloud Subscribe Worker</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #6366f1;
      --primary-hover: #4f46e5;
      --bg: #0f172a;
      --card-bg: #1e293b;
      --border: #334155;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --code-bg: #0b1120;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 20px;
    }
    .container {
      max-width: 760px;
      width: 100%;
    }
    .header {
      text-align: center;
      margin-bottom: 32px;
    }
    .header h1 {
      font-size: 28px;
      font-weight: 700;
      background: linear-gradient(135deg, #a5b4fc 0%, #6366f1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
    }
    .header p {
      color: var(--text-muted);
      font-size: 15px;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    }
    .card h2 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .form-group {
      margin-bottom: 16px;
    }
    label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 6px;
      color: #cbd5e1;
    }
    input, select {
      width: 100%;
      padding: 10px 14px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: var(--code-bg);
      color: var(--text);
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }
    input:focus, select:focus {
      border-color: var(--primary);
    }
    .input-hint {
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 4px;
    }
    .btn {
      width: 100%;
      background: var(--primary);
      color: #fff;
      border: none;
      padding: 12px;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      margin-top: 8px;
    }
    .btn:hover {
      background: var(--primary-hover);
    }
    .result-box {
      margin-top: 20px;
      display: none;
    }
    .result-box.active {
      display: block;
    }
    .sub-url-container {
      position: relative;
      margin-top: 8px;
    }
    .sub-url-input {
      font-family: monospace;
      font-size: 13px;
      padding-right: 80px;
      background: var(--code-bg);
    }
    .btn-copy {
      position: absolute;
      right: 6px;
      top: 6px;
      bottom: 6px;
      background: var(--primary);
      color: white;
      border: none;
      border-radius: 6px;
      padding: 0 12px;
      font-size: 13px;
      cursor: pointer;
    }
    .info-list {
      list-style: none;
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;
    }
    .info-list li {
      margin-bottom: 8px;
      padding-left: 20px;
      position: relative;
    }
    .info-list li::before {
      content: "•";
      color: var(--primary);
      position: absolute;
      left: 6px;
      font-weight: bold;
    }
    code {
      background: var(--code-bg);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 13px;
      color: #e2e8f0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🐱 猫猫云订阅转换与解析器</h1>
      <p>绕过专用客户端，直接生成标准 Clash / Flclash / Mihomo 订阅链接</p>
    </div>

    <div class="card">
      <h2>🛠️ 生成订阅链接</h2>
      <div class="form-group">
        <label>猫猫云官网/API 地址 (Host)</label>
        <input type="text" id="apiHost" placeholder="例如：https://api.maomao.cloud 或官网域名" value="https://api.maomao.cloud">
        <div class="input-hint">猫猫云的 API 服务地址或当前可访问的官网域名</div>
      </div>

      <div class="form-group">
        <label>订阅 Token 或 登录凭证 (Token / auth_data)</label>
        <input type="text" id="token" placeholder="你的用户 token 或 auth_data 密钥">
        <div class="input-hint">可在网页端控制台或抓包中获取（个人中心的 token 参数或 32 位 key）</div>
      </div>

      <div class="form-group">
        <label>客户端类型 (Target)</label>
        <select id="target">
          <option value="clash" selected>Clash / Flclash / Mihomo (Clash Meta)</option>
          <option value="raw">原始节点列表 (Raw Proxies Base64)</option>
        </select>
      </div>

      <button class="btn" onclick="generateUrl()">生成我的订阅链接</button>

      <div class="result-box" id="resultBox">
        <label>生成的第三方订阅链接（可在 Flclash / Clash Verge 中直接导入）：</label>
        <div class="sub-url-container">
          <input type="text" id="generatedUrl" class="sub-url-input" readonly>
          <button class="btn-copy" onclick="copyUrl()">复制</button>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>💡 为什么需要本 Worker？</h2>
      <ul class="info-list">
        <li><strong>封闭客户端限制：</strong> 猫猫云 6.0 客户端（Cat 客户端）移除了公开的 Clash 订阅入口，仅通过客户端内部接口交互并调用内置 Mihomo 内核。</li>
        <li><strong>标准协议还原：</strong> 本 Worker 完整实现了猫猫云底层 API (<code>/user/getSubscribe</code> 与标准 <code>/api/v1/client/subscribe</code>) 的桥接与解密解析。</li>
        <li><strong>完美兼容 Flclash：</strong> 输出包含标准完整规则组、分流策略组及 DNS 配置的 Clash YAML，直接导入 Flclash、Clash Verge 等第三方客户端即可无缝使用。</li>
      </ul>
    </div>
  </div>

  <script>
    function generateUrl() {
      const host = document.getElementById('apiHost').value.trim();
      const token = document.getElementById('token').value.trim();
      const target = document.getElementById('target').value;
      if (!token) {
        alert('请输入您的 Token 或鉴权信息');
        return;
      }
      
      const baseUrl = '${workerOrigin}/sub';
      const params = new URLSearchParams();
      params.append('token', token);
      if (host) params.append('host', host);
      if (target) params.append('target', target);

      const finalUrl = baseUrl + '?' + params.toString();
      document.getElementById('generatedUrl').value = finalUrl;
      document.getElementById('resultBox').classList.add('active');
    }

    function copyUrl() {
      const input = document.getElementById('generatedUrl');
      input.select();
      document.execCommand('copy');
      alert('订阅链接已复制到剪贴板！可以直接粘贴至 Flclash 使用。');
    }
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
    },
  });
}

/**
 * 订阅处理主入口
 */
async function handleSubscribe(request, url, env) {
  const token = url.searchParams.get("token") || url.searchParams.get("auth_data");
  let host = url.searchParams.get("host") || env.DEFAULT_API_HOST || "https://api.maomao.cloud";
  const target = url.searchParams.get("target") || "clash";

  if (!token) {
    return new Response(
      JSON.stringify({ error: "Missing required parameter: 'token' or 'auth_data'" }, null, 2),
      {
        status: 400,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      }
    );
  }

  // 格式化 host
  if (!host.startsWith("http://") && !host.startsWith("https://")) {
    host = "https://" + host;
  }
  host = host.replace(/\/+$/, "");

  try {
    // 第一步：尝试直接通过标准 V2board/Xboard /api/v1/client/subscribe 获取
    const clientSubUrl = `${host}/api/v1/client/subscribe?token=${encodeURIComponent(token)}&flag=meta`;
    let subResp = await fetch(clientSubUrl, {
      headers: {
        "User-Agent": "ClashMeta/1.18.0 (Flclash)",
        "Accept": "*/*",
      },
    });

    let rawData = "";
    let userInfoHeader = subResp.headers.get("Subscription-Userinfo") || subResp.headers.get("subscription-userinfo");

    if (subResp.ok) {
      rawData = await subResp.text();
    }

    // 如果直接获取失败或者返回 HTML / 非配置格式，则调用猫猫云专有客户端 API /user/getSubscribe
    if (!subResp.ok || !rawData || rawData.trim().startsWith("<") || rawData.includes("<!DOCTYPE html>")) {
      const userSubApiUrl = `${host}/api/v1/user/getSubscribe`;
      const catResp = await fetch(userSubApiUrl, {
        headers: {
          "Authorization": token,
          "User-Agent": "Cat/6.0.0 (Linux; x86_64)",
          "Accept": "application/json",
        },
      });

      if (catResp.ok) {
        const catJson = await catResp.json();
        // 猫猫云 API 返回结构一般为 { data: { subscribe_url: "...", download_url: "...", ... } }
        if (catJson && catJson.data) {
          const downloadUrl = catJson.data.download_url || catJson.data.subscribe_url;
          if (downloadUrl) {
            // 下载实际节点配置
            const nodeResp = await fetch(downloadUrl, {
              headers: {
                "User-Agent": "ClashMeta/1.18.0 (Flclash)",
                "Accept": "*/*",
              },
            });
            if (nodeResp.ok) {
              rawData = await nodeResp.text();
              if (!userInfoHeader) {
                userInfoHeader = nodeResp.headers.get("Subscription-Userinfo") || nodeResp.headers.get("subscription-userinfo");
              }
            }
          }
        }
      }
    }

    // 如果经过重试依然没有数据，尝试回退普通 token 请求
    if (!rawData || rawData.trim().startsWith("<")) {
      const fallbackUrl = `${host}/api/v1/client/subscribe?token=${encodeURIComponent(token)}`;
      const fbResp = await fetch(fallbackUrl, {
        headers: {
          "User-Agent": "ClashMeta/1.18.0",
        },
      });
      if (fbResp.ok) {
        rawData = await fbResp.text();
      }
    }

    if (!rawData) {
      return new Response(
        JSON.stringify({ error: "Failed to retrieve subscription data from upstream MaoMaoCloud server." }, null, 2),
        { status: 502, headers: { "Content-Type": "application/json;charset=UTF-8" } }
      );
    }

    // 解析与重构配置
    const finalConfig = buildClashConfig(rawData, target);

    const responseHeaders = {
      "Content-Type": target === "raw" ? "text/plain;charset=UTF-8" : "text/yaml;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Content-Disposition": `attachment; filename="MaoMaoCloud.yaml"`,
    };

    if (userInfoHeader) {
      responseHeaders["Subscription-Userinfo"] = userInfoHeader;
    }

    return new Response(finalConfig, {
      status: 200,
      headers: responseHeaders,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Exception occurred during parsing", message: err.message }, null, 2),
      {
        status: 500,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      }
    );
  }
}

/**
 * 登录代理路由（方便从前端或直接调用 API 获取用户 token / auth_data）
 */
async function handleLoginProxy(request, env) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed, POST required" }), {
      status: 405,
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
  }

  try {
    const body = await request.json();
    const host = body.host || env.DEFAULT_API_HOST || "https://api.maomao.cloud";
    const email = body.email;
    const password = body.password;

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing email or password" }), {
        status: 400,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      });
    }

    const loginUrl = `${host.replace(/\/+$/, "")}/api/v1/passport/auth/login`;
    const resp = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Cat/6.0.0 (Linux; x86_64)",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await resp.text();
    return new Response(data, {
      status: resp.status,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    });
  }
}

/**
 * 将原始订阅内容清洗并组装成适用于 Clash / Flclash / Mihomo 的高质量标准配置
 */
function buildClashConfig(rawContent, target) {
  // 检查是否已经是完整的 Clash YAML 格式（包含 proxies:）
  if (rawContent.includes("proxies:") && (rawContent.includes("proxy-groups:") || rawContent.includes("port:") || rawContent.includes("mixed-port:"))) {
    // 已经是有效 Clash 配置，直接返回或微调
    return rawContent;
  }

  // 提取原始配置中的 proxies 部分（如果是一段只有 proxies 的 yaml）
  let proxiesBlock = "";
  let proxyNames = [];

  if (rawContent.includes("proxies:")) {
    const match = rawContent.match(/proxies:[\s\S]*?(?=(?:proxy-groups:|rules:|rule-providers:|$))/);
    if (match) {
      proxiesBlock = match[0].trim();
      // 提取所有节点名称
      const nameMatches = proxiesBlock.matchAll(/^\s*-\s*name:\s*['"]?([^'"\n]+)['"]?/gm);
      for (const m of nameMatches) {
        if (m[1]) proxyNames.push(m[1].trim());
      }
    }
  }

  // 如果未能提取出节点，且内容是 Base64 格式的节点 URI 列表 (vmess://, ss://, trojan://, hysteria2://, vless:// 等)
  if (proxyNames.length === 0) {
    try {
      let decoded = "";
      try {
        decoded = atob(rawContent.trim());
      } catch (e) {
        decoded = rawContent;
      }

      if (decoded.includes("://")) {
        const parsedProxies = parseNodeLinks(decoded);
        if (parsedProxies.length > 0) {
          proxyNames = parsedProxies.map((p) => p.name);
          proxiesBlock = "proxies:\n" + parsedProxies.map((p) => serializeYamlProxy(p)).join("\n");
        }
      }
    } catch (e) {
      // 忽略解析错误
    }
  }

  // 如果仍然没有提取出或者不需要包装，直接返回 rawContent
  if (proxyNames.length === 0 || target === "raw") {
    return rawContent;
  }

  // 构造标准 Clash Meta / Flclash 配置
  return generateStandardClashYaml(proxiesBlock, proxyNames);
}

/**
 * 生成完整的 Clash Meta 规则与策略组模版
 */
function generateStandardClashYaml(proxiesBlock, proxyNames) {
  const proxyListYaml = proxyNames.map((name) => `      - "${name.replace(/"/g, '\\"')}"`).join("\n");

  return `mixed-port: 7890
allow-lan: false
mode: rule
log-level: info
ipv6: true
external-controller: 127.0.0.1:9090
dns:
  enable: true
  listen: 0.0.0.0:1053
  ipv6: false
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  fake-ip-filter:
    - "*.lan"
    - "localhost.ptlogin2.qq.com"
    - "+.srv.nintendo.net"
    - "+.stun.playstation.net"
    - "+.msftconnecttest.com"
    - "+.msftncsi.com"
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
  fallback:
    - https://cloudflare-dns.com/dns-query
    - https://dns.google/dns-query

${proxiesBlock}

proxy-groups:
  - name: 🚀 节点选择
    type: select
    proxies:
      - ♻️ 自动选择
      - 🎯 故障转移
      - 🔮 负载均衡
      - DIRECT
${proxyListYaml}

  - name: ♻️ 自动选择
    type: url-test
    url: http://cp.cloudflare.com/generate_204
    interval: 300
    tolerance: 50
    proxies:
${proxyListYaml}

  - name: 🎯 故障转移
    type: fallback
    url: http://cp.cloudflare.com/generate_204
    interval: 300
    proxies:
${proxyListYaml}

  - name: 🔮 负载均衡
    type: load-balance
    strategy: consistent-hashing
    url: http://cp.cloudflare.com/generate_204
    interval: 300
    proxies:
${proxyListYaml}

  - name: 📲 国际媒体
    type: select
    proxies:
      - 🚀 节点选择
      - ♻️ 自动选择
${proxyListYaml}

  - name: 🤖 人工智能
    type: select
    proxies:
      - 🚀 节点选择
      - ♻️ 自动选择
${proxyListYaml}

  - name: 🐟 漏网之鱼
    type: select
    proxies:
      - 🚀 节点选择
      - ♻️ 自动选择
      - DIRECT

rules:
  - DOMAIN-SUFFIX,openai.com,🤖 人工智能
  - DOMAIN-SUFFIX,chatgpt.com,🤖 人工智能
  - DOMAIN-SUFFIX,anthropic.com,🤖 人工智能
  - DOMAIN-SUFFIX,claude.ai,🤖 人工智能
  - DOMAIN-SUFFIX,youtube.com,📲 国际媒体
  - DOMAIN-SUFFIX,googlevideo.com,📲 国际媒体
  - DOMAIN-SUFFIX,netflix.com,📲 国际媒体
  - DOMAIN-SUFFIX,spotify.com,📲 国际媒体
  - DOMAIN-SUFFIX,github.com,🚀 节点选择
  - DOMAIN-SUFFIX,google.com,🚀 节点选择
  - DOMAIN-KEYWORD,google,🚀 节点选择
  - DOMAIN-KEYWORD,twitter,🚀 节点选择
  - DOMAIN-KEYWORD,telegram,🚀 节点选择
  - GEOIP,CN,DIRECT
  - MATCH,🐟 漏网之鱼
`;
}

/**
 * 简易协议 URI 解析器（支持常见代理协议）
 */
function parseNodeLinks(linksText) {
  const lines = linksText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const proxies = [];

  for (let line of lines) {
    try {
      if (line.startsWith("vmess://")) {
        const b64 = line.substring(8);
        const jsonStr = decodeBase64Safe(b64);
        const obj = JSON.parse(jsonStr);
        proxies.push({
          name: obj.ps || `vmess-${obj.add}:${obj.port}`,
          type: "vmess",
          server: obj.add,
          port: parseInt(obj.port, 10),
          uuid: obj.id,
          alterId: parseInt(obj.aid || 0, 10),
          cipher: obj.scy || "auto",
          udp: true,
          tls: obj.tls === "tls",
          network: obj.net || "tcp",
          "ws-opts": obj.net === "ws" ? { path: obj.path || "/", headers: { Host: obj.host || "" } } : undefined,
        });
      } else if (line.startsWith("ss://")) {
        // ss://BASE64@host:port#name
        const urlStr = line.substring(5);
        const hashIdx = urlStr.indexOf("#");
        const nodeName = hashIdx !== -1 ? decodeURIComponent(urlStr.substring(hashIdx + 1)) : "Shadowsocks";
        const mainPart = hashIdx !== -1 ? urlStr.substring(0, hashIdx) : urlStr;
        
        let userInfo = "";
        let serverInfo = "";
        if (mainPart.includes("@")) {
          const atIdx = mainPart.lastIndexOf("@");
          userInfo = decodeBase64Safe(mainPart.substring(0, atIdx));
          serverInfo = mainPart.substring(atIdx + 1);
        } else {
          const decoded = decodeBase64Safe(mainPart);
          const atIdx = decoded.lastIndexOf("@");
          userInfo = decoded.substring(0, atIdx);
          serverInfo = decoded.substring(atIdx + 1);
        }

        const [cipher, password] = userInfo.split(":");
        const [server, port] = serverInfo.split(":");
        if (server && port && cipher && password) {
          proxies.push({
            name: nodeName,
            type: "ss",
            server,
            port: parseInt(port, 10),
            cipher,
            password,
            udp: true,
          });
        }
      } else if (line.startsWith("trojan://")) {
        // trojan://password@server:port?allowInsecure=0&peer=sni#name
        const url = new URL(line);
        const nodeName = url.hash ? decodeURIComponent(url.hash.substring(1)) : `trojan-${url.hostname}`;
        proxies.push({
          name: nodeName,
          type: "trojan",
          server: url.hostname,
          port: parseInt(url.port || 443, 10),
          password: url.username || url.password,
          udp: true,
          sni: url.searchParams.get("sni") || url.searchParams.get("peer") || url.hostname,
          "skip-cert-verify": url.searchParams.get("allowInsecure") === "1",
        });
      } else if (line.startsWith("hysteria2://") || line.startsWith("hy2://")) {
        const url = new URL(line.replace(/^hy2:\/\//, "hysteria2://"));
        const nodeName = url.hash ? decodeURIComponent(url.hash.substring(1)) : `hy2-${url.hostname}`;
        proxies.push({
          name: nodeName,
          type: "hysteria2",
          server: url.hostname,
          port: parseInt(url.port || 443, 10),
          password: url.username || url.password,
          sni: url.searchParams.get("sni") || url.hostname,
          "skip-cert-verify": url.searchParams.get("insecure") === "1",
        });
      }
    } catch (e) {
      // 忽略单个节点解析异常
    }
  }

  return proxies;
}

function decodeBase64Safe(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) {
    str += "=";
  }
  return atob(str);
}

function serializeYamlProxy(proxy) {
  let lines = [
    `  - name: "${proxy.name.replace(/"/g, '\\"')}"`,
    `    type: ${proxy.type}`,
    `    server: ${proxy.server}`,
    `    port: ${proxy.port}`,
  ];

  if (proxy.uuid) lines.push(`    uuid: ${proxy.uuid}`);
  if (proxy.password) lines.push(`    password: "${proxy.password}"`);
  if (proxy.cipher) lines.push(`    cipher: ${proxy.cipher}`);
  if (proxy.alterId !== undefined) lines.push(`    alterId: ${proxy.alterId}`);
  if (proxy.udp !== undefined) lines.push(`    udp: ${proxy.udp}`);
  if (proxy.tls !== undefined) lines.push(`    tls: ${proxy.tls}`);
  if (proxy.sni) lines.push(`    sni: ${proxy.sni}`);
  if (proxy["skip-cert-verify"] !== undefined) lines.push(`    skip-cert-verify: ${proxy["skip-cert-verify"]}`);
  if (proxy.network) lines.push(`    network: ${proxy.network}`);

  if (proxy["ws-opts"]) {
    lines.push(`    ws-opts:`);
    lines.push(`      path: "${proxy["ws-opts"].path}"`);
    if (proxy["ws-opts"].headers) {
      lines.push(`      headers:`);
      for (const [k, v] of Object.entries(proxy["ws-opts"].headers)) {
        lines.push(`        ${k}: "${v}"`);
      }
    }
  }

  return lines.join("\n");
}
