#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
猫猫云 (MaoMaoCloud) 订阅自动化 API 客户端
=============================================
完全基于逆向确认的 API 路径实现（见 REVERSE_ENGINEERING.md）：
  1. 登录         POST /api/v1/passport/auth/login
  2. 订阅元数据   GET  /api/v1/user/getSubscribe     (Authorization: JWT 无 Bearer)
  3. 节点列表     GET  /api/v1/user/server/fetch
  4. 结合逆向提取的节点映射表生成标准 Clash YAML（供 FlClash / Clash Verge 使用）

用法:
  python3 fetch_sub_api.py <邮箱> <密码> [API域名] [输出文件]

示例:
  python3 fetch_sub_api.py slwyts@foxmail.com '密码' https://api.brfcdu.cn out.yaml
"""

import sys
import json
import ssl
import base64
import urllib.request
import urllib.parse

# ============ 逆向提取的节点映射表（name -> 连接参数） ============
# 来源：从 CatCore 运行内存提取的解密后明文节点（47 个）
# password/sni/alpn 等对所有节点一致（password = 用户 uuid，运行时动态注入）
NODE_MAP = {
    "1.0x 🇭🇰 香港 HK - 9": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60008),
    "1.0x 🇭🇰 香港 HK - 10": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60009),
    "1.0x 🇭🇰 香港 HK - 家宽": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 59999),
    "1.0x 🇮🇩 印度尼西亚 ID - 1": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 50011),
    "1.0x 🇰🇷 韩国 KR - 1": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60100),
    "1.0x 🇫🇷 法国 FR - 1": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60101),
    "1.0x 🇩🇪 德国 DE - 1": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60102),
    "1.0x 🇬🇧 英国 UK - 1": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60103),
    "1.0x 🇦🇪 迪拜 AE - 1": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60104),
    "1.0x 🇧🇷 巴西 BR - 1": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60105),
    "1.0x 🇬🇷 希腊 GR - 1": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60108),
    "1.0x 🇮🇳 印度 IN - 1": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60109),
    "1.0x 🇧🇪 比利时 BE - 1": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60114),
    "1.0x 🇦🇷 阿根廷 AR - 1": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60115),
    "1.0x 🇲🇽 墨西哥 MX - 1": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60116),
    "1.0x 🇮🇪 爱尔兰 IE - 1": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60117),
    "1.0x 🇵🇭 菲律宾 PH - 1": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60118),
    "1.0x 🇹🇷 土耳其 TR - 1": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60122),
    "1.0x 🇦🇺 澳大利亚 AU - 1": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60123),
    "1.0x 🇲🇾 马来西亚 MY - 1": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60124),
    "1.0x 🇵🇰 巴基斯坦 PK - 1": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60125),
    "1.0x 🇨🇳 台湾 TW - 1": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60126),
    "1.0x 🇨🇳 台湾 TW - 2": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60127),
    "1.0x 🇨🇳 台湾 TW - 3": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60128),
    "1.0x 🇯🇵 日本 JP - 9": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60152),
    "1.0x 🇯🇵 日本 JP - 10": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60153),
    "1.0x 🇸🇬 新加坡 SG - 3": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60160),
    "1.0x 🇸🇬 新加坡 SG - 4": ("gtm-sg-nnu4tneapp20g.maomaogtm.com", 60161),
    "0.5x 🇺🇸 美国直连 US - 11": ("gtm-sg-d6a4tnfxt21gzl.maomaogtm.com", 50006),
    "0.5x 🇺🇸 美国直连 US - 12": ("gtm-sg-d6a4tnfxt21gzl.maomaogtm.com", 50007),
    "0.5x 🇺🇸 美国直连 US - 13": ("gtm-sg-d6a4tnfxt21gzl.maomaogtm.com", 50008),
    "0.5x 🇺🇸 美国直连 US - 14": ("gtm-sg-d6a4tnfxt21gzl.maomaogtm.com", 50009),
    "0.5x 🇺🇸 美国直连 US - 15": ("gtm-sg-d6a4tnfxt21gzl.maomaogtm.com", 50010),
    "0.5x 🇸🇬 新加坡直连 SG - 17": ("gtm-sg-d6a4tnfxt21gzl.maomaogtm.com", 50022),
    "0.5x 🇸🇬 新加坡直连 SG - 18": ("gtm-sg-d6a4tnfxt21gzl.maomaogtm.com", 50023),
    "1.0x 🇺🇸 美国 US - 7": ("us.maomaogtm.com", 60135),
    "1.0x 🇺🇸 美国 US - 8": ("us.maomaogtm.com", 60136),
    "1.0x 🇺🇸 美国 US - 9": ("us.maomaogtm.com", 60137),
    "1.0x 🇺🇸 美国 US - 10": ("us.maomaogtm.com", 60138),
    # 其余已确认但未在此列出的节点可继续补充（可从内存 dump 再次提取）
}

# 从内存额外确认的 server:port（编号对应的补全）
EXTRA_PORTS = {
    "gtm-sg-d6a4tnfxt21gzl.maomaogtm.com": [50000, 50001, 50002, 50021, 50024, 50100, 50101, 50102, 50103],
    "gtm-sg-nnu4tneapp20g.maomaogtm.com": [60000, 60001, 60002, 60003, 60004, 60005, 60006, 60007,
                                           60106, 60107, 60110, 60121, 60144, 60145, 60146, 60147,
                                           60150, 60151, 60154, 60159, 60166, 60167, 60168, 60169, 60170, 60171, 60172],
    "us.maomaogtm.com": [60132, 60133, 60134],
}


def make_ctx():
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    return ctx


def http_request(url, headers=None, body=None, method=None, timeout=20):
    headers = headers or {}
    data = body.encode() if isinstance(body, str) else body
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=timeout, context=make_ctx()) as resp:
        return resp.status, resp.read().decode('utf-8', 'ignore')


def login(host, email, password):
    url = f"{host}/api/v1/passport/auth/login"
    body = urllib.parse.urlencode({"email": email, "password": password})
    st, raw = http_request(url, {
        "User-Agent": "Mozilla/5.0 (dart:io) SuperAccelerator",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
    }, body=body, method="POST")
    j = json.loads(raw)
    if j.get("status") != "success":
        raise RuntimeError(f"登录失败: {j}")
    return j["data"]  # {token, auth_data, ...}


def api_get(host, path, jwt):
    url = f"{host}{path}"
    st, raw = http_request(url, {
        "User-Agent": "Mozilla/5.0 (dart:io) SuperAccelerator",
        "Authorization": jwt,  # 关键: JWT 直放，无 Bearer
        "Accept": "application/json",
    })
    return json.loads(raw)


def build_yaml(nodes, uuid):
    """nodes: list of {name, server, port, password}"""
    def esc(n):
        return n.replace('"', '\\"')

    proxies = []
    for n in nodes:
        proxies.append(
            f'  - name: "{esc(n["name"])}"\n'
            f'    type: anytls\n'
            f'    server: {n["server"]}\n'
            f'    port: {n["port"]}\n'
            f'    password: "{n["password"]}"\n'
            f'    udp: true\n'
            f'    sni: osxapps.itunes.apple.com\n'
            f'    skip-cert-verify: true\n'
            f'    client-fingerprint: chrome\n'
            f'    alpn:\n'
            f'      - "h2"\n'
            f'      - "http/1.1"'
        )
    proxy_names = "\n".join(f'      - "{esc(n["name"])}"' for n in nodes)
    proxies_block = "\n".join(proxies)

    return f"""# 猫猫云 MaoMaoCloud - 自动生成 (节点数 {len(nodes)})
mixed-port: 7890
allow-lan: false
mode: rule
log-level: info
ipv6: true
external-controller: 127.0.0.1:9090
dns:
  enable: true
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  nameserver:
    - https://doh.pub/dns-query
    - https://dns.alidns.com/dns-query
  fallback:
    - https://dns.google/dns-query

proxies:
{proxies_block}

proxy-groups:
  - name: 🚀 节点选择
    type: select
    proxies:
      - ♻️ 自动选择
      - DIRECT
{proxy_names}
  - name: ♻️ 自动选择
    type: url-test
    url: http://cp.cloudflare.com/generate_204
    interval: 300
    tolerance: 50
    proxies:
{proxy_names}
  - name: 🎯 故障转移
    type: fallback
    url: http://cp.cloudflare.com/generate_204
    interval: 300
    proxies:
{proxy_names}
  - name: 🐟 漏网之鱼
    type: select
    proxies:
      - 🚀 节点选择
      - DIRECT

rules:
  - GEOIP,CN,DIRECT
  - MATCH,🐟 漏网之鱼
"""


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    email = sys.argv[1]
    password = sys.argv[2]
    host = sys.argv[3] if len(sys.argv) > 3 else "https://api.brfcdu.cn"
    outfile = sys.argv[4] if len(sys.argv) > 4 else "MaoMaoCloud_sub.yaml"
    if not host.startswith("http"):
        host = "https://" + host
    host = host.rstrip("/")

    print(f"[*] 登录 {host} ...")
    auth = login(host, email, password)
    jwt = auth["auth_data"]
    print(f"[+] 登录成功, token={auth['token']}, jwt 前缀={jwt[:30]}...")

    print("[*] 获取订阅元数据 getSubscribe ...")
    sub = api_get(host, "/api/v1/user/getSubscribe", jwt)
    d = sub.get("data") or {}
    uuid = d.get("uuid")
    print(f"[+] uuid={uuid}, subscribe_url={d.get('subscribe_url')}")

    print("[*] 拉取节点列表 server/fetch ...")
    sf = api_get(host, "/api/v1/user/server/fetch", jwt)
    servers = sf.get("data") or []
    print(f"[+] 服务端节点 {len(servers)} 个")

    # 用映射表生成节点（匹配上的）
    nodes = []
    for s in servers:
        nm = s["name"]
        if nm in NODE_MAP:
            server, port = NODE_MAP[nm]
            nodes.append({"name": nm, "server": server, "port": port, "password": uuid})
    print(f"[*] 映射到 {len(nodes)} 个可用节点")

    if not nodes:
        print("[-] 无可用节点（映射表未覆盖），请补充 NODE_MAP")
        sys.exit(2)

    yaml = build_yaml(nodes, uuid)
    with open(outfile, "w") as f:
        f.write(yaml)
    print(f"[+] 配置已写入 {outfile} ({len(yaml)} 字符, {len(nodes)} 节点)")
    print("[*] 可直接在 FlClash / Clash Verge 中导入该 YAML 文件使用")


if __name__ == "__main__":
    main()
