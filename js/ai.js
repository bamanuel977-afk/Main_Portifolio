(() => {
  const $ = (i) => document.getElementById(i),
    cv = $("nn");
  if (!cv) return;
  const x = cv.getContext("2d"),
    S = cv.width,
    H = 8,
    rnd = () => Math.random() * 2 - 1;
  let P = [],
    cls = 1,
    run = true,
    ep = 0,
    W1,
    b1,
    W2,
    b2;
  function init() {
    W1 = Array.from({ length: H }, () => [rnd(), rnd()]);
    b1 = Array(H).fill(0);
    W2 = Array.from({ length: H }, rnd);
    b2 = 0;
    ep = 0;
  }
  init();
  function f(a, b) {
    const h = W1.map((w, j) => Math.tanh(w[0] * a + w[1] * b + b1[j]));
    let s = b2;
    h.forEach((v, j) => (s += W2[j] * v));
    return [h, 1 / (1 + Math.exp(-s))];
  }
  function step(lr) {
    P.forEach(([a, b, t]) => {
      const [h, o] = f(a, b),
        d = o - t;
      for (let j = 0; j < H; j++) {
        const g = d * W2[j] * (1 - h[j] * h[j]);
        W2[j] -= lr * d * h[j];
        W1[j][0] -= lr * g * a;
        W1[j][1] -= lr * g * b;
        b1[j] -= lr * g;
      }
      b2 -= lr * d;
    });
  }
  function draw() {
    x.clearRect(0, 0, S, S);
    const n = 36,
      c = S / n;
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++) {
        const o = f(((i + 0.5) / n) * 2 - 1, ((j + 0.5) / n) * 2 - 1)[1];
        x.fillStyle =
          o > 0.5
            ? `rgba(40,69,255,${(o - 0.5) * 0.9})`
            : `rgba(255,79,216,${(0.5 - o) * 0.9})`;
        x.fillRect(i * c, j * c, c + 1, c + 1);
      }
    let L = 0,
      A = 0;
    P.forEach(([a, b, t]) => {
      x.beginPath();
      x.arc(((a + 1) / 2) * S, ((b + 1) / 2) * S, 8, 0, 7);
      x.fillStyle = t ? "#2845ff" : "#ff4fd8";
      x.fill();
      x.lineWidth = 3;
      x.strokeStyle = "#fff";
      x.stroke();
      const o = f(a, b)[1];
      L -= t ? Math.log(o + 1e-9) : Math.log(1 - o + 1e-9);
      A += o > 0.5 == !!t;
    });
    $("ep").textContent = ep;
    $("ls").textContent = P.length ? (L / P.length).toFixed(3) : "–";
    $("ac").textContent = P.length
      ? Math.round((100 * A) / P.length) + "%"
      : "–";
  }
  (function loop() {
    if (run && P.length) {
      for (let k = 0; k < 10; k++) step(0.1);
      ep += 10;
    }
    draw();
    requestAnimationFrame(loop);
  })();
  cv.onclick = (e) => {
    const r = cv.getBoundingClientRect();
    P.push([
      ((e.clientX - r.left) / r.width) * 2 - 1,
      ((e.clientY - r.top) / r.height) * 2 - 1,
      cls,
    ]);
  };
  const PRE = {
    circles() {
      for (let i = 0; i < 40; i++) {
        const a = Math.random() * 6.28,
          r = Math.random() * 0.35,
          q = 0.65 + Math.random() * 0.25;
        P.push(
          [Math.cos(a) * r, Math.sin(a) * r, 1],
          [Math.cos(a) * q, Math.sin(a) * q, 0],
        );
      }
    },
    xor() {
      for (let i = 0; i < 60; i++) {
        const a = rnd() * 0.9,
          b = rnd() * 0.9;
        P.push([a, b, a > 0 != b > 0 ? 1 : 0]);
      }
    },
    blobs() {
      for (let i = 0; i < 30; i++)
        P.push(
          [-0.5 + rnd() * 0.3, -0.5 + rnd() * 0.3, 0],
          [0.5 + rnd() * 0.3, 0.5 + rnd() * 0.3, 1],
        );
    },
  };
  $("pre").onclick = $("ctl").onclick = (e) => {
    const a = e.target.dataset.a;
    if (!a) return;
    if (a === "A" || a === "B") {
      cls = a === "B" ? 1 : 0;
      $("ctl")
        .querySelectorAll("[data-a=A],[data-a=B]")
        .forEach((b) => b.classList.toggle("on", b.dataset.a === a));
    } else if (a === "train") {
      run = !run;
      e.target.textContent = run ? "Pause training" : "Resume training";
    } else if (a === "clear") {
      P = [];
      init();
    } else {
      P = [];
      init();
      PRE[a]();
    }
  };
  // rule-based assistant
  const KB = [
    [
      /contact|email|hire|reach|job|available/,
      "Email bamanuel977@gmail.com, or use the GitHub, Instagram, TikTok and WhatsApp links in the Contact section.",
    ],
    [
      /project|built|github|portfolio/,
      "Projects include WordNest Dictionary, BE-Family Hotel, Shoe’s Market, a Snake game and a Text to Audio tool. The GitHub section updates live with every push.",
    ],
    [
      /skill|tech|stack|language|code/,
      "Big Aman works with HTML, CSS, JavaScript and Python, and uses Git and GitHub every day.",
    ],
    [
      /\bai\b|machine|learn|future|goal/,
      "The goal is AI engineering: Python for data, then math and machine learning with scikit-learn and PyTorch. Try the neural network playground above.",
    ],
    [/school|wku|study|univers/, "He studies at WKU in Ethiopia."],
    [
      /who|about|aman/,
      "Big Aman is a developer and WKU student from Ethiopia, growing into AI engineering.",
    ],
    [
      /\b(hi|hello|hey)\b/,
      "Hello! Ask me about skills, projects, AI plans or how to contact Aman.",
    ],
  ];
  const log = $("log"),
    say = (t, c) => {
      const p = document.createElement("p");
      p.className = c;
      p.textContent = t;
      log.appendChild(p);
      log.scrollTop = 1e9;
    };
  say(
    "Hi! I’m a small rule-based assistant. Ask about Aman’s skills, projects, AI plans or contact info.",
    "bot",
  );
  const ask = (q) => {
    if (!q.trim()) return;
    say(q, "me");
    const k = KB.find(([r]) => r.test(q.toLowerCase()));
    setTimeout(
      () =>
        say(
          k
            ? k[1]
            : "I only know about Aman’s skills, projects, AI plans and contact details. Try one of those.",
          "bot",
        ),
      350,
    );
  };
  $("q").onkeydown = (e) => {
    if (e.key === "Enter") {
      ask(e.target.value);
      e.target.value = "";
    }
  };
  $("sug").onclick = (e) => {
    if (e.target.tagName === "BUTTON") ask(e.target.textContent);
  };
  // learning tracker
  const T = [
    "Python basics",
    "NumPy",
    "pandas",
    "Statistics",
    "Linear algebra",
    "scikit-learn",
    "Neural networks",
    "PyTorch & LLM apps",
  ];
  let st;
  try {
    st = JSON.parse(localStorage.aiT);
  } catch {}
  st = st || [1, 0, 0, 0, 0, 0, 0, 0];
  function tk() {
    $("tk").innerHTML = T.map(
      (t, i) =>
        `<label><input type="checkbox" data-i="${i}" ${st[i] ? "checked" : ""}>${t}</label>`,
    ).join("");
    const p = Math.round((100 * st.reduce((a, b) => a + b, 0)) / T.length);
    $("pp").textContent = p + "% of the way to AI engineer";
    $("pf").style.width = p + "%";
  }
  $("tk").onchange = (e) => {
    st[e.target.dataset.i] = e.target.checked ? 1 : 0;
    try {
      localStorage.aiT = JSON.stringify(st);
    } catch {}
    tk();
  };
  tk();
  PRE.circles();
})();
