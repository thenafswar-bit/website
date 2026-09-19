/* Nafs Warrior — quietly records how much time you spend on the site.
   Saves to localStorage key "nafs_time_seconds" so the Progress page can show it.
   Run on this page too: it only counts time while the tab is visible. */
(function () {
  if (typeof localStorage === 'undefined') return;
  var KEY = 'nafs_time_seconds';
  var startedAt = Date.now();

  function getTotal() {
    var v = parseInt(localStorage.getItem(KEY) || '0', 10);
    return isNaN(v) ? 0 : v;
  }

  function flush() {
    var now = Date.now();
    var delta = Math.floor((now - startedAt) / 1000);
    startedAt = now;
    if (delta > 0) {
      try {
        localStorage.setItem(KEY, String(getTotal() + delta));
      } catch (e) { /* storage unavailable — skip */ }
    }
  }

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      flush();
    } else {
      startedAt = Date.now();
    }
  });
  window.addEventListener('pagehide', flush);
  window.addEventListener('beforeunload', flush);
  setInterval(flush, 30000);
})();