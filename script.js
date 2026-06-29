const CONFIG = {
  acceptLink: "https://SEU-LINK-DE-UPSELL-AQUI.com",
  declineLink: "https://SEU-LINK-DE-RECUSA-OU-OBRIGADO-AQUI.com",
  pixelId: "311413340280663"
};

function getEventId(name) {
  return `${name}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

async function sendCapiEvent(eventName, eventId) {
  try {
    await fetch('/api/meta-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventName, eventId, sourceUrl: window.location.href })
    });
  } catch (error) {
    console.warn('CAPI não enviado:', error);
  }
}

function trackAndRedirect(eventName, url) {
  const eventId = getEventId(eventName);
  if (typeof fbq === 'function') {
    fbq('trackCustom', eventName, {}, { eventID: eventId });
  }
  sendCapiEvent(eventName, eventId).finally(() => {
    window.location.href = url;
  });
}

document.querySelectorAll('[data-accept-offer]').forEach((button) => {
  button.addEventListener('click', () => {
    trackAndRedirect('UpsellCaixaNoAzul30D_AdicionarAoPedido', CONFIG.acceptLink);
  });
});

document.querySelectorAll('[data-decline-offer]').forEach((button) => {
  button.addEventListener('click', () => {
    trackAndRedirect('UpsellCaixaNoAzul30D_RecusouOferta', CONFIG.declineLink);
  });
});
