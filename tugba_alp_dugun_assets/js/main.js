(function () {
  "use strict";

  // Wedding date/time, fixed to Turkey time (UTC+3, no DST).
  var EVENT_DATE = new Date("2026-10-31T16:00:00+03:00");

  // Envelope cover: click it to open, watch the card rise out, then hand off to the main page.
  var welcome = document.getElementById("welcome");
  var invitation = document.getElementById("invitation");
  var closedEnvelope = document.getElementById("closedEnvelope");
  var openEnvelope = document.getElementById("openEnvelope");
  var welcomePetals = document.getElementById("welcomePetals");

  if (welcome) {
    document.body.style.overflow = "hidden";
  }

  var petalImages = [
    "/tugba_alp_dugun_assets/img/petals/petal1.png",
    "/tugba_alp_dugun_assets/img/petals/petal2.png",
    "/tugba_alp_dugun_assets/img/petals/petal3.png",
    "/tugba_alp_dugun_assets/img/petals/petal4.png",
    "/tugba_alp_dugun_assets/img/petals/petal5.png"
  ];

  function createWelcomePetal() {
    if (!welcomePetals) return;
    var petal = document.createElement("img");
    petal.className = "petal-photo";
    petal.src = petalImages[Math.floor(Math.random() * petalImages.length)];
    petal.style.left = Math.random() * 100 + "%";
    petal.style.width = 18 + Math.random() * 22 + "px";
    petal.style.animationDuration = 4 + Math.random() * 3 + "s";
    welcomePetals.appendChild(petal);
    setTimeout(function () {
      petal.remove();
    }, 7000);
  }

  function revealInvitation() {
    if (invitation) {
      invitation.removeAttribute("aria-hidden");
      invitation.classList.add("is-visible");
    }
    if (welcome) {
      welcome.classList.add("is-leaving");
      setTimeout(function () {
        welcome.style.display = "none";
      }, 650);
    }
    document.body.style.overflow = "";
  }

  function openInvitation() {
    if (closedEnvelope) {
      closedEnvelope.classList.add("fade-out");
    }

    // Envelope starts opening first, then the balloons release upward.
    setTimeout(function () {
      if (window.releaseWeddingBalloons) window.releaseWeddingBalloons();
    }, 350);

    setTimeout(function () {
      if (closedEnvelope) closedEnvelope.style.display = "none";
      if (openEnvelope) openEnvelope.classList.remove("hidden");

      setTimeout(function () {
        if (openEnvelope) openEnvelope.classList.add("show");
        for (var i = 0; i < 15; i++) {
          setTimeout(createWelcomePetal, i * 180);
        }
      }, 300);
    }, 1000);

    setTimeout(revealInvitation, 3900);
  }

  if (closedEnvelope) {
    closedEnvelope.addEventListener("click", openInvitation, { once: true });
  }

  // Hero background video mute toggle.
  var heroVideo = document.getElementById("heroVideo");
  var muteBtn = document.getElementById("muteBtn");

  if (heroVideo && muteBtn) {
    var icon = muteBtn.querySelector(".mute-btn__icon");
    muteBtn.addEventListener("click", function () {
      heroVideo.muted = !heroVideo.muted;
      if (icon) {
        icon.textContent = heroVideo.muted ? "🔇" : "🔊";
      }
      muteBtn.setAttribute("aria-label", heroVideo.muted ? "Sesi aç" : "Sesi kapat");
    });
  }

  // Countdown.
  var cdDays = document.getElementById("cdDays");
  var cdHours = document.getElementById("cdHours");
  var cdMins = document.getElementById("cdMins");
  var cdSecs = document.getElementById("cdSecs");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function updateCountdown() {
    var diff = EVENT_DATE.getTime() - Date.now();
    if (diff < 0) diff = 0;

    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var mins = Math.floor((totalSeconds % 3600) / 60);
    var secs = totalSeconds % 60;

    if (cdDays) cdDays.textContent = pad(days);
    if (cdHours) cdHours.textContent = pad(hours);
    if (cdMins) cdMins.textContent = pad(mins);
    if (cdSecs) cdSecs.textContent = pad(secs);
  }

  if (cdDays && cdHours && cdMins && cdSecs) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // Floating petals.
  var petalsContainer = document.querySelector(".petals");
  if (petalsContainer) {
    var PETAL_COUNT = 14;
    var petalGlyphs = ["❀", "✿", "❁"];
    for (var i = 0; i < PETAL_COUNT; i++) {
      var petal = document.createElement("span");
      petal.className = "petal";
      petal.textContent = petalGlyphs[i % petalGlyphs.length];
      petal.style.left = Math.random() * 100 + "%";
      petal.style.fontSize = 0.7 + Math.random() * 0.8 + "rem";
      petal.style.animationDuration = 8 + Math.random() * 10 + "s";
      petal.style.animationDelay = Math.random() * 10 + "s";
      petalsContainer.appendChild(petal);
    }
  }
})();
