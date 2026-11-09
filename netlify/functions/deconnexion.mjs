/** POST /api/deconnexion — efface le cookie de session et renvoie vers /connexion/. */
import { cookieEfface } from "../lib/session.mjs";

export default async () =>
  new Response(null, {
    status: 303,
    headers: { Location: "/connexion/", "Set-Cookie": cookieEfface(), "Cache-Control": "no-store" },
  });

export const config = { path: "/api/deconnexion" };
