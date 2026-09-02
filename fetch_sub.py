#!/usr/bin/env python3
"""
猫猫云 (MaoMaoCloud / V2Board) 订阅提取与本地测试脚本
用于验证账号登录、提取订阅 Token 以及拉取节点配置。
"""

import sys
import json
import urllib.request
import urllib.parse
import ssl

def fetch_subscription(host, email, password):
    if not host.startswith("http://") and not host.startswith("https://"):
        host = "https://" + host
    host = host.rstrip("/")

    ctx = ssl.create_default_context()
    # 忽略部分自签或 CDN 证书问题
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    headers = {
        "User-Agent": "Cat/6.0.0 (Linux; x86_64)",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

    print(f"[*] 正在尝试连接目标站点: {host}")
    
    # 1. 登录
    login_url = f"{host}/api/v1/passport/auth/login"
    login_payload = json.dumps({"email": email, "password": password}).encode("utf-8")
    
    token = None
    auth_data = None

    try:
        req = urllib.request.Request(login_url, data=login_payload, headers=headers, method="POST")
        with urllib.request.urlopen(req, timeout=10, context=ctx) as resp:
            resp_body = resp.read().decode("utf-8")
            res_json = json.loads(resp_body)
            print(f"[+] 登录响应: {res_json}")
            
            if "data" in res_json and res_json["data"]:
                data = res_json["data"]
                token = data.get("token") or data.get("auth_data")
                auth_data = data.get("auth_data")
    except urllib.error.HTTPError as e:
        err_content = e.read().decode("utf-8", errors="ignore")
        print(f"[-] 登录失败 (HTTP {e.code}): {err_content}")
        return
    except Exception as e:
        print(f"[-] 请求异常: {e}")
        return

    if not token and not auth_data:
        print("[-] 未能获取到有效的 token 或 auth_data，请检查账号密码或站点地址。")
        return

    active_token = token or auth_data
    print(f"\n[+] 🎉 成功获取 Token / 鉴权凭证:")
    print(f"    Token: {active_token}")

    # 2. 获取订阅信息
    sub_url = f"{host}/api/v1/user/getSubscribe"
    sub_headers = {
        "User-Agent": "Cat/6.0.0 (Linux; x86_64)",
        "Authorization": active_token,
        "Accept": "application/json",
    }

    print(f"\n[*] 正在获取订阅节点信息...")
    try:
        req = urllib.request.Request(sub_url, headers=sub_headers, method="GET")
        with urllib.request.urlopen(req, timeout=10, context=ctx) as resp:
            sub_body = resp.read().decode("utf-8")
            sub_json = json.loads(sub_body)
            print(f"[+] 订阅接口响应: {json.dumps(sub_json, indent=2, ensure_ascii=False)}")
            
            if "data" in sub_json and sub_json["data"]:
                d = sub_json["data"]
                download_url = d.get("download_url") or d.get("subscribe_url")
                if download_url:
                    print(f"\n[+] 真实订阅下载地址 (download_url):")
                    print(f"    {download_url}")
    except Exception as e:
        print(f"[-] 获取订阅详情失败: {e}")

    # 3. 尝试直接拉取 clash 格式
    clash_sub_url = f"{host}/api/v1/client/subscribe?token={active_token}&flag=meta"
    print(f"\n[*] 正在尝试拉取 Meta/Clash 订阅配置...")
    try:
        req = urllib.request.Request(clash_sub_url, headers={"User-Agent": "ClashMeta/1.18.0"}, method="GET")
        with urllib.request.urlopen(req, timeout=10, context=ctx) as resp:
            content = resp.read().decode("utf-8", errors="ignore")
            print(f"[+] 获取成功！配置长度: {len(content)} 字符")
            print(f"--- 节点预览 (前 20 行) ---")
            lines = content.splitlines()[:20]
            for l in lines:
                print(l)
    except Exception as e:
        print(f"[-] 拉取 Clash 格式订阅失败: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("使用方法: python3 fetch_sub.py <猫猫云官网或API域名> <邮箱> <密码>")
        print("示例: python3 fetch_sub.py https://catcloud.org slwyts@foxmail.com Aqwe123.,")
        sys.exit(1)

    host_arg = sys.argv[1]
    email_arg = sys.argv[2]
    pwd_arg = sys.argv[3]

    fetch_subscription(host_arg, email_arg, pwd_arg)
