
// Matrix Background
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0F0';
  ctx.font = fontSize + 'px monospace';
  for (let i = 0; i < drops.length; i++) {
    const text = String.fromCharCode(0x30A0 + Math.random() * 96);
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height || Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 33);

// Boot Sequence Variables
const bootLines = [
  "Initializing Ying Qian's Portfolio...",
  "Loading secure protocols...",
  "Establishing connection...",
  "Verifying integrity...",
  "Scanning systems...",
  "Finalizing boot sequence..."
];
let currentLine = 0;
const bootElement = document.getElementById('boot-sequence');
let loadingInterval;
let currentProgress = 0;
const totalBootTime = 8000; // 8 seconds total boot time

// Start Loading Bar Animation
function startLoadingBar() {
  const startTime = Date.now();
  loadingInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    currentProgress = Math.min(100, (elapsed / totalBootTime) * 100);
    document.getElementById('loading-progress').style.width = `${currentProgress}%`;
    document.getElementById('loading-percentage').textContent = `${Math.floor(currentProgress)}%`;
    
    if (currentProgress >= 100) {
      clearInterval(loadingInterval);
    }
  }, 50);
}

// Typewriter Effect for Boot Lines
function typeLine(line, index = 0) {
  if (index === 0 && currentLine === 0) {
    // Start loading bar on first line
    startLoadingBar();
  }
  
  if (index < line.length) {
    bootElement.textContent += line.charAt(index);
    setTimeout(() => typeLine(line, index + 1), 30);
  } else {
    bootElement.textContent += "\n";
    currentLine++;
    if (currentLine < bootLines.length) {
      setTimeout(() => typeLine(bootLines[currentLine]), 300);
    } else {
      // When boot sequence completes
      clearInterval(loadingInterval);
      document.getElementById('loading-percentage').textContent = "100%";
      document.getElementById('loading-progress').style.width = "100%";
      document.getElementById('press-key').style.opacity = 1;
      document.addEventListener('keydown', showPortfolio);
      document.addEventListener('click', showPortfolio);
    }
  }
}

// Show Portfolio After Boot Sequence
function playIntroAudioOnce() {
  const introAudio = document.getElementById('intro-audio');
  if (introAudio.paused) {
    introAudio.play().catch(() => {});
  }
  document.removeEventListener('keydown', playIntroAudioOnce);
  document.removeEventListener('click', playIntroAudioOnce);
}

document.addEventListener('keydown', playIntroAudioOnce);
document.addEventListener('click', playIntroAudioOnce);

function showPortfolio(e) {
  e.preventDefault();

  // Stop intro audio when entering main content
  const introAudio = document.getElementById('intro-audio');
  introAudio.pause();
  introAudio.currentTime = 0;
  introAudio.src = ""; // Unload the audio

  // Remove the event listeners that play the audio
  document.removeEventListener('keydown', playIntroAudioOnce);
  document.removeEventListener('click', playIntroAudioOnce);

  // Show main background image
  document.body.classList.add('show-main-bg');

  // Show full-screen virus cleaned message
  const virusCleaned = document.getElementById('virus-cleaned');
  virusCleaned.style.display = 'flex';

  // Hide other elements
  document.getElementById('boot-content').style.display = 'none';

  // After delay, proceed with portfolio
  setTimeout(() => {
    document.removeEventListener('keydown', showPortfolio);
    document.removeEventListener('click', showPortfolio);

    // Fade out virus cleaned message
    virusCleaned.style.opacity = '0';
    virusCleaned.style.transition = 'opacity 1s ease';

    setTimeout(() => {
      document.getElementById('intro-terminal').style.display = 'none';
      document.querySelectorAll('section').forEach((section, i) => {
        setTimeout(() => {
          section.classList.add('visible');
          if (section.id === 'about') animateBio();
        }, i * 300);
      });
    }, 1000);
  }, 2000); // Show for 2 seconds
}

// Start the boot sequence
typeLine(bootLines[currentLine]);

// Typing animation for bio
function animateBio() {
  const bio = document.getElementById('animated-bio');
  const fullText = bio.textContent;
  bio.textContent = '';
  bio.style.overflow = 'visible';
  bio.style.borderRight = '2px solid lime';
  
  let i = 0;
  const typing = setInterval(() => {
    if (i < fullText.length) {
      bio.textContent += fullText.charAt(i);
      i++;
      if (i % 3 === 0) playSound('type'); 
    } else {
      clearInterval(typing);
      bio.style.borderRight = 'none';
    }
  }, 50);
}

// Form Validation
function validateForm() {
  let valid = true;
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  document.getElementById('nameError').textContent = name ? '' : 'Name is required.';
  document.getElementById('emailError').textContent = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Valid email is required.';
  document.getElementById('messageError').textContent = message ? '' : 'Message cannot be empty.';
  
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) valid = false;
  
  if (valid) {
    alert('Message sent successfully!');
    document.getElementById('contactForm').reset();
  }
  
  return valid;
}

// Skills Toggle
function showSkills(type) {
  const tech = document.getElementById('tech-skills');
  const tools = document.getElementById('tool-skills');
  const btnTech = document.getElementById('btn-tech');
  const btnTools = document.getElementById('btn-tools');

  if (type === 'tech') {
    tech.style.display = 'grid';
    tools.style.display = 'none';
    btnTech.classList.add('active');
    btnTools.classList.remove('active');
  } else {
    tech.style.display = 'none';
    tools.style.display = 'grid';
    btnTools.classList.add('active');
    btnTech.classList.remove('active');
  }
}

// Mobile Navigation
function toggleMobileNav() {
  const mobileNav = document.getElementById('mobileNav');
  const isOpen = mobileNav.style.display === 'flex';
  
  if (isOpen) {
    mobileNav.style.display = 'none';
    document.body.style.overflow = 'auto';
  } else {
    mobileNav.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Project Demo Modal
const projectVideos = {
  'pokemon-demo': 'videos/pokemon-demo.mp4',
  'course-demo': 'videos/course-demo.mp4',
  'chess-demo': 'videos/chess-demo.mp4'
};

function showDemo(projectId) {
  const modal = document.getElementById('demo-modal');
  const videoPlayer = document.getElementById('demo-video');
  
  videoPlayer.src = projectVideos[projectId];
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  videoPlayer.controls = false;
  
  const playPromise = videoPlayer.play();
  if (playPromise !== undefined) {
    playPromise.catch(e => {
      console.log("Video play failed:", e);
      videoPlayer.controls = true;
    });
  }
}

function closeDemo() {
  const modal = document.getElementById('demo-modal');
  const videoPlayer = document.getElementById('demo-video');
  
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
  videoPlayer.controls = false;
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.getElementById('demo-modal').style.display === 'block') {
    closeDemo();
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  
  if (window.innerWidth > 768) {
    document.getElementById('mobileNav').style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 768) {
    document.getElementById('desktop-nav').style.display = 'none';
  }
});

// Sound effects (placeholder - implement as needed)
function playSound(type) {
  // You would implement actual sound playback here
  console.log(`Playing ${type} sound`);
}
// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('terminal-video');
  
  // Ensure video plays (some browsers require this)
  const playPromise = video.play();
  
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      // Auto-play was prevented, show a play button or handle accordingly
      console.error("Video autoplay prevented:", error);
      video.controls = true; // Show controls if autoplay fails
    });
  }
  
  // Handle video loading
  video.addEventListener('loadedmetadata', function() {
    video.style.opacity = 1; // Fade in when loaded
  });
});

// Get audio element for intro
const introAudio = document.getElementById('intro-audio');

// Play intro audio when intro terminal is shown
window.addEventListener('DOMContentLoaded', () => {
  introAudio.volume = 0.5; // Optional: set volume
  introAudio.play().catch(() => {}); // Some browsers require user interaction
});

// When user continues to main page, stop intro audio
function continueToMainPage() {
  introAudio.pause();
  introAudio.currentTime = 0;
  // ... your existing code to hide intro terminal and show main page ...
}

// If you use a keydown event to continue
// (Remove main-audio logic)
document.addEventListener('keydown', () => {
  const introAudio = document.getElementById('intro-audio');
  if (introAudio.paused) {
    introAudio.play().catch(() => {});
  }
}, { once: true });

document.addEventListener('click', () => {
  const introAudio = document.getElementById('intro-audio');
  if (introAudio.paused) {
    introAudio.play().catch(() => {});
  }
}, { once: true });
