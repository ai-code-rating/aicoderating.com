// Copies the ACR.md checks, the levels and js-yaml into the GitHub Action repo, so the Action checks
// exactly what the validator page checks. Run after changing levels.json, spec_versions.json,
// meta.spec_version, acr-check.js or js-yaml:
//   node scripts/sync-action.mjs [path to the action repo]   (default ~/dev/github/ai-code-rating-action)
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import meta from "../src/_data/meta.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dest = path.resolve(process.argv[2] || path.join(os.homedir(), "dev/github/ai-code-rating-action"));
const lib = path.join(dest, "lib");
if (!fs.existsSync(path.join(dest, "action.yml"))) {
    console.error(`No action.yml in ${dest}. Pass the action repo's path.`);
    process.exit(1);
}
fs.mkdirSync(lib, { recursive: true });

const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));
// Same shape as window.ACR in src/content/js/levels.js.njk
const data = {
    spec: meta.spec_version,
    specVersions: read("src/_data/spec_versions.json").map((v) => v.version),
    fileName: meta.file_name,
    siteUrl: meta.site_url,
    badgeColour: meta.badge_colour,
    levels: read("src/_data/levels.json"),
};
const banner = "// Copied from the aicoderating.com repo by scripts/sync-action.mjs. Edit it there, not here.\n";

fs.writeFileSync(path.join(lib, "acr-data.json"), JSON.stringify(data, null, 2) + "\n");
fs.writeFileSync(path.join(lib, "acr-check.cjs"), banner + fs.readFileSync(path.join(root, "src/assets/js/acr-check.js"), "utf8"));
fs.copyFileSync(path.join(root, "node_modules/js-yaml/dist/js-yaml.js"), path.join(lib, "js-yaml.cjs"));
fs.copyFileSync(path.join(root, "node_modules/js-yaml/LICENSE"), path.join(lib, "js-yaml.LICENSE"));
const yamlVersion = read("node_modules/js-yaml/package.json").version;
console.log(`Synced spec ${data.spec} (versions ${data.specVersions.join(", ")}), acr-check.js and js-yaml ${yamlVersion} to ${lib}`);
