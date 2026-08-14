/* ==========================================================================
   FOR MY BEST FRIEND KUSHI - JAVASCRIPT
   ========================================================================== */

(function () {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. DISMISS LOADING SCREEN
  // ------------------------------------------------------------------------
  function hideLoader() {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.style.display = 'none';
        loader.style.pointerEvents = 'none';
      }, 500);
    }
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(hideLoader, 1000);
  } else {
    window.addEventListener('load', hideLoader);
    setTimeout(hideLoader, 2000);
  }


  // ------------------------------------------------------------------------
  // 2. PERSISTENT FLOATING MUSIC CONTROL BAR & AUDIO ENGINE
  // ------------------------------------------------------------------------
  let activeSongKey = null;
  let isMusicPlaying = false;

  const songDetails = {
    'tiktik': { title: 'A Special Song Dedicated To You ✨', sub: 'Tik tik vajate dokyat... Dedicated to Kushi by Vishal 🌟', iframeId: 'tiktik-iframe', modalId: 'tiktik-modal', url: 'https://www.youtube.com/embed/xucrEzhXbHI?enablejsapi=1&autoplay=1', hasVideo: true },
    'sukha': { title: 'A Sweet Song For Our Friendship 🌸', sub: 'Sukha kalale... Forever best friends, Kushi! ✨', iframeId: 'sukha-iframe', modalId: 'sukha-modal', url: 'https://www.youtube.com/embed/nxH-x_OjGvQ?enablejsapi=1&autoplay=1', hasVideo: true },
    'secret-song': { title: 'Secret Message Special Song 💌', sub: 'A heartfelt song for Kushi from Vishal ✨', iframeId: 'audio-engine-iframe', modalId: null, url: 'https://www.youtube.com/embed/sMe4Zzwq5bM?enablejsapi=1&autoplay=1', hasVideo: false },
    'hug-song': { title: 'Special Friendship Hug Song ✨', sub: 'A warm virtual hug & sweet song for Kushi from Vishal 🌟', iframeId: 'audio-engine-iframe', modalId: null, url: 'https://www.youtube.com/embed/zULjde7eOXs?enablejsapi=1&autoplay=1', hasVideo: false }
  };

  function sendIframeCommand(iframeId, command) {
    const iframe = document.getElementById(iframeId);
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage(JSON.stringify({
          'event': 'command',
          'func': command,
          'args': ''
        }), '*');
      } catch (e) {}
    }
  }

  // GUARANTEES ONLY 1 SONG PLAYS AT A TIME!
  function playSongByKey(songKey) {
    // 1. Stop all other video/audio iframes
    Object.keys(songDetails).forEach(key => {
      const s = songDetails[key];
      if (key !== songKey) {
        if (s.iframeId) {
          sendIframeCommand(s.iframeId, 'pauseVideo');
          const iframe = document.getElementById(s.iframeId);
          if (iframe) iframe.src = ''; // reset so audio stops instantly
        }
      }
    });

    activeSongKey = songKey;
    isMusicPlaying = true;
    const song = songDetails[songKey];

    // 2. Play current song
    const targetIframe = document.getElementById(song.iframeId);
    if (targetIframe) {
      targetIframe.src = song.url;
    }

    // 3. Open video modal if song has video popup
    if (song.hasVideo && song.modalId) {
      const modal = document.getElementById(song.modalId);
      if (modal) modal.classList.add('active');
    }

    // 4. Update persistent floating notification control bar
    const bar = document.getElementById('persistent-music-bar');
    const barTitle = document.getElementById('bar-song-title');
    const barSub = document.getElementById('bar-song-subtitle');
    const barPlayBtn = document.getElementById('bar-play-pause-btn');

    if (barTitle) barTitle.textContent = `Now Playing: ${song.title}`;
    if (barSub) barSub.textContent = song.sub;
    if (barPlayBtn) barPlayBtn.textContent = '⏸️';

    const musicLabel = document.getElementById('music-label');
    if (musicLabel) musicLabel.textContent = '🎵 Special Songs';

    if (bar) bar.classList.add('active');
  }

  function stopAllMusic() {
    Object.keys(songDetails).forEach(key => {
      const s = songDetails[key];
      if (s.iframeId) {
        sendIframeCommand(s.iframeId, 'pauseVideo');
        const iframe = document.getElementById(s.iframeId);
        if (iframe) iframe.src = '';
      }
    });
    isMusicPlaying = false;

    const barPlayBtn = document.getElementById('bar-play-pause-btn');
    if (barPlayBtn) barPlayBtn.textContent = '▶️';
  }

  function togglePlayPause() {
    if (!activeSongKey) {
      playSongByKey('tiktik');
      return;
    }

    const song = songDetails[activeSongKey];
    const barPlayBtn = document.getElementById('bar-play-pause-btn');

    if (isMusicPlaying) {
      sendIframeCommand(song.iframeId, 'pauseVideo');
      isMusicPlaying = false;
      if (barPlayBtn) barPlayBtn.textContent = '▶️';
    } else {
      sendIframeCommand(song.iframeId, 'playVideo');
      isMusicPlaying = true;
      if (barPlayBtn) barPlayBtn.textContent = '⏸️';
    }
  }


  // ------------------------------------------------------------------------
  // 3. SMALL-STEP FULL-PAGE RUNAWAY BUTTON ENGINES (SMOOTH SMALL STEPS)
  // ------------------------------------------------------------------------
  let currentOffsetX = 0;
  let currentOffsetY = 0;

  function moveRunawayNoButton(e) {
    if (e) e.preventDefault();
    const noBtn = document.getElementById('forgive-no-btn');
    if (!noBtn) return;

    const deltaX = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 50) + 40);
    const deltaY = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 30) + 15);

    currentOffsetX += deltaX;
    currentOffsetY += deltaY;

    if (currentOffsetX > 130) currentOffsetX = 30;
    if (currentOffsetX < -130) currentOffsetX = -30;
    if (currentOffsetY > 60) currentOffsetY = 15;
    if (currentOffsetY < -60) currentOffsetY = -15;

    noBtn.style.position = 'relative';
    noBtn.style.transform = `translate(${currentOffsetX}px, ${currentOffsetY}px)`;
    noBtn.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    noBtn.style.zIndex = '999';

    const rect = noBtn.getBoundingClientRect();
    createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 8);
  }

  // SMALL SMALL STEPS ACROSS THE ENTIRE PAGE FOR HUG NOT ACCEPTED BUTTON!
  let hugFixedX = null;
  let hugFixedY = null;

  function moveRunawayHugBtn(e) {
    if (e) e.preventDefault();
    const btn = document.getElementById('hug-not-accepted-btn');
    if (!btn) return;

    const btnWidth = btn.offsetWidth || 130;
    const btnHeight = btn.offsetHeight || 45;

    // Initialize fixed position from current screen position if not set
    if (hugFixedX === null || hugFixedY === null) {
      const rect = btn.getBoundingClientRect();
      hugFixedX = rect.left;
      hugFixedY = rect.top;
    }

    // Small small steps (45px to 80px per step across the screen)
    const stepX = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 35) + 45);
    const stepY = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 25) + 30);

    hugFixedX += stepX;
    hugFixedY += stepY;

    // Constrain strictly within viewport bounds (40px margin) so it stays 100% visible!
    const margin = 40;
    const maxX = window.innerWidth - btnWidth - margin;
    const maxY = window.innerHeight - btnHeight - margin;

    if (hugFixedX < margin) hugFixedX = margin + 40;
    if (hugFixedX > maxX) hugFixedX = maxX - 40;
    if (hugFixedY < margin) hugFixedY = margin + 40;
    if (hugFixedY > maxY) hugFixedY = maxY - 40;

    btn.style.position = 'fixed';
    btn.style.left = `${hugFixedX}px`;
    btn.style.top = `${hugFixedY}px`;
    btn.style.transform = 'none';
    btn.style.zIndex = '10000000'; // Highest z-index above modal
    btn.style.transition = 'left 0.22s ease, top 0.22s ease';

    createBurst(hugFixedX + btnWidth / 2, hugFixedY + btnHeight / 2, 8);
  }

  function resetHugNotAcceptedBtn() {
    const btn = document.getElementById('hug-not-accepted-btn');
    if (btn) {
      hugFixedX = null;
      hugFixedY = null;
      btn.style.position = 'relative';
      btn.style.left = 'auto';
      btn.style.top = 'auto';
      btn.style.transform = 'none';
      btn.style.zIndex = '20';
    }
  }


  // ------------------------------------------------------------------------
  // 4. BUILT-IN EMOJI & SPARKLING BURST ENGINE
  // ------------------------------------------------------------------------
  function createBurst(x, y, count = 40) {
    const colors = ['#ff758c', '#ffb6c1', '#a0d8ef', '#d8b4fe', '#ffffff', '#ff2a6d'];
    const emojis = ['✨', '🌸', '🌟', '😊', '🧸', '💖', '⭐', '🎈'];

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'burst-particle';
      const isEmoji = Math.random() > 0.3;

      if (isEmoji) {
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.fontSize = `${Math.random() * 16 + 14}px`;
      } else {
        p.style.width = `${Math.random() * 10 + 6}px`;
        p.style.height = `${Math.random() * 10 + 6}px`;
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
      }

      p.style.position = 'fixed';
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.pointerEvents = 'none';
      p.style.zIndex = '99999999';
      p.style.transform = 'translate(-50%, -50%) scale(1)';
      p.style.transition = 'all 1s cubic-bezier(0.1, 0.8, 0.3, 1)';

      document.body.appendChild(p);

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 180 + 60;
      const targetX = x + Math.cos(angle) * distance;
      const targetY = y + Math.sin(angle) * distance + (Math.random() * 60);

      requestAnimationFrame(() => {
        p.style.left = `${targetX}px`;
        p.style.top = `${targetY}px`;
        p.style.opacity = '0';
        p.style.transform = `translate(-50%, -50%) scale(${Math.random() * 0.5 + 0.2}) rotate(${(Math.random() - 0.5) * 360}deg)`;
      });

      setTimeout(() => p.remove(), 1100);
    }
  }


  // ------------------------------------------------------------------------
  // 5. BACKGROUND PARTICLE CANVAS
  // ------------------------------------------------------------------------
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 30;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 80;
        this.size = Math.random() * 14 + 8;
        this.speedY = Math.random() * 1.2 + 0.4;
        this.speedX = Math.sin(Math.random() * Math.PI) * 0.6;
        this.opacity = Math.random() * 0.6 + 0.3;
        this.type = Math.random() > 0.4 ? 'sparkle' : 'star';
        this.color = ['#ffb6c1', '#a0d8ef', '#d8b4fe', '#ffffff'][Math.floor(Math.random() * 4)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotSpeed;

        if (this.y < -30) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          ctx.lineTo(Math.cos((i * Math.PI) / 2) * this.size, Math.sin((i * Math.PI) / 2) * this.size);
          ctx.lineTo(Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (this.size / 3), Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (this.size / 3));
        }
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }


  // ------------------------------------------------------------------------
  // 6. CURSOR TRAIL EFFECT
  // ------------------------------------------------------------------------
  let lastX = 0, lastY = 0;
  function spawnCursorHeart(x, y) {
    const dist = Math.hypot(x - lastX, y - lastY);
    if (dist < 30) return;
    lastX = x;
    lastY = y;

    const heart = document.createElement('div');
    heart.textContent = ['✨', '🌸', '🌟', '😊', '⭐'][Math.floor(Math.random() * 5)];
    heart.style.position = 'fixed';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = `${Math.random() * 10 + 12}px`;
    heart.style.zIndex = '99999';
    heart.style.transform = 'translate(-50%, -50%) scale(1)';
    heart.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform = `translate(-50%, -${Math.random() * 30 + 30}px) scale(0.2)`;
      heart.style.opacity = '0';
    });

    setTimeout(() => heart.remove(), 800);
  }

  window.addEventListener('mousemove', (e) => spawnCursorHeart(e.clientX, e.clientY));


  // ------------------------------------------------------------------------
  // 7. BUTTON EVENT BINDINGS
  // ------------------------------------------------------------------------
  document.addEventListener('click', (e) => {

    // --- HUG NOT ACCEPTED RUNAWAY BUTTON ---
    const hugNotBtn = e.target.closest('#hug-not-accepted-btn');
    if (hugNotBtn) {
      moveRunawayHugBtn(e);
      return;
    }

    // --- FORGIVE ME YES BUTTON ---
    const forgiveYesBtn = e.target.closest('#forgive-yes-btn');
    if (forgiveYesBtn) {
      const rect = forgiveYesBtn.getBoundingClientRect();
      createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 70);

      const banner = document.getElementById('forgive-yay-banner');
      if (banner) {
        banner.classList.remove('hidden');
        banner.style.display = 'block';
      }

      // Hide runaway no button after yes is clicked
      const noBtn = document.getElementById('forgive-no-btn');
      if (noBtn) noBtn.style.display = 'none';

      return;
    }

    // --- RUNAWAY NO BUTTON CLICK BACKUP ---
    const forgiveNoBtn = e.target.closest('#forgive-no-btn');
    if (forgiveNoBtn) {
      moveRunawayNoButton(e);
      return;
    }

    // --- PERSISTENT BAR CONTROLS ---
    const barPlayBtn = e.target.closest('#bar-play-pause-btn');
    if (barPlayBtn) {
      togglePlayPause();
      return;
    }

    const barStopBtn = e.target.closest('#bar-stop-btn');
    if (barStopBtn) {
      stopAllMusic();
      const bar = document.getElementById('persistent-music-bar');
      if (bar) bar.classList.remove('active');
      return;
    }

    // --- A. HERO BUTTON: "Open Your Surprise 💌" ---
    // OPENS SECRET MESSAGE ENVELOPE, PLAYS SONG sMe4Zzwq5bM, & OPENS POPUP!
    const openSurpriseBtn = e.target.closest('#open-surprise-btn');
    if (openSurpriseBtn) {
      const rect = openSurpriseBtn.getBoundingClientRect();
      createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 90);

      const secretSection = document.getElementById('secret');
      if (secretSection) {
        secretSection.scrollIntoView({ behavior: 'smooth' });
      }

      const envelope = document.getElementById('envelope-wrapper');
      if (envelope) envelope.classList.add('open');

      setTimeout(() => {
        playSongByKey('secret-song');
      }, 400);

      setTimeout(() => {
        const secretModal = document.getElementById('secret-modal');
        if (secretModal) secretModal.classList.add('active');
      }, 800);
      return;
    }

    // --- B. SONG 1: A SPECIAL SONG DEDICATED TO YOU ---
    const playTikTikBtn = e.target.closest('#play-tiktik-hero-btn') || e.target.closest('#tiktik-widget-btn');
    if (playTikTikBtn) {
      const rect = playTikTikBtn.getBoundingClientRect();
      createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 60);
      playSongByKey('tiktik');
      return;
    }

    const closeTikTikBtn = e.target.closest('#close-tiktik-btn');
    if (closeTikTikBtn) {
      const modal = document.getElementById('tiktik-modal');
      if (modal) modal.classList.remove('active');
      return;
    }

    const tiktikModal = e.target.closest('#tiktik-modal');
    if (tiktikModal && !e.target.closest('.modal-card')) {
      tiktikModal.classList.remove('active');
      return;
    }

    // --- C. SONG 2: A SWEET SONG FOR OUR FRIENDSHIP ---
    const playSukhaBtn = e.target.closest('#play-sukha-promise-btn') || e.target.closest('#sukha-widget-btn');
    if (playSukhaBtn) {
      const rect = playSukhaBtn.getBoundingClientRect();
      createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 60);
      playSongByKey('sukha');
      return;
    }

    const closeSukhaBtn = e.target.closest('#close-sukha-btn');
    if (closeSukhaBtn) {
      const modal = document.getElementById('sukha-modal');
      if (modal) modal.classList.remove('active');
      return;
    }

    const sukhaModal = e.target.closest('#sukha-modal');
    if (sukhaModal && !e.target.closest('.modal-card')) {
      sukhaModal.classList.remove('active');
      return;
    }

    // --- D. SECRET ENVELOPE / "Open It ✨" BUTTON ---
    const openSecretBtn = e.target.closest('#open-secret-btn');
    const envelopeWrapper = e.target.closest('#envelope-wrapper');
    if (openSecretBtn || envelopeWrapper) {
      const envelope = document.getElementById('envelope-wrapper');
      if (envelope) envelope.classList.add('open');

      const targetElem = openSecretBtn || envelopeWrapper;
      const rect = targetElem.getBoundingClientRect();
      createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);

      setTimeout(() => {
        playSongByKey('secret-song');
      }, 300);

      setTimeout(() => {
        const secretModal = document.getElementById('secret-modal');
        if (secretModal) secretModal.classList.add('active');
      }, 600);
      return;
    }

    const closeModalBtn = e.target.closest('#close-modal-btn');
    if (closeModalBtn) {
      const secretModal = document.getElementById('secret-modal');
      if (secretModal) secretModal.classList.remove('active');
      return;
    }

    const secretModal = e.target.closest('#secret-modal');
    if (secretModal && !e.target.closest('.modal-card')) {
      secretModal.classList.remove('active');
      return;
    }

    // --- E. FRIENDSHIP PROMISE BUTTONS ("YES", "OF COURSE") ---
    const promiseYesBtn = e.target.closest('#promise-yes-btn');
    const promiseOfcourseBtn = e.target.closest('#promise-ofcourse-btn');
    if (promiseYesBtn || promiseOfcourseBtn) {
      const btn = promiseYesBtn || promiseOfcourseBtn;
      const rect = btn.getBoundingClientRect();
      createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 70);

      const yayBanner = document.getElementById('yay-banner');
      if (yayBanner) {
        yayBanner.classList.remove('hidden');
        yayBanner.style.display = 'block';
      }

      setTimeout(() => {
        playSongByKey('sukha');
      }, 600);
      return;
    }

    // --- F. MAIN HUG BUTTON ("One Last Hug 🤗") ---
    const lastHugBtn = e.target.closest('#last-hug-btn');
    if (lastHugBtn) {
      const rect = lastHugBtn.getBoundingClientRect();
      createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 80);

      resetHugNotAcceptedBtn();
      const hugModal = document.getElementById('hug-modal');
      if (hugModal) hugModal.classList.add('active');

      setTimeout(() => {
        playSongByKey('hug-song');
      }, 500);
      return;
    }

    const closeHugBtn = e.target.closest('#close-hug-btn');
    if (closeHugBtn) {
      const rect = closeHugBtn.getBoundingClientRect();
      createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 70);

      const hugModal = document.getElementById('hug-modal');
      if (hugModal) hugModal.classList.remove('active');
      resetHugNotAcceptedBtn();
      return;
    }

    const hugModal = e.target.closest('#hug-modal');
    if (hugModal && !e.target.closest('.modal-card')) {
      hugModal.classList.remove('active');
      resetHugNotAcceptedBtn();
      return;
    }

    // --- G. WIDGET QUICK BUTTONS ---
    const secretWidgetBtn = e.target.closest('#secret-widget-btn');
    if (secretWidgetBtn) {
      createBurst(e.clientX, e.clientY, 50);
      playSongByKey('secret-song');
      return;
    }

    const hugWidgetBtn = e.target.closest('#hug-song-widget-btn');
    if (hugWidgetBtn) {
      createBurst(e.clientX, e.clientY, 50);
      playSongByKey('hug-song');
      return;
    }

    const playPauseBtn = e.target.closest('#play-pause-btn');
    if (playPauseBtn) {
      togglePlayPause();
      return;
    }

  });

  // Attach runaway listeners directly
  window.addEventListener('load', () => {
    const noBtn = document.getElementById('forgive-no-btn');
    if (noBtn) {
      noBtn.addEventListener('mouseenter', moveRunawayNoButton);
      noBtn.addEventListener('touchstart', moveRunawayNoButton, { passive: false });
      noBtn.addEventListener('mousemove', moveRunawayNoButton);
    }

    const hugNotBtn = document.getElementById('hug-not-accepted-btn');
    if (hugNotBtn) {
      hugNotBtn.addEventListener('mouseenter', moveRunawayHugBtn);
      hugNotBtn.addEventListener('touchstart', moveRunawayHugBtn, { passive: false });
      hugNotBtn.addEventListener('mousemove', moveRunawayHugBtn);
    }
  });

})();
