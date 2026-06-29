const PIXEL_ID = "311413340280663";

function getEventId(name) {
  return `${name}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

async function sendCapiEvent(eventName, eventId, extra = {}) {
  try {
    await fetch('/api/meta-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventName, eventId, sourceUrl: window.location.href, ...extra })
    });
  } catch (error) {
    console.warn('CAPI não enviado:', error);
  }
}

function trackCustom(eventName, extra = {}) {
  const eventId = getEventId(eventName);
  if (typeof fbq === 'function') {
    fbq('trackCustom', eventName, extra, { eventID: eventId });
  }
  sendCapiEvent(eventName, eventId, extra);
}

document.querySelectorAll('[data-scroll-to-offer]').forEach((button) => {
  button.addEventListener('click', () => {
    trackCustom('UpsellCaixaNoAzul30D_ClicouCTAVisual');
    document.querySelector('#oferta')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// O widget oficial da Hotmart processa aceitar/recusar a oferta.
// Este evento mede apenas interação com a área do widget; a conversão real deve ser conferida na Hotmart.
const hotmartFunnel = document.getElementById('hotmart-sales-funnel');
if (hotmartFunnel) {
  hotmartFunnel.addEventListener('click', () => {
    trackCustom('UpsellCaixaNoAzul30D_InteragiuWidgetHotmart');
  }, { capture: true });
}

window.addEventListener('load', () => {
  trackCustom('ViewUpsellCaixaNoAzul30D_Loaded');
});
