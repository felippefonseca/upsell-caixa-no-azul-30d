export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const pixelId = '311413340280663';
  const accessToken = process.env.META_CAPI_TOKEN;

  if (!accessToken) {
    return res.status(200).json({ ok: false, reason: 'META_CAPI_TOKEN não configurado' });
  }

  const { eventName, eventId, sourceUrl } = req.body || {};

  if (!eventName || !eventId) {
    return res.status(400).json({ error: 'eventName e eventId são obrigatórios' });
  }

  const userAgent = req.headers['user-agent'];
  const forwardedFor = req.headers['x-forwarded-for'];
  const ip = Array.isArray(forwardedFor) ? forwardedFor[0] : (forwardedFor || req.socket?.remoteAddress || '').split(',')[0].trim();

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: 'website',
        event_source_url: sourceUrl,
        user_data: {
          client_ip_address: ip,
          client_user_agent: userAgent
        }
      }
    ]
  };

  try {
    const response = await fetch(`https://graph.facebook.com/v20.0/${pixelId}/events?access_token=${accessToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return res.status(response.ok ? 200 : 500).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
