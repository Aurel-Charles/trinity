// Mesure la durée de chaque fichier audio de static/songs/ et l'écrit dans data/audio.toml.
// Le site utilise ces durées pour le dernier enregistrement de chaque chanson.
// Lancé automatiquement avant chaque build Netlify (voir netlify.toml).
// En local :  npm run durees
import { parseFile } from 'music-metadata';
import { readdir, writeFile, mkdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = join(fileURLToPath(import.meta.url), '..', '..');
const dossierSons = join(racine, 'static', 'songs');
const sortie = join(racine, 'data', 'audio.toml');
const extensions = /\.(mp3|m4a|wav|ogg|flac|aac)$/i;

async function lister(dossier) {
  let fichiers = [];
  let entrees = [];
  try { entrees = await readdir(dossier, { withFileTypes: true }); } catch { return fichiers; }
  for (const e of entrees) {
    const chemin = join(dossier, e.name);
    if (e.isDirectory()) fichiers = fichiers.concat(await lister(chemin));
    else if (extensions.test(e.name)) fichiers.push(chemin);
  }
  return fichiers;
}

const fichiers = (await lister(dossierSons)).sort();
let toml = '# Fichier généré par scripts/maj-durees-audio.mjs — ne pas modifier à la main.\n'
         + '# Durée en secondes de chaque fichier audio de static/songs/.\n\n';
let n = 0;
for (const f of fichiers) {
  try {
    const { format } = await parseFile(f, { duration: true });
    if (!format.duration) continue;
    const url = '/' + relative(join(racine, 'static'), f).split(sep).join('/');
    toml += `[[fichiers]]\nurl = ${JSON.stringify(url)}\nsecondes = ${Math.round(format.duration)}\n\n`;
    n++;
  } catch (err) {
    console.warn(`Durée illisible pour ${f} : ${err.message}`);
  }
}
await mkdir(join(racine, 'data'), { recursive: true });
await writeFile(sortie, toml);
console.log(`Durées audio : ${n} fichier(s) mesuré(s) → data/audio.toml`);
