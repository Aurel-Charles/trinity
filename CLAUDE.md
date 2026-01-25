# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/claude-code) when working with this codebase.

## Project Overview

This is a **Hugo-based static site template** optimized for SEO, multilingual content (English/French), and modern deployment. It uses Tailwind CSS v4 with a CSS-first approach.

**Tech Stack:**
- Hugo 0.128.0+ (Extended version required)
- Tailwind CSS v4
- TOML configuration
- Deployment: Netlify, Vercel

## Common Commands

```bash
# Install dependencies
npm install

# Development server with hot reload
hugo server

# Production build with minification
hugo --minify
```

## Architecture

### Directory Structure

```
config/_default/     # Hugo configuration (hugo.toml, params.toml, menus.*.toml)
layouts/             # Hugo templates
  ├── partials/      # Reusable template components
  │   └── seo/       # SEO-specific partials (13 files)
  └── _default/      # Default templates (sitemap, rss, taxonomy)
assets/css/          # Tailwind CSS v4 with custom theme
content/             # Markdown content
archetypes/          # Content templates (default.md, posts.md)
i18n/                # Translation strings (en.toml, fr.toml)
static/              # Static files (_headers, _redirects, manifest.json)
```

### Configuration Hierarchy

1. `config/_default/hugo.toml` - Core Hugo settings, taxonomies, permalinks
2. `config/_default/params.toml` - Global site parameters (analytics, PWA, schema)
3. `config/_default/params.en.toml` / `params.fr.toml` - Language-specific SEO params
4. `config/_default/menus.en.toml` / `menus.fr.toml` - Navigation menus

### Template Patterns

- **Base layout:** `baseof.html` defines HTML structure; pages extend via `define/block`
- **SEO orchestration:** `head.html` calls 9 SEO partials in order
- **Conditional rendering:** `{{ with }}` blocks for optional features
- **Production guards:** `{{ if hugo.IsProduction }}` for analytics/tracking
- **Whitespace control:** `{{- }}` to remove whitespace in templates

## Code Conventions

### Templates (HTML/Hugo)
- Use semantic HTML (`<header>`, `<main>`, `<footer>`, proper ARIA)
- Apply `htmlEscape` filter for user content (XSS prevention)
- Use `safeHTML` only for trusted content
- Comments: `{{- /* Comment */ -}}`

### CSS (Tailwind v4)
- Custom theme variables in `@theme` block in `assets/css/main.css`
- Semantic naming: `--color-{type}-{level}` (e.g., `--color-bg-primary`)
- Dark mode via `.dark` selector with CSS variable overrides

### Configuration (TOML)
- Comment-heavy with section separators: `# ====...====`
- All features controlled via `params.toml`
- Language overrides in `params.*.toml`

### Content (Markdown)
- Front matter in TOML format
- SEO descriptions: 150-160 characters
- Dates in ISO format (YYYY-MM-DD)
- Taxonomies: tags, categories, authors

## Key Features

- **SEO:** Meta tags, Open Graph, Twitter Cards, Schema.org JSON-LD, sitemap, RSS, hreflang
- **Analytics:** GA4, GTM, Plausible, Fathom, Umami, Simple Analytics, Microsoft Clarity
- **Performance:** Preconnect, preload, fingerprinting, cache headers, minification
- **PWA:** Manifest generation, theme colors
- **Security:** Headers configured for Netlify (`_headers`) and Vercel (`vercel.json`)

## Multilingual Support

- Default language: French (`fr`)
- Supported: English (`en`), French (`fr`)
- Translation strings in `i18n/` directory
- Language-specific params in `params.*.toml`
- Automatic hreflang tag generation
