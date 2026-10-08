// ACR.md validator page. Runs in the browser; nothing is sent anywhere.
// The checks are in acr-check.js (shared with the GitHub Action). Allowed values come from window.ACR
// (see /assets/js/levels.js), so the checks follow levels.json.
(function () {
    var input = document.getElementById("acr-input");
    var summary = document.getElementById("acr-summary");
    var list = document.getElementById("acr-results");
    if (!window.ACR || !window.ACRCheck || !input || !summary || !list || !window.jsyaml) return;

    var LABELS = { error: "Error", warn: "Warning", ok: "OK", info: "Note" };
    function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
    var fmt = { text: esc, code: function (s) { return "<code>" + esc(s) + "</code>"; } };

    function render() {
        // The visitor's own date, not UTC's, so a file dated today never looks like it's from the future.
        var now = new Date(), today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
        var results = window.ACRCheck.check(input.value, { acr: window.ACR, yaml: window.jsyaml, fmt: fmt, today: today });
        var errors = results.filter(function (r) { return r.level === "error"; }).length;
        var warns = results.filter(function (r) { return r.level === "warn"; }).length;
        var empty = !input.value.trim();

        summary.className = "v-summary " + (empty ? "is-empty" : errors ? "is-error" : warns ? "is-warn" : "is-ok");
        summary.textContent = empty ? "Nothing to check yet" :
            errors ? errors + (errors === 1 ? " problem" : " problems") + " to fix" :
            warns ? "Valid, with " + warns + (warns === 1 ? " warning" : " warnings") :
            "Valid";

        // Problems first, then warnings, then everything else in order.
        var rank = { error: 0, warn: 1, ok: 2, info: 2 };
        results.sort(function (a, b) { return rank[a.level] - rank[b.level]; });
        list.innerHTML = results.map(function (r) {
            var html = r.meaning ? "<strong>" + r.msg + '</strong><span class="v-meaning">' + r.meaning.map(esc).join("<br>") + "</span>" : r.msg;
            return '<li class="v-item v-' + r.level + '"><span class="v-tag">' + LABELS[r.level] + "</span><span>" + html + "</span></li>";
        }).join("");
    }

    input.addEventListener("input", render);
    document.getElementById("acr-clear").addEventListener("click", function () { input.value = ""; render(); input.focus(); });
    render();
})();
