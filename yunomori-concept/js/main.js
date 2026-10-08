/* Yunomori — Independent Homepage Concept by Valewick House
   Vanilla JS, no dependencies. Motion is transform/opacity only and respects reduced-motion. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var doc = document;

  /* ---------- Scroll reveals ---------- */
  var revealTargets = doc.querySelectorAll(".reveal:not(.hero .reveal), .img-reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Restrained parallax (rAF-throttled, transform only) ---------- */
  var layers = Array.prototype.slice.call(doc.querySelectorAll("[data-parallax], [data-parallax-inner]"));
  var ticking = false;

  function update() {
    var vh = window.innerHeight;
    layers.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > vh + 100) return;
      var speed = parseFloat(el.dataset.parallax || el.dataset.parallaxInner);
      var offset = (rect.top + rect.height / 2 - vh / 2) * speed * -1;
      var target = el.dataset.parallaxInner !== undefined ? el.querySelector(".scene") || el : el;
      target.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
    });
    ticking = false;
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  if (!reduce && layers.length) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /* ---------- Header tone: stays light over hero, switches on light sections ---------- */
  var header = doc.querySelector(".site-header");

  /* ---------- Mobile menu ---------- */
  var toggle = doc.querySelector(".menu-toggle");
  var menu = doc.getElementById("menu");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) { menu.removeAttribute("hidden"); } else { menu.setAttribute("hidden", ""); }
    doc.body.classList.toggle("menu-open", open);
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
    window.matchMedia("(min-width: 961px)").addEventListener("change", function (m) {
      if (m.matches) setMenu(false);
    });
  }

  /* ---------- Sticky mobile booking bar: appears after the hero, hides at the final CTA ---------- */
  var bar = doc.querySelector(".book-bar");
  var hero = doc.querySelector(".hero");
  var final = doc.querySelector(".final");
  if (bar && hero && "IntersectionObserver" in window) {
    var heroGone = false, finalSeen = false;
    function sync() {
      var show = heroGone && !finalSeen;
      bar.classList.toggle("is-visible", show);
      bar.setAttribute("aria-hidden", String(!show));
      var link = bar.querySelector("a");
      if (link) link.tabIndex = show ? 0 : -1;
    }
    new IntersectionObserver(function (en) { heroGone = !en[0].isIntersecting; sync(); }, { threshold: 0.2 }).observe(hero);
    if (final) new IntersectionObserver(function (en) { finalSeen = en[0].isIntersecting; sync(); }, { threshold: 0.35 }).observe(final);
  }

  /* header reference kept for future tone switching */
  void header;
})();
