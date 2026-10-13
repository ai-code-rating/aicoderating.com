const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

module.exports = function(eleventyConfig) {

    /* Copies assets when the site is built */
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/favicon.ico");
    // This project's own rating file, published at /ACR.md (the footer badge links to it)
    eleventyConfig.addPassthroughCopy({ "ACR.md": "ACR.md" });
    // YAML parser for the validator page, served from our own domain
    eleventyConfig.addPassthroughCopy({ "node_modules/js-yaml/dist/browser/js-yaml.umd.min.js": "assets/js/vendor/js-yaml.min.js" });
    // Its source map, under the name the script's sourceMappingURL comment asks for (only devtools load it)
    eleventyConfig.addPassthroughCopy({ "node_modules/js-yaml/dist/browser/js-yaml.umd.min.js.map": "assets/js/vendor/js-yaml.umd.min.js.map" });

    // {% acr "A2b" %} -> the rating with each character in its position colour
    eleventyConfig.addShortcode("acr", (code) =>
        `<span class="acr-code" aria-label="ACR ${code}">ACR <span class="c1">${code[0]}</span><span class="c2">${code[1]}</span><span class="c3">${code[2]}</span></span>`);

    // {% cssVersion %} -> a short hash of the CSS, added to the stylesheet's URL (site.css?v=...) so
    // browsers fetch the new file as soon as the CSS changes and can cache it for a year. A shortcode,
    // not a data file, so it's worked out again on every rebuild, including under --serve.
    eleventyConfig.addShortcode("cssVersion", () => {
        const hash = crypto.createHash("sha256");
        for (const name of ["fonts.css", "site.css"]) {
            hash.update(fs.readFileSync(path.join(__dirname, "src/_includes/css", name)));
        }
        return hash.digest("hex").slice(0, 10);
    });

    // YYYY-MM-DD, used by the sitemap and the spec page
    eleventyConfig.addFilter("isoDate", (dateObj) => dateObj.toISOString().slice(0, 10));

    /* Settings */
    return {
        dir: {
            input: "src",
            output: "_website"
        }
    }

};
