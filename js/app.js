const views = ["cover", "problem", "others", "method", "items", "factors", "story", "picture"];
const navMap = { problem: 0, others: 1, method: 2, items: 2, factors: 2, story: 3, picture: 4 };

const REG = {
  total: { title: "تعداد مطلوب کل فرزندان", items: [
    ["عقلانیت مادی", -0.003, ""],
    ["هنجارگرایی دینی", 0.290, "***"],
    ["سنت خانوادگی", -0.107, "***"],
    ["گرایش عاطفی", 0.065, "**"]
  ]},
  girls: { title: "تعداد مطلوب دختر", items: [
    ["عقلانیت مادی", 0.008, ""],
    ["هنجارگرایی دینی", 0.121, "***"],
    ["سنت خانوادگی", -0.035, ""],
    ["گرایش عاطفی", 0.032, "*"]
  ]},
  boys: { title: "تعداد مطلوب پسر", items: [
    ["عقلانیت مادی", -0.004, ""],
    ["هنجارگرایی دینی", 0.182, "***"],
    ["سنت خانوادگی", -0.092, "***"],
    ["گرایش عاطفی", 0.030, "*"]
  ]},
  cage: { title: "سن مناسب فرزندآوری", items: [
    ["عقلانیت مادی", 0.021, ""],
    ["هنجارگرایی دینی", -0.149, "***"],
    ["سنت خانوادگی", -0.028, ""],
    ["گرایش عاطفی", -0.026, "*"]
  ]},
  mboy: { title: "سن مناسب ازدواج پسر", items: [
    ["عقلانیت مادی", 0.328, "*"],
    ["هنجارگرایی دینی", -0.813, "***"],
    ["سنت خانوادگی", -0.015, ""],
    ["گرایش عاطفی", -0.176, "**"]
  ]},
  mgirl: { title: "سن مناسب ازدواج دختر", items: [
    ["عقلانیت مادی", 0.132, "***"],
    ["هنجارگرایی دینی", -0.166, "***"],
    ["سنت خانوادگی", -0.012, ""],
    ["گرایش عاطفی", -0.015, ""]
  ]}
};

const MODALS = {
  zweck: ["عقلانی معطوف به هدف", `<blockquote>عقلانیِ معطوف به هدف؛ یعنی کنشی که بر اساس انتظار از رفتار اشیای موجود در محیط و نیز رفتار دیگر انسان‌ها شکل می‌گیرد؛ به‌گونه‌ای که کنشگر از این انتظارات همچون «شرایط» یا «وسایل» برای دستیابی به اهدافی استفاده می‌کند که به‌صورت عقلانی دنبال و محاسبه کرده است.</blockquote><p class="cite">وبر، اقتصاد و جامعه، ۱۹۷۸: ۲۴</p><p class="hyp-label">فرضیه</p><p>هر چه این جهت‌گیری در موضوعات خانوادگی بیشتر باشد، سن مطلوب ازدواج و فرزندآوری بالاتر، تعداد مطلوب فرزند کمتر، و احتمال بی‌فرزندی بیشتر است.</p>`],
  wert: ["عقلانی معطوف به ارزش", `<blockquote>عقلانیِ معطوف به ارزش؛ یعنی کنشی که بر پایه‌ی باور آگاهانه به ارزش ذاتیِ نوعی رفتار — خواه اخلاقی، زیبایی‌شناختی، دینی یا از هر سنخ دیگری — شکل می‌گیرد، بی‌آنکه موفقیت یا نتیجه‌بخشیِ احتمالیِ آن رفتار در تعیین ارزش یا انجام آن نقشی داشته باشد.</blockquote><p class="cite">وبر، اقتصاد و جامعه، ۱۹۷۸: ۲۴–۲۵</p><p class="hyp-label">فرضیه</p><p>هر چه شدت این جهت‌گیری بیشتر باشد، سن مطلوب ازدواج و فرزندآوری پایین‌تر و تعداد مطلوب فرزند بیشتر است.</p>`],
  trad: ["سنت", `<blockquote>سنتی؛ یعنی کنشی که بر اثر عادت‌های دیرپا و درونی‌شده تعیین می‌شود.</blockquote><p class="cite">وبر، اقتصاد و جامعه، ۱۹۷۸: ۲۵</p><p class="hyp-label">فرضیه</p><p>هر چه جهت‌گیری سنتی غالب‌تر باشد، سن مناسب ازدواج و فرزندآوری پایین‌تر و تعداد مطلوب فرزند بیشتر است؛ حتی بالاتر از جهت‌گیری ارزشی‌ـ‌دینی.</p>`],
  affekt: ["عاطفه", `<blockquote>عاطفی (به‌ویژه هیجانی)؛ یعنی کنشی که تحت تأثیر عواطف و حالات احساسیِ خاصِ کنشگر تعیین می‌شود.</blockquote><p class="cite">وبر، اقتصاد و جامعه</p><p class="hyp-label">فرضیه</p><p>ارتباط روشنی با سن ازدواج و فرزندآوری انتظار نمی‌رود. تعداد مطلوب فرزند کم است و چون متعلق احساس جایگزین‌پذیر است، پتانسیل بی‌فرزندی نیز وجود دارد.</p>`],
  f1: ["عقلانیت مادی", "<p>گویه‌های دودویی تأخیر ازدواج و محاسبه منابع. امگا ۰٫۷۳. در رگرسیون تعداد را توضیح نمی‌دهد و زمان ازدواج را عقب می‌برد.</p>"],
  f2: ["هنجارگرایی دینی", "<p>پایدارترین عامل از حیث تبیین. امگا ۰٫۷۵. فرزند بیشتر و زمان‌بندی زودتر.</p>"],
  f3: ["سنت خانوادگی", "<p>چهار گویه و پایایی پایین‌تر (۰٫۴۴). اثر منفی بر تعداد کل و پسر.</p>"],
  f4: ["گرایش عاطفی", "<p>سه گویه، امگا ۰٫۴۸. اثر کوچک مثبت بر مطلوبیت تعداد.</p>"],
  altvalues: ["ارزش‌های جایگزین", "<p>اگر فرزند صرفاً به‌خاطر ارزش عاطفی خواستنی باشد، می‌توان جایگزین‌هایی برای همان نقش تصور کرد. پایان‌نامه در بیان مسئله به حیوانات خانگی و حتی گیاهان اشاره می‌کند.</p><p>گو و همکاران (۲۰۲۱) نشان می‌دهند دلبستگی به حیوان خانگی، در میان کسانی که پایگاه اجتماعی‌ـ‌اقتصادی ذهنی بالاتری دارند، با نیت باروری پایین‌تر همراه است؛ گویی حیوان خانگی می‌تواند نقش فرزند جانشین را بازی کند.</p><p><a href=\"https://pmc.ncbi.nlm.nih.gov/articles/PMC8394147/\" target=\"_blank\" rel=\"noopener\">Guo et al. 2021 · Can Pets Replace Children?</a></p>"],
  era1: ["گذار جمعیتی اول", "<p>تامسپون ۱۹۲۹، لندری ۱۹۳۴ و نوتشتاین ۱۹۴۵ کاهش باروری را در مقیاس کلان به افت مرگ‌ومیر، صنعتی‌شدن و شهرنشینی وصل کردند. تبیین هنوز جمعیتی است، نه کنشی.</p>"],
  era2: ["اقتصاد خانواده", "<p>لیبنشتاین ۱۹۵۷ فرزند را نتیجه موازنه هزینه و فایده دانست. بکر ۱۹۶۰ خانواده را کنشگر عقلانی کرد و فرزند را کالای بادوام. ترجیحات مفروض‌اند؛ مسئله تخصیص منابع است.</p>"],
  era3: ["پاسخ و جریان ثروت", "<p>دیویس ۱۹۶۳ افت باروری را پاسخ به فشار جمعیتی پس از کاهش مرگ‌ومیر دانست. ایسترلین ۱۹۷۵ بر ادراک نسلی از رفاه انگشت گذاشت. کالدول ۱۹۷۶/۸۲ گفت با معکوس شدن جریان ثروت، فرزند از منبع اقتصادی به هزینه بدل می‌شود.</p>"],
  era4: ["گذار جمعیتی دوم", "<p>ون‌دکا ۱۹۸۷ نشان داد افت باروری جنوب اروپا را نمی‌توان فقط با اقتصاد توضیح داد. ارزش‌های فردگرایانه، هم‌باشی و انتخاب آگاهانه فرزند، مسیر تازه‌ای باز کرد. اینجا رفتار به کنش نزدیک می‌شود.</p>"],
  era5: ["VOC هافمن و هافمن", "<p>۱۹۷۳. افراد به‌خاطر ارزش‌هایی که به فرزند می‌دهند فرزند می‌آورند؛ نه فقط به‌خاطر قیمت. نه طبقه: پایگاه، جاودانگی، اخلاق و دین، عاطفه، تازگی، دستاورد، قدرت، مقایسه اجتماعی، سود اقتصادی. کائیتچی‌باشی بعداً گفت ارزش اقتصادی کم می‌شود اما ارزش عاطفی می‌ماند.</p>"],
  era6: ["VOC ناوک", "<p>ناوک ۲۰۰۵ و ۲۰۱۴ ارزش‌های فرزند را به دو هدف غایی وصل کرد: اعتبار اجتماعی و رفاه فیزیکی. فرزند کالای واسط است. ساختار فرصت تعیین می‌کند کدام واسط در دسترس است. پژوهش حاضر از همین حلقه شروع می‌کند و محتوای دوگانه را با وبر چهارتایی می‌کند.</p>"]
};

const COLORS = ["#c9a36a", "#7d9a7a", "#c07058", "#8aa0b4"];

function go(id) {
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("on"));
  const el = document.getElementById(id) || document.getElementById("cover");
  el.classList.add("on");
  document.body.classList.toggle("on-cover", el.id === "cover");
  window.scrollTo({ top: 0, behavior: "instant" });
  const idx = navMap[id];
  document.querySelectorAll(".spotlight-nav a").forEach((a) => {
    a.classList.toggle("active", Number(a.dataset.index) === idx);
  });
  if (idx !== undefined) setAmbience(idx);
  if (id === "story") requestAnimationFrame(drawCharts);
  if (id === "problem") requestAnimationFrame(drawTfr);
  history.replaceState(null, "", "#" + id);
}

/* Spotlight nav */
const nav = document.getElementById("nav");
function setVar(name, x) { nav.style.setProperty(name, x + "px"); }
function itemCenter(i) {
  const item = nav.querySelector(`[data-index="${i}"]`);
  if (!item) return 0;
  const nr = nav.getBoundingClientRect();
  const ir = item.getBoundingClientRect();
  return ir.left - nr.left + ir.width / 2;
}
function setAmbience(i) { setVar("--ambience-x", itemCenter(i)); }

nav.addEventListener("mousemove", (e) => {
  const r = nav.getBoundingClientRect();
  setVar("--spotlight-x", e.clientX - r.left);
});
nav.addEventListener("mouseleave", () => {
  const active = nav.querySelector("a.active");
  if (active) setVar("--spotlight-x", itemCenter(active.dataset.index));
});
nav.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    go(a.getAttribute("href").slice(1));
  });
});
document.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => go(b.dataset.go)));
document.querySelectorAll("a.step").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    go(a.getAttribute("href").slice(1));
  });
});

document.querySelectorAll(".lane").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".lane").forEach((x) => x.classList.remove("on"));
    document.querySelectorAll(".lane-copy").forEach((x) => x.classList.remove("on"));
    btn.classList.add("on");
    const panel = document.getElementById("lane-" + btn.dataset.lane);
    if (panel) panel.classList.add("on");
  });
});

/* Modal */
const modal = document.getElementById("modal");
function openModal(key) {
  const pack = MODALS[key];
  if (!pack) return;
  document.getElementById("modalTitle").textContent = pack[0];
  document.getElementById("modalBody").innerHTML = pack[1];
  modal.classList.add("on");
}
document.getElementById("closeModal").onclick = () => modal.classList.remove("on");
modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("on"); });
document.querySelectorAll("[data-modal]").forEach((n) => n.addEventListener("click", () => openModal(n.dataset.modal)));

/* Conceptual model */
function drawNauck() {
  const host = document.getElementById("nauckModel");
  if (!host) return;
  host.innerHTML = `
  <svg viewBox="0 0 760 280" role="img">
    <defs>
      <marker id="arrN" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#8a6230"/></marker>
    </defs>
    <rect x="16" y="90" width="150" height="86" rx="10" fill="#fffdf8" stroke="#8a6230"/>
    <text x="91" y="124" text-anchor="middle" fill="#1c1915" font-size="12">ساختار فرصت‌ها</text>
    <text x="91" y="144" text-anchor="middle" fill="#5c564c" font-size="11">منابع و محدودیت‌ها</text>
    <rect x="210" y="62" width="170" height="142" rx="10" fill="#fffdf8" stroke="#3f6b4e"/>
    <text x="295" y="88" text-anchor="middle" fill="#1c1915" font-size="12">ارزش فرزند</text>
    <text x="295" y="112" text-anchor="middle" fill="#5c564c" font-size="11">اقتصادی</text>
    <text x="295" y="132" text-anchor="middle" fill="#5c564c" font-size="11">روانی / عاطفی</text>
    <text x="295" y="152" text-anchor="middle" fill="#5c564c" font-size="11">اجتماعی / هنجاری</text>
    <text x="295" y="178" text-anchor="middle" fill="#8a6230" font-size="10">کالای واسط</text>
    <rect x="430" y="36" width="150" height="70" rx="10" fill="#fffdf8" stroke="#9a4334"/>
    <text x="505" y="66" text-anchor="middle" fill="#1c1915" font-size="12">اعتبار اجتماعی</text>
    <text x="505" y="86" text-anchor="middle" fill="#5c564c" font-size="10">هدف غایی</text>
    <rect x="430" y="160" width="150" height="70" rx="10" fill="#fffdf8" stroke="#9a4334"/>
    <text x="505" y="190" text-anchor="middle" fill="#1c1915" font-size="12">رفاه فیزیکی</text>
    <text x="505" y="210" text-anchor="middle" fill="#5c564c" font-size="10">هدف غایی</text>
    <rect x="620" y="90" width="120" height="86" rx="10" fill="#fffdf8" stroke="#5a6f80"/>
    <text x="680" y="128" text-anchor="middle" fill="#1c1915" font-size="12">رفتار باروری</text>
    <line x1="166" y1="133" x2="210" y2="133" stroke="#8a6230" marker-end="url(#arrN)"/>
    <line x1="380" y1="110" x2="430" y2="71" stroke="#8a6230" marker-end="url(#arrN)"/>
    <line x1="380" y1="156" x2="430" y2="195" stroke="#8a6230" marker-end="url(#arrN)"/>
    <line x1="580" y1="71" x2="620" y2="120" stroke="#5a6f80" marker-end="url(#arrN)"/>
    <line x1="580" y1="195" x2="620" y2="150" stroke="#5a6f80" marker-end="url(#arrN)"/>
  </svg>`;
}
drawNauck();

/* Charts */
let drawn = false;
function chartDefaults() {
  Chart.defaults.color = "#5c564c";
  Chart.defaults.borderColor = "rgba(28,25,21,.12)";
  Chart.defaults.font.family = "Vazirmatn";
}

let tfrDrawn = false;
function drawTfr() {
  if (tfrDrawn) return;
  if (typeof Chart === "undefined") {
    setTimeout(drawTfr, 80);
    return;
  }
  const canvas = document.getElementById("tfr");
  if (!canvas) return;
  tfrDrawn = true;
  chartDefaults();
  new Chart(canvas, {
    type: "line",
    data: {
      labels: ["۱۳۶۵","۱۳۷۰","۱۳۷۵","۱۳۸۵","۱۳۹۰","۱۳۹۵","۱۳۹۶","۱۳۹۷","۱۳۹۸","۱۳۹۹","۱۴۰۰","۱۴۰۱","۱۴۰۲","۱۴۰۳"],
      datasets: [
        {
          label: "میزان باروری کل",
          data: [6.98, 5.68, 3.57, 1.92, 1.85, 2.36, 2.29, 2.1, 1.83, 1.7, 1.7, 1.63, 1.6, 1.48],
          borderColor: "#8a6230",
          backgroundColor: "rgba(138,98,48,.12)",
          fill: true,
          tension: .28,
          pointRadius: 3,
          pointBackgroundColor: "#6d4c24"
        },
        {
          label: "سطح جانشینی ۲٫۱",
          data: [2.1,2.1,2.1,2.1,2.1,2.1,2.1,2.1,2.1,2.1,2.1,2.1,2.1,2.1],
          borderColor: "#9a4334",
          borderDash: [6, 4],
          pointRadius: 0,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { boxWidth: 10 } } },
      scales: {
        y: { title: { display: true, text: "فرزند به ازای هر زن" }, suggestedMin: 1, suggestedMax: 7.5 }
      }
    }
  });
}
function drawCharts() {
  if (drawn || typeof Chart === "undefined") return;
  drawn = true;
  chartDefaults();

  new Chart(document.getElementById("parallel"), {
    type: "line",
    data: {
      labels: Array.from({ length: 12 }, (_, i) => i + 1),
      datasets: [
        { label: "مقادیر ویژه واقعی", data: [4.33, 3.18, 2.52, 1.96, 1.12, 0.96, 0.91, 0.86, 0.83, 0.77, 0.74, 0.68], borderColor: "#1c1915", backgroundColor: "transparent", tension: .25, pointRadius: 3 },
        { label: "مرجع موازی", data: [1.18, 1.14, 1.11, 1.08, 1.06, 1.04, 1.02, 1.01, 0.99, 0.98, 0.96, 0.95], borderColor: "#8a6230", borderDash: [5, 4], pointRadius: 0, tension: .2 }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { boxWidth: 10 } } }, scales: { y: { title: { display: true, text: "مقدار ویژه" } } } }
  });

  new Chart(document.getElementById("clusters"), {
    type: "doughnut",
    data: {
      labels: ["خوشه ۱ · ۱۸٪", "خوشه ۲ · ۲۳٪", "خوشه ۳ · ۲۹٪", "خوشه ۴ · ۳۰٪"],
      datasets: [{ data: [17.95, 23, 28.91, 30.14], backgroundColor: COLORS, borderWidth: 0 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "left" } } }
  });

  new Chart(document.getElementById("profile"), {
    type: "bar",
    data: {
      labels: ["خوشه اول", "خوشه دوم", "خوشه سوم", "خوشه چهارم"],
      datasets: [
        { label: "عقلانیت مادی", data: [0.87, 0.14, 0.14, 0.12], backgroundColor: COLORS[0] },
        { label: "هنجار دینی", data: [5.12, 4.08, 5.71, 5.76], backgroundColor: COLORS[1] },
        { label: "سنت", data: [3.54, 3.77, 2.55, 3.76], backgroundColor: COLORS[2] },
        { label: "عاطفه", data: [4.49, 4.97, 5.18, 3.76], backgroundColor: COLORS[3] }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
  });

  new Chart(document.getElementById("fertage"), {
    type: "bar",
    data: {
      labels: ["۱۰–۱۴", "۱۵–۱۹", "۲۰–۲۴", "۲۵–۲۹", "۳۰–۳۴", "۳۵–۳۹", "۴۰–۴۴", "+۴۵"],
      datasets: [{ data: [0.1, 3.7, 23.0, 41.0, 24.0, 7.0, 1.0, 0.2], backgroundColor: "#7a7a74", borderRadius: 4 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { title: { display: true, text: "درصد" } } } }
  });

  drawPyramid();
  setupReg();
}

function drawPyramid() {
  const ages = ["+۵۰", "۴۵–۴۹", "۴۰–۴۴", "۳۵–۳۹", "۳۰–۳۴", "۲۵–۲۹", "۲۰–۲۴", "۱۵–۱۹", "۱۰–۱۴"];
  const boys = [0.1, 0.2, 1.4, 7.0, 29.4, 44.0, 15.0, 2.0, 0.1];
  const girls = [0.1, 0.0, 0.2, 1.0, 6.3, 37.5, 37.7, 15.4, 0.7];
  const max = 50;
  const host = document.getElementById("pyramid");
  host.innerHTML = ages.map((a, i) => `
    <div class="pyramid" style="margin:4px 0">
      <div class="py-l"><i style="width:${(boys[i] / max) * 100}%"></i><span class="note" style="margin-right:6px">${boys[i]}</span></div>
      <div class="py-age">${a}</div>
      <div class="py-r"><span class="note" style="margin-left:6px">${girls[i]}</span><i style="width:${(girls[i] / max) * 100}%"></i></div>
    </div>`).join("") + `<div class="legend"><span>چپ: پسر</span><span>راست: دختر</span></div>`;
}

function setupReg() {
  const tabs = document.getElementById("regTabs");
  const keys = Object.keys(REG);
  tabs.innerHTML = keys.map((k, i) => `<button class="tab ${i === 0 ? "on" : ""}" data-k="${k}">${REG[k].title}</button>`).join("");
  tabs.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => {
    tabs.querySelectorAll(".tab").forEach((x) => x.classList.remove("on"));
    t.classList.add("on");
    renderReg(t.dataset.k);
  }));
  renderReg("total");
}

function renderReg(key) {
  const pack = REG[key];
  const max = Math.max(...pack.items.map((x) => Math.abs(x[1])), 0.3);
  document.getElementById("regBars").innerHTML = pack.items.map((row, i) => {
    const v = row[1];
    const w = (Math.abs(v) / max) * 100;
    const col = v >= 0 ? COLORS[1] : COLORS[2];
    return `<div class="bar-row">
      <div>${row[0]}</div>
      <div class="track"><div class="fill" style="width:${w}%;background:${col};margin-inline-start:${v < 0 ? (100 - w) : 0}%"></div></div>
      <div>${v.toFixed(3)}${row[2]}</div>
    </div>`;
  }).join("");
}

window.addEventListener("load", () => {
  setAmbience(0);
  const hash = location.hash.replace("#", "");
  if (views.includes(hash)) go(hash);
});
window.addEventListener("resize", () => {
  const active = document.querySelector(".spotlight-nav a.active");
  if (active) setAmbience(active.dataset.index);
});
