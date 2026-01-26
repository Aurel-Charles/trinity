+++
title = 'Another Pray For us'
date = 2025-01-25
draft = false

# Informations générales
artiste = 'Trinity'
statut = 'validee'
tonalite = 'D'
tempo = 75
capo = 0
duree = '4:15'
difficulte = 2
tags = ['roots', 'one drop', 'cover']

# Structure du morceau (DOIT être avant les blocs [] et [[]])
structure = ['intro', 'couplet', 'refrain', 'couplet', 'refrain', 'refrain', 'outro']

# Grilles d'accords
[grilles.intro]
accords = ['D', 'D', 'G', 'A']
mesures = 4
pattern = '↓ . ↓↑ . ↓↑ ↓↑'
notes = ''

[grilles.couplet]
accords = ['D', 'D', 'G', 'A']
mesures = 8
pattern = '↓ . ↓↑ . ↓↑ ↓↑'
notes = ''

[grilles.refrain]
accords = ['D', 'D', 'G', 'A']
mesures = 8
pattern = '↓ . ↓↑ . ↓↑ ↓↑'
notes = 'Accentuer le refrain'



[grilles.outro]
accords = ['D', 'D', 'G', 'A']
mesures = 4
pattern = 'Fin sur le SOL'
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

# Enregistrements (liens vers les versions enregistrées en répet)
[[enregistrements]]
titre = 'Répétition du 20 janvier'
url = 'https://example.com/audio/another-pray-repet-2025-01-20.mp3'
date = '2025-01-20'

[[enregistrements]]
titre = 'Répétition du 15 janvier'
url = 'https://example.com/audio/another-pray-repet-2025-01-15.mp3'
date = '2025-01-15'
+++

Chanson d'exemple pour tester le template. Les paroles sont des placeholders.
