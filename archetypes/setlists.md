+++
# ==============================================================================
# MÉTADONNÉES DE LA SETLIST
# ==============================================================================
title = '{{ replace .Name "-" " " | title }}'
date = {{ .Date }}
draft = true

# Informations du concert
lieu = ''
heure_debut = '20:00'
notes_generales = """
Notes générales pour le concert...
"""

# ==============================================================================
# LISTE DES CHANSONS
# ==============================================================================
# Chaque chanson référence le slug d'une chanson existante
# L'ordre définit l'ordre de passage

[[chansons]]
  slug = 'exemple-chanson'  # Correspond au fichier content/chansons/exemple-chanson.md
  notes = ''                # Notes spécifiques pour ce concert

[[chansons]]
  slug = ''
  notes = ''

[[chansons]]
  slug = ''
  notes = ''
+++

<!-- Notes supplémentaires sur la setlist (optionnel) -->
