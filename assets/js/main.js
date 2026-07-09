/* ============================================================
   MAIN.JS — all interactive behaviour for the portfolio.
   Organised into small independent functions, each initialised
   once at the bottom of the file (init()).
   ============================================================ */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Loader ---------- */
function initLoader() {
  window.addEventListener("load", () => {
    setTimeout(() => document.getElementById("loader").classList.add("hide"), 500);
  });
}

/* ---------- Custom cursor ---------- */
function initCursor() {
  if (window.matchMedia("(hover: none)").matches) return;
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  let rx = 0, ry = 0, mx = 0, my = 0;
  window.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + "px"; dot.style.top = my + "px";
  });
  (function loop() {
    rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
    ring.style.left = rx + "px"; ring.style.top = ry + "px";
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll("a, button, .skill-card, .project-card, .cert-card").forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("hovered"));
    el.addEventListener("mouseleave", () => ring.classList.remove("hovered"));
  });
}

/* ---------- Scroll progress bar ---------- */
function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = pct + "%";
  });
}

/* ---------- Neural mesh canvas (signature background element) ---------- */
function initMeshCanvas() {
  const canvas = document.getElementById("meshCanvas");
  const ctx = canvas.getContext("2d");
  let w, h, nodes = [];
  const mouse = { x: -9999, y: -9999 };

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(70, Math.floor((w * h) / 22000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
  }
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  resize();

  function frame() {
    ctx.clearRect(0, 0, w, h);
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
      if (d < 160) { n.x += (n.x - mouse.x) * 0.002; n.y += (n.y - mouse.y) * 0.002; }
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 140) {
          ctx.strokeStyle = `rgba(139,92,246,${0.12 * (1 - dist / 140)})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      ctx.fillStyle = "rgba(34,211,238,0.5)";
      ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, 1.6, 0, Math.PI * 2); ctx.fill();
    }
    if (!prefersReducedMotion) requestAnimationFrame(frame);
  }
  frame();
}

/* ---------- Hero mouse-follow glow ---------- */
function initHeroGlow() {
  const hero = document.querySelector(".hero");
  const glow = document.getElementById("heroGlow");
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    glow.style.transform = `translate(${e.clientX - r.left - 320}px, ${e.clientY - r.top - 320}px)`;
  });
}

/* ---------- Typing effect for rotating roles ---------- */
function initTypedRoles() {
  const el = document.getElementById("typedRole");
  let roleIndex = 0, charIndex = 0, deleting = false;
  function tick() {
    const word = ROLES[roleIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) { deleting = true; setTimeout(tick, 1400); return; }
    } else {
      charIndex--;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % ROLES.length; }
    }
    setTimeout(tick, deleting ? 45 : 85);
  }
  tick();
}

/* ---------- Navbar: hide on scroll down / show on up + scrollspy ---------- */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const links = document.querySelectorAll(".nav-link");
  const sections = [...links].map((l) => document.getElementById(l.dataset.section));
  let lastY = window.scrollY;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (y > lastY && y > 140) navbar.classList.add("nav-hidden");
    else navbar.classList.remove("nav-hidden");
    lastY = y;

    let current = sections[0];
    for (const s of sections) if (s && window.scrollY >= s.offsetTop - 180) current = s;
    links.forEach((l) => l.classList.toggle("active", l.dataset.section === current?.id));
  });

  // Mobile menu
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  hamburger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open);
  });
  links.forEach((l) => l.addEventListener("click", () => { navLinks.classList.remove("open"); hamburger.classList.remove("open"); }));
}

/* ---------- Theme toggle (persists in localStorage) ---------- */
function initTheme() {
  const btn = document.getElementById("themeToggle");
  const saved = localStorage.getItem("hk-theme");
  if (saved) document.documentElement.dataset.theme = saved;
  btn.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("hk-theme", next);
  });
}

/* ---------- Reveal-on-scroll ---------- */
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view"); });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* ---------- Animated stat counters ---------- */
function initStats() {
  const grid = document.querySelector(".stats-grid");
  if (!grid) return;
  grid.innerHTML = STATS.map((s) => `
    <div class="stat-card">
      <div class="stat-num" data-target="${s.value}">0</div>
      <div class="stat-label">${s.label}</div>
    </div>`).join("");

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target; const target = +el.dataset.target;
      let cur = 0; const step = Math.max(1, Math.ceil(target / 60));
      const t = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(t); }
        el.textContent = cur;
      }, 20);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  grid.querySelectorAll(".stat-num").forEach((el) => io.observe(el));
}

/* ---------- Skill cards (with tilt + progress bars) ---------- */
function initSkills() {
  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = SKILLS.map((s) => `
    <div class="skill-card" data-level="${s.level}">
      <img src="${s.icon}" alt="${s.name}" loading="lazy" width="40" height="40" onerror="this.style.opacity=0"/>
      <div class="skill-name">${s.name}</div>
      <div class="skill-bar"><span></span></div>
    </div>`).join("");

  // Progress bar fill on scroll into view
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const bar = e.target.querySelector(".skill-bar span");
      bar.style.width = e.target.dataset.level + "%";
      io.unobserve(e.target);
    });
  }, { threshold: 0.3 });
  grid.querySelectorAll(".skill-card").forEach((card) => {
    io.observe(card);
    if (prefersReducedMotion || window.matchMedia("(hover: none)").matches) return;
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(500px) rotateX(${-py * 10}deg) rotateY(${px * 10}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
}

/* ---------- Design projects + tabs ---------- */
function initDesignProjects() {
  const grid = document.getElementById("designProjectsGrid");
  grid.innerHTML = DESIGN_PROJECTS.map((p) => `
    <div class="project-card">
      <div class="project-media"><img src="./${p.img}" alt="${p.title}" loading="lazy"/></div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="tag-row">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      </div>
    </div>`).join("");
}

function initTabs() {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("active"); tab.setAttribute("aria-selected", "true");
      document.querySelectorAll(".tab-panel").forEach((p) => { p.classList.remove("active"); p.hidden = true; });
      const panel = document.getElementById("panel-" + tab.dataset.tab);
      panel.classList.add("active"); panel.hidden = false;
    });
  });
}

/* ---------- GitHub API: live repos + stats + contribution graph ---------- */
async function initGitHub() {
  const codeGrid = document.getElementById("codeProjectsGrid");
  const statsGrid = document.getElementById("ghStatsGrid");
  const contribImg = document.getElementById("ghContribGraph");
  contribImg.src = `https://ghchart.rshah.org/8b5cf6/${GITHUB_USERNAME}`;

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`),
    ]);
    if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");
    const user = await userRes.json();
    const repos = await reposRes.json();

    const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
    statsGrid.innerHTML = `
      <div class="gh-stat"><div class="num">${user.public_repos ?? "—"}</div><div class="lbl">Public Repos</div></div>
      <div class="gh-stat"><div class="num">${user.followers ?? "—"}</div><div class="lbl">Followers</div></div>
      <div class="gh-stat"><div class="num">${totalStars}</div><div class="lbl">Total Stars</div></div>
      <div class="gh-stat"><div class="num">${user.public_gists ?? "0"}</div><div class="lbl">Gists</div></div>
    `;

    const top = repos
      .filter((r) => !r.fork)
      .sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at) - new Date(a.pushed_at)))
      .slice(0, 6);

    if (!top.length) {
      codeGrid.innerHTML = `<p class="loading-text">No public repositories found yet — check back soon.</p>`;
      return;
    }

    codeGrid.innerHTML = top.map((r) => `
      <div class="project-card">
        <div class="project-body">
          <h3 class="project-title">${r.name}</h3>
          <p class="project-desc">${r.description ? r.description : "No description provided yet."}</p>
          <div class="project-stats">
            <span>★ ${r.stargazers_count}</span>
            <span>⑂ ${r.forks_count}</span>
            ${r.language ? `<span>${r.language}</span>` : ""}
          </div>
          <div class="project-links">
            <a href="${r.html_url}" target="_blank" rel="noopener">GitHub →</a>
            ${r.homepage ? `<a href="${r.homepage}" target="_blank" rel="noopener">Live Demo →</a>` : ""}
          </div>
        </div>
      </div>`).join("");
  } catch (err) {
    codeGrid.innerHTML = `<p class="loading-text">Couldn't load GitHub data right now. <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener" style="color:var(--grad-2)">View profile directly →</a></p>`;
    statsGrid.innerHTML = "";
  }
}

/* ---------- Timeline ---------- */
function initTimeline() {
  const wrap = document.getElementById("timeline");
  wrap.innerHTML = TIMELINE.map((t) => `
    <div class="tl-item reveal">
      <span class="tl-dot"></span>
      <span class="tl-badge">${t.type === "work" ? "Experience" : "Education"}</span>
      <div class="tl-year">${t.year}</div>
      <h3 class="tl-title">${t.title}</h3>
      <div class="tl-org">${t.org}</div>
      <p class="tl-desc">${t.desc}</p>
    </div>`).join("");
  // Re-run reveal observer for freshly injected nodes
  document.querySelectorAll("#timeline .reveal").forEach((el) => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")), { threshold: 0.15 });
    io.observe(el);
  });
}

/* ---------- Certificates + modal ---------- */
function initCertificates() {
  const grid = document.getElementById("certGrid");
  grid.innerHTML = CERTIFICATES.map((c, i) => `
    <div class="cert-card" data-index="${i}">
      <div class="cert-icon">${c.title.slice(0,1)}</div>
      <h3>${c.title}</h3>
      <p>${c.issuer} · ${c.date}</p>
    </div>`).join("");

  const modal = document.getElementById("certModal");
  const body = document.getElementById("certModalBody");
  grid.querySelectorAll(".cert-card").forEach((card) => {
    card.addEventListener("click", () => {
      const c = CERTIFICATES[+card.dataset.index];
      body.innerHTML = `
        ${c.img ? `<img src="${c.img}" alt="${c.title}" style="width:100%;border-radius:12px;margin-bottom:16px"/>` : ""}
        <h3 style="font-family:var(--font-display);margin:0 0 6px">${c.title}</h3>
        <p style="color:var(--text-muted);margin:0">${c.issuer} · ${c.date}</p>`;
      modal.classList.add("open");
    });
  });
  document.getElementById("certModalClose").addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("open"); });
}

/* ---------- Copy email ---------- */
function initCopyEmail() {
  const btn = document.getElementById("copyEmailBtn");
  const flag = document.getElementById("copyFlag");
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      flag.classList.add("show");
      setTimeout(() => flag.classList.remove("show"), 1500);
    } catch { /* clipboard unavailable — no-op */ }
  });
}

/* ---------- Contact form (Formspree) + validation + confetti ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  const submitBtn = document.getElementById("submitBtn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll(".form-error").forEach((el) => (el.textContent = ""));

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (name.length < 2) { setError("fName", "Please enter your name."); valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("fEmail", "Please enter a valid email."); valid = false; }
    if (message.length < 10) { setError("fMsg", "Message should be at least 10 characters."); valid = false; }
    if (!valid) return;

    submitBtn.textContent = "Sending…";
    submitBtn.disabled = true;

    try {
      const res = await fetch(CONTACT.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error("Form submission failed");
      success.classList.add("show");
      form.reset();
      launchConfetti();
    } catch {
      setError("fMsg", "Couldn't send right now — email me directly instead.");
    } finally {
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
    }
  });

  function setError(id, msg) {
    const el = document.querySelector(`.form-error[data-for="${id}"]`);
    if (el) el.textContent = msg;
  }
}

/* ---------- Confetti burst ---------- */
function launchConfetti() {
  if (prefersReducedMotion) return;
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const colors = ["#8b5cf6", "#22d3ee", "#ec4899"];
  const pieces = Array.from({ length: 140 }, () => ({
    x: canvas.width / 2, y: canvas.height / 3,
    vx: (Math.random() - 0.5) * 12, vy: Math.random() * -10 - 4,
    size: Math.random() * 6 + 4, color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * 360,
  }));
  let frame = 0;
  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.rot += 6;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color; ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
    frame++;
    if (frame < 110) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  tick();
}

/* ---------- Back to top ---------- */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  window.addEventListener("scroll", () => btn.classList.toggle("show", window.scrollY > 600));
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- Magnetic buttons ---------- */
function initMagnetic() {
  if (prefersReducedMotion || window.matchMedia("(hover: none)").matches) return;
  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25;
      const y = (e.clientY - r.top - r.height / 2) * 0.25;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
  });
}

/* ---------- Command palette (Ctrl+K) ---------- */
function initPalette() {
  const overlay = document.getElementById("paletteOverlay");
  const input = document.getElementById("paletteInput");
  const list = document.getElementById("paletteResults");

  const commands = [
    { label: "Go to Home", action: () => scrollToId("home") },
    { label: "Go to About", action: () => scrollToId("about") },
    { label: "Go to Skills", action: () => scrollToId("skills") },
    { label: "Go to Projects", action: () => scrollToId("projects") },
    { label: "Go to Experience", action: () => scrollToId("experience") },
    { label: "Go to Certificates", action: () => scrollToId("certificates") },
    { label: "Go to Contact", action: () => scrollToId("contact") },
    { label: "Toggle theme", action: () => document.getElementById("themeToggle").click() },
    { label: "Open GitHub profile", action: () => window.open(CONTACT.github, "_blank") },
    { label: "Open LinkedIn profile", action: () => window.open(CONTACT.linkedin, "_blank") },
    { label: "Copy email address", action: () => document.getElementById("copyEmailBtn").click() },
    { label: "✨ You found the easter egg", action: () => launchConfetti() },
  ];

  function scrollToId(id) { document.getElementById(id).scrollIntoView({ behavior: "smooth" }); }

  function render(filter = "") {
    const filtered = commands.filter((c) => c.label.toLowerCase().includes(filter.toLowerCase()));
    list.innerHTML = filtered.map((c, i) => `<li data-i="${i}" class="${i === 0 ? "active" : ""}">${c.label}</li>`).join("");
    list.dataset.filtered = JSON.stringify(filtered.map((c) => c.label));
    return filtered;
  }
  let currentFiltered = commands;

  function open() {
    overlay.classList.add("open"); input.value = ""; currentFiltered = render(); input.focus();
  }
  function close() { overlay.classList.remove("open"); }

  document.getElementById("paletteBtn").addEventListener("click", open);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  input.addEventListener("input", () => { currentFiltered = render(input.value); });

  list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    const cmd = currentFiltered[+li.dataset.i];
    if (cmd) cmd.action();
    close();
  });

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); open(); }
    if (e.key === "Escape") { close(); document.getElementById("certModal").classList.remove("open"); }
    if (overlay.classList.contains("open")) {
      const items = [...list.querySelectorAll("li")];
      let idx = items.findIndex((i) => i.classList.contains("active"));
      if (e.key === "ArrowDown") { e.preventDefault(); idx = Math.min(idx + 1, items.length - 1); }
      if (e.key === "ArrowUp") { e.preventDefault(); idx = Math.max(idx - 1, 0); }
      if (e.key === "Enter" && items[idx]) { currentFiltered[idx]?.action(); close(); }
      items.forEach((it, i) => it.classList.toggle("active", i === idx));
    }
  });
}

/* ---------- Footer year ---------- */
function initFooterYear() {
  document.getElementById("year").textContent = new Date().getFullYear();
}

/* ---------- Init ---------- */
function init() {
  initLoader();
  initCursor();
  initScrollProgress();
  if (!prefersReducedMotion) initMeshCanvas();
  initHeroGlow();
  initTypedRoles();
  initNavbar();
  initTheme();
  initStats();
  initSkills();
  initDesignProjects();
  initTabs();
  initGitHub();
  initTimeline();
  initCertificates();
  initCopyEmail();
  initContactForm();
  initBackToTop();
  initMagnetic();
  initPalette();
  initFooterYear();
  initReveal();
}

document.addEventListener("DOMContentLoaded", init);
