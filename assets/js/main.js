/* chaitanyavaddi.in - shared chrome (header + footer) and interactions.
   Header and footer live here once and are mounted into every page via
   #site-header / #site-footer placeholders. Set <body data-page="..."> to
   mark the active nav item (services | about | contact). */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- theme (dark is the default) ---------- */
  var stored = null;
  try { stored = localStorage.getItem("cv-theme"); } catch (e) {}
  root.setAttribute("data-theme", stored === "light" ? "light" : "dark");

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

  /* ---------- CSS mockups for capability examples ---------- */
  var dots = '<div class="bar"><i></i><i></i><i></i></div>';
  function rep(html, n) { var s = ""; for (var i = 0; i < n; i++) s += html; return s; }
  var MK = {
    web: dots + '<div class="in"><div class="hero"></div><div class="row"><div class="ln"></div></div><div class="row"><div class="ln s"></div><div class="ln xs hl"></div></div></div>',
    grid: dots + '<div class="in"><div class="tiles">' + rep("<span></span>", 6) + '</div></div>',
    dash: dots + '<div class="in"><div class="kpis"><span></span><span></span><span></span></div><div class="bars">' + rep("<b></b>", 7) + '</div></div>',
    doc: '<div class="side"><div class="col"></div><div class="doc"><div class="ln s hl"></div><div class="ln"></div><div class="ln"></div><div class="ln s"></div><div class="ln"></div></div></div>',
    chat: dots + '<div class="in"><div class="bub you"></div><div class="bub me"></div><div class="bub you" style="width:58%"></div><div class="bub me" style="width:44%"></div></div>',
    flow: dots + '<div class="in"><div class="flow"><span class="n"></span><span class="c"></span><span class="n"></span><span class="c"></span><span class="n"></span></div><div class="row"><div class="ln"></div></div><div class="row"><div class="ln s"></div></div></div>',
    rows: dots + '<div class="in">' + rep('<div class="row"><div class="ln xs"></div><div class="ln"></div></div>', 4) + '</div>',
    test: dots + '<div class="in"><div class="row"><span class="dot"></span><div class="ln"></div></div><div class="row"><span class="dot"></span><div class="ln s"></div></div><div class="row"><span class="dot f"></span><div class="ln"></div></div><div class="row"><span class="dot"></span><div class="ln s"></div></div></div>',
    code: dots + '<div class="in"><div class="row"><div class="ln xs hl"></div></div><div class="row"><div class="ln s"></div></div><div class="row"><div class="ln"></div></div><div class="row"><div class="ln s"></div><div class="ln xs"></div></div><div class="row"><div class="ln xs hl"></div></div></div>',
    api: dots + '<div class="in"><div class="row"><span class="method">GET</span><div class="ln"></div></div><div class="row"><span class="method">POST</span><div class="ln s"></div></div><div class="row"><span class="method">GET</span><div class="ln"></div></div></div>',
    chart: dots + '<div class="in"><div class="row"><div class="ln xs hl"></div></div><div class="area"></div></div>',
    phone: '<div class="phone"><div class="ln s hl"></div><div class="ln"></div><div class="ln s"></div><div class="tiles" style="grid-template-columns:1fr 1fr"><span></span><span></span></div></div>'
  };
  var mks = document.querySelectorAll("[data-mk]");
  mks.forEach(function (el) {
    var t = el.getAttribute("data-mk");
    el.className = "mk";
    el.innerHTML = MK[t] || MK.web;
  });
})();
