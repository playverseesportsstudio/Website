(function () {
  var launch = new Date("2026-11-19T13:00:00+05:30");
  var line = document.getElementById("gta-strip-line");
  var ticker = document.getElementById("gta-ticker");
  var daysEl = document.getElementById("gta-days");
  var hoursEl = document.getElementById("gta-hours");
  var minsEl = document.getElementById("gta-mins");
  var secsEl = document.getElementById("gta-secs");
  if (!line || !ticker || !daysEl || !hoursEl || !minsEl || !secsEl) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var timer = 0;

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function render() {
    var diff = launch.getTime() - Date.now();
    if (diff <= 0) {
      line.textContent = "GTA VI is now live at Playverse. Play it on PS5.";
      ticker.hidden = true;
      if (timer) clearInterval(timer);
      return;
    }
    var total = Math.floor(diff / 1000);
    var days = Math.floor(total / 86400);
    var hours = Math.floor((total % 86400) / 3600);
    var mins = Math.floor((total % 3600) / 60);
    var secs = total % 60;
    daysEl.textContent = String(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent = pad(mins);
    secsEl.textContent = pad(secs);
  }

  render();
  if (launch.getTime() > Date.now()) {
    timer = setInterval(render, reduced ? 60000 : 1000);
  }
})();

(function () {
  var tabs = document.querySelectorAll("#games [role='tab']");
  if (!tabs.length) return;
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function (event) {
      event.preventDefault();
      tabs.forEach(function (item) {
        var on = item === tab;
        item.classList.toggle("tab-active", on);
        item.setAttribute("aria-selected", on ? "true" : "false");
        var panel = document.getElementById(item.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
    });
  });
})();
