document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     1. DAVETİYE AÇILIŞI
     ===================================================== */

  const gate = document.getElementById("gate");
  const seal = document.getElementById("seal");
  const stage = document.getElementById("stage");

  function openInvitation() {
    if (!gate || gate.classList.contains("opening")) return;

    gate.classList.add("opening");

    if (stage) {
      stage.classList.add("is-active");
    }

    setTimeout(() => {
      gate.classList.add("is-open");
      document.body.classList.remove("is-sealed");

      if (stage) {
        stage.classList.add("is-revealed");
      }
    }, 1050);

    setTimeout(() => {
      if (stage) {
        stage.style.display = "none";
      }
    }, 2500);
  }

  if (seal) {
    seal.addEventListener("click", openInvitation);
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

  const stepButtons =
    document.querySelectorAll(".stepper__btn");

  let guests = 1;

  stepButtons.forEach(button => {

    button.addEventListener("click", () => {

      const change =
        Number(button.dataset.step);

      guests += change;

      if (guests < 1) guests = 1;
      if (guests > 10) guests = 10;

      if (guestCount) {
        guestCount.textContent = guests;
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


      /*
         ŞİMDİLİK:
         Bu sadece ekranda teşekkür mesajı gösterir.

         Gerçek cevapları daha sonra
         Google Sheets'e bağlayacağız.
      */

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