/* =========================================================
   WEDDING INVITATION — FLOATING BALLOONS
   File name: balloons.js

   Ivory + Champagne + Sage balloons
   - Drop in from the top of the page on load
   - Gentle floating while invitation is closed
   - Balloons fly upward when invitation opens
     (triggered from main.js via window.releaseWeddingBalloons)
   ========================================================= */

(function () {

  /* =========================
     SETTINGS
     ========================= */

  const BALLOON_COUNT = 9;

  const COLORS = [
    { name: "ivory", main: "#F4EFE4", light: "#FFFFFF", dark: "#D8CDBB" },
    { name: "champagne", main: "#E5D3B3", light: "#FFF8EB", dark: "#C3A77A" },
    { name: "sage", main: "#AEB8A0", light: "#E8EBDD", dark: "#7F8D73" },
    { name: "pearl", main: "#EEEAE2", light: "#FFFFFF", dark: "#CBC5BA" }
  ];

  const DROP_IN_DURATION = 1.8; // seconds


  /* =========================
     CSS
     ========================= */

  const style = document.createElement("style");

  style.textContent = `
    #wedding-balloons {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      z-index: 50;
    }

    /* OUTER: page-load entrance (drop from top) + release (fly up) */
    .wedding-balloon {
      position: absolute;
      width: var(--balloon-size);
      height: auto;
      bottom: var(--balloon-bottom);
      opacity: 0;
      animation: balloonDropIn ${DROP_IN_DURATION}s cubic-bezier(0.15, 0.8, 0.3, 1) forwards;
      will-change: transform, opacity;
    }

    /* INNER: continuous gentle float, independent of the entrance transform */
    .wedding-balloon-inner {
      transform-origin: 50% 100%;
      animation: balloonFloat var(--float-speed) ease-in-out var(--float-delay) infinite;
      animation-delay: calc(${DROP_IN_DURATION}s + var(--float-delay));
      will-change: transform;
    }

    .wedding-balloon svg {
      width: 100%;
      height: auto;
      overflow: visible;
      filter: drop-shadow(0 10px 14px rgba(55, 45, 35, 0.10));
    }

    .balloon-string {
      transform-origin: top center;
      animation: stringSway 3.8s ease-in-out infinite;
    }

    /* =========================
       DROP IN FROM TOP (entrance)
       ========================= */

    @keyframes balloonDropIn {
      0% {
        opacity: 0;
        transform: translate3d(0, -130vh, 0) rotate(-6deg);
      }
      70% {
        opacity: var(--balloon-opacity);
      }
      100% {
        opacity: var(--balloon-opacity);
        transform: translate3d(0, 0, 0) rotate(-2deg);
      }
    }

    /* =========================
       GENTLE FLOATING
       ========================= */

    @keyframes balloonFloat {
      0% { transform: translate3d(0, 0, 0) rotate(-2deg); }
      25% { transform: translate3d(7px, -9px, 0) rotate(1deg); }
      50% { transform: translate3d(-5px, -18px, 0) rotate(3deg); }
      75% { transform: translate3d(5px, -8px, 0) rotate(0deg); }
      100% { transform: translate3d(0, 0, 0) rotate(-2deg); }
    }

    @keyframes stringSway {
      0%, 100% { transform: rotate(-1.5deg); }
      50% { transform: rotate(1.5deg); }
    }

    /* =========================
       RELEASE (envelope opened)
       ========================= */

    .wedding-balloon.is-released {
      animation: balloonRelease var(--release-speed) cubic-bezier(.25,.45,.35,1) var(--release-delay) forwards;
    }

    @keyframes balloonRelease {
      0% {
        opacity: var(--balloon-opacity);
        transform: translate3d(0, 0, 0) rotate(0deg);
      }
      18% {
        transform: translate3d(calc(var(--drift) * -0.25), -100px, 0) rotate(-3deg);
      }
      42% {
        transform: translate3d(calc(var(--drift) * 0.4), -300px, 0) rotate(3deg);
      }
      68% {
        opacity: var(--balloon-opacity);
        transform: translate3d(calc(var(--drift) * -0.35), -65vh, 0) rotate(-2deg);
      }
      100% {
        opacity: 0;
        transform: translate3d(var(--drift), -125vh, 0) rotate(3deg);
      }
    }

    @media (max-width: 700px) {
      .wedding-balloon {
        width: calc(var(--balloon-size) * 0.78);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #wedding-balloons {
        display: none;
      }
    }
  `;

  document.head.appendChild(style);


  /* =========================
     CREATE BALLOON SVG
     ========================= */

  function createBalloonSVG(color, id) {
    return `
      <svg viewBox="0 0 150 330" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <radialGradient id="balloonGradient-${id}" cx="32%" cy="23%" r="72%">
            <stop offset="0%" stop-color="${color.light}" stop-opacity="0.96" />
            <stop offset="38%" stop-color="${color.main}" stop-opacity="0.91" />
            <stop offset="100%" stop-color="${color.dark}" stop-opacity="0.94" />
          </radialGradient>
          <linearGradient id="shine-${id}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.70" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
          </linearGradient>
        </defs>

        <path
          d="M75 10 C34 10 15 45 15 88 C15 137 47 173 75 193 C103 173 135 137 135 88 C135 45 116 10 75 10 Z"
          fill="url(#balloonGradient-${id})"
        />

        <ellipse
          cx="52" cy="55" rx="18" ry="31"
          fill="url(#shine-${id})"
          opacity="0.60"
          transform="rotate(20 52 55)"
        />

        <path
          d="M68 190 L82 190 L76 207 L66 202 Z"
          fill="${color.dark}"
          opacity="0.85"
        />

        <g class="balloon-string">
          <path
            d="M75 203 C55 230, 96 248, 70 275 C50 296, 93 311, 72 330"
            fill="none"
            stroke="#B9A98E"
            stroke-width="1.25"
            stroke-linecap="round"
            opacity="0.80"
          />
        </g>
      </svg>
    `;
  }


  /* =========================
     CREATE BALLOONS
     ========================= */

  const balloonLayer = document.createElement("div");
  balloonLayer.id = "wedding-balloons";
  balloonLayer.setAttribute("aria-hidden", "true");
  document.body.appendChild(balloonLayer);

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createBalloon(index) {
    const balloon = document.createElement("div");
    balloon.className = "wedding-balloon";

    const color = COLORS[index % COLORS.length];

    // Keep centre relatively empty (envelope sits there).
    let left;
    if (index % 2 === 0) {
      left = random(-2, 19);
    } else {
      left = random(79, 96);
    }

    const size = random(72, 118);
    const bottom = random(-30, 42);
    const opacity = random(0.72, 0.94);
    const floatSpeed = random(4.5, 7);
    const floatDelay = random(-5, 0);
    const releaseSpeed = random(5.5, 8);
    const releaseDelay = index * 0.18 + random(0, 0.3);
    const drift = random(-90, 90);

    balloon.style.left = left + "%";
    balloon.style.setProperty("--balloon-size", size + "px");
    balloon.style.setProperty("--balloon-bottom", bottom + "px");
    balloon.style.setProperty("--balloon-opacity", opacity);
    balloon.style.setProperty("--float-speed", floatSpeed + "s");
    balloon.style.setProperty("--float-delay", floatDelay + "s");
    balloon.style.setProperty("--release-speed", releaseSpeed + "s");
    balloon.style.setProperty("--release-delay", releaseDelay + "s");
    balloon.style.setProperty("--drift", drift + "px");

    balloon.innerHTML =
      '<div class="wedding-balloon-inner">' + createBalloonSVG(color, index) + "</div>";

    balloonLayer.appendChild(balloon);
  }

  for (let i = 0; i < BALLOON_COUNT; i++) {
    createBalloon(i);
  }


  /* =========================
     RELEASE BALLOONS
     ========================= */

  let released = false;

  function releaseWeddingBalloons() {
    if (released) return;
    released = true;

    const balloons = document.querySelectorAll(".wedding-balloon");
    balloons.forEach((balloon) => {
      balloon.classList.add("is-released");
    });

    setTimeout(() => {
      balloonLayer.remove();
    }, 10000);
  }

  window.releaseWeddingBalloons = releaseWeddingBalloons;

})();
