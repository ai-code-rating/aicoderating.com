module.exports = function(eleventyConfig) {

    /* Copies assets when the site is built */
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/favicon.ico");
    // This project's own rating file, published at /ACR.md (the footer badge links to it)
    eleventyConfig.addPassthroughCopy({ "ACR.md": "ACR.md" });
    // YAML parser for the validator page, served from our own domain
    eleventyConfig.addPassthroughCopy({ "node_modules/js-yaml/dist/js-yaml.min.js": "assets/js/vendor/js-yaml.min.js" });

    // {% acr "A2b" %} -> the rating with each character in its position colour
    eleventyConfig.addShortcode("acr", (code) =>
        `<span class="acr-code" aria-label="ACR ${code}">ACR <span class="c1">${code[0]}</span><span class="c2">${code[1]}</span><span class="c3">${code[2]}</span></span>`);

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
