// This project's own AI Code Rating, read from the front matter of ACR.md in the repo root,
// so the footer badge always matches the published file.
import fs from "node:fs";
import yaml from "js-yaml";

const text = fs.readFileSync(new URL("../../ACR.md", import.meta.url), "utf8");
const frontMatter = text.match(/^---\n([\s\S]*?)\n---/)[1];

export default yaml.load(frontMatter);
