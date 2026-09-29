# YIWU FENGLONG TRADE FIRM — 产品展示站

单文件英文展示站（B2B、无收费功能），结构参照过滤行业同行网站的通行做法：
首页 Hero + 精选产品 + 五大产品线（29 个产品）+ 公司介绍 + 联系与询盘表单。

## 文件说明

- `index.html` — 网站唯一页面（含全部内联样式与询盘表单脚本）
- `img/` — 6 张产品配图（AI 原创生成，无版权风险）

> 文案为重新编写的英文原创内容；产品名与品类为行业通用分类；图片为 AI 生成示意产品图，非任何公司实拍图。

## 部署步骤（Cloudflare Pages + GitHub，全程免费）

1. **注册账号**（均免费，无需绑卡）
   - GitHub：https://github.com
   - Cloudflare：https://dash.cloudflare.com

2. **上传代码**
   - GitHub 新建仓库（Public 即可，如 `fenglong-trade-site`）
   - 把 `index.html` 和 `img/` 文件夹上传到仓库根目录

3. **部署到 Cloudflare Pages**
   - Cloudflare 控制台 → Workers & Pages → Create → Pages → Connect to Git
   - 授权并选择刚建的仓库 → 框架选 None（纯静态）→ Save and Deploy
   - 部署完成后会得到一个 `xxx.pages.dev` 地址，可立即访问
   - 之后每次修改代码并 `git push`，网站自动更新

4. **绑定自己的域名（推荐）**
   - 购买域名（.com 约 60–100 元/年，Namesilo / 阿里云 / 腾讯云均可）
   - Cloudflare → 添加站点 → 把域名 DNS 托管到 Cloudflare（按提示修改 NS 记录）
   - Workers & Pages → 选择站点 → Custom domains → 添加你的域名
   - HTTPS 证书自动签发，无需配置

5. **SEO（上线后做）**
   - 在 Google Search Console 提交 `你的域名/sitemap.xml`（页面已含 meta 描述与关键词）
   - 建议后续把询盘表单升级为自动发邮件（Cloudflare Pages Functions + Resend 免费 3000 封/月）

## 修改站点内容

- 联系方式 / 公司名：直接编辑 `index.html` 中的对应文字（搜索 `YIWU FENGLONG`、`zhangyukunyl@gmail.com`、`152259` 即可定位）
- 产品增删：复制/删除 `.card` 结构即可
- 产品配图：替换 `img/` 下的 jpg 文件，保持同名即可

## 上线前检查清单

- [ ] 用浏览器打开 `index.html` 预览效果
- [ ] 测试询盘表单（点击 Send Inquiry 应唤起邮件客户端）
- [ ] 确认手机端显示正常（页面已响应式适配）
