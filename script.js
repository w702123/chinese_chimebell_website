// ===== RESPONSIVE TOP NAVIGATION MENU==================
// Reference: https://www.w3schools.com/howto/howto_js_topnav_responsive.asp

function toggleMobileMenu() {
  var x = document.querySelector(".topnav");
  // When called, it either adds or removes the 'responsive' class from the navigation
  if (!x.classList.contains("responsive")) {
    x.classList.add("responsive");           
  } else {
    x.classList.remove("responsive");
  }
}

// ========== DOM CONTENT LOADED EVENT HANDLER ===========
// Add event listener when DOM content is loaded
// Reference: https://www.w3schools.com/js/js_htmldom_eventlistener.asp

// This event ensures all DOM elements are loaded before running any JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile menu button
  const menuButton = document.getElementById('menuToggle');
  menuButton.addEventListener('click', toggleMobileMenu);

  // Initialize search functionality
  initializeSearch();

  // Initialize tab navigation
  // Tab Navigation
  // Reference: https://www.w3schools.com/howto/howto_js_tabs.asp
  
  // Get all tab buttons
  const tabButtons = document.querySelectorAll('.tab-button');

  // Add click event listeners to all tab buttons (Record button and stop button on play page)
  // handle the active state of tabs
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
    });
  });

  // =========== SHARE BUTTON FUNCTIONALITY =================
  // Reference: https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
  
  // Initialize 
  const shareButton = document.querySelector('.action-button:last-child');
  if (shareButton) {
    shareButton.addEventListener('click', async function() {
      const url = 'https://w702123.github.io/chinese_chimebell_website/';
      try {
        // Attempt to copy URL to clipboard 
        await navigator.clipboard.writeText(url);
        // Provide visual feedback by temporarily changing button text
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        // Reset button text after 2 seconds
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

// ========= SEARCH FUNCTIONALITY ==============
// References:
// - Search implementation: https://www.w3schools.com/howto/howto_js_filter_dropdown.asp
// - Search suggestions: https://www.w3schools.com/howto/howto_js_filter_list.asp
// - Dynamic content: https://www.w3schools.com/howto/howto_js_filter_elements.asp
// - Search box: https://www.w3schools.com/howto/howto_css_searchbar.asp

// Initialize 
function initializeSearch() {
  // Get DOM elements for search functionality
  const searchForm = document.querySelector('.search form');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  // Define searchable content structure
  // Contains all the content that can be searched
  const pageContent = {
    'learn.html': {   // Organized by page with title and relevant keywords
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

  // Add submit event listener to search form
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      // Prevent form from submitting and refreshing page
      e.preventDefault();
      // Get search query and normalize it
      const query = searchInput.value.toLowerCase().trim();
      
      // Clear results if search query is empty
      if (!query) {
        searchResults.innerHTML = '';
        return;
      }

      // Array to store search results
      let results = [];
      
      // Search through content of each page
      for (const [page, data] of Object.entries(pageContent)) {
        // Filter content items that match the search query
        const matches = data.content.filter(item => 
          item.toLowerCase().includes(query)
        );
        
        // If matches found, add to results array
        if (matches.length > 0) {
          results.push({
            page: page,
            title: data.title,
            matches: matches
          });
        }
      }

      // Display search results with animation   
     // Reference: https://codepen.io/san_coder13/pen/VwYLjJB
      displaySearchResults(results, query);
    });
  }


  
  // Function to display search results in a formatted way
  // Includes:
  // - Results count
  // - Matched items grouped by page
  // - Links to relevant pages
  function displaySearchResults(results, query) {
    // Display message if no results found
    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="no-results">
          <p>No results found for "${query}"</p>
        </div>
      `;
      return;
    }

    // Generate HTML for each result item
    const resultsHTML = results.map(result => `
      <div class="result-item">
        <h3><a href="${result.page}">${result.title}</a></h3>
        <ul>
          ${result.matches.map(match => `<li>${match}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    // Combine header and results into final HTML
    searchResults.innerHTML = `
      <div class="results-header">
        <h2>Search Results</h2>
        <p>${results.length} page(s) found</p>
      </div>
      ${resultsHTML}
    `;
  }
}

// ======== LEARN PAGE FUNCTIONALITY ========

// References: 
// - Back to top button: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
// - Smooth scrolling: https://www.w3schools.com/howto/howto_css_smooth_scroll.asp
// - Animation reference: https://codepen.io/matthewcain/pen/ZepbeR

// Initialize back to top button function
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('backToTop');
  
  if (backToTopButton) {
    // Add scroll event listener to show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      // Show button when user scrolls down 100px from the top
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = "flex";
      } else {
        // Hide button when user is near the top
        backToTopButton.style.display = "none";
      }
    });
    
    // Add click event listener to scroll back to top
    backToTopButton.addEventListener('click', function() {
      // Smooth scroll to top of page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

// ======== LIBRARY PAGE FUNCTIONALITY =================
/*
 * Library page functionality implements audio playback and management
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

// Initialize library function
document.addEventListener('DOMContentLoaded', function() {
  const uploadForm = document.getElementById('uploadForm');
  const musicGrid = document.getElementById('musicGrid');
  const emptyState = document.getElementById('emptyState');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.querySelector('.search-button');

  // File input elements
  const musicFileInput = document.getElementById('musicFile');
  const coverImageInput = document.getElementById('coverImage');
  const musicFileName = document.getElementById('musicFileName');
  const imageFileName = document.getElementById('imageFileName');
  const imagePreview = document.getElementById('imagePreview');

  // Handle music file selection
  // When a music file is selected:
  // 1. Display the file name
  // 2. Update UI to show file is selected
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
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
  if (coverImageInput) {
    coverImageInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        // Update file name display
        imageFileName.textContent = file.name;
        coverImageInput.parentElement.querySelector('.file-label').classList.add('has-file');
        
        // Create and display image preview
        const reader = new FileReader();
        reader.onload = function(e) {
          imagePreview.innerHTML = `<img src="${e.target.result}" alt="Cover preview">`;
          imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      } else {
        // Reset UI if no file selected
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

  // Search handler function to filter music cards based on search input
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

  // Initialize upload form if it exists
  if (uploadForm) {
    uploadForm.addEventListener('submit', handleMusicUpload);
  }

  // Load existing music from localStorage when page loads
  loadMusicCollection();

  /* 
   * Music player implementation using HTML5 Audio API
   * Reference: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
   */
  
  // Handle music upload process
  // This function:
  // 1. Creates object URLs for music files
  // 2. Converts cover images to Base64
  // 3. Gets audio duration
  // 4. Saves to localStorage
  // 5. Updates UI
  async function handleMusicUpload(e) {
    e.preventDefault();
    
    const musicFile = document.getElementById('musicFile').files[0];
    const coverFile = document.getElementById('coverImage').files[0];
    const title = document.getElementById('musicTitle').value;
    
    if (!musicFile) {
      alert('Please select a music file');
      return;
    }
    
    // Create object URL for the music file for playback
    const musicUrl = URL.createObjectURL(musicFile);
    
    // Convert cover image to Base64 if exists, otherwise use default
    let coverUrl = 'default-cover.jpg';
    if (coverFile) {
      coverUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(coverFile);
      });
    }
    
    // Create temporary audio element to get duration
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
    
    // Save to localStorage and update UI
    const musicCollection = JSON.parse(localStorage.getItem('musicCollection') || '[]');
    musicCollection.push(musicEntry);
    localStorage.setItem('musicCollection', JSON.stringify(musicCollection));
    
    // Add new music card to the grid
    addMusicCard(musicEntry);
    
    // Reset form and preview
    e.target.reset();
    imagePreview.innerHTML = '';
    imagePreview.style.display = 'none';
    
    // Update empty state visibility
    document.getElementById('emptyState').style.display = 'none';
  }

 
  
  // Function to add a music card to the display
  // Creates a card with:
  // - Cover image
  // - Title
  // - Duration
  // - Playback controls
  // - Progress bar
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

  // Load music collection from localStorage and display cards
  function loadMusicCollection() {
    const musicCollection = JSON.parse(localStorage.getItem('musicCollection')) || [];
    
    // Hide empty state if there are music items
    if (musicCollection.length > 0 && emptyState) {
      emptyState.style.display = 'none';
    }
    
    // Create cards for each music item
    musicCollection.forEach(entry => addMusicCard(entry));
  }
});


// ====== UTILITY FUNCTIONS AND AUDIO CONTROL ========

// Format duration from seconds to MM:SS format
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Global audio player instance to manage currently playing audio
let currentAudio = null;
let currentButton = null;

// Update progress bar and time display during playback
function updateProgress(controls, audio) {
  const progressBar = controls.querySelector('.progress-bar');
  const progressFill = controls.querySelector('.progress-fill'); // - Progress bar fill width
  const timeDisplay = controls.querySelector('.time-display'); // - Current time/total time display
  
  // Calculate and set progress percentage
  const progress = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = `${progress}%`;
  
  // Update time display
  timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
}

// Setup click handler for progress bar seeking
function setupProgressBarControl(controls, audio) {
  const progressBar = controls.querySelector('.progress-bar');
  
  progressBar.addEventListener('click', function(e) {
    // Calculate click position relative to progress bar width
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    // Set audio time based on click position
    const newTime = clickPosition * audio.duration;
    audio.currentTime = newTime;
    updateProgress(controls, audio);
  });
}

// Toggle play/pause function
// Handles:
// - Playing new audio
// - Pausing current audio
// - Resuming paused audio
// - Updating UI state
function togglePlay(button, musicUrl) {
  if (currentAudio && currentAudio.src === musicUrl) {
    // Toggle play/pause for current audio
    if (currentAudio.paused) {
      currentAudio.play();
      updatePlayButton(button, true);
    } else {
      currentAudio.pause();
      updatePlayButton(button, false);
    }
  } else {
    // Stop currently playing audio if exists
    if (currentAudio) {
      currentAudio.pause();
      updatePlayButton(currentButton, false);
    }
    
    // Create and setup new audio instance
    currentAudio = new Audio(musicUrl);
    currentButton = button;
    
    // Setup progress bar control
    setupProgressBarControl(button.parentElement, currentAudio);
    
    // Add timeupdate listener for progress
    currentAudio.addEventListener('timeupdate', () => {
      updateProgress(button.parentElement, currentAudio);
    });
    
    // Handle playback end
    currentAudio.addEventListener('ended', () => {
      updatePlayButton(button, false);
      updateProgress(button.parentElement, currentAudio);
    });
    
    // Start playback
    currentAudio.play();
    updatePlayButton(button, true);
  }
}

// Update play button icon based on playback state
function updatePlayButton(button, isPlaying) {
  button.innerHTML = isPlaying
    ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor"/></svg>'
    : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
}

// Format time in MM:SS format
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

// ============ PLAY PAGE FUNCTIONALITY - INTERACTIVE CHIME BELLS ====================

// Initialize the bells functionality with audio and recording features
// function sets up:
// 1. Bell click handlers and sound playback
// 2. Volume control with mute/unmute
// 3. Recording functionality with MediaRecorder
// 4. Audio processing with Web Audio API
function initializeBells() {
  // Get DOM elements for bells functionality
  const bells = document.querySelectorAll('.bell-wrapper');
  const volumeButton = document.querySelector('.volume-button');
  const recordButton = document.getElementById('recordButton');
  const stopButton = document.getElementById('stopButton');
  const saveButton = document.getElementById('saveButton');
  
  // Initialize audio context and recording state
  let audioContext = null;
  let isRecording = false;
  let audioDestination = null;
  let isMuted = false;
  let currentVolume = 1.0;
  let mediaRecorder = null;
  let audioChunks = [];

  // Create volume slider with custom styling
  const volumeSlider = document.createElement('input');
  volumeSlider.type = 'range';
  volumeSlider.min = '0';
  volumeSlider.max = '1';
  volumeSlider.step = '0.1';
  volumeSlider.value = currentVolume;
  volumeSlider.className = 'volume-slider';
  
  // Create container for volume controls
  const volumeControls = document.createElement('div');  // Groups volume button and slider
  volumeControls.className = 'volume-controls';
  volumeControls.style.display = 'flex';
  volumeControls.style.alignItems = 'center';
  
  // Setup volume controls in the DOM
  volumeButton.parentNode.insertBefore(volumeControls, volumeButton);
  volumeControls.appendChild(volumeButton);
  volumeControls.appendChild(volumeSlider);
  
  // Hide slider by default
  volumeSlider.style.display = 'none';
  // Volume button click handler
  volumeButton.addEventListener('click', () => {
    volumeSlider.style.display = volumeSlider.style.display === 'none' ? 'block' : 'none';   // Toggles visibility of volume slider
  });

  // Volume slider change handler
  volumeSlider.addEventListener('input', (e) => {
    currentVolume = parseFloat(e.target.value);
    isMuted = currentVolume === 0;  // Updates volume level and mute state
  });

  // Click outside to hide volume slider
  document.addEventListener('click', (e) => {
    if (!volumeControls.contains(e.target)) {
      volumeSlider.style.display = 'none';
    }
  });

  // Initialize audio context
  function initAudioContext() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioDestination = audioContext.createMediaStreamDestination();
  }

  // Setup recording functionality
  async function setupRecording() {
    try {
      if (!audioContext) {
        initAudioContext();
      }
      
      // Create MediaRecorder instance for recording audio
      mediaRecorder = new MediaRecorder(audioDestination.stream);
      
      // Handle recorded audio data
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

  // Start recording handler
  // Initiates audio recording when record button is clicked
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

  // Stop recording handler
  // Stops ongoing recording and enables save functionality
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

// Save recording handler

// Problem in saving the recording:
// Convert recorded audio to MP3 format because the generated WAV files are not true WAV files.
// Some browsers allow setting the file extension to .wav, but the actual content is encoded in WebM or Opus format.
// As a result, these files may not play in standard media players like Apple Music or QuickTime.
// I encountered the same issue and found this helpful article online: 
// https://franzeus.medium.com/record-audio-in-js-and-upload-as-wav-or-mp3-file-to-your-backend-1a2f35dea7e8
// MP3 is more reliable and widely supported across platforms.
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/isTypeSupported_static --> This page shows that 'audio/wav' is not a supported MIME type for MediaRecorder in most browsers

  // Converts recording to MP3 and triggers download
  // Reference: https://github.com/zhuker/lamejs
  // Reference of how to use lamejs: https://scribbler.live/2024/12/05/Coverting-Wav-to-Mp3-in-JavaScript-Using-Lame-js.html
  saveButton.addEventListener('click', async () => {
    if (audioChunks.length > 0) {
      try {
        // Convert recorded audio to MP3 format
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const mp3Blob = await window.convertWavToMp3(audioBlob);
        
        // Create and trigger download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(mp3Blob); 
        link.download = `chime_bells_recording_${new Date().toISOString().replace(/[:.]/g, '-')}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        
        // Reset recording buffer
        audioChunks = [];
      } catch (error) {
        console.error('Error saving recording:', error);
        alert('Error saving recording: ' + error.message);
      }
    }
  });

  // Bell click handler
  // Sets up interactive bell sounds with audio processing
  bells.forEach(bell => {
    bell.addEventListener('click', async function() {
      // Get audio source for the bell
      const audioSrc = bell.querySelector('audio').src;
      
      // Create new audio element for playback
      const audio = new Audio(audioSrc);
      
      // Initialize audio context if needed
      if (!audioContext) {
        initAudioContext();
      }

      // Create and connect audio source
      const source = audioContext.createMediaElementSource(audio);
      
      // Connect to recording destination if recording
      if (isRecording) {
        source.connect(audioDestination);
      }
      // Connect to speakers for playback
      source.connect(audioContext.destination);

      // Apply volume settings and play sound
      audio.volume = isMuted ? 0 : currentVolume;
      await audio.play();

      // Add visual feedback animation
      bell.classList.add('playing');
      setTimeout(() => {
        bell.classList.remove('playing');
      }, 500);
    });
  });
}
