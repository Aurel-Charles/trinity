+++
title = '{{ replace .Name "-" " " | title }}'
date = {{ .Date }}
draft = true

# Informations générales
artiste = ''
statut = 'idee'  # validee | idee | en_cours
tonalite = 'C'   # C, C#, D, Eb, E, F, F#, G, Ab, A, Bb, B (ou mineur: Am, Bm, etc.)
tempo = 80       # BPM
capo = 0         # Position du capo (0 = pas de capo)
duree = '3:30'   # Durée au format M:SS
difficulte = 2   # 1 (facile) à 5 (difficile)
tags = []        # Ex: ['roots', 'one drop', 'cover']

# IMPORTANT: La structure DOIT être AVANT les blocs [grilles.*]
structure = ['intro', 'couplet', 'refrain', 'couplet', 'refrain', 'pont', 'refrain', 'outro']

# Grilles d'accords
[grilles.intro]
accords = ['Am', 'G', 'F', 'E']
mesures = 4
pattern = '↓ ↓↑ ↓↑ ↓↑'
notes = ''

[grilles.couplet]
accords = ['Am', 'G', 'F', 'E']
mesures = 8
pattern = '↓ ↓↑ ↓↑ ↓↑'
notes = ''

[grilles.refrain]
accords = ['C', 'G', 'Am', 'F']
mesures = 8
pattern = '↓ ↓↑ ↓↑ ↓↑'
notes = ''

[grilles.pont]
accords = ['Dm', 'Am', 'E', 'Am']
mesures = 4
pattern = '↓ ↓↑ ↓↑ ↓↑'
notes = ''

[grilles.outro]
accords = ['Am', 'G', 'F', 'E']
mesures = 4
pattern = 'Fade out'
notes = ''

# Paroles
[paroles]
couplet_1 = """
Première ligne du couplet 1
Deuxième ligne du couplet 1
"""

refrain = """
Première ligne du refrain
Deuxième ligne du refrain
"""

couplet_2 = """
Première ligne du couplet 2
Deuxième ligne du couplet 2
"""

pont = """
Paroles du pont
"""

# Notes par instrument
[instruments.guitare]
role = 'Rythmique reggae'
notes = """
- Jouer sur les temps faibles (offbeat)
"""

[instruments.basse]
role = 'Ligne mélodique'
notes = """
- Suivre la fondamentale des accords
"""

[instruments.piano]
role = 'Accompagnement'
notes = """
- Bubble pattern classique
"""
+++

<!-- Notes supplémentaires -->
