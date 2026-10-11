# YIWU FENGLONG TRADE FIRM — 滤布出口商多页企业站

多页英文企业站（B2B、无收费功能）：首页 + 产品中心 + 行业应用 + 关于我们 + 质量与服务 + 资讯洞察 + 联系我们。
纯静态、零依赖、零框架，部署在 Cloudflare Pages（免费）。

## 文件结构

```
web-site/
├── index.html          首页（Hero + 信任条 + 优势 + 精选产品 + 行业应用预览 + Insights 预览 + 关于摘要 + CTA）
├── products.html       产品中心（5 大分类、29 个产品，含行业典型值参数表）
├── applications.html   行业应用（7 大行业区块，每区块配场景/产品图）
├── about.html          关于我们（公司定位 + 出口流程 5 步 + 选择理由 + 产线实拍）
├── quality.html        质量与服务（质控 3 步 + 检验内容 + 出口支持）
├── insights.html       资讯洞察列表页（4 篇买家指南）
├── insights-*.html     4 篇指南文章页
├── dust-collection-filter-bag.html        产品详情页（8 个高频产品，均含规格表/FAQ/询盘）
├── air-filter-media.html
├── fiberglass-filter-media.html
├── replacement-filter-pad.html
├── flat-bed-filter-cloth.html
├── coffee-filter-paper.html
├── tea-bag-filter-paper.html
├── air-slide-fabric.html
├── functions/api/inquiry.js   询盘表单后端（Cloudflare Pages Function + Resend 发信）
├── js/site.js          流量统计加载器（填 token 后全站生效）
├── contact.html        联系我们（询盘表单：自动发信 + 邮件/WhatsApp 兜底 + FAQ 8 条）
├── css/style.css       全站共享样式（改一处，全站生效）
├── img/                17 张配图 + og-image.jpg（已压缩，共约 0.9 MB）
├── favicon.ico         网站图标（多尺寸）
├── apple-touch-icon.png  iOS 图标
├── favicon-512.png     高清图标源文件
├── sitemap.xml         站点地图（19 条 URL，提交 Google Search Console 用）
├── robots.txt          搜索引擎抓取规则
└── README.md
```

> 产品名与品类为行业通用分类；参数表为行业典型值（页面已标注 "typical values"），不虚构认证编号或实测承诺。产品图为 AI 生成示意图（已去水印）；行业场景图与产线图来源：参考同行公开素材，通用无品牌（如需替换为实拍图，直接覆盖 img/ 同名文件即可）。

## 上线前必须做的一件事

## 站点域名

正式域名：**https://www.filcloth.com**
Cloudflare Pages 默认域名：`filtercloth.pages.dev`（可保留作备用入口）

代码中的 canonical / og:url / og:image、`sitemap.xml`、`robots.txt` 均已指向 `https://www.filcloth.com`（共 31 处）。
若将来更换域名，搜索 `filcloth.com` 全局替换即可（6 个 html + sitemap.xml + robots.txt + 本 README）。

## 更新步骤（已部署过，后续照此操作）

1. 改完代码后，把修改的文件上传/推送到 GitHub 仓库**根目录**（注意保持 `css/`、`img/` 的目录结构）
2. Cloudflare Pages 检测到推送后自动重新部署，约 1 分钟生效
3. 若访问 404：确认文件在仓库根目录、Deployments 状态为 Success

## 询盘自动发邮件（已内置，激活需 2 步）

代码已就绪：`functions/api/inquiry.js`（Cloudflare Pages Function），表单提交后通过 Resend 直接把询盘发进邮箱；发信失败时表单自动降级为「邮件 / WhatsApp」兜底通道。

激活步骤（约 5 分钟）：
1. 注册 https://resend.com （免费 3,000 封/月）→ **API Keys → Create** 复制 `re_` 开头的 key
2. Cloudflare 控制台 → Workers & Pages → 本项目 → **Settings → Environment variables → Add**：
   - `RESEND_API_KEY` = 你的 key（Production）
   - `INQUIRY_FROM`（可选）= 如 `inquiry@filcloth.com`（需先在 Resend 验证 filcloth.com 域名，加 2 条 DNS 记录即可；不填则用测试发件人，只能发给你自己的注册邮箱）
3. 重新部署一次（Settings → Deployments → Retry 或随便推一个文件）

测试：打开 filcloth.com/contact.html 提交一条 → 邮箱收到即为成功。

## 流量统计（已内置，填一个 token 即可）

全站页面已加载 `js/site.js`。推荐用 **Cloudflare Web Analytics**（免费、无 Cookie 弹窗）：
1. Cloudflare 控制台 → **Analytics & Logs → Web Analytics → Add a site** → 选 `www.filcloth.com` → 复制 token
2. 编辑仓库里的 **`js/site.js`**（GitHub 网页上直接点文件 → 铅笔编辑），把 token 粘到 `CF_ANALYTICS_TOKEN = ""` 引号里 → Commit
3. 约 1 分钟后全站开始记录访问

如需 GA4，把 `G-XXXXXXXXXX` 填进同文件的 `GA4_MEASUREMENT_ID` 即可。

## 修改站点内容

- 联系方式 / 公司名：搜索 `zhangyukunyl@gmail.com`、`152259`、`YIWU FENGLONG` 全局定位
- WhatsApp 号码：搜索 `wa.me/8615225911240`（浮动按钮 + 联系页），号码变更需同步修改
- 导航栏：每个页面的 `<nav class="main">`，增删链接后同步修改所有页面
- 产品增删：编辑 `products.html` 中对应 `.card`；参数表行也在此文件
- 图片：替换 `img/` 下同名 jpg 即可，建议 1000px 宽左右、jpg 格式
- 新增页面：复制任一页面骨架，改 title/meta 与内容，并在所有页面导航和页脚加链接

## 上线检查清单

- [ ] 浏览器打开 `index.html`，逐个点击导航测试 11 个页面互链
- [ ] 测试询盘表单（Send Inquiry → 出现感谢提示；或降级到邮件/WhatsApp 兜底按钮）
- [ ] 手机端浏览首页与产品页（响应式已适配）
- [x] 域名已绑定并替换：www.filcloth.com
- [ ] Google Search Console 提交 https://www.filcloth.com/sitemap.xml

## 可选升级（需要时再说）

- 询盘表单自动发邮件到 Gmail：Cloudflare Pages Functions + Resend（免费 3,000 封/月）
- WhatsApp 直达按钮已有（右下角浮动）；可再加 Google Analytics 统计
