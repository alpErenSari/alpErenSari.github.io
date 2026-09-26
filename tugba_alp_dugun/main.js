document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
   1. DAVETİYE AÇILIŞI
   Zarf → Balonlar → Hero
   ===================================================== */

const gate = document.getElementById("gate");
const seal = document.getElementById("seal");

const balloonTransition =
  document.getElementById("balloonTransition");


/* =====================================================
   BALONLARI OLUŞTUR
   ===================================================== */

function createTransitionBalloons() {

  if (!balloonTransition) return;

  balloonTransition.innerHTML = "";


  /* 
     Mobilde biraz daha az,
     masaüstünde ekranı dolduracak kadar çok.
  */

  const count =
    window.innerWidth < 700 ? 70 : 100;


  /* Düğünün renk paleti */

  const colors = [
    "#f8f6f0",  // ivory
    "#eee9df",  // cream
    "#e5dcc9",  // champagne
    "#b9c4a6",  // soft sage
    "#d8c7bd",  // soft blush
    "#faf7ef"   // kırık beyaz
  ];


  for (let i = 0; i < count; i++) {

    const balloon =
      document.createElement("span");

    balloon.className =
      "transition-balloon";


    /* Bazıları önde ve büyük */

    const isFront =
      Math.random() < 0.22;

    const isBack =
      !isFront && Math.random() < 0.25;


    if (isFront) {
      balloon.classList.add("is-front");
    }

    if (isBack) {
      balloon.classList.add("is-back");
    }


    /* Ekranın tamamına dağıt */

    const x =
      -3 + Math.random() * 106;


    /* Boyut */

    let size;

    if (isFront) {

      size =
        115 + Math.random() * 75;

    } else if (isBack) {

      size =
        48 + Math.random() * 35;

    } else {

      size =
        70 + Math.random() * 55;

    }


    /*
       Balonların dalga dalga çıkması.
       Hepsi aynı anda başlamıyor.
    */

    const delay =
      Math.random() * 1.6;


    const duration =
      4.8 + Math.random() * 1.6;


    const drift =
      -28 + Math.random() * 56;


    const rotate =
      -8 + Math.random() * 16;


    const stringRotate =
      -4 + Math.random() * 8;

      const endRotate =
      -3 + Math.random() * 6;

    const color =
      colors[
        Math.floor(
          Math.random() * colors.length
        )
      ];


    balloon.style.setProperty(
      "--x",
      `${x}%`
    );

    balloon.style.setProperty(
      "--size",
      `${size}px`
    );

    balloon.style.setProperty(
      "--delay",
      `${delay}s`
    );

    balloon.style.setProperty(
      "--duration",
      `${duration}s`
    );

    balloon.style.setProperty(
      "--drift",
      `${drift}px`
    );

    balloon.style.setProperty(
      "--rotate",
      `${rotate}deg`
    );

    balloon.style.setProperty(
      "--string-rotate",
      `${stringRotate}deg`
    );

    balloon.style.setProperty(
      "--balloon-color",
      color
    );

    balloon.style.setProperty(
       "--end-rotate",
      `${endRotate}deg`
    );


    balloonTransition.appendChild(balloon);

  }

}


/* =====================================================
   DAVETİYEYİ AÇ
   ===================================================== */

function openInvitation() {

  if (
    !gate ||
    gate.classList.contains("opening")
  ) return;


  /* 1 — Zarf açılmaya başlasın */

  gate.classList.add("opening");


  /* Balonları hazırla */

  createTransitionBalloons();


  /*
     2 — 0.7 saniye sonra
     balonlar yükselmeye başlasın
  */

  setTimeout(() => {

    if (balloonTransition) {

      balloonTransition.classList.add(
        "is-active"
      );

    }

  }, 700);


  /*
     3 — Zarf tamamen açılsın
  */

  setTimeout(() => {

    gate.classList.add("is-open");

  }, 1000);


  /*
     4 — Balonlar ekranı kaplamışken
     arkadaki HERO aktif olsun.
  */

  setTimeout(() => {

    document.body.classList.remove(
      "is-sealed"
    );

  }, 1250);


  /*
     5 — Balonlar tamamen yukarı
     çıktıktan sonra katmanı temizle.
  */

  setTimeout(() => {

    if (balloonTransition) {

      balloonTransition.classList.remove(
        "is-active"
      );

      balloonTransition.innerHTML = "";

    }

  }, 6200);

}


/* =====================================================
   MÜHÜR TIKLAMA
   ===================================================== */

if (seal) {

  seal.addEventListener(
    "click",
    openInvitation
  );

}

  /* =====================================================
     2. GERİ SAYIM
     31 EKİM 2026 — 16:00
     ===================================================== */

  const weddingDate =
    new Date("2026-10-31T16:00:00+03:00").getTime();

  const daysEl =
    document.querySelector('[data-unit="days"]');

  const hoursEl =
    document.querySelector('[data-unit="hours"]');

  const minutesEl =
    document.querySelector('[data-unit="minutes"]');

  const secondsEl =
    document.querySelector('[data-unit="seconds"]');

  function updateCountdown() {

    const now = Date.now();
    const distance = weddingDate - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      return;
    }

    const days =
      Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours =
      Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
      );

    const minutes =
      Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
      );

    const seconds =
      Math.floor(
        (distance % (1000 * 60)) /
        1000
      );

    if (daysEl)
      daysEl.textContent =
        String(days).padStart(2, "0");

    if (hoursEl)
      hoursEl.textContent =
        String(hours).padStart(2, "0");

    if (minutesEl)
      minutesEl.textContent =
        String(minutes).padStart(2, "0");

    if (secondsEl)
      secondsEl.textContent =
        String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  /* =====================================================
     3. SCROLL ANİMASYONLARI
     ===================================================== */

  const revealItems =
    document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );
            }

          });

        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -20px 0px"
        }
      );

    revealItems.forEach(item => {
      observer.observe(item);
    });

  } else {

    revealItems.forEach(item => {
      item.classList.add("is-visible");
    });

  }


  /* =====================================================
     4. GÜNÜN AKIŞI ÇİZGİSİ
     ===================================================== */

  const timeline =
    document.getElementById("timeline");

  const timelineFill =
    document.getElementById("timelineFill");

  function updateTimeline() {

    if (!timeline || !timelineFill) return;

    const rect =
      timeline.getBoundingClientRect();

    const viewport =
      window.innerHeight;

    const travelled =
      viewport * 0.7 - rect.top;

    let progress =
      travelled / rect.height;

    progress =
      Math.max(0, Math.min(1, progress));

    timelineFill.style.height =
      `${progress * 100}%`;
  }

  window.addEventListener(
    "scroll",
    updateTimeline,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    updateTimeline
  );

  updateTimeline();


  /* =====================================================
     5. HAFİF PARALLAX
     ===================================================== */

  const parallaxItems =
    document.querySelectorAll("[data-parallax]");

  function updateParallax() {

    parallaxItems.forEach(item => {

      const speed =
        Number(item.dataset.parallax) || 0;

      const rect =
        item.getBoundingClientRect();

      const movement =
        (rect.top - window.innerHeight / 2)
        * speed;

      item.style.transform =
        `translate3d(0, ${movement}px, 0)`;

    });
  }

  window.addEventListener(
    "scroll",
    updateParallax,
    { passive: true }
  );


  /* =====================================================
     6. RSVP
     ===================================================== */

  const form =
    document.getElementById("rsvpForm");

  const ifYes =
    document.getElementById("ifYes");

  const attending =
    document.querySelectorAll(
      'input[name="attending"]'
    );

  /*
     Başlangıçta ek soruları gizle.
  */

  if (ifYes) {
    ifYes.style.display = "none";
  }


  /*
     Katılacağım seçilirse aç.
     Katılamayacağım seçilirse kapat.
  */

  attending.forEach(input => {

    input.addEventListener("change", () => {

      if (!ifYes) return;

      if (input.value === "yes" && input.checked) {

        ifYes.style.display = "block";

        requestAnimationFrame(() => {
          ifYes.style.opacity = "1";
        });

      }

      if (input.value === "no" && input.checked) {

        ifYes.style.display = "none";

      }

    });

  });


  /* =====================================================
   7. KİŞİ SAYISI
   ===================================================== */

const guestCount =
  document.getElementById("guestCount");

const guestStepButtons =
  document.querySelectorAll("[data-step]");

let guests = 1;


guestStepButtons.forEach(button => {

  button.addEventListener("click", () => {

    const change =
      Number(button.dataset.step);

    guests += change;


    /* En az 1, en fazla 10 kişi */

    if (guests < 1) guests = 1;
    if (guests > 10) guests = 10;


    if (guestCount) {
      guestCount.textContent = guests;
    }


    /*
       Toplam kişi sayısı azaltılırsa
       çocuk sayısı toplam kişiyi geçemesin.
    */

    if (children > guests) {

      children = guests;

      if (childCount) {
        childCount.textContent = children;
      }

    }

  });

});


/* =====================================================
   8. ÇOCUK SAYISI
   ===================================================== */

const childCount =
  document.getElementById("childCount");

const childStepButtons =
  document.querySelectorAll("[data-child-step]");

let children = 0;


childStepButtons.forEach(button => {

  button.addEventListener("click", () => {

    const change =
      Number(button.dataset.childStep);

    children += change;


    /* 0'ın altına inemez */

    if (children < 0) {
      children = 0;
    }


    /*
       Çocuk sayısı toplam katılımcı
       sayısından fazla olamaz.
    */

    if (children > guests) {
      children = guests;
    }


    if (childCount) {
      childCount.textContent = children;
    }

  });

});

  /* =====================================================
     8. RSVP GÖNDERME
     ===================================================== */

  const error =
    document.getElementById("formError");

  const thanks =
    document.getElementById("thanks");

  const thanksNote =
    document.getElementById("thanksNote");


  if (form) {

    form.addEventListener("submit", event => {

      event.preventDefault();

      if (error) {
        error.hidden = true;
        error.textContent = "";
      }


      const attendance =
        document.querySelector(
          'input[name="attending"]:checked'
        );


      /* Katılım cevabı verilmediyse */

      if (!attendance) {

        if (error) {

          error.textContent =
            "Lütfen katılım durumunuzu belirtiniz.";

          error.hidden = false;

        }

        return;
      }


      /*
         Katılıyorsa isim kontrolü
      */

      if (attendance.value === "yes") {

        const principal =
          document.getElementById("principal");

        if (
          !principal ||
          !principal.value.trim()
        ) {

          if (error) {

            error.textContent =
              "Lütfen adınızı ve soyadınızı yazınız.";

            error.hidden = false;

          }

          if (principal) {
            principal.focus();
          }

          return;
        }

      }

const principal =
  document.getElementById("principal");

const dietary =
  document.getElementById("dietary");

const message =
  document.getElementById("message");


const RSVP_URL =
  "https://script.google.com/macros/s/AKfycbzJjrNe_L5QLNmUtwQW37ALAgyTuzQGuuM0W" +
  "_hryjpKKA0daZeNHWfmm3xR7vaWvrh_/exec";


const rsvpData = {

  attending:
    attendance.value,

  guests:
    attendance.value === "yes"
      ? guests
      : "",

  name:
    attendance.value === "yes" && principal
      ? principal.value.trim()
      : "",

  childCount:
    attendance.value === "yes"
      ? children
      : "",

  dietary:
    attendance.value === "yes" && dietary
      ? dietary.value.trim()
      : "",

  message:
    message
      ? message.value.trim()
      : ""

};


fetch(RSVP_URL, {

  method: "POST",

  body: JSON.stringify(rsvpData)

}).catch(error => {

  console.error(
    "RSVP kayıt hatası:",
    error
  );

});
      
      form.hidden = true;

      if (thanks) {
        thanks.hidden = false;
      }


      if (thanksNote) {

        if (attendance.value === "yes") {

          thanksNote.textContent =
            "Yanıtınız alındı. Sizi aramızda görmek için sabırsızlanıyoruz.";

        } else {

          thanksNote.textContent =
            "Yanıtınız alındı. Güzel dilekleriniz için teşekkür ederiz.";

        }

      }

    });

  }

});
/* ==========================================================
   DÜŞEN GÜL YAPRAKLARI
   ========================================================== */

function createRosePetals() {

  // Yaprakların bulunacağı katman
  const petalContainer = document.createElement("div");
  petalContainer.className = "rose-petals";

  document.body.appendChild(petalContainer);


  // Masaüstünde yaklaşık 20 yaprak
  const petalCount = 25;


  for (let i = 0; i < petalCount; i++) {

    const petal = document.createElement("span");

    petal.className = "rose-petal";


    /* -------------------------
       Ekrandaki yatay konumu
    ------------------------- */

    const left = Math.random() * 100;

    petal.style.left = `${left}%`;


    /* -------------------------
       Yaprak büyüklüğü
    ------------------------- */

    const size = 7 + Math.random() * 8;

    petal.style.setProperty(
      "--size",
      `${size}px`
    );


    /* -------------------------
       Düşme hızı
    ------------------------- */

    const duration =
      20 + Math.random() * 16;

    petal.style.setProperty(
      "--duration",
      `${duration}s`
    );


    /* -------------------------
       Sağ-sol salınım hızı
    ------------------------- */

    const swayDuration =
      5 + Math.random() * 5;

    petal.style.setProperty(
      "--sway-duration",
      `${swayDuration}s`
    );


    /* -------------------------
       Farklı zamanlarda başlasın
    ------------------------- */

    const delay =
      -(Math.random() * duration);

    petal.style.setProperty(
      "--delay",
      `${delay}s`
    );


    /* -------------------------
       Bazıları daha transparan
    ------------------------- */

    const opacity =
      0.28 + Math.random() * 0.32;

    petal.style.setProperty(
      "--opacity",
      opacity
    );


    petalContainer.appendChild(petal);

  }

}


/*
  Sayfa hazır olduğunda efekti başlat
*/

if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    createRosePetals
  );

} else {

  createRosePetals();

}