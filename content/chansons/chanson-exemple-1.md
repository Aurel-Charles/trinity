+++
title = 'Soleil Levant'
date = 2025-01-25
draft = false

# Informations générales
artiste = 'Bob Marley'
statut = 'validee'
tonalite = 'Am'
tempo = 75
capo = 0
duree = '4:15'
difficulte = 2
tags = ['roots', 'one drop', 'cover']

# Structure du morceau (DOIT être avant les blocs [])
structure = ['intro', 'couplet', 'refrain', 'couplet', 'refrain', 'pont', 'refrain', 'outro']

# Grilles d'accords
[grilles.intro]
accords = ['Am', 'F', 'C', 'G']
mesures = 4
pattern = '↓ . ↓↑ . ↓↑ ↓↑'
notes = 'Jouer doucement, laisser sonner'

[grilles.couplet]
accords = ['Am', 'F', 'C', 'G']
mesures = 8
pattern = '↓ . ↓↑ . ↓↑ ↓↑'
notes = ''

[grilles.refrain]
accords = ['C', 'G', 'Am', 'F']
mesures = 8
pattern = '↓ . ↓↑ . ↓↑ ↓↑'
notes = 'Accentuer le refrain'

[grilles.pont]
accords = ['Dm', 'Am', 'G', 'G']
mesures = 4
pattern = '↓ . ↓↑ . ↓↑ ↓↑'
notes = 'Ralentir légèrement'

[grilles.outro]
accords = ['Am', 'F', 'C', 'G']
mesures = 4
pattern = 'Fade out'
notes = ''

# Paroles
[paroles]
couplet_1 = """
La la la, sous le soleil levant
La la la, le vent souffle doucement
La la la, les oiseaux chantent au loin
La la la, tout va bien ce matin
"""

refrain = """
Oh oh oh, c'est un nouveau jour
La la la, rempli d'amour
Oh oh oh, on avance ensemble
La la la, rien ne nous ressemble
"""

couplet_2 = """
La la la, les vagues sur le sable
La la la, un moment agréable
La la la, la musique nous porte
La la la, ouvre-moi la porte
"""

pont = """
Yeah yeah yeah
On continue le chemin
Yeah yeah yeah
Jusqu'à demain
"""

# Notes par instrument
[instruments.guitare]
role = 'Rythmique reggae skank'
notes = """
- Jouer sur les temps 2 et 4 (offbeat)
- Étouffer les cordes entre les accords
- Garder le poignet souple
- Volume modéré, laisser de la place à la basse
"""

[instruments.basse]
role = 'Ligne roots'
notes = """
- Jouer la fondamentale sur le temps 1
- Ajouter la quinte sur le temps 3
- Slides occasionnels entre les accords
- Son rond et chaud
"""

[instruments.piano]
role = 'Bubble pattern'
notes = """
- Pattern bubble classique sur les aigus
- Main gauche : fondamentale + quinte
- Main droite : triades en staccato
- Jouer léger, ne pas couvrir la guitare
"""
+++

Chanson d'exemple pour tester le template. Les paroles sont des placeholders.
