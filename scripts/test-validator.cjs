// Runs the ACR.md validator page (acr-check.js + validator.js) against sample files with a stub DOM. Build first (npm run build), then: node scripts/test-validator.cjs
const fs = require('fs'), path = require('path').resolve(__dirname, '..') + '/';
const els = {}; let handler;
const el = (id) => els[id] || (els[id] = { id, value: '', innerHTML: '', textContent: '', className: '', addEventListener: (e, f) => { if (id === 'acr-input') handler = f; }, focus() {} });
global.window = { jsyaml: require(path + 'node_modules/js-yaml') };
global.document = { getElementById: el };
eval(fs.readFileSync(path + '_website/assets/js/levels.js', 'utf8'));
new Function('module', fs.readFileSync(path + '_website/assets/js/acr-check.js', 'utf8')).call(window); // as a browser loads it: sets window.ACRCheck
const cases = {
  good: '---\nrating: A2b\nspec: "0.1"\nupdated: 2026-10-01\n---\n\nText\n',
  badRating: '---\nrating: b9z\nspec: 0.1\nupdated: 2026-10-01\n---\nx\n',
  zeroShare: '---\nrating: A0c\nspec: "0.1"\nupdated: 2026-10-01\n---\nx\n',
  missing: '---\nratng: A2b\n---\n',
  noFrontMatter: 'rating: A2b\n',
  badYaml: '---\nrating: [A2b\n---\n',
  noAiLabel: '---\nrating: E0a\nspec: "0.1"\nupdated: 2026-10-01\n---\nx\n',
  unlikelyE: '---\nrating: E3b\nspec: "0.1"\nupdated: 2026-10-01\n---\nx\n',
  badDate: '---\nrating: A2b\nspec: "0.1"\nupdated: 2026-02-31\n---\nx\n',
  timestamp: '---\nrating: A2b\nspec: "0.1"\nupdated: 2026-10-01T10:00:00Z\n---\nx\n',
  quotedDate: '---\nrating: A2b\nspec: "0.1"\nupdated: "2026-10-01"\n---\nx\n',
  future: '---\nrating: A2b\nspec: "0.1"\nupdated: 2099-01-01\n---\nx\n',
  spaces: '---\nrating: " A2b"\nspec: "0.1"\nupdated: 2026-10-01\n---\nx\n',
  headingsOnly: '---\nrating: A2b\nspec: "0.1"\nupdated: 2026-10-01\n---\n\n# AI Code Rating\n',
  placeholder: '---\nrating: A2b\nspec: "0.1"\nupdated: 2026-10-01\n---\n\n# AI Code Rating\n\n**ACR A2b**\n\n## How AI Was Used\n\n<!-- A short paragraph. -->\n',
  commentOnly: '---\nrating: A2b\nspec: "0.1"\nupdated: 2026-10-01\n---\n<!-- todo -->\n',
  oldAndUnknown: '---\nrating: C3c\nspec: "0.2"\nupdated: 2024-01-01\nscopes:\n  docs/: B4b\n---\n',
};
input = el('acr-input');
eval(fs.readFileSync(path + '_website/assets/js/validator.js', 'utf8'));
for (const [name, text] of Object.entries(cases)) {
  input.value = text; handler();
  console.log('\n## ' + name + ' → ' + els['acr-summary'].textContent);
  console.log(els['acr-results'].innerHTML.replace(/<\/li>/g, '\n').replace(/<[^>]+>/g, ' ').replace(/ +/g, ' ').trim());
}
