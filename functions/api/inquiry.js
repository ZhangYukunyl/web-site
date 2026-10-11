/**
 * Cloudflare Pages Function — 询盘表单接收端点
 * 路由：POST /api/inquiry
 *
 * 需要的环境变量（Cloudflare Pages → Settings → Environment variables）：
 *   RESEND_API_KEY   必填。Resend 后台创建的 API key（re_ 开头）
 *   INQUIRY_TO_EMAIL 选填。收件邮箱，默认 zhangyukunyl@gmail.com
 *   INQUIRY_FROM     选填。发件人，必须在 Resend 里验证过域名，
 *                    默认 onboarding@resend.dev（仅能发给 Resend 账号本人邮箱，用于测试）
 *
 * 未配置 RESEND_API_KEY 时返回 503，前端会自动降级到「邮件 / WhatsApp」兜底通道。
 */

const MAX = { name: 120, email: 160, country: 80, product: 120, qty: 120, msg: 5000 };

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function clip(s, n) {
  return String(s == null ? "" : s).trim().slice(0, n);
}

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request body." }, 400);
  }

  // 蜜罐字段：正常用户看不到，被填说明是机器人
  if (clip(data.website, 200)) return json({ ok: true });

  const name = clip(data.name, MAX.name);
  const email = clip(data.email, MAX.email);
  const country = clip(data.country, MAX.country);
  const product = clip(data.product, MAX.product);
  const qty = clip(data.qty, MAX.qty);
  const msg = clip(data.msg, MAX.msg);

  if (!name || !email || !msg) return json({ ok: false, error: "Name, email and message are required." }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json({ ok: false, error: "Please enter a valid email address." }, 400);

  const key = env.RESEND_API_KEY;
  if (!key) return json({ ok: false, error: "Mail service not configured yet." }, 503);

  const to = env.INQUIRY_TO_EMAIL || "zhangyukunyl@gmail.com";
  const from = env.INQUIRY_FROM || "onboarding@resend.dev";
  const subject = `New inquiry: ${product || "General"} — ${name}${country ? " (" + country + ")" : ""}`;

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Country / Region", country || "—"],
    ["Product", product || "—"],
    ["Estimated quantity", qty || "—"],
  ];

  const html = `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#12283f;line-height:1.6">
<h2 style="margin:0 0 4px">New website inquiry</h2>
<p style="margin:0 0 16px;color:#5b7a99">Received from www.filcloth.com</p>
<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px">
${rows.map(([k, v]) => `<tr><td style="border:1px solid #e3e9f0;background:#f7fafc;font-weight:bold;white-space:nowrap">${esc(k)}</td><td style="border:1px solid #e3e9f0">${esc(v)}</td></tr>`).join("\n")}
</table>
<h3 style="margin:18px 0 6px;font-size:15px">Specification &amp; requirements</h3>
<div style="border:1px solid #e3e9f0;border-radius:6px;padding:12px;white-space:pre-wrap;font-size:14px">${esc(msg)}</div>
<p style="color:#5b7a99;font-size:12px;margin-top:18px">Reply directly to this email to answer the buyer.</p>
</body></html>`;

  const text = [
    "New website inquiry (www.filcloth.com)",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Specification & requirements:",
    msg,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject, html, text, reply_to: email }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Resend error", res.status, detail.slice(0, 500));
      return json({ ok: false, error: "Mail service rejected the request." }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error("Resend request failed", err);
    return json({ ok: false, error: "Mail service unreachable." }, 502);
  }
}

// 非 POST 请求统一拒绝，避免误用
export async function onRequest({ request }) {
  if (request.method === "POST") return; // 交给 onRequestPost
  return json({ ok: false, error: "Method not allowed." }, 405);
}
