+++
fiche = "chanson"
title = '{{ replace .Name "-" " " | title }}'
date = {{ .Date.Format "2006-01-02" }}
draft = true
artiste = 'Original'
statut = 'idee'       # validee | en_cours | idee
tonalite = 'C'
tempo = 80
capo = 0
duree = '3:30'        # estimation, remplacée par la durée du dernier enregistrement
difficulte = 2
tags = []

structure = ['Couplet', 'Refrain', 'Couplet', 'Refrain']

[[grilles]]
nom = 'Couplet'
pattern = '↓ ↓↑ ↓↑ ↓↑'

  [[grilles.mesures]]
  accord = 'Am'
  nombre = 2

  [[grilles.mesures]]
  accord = 'G'
  nombre = 2

[[grilles]]
nom = 'Refrain'
pattern = '↓ ↓↑ ↓↑ ↓↑'

  [[grilles.mesures]]
  accord = 'C'
  nombre = 2

  [[grilles.mesures]]
  accord = 'F'
  nombre = 2

[[paroles]]
section = 'Couplet 1'
texte = """
"""

[[instruments]]
instrument = 'Guitare'
role = ''
+++
