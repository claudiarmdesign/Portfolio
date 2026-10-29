/* «Tuchati Assistant»: conversación simulada (réplica de la interfaz del producto). El diálogo es el de la hoja del portfolio anterior.
   ASIST.markup(L) → HTML; ASIST.mount(el, { lang, auto }) → activa la interacción; auto reproduce la conversación completa sola (para grabar el vídeo). */
(function(){
  const IC = { min: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg>', x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/><path d="M6 12h16"/></svg>',
    sp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1"/></svg>' };
  const TX = {
    es: { replay: "Volver a ver ↺", sim: "Conversación simulada", hint: "Prueba «Already living in Spain»", aria: "Asistente de Tuchati: conversación simulada e interactiva" },
    en: { replay: "Replay ↺", sim: "Simulated conversation", hint: "Try “Already living in Spain”", aria: "Tuchati assistant: simulated interactive conversation" },
  };
  const C = { q: "I had a small car accident and I need to tell my insurance company, but my Spanish isn't good enough. Can you help?",
    a1: "I'm sorry to hear that. I hope you're okay. Your insurer will usually ask for the accident report, your policy number and photos of the damage. I can explain each step, or one of our advisors can call your insurer in Spanish for you.",
    card: ["One Request", "An advisor handles this for you, from start to finish.", "Request assistance"], u2: "Yes, please. Can someone call them for me?",
    a2: "Of course. I've prepared your request with what you've told me. An advisor will contact you within 24 working hours." };
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function markup(lang, full){
    const L = TX[lang] || TX.es;
    return `<div class="asi${full ? " full" : ""}" role="group" aria-label="${esc(L.aria)}"><header><span class="av"><img src="img/tuchati/asistente-icono.png" alt=""></span><div class="tt"><b>Tuchati Assistant</b><span>Here to help with your life in Spain</span></div><div class="wc" aria-hidden="true"><i>${IC.min}</i><i>${IC.x}</i></div></header>
      <div class="body" aria-live="polite"><div class="welcome"><h4>Welcome to Tuchati</h4><p>How can I help you today?</p><button type="button" class="opt" data-o="move" aria-disabled="true">Moving to Spain</button><button type="button" class="opt" data-o="live">Already living in Spain</button><button type="button" class="opt link" data-o="else" aria-disabled="true">Something else</button></div></div>
      <form onsubmit="return false"><div class="in" aria-hidden="true"><span>Ask a question…</span></div><span class="send" aria-hidden="true">${IC.send}</span></form>
      <div class="note"><span class="ns">${esc(L.sim)}</span></div></div>`;
  }
  function mount(host, o = {}){
    const lang = o.lang === "en" ? "en" : "es", L = TX[lang], root = host.querySelector(".asi"), body = root.querySelector(".body"), inp = root.querySelector(".in"), send = root.querySelector(".send"), note = root.querySelector(".note");
    let busy = false, run = 0;
    const down = () => { body.scrollTo({ top: body.scrollHeight, behavior: matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth" }); };
    const add = (cls, html) => { const d = document.createElement("div"); d.className = cls; d.innerHTML = html; body.appendChild(d); down(); return d; };
    const wait = async ms => { const t = run; await sleep(o.fast ? ms / 4 : ms); return t === run; };
    const typeIn = async text => { inp.classList.add("typing"); inp.innerHTML = "<span></span>"; const s = inp.firstChild; for(const ch of text){ s.textContent += ch; if(s.textContent.length > 28) s.textContent = "…" + s.textContent.slice(-27); await sleep(o.fast ? 6 : 22); } send.classList.add("on"); await sleep(o.fast ? 60 : 380); send.classList.remove("on"); inp.classList.remove("typing"); inp.innerHTML = "<span>Ask a question…</span>"; };
    async function flow(first){
      const t = ++run; busy = true; note.innerHTML = `<span class="ns">${esc(L.sim)}</span>`;
      body.innerHTML = ""; add("m u", "Already living in Spain"); if(!await wait(first ? 700 : 500)) return;
      await typeIn(C.q); if(t !== run) return; add("m u", esc(C.q)); if(!await wait(500)) return;
      const th = add("m a th", IC.sp + "<span>Thinking…</span>"); if(!await wait(1500)) return; th.remove();
      add("m a", esc(C.a1)); if(!await wait(900)) return;
      const card = add("card", `<b>${esc(C.card[0])}</b><span>${esc(C.card[1])}</span><button type="button">${esc(C.card[2])}</button>`);
      const btn = card.querySelector("button"); busy = false;
      const second = async () => { if(btn.disabled) return; btn.disabled = true; busy = true; if(!await wait(500)) return; await typeIn(C.u2); if(t !== run) return; add("m u", esc(C.u2)); if(!await wait(500)) return;
        const th2 = add("m a th", IC.sp + "<span>Thinking…</span>"); if(!await wait(1300)) return; th2.remove(); add("m a", esc(C.a2)); busy = false;
        note.innerHTML = `<span class="ns">${esc(L.sim)}</span><button type="button">${esc(L.replay)}</button>`; note.querySelector("button").addEventListener("click", () => flow(false)); };
      btn.addEventListener("click", second);
      if(o.auto){ if(!await wait(1700)) return; btn.classList.add("press"); await second(); }
    }
    root.querySelector('[data-o="live"]').addEventListener("click", () => { if(!busy) flow(true); });
    root.querySelectorAll('[aria-disabled="true"]').forEach(b => b.addEventListener("click", () => { if(busy) return; note.innerHTML = `<span class="ns">${esc(L.hint)}</span>`; }));
    if(o.auto){ (async () => { await sleep(o.start || 1500); root.querySelector('[data-o="live"]').click(); })(); }
    return { replay: () => flow(false) };
  }
  window.ASIST = { markup, mount };
})();
