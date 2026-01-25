+++
date = '{{ .Date }}'
lastmod = '{{ .Date }}'
draft = true
title = '{{ replace .File.ContentBaseName "-" " " | title }}'

# SEO Fields
# ------------------------------------------------------------------------------
description = ''    # Meta description (150-160 chars) - REQUIRED for good SEO
image = ''          # Featured image path (e.g., '/images/posts/my-image.jpg')
# keywords = []     # Page-specific keywords

# Content Metadata
# ------------------------------------------------------------------------------
author = ''         # Post author (uses default from params if empty)
categories = []     # e.g., ['Technology', 'Tutorial']
tags = []           # e.g., ['hugo', 'seo', 'web-development']

# Reading Time (auto-calculated by Hugo, but can override)
# ------------------------------------------------------------------------------
# readingTime = 5   # Minutes

# Robots (uncomment to override defaults)
# ------------------------------------------------------------------------------
# noindex = false
# nofollow = false

# Social Media
# ------------------------------------------------------------------------------
# twitter = '@author_username'  # Override default Twitter creator

# Schema.org Article Type (optional)
# ------------------------------------------------------------------------------
# articleType = 'BlogPosting'   # or 'NewsArticle', 'TechArticle', etc.
+++

## Introduction

Write your introduction here...

## Main Content

Your main content goes here...

## Conclusion

Wrap up your article here...
