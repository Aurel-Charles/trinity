# Plan — fermer le site avec une connexion

Objectif : seuls les membres du groupe ouvrent le site. Ça couvre les pages,
mais aussi les MP3, l'Excel de la fiche technique, les photos et l'admin Decap.
Sans connexion, on tombe sur une page « Connexion ».

Branche : `auth`. Rien ne part sur `main` tant que ce n'est pas validé.

---

## 1. Deux façons de faire

### A. Rester sur Netlify, avec des fonctions Netlify (recommandé)

Le « petit serveur » est découpé en deux morceaux que Netlify exécute :

| Morceau | Fichier | Rôle |
|---|---|---|
| Gardien (Edge Function) | `netlify/edge-functions/garde.js` | Avant chaque requête, vérifie le cookie de connexion. Pas de cookie valide → redirection vers `/connexion/` |
| Connexion (Function) | `netlify/functions/connexion.mjs` | Reçoit le mot de passe (POST), le compare au hash, pose le cookie |
| Déconnexion (Function) | `netlify/functions/deconnexion.mjs` | Efface le cookie |
| Page de connexion | `layouts/connexion.html` + `content/connexion.md` | Formulaire Hugo, au design du site |

- Le cookie contient un JWT, comme dans tes projets Odin. Il est signé avec `jose`, qui marche dans les Edge Functions comme dans Node. Le cookie est `HttpOnly`, `Secure`, `SameSite=Lax` et valable 6 mois : le téléphone reste connecté pour les concerts.
- Les secrets sont dans les variables d'environnement Netlify : `AUTH_SECRET` (signature du JWT) et `MOT_DE_PASSE_HASH` (bcrypt).
- **Avantages :** on garde le déploiement actuel (push → Netlify), le CDN, le domaine et Decap tel quel. C'est gratuit (offre gratuite largement suffisante) et il n'y a pas de démarrage à froid.
- **Inconvénient :** ce n'est pas Express. C'est la même logique (middleware → vérif JWT → `next()`), mais écrite au format Netlify.

### B. Un serveur Express sur Render (comme dans Odin)

- Un dossier `server/` avec Express. On l'organise comme dans Odin : `app.use(verifierConnexion)` puis `express.static('public')` sert le site Hugo construit.
- La connexion passe par Passport local + express-session, avec les sessions en base sur Neon (`connect-pg-simple`), ou par du JWT en cookie.
- Render construit Hugo, puis lance Express.
- **Avantages :** c'est exactement ce que tu as appris, et ça permet des vrais comptes par membre facilement.
- **Inconvénients :**
  - Render gratuit met le serveur en veille. Le premier chargement prend environ 30 à 50 s, ce qui est risqué en mode scène juste avant de jouer. Ou alors il faut une offre payante.
  - On quitte Netlify : il faut un nouveau déploiement et une nouvelle adresse, puis reconfigurer Decap/DecapBridge avec la nouvelle URL.
  - Il faut installer Hugo dans le build Render.

**Recommandation : A.** Le site reste rapide et gratuit, et le mode scène ne dépend pas d'un serveur qui dort.

---

## 2. Comptes : mot de passe commun ou un compte par membre

- **Mot de passe commun** (le plus simple) : un seul hash dans `MOT_DE_PASSE_HASH`. Pour changer le mot de passe, on change la variable sur Netlify, et tout le monde est déconnecté.
- **Un compte par membre** : une liste `identifiant → hash` dans une variable d'environnement en JSON, ou une table sur Neon. On sait alors qui est connecté, et on peut retirer quelqu'un sans changer le mot de passe des autres.

---

## 3. Étapes (option A, par couches)

1. **Page de connexion (Hugo)**
   - formulaire `POST /.netlify/functions/connexion`, champ mot de passe ;
   - message d'erreur si `?erreur=1` ;
   - champ caché `retour` pour revenir sur la page demandée.
2. **Fonction connexion**
   - lire le formulaire, puis `bcrypt.compare` avec le hash ;
   - si c'est bon : signer le JWT (`jose`), répondre `303` vers `retour` avec `Set-Cookie` ;
   - si c'est faux : petite attente (1 s) puis `303` vers `/connexion/?erreur=1`. L'attente freine les essais en boucle.
3. **Gardien (Edge Function sur `/*`)**
   - laisser passer `/connexion/`, son CSS et les icônes ;
   - pour tout le reste, vérifier le JWT. S'il est valide, on sert la page ; sinon on redirige vers `/connexion/?retour=<page>`.
4. **Déconnexion** : un lien « Se déconnecter » dans le menu, qui appelle la fonction, efface le cookie et renvoie vers `/connexion/`.
5. **Script de hash** : `scripts/hash-mot-de-passe.mjs`. Tu tapes le mot de passe, il affiche le hash à coller dans Netlify.
6. **Test en local** avec `netlify dev`, qui lance Hugo, les fonctions et l'Edge Function ensemble. Cas à tester :
   - sans cookie → redirection ;
   - mauvais mot de passe → erreur ;
   - bon mot de passe → la page demandée s'ouvre ;
   - un MP3 ouvert directement par son adresse → bloqué sans cookie ;
   - mode scène sur téléphone, puis on ferme et rouvre le navigateur → toujours connecté ;
   - `/admin/` → connexion du site, puis connexion Decap comme avant.
7. **Netlify**
   - ajouter `AUTH_SECRET` et `MOT_DE_PASSE_HASH` ;
   - déployer la branche `auth` en aperçu (deploy preview) ;
   - tester sur l'adresse d'aperçu ;
   - fusionner sur `main`.
8. **Ménage** : une fois le site fermé, la balise `noindex` reste en sécurité supplémentaire.

---

## 4. Points d'attention

- Les aperçus de branche Netlify sont protégés eux aussi, puisque le gardien tourne partout.
- Le cache du CDN : les pages protégées doivent répondre `Cache-Control: private`, pour qu'une page servie à un membre ne soit pas remise à quelqu'un d'autre. Le gardien s'en occupe.
- Sans JavaScript, la connexion marche quand même (simple formulaire HTML).
- Mot de passe oublié : il n'y a pas d'e-mail. On change la variable sur Netlify.

---

## 5. Décisions à prendre

1. Option A (Netlify) ou B (Express sur Render) ?
2. Mot de passe commun ou un compte par membre ?
