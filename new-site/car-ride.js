(function () {
  var root = document.documentElement;
  var desktop = window.matchMedia("(min-width: 768px)");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var scrollTimer = 0;

  function loadDesktopArt() {
    if (!desktop.matches) return;
    document.querySelectorAll(".car [data-src]").forEach(function (node) {
      if (!node.getAttribute("src")) node.src = node.getAttribute("data-src");
    });
  }

  function apply() {
    var max = root.scrollHeight - window.innerHeight;
    var p = max <= 0 ? 1 : Math.min(1, Math.max(0, window.scrollY / max));
    if (reduce) return;
    root.style.setProperty("--p", p.toFixed(4));
    root.classList.toggle("parked", p >= 0.97);
  }

  function loop() {
    apply();
    window.requestAnimationFrame(loop);
  }

  if (reduce) root.classList.add("parked");
  loadDesktopArt();
  desktop.addEventListener("change", loadDesktopArt);
  window.requestAnimationFrame(loop);

  if (!reduce) {
    window.addEventListener("scroll", function () {
      root.classList.add("is-scrolling");
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(function () {
        root.classList.remove("is-scrolling");
      }, desktop.matches ? 150 : 600);
    }, { passive: true });
  }
})();
