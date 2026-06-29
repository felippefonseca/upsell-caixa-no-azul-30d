function parseCookies(cookieHeader = "") {
  return cookieHeader.split(";").reduce((cookies, cookie) => {
    const [rawName, ...rest] = cookie.trim().split("=");
    if (!rawName) return cookies;
    cookies[rawName] = decodeURIComponent(rest.join("=") || "");
    return cookies;
  }, {});
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const pixelId = process.env.META_PIXEL_ID || "311413340280663";
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!accessToken) {
    return res.status(200).json({
      ok: false,
      skipped: true,
      reason: "Configure META_ACCESS_TOKEN nas variáveis de ambiente da Vercel."
    });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
  const cookies = parseCookies(req.headers.cookie || "");

  const eventName = body.eventName || "ViewUpsellCaixaNoAzul30D";
  const eventId = body.eventId || `${eventName}_${Date.now()}`;
  const eventData = body.eventData || {};
  const sourceUrl = body.url || req.headers.referer || "";

  const event = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: "website",
    event_source_url: sourceUrl,
    user_data: {
      client_user_agent: req.headers["user-agent"] || undefined,
      fbp: cookies._fbp || undefined,
      fbc: cookies._fbc || undefined
    },
    custom_data: {
      currency: eventData.currency || "BRL",
      value: Number(eventData.value ?? 347),
      content_name: eventData.content_name || eventData.product || "Caixa no Azul 30D",
      product: eventData.product || "Caixa no Azul 30D",
      funnel: eventData.funnel || "PMO Upsell 1",
      action: eventData.action || undefined
    }
  };

  try {
    const fbResponse = await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [event] })
    });

    const result = await fbResponse.json();
    return res.status(fbResponse.ok ? 200 : 400).json({ ok: fbResponse.ok, result });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
}
