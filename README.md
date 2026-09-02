# maomaocloud-subscribe

猫猫云订阅桥接。猫猫云把标准订阅接口关了，只能用它的 App；这个项目把它的私有协议还原成标准 Clash / FlClash 订阅。

## 文件

- `src/index.ts` — Cloudflare Worker，部署后得到一个订阅链接
- `fetch_sub_api.py` — 本地跑，直接生成 yaml 文件
- `REVERSE_ENGINEERING.md` — 逆向记录

## Worker 用法

部署：

```bash
npm install
npx wrangler deploy
```

订阅链接（参数二选一）：

```
/sub?email=账号&password=密码
/sub?token=<auth_data>        # 拿过 token 就不用每次登录
```

可选 `host` 强制指定 API 域名。不指定时内置多个域名，随机选一个，失败自动换下一个。

## Python 用法

```bash
python3 fetch_sub_api.py 账号 密码 [API域名] 输出.yaml
```

## 说明

- 节点是 anytls，密码是账号的 uuid，从 `getSubscribe` 拿
- 节点域名是私有的，公网解析不到，必须用猫猫云自己的 DoH（阿里云 PrivateZone）解析，IP 会变，每次都要重新解析
- 生成的配置在 FlClash / Clash Verge 里直接用
