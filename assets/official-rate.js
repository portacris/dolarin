(() => {
  const PLAY_URL = "https://play.google.com/store/apps/details?id=com.dolarin.bolivia";
  const SOURCE_URL = "https://www.bcb.gob.bo/librerias/indicadores/dolar/bolsin.php";
  const MIRROR_URL = "https://r.jina.ai/http://www.bcb.gob.bo/librerias/indicadores/dolar/bolsin.php";
  const months = { enero:0, febrero:1, marzo:2, abril:3, mayo:4, junio:5, julio:6, agosto:7, septiembre:8, setiembre:8, octubre:9, noviembre:10, diciembre:11 };
  function parseRate(text) {
    const clean = String(text || "").replace(/\s+/g, " ");
    const rateMatch = clean.match(/vigente\s+desde[^:]*:\s*(?:\*{0,2}Bs\*{0,2}\s*)?([0-9]+(?:[.,][0-9]+)?)/i);
    const dateMatch = clean.match(/vigente\s+desde\s+(\d{1,2})\s+de\s+([A-Za-zÁÉÍÓÚÑáéíóúñ]+)\s+(\d{4})/i);
    if (!rateMatch) return null;
    const rate = Number(rateMatch[1].replace(",", "."));
    if (!Number.isFinite(rate) || rate < 5 || rate > 30) return null;
    let effectiveDate = null;
    if (dateMatch) {
      const month = months[dateMatch[2].toLocaleLowerCase("es-BO")];
      if (Number.isInteger(month)) effectiveDate = new Date(Number(dateMatch[3]), month, Number(dateMatch[1]), 12, 0, 0);
    }
    return { rate, effectiveDate };
  }
  function formatDate(date) {
    return date && !Number.isNaN(date.getTime()) ? new Intl.DateTimeFormat("es-BO", { day:"2-digit", month:"long", year:"numeric" }).format(date) : "la fecha informada por el BCB";
  }
  function createCard() {
    const hero = document.querySelector(".hero");
    if (!hero) return null;
    const card = document.createElement("section");
    card.className = "official-rate-card";
    card.setAttribute("aria-live", "polite");
    card.innerHTML = `<div class="official-rate-source"><span class="official-rate-kicker">COTIZACIÓN OFICIAL · BCB</span><strong id="official-rate-value">Consultando…</strong><span id="official-rate-date">Verificando la fecha de vigencia</span></div><div class="official-rate-actions"><a href="${PLAY_URL}">Ver más cotizaciones en Dolarín</a><small>Fuente: <a href="${SOURCE_URL}" rel="nofollow">Banco Central de Bolivia</a></small></div>`;
    hero.insertAdjacentElement("afterend", card);
    return card;
  }
  async function loadRate() {
    const card = createCard(); if (!card) return;
    const value = card.querySelector("#official-rate-value");
    const date = card.querySelector("#official-rate-date");
    try {
      const response = await fetch(`${MIRROR_URL}?_t=${Date.now()}`, { cache:"no-store" });
      if (!response.ok) throw new Error("BCB no disponible");
      const parsed = parseRate(await response.text());
      if (!parsed) throw new Error("Cotización no reconocida");
      value.textContent = `${parsed.rate.toFixed(2)} Bs`;
      date.textContent = `Vigente para el ${formatDate(parsed.effectiveDate)}`;
      card.classList.add("is-ready");
    } catch (_error) {
      value.textContent = "Consulta el dato vigente";
      date.textContent = "La fuente oficial no respondió en este momento";
      card.classList.add("is-unavailable");
    }
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", loadRate, { once:true }) : loadRate();
})();
