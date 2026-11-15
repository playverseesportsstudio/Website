(function () {
  var canvas = document.querySelector(".dots-grid");
  if (!canvas) return;

  var ctx = canvas.getContext("2d");
  var spacing = 14;
  var radius = 140;
  var dots = [];
  var cursor = { x: -9999, y: -9999 };
  var target = { x: -9999, y: -9999 };
  var strength = 0;
  var inside = false;
  var running = false;
  var frame = 0;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dots = [];
    var cols = Math.ceil(w / spacing) + 1;
    var rows = Math.ceil(h / spacing) + 1;
    var ox = (w - (cols - 1) * spacing) / 2;
    var oy = (h - (rows - 1) * spacing) / 2;
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        dots.push({ x: ox + x * spacing, y: oy + y * spacing });
      }
    }
    draw(true);
  }

  function draw(idle) {
    var w = window.innerWidth;
    var h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#0A0A0C";
    ctx.fillRect(0, 0, w, h);
    for (var i = 0; i < dots.length; i++) {
      var dot = dots[i];
      var influence = 0;
      if (!idle && strength > 0.01) {
        var dx = dot.x - cursor.x;
        var dy = dot.y - cursor.y;
        var dist = Math.hypot(dx, dy);
        if (dist < radius) {
          var t = 1 - dist / radius;
          influence = t * t * strength;
        }
      }
      var size = 1.15 + influence * 2.6;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
      if (influence > 0.04) {
        ctx.shadowBlur = 16 * influence;
        ctx.shadowColor = "rgba(17, 104, 255, " + (0.42 * influence) + ")";
        ctx.fillStyle = "rgba(58, 132, 255, " + ((0.35 + influence * 0.65) * 0.5) + ")";
      } else {
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(90, 130, 190, 0.19)";
      }
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  }

  function tick() {
    if (!running) return;
    cursor.x += (target.x - cursor.x) * 0.12;
    cursor.y += (target.y - cursor.y) * 0.12;
    strength += ((inside ? 1 : 0) - strength) * 0.06;
    draw(false);
    frame = requestAnimationFrame(tick);
  }

  function start() {
    if (reduced || running || document.hidden) return;
    running = true;
    frame = requestAnimationFrame(tick);
  }

  function stop() {
    running = false;
    if (frame) cancelAnimationFrame(frame);
  }

  window.addEventListener("pointermove", function (event) {
    target.x = event.clientX;
    target.y = event.clientY;
    inside = true;
    start();
  });

  window.addEventListener("pointerleave", function () {
    inside = false;
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else start();
  });

  window.addEventListener("resize", resize);
  resize();
  if (!reduced) start();
})();
