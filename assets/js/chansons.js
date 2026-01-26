// ============================================================================
// CHANSONS.JS - Fonctionnalités pour les pages de chansons
// ============================================================================

// ============================================================================
// Gestion des onglets instruments
// ============================================================================
function showTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  document.getElementById('tab-' + tabName).classList.add('active');
  event.target.classList.add('active');
}

// ============================================================================
// Transposition des accords
// ============================================================================
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
let currentTranspose = 0;
let originalChords = [];

// Sauvegarder les accords originaux au chargement
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.chord').forEach(el => {
    originalChords.push({
      element: el,
      original: el.getAttribute('data-chord')
    });
  });
});

/**
 * Transpose un accord d'un certain nombre de demi-tons
 * @param {string} chord - L'accord à transposer (ex: "Am7", "F#m", "Bb")
 * @param {number} semitones - Nombre de demi-tons (positif ou négatif)
 * @returns {string} - L'accord transposé
 */
function transposeChord(chord, semitones) {
  // Extraire la note de base et le suffixe (m, 7, maj7, etc.)
  const match = chord.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return chord;

  let [, note, suffix] = match;

  // Trouver l'index de la note
  let noteIndex = NOTES.indexOf(note);
  if (noteIndex === -1) noteIndex = NOTES_FLAT.indexOf(note);
  if (noteIndex === -1) return chord;

  // Transposer
  let newIndex = (noteIndex + semitones + 12) % 12;

  // Utiliser les dièses ou les bémols selon la note originale
  let useFlats = note.includes('b');
  let newNote = useFlats ? NOTES_FLAT[newIndex] : NOTES[newIndex];

  return newNote + suffix;
}

/**
 * Applique une transposition relative
 * @param {number} semitones - Nombre de demi-tons à ajouter
 */
function transpose(semitones) {
  currentTranspose += semitones;

  const transposeValueEl = document.getElementById('transpose-value');
  if (transposeValueEl) {
    transposeValueEl.textContent = currentTranspose > 0 ? '+' + currentTranspose : currentTranspose;
  }

  // Mettre à jour la tonalité affichée
  const keyEl = document.getElementById('current-key');
  if (keyEl) {
    const originalKey = keyEl.getAttribute('data-original') || keyEl.textContent;
    if (!keyEl.getAttribute('data-original')) {
      keyEl.setAttribute('data-original', originalKey);
    }
    keyEl.textContent = transposeChord(originalKey, currentTranspose);
  }

  // Mettre à jour tous les accords
  originalChords.forEach(item => {
    item.element.textContent = transposeChord(item.original, currentTranspose);
  });
}

/**
 * Réinitialise la transposition à 0
 */
function resetTranspose() {
  currentTranspose = 0;

  const transposeValueEl = document.getElementById('transpose-value');
  if (transposeValueEl) {
    transposeValueEl.textContent = '0';
  }

  const keyEl = document.getElementById('current-key');
  if (keyEl && keyEl.getAttribute('data-original')) {
    keyEl.textContent = keyEl.getAttribute('data-original');
  }

  originalChords.forEach(item => {
    item.element.textContent = item.original;
  });
}

// ============================================================================
// Auto-scroll des paroles
// ============================================================================
let isScrolling = false;
let scrollInterval = null;
let lyricsWrapper = null;
let speedSlider = null;

document.addEventListener('DOMContentLoaded', function() {
  lyricsWrapper = document.getElementById('lyrics-wrapper');
  speedSlider = document.getElementById('scroll-speed');

  if (speedSlider) {
    speedSlider.addEventListener('input', function() {
      const speedValueEl = document.getElementById('speed-value');
      if (speedValueEl) {
        speedValueEl.textContent = this.value;
      }
      // Si on scrolle déjà, redémarrer avec la nouvelle vitesse
      if (isScrolling) {
        stopAutoScroll();
        startAutoScroll();
      }
    });
  }
});

/**
 * Bascule l'auto-scroll on/off
 */
function toggleAutoScroll() {
  if (isScrolling) {
    stopAutoScroll();
  } else {
    startAutoScroll();
  }
}

/**
 * Démarre l'auto-scroll des paroles
 */
function startAutoScroll() {
  if (!lyricsWrapper || !speedSlider) return;

  isScrolling = true;

  const scrollIcon = document.getElementById('scroll-icon');
  const scrollText = document.getElementById('scroll-text');

  if (scrollIcon) scrollIcon.textContent = '⏸';
  if (scrollText) scrollText.textContent = 'Pause';

  const speed = parseInt(speedSlider.value);
  const scrollSpeed = 0.5 + (speed * 0.3); // pixels par tick

  scrollInterval = setInterval(() => {
    if (lyricsWrapper.scrollTop < lyricsWrapper.scrollHeight - lyricsWrapper.clientHeight) {
      lyricsWrapper.scrollTop += scrollSpeed;
    } else {
      stopAutoScroll();
    }
  }, 50);
}

/**
 * Arrête l'auto-scroll des paroles
 */
function stopAutoScroll() {
  isScrolling = false;

  const scrollIcon = document.getElementById('scroll-icon');
  const scrollText = document.getElementById('scroll-text');

  if (scrollIcon) scrollIcon.textContent = '▶';
  if (scrollText) scrollText.textContent = 'Auto-scroll';

  if (scrollInterval) {
    clearInterval(scrollInterval);
    scrollInterval = null;
  }
}

// ============================================================================
// Mode Concert
// ============================================================================
let isConcertScrolling = false;
let concertScrollInterval = null;
let concertLyricsWrapper = null;

/**
 * Entre en mode concert (plein écran, gros texte)
 */
function enterConcertMode() {
  const concertMode = document.getElementById('concert-mode');
  const concertLyrics = document.getElementById('concert-lyrics');
  const lyrics = document.getElementById('lyrics');

  if (!concertMode || !concertLyrics || !lyrics) return;

  concertLyrics.innerHTML = lyrics.innerHTML;
  concertMode.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  concertLyricsWrapper = document.getElementById('concert-lyrics-wrapper');

  // Initialiser le slider de vitesse concert
  const concertSpeedSlider = document.getElementById('concert-speed');
  if (concertSpeedSlider) {
    concertSpeedSlider.addEventListener('input', function() {
      const valueEl = document.getElementById('concert-speed-value');
      if (valueEl) valueEl.textContent = this.value;

      if (isConcertScrolling) {
        stopConcertScroll();
        startConcertScroll();
      }
    });
  }
}

/**
 * Sort du mode concert
 */
function exitConcertMode() {
  stopConcertScroll();
  const concertMode = document.getElementById('concert-mode');
  if (concertMode) {
    concertMode.classList.add('hidden');
  }
  document.body.style.overflow = '';
}

/**
 * Toggle l'auto-scroll en mode concert
 */
function toggleConcertScroll() {
  if (isConcertScrolling) {
    stopConcertScroll();
  } else {
    startConcertScroll();
  }
}

/**
 * Démarre l'auto-scroll en mode concert
 */
function startConcertScroll() {
  if (!concertLyricsWrapper) return;

  isConcertScrolling = true;
  const icon = document.getElementById('concert-scroll-icon');
  if (icon) icon.textContent = '⏸';

  const speedSlider = document.getElementById('concert-speed');
  const speed = speedSlider ? parseInt(speedSlider.value) : 5;
  const scrollSpeed = 0.5 + (speed * 0.4);

  concertScrollInterval = setInterval(() => {
    if (concertLyricsWrapper.scrollTop < concertLyricsWrapper.scrollHeight - concertLyricsWrapper.clientHeight) {
      concertLyricsWrapper.scrollTop += scrollSpeed;
    } else {
      stopConcertScroll();
    }
  }, 50);
}

/**
 * Arrête l'auto-scroll en mode concert
 */
function stopConcertScroll() {
  isConcertScrolling = false;
  const icon = document.getElementById('concert-scroll-icon');
  if (icon) icon.textContent = '▶';

  if (concertScrollInterval) {
    clearInterval(concertScrollInterval);
    concertScrollInterval = null;
  }
}

// ============================================================================
// Audio Player
// ============================================================================
let currentTrackIndex = 0;
let audioElements = [];

document.addEventListener('DOMContentLoaded', function() {
  audioElements = Array.from(document.querySelectorAll('.audio-element'));

  if (audioElements.length > 0) {
    initAudioPlayer();
  }
});

function initAudioPlayer() {
  const progressSlider = document.getElementById('audio-progress');
  const volumeSlider = document.getElementById('audio-volume');

  audioElements.forEach((audio, index) => {
    audio.addEventListener('loadedmetadata', function() {
      if (index === currentTrackIndex) {
        updateDuration();
      }
    });

    audio.addEventListener('timeupdate', function() {
      if (index === currentTrackIndex) {
        updateProgress();
      }
    });

    audio.addEventListener('ended', function() {
      nextTrack();
    });
  });

  if (progressSlider) {
    progressSlider.addEventListener('input', function() {
      const audio = audioElements[currentTrackIndex];
      if (audio && audio.duration) {
        audio.currentTime = (this.value / 100) * audio.duration;
      }
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', function() {
      audioElements.forEach(audio => {
        audio.volume = this.value / 100;
      });
    });
    // Initialiser le volume
    audioElements.forEach(audio => {
      audio.volume = volumeSlider.value / 100;
    });
  }
}

function togglePlay() {
  const audio = audioElements[currentTrackIndex];
  const playBtn = document.getElementById('play-btn');

  if (!audio) return;

  if (audio.paused) {
    audio.play();
    if (playBtn) playBtn.textContent = '⏸';
  } else {
    audio.pause();
    if (playBtn) playBtn.textContent = '▶';
  }
}

function nextTrack() {
  if (audioElements.length === 0) return;

  const wasPlaying = !audioElements[currentTrackIndex].paused;
  audioElements[currentTrackIndex].pause();
  audioElements[currentTrackIndex].currentTime = 0;

  currentTrackIndex = (currentTrackIndex + 1) % audioElements.length;
  updateActiveTrack();

  if (wasPlaying) {
    audioElements[currentTrackIndex].play();
  }
}

function prevTrack() {
  if (audioElements.length === 0) return;

  const wasPlaying = !audioElements[currentTrackIndex].paused;
  audioElements[currentTrackIndex].pause();
  audioElements[currentTrackIndex].currentTime = 0;

  currentTrackIndex = (currentTrackIndex - 1 + audioElements.length) % audioElements.length;
  updateActiveTrack();

  if (wasPlaying) {
    audioElements[currentTrackIndex].play();
  }
}

function updateActiveTrack() {
  document.querySelectorAll('.audio-track').forEach((track, index) => {
    track.classList.toggle('active', index === currentTrackIndex);
  });
  updateDuration();

  const playBtn = document.getElementById('play-btn');
  if (playBtn) playBtn.textContent = '▶';
}

function updateProgress() {
  const audio = audioElements[currentTrackIndex];
  const progressSlider = document.getElementById('audio-progress');
  const currentTimeEl = document.getElementById('audio-current-time');

  if (!audio || !audio.duration) return;

  const percent = (audio.currentTime / audio.duration) * 100;
  if (progressSlider) progressSlider.value = percent;
  if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
}

function updateDuration() {
  const audio = audioElements[currentTrackIndex];
  const durationEl = document.getElementById('audio-duration');

  if (audio && audio.duration && durationEl) {
    durationEl.textContent = formatTime(audio.duration);
  }
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ============================================================================
// Raccourcis clavier
// ============================================================================
document.addEventListener('keydown', function(e) {
  const concertMode = document.getElementById('concert-mode');
  const isInConcertMode = concertMode && !concertMode.classList.contains('hidden');

  if (e.key === 'Escape') {
    if (isInConcertMode) {
      exitConcertMode();
    }
  }

  // Raccourci Espace pour toggle auto-scroll
  if (e.key === ' ' && e.target === document.body) {
    e.preventDefault();
    if (isInConcertMode) {
      toggleConcertScroll();
    } else {
      toggleAutoScroll();
    }
  }
});

// ============================================================================
// Exports pour utilisation globale
// ============================================================================
window.showTab = showTab;
window.transpose = transpose;
window.resetTranspose = resetTranspose;
window.toggleAutoScroll = toggleAutoScroll;
window.enterConcertMode = enterConcertMode;
window.exitConcertMode = exitConcertMode;
window.toggleConcertScroll = toggleConcertScroll;
window.togglePlay = togglePlay;
window.nextTrack = nextTrack;
window.prevTrack = prevTrack;
