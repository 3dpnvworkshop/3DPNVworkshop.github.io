/* 3DPNV 2026 — interactions: mobile nav, schedule tabs, hero point-cloud motif */
(function () {
  "use strict";

  /* ---- Mobile navigation ---- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close the menu after tapping a link (mobile)
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Schedule tabs ---- */
  var tabs = document.querySelectorAll(".sched-tabs .tab");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var targetId = tab.getAttribute("data-target");

      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle("active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });

      document.querySelectorAll(".sched-panel").forEach(function (panel) {
        var show = panel.id === targetId;
        panel.classList.toggle("active", show);
        panel.hidden = !show;
      });
    });
  });

  /* ---- Hero point-cloud motif (generated, lightweight) ---- */
  var svg = document.querySelector(".hero-bg .dots");
  if (svg && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var W = 1200, H = 600, pts = [], N = 46;
    for (var i = 0; i < N; i++) {
      pts.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 3 + 1.2 });
    }
    var frag = "";
    // connect near neighbours to suggest a 3D mesh
    for (var a = 0; a < pts.length; a++) {
      for (var b = a + 1; b < pts.length; b++) {
        var dx = pts[a].x - pts[b].x, dy = pts[a].y - pts[b].y;
        if (Math.sqrt(dx * dx + dy * dy) < 130) {
          frag += '<line x1="' + pts[a].x.toFixed(1) + '" y1="' + pts[a].y.toFixed(1) +
                  '" x2="' + pts[b].x.toFixed(1) + '" y2="' + pts[b].y.toFixed(1) +
                  '" opacity="' + (0.10).toFixed(2) + '"/>';
        }
      }
    }
    pts.forEach(function (p) {
      frag += '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) +
              '" r="' + p.r.toFixed(1) + '" opacity="' + (Math.random() * 0.4 + 0.2).toFixed(2) + '"/>';
    });
    svg.innerHTML = frag;
  }

  /* ---- Footer year (keeps copyright current if edition rolls over) ---- */
  // Static 2026 by design; uncomment to auto-update:
  // var y = document.querySelector(".copyright");
})();
