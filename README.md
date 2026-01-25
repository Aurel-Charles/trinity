# Hugo + Tailwind SEO Template 🚀

Template Hugo multilingue **production-ready** avec optimisation SEO complète et Tailwind CSS v4.

## ✨ Fonctionnalités

### SEO Technique
- ✅ Meta tags complets (title, description, robots, canonical)
- ✅ Open Graph (Facebook, LinkedIn)
- ✅ Twitter Cards
- ✅ Schema.org JSON-LD (WebSite, Organization, Article, BreadcrumbList, FAQ, Product, LocalBusiness, HowTo, Video)
- ✅ Sitemap XML avec images
- ✅ RSS feed enrichi (contenu complet, images, DC)
- ✅ Balises hreflang multilingues automatiques
- ✅ Pagination SEO (rel="next/prev")
- ✅ robots.txt intelligent

### Performance
- ✅ Preconnect / DNS prefetch configurables
- ✅ Preload critical resources
- ✅ Google Fonts optimisé
- ✅ Cache headers (Netlify/Vercel)
- ✅ CSS minifié avec fingerprint

### Analytics & Tracking
- ✅ Google Analytics 4
- ✅ Google Tag Manager
- ✅ Plausible Analytics
- ✅ Fathom Analytics
- ✅ Umami Analytics
- ✅ Simple Analytics
- ✅ Microsoft Clarity

### PWA
- ✅ manifest.json généré
- ✅ Theme-color (light/dark)
- ✅ Apple touch icons
- ✅ Microsoft Tiles

### Hosting
- ✅ Netlify (_headers, _redirects)
- ✅ Vercel (vercel.json)
- ✅ Headers de sécurité

---

## 🚀 Quick Start

**Prérequis:** Hugo Extended 0.128.0+ (pour Tailwind CSS v4)

```bash
# Vérifier la version Hugo
hugo version  # Doit être >= 0.128.0

# Cloner et installer
git clone <repo-url>
cd hugo-seo-template
npm install

# Développement
hugo server

# Build production
hugo --minify
```

---

## 📁 Structure

```
config/_default/
├── hugo.toml          # Configuration Hugo
├── params.toml        # Paramètres globaux (analytics, PWA, etc.)
├── params.en.toml     # SEO anglais
├── params.fr.toml     # SEO français
├── menus.en.toml      # Navigation anglaise
└── menus.fr.toml      # Navigation française

layouts/_partials/seo/
├── meta.html          # Meta tags principaux
├── opengraph.html     # Open Graph
├── twitter.html       # Twitter Cards
├── schema.html        # JSON-LD (core)
├── schema-extra.html  # JSON-LD (FAQ, Product, etc.)
├── performance.html   # Preconnect, preload
├── pwa.html           # PWA meta tags
├── analytics.html     # Scripts analytics
├── gtm-body.html      # GTM noscript
├── verification.html  # Search console verification
└── pagination.html    # rel=next/prev

layouts/_default/
├── sitemap.xml        # Sitemap avec images
└── rss.xml            # RSS enrichi

static/
├── _headers           # Headers Netlify
└── _redirects         # Redirections Netlify
```

---

## ⚙️ Configuration

### 1. SEO de Base (`params.en.toml` / `params.fr.toml`)

```toml
# Description (150-160 caractères)
description = 'Votre description pour les moteurs de recherche.'
tagline = 'Votre slogan'
author = 'Votre Nom'

[twitter]
  card = 'summary_large_image'
  site = '@votrecompte'

[contact]
  email = 'contact@example.com'

copyright = '© {year} Votre Site. Tous droits réservés.'
```

### 2. Schema.org (`params.toml`)

```toml
[schema]
  type = 'Organization'  # ou 'Person'
  name = 'Nom de l\'Organisation'
  logo = '/images/logo.png'
```

### 3. Analytics (`params.toml`)

```toml
[analytics]
  googleAnalyticsID = 'G-XXXXXXXXXX'
  # OU
  googleTagManagerID = 'GTM-XXXXXXX'
  
  # Alternatives privacy-friendly
  # [analytics.plausible]
  #   domain = 'example.com'
```

### 4. Site Verification (`params.toml`)

```toml
[verification]
  google = 'xxxxxxxxxxxxx'
  bing = 'xxxxxxxxxxxxx'
```

### 5. PWA (`params.toml`)

```toml
[pwa]
  enabled = true
  name = 'Mon Application'
  shortName = 'MonApp'
  backgroundColor = '#ffffff'
```

### 6. Local Business (`params.toml`)

```toml
[localBusiness]
  enabled = true
  type = 'Restaurant'
  name = 'Mon Restaurant'
  telephone = '+33 1 23 45 67 89'
  [localBusiness.address]
    street = '123 Rue Example'
    city = 'Paris'
    postalCode = '75001'
    country = 'FR'
```

---

## 📝 Front Matter des Pages

### Page Standard

```yaml
---
title: 'Titre de la Page'
description: 'Description SEO (150-160 caractères)'
image: '/images/featured.jpg'
noindex: false  # true pour ne pas indexer
---
```

### Article de Blog

```yaml
---
title: 'Titre de l\'Article'
date: 2025-01-24
description: 'Description SEO'
image: '/images/post.jpg'
author: 'Nom de l\'Auteur'
categories: ['Tech']
tags: ['hugo', 'seo']
---
```

### Page FAQ (avec Schema)

```yaml
---
title: 'Questions Fréquentes'
faq:
  - question: 'Comment ça marche ?'
    answer: 'Explication détaillée...'
  - question: 'Combien ça coûte ?'
    answer: 'Les prix commencent à...'
---
```

### Page Produit (avec Schema)

```yaml
---
title: 'Mon Produit'
product:
  name: 'Nom du Produit'
  sku: 'SKU-123'
  brand: 'Ma Marque'
  offers:
    price: 99.99
    currency: 'EUR'
    availability: 'https://schema.org/InStock'
  rating:
    value: 4.5
    count: 127
---
```

### Tutoriel HowTo (avec Schema)

```yaml
---
title: 'Comment faire X'
howto:
  name: 'Guide complet pour X'
  description: 'Apprenez à faire X en 5 étapes'
  totalTime: 'PT30M'
  supply: ['Matériel 1', 'Matériel 2']
  tool: ['Outil 1', 'Outil 2']
  steps:
    - name: 'Étape 1'
      text: 'Description de l\'étape...'
      image: '/images/step1.jpg'
---
```

---

## 🔍 Checklist SEO

### Avant Publication

- [ ] `description` définie (150-160 caractères)
- [ ] `image` de partage (1200x630px)
- [ ] `title` unique et descriptif
- [ ] Contenu > 300 mots
- [ ] Images avec texte alt

### Configuration Initiale

- [ ] `baseURL` configuré dans hugo.toml
- [ ] Descriptions par langue
- [ ] Image OG par défaut
- [ ] Logo pour Schema.org
- [ ] Comptes sociaux
- [ ] Google Search Console vérifié
- [ ] Google Analytics/GTM configuré

---

## 🧪 Outils de Test

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Schema.org Validator](https://validator.schema.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

## 📄 License

MIT
