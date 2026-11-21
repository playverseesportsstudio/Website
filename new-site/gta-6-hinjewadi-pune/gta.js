(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function nightAmount(p) {
    return Math.min(1, Math.max(0, (p - 0.15) / 0.7));
  }

  function apply() {
    var max = root.scrollHeight - window.innerHeight;
    var p = max <= 0 ? 1 : Math.min(1, Math.max(0, window.scrollY / max));
    if (reduce) return;
    root.style.setProperty("--p", p.toFixed(4));
    root.style.setProperty("--night", nightAmount(p).toFixed(4));
    root.classList.toggle("parked", p >= 0.97);
  }

  function loop() {
    apply();
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);

  if (reduce) {
    var finalSection = document.getElementById("final");
    if (finalSection && "IntersectionObserver" in window) {
      var endWatch = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          root.classList.toggle("at-end", entry.isIntersecting);
        });
      }, { threshold: 0.4 });
      endWatch.observe(finalSection);
    }
    return;
  }

  if (!("IntersectionObserver" in window)) return;

  function once(selector, className, options) {
    var nodes = document.querySelectorAll(selector);
    if (!nodes.length) return;
    var watch = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(className);
        watch.unobserve(entry.target);
      });
    }, options || { threshold: 0.35 });
    nodes.forEach(function (node) { watch.observe(node); });
  }

  var hero = document.getElementById("hero");
  if (hero) {
    var palmWatch = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) return;
        root.classList.add("palms-out");
        palmWatch.disconnect();
      });
    }, { threshold: 0, rootMargin: "0px 0px -40% 0px" });
    palmWatch.observe(hero);
  }
  once(".why-card", "in");
  once("#prices", "in", { threshold: 0.25 });
  once(".step", "in");
  once(".review", "in");
  once(".faq-item", "in");
})();
