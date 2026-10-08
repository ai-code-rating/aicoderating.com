// Theme: "dark" (the default) and "light" set data-theme on <html>; "system" follows the OS setting.
// <html> ships with data-theme="dark", so visitors without JS get dark too. Loaded in <head> so a
// saved choice applies before the page paints.
(function () {
    var KEY = 'acrTheme';
    var ORDER = ['dark', 'light', 'system'];

    function load() {
        // Anything not recognised (or nothing saved) means "dark"
        var saved = null;
        try { saved = localStorage.getItem(KEY); } catch (e) {}
        return ORDER.indexOf(saved) === -1 ? 'dark' : saved;
    }

    function apply(theme) {
        if (theme === 'system') document.documentElement.removeAttribute('data-theme');
        else document.documentElement.setAttribute('data-theme', theme);
    }

    apply(load());

    document.addEventListener('DOMContentLoaded', function () {
        var btn = document.getElementById('theme-toggle');
        if (!btn) return;
        var label = function (t) { btn.textContent = 'Theme: ' + t.charAt(0).toUpperCase() + t.slice(1); };
        label(load());
        btn.addEventListener('click', function () {
            var next = ORDER[(ORDER.indexOf(load()) + 1) % ORDER.length];
            try { localStorage.setItem(KEY, next); } catch (e) {}
            apply(next);
            label(next);
        });
    });
})();
