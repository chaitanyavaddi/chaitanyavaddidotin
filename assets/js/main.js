/* chaitanyavaddi.in - shared chrome (header + footer) and interactions.
   Header and footer live here once and are mounted into every page via
   #site-header / #site-footer placeholders. Set <body data-page="..."> to
   mark the active nav item (services | about | contact). */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- theme (light is the default) ---------- */
  var stored = null;
  try { stored = localStorage.getItem("cv-theme"); } catch (e) {}
  root.setAttribute("data-theme", stored === "dark" ? "dark" : "light");

  /* ---------- shared markup ---------- */
  var CAL = "https://cal.com/chaitanyavaddi/project-enquiry";
  var page = document.body.getAttribute("data-page") || "";

  function current(p) { return p === page ? ' aria-current="page"' : ""; }

  function headerHTML() {
    return '' +
      '<a class="skip-link" href="#main">Skip to content</a>' +
      '<header class="site-header"><div class="wrap">' +
        '<a class="brand" href="/">Chaitanya <span class="brand-dot">Vaddi</span></a>' +
        '<nav class="site-nav" aria-label="Main">' +
          '<a href="/services.html"' + current("services") + '>Services</a>' +
          '<a href="/#work">Work</a>' +
          '<a href="/about.html"' + current("about") + '>About</a>' +
          '<a href="/contact.html"' + current("contact") + '>Contact</a>' +
        '</nav>' +
        '<div class="header-actions">' +
          '<button class="theme-toggle" type="button" aria-label="Toggle color theme">' +
            '<svg class="icon-moon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' +
            '<svg class="icon-sun" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>' +
          '</button>' +
          '<a class="btn btn-solid header-cta" href="' + CAL + '" target="_blank" rel="noopener">Book a call</a>' +
          '<button class="nav-burger" type="button" aria-label="Open menu" aria-expanded="false">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
          '</button>' +
        '</div>' +
      '</div></header>';
  }

  function footerHTML() {
    return '' +
      '<footer class="site-footer"><div class="wrap">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<a class="brand" href="/">Chaitanya <span class="brand-dot">Vaddi</span></a>' +
            '<p>Software engineer in Hyderabad, India. Python, Django and FastAPI, for clients worldwide.</p>' +
          '</div>' +
          '<div class="footer-col"><h3>Site</h3><ul>' +
            '<li><a href="/">Home</a></li>' +
            '<li><a href="/services.html">Services</a></li>' +
            '<li><a href="/#work">Work</a></li>' +
            '<li><a href="/about.html">About</a></li>' +
            '<li><a href="/contact.html">Contact</a></li>' +
          '</ul></div>' +
          '<div class="footer-col"><h3>Legal</h3><ul>' +
            '<li><a href="/privacy.html">Privacy policy</a></li>' +
            '<li><a href="/terms.html">Terms and conditions</a></li>' +
            '<li><a href="/refunds.html">Refunds and cancellations</a></li>' +
            '<li><a href="/delivery.html">Service delivery</a></li>' +
          '</ul></div>' +
          '<div class="footer-col"><h3>Elsewhere</h3><ul>' +
            '<li><a href="https://github.com/chaitanyavaddi" target="_blank" rel="noopener">GitHub</a></li>' +
            '<li><a href="https://www.linkedin.com/in/vaddichaitanya/" target="_blank" rel="noopener">LinkedIn</a></li>' +
            '<li><a href="mailto:hellochaitanyavaddi@gmail.com">Email</a></li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>© <span data-year>2026</span> Chaitanya Vaddi. All rights reserved.</span>' +
          '<span class="sdg">Soli Deo Gloria · to God alone be the glory</span>' +
          '<span>Set in Bricolage Grotesque and JetBrains Mono.</span>' +
        '</div>' +
      '</div></footer>';
  }

  /* ---------- mount shared chrome ---------- */
  var headerMount = document.getElementById("site-header");
  if (headerMount) headerMount.outerHTML = headerHTML();
  var footerMount = document.getElementById("site-footer");
  if (footerMount) footerMount.outerHTML = footerHTML();

  /* ---------- theme toggle ---------- */
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("cv-theme", next); } catch (e) {}
    });
  }

  /* ---------- mobile nav ---------- */
  var burger = document.querySelector(".nav-burger");
  var nav = document.querySelector(".site-nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- scroll reveals ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      var delay = el.getAttribute("data-delay");
      if (delay) el.style.transitionDelay = delay + "ms";
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- footer year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- capability example images (real photos, per discipline) ---------- */
  function discOf(el) { var s = el.closest("section[id]"); return s ? s.id : ""; }
  var IMG = {
    web: ["/assets/img/svc/web1.webp", "/assets/img/svc/web2.webp", "/assets/img/svc/web3.webp", "/assets/img/svc/web4.webp", "/assets/img/svc/web5.webp", "/assets/img/svc/web6.webp"],
    ai: ["/assets/img/svc/ai1.webp", "/assets/img/svc/ai2.webp", "/assets/img/svc/ai3.webp", "/assets/img/svc/ai4.webp", "/assets/img/svc/ai5.webp", "/assets/img/svc/ai6.webp"],
    data: ["/assets/img/svc/data1.webp", "/assets/img/svc/data2.webp", "/assets/img/svc/data3.webp", "/assets/img/svc/data4.webp", "/assets/img/svc/data5.webp"],
    qa: ["/assets/img/svc/qa1.webp", "/assets/img/svc/qa2.webp", "/assets/img/svc/qa3.webp", "/assets/img/svc/qa4.webp", "/assets/img/svc/qa5.webp"],
    devops: ["/assets/img/svc/devops1.webp", "/assets/img/svc/devops2.webp", "/assets/img/svc/devops3.webp", "/assets/img/svc/devops4.webp", "/assets/img/svc/devops5.webp"],
    mobile: ["/assets/img/svc/mobile1.webp", "/assets/img/svc/mobile2.webp", "/assets/img/svc/mobile3.webp", "/assets/img/svc/mobile4.webp", "/assets/img/svc/mobile5.webp", "/assets/img/svc/mobile6.webp"]
  };
  var imgCount = {};
  document.querySelectorAll(".ex-thumb [data-mk]").forEach(function (el) {
    var d = discOf(el);
    var pool = IMG[d];
    var thumb = el.parentNode;
    if (!pool || !pool.length) { el.remove(); return; }
    imgCount[d] = imgCount[d] || 0;
    var src = pool[imgCount[d] % pool.length];
    imgCount[d]++;
    var card = thumb.closest(".ex-card");
    var nm = card && card.querySelector(".ex-name");
    var img = document.createElement("img");
    img.className = "ex-img";
    img.src = src;
    img.loading = "lazy";
    img.width = 480; img.height = 300;
    img.alt = nm ? nm.textContent : "";
    thumb.replaceChild(img, el);
  });

  /* ---------- logo marquees ("apps like ...") via logo.dev ---------- */
  var LOGO_TOKEN = "pk_bHEnuVSETzOGsD2S3iKRGg";
  var LOGOS = {
    web: ["flipkart.com", "meesho.com", "myntra.com", "zomato.com", "swiggy.com", "nykaa.com", "airbnb.com", "booking.com", "shopify.com", "notion.so", "medium.com", "cred.club", "zerodha.com", "bookmyshow.com"],
    ai: ["openai.com", "anthropic.com", "perplexity.ai", "github.com", "intercom.com", "zendesk.com", "hubspot.com", "jasper.ai", "notion.so", "grammarly.com", "midjourney.com", "harvey.ai"],
    data: ["snowflake.com", "databricks.com", "tableau.com", "looker.com", "segment.com", "fivetran.com", "airbyte.com", "metabase.com", "amplitude.com", "mixpanel.com", "getdbt.com", "grafana.com"],
    qa: ["playwright.dev", "cypress.io", "selenium.dev", "browserstack.com", "saucelabs.com", "postman.com", "testrail.com", "circleci.com", "github.com", "sentry.io"],
    devops: ["docker.com", "kubernetes.io", "aws.amazon.com", "cloud.google.com", "cloudflare.com", "gitlab.com", "github.com", "jenkins.io", "hashicorp.com", "grafana.com", "datadoghq.com", "digitalocean.com"],
    mobile: ["swiggy.com", "zomato.com", "uber.com", "olacabs.com", "phonepe.com", "paytm.com", "whatsapp.com", "instagram.com", "flipkart.com", "meesho.com", "cred.club", "dream11.com"]
  };
  function logoChip(domain) {
    return '<span class="logo-chip"><img loading="lazy" onerror="this.parentNode.style.display=\'none\'" ' +
      'src="https://img.logo.dev/' + domain + '?token=' + LOGO_TOKEN + '&size=48&format=png&retina=true" ' +
      'alt="' + domain + '"></span>';
  }
  document.querySelectorAll(".shelf-wrap").forEach(function (wrap) {
    var d = discOf(wrap);
    var set = LOGOS[d];
    if (!set || !set.length) return;
    var chips = set.map(logoChip).join("");
    var box = document.createElement("div");
    box.className = "logos";
    box.innerHTML = '<span class="logos-label">Apps like</span>' +
      '<div class="marq"><div class="marq-track">' + chips + chips + '</div></div>';
    wrap.appendChild(box);
  });

  /* ---------- logo wall ("apps like these", each links to the app) ---------- */
  var WALL = [
    "flipkart.com", "amazon.com", "myntra.com", "meesho.com", "nykaa.com", "ajio.com",
    "zomato.com", "swiggy.com", "ubereats.com", "uber.com", "olacabs.com", "rapido.bike",
    "airbnb.com", "booking.com", "makemytrip.com", "oyorooms.com", "bookmyshow.com", "goibibo.com",
    "netflix.com", "hotstar.com", "spotify.com", "youtube.com", "primevideo.com", "twitch.tv",
    "instagram.com", "whatsapp.com", "telegram.org", "linkedin.com", "x.com", "pinterest.com",
    "slack.com", "discord.com", "notion.so", "figma.com", "canva.com", "trello.com",
    "shopify.com", "stripe.com", "razorpay.com", "paytm.com", "phonepe.com", "cred.club",
    "zerodha.com", "groww.in", "coinbase.com", "upstox.com",
    "coursera.org", "udemy.com", "unacademy.com", "practo.com"
  ];
  var LOGO_TOKEN_WALL = "pk_bHEnuVSETzOGsD2S3iKRGg";
  function wallName(d) {
    var n = d.split(".")[0];
    return n.charAt(0).toUpperCase() + n.slice(1);
  }
  function wallTile(d) {
    return '<a class="lw-tile" href="https://' + d + '" target="_blank" rel="noopener" title="' + wallName(d) + '">' +
      '<img class="lw-logo" loading="lazy" src="https://img.logo.dev/' + d + '?token=' + LOGO_TOKEN_WALL + '&size=48&format=png&retina=true&fallback=monogram" alt="' + wallName(d) + ' logo">' +
      '<span class="lw-name">' + wallName(d) + '</span></a>';
  }
  document.querySelectorAll("[data-logowall]").forEach(function (el) {
    el.innerHTML = WALL.map(wallTile).join("") +
      '<span class="lw-tile lw-more">+200 more</span>';
  });

  /* ---------- scroll-driven left-to-right text fill ---------- */
  var rt = document.querySelector(".reveal-text");
  if (rt) {
    var words = rt.textContent.trim().split(/\s+/);
    rt.innerHTML = words.map(function (w) { return '<span class="rw">' + w + "</span>"; }).join(" ");
    var rws = rt.querySelectorAll(".rw");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      rws.forEach(function (s) { s.classList.add("on"); });
    } else {
      var paint = function () {
        var r = rt.getBoundingClientRect();
        var vh = window.innerHeight || document.documentElement.clientHeight;
        var start = vh * 0.82, end = vh * 0.42;
        var p = (start - r.top) / (start - end);
        p = Math.max(0, Math.min(1, p));
        var n = Math.round(p * rws.length);
        rws.forEach(function (s, i) { s.classList.toggle("on", i < n); });
      };
      var ticking = false;
      var onScroll = function () {
        if (!ticking) { requestAnimationFrame(function () { paint(); ticking = false; }); ticking = true; }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      paint();
    }
  }

  /* ---------- "+N more" on domains and stacks ---------- */
  var DOMAIN_MORE = [40, 30, 25, 50, 20, 35];
  var STACK_MORE = [15, 12, 20, 9, 18, 14];
  document.querySelectorAll(".tag-row").forEach(function (row, i) {
    var s = document.createElement("span");
    s.className = "tag more";
    s.textContent = "+" + DOMAIN_MORE[i % DOMAIN_MORE.length] + " more";
    row.appendChild(s);
  });
  document.querySelectorAll(".stack-row").forEach(function (row, i) {
    var s = document.createElement("span");
    s.className = "chip more";
    s.textContent = "+" + STACK_MORE[i % STACK_MORE.length] + " more";
    row.appendChild(s);
  });

  /* ---------- discipline accordions ---------- */
  function setChapter(ch, open) {
    ch.classList.toggle("open", open);
    var btn = ch.querySelector(".chapter-toggle");
    if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) ch.querySelectorAll(".reveal").forEach(function (e) { e.classList.add("is-in"); });
  }

  document.querySelectorAll(".chapter").forEach(function (ch) {
    var head = ch.querySelector(".chapter-head");
    var wrap = ch.querySelector(".wrap");
    if (!head || !wrap) return;

    // move everything after the head into a collapsible body
    var body = document.createElement("div");
    body.className = "chapter-body";
    body.id = ch.id + "-body";
    var n = head.nextSibling;
    while (n) { var next = n.nextSibling; body.appendChild(n); n = next; }
    wrap.appendChild(body);

    // clickable toggle covering the header + a chevron
    var title = ch.querySelector("h2");
    var btn = document.createElement("button");
    btn.className = "chapter-toggle";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", body.id);
    btn.innerHTML = '<span class="sr-only">Show ' + (title ? title.textContent : "section") + ' categories</span>';
    head.appendChild(btn);

    var chev = document.createElement("span");
    chev.className = "chev";
    chev.setAttribute("aria-hidden", "true");
    chev.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>';
    head.appendChild(chev);

    btn.addEventListener("click", function () {
      setChapter(ch, !ch.classList.contains("open"));
    });
  });

  // open a chapter when its index pill is clicked, or when linked by hash
  function openFromHash() {
    var id = (location.hash || "").replace("#", "");
    if (!id) return;
    var ch = document.getElementById(id);
    if (ch && ch.classList.contains("chapter")) {
      setChapter(ch, true);
      ch.scrollIntoView();
    }
  }
  document.querySelectorAll(".cap-index a").forEach(function (a) {
    a.addEventListener("click", function () {
      var ch = document.getElementById((a.getAttribute("href") || "").replace("#", ""));
      if (ch) setChapter(ch, true);
    });
  });
  window.addEventListener("hashchange", openFromHash);
  openFromHash();
})();
