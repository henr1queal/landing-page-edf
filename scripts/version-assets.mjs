// Carimba ?v=<hash> em new-style.css e script.js dentro do index.html.
// O Cloudflare/navegador cacheiam esses arquivos por 30 dias; mudando a URL
// (hash do conteúdo), o visitante recebe sempre a versão nova.
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const hash = (f) => createHash('md5').update(readFileSync(f)).digest('hex').slice(0, 8);
let html = readFileSync('index.html', 'utf8');

for (const file of ['new-style.css', 'script.js']) {
  const re = new RegExp(`(["'])((?:\\./)?${file.replace('.', '\\.')})(\\?v=[0-9a-f]+)?\\1`, 'g');
  html = html.replace(re, (_, q, path) => `${q}${path}?v=${hash(file)}${q}`);
}

writeFileSync('index.html', html);
console.log('index.html: versões de new-style.css e script.js atualizadas');
