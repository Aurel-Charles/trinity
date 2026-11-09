/**
 * POST /api/connexion — reçoit le mot de passe du formulaire /connexion/.
 * Bon mot de passe  → cookie de session (6 mois) + retour à la page demandée.
 * Mauvais           → attente 1 s (freine les essais en boucle) + /connexion/?erreur=1
 *
 * Variables d'environnement Netlify : AUTH_SECRET, MOT_DE_PASSE_HASH
 */
import { verifierMotDePasse, signerJeton, cookieSession, cheminSur } from "../lib/session.mjs";

const redirection = (url, cookie) => {
  const headers = new Headers({ Location: url, "Cache-Control": "no-store" });
  if (cookie) headers.append("Set-Cookie", cookie);
  return new Response(null, { status: 303, headers });
};

export default async (req) => {
  if (req.method !== "POST") return redirection("/connexion/");

  const secret = Netlify.env.get("AUTH_SECRET");
  const hash = Netlify.env.get("MOT_DE_PASSE_HASH");
  if (!secret || !hash) {
    console.error("AUTH_SECRET ou MOT_DE_PASSE_HASH manquant dans les variables d'environnement Netlify");
    return new Response("Connexion pas encore configurée sur Netlify.", { status: 500 });
  }

  const form = await req.formData();
  const retour = cheminSur(form.get("retour"));

  if (!(await verifierMotDePasse(form.get("mot_de_passe"), hash))) {
    await new Promise((r) => setTimeout(r, 1000));
    return redirection(`/connexion/?erreur=1&retour=${encodeURIComponent(retour)}`);
  }

  return redirection(retour, cookieSession(await signerJeton(secret, hash)));
};

export const config = { path: "/api/connexion" };
