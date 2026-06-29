// Configure aqui os links reais do funil antes de publicar.
const CONFIG = {
  acceptLink: "https://SEU-LINK-DE-UPSELL-AQUI.com",
  declineLink: "https://SEU-LINK-DE-RECUSA-OU-OBRIGADO-AQUI.com"
};

function safeTrack(eventName, eventData) {
  if (typeof window.trackMetaCustomEvent === "function") {
    window.trackMetaCustomEvent(eventName, eventData);
  }
}

document.querySelectorAll(".js-accept").forEach((button) => {
  button.setAttribute("href", CONFIG.acceptLink);
  button.addEventListener("click", () => {
    safeTrack("UpsellCaixaNoAzul30D_AdicionarAoPedido", {
      action: "accept_upsell",
      content_name: "Caixa no Azul 30D",
      value: 347,
      currency: "BRL"
    });
  });
});

document.querySelectorAll(".js-decline").forEach((link) => {
  link.setAttribute("href", CONFIG.declineLink);
  link.addEventListener("click", () => {
    safeTrack("UpsellCaixaNoAzul30D_RecusouOferta", {
      action: "decline_upsell",
      content_name: "Caixa no Azul 30D",
      value: 0,
      currency: "BRL"
    });
  });
});
