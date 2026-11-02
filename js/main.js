const G = "https://github.com/bamanuel977-afk/",
  API = "https://api.github.com/users/bamanuel977-afk",
  $ = (i) => document.getElementById(i);
const WORK = [
  [
    "WordNest Dictionary",
    "JavaScript",
    "A dictionary app: search any word and get its meaning instantly, with a clean results view and friendly handling for words it can’t find. Built to practise APIs, async code and the DOM.",
    "WordNest-Dictionary-App",
  ],
  [
    "BE-Family Hotel",
    "HTML · CSS",
    "A website for a family hotel with rooms, information and a welcoming layout that works on phones and desktops.",
    "BE-Family_Hotel",
  ],
  [
    "Nike_Shoes_Market",
    "HTML · CSS",
    " A modern online shoe marketplace featuring product browsing,shopping cart, search, category filtering, wishlist, and a,responsive shopping experience.",
    "NiKE_Shoes_Market",
  ],
  [
    "Portfolio v1",
    "HTML · CSS",
    "My first portfolio: intro, projects and contact links. The starting point for this one.",
    "PORTFOLIO",
  ],
  [
    "Button Effects",
    "CSS · JS",
    "Experiments with interactive button styles and hover animation.",
    "button-Js",
  ],
  [
    "First Project",
    "HTML",
    "Where it started: my very first web project.",
    "first-project",
  ],
];
const pip = (x, y) => `<circle cx="${x}" cy="${y}" r="3.2" fill="#111"/>`;
const ART = {
  snake: `<svg viewBox="0 0 160 80"><defs><pattern id="g" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0H0V10" fill="none" stroke="#1d4a33" stroke-width=".5"/></pattern></defs><rect width="160" height="80" fill="#0f2a1d"/><rect width="160" height="80" fill="url(#g)"/><polyline class="sn" points="20,60 60,60 60,30 110,30 110,50 140,50" fill="none" stroke="#4ade80" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="140" cy="20" r="5" fill="#ff4d4d"/></svg>`,
  dice: `<svg viewBox="0 0 160 80"><rect width="160" height="80" fill="#2845ff"/><g class="dc"><rect x="30" y="18" width="42" height="42" rx="9" fill="#fff"/>${pip(40, 28) + pip(62, 28) + pip(51, 39) + pip(40, 50) + pip(62, 50)}</g><g class="dc" style="animation-delay:-1.5s"><rect x="90" y="18" width="42" height="42" rx="9" fill="#fff"/>${pip(100, 28) + pip(111, 39) + pip(122, 50)}</g></svg>`,
  rps: `<svg viewBox="0 0 160 80"><defs><linearGradient id="p" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#a97bff"/><stop offset="1" stop-color="#ff4fd8"/></linearGradient></defs><rect width="160" height="80" fill="url(#p)"/><g font-size="30" text-anchor="middle"><text class="hb" x="32" y="52">✊</text><text class="hb" x="80" y="52" style="animation-delay:-.5s">✋</text><text class="hb" x="128" y="52" style="animation-delay:-1s">✌️</text></g></svg>`,
  audio: `<svg viewBox="0 0 160 80"><defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#22d3b6"/><stop offset="1" stop-color="#2845ff"/></linearGradient></defs><rect width="160" height="80" fill="url(#a)"/>${Array.from({ length: 16 }, (_, i) => `<rect class="eq" x="${12 + i * 9}" y="14" width="5" height="52" rx="2.5" fill="#fff" style="animation-delay:-${(i * 0.13).toFixed(2)}s"/>`).join("")}</svg>`,
};
const LAB = [
  [
    "Snake Game",
    "Python",
    "Guide the snake, eat, grow and avoid yourself. Game loops, keyboard input and collision logic.",
    "Snake_game",
    "snake",
  ],
  [
    "Dice Rolling Game",
    "Python",
    "A dice simulator with random rolls and simple interaction.",
    "Dice_Rolling_Game",
    "dice",
  ],
  [
    "Rock Paper Scissors",
    "JavaScript",
    "Play the computer with live score tracking.",
    "Rock_paper__scissors_game",
    "rps",
  ],
  [
    "Text to Audio",
    "Tool",
    "Type text and hear it spoken. My first step toward language tools.",
    "Text_to_Audio_converter",
    "audio",
  ],
];
if ($("work-list")) {
  $("work-list").innerHTML = WORK.map(
    ([t, l, d, r], i) =>
      `<div class="row rv" tabindex="0"><div class="h"><span>0${i + 1}</span><h3>${t}</h3><em>${l}</em></div><div class="d"><p>${d}</p><a href="${G + r}" target="_blank" rel="noopener">Open on GitHub ↗</a></div></div>`,
  ).join("");
  document.querySelectorAll(".row").forEach((r) => {
    const f = () => r.classList.toggle("open");
    r.onclick = (e) => {
      if (e.target.tagName !== "A") f();
    };
    r.onkeydown = (e) => {
      if (e.key === "Enter") f();
    };
  });
  $("lab-list").innerHTML = LAB.map(
    ([t, l, d, r, k]) =>
      `<a class="lc rv" href="${G + r}" target="_blank" rel="noopener"><div class="art">${ART[k]}</div><div class="t"><small>${l}</small><h3>${t}</h3><p>${d}</p></div></a>`,
  ).join("");
}
/* ---- live GitHub sync ---- */
function setCount(el, n) {
  if (!el) return;
  let c = +el.textContent || 0;
  clearInterval(el._t);
  el._t = setInterval(() => {
    c += c < n ? 1 : -1;
    el.textContent = c;
    if (c === n) clearInterval(el._t);
  }, 90);
}
const toast = (m) => {
  const t = $("toast");
  t.textContent = m;
  t.classList.add("on");
  setTimeout(() => t.classList.remove("on"), 4500);
};
const FB = [
  ["Read_Me", ""],
  ["Rock_paper__scissors_game", "JavaScript"],
  ["WordNest-Dictionary-App", "JavaScript"],
  ["BE-Family_Hotel", "HTML"],
  ["Snake_game", "Python"],
  ["Dice_Rolling_Game", "Python"],
  ["Text_to_Audio_converter", ""],
  ["PORTFOLIO", "HTML"],
  ["button-Js", "CSS"],
  ["-Shoe-s-Market", "HTML"],
  ["first-project", "HTML"],
].map(([name, language]) => ({
  name,
  language,
  description: "",
  stargazers_count: 0,
  html_url: G + name,
}));
const LC = {
  JavaScript: "#d4a900",
  Python: "#3776ab",
  HTML: "#e34c26",
  CSS: "#264de4",
};
let prev = 0;
const ago = (d) => {
  const s = (Date.now() - new Date(d)) / 864e5;
  return s < 1 ? "pushed today" : "pushed " + Math.floor(s) + "d ago";
};
function ghRender(rs, u, live) {
  if (prev && rs.length > prev)
    toast("🎉 New repository detected: " + rs.length + " projects now");
  prev = rs.length;
  setCount($("c-repos"), rs.length);
  setCount(
    $("c-lang"),
    new Set(rs.map((r) => r.language).filter(Boolean)).size,
  );
  if (!$("gh-grid")) return;
  setCount($("g-repos"), rs.length);
  setCount(
    $("g-stars"),
    rs.reduce((a, r) => a + r.stargazers_count, 0),
  );
  setCount($("g-fol"), u ? u.followers : 3);
  $("gh-status").textContent = live
    ? "● Live from GitHub · refreshes every 5 minutes"
    : "● Offline snapshot · goes live when the site is hosted online";
  const L = [...rs]
    .sort((a, b) => new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0))
    .slice(0, 6);
  $("gh-grid").innerHTML = L.map((r) => {
    const nw = r.pushed_at && Date.now() - new Date(r.pushed_at) < 6048e5;
    return `<a class="lc in" href="${r.html_url}" target="_blank" rel="noopener"><div class="art" style="background:${LC[r.language] || "#2845ff"}"><div class="gl">${(r.language || "REPO").toUpperCase()}</div>${nw ? '<span class="new">NEW</span>' : ""}</div><div class="t"><small>${r.language || "Repository"}${r.pushed_at ? " · " + ago(r.pushed_at) : ""}</small><h3>${r.name.replace(/[-_]+/g, " ").trim()}</h3><p>${r.description || "Open on GitHub"}</p></div></a>`;
  }).join("");
}
async function ghLoad() {
  try {
    const [r, u] = await Promise.all([
      fetch(API + "/repos?per_page=100&sort=pushed").then((x) =>
        x.ok ? x.json() : Promise.reject(),
      ),
      fetch(API).then((x) => x.json()),
    ]);
    try {
      localStorage.gh = JSON.stringify([r, u]);
    } catch {}
    ghRender(r, u, 1);
  } catch {
    let c;
    try {
      c = JSON.parse(localStorage.gh);
    } catch {}
    c ? ghRender(c[0], c[1], 0) : ghRender(FB, null, 0);
  }
}
ghLoad();
setInterval(ghLoad, 3e5);
/* ---- clock, cursor, badge ---- */
const tick = () => {
  const t = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Addis_Ababa",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
  $("clock").textContent = t;
  if ($("clock2")) $("clock2").textContent = t + " local time";
};
tick();
setInterval(tick, 2e4);
const dot = $("dot");
let tx = 0,
  ty = 0,
  cx = 0,
  cy = 0;
const bd = document.querySelector(".badge");
addEventListener("mousemove", (e) => {
  tx = e.clientX;
  ty = e.clientY;
  dot.style.opacity = 1;
  if (bd) {
    const b = bd.getBoundingClientRect(),
      dx = tx - b.left - b.width / 2,
      dy = ty - b.top - b.height / 2;
    bd.style.transform =
      Math.hypot(dx, dy) < 230
        ? `translate(${dx * 0.22}px,${dy * 0.22}px)`
        : "";
  }
});
(function m() {
  cx += (tx - cx) * 0.2;
  cy += (ty - cy) * 0.2;
  dot.style.transform = `translate(${cx}px,${cy}px)`;
  requestAnimationFrame(m);
})();
document.querySelectorAll("a,.row,button").forEach((a) => {
  a.addEventListener("mouseenter", () => dot.classList.add("big"));
  a.addEventListener("mouseleave", () => dot.classList.remove("big"));
});
/* ---- scramble + reveal ---- */
const CH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*";
function scr(el) {
  const o = el.dataset.t || (el.dataset.t = el.textContent);
  let f = 0;
  const id = setInterval(() => {
    el.textContent = [...o]
      .map((c, i) => (i < f / 2 ? c : CH[(Math.random() * CH.length) | 0]))
      .join("");
    if (++f > o.length * 2 + 2) {
      el.textContent = o;
      clearInterval(id);
    }
  }, 45);
}
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      e.target.classList.contains("sc")
        ? scr(e.target)
        : e.target.classList.add("in");
    }),
  { threshold: 0.2 },
);
document.querySelectorAll(".sc,.rv").forEach((e) => io.observe(e));
/* ---- animated background ---- */
const bc = $("bgc"),
  bx = bc.getContext("2d");
let ps = [];
function rz() {
  bc.width = innerWidth;
  bc.height = innerHeight;
  ps = Array.from(
    { length: Math.min(80, ((innerWidth * innerHeight) / 16000) | 0) },
    () => ({
      x: Math.random() * bc.width,
      y: Math.random() * bc.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: 1.5 + Math.random() * 2,
    }),
  );
}
addEventListener("resize", rz);
rz();
(function a() {
  bx.clearRect(0, 0, bc.width, bc.height);
  ps.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > bc.width) p.vx *= -1;
    if (p.y < 0 || p.y > bc.height) p.vy *= -1;
    bx.fillStyle = "rgba(40,69,255,.55)";
    bx.beginPath();
    bx.arc(p.x, p.y, p.r, 0, 7);
    bx.fill();
    for (let j = i + 1; j < ps.length; j++) {
      const q = ps[j],
        d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < 140) {
        bx.strokeStyle = `rgba(40,69,255,${0.2 * (1 - d / 140)})`;
        bx.beginPath();
        bx.moveTo(p.x, p.y);
        bx.lineTo(q.x, q.y);
        bx.stroke();
      }
    }
    const m = Math.hypot(p.x - tx, p.y - ty);
    if (m < 180) {
      bx.strokeStyle = `rgba(255,79,216,${0.5 * (1 - m / 180)})`;
      bx.beginPath();
      bx.moveTo(p.x, p.y);
      bx.lineTo(tx, ty);
      bx.stroke();
    }
  });
  requestAnimationFrame(a);
})();
