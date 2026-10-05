const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');

// Backup original index.html just in case
if (!fs.existsSync('index.original.html')) {
  fs.writeFileSync('index.original.html', content);
}

const lines = content.split('\n');
const l60 = lines[59];

const logoIdx = l60.indexOf(',LOGO=');
const meIdx = l60.indexOf(',ME=');

const dStr = l60.slice('const D='.length, logoIdx);
const D = JSON.parse(dStr);

let logo = '';
let me = '';

if (logoIdx !== -1 && meIdx !== -1) {
  logo = l60.slice(logoIdx + ',LOGO="'.length, meIdx - 1);
  me = l60.slice(meIdx + ',ME="'.length);
  if (me.endsWith('";')) {
    me = me.slice(0, -2);
  } else if (me.endsWith(';')) {
    me = me.slice(0, -1);
  }
}

console.log('Mods count:', D.mods.length);
console.log('Exps keys:', Object.keys(D.exps));
console.log('Logo length:', logo.length);
console.log('ME length:', me.length);

fs.mkdirSync('extracted', { recursive: true });
fs.writeFileSync('extracted/dataset.json', JSON.stringify(D, null, 2));
fs.writeFileSync('extracted/assets.json', JSON.stringify({ logo, me }, null, 2));
console.log('Successfully saved to extracted/');
