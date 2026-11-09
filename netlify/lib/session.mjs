/**
 * Jeton de connexion du site — code partagé entre :
 *   - la fonction de connexion (netlify/functions/connexion.mjs, Node)
 *   - le gardien (netlify/edge-functions/garde.mjs, Deno)
 *
 * Uniquement l'API Web Crypto (crypto.subtle), disponible dans les deux
 * environnements : aucune dépendance npm.
 *
 * Le jeton est un JWT HS256 classique : header.payload.signature (base64url).
 * Il est signé avec AUTH_SECRET + MOT_DE_PASSE_HASH : changer le mot de passe
 * sur Netlify invalide donc tous les jetons, tout le monde est déconnecté.
 */

export const COOKIE = "trinity_session";
export const DUREE_SECONDES = 60 * 60 * 24 * 180; // 6 mois

const enc = new TextEncoder();

/* ---------- base64url ---------- */
function b64url(bytes) {
  let s = "";
  for (const b of new Uint8Array(bytes)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlDecode(str) {
  const s = str.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(s + "===".slice((s.length + 3) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}
function b64Decode(str) {
  return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
}

/* ---------- Comparaison en temps constant ---------- */
function egal(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/* ---------- Mot de passe : PBKDF2-SHA256 ----------
   Format du hash (variable MOT_DE_PASSE_HASH) :
   pbkdf2-sha256$<itérations>$<sel base64>$<hash base64>
   Généré par : node scripts/hash-mot-de-passe.mjs */
export async function hacherMotDePasse(motDePasse, iterations = 210000) {
  const sel = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(motDePasse, sel, iterations);
  const b64 = (u) => btoa(String.fromCharCode(...u));
  return `pbkdf2-sha256$${iterations}$${b64(sel)}$${b64(hash)}`;
}

async function pbkdf2(motDePasse, sel, iterations) {
  const cle = await crypto.subtle.importKey("raw", enc.encode(motDePasse), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: sel, iterations }, cle, 256);
  return new Uint8Array(bits);
}

export async function verifierMotDePasse(motDePasse, hashStocke) {
  const [algo, iter, selB64, hashB64] = String(hashStocke || "").split("$");
  if (algo !== "pbkdf2-sha256" || !iter || !selB64 || !hashB64) return false;
  const calcule = await pbkdf2(String(motDePasse || ""), b64Decode(selB64), Number(iter));
  return egal(calcule, b64Decode(hashB64));
}

/* ---------- JWT HS256 ---------- */
async function cleHmac(secret, hashMotDePasse) {
  return crypto.subtle.importKey(
    "raw", enc.encode(`${secret}::${hashMotDePasse}`),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
}

export async function signerJeton(secret, hashMotDePasse) {
  const maintenant = Math.floor(Date.now() / 1000);
  const header = b64url(enc.encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const payload = b64url(enc.encode(JSON.stringify({ sub: "groupe", iat: maintenant, exp: maintenant + DUREE_SECONDES })));
  const cle = await cleHmac(secret, hashMotDePasse);
  const sig = await crypto.subtle.sign("HMAC", cle, enc.encode(`${header}.${payload}`));
  return `${header}.${payload}.${b64url(sig)}`;
}

export async function verifierJeton(jeton, secret, hashMotDePasse) {
  try {
    const [header, payload, sig] = String(jeton || "").split(".");
    if (!header || !payload || !sig) return false;
    const cle = await cleHmac(secret, hashMotDePasse);
    const attendu = new Uint8Array(await crypto.subtle.sign("HMAC", cle, enc.encode(`${header}.${payload}`)));
    if (!egal(attendu, b64urlDecode(sig))) return false;
    const { exp } = JSON.parse(new TextDecoder().decode(b64urlDecode(payload)));
    return typeof exp === "number" && exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

/* ---------- Cookies ---------- */
export function lireCookie(req, nom) {
  const ligne = req.headers.get("cookie") || "";
  for (const morceau of ligne.split(";")) {
    const [k, ...v] = morceau.trim().split("=");
    if (k === nom) return v.join("=");
  }
  return null;
}

export function cookieSession(jeton) {
  return `${COOKIE}=${jeton}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${DUREE_SECONDES}`;
}
export function cookieEfface() {
  return `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

/* N'accepte qu'un chemin du site (« /setlists/ »), jamais une autre adresse (« //evil.com »). */
export function cheminSur(retour) {
  const r = String(retour || "/");
  return r.startsWith("/") && !r.startsWith("//") && !r.startsWith("/\\") ? r : "/";
}
