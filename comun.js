/* Piezas compartidas: marca, reloj, carga inicial y mockups. */
(function(){
  const D = window.DATOS;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const q = k => new URLSearchParams(location.search).get(k);

  // Language: ?lang=en|es, remembered in the browser. English overrides the Spanish text in place.
  const store = { get(){ try{ return localStorage.getItem("lang"); }catch(_){ return null; } }, set(v){ try{ localStorage.setItem("lang", v); }catch(_){} } };
  if(["es", "en"].includes(q("lang"))) store.set(q("lang"));
  const lang = store.get() === "en" ? "en" : "es";
  document.documentElement.lang = lang;
  if(lang === "en"){
    const en = D.en; Object.assign(D.yo, en.yo);
    D.proyectos.forEach(p => Object.assign(p, en.p[p.slug] || {}));
  }
  const ES_UI = { vista: "Vista", galeria: "Galería", lista: "Lista", sobre: "Sobre mí", ayuda: "o rueda para cambiar · clic para abrir", menu: "Menú", proyectos: "Proyectos", todos: "← Proyectos",
    s_sobre: "Sobre mí", s_hab: "Habilidades y herramientas", s_habs: "Habilidades", s_serv: "Servicios", cta: "Cuéntame tu proyecto →", s_exp: "Experiencia", s_for: "Formación", s_idi: "Idiomas", s_cont: "Contacto",
    proyecto: "Proyecto", rol: "Rol", estado: "Estado", fecha: "Fecha", herramientas: "Herramientas", enlace: "Enlace", prototipo: "Prototipo", completado: "Completado",
    reto: "Reto", proceso: "Proceso", solucion: "Solución", decisiones: "Decisiones", resultado: "Resultado", info: "Información",
    prep: "La información de este proyecto está en preparación.", prep_corto: "Información en preparación", anterior: "Anterior", siguiente: "Siguiente", idioma: "Idioma",
    imagen: "Imagen principal de", retrato: "Retrato de", pantalla: "pantalla", carga: "Cargando el portfolio" };
  // keep --bar equal to the real header height (it grows to two rows on phones)
  const bar = document.querySelector(".bar");
  if(bar){ const setBar = () => document.documentElement.style.setProperty("--bar", bar.offsetHeight + "px"); setBar(); if(window.ResizeObserver) new ResizeObserver(setBar).observe(bar); else addEventListener("resize", setBar); }
  const t = k => (lang === "en" ? D.en.ui[k] : ES_UI[k]) || ES_UI[k] || k;

  // Round "ES" button with a small dropdown to switch language
  function idioma(el){
    el.className = "dd"; el.id = "dd-idioma";
    el.innerHTML = `<button class="pill circ" aria-haspopup="true" aria-expanded="false" aria-label="${esc(t("idioma"))}">${lang.toUpperCase()}</button><div class="panel mini-p" role="menu"><button role="menuitemradio" aria-checked="${lang === "es"}" data-l="es">ES</button><button role="menuitemradio" aria-checked="${lang === "en"}" data-l="en">EN</button></div>`;
    el.querySelectorAll("[data-l]").forEach(b => b.addEventListener("click", () => { if(b.dataset.l === lang) return; store.set(b.dataset.l); const u = new URL(location.href); u.searchParams.delete("lang"); location.href = u.toString(); }));
  }

  const marca = "Claudia Ramírez";

  // Mockups. The screen scrolls by itself; offset per device so two on screen never move in step
  function laptop(src, alt, i = 0){
    return `<div class="dev laptop" style="--d:${-i * 3.1}s"><div class="lid"><div class="dev-screen"><img src="${src}" alt="${esc(alt || "")}" loading="lazy"></div></div><div class="base" aria-hidden="true"></div></div>`;
  }
  function phone(src, alt, i = 0){
    return `<div class="dev phone" style="--d:${-i * 4.3}s;--t:30s"><div class="dev-screen"><img src="${src}" alt="${esc(alt || "")}" loading="lazy"></div></div>`;
  }

  function reloj(el){
    if(!el) return;
    const f = () => { el.textContent = new Date().toLocaleString("es-ES", { day:"numeric", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" }).replace(",", ""); };
    f(); setInterval(f, 30000);
  }

  // The brand name in the header, with her small photo that appears under the cursor
  function quien(el, href = "index.html"){
    el.className = "who-w";
    el.innerHTML = `<a class="who" href="${href}">${esc(marca)}</a><span class="who-foto" aria-hidden="true"><img src="${D.yo.foto}" alt=""></span>`;
  }

  // Mini "photo" of a project: its main image when it has one, otherwise its own site inside a laptop, still.
  const mini = p => p.cover
    ? `<div class="mini"><img class="cov" src="${p.cover}" alt=""></div>`
    : p.listo
      ? `<div class="mini"><div class="mini-l">${laptop(p.laptop[0], "")}</div></div>`
      : `<div class="mini tile"><span>${esc(p.corto)}</span></div>`;

  // Dropdowns (.dd): one open at a time, close on outside click or Esc
  let ddOn = false;
  function menus(){
    const cierra = () => document.querySelectorAll(".dd").forEach(x => { x.classList.remove("open"); x.querySelector("button").setAttribute("aria-expanded", "false"); });
    document.querySelectorAll(".dd").forEach(dd => {
      const b = dd.querySelector("button");
      b.addEventListener("click", e => { e.stopPropagation(); const o = dd.classList.contains("open"); cierra(); if(!o){ dd.classList.add("open"); b.setAttribute("aria-expanded", "true"); } });
    });
    if(!ddOn){ ddOn = true; addEventListener("click", cierra); addEventListener("keydown", e => { if(e.key === "Escape") cierra(); }); }
  }

  // Loader: a greeting that cycles through languages (ends on «Hola») and, next to it, a mini photo of each project in turn with its name underneath.
  // el cargador sale al entrar en el portfolio (primera página de la pestaña) o al recargar; no al volver atrás ni al moverse por dentro
  let visto = false; try{ visto = sessionStorage.getItem("port-dentro") === "1"; sessionStorage.setItem("port-dentro", "1"); }catch(e){}
  const recarga = (performance.getEntriesByType("navigation")[0] || {}).type === "reload";
  // «hola» en tantos idiomas como caben en la carga; empieza y acaba en castellano
  const HOLA = [["Hola", "es"], ["Hello", "en"], ["Bonjour", "fr"], ["Ciao", "it"], ["Hallo", "de"], ["Olá", "pt"], ["你好", "zh"], ["こんにちは", "ja"], ["Kaixo", "eu"], ["Привет", "ru"], ["مرحبا", "ar", "rtl"], ["Bon dia", "ca"], ["नमस्ते", "hi"], ["Γεια σου", "el"], ["안녕하세요", "ko"], ["Merhaba", "tr"], ["Hej", "sv"], ["Ola", "gl"], ["שלום", "he", "rtl"], ["Aloha", "haw"], ["Moi", "fi"], ["Cześć", "pl"], ["Jambo", "sw"], ["สวัสดี", "th"], ["Szia", "hu"], ["Xin chào", "vi"], ["Salut", "ro"], ["Hola", "es"]];
  function carga(done, ms = 3600){
    const quiet = reduced || /[?&]carga=0/.test(location.search) || (visto && !recarga);
    if(quiet){ document.body.classList.remove("cargando"); done && done(); return; }
    const ps = D.proyectos, N = ps.length;
    const el = document.createElement("div");
    el.className = "carga"; el.setAttribute("role", "status"); el.setAttribute("aria-label", t("carga"));
    el.innerHTML = `<div class="ctop" aria-hidden="true"><span>${esc(marca)}</span><span>Portfolio '26</span></div>
      <div class="c1" aria-hidden="true"><div class="cn"><span id="cn" lang="es">Hola</span></div><div class="cfoto">${ps.map((p, i) => `<div class="cf" data-i="${i}">${mini(p)}</div>`).join("")}</div></div>
      <div class="cpie" aria-hidden="true"><b id="cp"></b></div>`;
    document.body.classList.add("cargando"); document.body.prepend(el);
    const n = el.querySelector("#cn"), pie = el.querySelector("#cp"), items = [...el.querySelectorAll(".cf")];
    const t0 = performance.now(); let over = false, cur = -1;
    const out = () => { if(over) return; over = true; el.classList.add("fuera"); document.body.classList.remove("cargando"); setTimeout(() => { el.remove(); done && done(); }, 1050); };
    let g = -1;
    (function tick(now){
      const t = Math.max(0, Math.min((now - t0) / ms, 1));
      const gi = Math.min(HOLA.length - 1, Math.floor(t * HOLA.length));
      if(gi !== g){ g = gi; n.textContent = HOLA[gi][0]; n.lang = HOLA[gi][1]; n.dir = HOLA[gi][2] || "ltr"; }
      const k = Math.min(N - 1, Math.floor(t * N));
      if(k !== cur){ cur = k; items.forEach((f, i) => f.classList.toggle("on", i === k)); pie.textContent = ps[k].nombre + "  " + String(k + 1).padStart(2, "0") + " / " + String(N).padStart(2, "0"); }
      if(t < 1) requestAnimationFrame(tick); else setTimeout(out, 420);
    })(t0);
    addEventListener("keydown", e => { if(e.key === "Escape") out(); }, { once:true });
    el.addEventListener("click", out);
  }

  window.PORT = { laptop, phone, mini, reloj, carga, quien, idioma, menus, t, lang, esc, q, reduced, marca };
})();
