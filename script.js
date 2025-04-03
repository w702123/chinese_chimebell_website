// -------- RESPONSIVE TOP NAVIGATION MENU --------
// responsive top navigation menu Reference: https://www.w3schools.com/howto/howto_js_topnav_responsive.asp
function toggleMobileMenu() {
  var x = document.querySelector(".topnav");
  if (!x.classList.contains("responsive")) {
    x.classList.add("responsive");
  } else {
    x.classList.remove("responsive");
  }
}

// Add event listener when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.getElementById('menuToggle');
  menuButton.addEventListener('click', toggleMobileMenu);
});

// ----------------

//------ learn page---------------
// Back to top button functionality
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('backToTop');
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
          backToTopButton.style.display = "flex";
      } else {
          backToTopButton.style.display = "none";
      }
  });
  
  // Scroll to top when button is clicked
  backToTopButton.addEventListener('click', function() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
});


//------ learn page---------------

/*
 * Library page functionality
 * References:
 * - HTML5 Audio API: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
 * - FileReader API: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 * - Web Storage API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 * - Similar to audio implementations in Howler.js: https://howlerjs.com/
 */

/* File upload Reference: 
https://codepen.io/ankerpeet/pen/GQRdLK 
https://codepen.io/nico-judge/pen/qBdvWKQ
https://codepen.io/Tzyinc/pen/wvWKzjb
https://codepen.io/mark_sottek/pen/yLrwPJe
*/

document.addEventListener('DOMContentLoaded', function() {
  const uploadForm = document.getElementById('uploadForm');
  const musicGrid = document.getElementById('musicGrid');
  const emptyState = document.getElementById('emptyState');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.querySelector('.search-button');

  // File input handling
  const musicFileInput = document.getElementById('musicFile');
  const coverImageInput = document.getElementById('coverImage');
  const musicFileName = document.getElementById('musicFileName');
  const imageFileName = document.getElementById('imageFileName');
  const imagePreview = document.getElementById('imagePreview');

  // Handle music file selection
  if (musicFileInput) {
    musicFileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        musicFileName.textContent = file.name;
        musicFileInput.parentElement.querySelector('.file-label').classList.add('has-file');
      } else {
        musicFileName.textContent = '';
        musicFileInput.parentElement.querySelector('.file-label').classList.remove('has-file');
      }
    });
  }
  // Handle cover image selection
  /* 
   * Image preview implementation using FileReader API
   * Reference: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
   */
  if (coverImageInput) {
    coverImageInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        imageFileName.textContent = file.name;
        coverImageInput.parentElement.querySelector('.file-label').classList.add('has-file');
        
        // Show image preview
        const reader = new FileReader();
        reader.onload = function(e) {
          imagePreview.innerHTML = `<img src="${e.target.result}" alt="Cover preview">`;
          imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      } else {
        imageFileName.textContent = '';
        imagePreview.innerHTML = '';
        imagePreview.style.display = 'none';
        coverImageInput.parentElement.querySelector('.file-label').classList.remove('has-file');
      }
    });
  }

  // Add search functionality
  if (searchInput && searchButton) {
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleSearch();
      }
    });
  }

  function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const musicCards = musicGrid.querySelectorAll('.music-card');
    
    musicCards.forEach(card => {
      const title = card.querySelector('.music-title').textContent.toLowerCase();
      if (title.includes(searchTerm) || searchTerm === '') {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (uploadForm) {
    uploadForm.addEventListener('submit', handleMusicUpload);
  }

  // Load existing music from localStorage
  loadMusicCollection();

  /* 
   * Music player implementation using HTML5 Audio API
   * Reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
   */
  async function handleMusicUpload(e) {
    e.preventDefault();
    
    const musicFile = document.getElementById('musicFile').files[0];
    const coverFile = document.getElementById('coverImage').files[0];
    const title = document.getElementById('musicTitle').value;
    
    if (!musicFile) {
      alert('Please select a music file');
      return;
    }
    
    // Create object URL for the music file
    const musicUrl = URL.createObjectURL(musicFile);
    const coverUrl = coverFile ? URL.createObjectURL(coverFile) : 'default-cover.jpg';
    
    // Create audio element to get duration
    const audio = new Audio(musicUrl);
    await new Promise(resolve => {
      audio.addEventListener('loadedmetadata', resolve);
    });
    
    const duration = audio.duration;
    
    /* 
     * LocalStorage implementation for data persistence
     * Reference: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
     */
    const musicEntry = {
      id: Date.now(),
      title: title,
      musicUrl: musicUrl,
      coverUrl: coverUrl,
      duration: duration
    };
    
    // Save to localStorage
    const musicCollection = JSON.parse(localStorage.getItem('musicCollection') || '[]');
    musicCollection.push(musicEntry);
    localStorage.setItem('musicCollection', JSON.stringify(musicCollection));
    
    // Add music card to grid
    addMusicCard(musicEntry);
    
    // Reset form
    e.target.reset();
    
    // Hide empty state if visible
    document.getElementById('emptyState').style.display = 'none';
  }

  /* 
   * Music card UI implementation
   * Design inspired by Spotify's card layout and SoundCloud's player interface
   */
    // Add a music card to the display
  function addMusicCard(music) {
    const musicGrid = document.getElementById('musicGrid');
    
    const card = document.createElement('div');
    card.className = 'music-card';
    card.dataset.id = music.id;
    
    card.innerHTML = `
      <div class="delete-button" onclick="deleteMusic('${music.id}')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
        </svg>
      </div>
      <img src="${music.coverUrl}" alt="${music.title}" class="music-image">
      <div class="music-info">
        <h3 class="music-title">${music.title}</h3>
        <p class="music-duration">Duration: ${formatTime(music.duration)}</p>
      </div>
      <div class="player-controls">
        <button class="play-button" onclick="togglePlay(this, '${music.musicUrl}')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8 5v14l11-7z" fill="currentColor"/>
          </svg>
        </button>
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
        <span class="time-display">0:00 / ${formatTime(music.duration)}</span>
      </div>
    `;
    
    musicGrid.appendChild(card);
  }

  // Load music collection from localStorage
  function loadMusicCollection() {
    const musicCollection = JSON.parse(localStorage.getItem('musicCollection')) || [];
    
    if (musicCollection.length > 0 && emptyState) {
      emptyState.style.display = 'none';
    }
    
    musicCollection.forEach(entry => addMusicCard(entry));
  }
});

// Format duration from seconds to MM:SS
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Global audio player instance
let currentAudio = null;
let currentButton = null;

// Toggle play/pause
function togglePlay(button, musicUrl) {
  if (currentAudio && currentAudio.src === musicUrl) {
    if (currentAudio.paused) {
      currentAudio.play();
      updatePlayButton(button, true);
    } else {
      currentAudio.pause();
      updatePlayButton(button, false);
    }
  } else {
    if (currentAudio) {
      currentAudio.pause();
      updatePlayButton(currentButton, false);
    }
    
    currentAudio = new Audio(musicUrl);
    currentButton = button;
    
    currentAudio.addEventListener('timeupdate', () => {
      updateProgress(button.parentElement, currentAudio);
    });
    
    currentAudio.addEventListener('ended', () => {
      updatePlayButton(button, false);
      updateProgress(button.parentElement, currentAudio);
    });
    
    currentAudio.play();
    updatePlayButton(button, true);
  }
}

// Update play button icon
function updatePlayButton(button, isPlaying) {
  button.innerHTML = isPlaying
    ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor"/></svg>'
    : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
}

// Function to format time in MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Function to update progress bar and time display
function updateProgress(controls, audio) {
  const progressBar = controls.querySelector('.progress-fill');
  const timeDisplay = controls.querySelector('.time-display');
  
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progress}%`;
  
  timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
}




// Reference: https://codepen.io/szymongabrek/pen/QMmeyQ
// Function to delete music
function deleteMusic(id) {
  if (confirm('Are you sure you want to delete this music?')) {
    // Remove from localStorage
    const musicCollection = JSON.parse(localStorage.getItem('musicCollection') || '[]');
    const updatedCollection = musicCollection.filter(music => music.id !== parseInt(id));
    localStorage.setItem('musicCollection', JSON.stringify(updatedCollection));
    
    // Remove card from display
    const card = document.querySelector(`.music-card[data-id="${id}"]`);
    if (card) {
      card.remove();
    }
    
    // Show empty state if no music left
    if (updatedCollection.length === 0) {
      document.getElementById('emptyState').style.display = 'flex';
    }
  }
}