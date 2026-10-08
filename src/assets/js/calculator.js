// Rating calculator on the home page. Level data comes from window.ACR (see /assets/js/levels.js).
(function () {
    var ACR = window.ACR;
    var form = document.getElementById("rate-form");
    if (!ACR || !form) return;

    var DEV = ACR.levels.maintainer;
    var SHARE_LIST = ACR.levels.share;
    var SHARE = SHARE_LIST.map(function (s) { return s.label; });
    var OVER = ACR.levels.oversight;
    var DEFAULT = ACR.levels["default"];
    var NO_AI = "a"; // oversight value forced when AI Share is 0: no AI code is left unchecked

    function optHTML(name, item, checked) {
        var id = name + "-" + item.k;
        return '<label class="opt" for="' + id + '"><input type="radio" name="' + name + '" id="' + id + '" value="' + item.k + '"' + (checked ? " checked" : "") + '>' +
            '<span class="k">' + item.k + '</span><span class="t"><b>' + item.name + '</b>' + item.short + '</span></label>';
    }

    document.getElementById("opts-1").innerHTML = DEV.map(function (d) { return optHTML("dev", d, d.k === DEFAULT.maintainer); }).join("");
    document.getElementById("opts-3").innerHTML = OVER.map(function (o) { return optHTML("over", o, o.k === DEFAULT.oversight); }).join("");
    document.getElementById("opts-2").innerHTML = SHARE_LIST.map(function (s) { return optHTML("share", s, s.k === DEFAULT.share); }).join("");

    var lastOversight = DEFAULT.oversight;
    var forced = false;

    function val(name) { var el = form.querySelector('input[name="' + name + '"]:checked'); return el ? el.value : null; }
    function find(list, k) { for (var i = 0; i < list.length; i++) if (list[i].k === k) return list[i]; return null; }
    function escapeXML(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

    // README badge snippet in the visitor's README format. Every format links the badge to the file.
    var BADGE_FORMATS = {
        md: function (code, url) { return "[![ACR " + code + "](" + url + ")](" + ACR.fileName + ")"; },
        html: function (code, url) { return '<a href="' + ACR.fileName + '"><img src="' + url + '" alt="ACR ' + code + '" width="64" height="20"></a>'; },
        rst: function (code, url) { return ".. image:: " + url + "\n   :target: " + ACR.fileName + "\n   :alt: ACR " + code; }
    };
    var FMT_KEY = "acrBadgeFormat"; // remembered per visitor; the page works the same without it
    var badgeFormat = "md";
    try { var saved = localStorage.getItem(FMT_KEY); if (BADGE_FORMATS[saved]) badgeFormat = saved; } catch (e) {}

    // The same shields.io badge URL the README snippet uses, so the preview is the real badge.
    // Ratings are letters and digits only, so they need no escaping in the URL.
    function badgeURL(code) {
        return "https://img.shields.io/badge/ACR-" + code + "-" + ACR.badgeColour;
    }

    function update() {
        var share = parseInt(val("share"), 10);
        var others = form.querySelectorAll('input[name="over"]:not(#over-' + NO_AI + ')');

        // With no AI code, oversight is always "a". Remember the visitor's choice so it comes back
        // when they move AI Share off 0.
        if (share === 0) {
            if (!forced) lastOversight = val("over") || DEFAULT.oversight;
            forced = true;
            document.getElementById("over-" + NO_AI).checked = true;
            others.forEach(function (el) { el.disabled = true; });
        } else {
            others.forEach(function (el) { el.disabled = false; });
            if (forced) document.getElementById("over-" + lastOversight).checked = true;
            forced = false;
        }

        var d = find(DEV, val("dev")), o = find(OVER, val("over"));
        var code = d.k + share + o.k;

        document.getElementById("ch1").textContent = d.k;
        document.getElementById("ch2").textContent = share;
        document.getElementById("ch3").textContent = o.k;
        document.getElementById("val1").textContent = d.name;
        document.getElementById("val2").textContent = share === 0 ? "No AI code" : SHARE[share] + " of code";
        // With no AI code, "a" means nothing was left unchecked, not that anything was verified.
        var oName = share === 0 ? ACR.levels.no_ai_oversight_name : o.name;
        document.getElementById("val3").textContent = oName;

        var clash = share === 0 ? null : ACR.levels.inconsistent.filter(function (c) {
            return c.maintainer === d.k && c.oversight.indexOf(o.k) !== -1;
        })[0];
        var note = document.getElementById("calc-note");
        note.hidden = !clash;
        note.textContent = clash ? "Check this rating: " + clash.reason : "";
        document.getElementById("out-code-small").textContent = code;

        document.getElementById("badge-img").innerHTML = '<img src="' + badgeURL(code) + '" alt="ACR ' + escapeXML(code) + '" width="64" height="20">';
        document.getElementById("out-badge").textContent = BADGE_FORMATS[badgeFormat](code, badgeURL(code));
        document.querySelectorAll(".fmt button").forEach(function (b) {
            b.setAttribute("aria-pressed", b.dataset.fmt === badgeFormat ? "true" : "false");
        });

        // The visitor's own date, not UTC's, as the validator uses.
        var now = new Date(), today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
        var summary = "Maintainer: " + d.name + " · AI Share: " + (share === 0 ? "None" : SHARE[share]) + " · Oversight: " + oName;
        document.getElementById("out-file").textContent =
            "---\n" +
            "rating: " + code + "\n" +
            "spec: \"" + ACR.spec + "\"\n" +
            "updated: " + today + "\n" +
            "---\n\n" +
            "# AI Code Rating\n\n" +
            "**ACR " + code + "** (" + summary + ")\n\n" +
            "This project is rated with [AI Code Rating](" + ACR.siteUrl + "/spec/" + ACR.spec + "/), spec version " + ACR.spec + ".\n\n" +
            "## How AI Was Used\n\n" +
            usageText(share);
    }

    // The only free text in the file: the visitor's own description of how AI was used.
    var usage = document.getElementById("usage");
    function usageText(share) {
        var text = usage.value.trim();
        if (text) return text + "\n";
        return share === 0
            ? "No code in this project was written by AI.\n"
            : "<!-- A short paragraph of context, in plain English, about how AI is used in this project. -->\n";
    }

    form.addEventListener("change", update);
    document.querySelectorAll(".fmt button").forEach(function (b) {
        b.addEventListener("click", function () {
            badgeFormat = b.dataset.fmt;
            try { localStorage.setItem(FMT_KEY, badgeFormat); } catch (e) {}
            update();
        });
    });
    usage.addEventListener("input", update);
    // The form only drives the page; never submit it (the site's CSP blocks form submissions)
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    update();

    document.querySelectorAll("button.copy").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var pre = document.getElementById(btn.dataset.target);
            var done = function () { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1500); };
            var fallback = function () {
                var r = document.createRange(); r.selectNodeContents(pre);
                var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
                btn.textContent = "Selected. Press Ctrl+C";
                setTimeout(function () { btn.textContent = "Copy"; }, 2500);
            };
            try {
                navigator.clipboard.writeText(pre.textContent).then(done, fallback);
            } catch (e) { fallback(); }
        });
    });
})();
