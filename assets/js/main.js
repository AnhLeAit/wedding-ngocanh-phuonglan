/* =====================================================================
   Ngọc Anh ❤ Phương Lan — main.js
   Personalization · language · slideshows · countdown · music
   ===================================================================== */
(function () {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---- Language state ---- */
  let lang = "vi";                       // 'vi' | 'en'
  const t = (o) => (o && (o[lang] ?? o.vi)) || "";

  /* ---- URL parameters (personalization) ----
     ?name=  invitee name
     ?title= honorific / contact title (Anh, Chị, Ông Bà, Mr, Ms…)
     ?contact= optional note / relationship shown under the name
     ?type=  bride | groom  (which side hosts — highlights the gift card) */
  const params = new URLSearchParams(location.search);
  const guest = {
    name:    (params.get("name") || "").trim(),
    title:   (params.get("title") || "").trim(),
    self:    (params.get("self") || "").trim(),
    contact: (params.get("contact") || "").trim(),
    compact: params.get("compact") === "1",
    // "" (empty/null → show both), "groom", or "bride"
    type:    (() => { const v = (params.get("type") || "").trim().toLowerCase(); return (v === "bride" || v === "groom") ? v : ""; })(),
  };

  /* ================================================================
     LANGUAGE
     ================================================================ */
  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-vi]").forEach((el) => (el.hidden = lang !== "vi"));
    $$("[data-en]").forEach((el) => (el.hidden = lang !== "en"));
    const btn = $("#lang-toggle");
    if (btn) btn.textContent = lang === "vi" ? "EN" : "VI";
    renderText();          // rebuild dynamic (translated) content
  }
  $("#lang-toggle").addEventListener("click", () => {
    lang = lang === "vi" ? "en" : "vi";
    applyLang();
  });

  /* ================================================================
     STATIC COUPLE INFO
     ================================================================ */
  const C = CONFIG;
  function setText(id, v) { const e = $("#" + id); if (e) e.textContent = v; }

  function renderNames() {
    const g = t(C.couple.groom.name), b = t(C.couple.bride.name);
    ["enter-groom", "hero-groom", "card-groom"].forEach((id) => setText(id, g));
    ["enter-bride", "hero-bride", "card-bride"].forEach((id) => setText(id, b));
    setText("footer-names", g + " & " + b);
    setText("hero-date", C.couple.displayDate);
    // families
    setText("groom-father", C.couple.groom.father);
    setText("groom-mother", C.couple.groom.mother);
    setText("groom-home", t(C.couple.groom.hometown));
    setText("bride-father", C.couple.bride.father);
    setText("bride-mother", C.couple.bride.mother);
    setText("bride-home", t(C.couple.bride.hometown));
  }

  /* ================================================================
     DYNAMIC / TRANSLATED CONTENT  (re-run on language switch)
     ================================================================ */
  function renderText() {
    renderNames();
    renderHeroInvite();
    renderTimeline();
    renderInviteCard();
    renderLocationText();
    renderGift();
    // Headings that use the couple's self-reference (Tự xưng): "chúng mình/em/cháu/con"
    const selfLow = (guest.self || "Chúng mình").toLowerCase();
    setText("story-title", lang === "vi" ? "Hành trình của " + selfLow : "Our journey together");
    setText("gallery-eyebrow", lang === "vi" ? "Khoảnh khắc của " + selfLow : t(C.gallery.heading));
    setText("loc-eyebrow", t(C.location.heading));
    setText("gift-eyebrow", t(C.gift.heading));
  }

  /* ---- Personalized greeting ---- */
  function renderHeroInvite() {
    const box = $("#hero-invite");
    const lead = t(C.ceremony.invite);   // always "Trân trọng kính mời"
    const guestName = [guest.title, guest.name].filter(Boolean).join(" ").trim()
      || (lang === "vi" ? "Quý khách" : "Our dear guest");
    let html = `<div class="inv-lead">${lead}</div>`;
    html += `<div class="inv-guest">${escapeHtml(guestName)}</div>`;
    if (guest.contact) html += `<div class="inv-contact">${escapeHtml(guest.contact)}</div>`;
    const tail = lang === "vi" ? "Đến chung vui cùng gia đình" : "to celebrate with our family";
    html += `<div class="inv-lead" style="margin-top:.4rem">${tail}</div>`;
    box.innerHTML = html;
  }

  /* ---- Timeline ---- */
  function renderTimeline() {
    const wrap = $("#timeline");
    wrap.innerHTML = "";
    const selfRef = lang === "vi" ? (guest.self || "Chúng mình").toLowerCase() : "we";
    const titleRef = guest.title || (lang === "vi" ? "bạn" : "you");
    C.story.forEach((it, i) => {
      const item = document.createElement("div");
      item.className = "tl-item";
      item.setAttribute("data-reveal", "");
      item.style.transitionDelay = (i % 2 ? .08 : 0) + "s";
      const imgs = (it.imgs && it.imgs.length) ? it.imgs : (it.img ? [it.img] : []);
      const alt = escapeHtml(t(it.title));
      let photo = "";
      if (imgs.length === 1) {
        photo = `<div class="tl-photo"><img src="${imgs[0]}" alt="${alt}" loading="lazy"></div>`;
      } else if (imgs.length > 1) {
        const slides = imgs.map((src, k) =>
          `<div class="tl-slide${k === 0 ? " active" : ""}" role="img" aria-label="${alt}" style="background-image:url('${src}')"></div>`).join("");
        const dots = imgs.map((_, k) =>
          `<button class="${k === 0 ? "active" : ""}" data-i="${k}" aria-label="ảnh ${k + 1}"></button>`).join("");
        photo = `<div class="tl-slider">${slides}<div class="tl-dots">${dots}</div></div>`;
      }
      const textOnly = !photo && !it.poem && !t(it.title) && !t(it.date);
      item.innerHTML = `
        <span class="tl-dot"></span>
        <article class="tl-card${textOnly ? " tl-card--note" : ""}">
          ${photo}
          <div class="tl-body">
            ${t(it.date) ? `<p class="tl-date">${escapeHtml(t(it.date))}</p>` : ""}
            ${t(it.title) ? `<h3 class="tl-title">${escapeHtml(t(it.title))}</h3>` : ""}
            ${t(it.text) ? `<p class="tl-text">${escapeHtml(t(it.text)).replace(/\{self\}/g, escapeHtml(selfRef)).replace(/\{title\}/g, escapeHtml(titleRef))}</p>` : ""}
            ${it.poem ? poemBlockHTML() : ""}
          </div>
        </article>`;
      wrap.appendChild(item);
    });
    $$(".tl-slider", wrap).forEach(initCardSlider);
    observeReveal(wrap);
  }

  /* ---- Poem ---- */
  // Mini photo-slider inside a timeline card
  function initCardSlider(slider) {
    const slides = $$(".tl-slide", slider);
    const dots = $$(".tl-dots button", slider);
    if (slides.length < 2) return;
    let idx = 0, timer;
    const go = (n) => {
      slides[idx].classList.remove("active"); dots[idx].classList.remove("active");
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add("active"); dots[idx].classList.add("active");
    };
    const auto = () => { clearInterval(timer); timer = setInterval(() => go(idx + 1), 3500); };
    dots.forEach((d) => d.addEventListener("click", (e) => { e.stopPropagation(); go(+d.dataset.i); auto(); }));
    let sx = 0, sy = 0;
    slider.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    slider.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { go(idx + (dx < 0 ? 1 : -1)); auto(); }
    }, { passive: true });
    auto();
  }

  // Poem HTML, embedded inside the 2nd love-story card
  function poemBlockHTML() {
    const lines = lang === "vi" ? C.poem.lines_vi : C.poem.lines_en;
    const linesHtml = lines
      .map((l) => l === "" ? `<div class="pl blank"></div>` : `<div class="pl">${escapeHtml(l)}</div>`)
      .join("");
    return `<div class="tl-poem">
      <p class="tl-poem-heading">${escapeHtml(t(C.poem.heading))}</p>
      <div class="poem-lines">${linesHtml}</div>
      <p class="poem-note">${escapeHtml(t(C.poem.note))}</p>
    </div>`;
  }

  /* ---- Invitation card ---- */
  function renderInviteCard() {
    setText("card-invite", t(C.ceremony.invite));
    setText("card-closing", t(C.ceremony.closing));
    // Vu Quy
    const vq = C.ceremony.vuQuy;
    $("#cere-vuquy").innerHTML = `
      <p class="cere-label">${escapeHtml(t(vq.label))}</p>
      <p class="cere-time">${escapeHtml(t(vq.time))}</p>
      <p class="cere-lunar">${escapeHtml(t(vq.lunar))}</p>
      <p class="cere-place">${escapeHtml(t(vq.place))}</p>`;
    // Reception
    const r = C.ceremony.reception;
    $("#cere-reception").innerHTML = `
      <p class="cere-label">${escapeHtml(t(r.label))}</p>
      <p class="cere-time">${escapeHtml(t(r.time))}</p>
      <p class="cere-lunar">${escapeHtml(t(r.lunar))}</p>
      <p class="cere-venue">${escapeHtml(t(r.venue))}</p>
      <p class="cere-hall">${escapeHtml(t(r.hall))}</p>
      <p class="cere-addr">${escapeHtml(t(r.address))}</p>`;
    // Schedule
    $("#schedule").innerHTML = C.ceremony.schedule.map((s) => `
      <div class="sch-item">
        <div class="sch-icon">${s.icon}</div>
        <div class="sch-time">${escapeHtml(s.time)}</div>
        <div class="sch-label">${escapeHtml(t(s.label))}</div>
      </div>`).join("");
  }

  /* ---- Location ---- */
  function renderLocationText() {
    $("#map-frame").src = C.location.mapEmbed;
    $("#loc-qr-img").src = C.location.qrImage;
    setText("loc-qr-cap", t(C.location.qrCaption));
    $("#map-link").href = C.location.mapLink;
  }

  /* ---- VietQR (EMVCo TLV + CRC16-CCITT) ---- */
  const tlv = (id, value) => id + String(value.length).padStart(2, "0") + value;
  function crc16ccitt(s) {
    let crc = 0xffff;
    for (let i = 0; i < s.length; i++) {
      crc ^= s.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, "0");
  }
  function buildVietQRPayload({ bankBin, accountNumber, amount, addInfo }) {
    const merchant =
      tlv("00", "A000000727") +
      tlv("01", tlv("00", bankBin) + tlv("01", accountNumber)) +
      tlv("02", "QRIBFTTA");
    let payload =
      tlv("00", "01") +
      tlv("01", amount && amount > 0 ? "12" : "11") +   // 11 = static (0đ), 12 = dynamic
      tlv("38", merchant) +
      tlv("53", "704");                                  // VND
    if (amount && amount > 0) payload += tlv("54", String(Math.round(amount)));
    payload += tlv("58", "VN");
    if (addInfo) payload += tlv("62", tlv("08", addInfo));
    payload += "6304";
    return payload + crc16ccitt(payload);
  }
  const qrImageURL = (payload) =>
    "https://api.qrserver.com/v1/create-qr-code/?size=360x360&ecc=M&margin=1&data=" + encodeURIComponent(payload);
  // Strip Vietnamese accents & non-alphanumerics for the transfer description
  const slugPart = (s) => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D").replace(/[^A-Za-z0-9]/g, "");

  /* ---- Gift ---- */
  function renderGift() {
    // Address the guest by their title (Anh/Cô Chú/...) instead of "bạn" in Vietnamese
    let giftNote = t(C.gift.note);
    if (lang === "vi" && guest.title) giftNote = giftNote.replace(/bạn/g, guest.title);
    setText("gift-note", giftNote);

    // type=bride → only bride · type=groom → only groom · empty/null → both
    const sides = guest.type === "bride" ? ["bride"]
                : guest.type === "groom" ? ["groom"]
                : ["groom", "bride"];

    // Transfer content: <Title>-<Name>-<side suffix>
    const namePart = [slugPart(guest.title), slugPart(guest.name)].filter(Boolean).join("-");

    $("#gift-cards").innerHTML = sides.map((side) => {
      const g = C.gift[side];
      const addInfo = [namePart, g.addInfoSuffix].filter(Boolean).join("-");
      const payload = buildVietQRPayload({ bankBin: g.bankBin, accountNumber: g.account, amount: 0, addInfo });
      const qr = qrImageURL(payload);
      const highlight = side === guest.type ? " highlight" : "";
      return `
        <div class="gift-card${highlight}">
          <p class="gift-title">${escapeHtml(t(g.label))}</p>
          <div class="gift-qr"><img src="${qr}" alt="VietQR ${escapeHtml(g.bankName)}" loading="lazy" width="180" height="180"></div>
          <p class="gift-bank"><b>${escapeHtml(g.bankName)}</b> · ${escapeHtml(g.account)}</p>
          <p class="gift-holder">${escapeHtml(g.holder)}</p>
        </div>`;
    }).join("");
  }

  /* ================================================================
     HERO SLIDESHOW (Ken Burns crossfade)
     ================================================================ */
  function initHeroSlides() {
    const stage = $("#hero-slides");
    C.heroImages.forEach((src, i) => {
      const s = document.createElement("div");
      s.className = "slide" + (i === 0 ? " active" : "");
      s.style.backgroundImage = `url("${src}")`;
      stage.appendChild(s);
    });
    const slides = $$(".slide", stage);
    if (slides.length < 2) return;
    let idx = 0;
    setInterval(() => {
      slides[idx].classList.remove("active");
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add("active");
    }, 7500);
  }

  /* ================================================================
     GALLERY SLIDESHOW
     ================================================================ */
  function initGallery() {
    const track = $("#gallery-track");
    const dots = $("#gallery-dots");
    const imgs = C.gallery.images;
    track.innerHTML = imgs.map((src, i) =>
      `<div class="g-slide${i === 0 ? " active" : ""}" style="background-image:url('${src}')"></div>`).join("");
    dots.innerHTML = imgs.map((_, i) =>
      `<button class="${i === 0 ? "active" : ""}" data-i="${i}" aria-label="slide ${i + 1}"></button>`).join("");
    const slides = $$(".g-slide", track);
    const dotEls = $$("button", dots);
    let idx = 0, timer;
    function go(n) {
      slides[idx].classList.remove("active");
      dotEls[idx].classList.remove("active");
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add("active");
      dotEls[idx].classList.add("active");
    }
    function next() { go(idx + 1); }
    function auto() { clearInterval(timer); timer = setInterval(next, 5500); }
    $("#gal-next").addEventListener("click", () => { next(); auto(); });
    $("#gal-prev").addEventListener("click", () => { go(idx - 1); auto(); });
    dotEls.forEach((d) => d.addEventListener("click", () => { go(+d.dataset.i); auto(); }));
    // Touch / swipe support (mobile)
    let sx = 0, sy = 0;
    track.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    track.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { dx < 0 ? next() : go(idx - 1); auto(); }
    }, { passive: true });
    auto();
  }

  /* ================================================================
     SCROLL-DOWN CUE
     ================================================================ */
  function initScrollCue() {
    const sd = $("#scroll-down");
    if (!sd) return;
    sd.addEventListener("click", () => {
      const s = $("#story");
      if (s) s.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    window.addEventListener("scroll", () => {
      sd.classList.toggle("hidden", window.scrollY > 120);
    }, { passive: true });
  }

  /* ================================================================
     COUNTDOWN
     ================================================================ */
  function initCountdown() {
    const target = new Date(C.couple.weddingDateTime).getTime();
    const el = { d: $("#cd-d"), h: $("#cd-h"), m: $("#cd-m"), s: $("#cd-s") };
    function tick() {
      let diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 864e5); diff -= d * 864e5;
      const h = Math.floor(diff / 36e5); diff -= h * 36e5;
      const m = Math.floor(diff / 6e4); diff -= m * 6e4;
      const s = Math.floor(diff / 1e3);
      el.d.textContent = d; el.h.textContent = h;
      el.m.textContent = String(m).padStart(2, "0");
      el.s.textContent = String(s).padStart(2, "0");
    }
    tick(); setInterval(tick, 1000);
  }

  /* ================================================================
     MUSIC
     ================================================================ */
  const audio = $("#bg-music");
  const musicBtn = $("#music-toggle");
  let musicReady = false, triedFallback = false;

  audio.addEventListener("error", () => {
    if (!triedFallback && C.music.fallback) {
      triedFallback = true;
      audio.src = C.music.fallback;
      audio.load();
      if (musicReady) audio.play().catch(() => {});
    }
  });

  function playMusic() {
    if (!audio.src) { audio.src = C.music.src; audio.load(); }
    audio.play().then(() => {
      musicReady = true;
      musicBtn.classList.add("music-on");
      musicBtn.classList.remove("music-off");
    }).catch(() => {});
  }
  function pauseMusic() {
    audio.pause();
    musicBtn.classList.remove("music-on");
    musicBtn.classList.add("music-off");
  }
  musicBtn.addEventListener("click", () => {
    if (audio.paused) playMusic(); else pauseMusic();
  });

  /* ================================================================
     SCROLL REVEAL
     ================================================================ */
  let io;
  function observeReveal(root = document) {
    if (!io) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
      }, { threshold: 0.12 });
    }
    $$("[data-reveal]", root).forEach((el) => io.observe(el));
  }

  /* ================================================================
     FALLING PETALS
     ================================================================ */
  function initPetals() {
    const wrap = $("#petals");
    const chars = ["❀", "✿", "❁", "﹡"];
    const N = window.innerWidth < 640 ? 10 : 18;
    for (let i = 0; i < N; i++) {
      const p = document.createElement("span");
      p.className = "petal";
      p.textContent = chars[i % chars.length];
      p.style.left = Math.random() * 100 + "vw";
      p.style.fontSize = (10 + Math.random() * 16) + "px";
      p.style.animationDuration = (9 + Math.random() * 10) + "s";
      p.style.animationDelay = (-Math.random() * 12) + "s";
      p.style.opacity = 0.4 + Math.random() * 0.4;
      wrap.appendChild(p);
    }
  }

  /* ================================================================
     INVITE-LINK GENERATOR  (click the footer 囍)
     ================================================================ */
  function buildInviteLink() {
    const base = location.origin + location.pathname;
    const p = new URLSearchParams();
    const title = $("#in-title").value.trim();
    const name = $("#in-name").value.trim();
    const self = $("#in-self").value.trim();
    const type = (document.querySelector('input[name="ltype"]:checked') || {}).value || "groom";
    if (title) p.set("title", title);
    if (name) p.set("name", name);
    if (self) p.set("self", self);
    if ($("#in-compact").checked) p.set("compact", "1");
    p.set("type", type);
    const qs = p.toString();
    return base + (qs ? "?" + qs : "");
  }

  function initLinkTool() {
    const modal = $("#link-modal");
    // Only the 囍 on the cover/enter screen (first seen on load) opens the tool,
    // and only on DOUBLE-CLICK — a discreet host gesture.
    const triggers = $$(".double-happiness");
    if (!modal || !triggers.length) return;

    const open = () => {
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      setTimeout(() => $("#in-title").focus(), 60);
    };
    const close = () => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    };

    triggers.forEach((t) => {
      t.classList.add("dh-trigger");
      t.setAttribute("title", "Nhấn đúp để tạo thiệp mời / Double-click or double-tap");
      t.addEventListener("dblclick", open);              // desktop: double-click
      // mobile: manual double-tap (dblclick doesn't fire reliably on touch)
      let lastTap = 0;
      t.addEventListener("touchend", (e) => {
        const now = Date.now();
        if (now - lastTap < 350) {
          e.preventDefault();                            // block double-tap zoom
          lastTap = 0;
          open();
        } else {
          lastTap = now;
        }
      }, { passive: false });
    });
    modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", close));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("open")) close(); });

    // Segmented control highlight (bride/groom)
    const segLabels = $$(".seg label", modal);
    function syncSeg() {
      segLabels.forEach((l) => l.classList.toggle("on", l.querySelector("input").checked));
    }
    segLabels.forEach((l) => l.querySelector("input").addEventListener("change", syncSeg));
    syncSeg();

    // Create link + open new tab
    $("#link-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const url = buildInviteLink();
      $("#link-field").value = url;
      $("#link-out").hidden = false;
      window.open(url, "_blank", "noopener");
    });

    // Copy to clipboard
    const copyBtn = $("#copy-link");
    copyBtn.addEventListener("click", () => {
      const f = $("#link-field");
      f.select(); f.setSelectionRange(0, 99999);
      const original = copyBtn.innerHTML;
      const done = () => {
        copyBtn.textContent = lang === "vi" ? "Đã sao chép ✓" : "Copied ✓";
        setTimeout(() => { copyBtn.innerHTML = original; applyLang(); }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(f.value).then(done).catch(() => { try { document.execCommand("copy"); } catch (_) {} done(); });
      } else { try { document.execCommand("copy"); } catch (_) {} done(); }
    });
  }

  /* ================================================================
     ENTER
     ================================================================ */
  function enter() {
    $("#enter-overlay").classList.add("hide");
    const content = $("#content");
    content.classList.add("entered");
    content.setAttribute("aria-hidden", "false");
    playMusic();          // user gesture -> autoplay allowed
  }
  $("#enter-btn").addEventListener("click", enter);

  /* ================================================================
     BOOT
     ================================================================ */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (guest.compact) document.body.classList.add("compact");  // hide story & poem
    // Gift section only for personalized links (type=groom|bride); hide when no type
    if (!guest.type) { const g = $("#gift"); if (g) g.style.display = "none"; }
    applyLang();          // renders all text (calls renderText)
    initHeroSlides();
    initGallery();
    initScrollCue();
    initCountdown();
    initLinkTool();
    initPetals();
    observeReveal();
    document.title = `${t(C.couple.groom.name)} ❤ ${t(C.couple.bride.name)} · ${C.couple.displayDate}`;
  });
})();
