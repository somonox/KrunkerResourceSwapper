const fs = require('fs');
const path = require('path');

const ignoreList = new Set([
  'init.js',
  'manifest.json',
  'README.md',
  'LICENSE',
  '.git',
  'generate-rules.js',
  '_metadata',
  'rules.json',
  '.gitkeep'
]);

const basePath = __dirname;
const rules = [];
let ruleId = 1;

function walk(currentPath, relativePath = '') {
  const entries = fs.readdirSync(currentPath, { withFileTypes: true });

  for (const entry of entries) {
    if (ignoreList.has(entry.name)) continue;

    const fullEntryPath = path.join(currentPath, entry.name);
    const relEntryPath = path.join(relativePath, entry.name).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      walk(fullEntryPath, relEntryPath);
    } else if (entry.isFile()) {
      rules.push({
        id: ruleId++,
        priority: 1,
        action: {
          type: 'redirect',
          redirect: {
            extensionPath: '/' + relEntryPath
          }
        },
        condition: {
          urlFilter: '*://' + '*/' + relEntryPath,
          resourceTypes: [
            'script', 'image', 'media', 'font',
            'xmlhttprequest', 'stylesheet', 'object', 'other'
          ]
        }
      });
    }
  }
}

walk(basePath);

const outputPath = path.join(basePath, 'rules.json');
fs.writeFileSync(outputPath, JSON.stringify(rules, null, 2));
console.log(`Successfully generated rules.json (${rules.length} rules generated.)`);
