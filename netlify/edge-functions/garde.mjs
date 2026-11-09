/**
 * Gardien du site : s'exécute avant CHAQUE requête (pages, MP3, Excel, images, admin).
 * Cookie de session valide → on sert normalement.
 * Sinon → page : redirection vers /connexion/?retour=<page> ; fichier : 401.
 *
 * Comme un middleware Express : app.use(verifierConnexion) avant express.static().
 */
import { COOKIE, lireCookie, verifierJeton } from "../lib/session.mjs";

export default async (req, context) => {
  const secret = Netlify.env.get("AUTH_SECRET");
  const hash = Netlify.env.get("MOT_DE_PASSE_HASH");
  const ok = secret && hash && (await verifierJeton(lireCookie(req, COOKIE), secret, hash));

  if (ok) {
    const res = await context.next();
    // Contenu réservé au groupe : jamais gardé par un cache partagé
    res.headers.set("Cache-Control", "private, " + (res.headers.get("Cache-Control") || "max-age=0, must-revalidate").replace(/\bpublic,?\s*/g, ""));
    return res;
  }

  const url = new URL(req.url);
  const veutPage = req.method === "GET" && (req.headers.get("accept") || "").includes("text/html");
  if (veutPage) {
    const retour = url.pathname + url.search;
    return Response.redirect(new URL(`/connexion/?retour=${encodeURIComponent(retour)}`, url), 302);
  }
  return new Response("Connexion requise", { status: 401, headers: { "Cache-Control": "no-store" } });
};

export const config = {
  path: "/*",
  // Ce qui reste accessible sans connexion : la page de connexion et ce qu'elle affiche
  excludedPath: [
    "/connexion/", "/connexion/*",
    "/api/*",
    "/css/*",
    "/favicon.svg", "/favicon-32.png", "/apple-touch-icon.png", "/manifest.json",
    "/images/logo/*",
    "/robots.txt",
  ],
};
