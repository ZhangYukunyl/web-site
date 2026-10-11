/* 站点共享脚本 —— 流量统计（默认不加载，填了 ID 才生效）
 *
 * 用法：只改这一个文件，全站生效。
 *   1) Cloudflare Web Analytics（推荐，免费、无 Cookie 弹窗）：
 *      Cloudflare 控制台 → Analytics & Logs → Web Analytics → 添加站点 → 复制 token
 *      把 token 粘到下面 CF_ANALYTICS_TOKEN 引号里
 *   2) Google Analytics 4（可选，二者可同时用）：
 *      把 G-XXXXXXXXXX 填到 GA4_MEASUREMENT_ID 引号里
 */
(function () {
  var CF_ANALYTICS_TOKEN = "";      // 例：'a1b2c3d4e5f6...'
  var GA4_MEASUREMENT_ID = "";      // 例：'G-ABCD1234XY'

  if (CF_ANALYTICS_TOKEN) {
    var cf = document.createElement('script');
    cf.defer = true;
    cf.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    cf.setAttribute('data-cf-beacon', JSON.stringify({ token: CF_ANALYTICS_TOKEN }));
    document.head.appendChild(cf);
  }

  if (GA4_MEASUREMENT_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    var ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_MEASUREMENT_ID;
    document.head.appendChild(ga);
    window.gtag('js', new Date());
    window.gtag('config', GA4_MEASUREMENT_ID);
  }
})();
