# YIWU FENGLONG TRADE FIRM — 滤布出口商多页企业站

多页英文企业站（B2B、无收费功能）：首页 + 产品中心 + 行业应用 + 关于我们 + 质量与服务 + 联系我们。
结构参照过滤行业同行网站的通行做法，文案为原创英文，图片为 AI 生成（无版权风险）。

## 文件说明

```
fenglong-trade-website/
├── index.html          首页（Hero + 信任条 + 优势 + 精选产品 + 行业应用预览 + 关于摘要 + CTA）
├── products.html       产品中心（5 大分类、29 个产品，含行业典型值参数表）
├── applications.html   行业应用（水泥建材 / 食品饮料 / 金属加工 / 电力能源 / 化工环保 / 农业园艺 / 纺织印刷）
├── about.html          关于我们（公司定位 + 出口流程 5 步 + 选择理由）
├── quality.html        质量与服务（质控流程 + 出口支持 + 检验内容）
├── contact.html        联系我们（增强询盘表单 + FAQ 8 条）
├── css/style.css       全站共享样式（改一处，全站生效）
└── img/                10 张配图（6 产品图 + 4 行业场景图，均为 AI 原创）
```

> 产品名与品类为行业通用分类；参数表为行业典型值（已标注 "typical values, customizable"），不虚构认证编号或实测承诺。

## 部署与更新步骤（已上线过，后续更新照此操作）

1. **改完代码后**：把修改后的文件（新增页面、css、img 等）上传/推送到 GitHub 仓库根目录
2. Cloudflare Pages 检测到推送后**自动重新部署**，约 1 分钟生效
3. 若访问出现 404：确认文件确实在仓库**根目录**（不要包在文件夹里），并在 Deployments 里看部署是否 Success

## 修改站点内容

- 联系方式 / 公司名：搜索 `zhangyukunyl@gmail.com`、`152259`、`YIWU FENGLONG` 即可全局定位修改
- 导航栏：每个页面的 `<nav class="main">` 部分，增删链接后**同步修改所有页面**
- 产品参数：编辑 `products.html` 中的表格行；规格数字均为典型值，可根据工厂实际参数更新
- 图片：替换 `img/` 下同名 jpg 即可；新图建议 2048 宽、jpg 格式
- 新增页面：复制任一页面骨架，改 title/meta 与内容，并在所有页面的导航和页脚加链接

## 上线前检查清单

- [ ] 浏览器打开 `index.html`，逐个点击导航测试 6 个页面互链
- [ ] 测试询盘表单（Send Inquiry 应唤起邮件客户端并带好内容）
- [ ] 手机端浏览首页与产品页（响应式适配）
- [ ] Google Search Console 提交域名（可后续生成 sitemap.xml）

## 可选升级（需要时再说）

- 询盘表单自动发邮件到 Gmail：Cloudflare Pages Functions + Resend（免费 3,000 封/月）
- sitemap.xml + robots.txt：利于搜索引擎收录
- WhatsApp 直达按钮 / Google Analytics 统计
