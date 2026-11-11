// Every valid rating, for the per-rating pages (/A2b/ and so on), built from levels.json so the
// pages follow the levels. With AI Share 0, Oversight is always "a", so those ratings have one page each.
import fs from "node:fs";

const levels = JSON.parse(fs.readFileSync(new URL("./levels.json", import.meta.url), "utf8"));

const ratings = [];
for (const m of levels.maintainer) {
    for (const s of levels.share) {
        for (const o of levels.oversight) {
            if (s.k === 0 && o.k !== "a") continue;
            const clash = s.k === 0 ? null : levels.inconsistent.find((c) => c.maintainer === m.k && c.oversight.includes(o.k));
            ratings.push({
                code: m.k + s.k + o.k,
                maintainer: m,
                share: s,
                oversight: o,
                oversight_name: s.k === 0 ? levels.no_ai_oversight_name : o.name,
                warning: clash ? clash.reason : null,
            });
        }
    }
}

export default ratings;
