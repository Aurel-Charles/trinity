#!/usr/bin/env node
/**
 * Génère les deux variables d'environnement à coller sur Netlify :
 *   MOT_DE_PASSE_HASH  (le mot de passe du groupe, haché)
 *   AUTH_SECRET        (clé de signature des cookies, aléatoire)
 *
 * Usage : node scripts/hash-mot-de-passe.mjs
 * Le mot de passe tapé n'est ni affiché ni enregistré.
 */
import { hacherMotDePasse } from "../netlify/lib/session.mjs";
import { randomBytes } from "node:crypto";

function demanderCache(question) {
  return new Promise((resolve) => {
    const { stdin, stdout } = process;
    stdout.write(question);
    let saisie = "";
    stdin.setRawMode?.(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    const surTouche = (c) => {
      if (c === "\r" || c === "\n" || c === "\u0004") {
        stdin.setRawMode?.(false); stdin.pause(); stdin.off("data", surTouche);
        stdout.write("\n"); resolve(saisie);
      } else if (c === "\u0003") { process.exit(1); }
      else if (c === "\u007f") { saisie = saisie.slice(0, -1); }
      else { saisie += c; }
    };
    stdin.on("data", surTouche);
  });
}

const mdp = await demanderCache("Mot de passe du groupe : ");
const mdp2 = await demanderCache("Encore une fois : ");
if (!mdp) { console.error("Mot de passe vide."); process.exit(1); }
if (mdp !== mdp2) { console.error("Les deux saisies ne correspondent pas."); process.exit(1); }

console.log("\nÀ coller dans Netlify → Site configuration → Environment variables :\n");
console.log("MOT_DE_PASSE_HASH =", await hacherMotDePasse(mdp));
console.log("AUTH_SECRET       =", randomBytes(32).toString("base64url"));
console.log("\n(AUTH_SECRET : à générer une seule fois. Pour changer de mot de passe, ne remplacer que MOT_DE_PASSE_HASH.)");
