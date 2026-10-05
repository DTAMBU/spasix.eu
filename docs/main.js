// SPASIX - the few lines the page runs on: each clip plays while it is in view and stops when it
// leaves; words fade in as they arrive. With reduced motion asked for, the clips stay on their posters.
(function () {
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var videos = Array.prototype.slice.call(document.querySelectorAll("video[data-clip]"));
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (!("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
    if (!still) videos.forEach(function (v) { v.play().catch(function () {}); });
    return;
  }

  var seen = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); seen.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  reveals.forEach(function (el) { seen.observe(el); });

  if (still) return;
  var play = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) { v.play().catch(function () {}); } else { v.pause(); }
    });
  }, { threshold: 0.25 });
  videos.forEach(function (v) { play.observe(v); });
})();
