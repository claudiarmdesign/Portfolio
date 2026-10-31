/* Hoja de Camelia (proyecto con capítulos): construye el cuerpo de la hoja con paneles editoriales.
   Uso: CAMELIA.render(p, { t, E, pn }) devuelve el HTML; CAMELIA.init() activa el índice y el vídeo del recorrido. */
(function(){
  const A = "img/camelia/";
  const TX = {
    es: {
      logo: "Logo",
      revista: "Revista", paleta: "Paleta cromática · Tipografía · Grid · Wireframes", redes: "Redes sociales", revistaAlt: "Revista abierta con el logotipo de Camelia y una fotografía de proyecto", paletaAlt: "Paleta cromática, tipografías y wireframes de la marca sobre maquetas de móvil", redesAlt: "Perfil de Instagram de Camelia dentro de un móvil",
      pend: "Imagen pendiente", cred: "Identidad de marca creada por María Almeida", credIg: "IG: marialmeida___", rec: "Recorrido de compra", recAlt: "Vídeo del proceso de compra en la tienda: se elige una sudadera, se ven sus dos colores, se añade al carrito y se completa el pedido hasta la pantalla de gracias", hifiAlt: "Vídeo con las pantallas de alta fidelidad de la web dentro de un portátil", wires: "Wireframes · móvil", wiresAlt: "Vídeo con los wireframes de la web en versión móvil, pantalla a pantalla", arqL: "Arquitectura de la información", arqAlt: "Menú de la web de Camelia con las secciones Inicio, Estudio, Metodología, Servicios, Proyectos, Shop, Blog y Contacto", ref: "Webs de referencia", refAlt: "Seis webs de estudios de interiorismo y arquitectura vistas en móvil",
      sl: { portada: ["Portada", "Imagen principal de la hoja, en horizontal (escritorio) y en vertical (móvil)"], },
      wire: "Wireframe", hifi: "Alta fidelidad · desktop", inicio: "Inicio",
      verProto: "Ver prototipo en Figma", trio: "Escritorio · tablet · móvil", recorrido: "Recorrido", toda: "toda la web", escritorio: "Escritorio", tablet: "Tablet", movil: "Móvil", capitulos: "Capítulos",
      heroAlt: "Tres móviles con la web de Camelia (portada, proyectos y contacto) sobre un papel con rayas ocres y terracota", metodologia: "Metodología", contacto: "Contacto", logoAlt: "Logotipo de Camelia Interiorismo",
    },
    en: {
      logo: "Logo",
      revista: "Magazine", paleta: "Colour palette · Typography · Grid · Wireframes", redes: "Social media", revistaAlt: "Open magazine with the Camelia logotype and a project photograph", paletaAlt: "Brand colour palette, typefaces and wireframes on phone mockups", redesAlt: "Camelia Instagram profile inside a phone",
      pend: "Image pending", cred: "Brand identity created by María Almeida", credIg: "IG: marialmeida___", rec: "Purchase journey", recAlt: "Video of the shop purchase process: a hoodie is chosen, both colours are shown, it is added to the cart and the order is completed up to the thank-you screen", hifiAlt: "Video of the website high-fidelity screens inside a laptop", wires: "Wireframes · mobile", wiresAlt: "Video of the website wireframes in mobile version, screen by screen", arqL: "Information architecture", arqAlt: "Camelia website menu with the sections Home, Studio, Methodology, Services, Projects, Shop, Blog and Contact", ref: "Reference websites", refAlt: "Six interior design and architecture studio websites seen on mobile",
      sl: { portada: ["Cover", "Main image of the page, horizontal (desktop) and vertical (mobile)"], },
      wire: "Wireframe", hifi: "High fidelity · desktop", inicio: "Home",
      verProto: "View prototype in Figma", trio: "Desktop · tablet · mobile", recorrido: "Tour", toda: "whole site", escritorio: "Desktop", tablet: "Tablet", movil: "Mobile", capitulos: "Chapters",
      heroAlt: "Three phones showing the Camelia website (home, projects and contact) on paper with ochre and terracotta stripes", metodologia: "Methodology", contacto: "Contact", logoAlt: "Camelia Interiorismo logotype",
    },
  };

  const cap = (a, b = "") => `<span class="cap">${a}</span>${b ? `<span class="cap r">${b}</span>` : ""}`;

  function render(p, o){
    const { t, E, pn } = o, L = TX[PORT.lang] || TX.es, F = p.procesoFases;

    const proto = p.prototipo ? `<div class="pair prow"><span></span><p class="protob"><a class="pill" href="${p.prototipo}" target="_blank" rel="noopener">${L.verProto} ↗</a></p></div>` : "";
    const paras = x => E(x).split("\n\n").map(q => `<p class="tx">${q}</p>`).join("");
    const sx = PORT.lang === "en" ? "-en" : "";
    const slot = k => `<div class="pn1 slot ar-4-5">${cap(L.pend)}<div class="in"><b>${E(L.sl[k][0])}</b><span>${E(L.sl[k][1])}</span></div></div>`;
    const pr = (a, b) => `<div class="pair">${a}${b}</div>`;
    const wfvid = `<div class="pn1 fp ar-4-5">${cap(L.wires)}<video class="fill" muted loop playsinline preload="none" poster="${A}wf-movil-poster.webp" data-src="${A}wf-movil-v.mp4?v=2" aria-label="${E(L.wiresAlt)}"></video></div>`;
    const hfvid = `<div class="pn1 fp ar-4-5">${cap(L.hifi)}<video class="fill" muted loop playsinline preload="none" poster="${A}hf-laptop-poster.webp" data-src="${A}hf-laptop-v.mp4?v=2" aria-label="${E(L.hifiAlt)}"></video></div>`;
    const fill = (img, a, alt, words = "", ar = "ar-4-5", credit = false) => `<div class="pn1 fp ${ar}${credit ? " cr" : ""}">${cap(a)}<img class="fill" src="${A}${img}" alt="${E(alt)}" loading="lazy">${credit ? `<span class="credit"><b>${E(L.cred)}</b><i>${E(L.credIg)}</i></span>` : ""}</div>`;

    const chapter = (n, k, extra, cls = "") => `<section class="chap ${cls}" id="c${n}"><div class="ct"><small>${String(n).padStart(2, "0")} · ${E(F[k][0])}</small>${E(F[k][1]).split("\n\n").map(q => `<p>${q}</p>`).join("")}</div>${extra}</section>`;
    const heroImg = `<div class="pn1 ar-4-5"><img class="fill" src="${A}hoja-portada-v.webp" alt="${E(L.heroAlt)}"></div>`;
    // escritorio: datos en columna y foto a la derecha; por debajo de 900 px, fila de datos arriba y la foto abajo a la derecha (como el resto de proyectos)
    const hero = `<div class="cv-wide"><div class="pair hero3"><div class="hinfo top">${o.metaCol}</div>${heroImg}</div></div><div class="cv-narrow">${o.meta}<div class="pair hero3"><span class="sp" aria-hidden="true"></span>${heroImg}</div></div>`;
    const dec = `<ul class="lst">${p.decisiones.map(x => `<li>${E(x)}</li>`).join("")}</ul>`;

    return `<div class="f2">
      ${hero}
      ${PORT.resumen(p)}
      <section class="sec"><h2>${t("reto")}</h2><div class="c">${paras(p.reto)}</div></section>
      <section class="sec"><h2>${t("solucion")}</h2><div class="c"><p class="tx">${E(p.solucion)}</p><div class="ed">${pr(fill("logo.webp", L.logo, L.logoAlt, "", "ar-4-5", true), fill("redes.webp", L.redes, L.redesAlt, "", "ar-4-5", true))}</div></div></section>
      <section class="sec"><h2>${t("proceso")}</h2><div class="c"><p class="tx">${E(p.procesoIntro)}</p></div></section>
      <div class="chs"><nav class="cnav" aria-label="${E(L.capitulos)}">${F.map((f, k) => `<a href="#c${k + 1}"><i>${String(k + 1).padStart(2, "0")}</i>${E(f[0])}</a>`).join("")}</nav>
        <div>
        ${chapter(1, 0, `<div class="ed">${fill("referencias.webp", L.ref, L.refAlt)}</div>`, "side")}
        ${chapter(2, 1, "")}
        ${chapter(3, 2, "")}
        ${chapter(4, 3, `<div class="ed"><div class="pair">${fill("priorizar-menu.webp", L.arqL, L.arqAlt)}</div></div>`)}
        ${chapter(5, 4, `<div class="ed"><div class="pair">${fill("paleta.webp", L.paleta, L.paletaAlt)}</div>${pr(wfvid, hfvid)}${proto}</div>`)}
        ${chapter(6, 5, "")}</div></div>
      <section class="sec"><h2>${t("decisiones")}</h2><div class="c">${dec}</div></section>
      <section class="sec"><h2>${t("resultado")}</h2><div class="c">${[p.resultado, p.resultadoFin, p.aprendi].map(x => `<p class="tx">${E(x)}</p>`).join("")}</div></section>
      <div class="fin">${pn}</div></div>`;
  }

  function init(){
    const nav = [...document.querySelectorAll(".cnav a")];
    if(nav.length){ const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting) nav.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id)); }), { rootMargin:"-35% 0px -55% 0px" }); document.querySelectorAll(".chap").forEach(c => io.observe(c)); }
    const vids = [...document.querySelectorAll("video[data-src]")];
    // botón de pausa en cada vídeo (accesibilidad): si se pausa a mano, no se reanuda solo
    const LP = PORT.lang === "en" ? ["Pause video", "Play video"] : ["Pausar vídeo", "Reproducir vídeo"];
    vids.forEach(v => { const host = v.closest(".pn1"); if(!host || host.querySelector(".vpause")) return; const b = document.createElement("button"); b.type = "button"; b.className = "vpause"; b.setAttribute("aria-label", LP[0]); b.innerHTML = '<i></i><i></i>';
      b.addEventListener("click", () => { const stop = !v.paused; if(stop){ v.pause(); v.dataset.manual = "1"; } else { delete v.dataset.manual; v.play().catch(() => {}); } host.classList.toggle("paused", stop); b.setAttribute("aria-label", stop ? LP[1] : LP[0]); });
      host.appendChild(b); });
    // ver en grande: botón de ampliar en cada vídeo y, en pantallas pequeñas o táctiles, también al pulsar el vídeo
    const ZT = PORT.lang === "en" ? ["View larger", "Close"] : ["Ver en grande", "Cerrar"];
    let dlg = null;
    const abre = v => {
      if(!dlg){
        dlg = document.createElement("dialog"); dlg.className = "vdlg"; dlg.setAttribute("aria-label", ZT[0]);
        dlg.innerHTML = `<button type="button" class="vclose">${ZT[1]} ✕</button><video controls playsinline loop></video>`;
        document.body.appendChild(dlg);
        dlg.querySelector(".vclose").addEventListener("click", () => dlg.close());
        dlg.addEventListener("click", e => { if(e.target === dlg) dlg.close(); });
        dlg.addEventListener("close", () => { const bv = dlg.querySelector("video"); bv.pause(); bv.removeAttribute("src"); bv.load(); const o = dlg._o; if(o && !o.dataset.manual) o.play().catch(() => {}); });
      }
      const bv = dlg.querySelector("video"); dlg._o = v; v.pause();
      bv.setAttribute("aria-label", v.getAttribute("aria-label") || ""); bv.poster = v.poster || ""; bv.src = v.currentSrc || v.dataset.src; bv.currentTime = v.currentTime || 0;
      dlg.showModal(); bv.play().catch(() => {});
    };
    const small = matchMedia("(max-width:700px), (hover:none)");
    vids.forEach(v => { const host = v.closest(".pn1"); if(!host) return;
      const z = document.createElement("button"); z.type = "button"; z.className = "vzoom"; z.setAttribute("aria-label", ZT[0]);
      z.innerHTML = '<svg viewBox="0 0 16 16" fill="none" stroke="#0b0b0b" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 2h4v4M6 14H2v-4M14 2l-4.5 4.5M2 14l4.5-4.5"/></svg>';
      z.addEventListener("click", e => { e.stopPropagation(); abre(v); }); host.appendChild(z);
      host.addEventListener("click", e => { if(small.matches && !e.target.closest("button")) abre(v); }); });
    if(PORT.reduced){ vids.forEach(x => { x.src = x.dataset.src; x.preload = "metadata"; }); return; }
    const io2 = new IntersectionObserver(es => es.forEach(e => { const x = e.target; if(e.isIntersecting){ if(!x.src) x.src = x.dataset.src; if(!x.dataset.manual) x.play().catch(() => {}); } else x.pause(); }), { threshold: .2 });
    vids.forEach(x => io2.observe(x));
  }
  window.CAMELIA = { render, init };
})();
