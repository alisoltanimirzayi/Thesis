window.PicturePage = (function () {
  const limitations = [
    {
      number: 1,
      title: "صورت ایدئال، نه گروه خالص",
      description: "گونه‌های وبری ساخت مفهومی‌اند. آنچه بازسازی شد ابعاد پنهان پاسخ به گویه‌های موجود است؛ نزدیک به آن صورت‌ها، نه معادل قطعی‌شان. فرد می‌تواند چند جهت‌گیری را هم‌زمان داشته باشد. فرضیه‌های جزئی حدس نظری بودند، نه حکم مدل."
    },
    {
      number: 2,
      title: "پرسشنامه برای وبر ساخته نشده",
      description: "پیمایش ملی خانواده ۱۴۰۳ مقیاس وبری نبود. انتخاب و بازتعریف متغیرها پس از دیدن داده انجام شد و بخشی از واریانس گویه‌ها بیرون از چهار عامل ماند. ابعاد تا حدی تابع پرسشنامه و تصمیم استخراج‌اند."
    },
    {
      number: 3,
      title: "مطلوبیت، نه رفتار تحقق‌یافته",
      description: "متغیر وابسته باروری مشاهده‌شده نیست؛ مطلوبیت فرزند و زمان‌بندی ازدواج و فرزندآوری است. مسیر ارزش ← قصد ← رفتار در داده آزمون نشد. تعمیم به باروری تحقق‌یافته یا کارایی مستقیم سیاست باید محتاط باشد."
    },
    {
      number: 4,
      title: "پوشش نمونه",
      description: "طرح در استان‌ها گسترده است، اما نرخ پاسخ رسمی در فایل نبود و سهم استانی با جمعیت یکی نبود. وزن‌دهی ناهماهنگی را کم کرد، خطای پوشش و بی‌پاسخی را کامل برطرف نکرد. داده مقطعی است؛ روابط را نباید علّی خواند."
    }
  ];

  const hypotheses = [
    {
      number: 1,
      id: "din",
      title: "هنجارگرایی دینی",
      description: "پایدارترین الگو: فرزند بیشتر، ازدواج و فرزندآوری زودتر.",
      teeth: 16,
      radius: 104,
      angle: -128,
      dur: 32,
      dir: "normal",
      stroke: "#8a6230"
    },
    {
      number: 2,
      id: "madi",
      title: "عقلانیت مادی",
      description: "تعداد را کم نمی‌کند؛ ازدواج را به تأخیر می‌اندازد، به‌ویژه برای پسر.",
      teeth: 12,
      radius: 88,
      angle: -52,
      dur: 24,
      dir: "reverse",
      stroke: "#6d4c24"
    },
    {
      number: 3,
      id: "sonnat",
      title: "سنت خانوادگی",
      description: "با فرضیه اولیه نمی‌خواند و با کاهش تعداد، به‌خصوص پسر، همراه است.",
      teeth: 14,
      radius: 96,
      angle: 128,
      dur: 28,
      dir: "reverse",
      stroke: "#3f6b4e"
    },
    {
      number: 4,
      id: "atefi",
      title: "گرایش عاطفی",
      description: "اثر کوچک مثبت بر تعداد و اثر منفی محدود بر زمان دارد.",
      teeth: 10,
      radius: 78,
      angle: 52,
      dur: 20,
      dir: "normal",
      stroke: "#9a4334"
    },
    {
      number: 5,
      id: "center",
      title: "فرزند و زمان‌بندی",
      description: "اثر، وابسته به نوع بُعد است.",
      teeth: 11,
      radius: 70,
      x: 450,
      y: 286,
      dur: 22,
      dir: "reverse",
      stroke: "#1c1915",
      isCenter: true
    }
  ];

  const finaleCopy = "مشوق هزینه‌ای احتمالاً روی کسانی کار می‌کند که از پیش فرزند را در چارچوب هنجاری معنادار می‌بینند. اگر مطلوبیت از جای دیگری بیاید، کاهش هزینه فرزند به‌تنهایی مسیر را عوض نمی‌کند.";

  const hub = hypotheses.find((h) => h.isCenter);
  hypotheses.forEach((h) => {
    if (h.isCenter) return;
    const d = hub.radius + h.radius - 14;
    const rad = (h.angle * Math.PI) / 180;
    h.x = hub.x + Math.cos(rad) * d;
    h.y = hub.y + Math.sin(rad) * d;
  });

  function toFa(n) {
    return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  }

  function isPictureOn() {
    return document.getElementById("picture")?.classList.contains("on");
  }

  function navOffset() {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--nav-h");
    return parseFloat(raw) || 64;
  }

  const limSection = document.getElementById("limitations");
  const beam = document.getElementById("beam");
  const heavyPan = document.getElementById("heavy-pan");
  const dotsWrap = document.getElementById("dots");
  const statusLine = document.getElementById("status-line");
  const backdrop = document.getElementById("lim-backdrop");
  const pop = document.getElementById("lim-pop");
  const popNum = document.getElementById("lim-pop-num");
  const popTitle = document.getElementById("lim-pop-title");
  const popText = document.getElementById("lim-pop-text");
  const popClose = document.getElementById("lim-pop-close");
  const cardEls = [];
  let openIndex = -1;
  let openGearId = null;
  const viewedLimits = new Set();

  if (!limSection || !heavyPan || !dotsWrap) {
    return { show() {}, hide() {} };
  }

  limitations.forEach((item, i) => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "lim-card";
    el.dataset.slot = String(i);
    el.setAttribute("aria-label", item.title);
    el.innerHTML =
      '<span class="lim-num">' + toFa(item.number) + "</span>" +
      '<span class="lim-title">' + item.title + "</span>";
    el.addEventListener("click", (ev) => {
      ev.stopPropagation();
      openLimitation(i);
    });
    heavyPan.appendChild(el);
    cardEls.push(el);

    const dot = document.createElement("span");
    dot.className = "dot";
    dotsWrap.appendChild(dot);
  });

  function placePopup(panel, anchor) {
    if (!panel || !anchor) return;
    const rect = anchor.getBoundingClientRect();
    const popW = Math.min(420, window.innerWidth - 32);
    const popH = panel.offsetHeight || 240;
    const minTop = navOffset() + 12;
    let left = rect.left + rect.width / 2 - popW / 2;
    let top = rect.top - popH - 16;
    if (top < minTop) top = rect.bottom + 16;
    left = Math.max(16, Math.min(left, window.innerWidth - popW - 16));
    top = Math.max(minTop, Math.min(top, window.innerHeight - popH - 16));
    panel.style.left = left + "px";
    panel.style.top = top + "px";
  }

  function syncOverlay() {
    document.body.classList.toggle("pic-overlay-on", openIndex >= 0 || openGearId != null);
  }

  function openLimitation(i) {
    const item = limitations[i];
    if (!item) return;
    closeGear();
    openIndex = i;
    viewedLimits.add(i);
    cardEls.forEach((el, idx) => {
      el.classList.toggle("is-open", idx === i);
      el.classList.toggle("is-viewed", viewedLimits.has(idx));
    });
    popNum.textContent = toFa(item.number);
    popTitle.textContent = item.title;
    popText.textContent = item.description;
    backdrop.hidden = false;
    syncOverlay();
    requestAnimationFrame(() => {
      placePopup(pop, cardEls[i]);
      backdrop.classList.add("show");
      pop.classList.add("open");
    });
  }

  function closeLimitation() {
    openIndex = -1;
    cardEls.forEach((el, idx) => {
      el.classList.remove("is-open");
      el.classList.toggle("is-viewed", viewedLimits.has(idx));
    });
    pop.classList.remove("open");
    backdrop.classList.remove("show");
    syncOverlay();
    window.setTimeout(() => { backdrop.hidden = true; }, 280);
  }

  popClose.addEventListener("click", closeLimitation);
  backdrop.addEventListener("click", closeLimitation);

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }
  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  const INTRO = 0.10;
  const SLICE = 0.20;

  let ticking = false;
  function measureProgress() {
    const rect = limSection.getBoundingClientRect();
    const total = Math.max(limSection.offsetHeight - window.innerHeight, 1);
    const scrolled = clamp(-rect.top, 0, total);
    return scrolled / total;
  }

  function renderBalance(p) {
    let tilt = 0;
    const dots = dotsWrap.children;

    cardEls.forEach((el, i) => {
      const start = INTRO + i * SLICE;
      const local = clamp((p - start) / (SLICE * 0.72), 0, 1);
      const t = easeOutCubic(local);
      const y = (1 - t) * -230;
      const settle = t > 0.92 ? Math.sin(((t - 0.92) / 0.08) * Math.PI) * 3 : 0;

      el.style.opacity = String(Math.min(t * 1.2, 1));
      el.style.transform = "translate3d(0, " + (y + settle) + "px, 0)";
      el.classList.toggle("is-landed", t > 0.88);

      tilt += t * 1.85;
      if (dots[i]) dots[i].classList.toggle("on", t > 0.55);
    });

    const introTilt = easeInOut(clamp(p / INTRO, 0, 1)) * 0.3;
    beam.style.setProperty("--tilt", introTilt + tilt + "deg");

    const landed = cardEls.reduce((n, _el, i) => {
      const start = INTRO + i * SLICE;
      return n + (p > start + SLICE * 0.45 ? 1 : 0);
    }, 0);

    statusLine.textContent = toFa(landed) + " محدودیت روی ترازو";
    if (landed > 1) resolveTitleCollisions();
  }

  function rectsOverlap(a, b, pad) {
    return !(
      a.right + pad < b.left ||
      a.left - pad > b.right ||
      a.bottom + pad < b.top ||
      a.top - pad > b.bottom
    );
  }

  function resolveTitleCollisions() {
    const labels = cardEls.map((el) => el.querySelector(".lim-title")).filter(Boolean);
    labels.forEach((label) => { label.style.marginBottom = "0px"; });
    for (let i = 0; i < labels.length; i++) {
      if (!cardEls[i].classList.contains("is-landed")) continue;
      for (let j = i + 1; j < labels.length; j++) {
        if (!cardEls[j].classList.contains("is-landed")) continue;
        const a = labels[i].getBoundingClientRect();
        const b = labels[j].getBoundingClientRect();
        if (!rectsOverlap(a, b, 10)) continue;
        const extra = Math.ceil(Math.min(a.height, b.height) + 12);
        const current = parseFloat(labels[j].style.marginBottom) || 0;
        labels[j].style.marginBottom = current + extra + "px";
      }
    }
  }

  function onScroll() {
    if (!isPictureOn()) return;
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      renderBalance(measureProgress());
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  function gearPath(teeth, outerR) {
    const step = (Math.PI * 2) / teeth;
    const root = outerR * 0.78;
    const parts = [];
    for (let i = 0; i < teeth; i++) {
      const a = i * step - Math.PI / 2;
      const pt = (ang, r) => [Math.cos(ang) * r, Math.sin(ang) * r];
      const p0 = pt(a, root);
      const p1 = pt(a + step * 0.22, outerR);
      const p2 = pt(a + step * 0.38, outerR);
      const p3 = pt(a + step * 0.60, root);
      if (i === 0) parts.push("M", p0[0].toFixed(2), p0[1].toFixed(2));
      else parts.push("L", p0[0].toFixed(2), p0[1].toFixed(2));
      parts.push("L", p1[0].toFixed(2), p1[1].toFixed(2));
      parts.push("L", p2[0].toFixed(2), p2[1].toFixed(2));
      parts.push("L", p3[0].toFixed(2), p3[1].toFixed(2));
    }
    parts.push("Z");
    return parts.join(" ");
  }

  const svg = document.getElementById("gear-svg");
  const layer = document.getElementById("gear-layer");
  const stage = document.getElementById("gear-stage");
  const finale = document.getElementById("finale-orb");
  const finaleText = document.getElementById("finale-text");
  const gearBackdrop = document.getElementById("gear-backdrop");
  const gearPop = document.getElementById("gear-pop");
  const gearPopNum = document.getElementById("gear-pop-num");
  const gearPopTitle = document.getElementById("gear-pop-title");
  const gearPopText = document.getElementById("gear-pop-text");
  const gearPopClose = document.getElementById("gear-pop-close");
  const viewedGears = new Set();
  let gearsBuilt = false;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (finaleText) finaleText.textContent = finaleCopy;

  function buildGears() {
    if (gearsBuilt || !layer) return;
    gearsBuilt = true;
    hypotheses.forEach((h) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("transform", "translate(" + h.x + " " + h.y + ")");

      const rot = document.createElementNS("http://www.w3.org/2000/svg", "g");
      rot.classList.add("gear-rot");
      rot.style.setProperty("--dur", h.dur + "s");
      rot.style.setProperty("--dir", h.dir);
      rot.setAttribute("filter", "url(#pic-gear-soft)");
      if (reduceMotion) rot.classList.add("paused");

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", gearPath(h.teeth, h.radius));
      path.setAttribute("fill", h.isCenter ? "#f3ead8" : "#fffdf8");
      path.setAttribute("stroke", h.stroke);
      path.setAttribute("stroke-width", h.isCenter ? "2.2" : "1.4");

      const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      ring.setAttribute("r", String(h.radius * 0.46));
      ring.setAttribute("fill", "none");
      ring.setAttribute("stroke", h.stroke);
      ring.setAttribute("stroke-width", "1");
      ring.setAttribute("opacity", "0.35");

      const hubEl = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      hubEl.setAttribute("r", String(Math.max(10, h.radius * 0.08)));
      hubEl.setAttribute("fill", h.stroke);

      rot.appendChild(path);
      rot.appendChild(ring);
      rot.appendChild(hubEl);
      g.appendChild(rot);
      layer.appendChild(g);

      h._path = path;
      h._hub = hubEl;
    });
  }

  function paintGear(h) {
    if (!h._path || !h._hub) return;
    const viewed = viewedGears.has(h.id);
    if (viewed) {
      h._path.setAttribute("fill", h.stroke);
      h._path.setAttribute("stroke-width", "2.6");
      h._hub.setAttribute("fill", "#fffdf8");
    } else {
      h._path.setAttribute("fill", h.isCenter ? "#f3ead8" : "#fffdf8");
      h._path.setAttribute("stroke-width", h.isCenter ? "2.2" : "1.4");
      h._hub.setAttribute("fill", h.stroke);
    }
    const btn = document.getElementById("hit-" + h.id);
    if (btn) btn.classList.toggle("is-viewed", viewed);
  }

  function maybeRevealFinale() {
    if (!finale) return;
    const required = hypotheses.filter((h) => !h.isCenter);
    if (required.every((h) => viewedGears.has(h.id))) finale.classList.add("visible");
  }

  function openGear(id) {
    const h = hypotheses.find((x) => x.id === id);
    if (!h || !gearPop || !gearBackdrop) return;
    closeLimitation();
    openGearId = id;
    viewedGears.add(id);
    hypotheses.forEach(paintGear);
    maybeRevealFinale();

    if (gearPopNum) gearPopNum.textContent = toFa(h.number);
    if (gearPopTitle) gearPopTitle.textContent = h.title;
    if (gearPopText) gearPopText.textContent = h.description;
    gearBackdrop.hidden = false;
    requestAnimationFrame(() => {
      const btn = document.getElementById("hit-" + h.id);
      placePopup(gearPop, btn);
      gearBackdrop.classList.add("show");
      gearPop.classList.add("open");
      syncOverlay();
    });
  }

  function closeGear() {
    openGearId = null;
    gearPop.classList.remove("open");
    gearBackdrop.classList.remove("show");
    syncOverlay();
    window.setTimeout(() => { gearBackdrop.hidden = true; }, 280);
  }

  gearPopClose.addEventListener("click", closeGear);
  gearBackdrop.addEventListener("click", closeGear);

  function labelHtml(title) {
    const parts = title.trim().split(" ");
    if (parts.length < 2) return title;
    const last = parts.pop();
    return parts.join(" ") + "<br>" + last;
  }

  function placeHits() {
    if (!svg || !stage) return;
    const box = svg.viewBox.baseVal;
    const svgRect = svg.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    if (!svgRect.width || !svgRect.height) return;
    const scale = Math.min(svgRect.width / box.width, svgRect.height / box.height);
    const ox = (svgRect.left - stageRect.left) + (svgRect.width - box.width * scale) / 2;
    const oy = (svgRect.top - stageRect.top) + (svgRect.height - box.height * scale) / 2;

    hypotheses.forEach((h) => {
      let btn = document.getElementById("hit-" + h.id);
      if (!btn) {
        btn = document.createElement("button");
        btn.type = "button";
        btn.className = "gear-hit" + (h.isCenter ? " is-center" : "");
        btn.id = "hit-" + h.id;
        btn.setAttribute("aria-label", h.title);
        btn.innerHTML = "<div class=\"face\"><b>" + labelHtml(h.title) + "</b></div>";
        btn.addEventListener("click", (ev) => {
          ev.stopPropagation();
          openGear(h.id);
        });
        stage.appendChild(btn);
      }
      const size = h.radius * 2 * scale * 0.78;
      btn.style.width = size + "px";
      btn.style.height = size + "px";
      btn.style.left = ox + h.x * scale + "px";
      btn.style.top = oy + h.y * scale + "px";
      btn.style.zIndex = h.isCenter ? "2" : "3";
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !isPictureOn()) return;
    if (openIndex >= 0) {
      closeLimitation();
      e.preventDefault();
    } else if (openGearId) {
      closeGear();
      e.preventDefault();
    }
  });

  window.addEventListener("resize", () => {
    if (!isPictureOn()) return;
    renderBalance(measureProgress());
    placeHits();
    if (openIndex >= 0) placePopup(pop, cardEls[openIndex]);
    if (openGearId) {
      const btn = document.getElementById("hit-" + openGearId);
      if (btn) placePopup(gearPop, btn);
    }
  });

  function show() {
    buildGears();
    renderBalance(measureProgress());
    const layout = () => {
      placeHits();
      renderBalance(measureProgress());
    };
    requestAnimationFrame(() => {
      layout();
      requestAnimationFrame(layout);
    });
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => { if (isPictureOn()) layout(); });
    }
  }

  function hide() {
    closeLimitation();
    closeGear();
    document.body.classList.remove("pic-overlay-on");
  }

  return { show, hide };
})();
