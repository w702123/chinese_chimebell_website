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
// Reference: https://www.w3schools.com/js/js_htmldom_eventlistener.asp
document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.getElementById('menuToggle');
  menuButton.addEventListener('click', toggleMobileMenu);

  // Initialize search functionality
  initializeSearch();

  // Initialize tab navigation
  // Tab Navigation
  // Reference: https://www.w3schools.com/howto/howto_js_tabs.asp
  const tabButtons = document.querySelectorAll('.tab-button');
  const playerSection = document.querySelector('.player-section');
  const tutorialSection = document.querySelector('.tutorial-section');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');

      // Scroll to corresponding section
      // Reference: https://www.w3schools.com/howto/howto_css_smooth_scroll.asp
      const targetSection = this.textContent.trim() === 'Virtual Player' ? playerSection : tutorialSection;
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Share button functionality
  // Reference: https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
  const shareButton = document.querySelector('.action-button:last-child');
  if (shareButton) {
    shareButton.addEventListener('click', async function() {
      const url = 'https://w702123.github.io/chinese_chimebell_website/';
      try {
        await navigator.clipboard.writeText(url);
        // Change button text temporarily to show feedback
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        setTimeout(() => {
          this.textContent = originalText;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy URL:', err);
      }
    });
  }

  // Initialize bells functionality only if we're on the play page
  if (document.querySelector('.bells-container')) {
    initializeBells();
  }
});

//---------------- Home page Search funtionality: ----------------
// References:
// - Search implementation: https://www.w3schools.com/howto/howto_js_filter_dropdown.asp
// - Search suggestions: https://www.w3schools.com/howto/howto_js_filter_list.asp
// - Dynamic content: https://www.w3schools.com/howto/howto_js_filter_elements.asp
// - Search box: https://www.w3schools.com/howto/howto_css_searchbox.asp

function initializeSearch() {
  const searchForm = document.querySelector('.search form');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  // Define searchable content
  const pageContent = {
    'learn.html': {
      title: 'Learn',
      content: [
        'History of Chinese Chime Bells',
        'Musical techniques and methods',
        'Traditional compositions',
        'Cultural significance',
        'Ancient musical instruments',
        'Historical importance'
      ]
    },
    'play.html': {
      title: 'Play',
      content: [
        'Interactive chime bells',
        'Virtual instrument',
        'Musical practice',
        'Sound exploration',
        'Digital performance',
        'Traditional melodies'
      ]
    },
    'library.html': {
      title: 'Library',
      content: [
        'Music collection',
        'Audio recordings',
        'Traditional pieces',
        'Historical performances',
        'Sound archives',
        'Musical compositions'
      ]
    }
  };

  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const query = searchInput.value.toLowerCase().trim();
      
      if (!query) {
        searchResults.innerHTML = '';
        return;
      }

      let results = [];
      // Search through content
      for (const [page, data] of Object.entries(pageContent)) {
        const matches = data.content.filter(item => 
          item.toLowerCase().includes(query)
        );
        
        if (matches.length > 0) {
          results.push({
            page: page,
            title: data.title,
            matches: matches
          });
        }
      }

      displaySearchResults(results, query);
    });
  }

  // Display search results with animation
  // Reference: https://codepen.io/san_coder13/pen/VwYLjJB
  
  function displaySearchResults(results, query) {
    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="no-results">
          <p>No results found for "${query}"</p>
        </div>
      `;
      return;
    }

    const resultsHTML = results.map(result => `
      <div class="result-item">
        <h3><a href="${result.page}">${result.title}</a></h3>
        <ul>
          ${result.matches.map(match => `<li>${match}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    searchResults.innerHTML = `
      <div class="results-header">
        <h2>Search Results</h2>
        <p>${results.length} page(s) found</p>
      </div>
      ${resultsHTML}
    `;
  }
}

//------ learn page---------------
// References: 
// - Back to top button: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
// - Smooth scrolling: https://www.w3schools.com/howto/howto_css_smooth_scroll.asp
// https://codepen.io/matthewcain/pen/ZepbeR
// Back to top button functionality
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('backToTop');
  
  if (backToTopButton) {
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
  }
});


//------ library page---------------

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
   //	When you pick a music file, it shows the file name.

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
   // Image preview implementation using FileReader API
   // Reference: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
  //	When you pick a cover image, it shows a preview image using FileReader.
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
    
    // Convert cover image to Base64 if exists
    let coverUrl = 'default-cover.jpg';
    if (coverFile) {
      coverUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(coverFile);
      });
    }
    
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
    imagePreview.innerHTML = '';
    imagePreview.style.display = 'none';
    
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
        <div class="progress-bar" style="cursor: pointer;">
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

// Function to update progress bar and time display
function updateProgress(controls, audio) {
  const progressBar = controls.querySelector('.progress-bar');
  const progressFill = controls.querySelector('.progress-fill');
  const timeDisplay = controls.querySelector('.time-display');
  
  const progress = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = `${progress}%`;
  
  timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
}

// Add click handler for progress bar
function setupProgressBarControl(controls, audio) {
  const progressBar = controls.querySelector('.progress-bar');
  
  progressBar.addEventListener('click', function(e) {
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * audio.duration;
    audio.currentTime = newTime;
    updateProgress(controls, audio);
  });
}

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
    
    // Setup progress bar control
    setupProgressBarControl(button.parentElement, currentAudio);
    
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

// Format time in MM:SS
// Reference: https://www.w3schools.com/js/js_date_formats.asp
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Delete music with confirmation
// Reference: https://www.w3schools.com/js/js_popup.asp
// Reference: https://codepen.io/szymongabrek/pen/QMmeyQ

function deleteMusic(id) {
  if (confirm('Are you sure you want to delete this music?')) {
    // Remove from localStorage
    // Reference: https://www.w3schools.com/js/js_api_web_storage.asp
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

//---------------- Play page functionality: ----------------

function initializeBells() {
  const bells = document.querySelectorAll('.bell-wrapper');
  const volumeButton = document.querySelector('.volume-button');
  const recordButton = document.getElementById('recordButton');
  const stopButton = document.getElementById('stopButton');
  const saveButton = document.getElementById('saveButton');
  let isMuted = false;
  let currentVolume = 1.0;
  let isRecording = false;
  let audioContext = null;
  let mediaRecorder = null;
  let audioChunks = [];
  let audioDestination = null;

  // References:
  // - Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
  // - MediaRecorder API: https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
  // - HTML5 Audio Element: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
  
  // Implementation examples:
  // - MediaRecorder example: https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder#example
  // - Audio recording and playback: https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder#recording_a_media_element

  // Create volume slider with custom styling
  const volumeSlider = document.createElement('input');
  volumeSlider.type = 'range';
  volumeSlider.min = '0';
  volumeSlider.max = '1';
  volumeSlider.step = '0.1';
  volumeSlider.value = currentVolume;
  volumeSlider.className = 'volume-slider';
  
  // Create a container for volume controls
  const volumeControls = document.createElement('div');
  volumeControls.className = 'volume-controls';
  volumeControls.style.display = 'flex';
  volumeControls.style.alignItems = 'center';
  
  // Move the volume button into the container
  volumeButton.parentNode.insertBefore(volumeControls, volumeButton);
  volumeControls.appendChild(volumeButton);
  volumeControls.appendChild(volumeSlider);
  
  // Hide slider by default
  volumeSlider.style.display = 'none';

  // Volume button click handler
  volumeButton.addEventListener('click', () => {
    volumeSlider.style.display = volumeSlider.style.display === 'none' ? 'block' : 'none';
  });

  // Volume slider change handler
  volumeSlider.addEventListener('input', (e) => {
    currentVolume = parseFloat(e.target.value);
    isMuted = currentVolume === 0;
    
    // Update volume for all audio elements
    bells.forEach(bell => {
      const audio = bell.querySelector('audio');
      if (audio) {
        audio.volume = currentVolume;
      }
    });
  });

  // Click outside to hide volume slider
  document.addEventListener('click', (e) => {
    if (!volumeControls.contains(e.target)) {
      volumeSlider.style.display = 'none';
    }
  });

  // Initialize audio context
  function initAudioContext() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioDestination = audioContext.createMediaStreamDestination();
    }
  }

  // Setup recording functionality
  async function setupRecording() {
    try {
      initAudioContext();
      
      // Create a media recorder using the audio destination stream
      mediaRecorder = new MediaRecorder(audioDestination.stream);
      
      // Handle data available event
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };
      
      // Start recording
      mediaRecorder.start();
      isRecording = true;
      recordButton.disabled = true;
      stopButton.disabled = false;
      saveButton.disabled = true;
    } catch (error) {
      console.error('Error setting up recording:', error);
      alert('Error setting up audio recording. Please check your browser permissions.');
    }
  }

  // Start recording
  recordButton.addEventListener('click', async () => {
    if (!isRecording) {
      try {
        await setupRecording();
        recordButton.classList.add('active');
        stopButton.classList.remove('active');
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    }
  });

  // Stop recording
  stopButton.addEventListener('click', () => {
    if (isRecording && mediaRecorder) {
      mediaRecorder.stop();
      isRecording = false;
      recordButton.disabled = false;
      stopButton.disabled = true;
      saveButton.disabled = false;
      recordButton.classList.remove('active');
      stopButton.classList.add('active');
    }
  });

  // Save recording
  saveButton.addEventListener('click', () => {
    if (audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = `chime_bells_recording_${new Date().toISOString().replace(/[:.]/g, '-')}.wav`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(audioUrl);
      
      // Reset recording
      audioChunks = [];
    }
  });

  // Modified bell click handler with audio context
  bells.forEach(bell => {
    bell.addEventListener('click', async function() {
      const audio = bell.querySelector('audio');
      if (audio) {
        if (!audioContext) {
          initAudioContext();
        }

        // Create audio source from the audio element
        const source = audioContext.createMediaElementSource(audio);
        
        // Connect to both the audio destination (for recording) and speakers (for playback)
        if (isRecording) {
          source.connect(audioDestination);
        }
        source.connect(audioContext.destination);

        // Play the sound
        audio.currentTime = 0;
        audio.volume = isMuted ? 0 : currentVolume;
        await audio.play();

        // Add visual feedback
        bell.classList.add('playing');
        setTimeout(() => {
          bell.classList.remove('playing');
        }, 500);
      }
    });
  });
}