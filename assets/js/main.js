/* chaitanyavaddi.in - theme, nav, reveals */
(function () {
  "use strict";

  /* ---------- theme ---------- */
  var root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem("cv-theme", theme); } catch (e) {}
  }

  var stored = null;
  try { stored = localStorage.getItem("cv-theme"); } catch (e) {}
  // Dark is the default; only an explicit "light" preference switches away from it.
  root.setAttribute("data-theme", stored === "light" ? "light" : "dark");

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
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
      revealEls.forEach(function (el, i) {
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
  });
})();
