// ==========================================
// IMAGE SLIDER
// ==========================================

const slides = [
  "bg1.jpg",
  "bg2.jpg",
  "bg3.jpg"
];

let current = 0;

const heroImage = document.getElementById("heroImage");
const slideNumber = document.getElementById("slideNumber");
const lineEls = document.querySelectorAll(".slider-lines i");

function showSlide(n) {
  if (!heroImage) return;

  current = (n + slides.length) % slides.length;

  heroImage.style.opacity = "0";

  setTimeout(() => {
    heroImage.style.backgroundImage =
      `url("${slides[current]}")`;

    heroImage.style.opacity = "1";
  }, 180);

  if (slideNumber) {
    slideNumber.textContent =
      `${String(current + 1).padStart(2, "0")} / 03`;
  }

  lineEls.forEach((el, i) => {
    el.classList.toggle("active", i === current);
  });
}

// Show first image
showSlide(0);

// Next / Previous buttons
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    showSlide(current + 1);
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    showSlide(current - 1);
  });
}

// Automatically change image every 6.5 seconds
setInterval(() => {
  showSlide(current + 1);
}, 6500);


// ==========================================
// MUSIC & ENTRANCE
// ==========================================

const audio = document.getElementById("audio");
const musicBtn = document.getElementById("music");
const enterBtn = document.getElementById("enter");

if (audio) {
  audio.src = "nikkah.mp3";
}

if (enterBtn) {
  enterBtn.addEventListener("click", () => {

    const openingOverlay =
      document.getElementById("opening");

    if (openingOverlay) {
      openingOverlay.classList.add("hide");
    }

    document.body.classList.remove("locked");

    // Start wedding music
    if (audio) {
      audio.play()
        .then(() => {
          if (musicBtn) {
            musicBtn.classList.add("playing");
          }
        })
        .catch(() => {
          console.log("Music playback was blocked.");
        });
    }
  });
}


// Music button
if (musicBtn) {

  musicBtn.addEventListener("click", async () => {

    if (!audio) return;

    if (audio.paused) {

      try {

        await audio.play();

        musicBtn.classList.add("playing");

      } catch (error) {

        alert(
          "Please make sure nikkah.mp3 is uploaded to the website."
        );

      }

    } else {

      audio.pause();

      musicBtn.classList.remove("playing");

    }

  });

}


// ==========================================
// COUNTDOWN TIMER
// ==========================================

const weddingTime =
  new Date("2026-11-15T11:30:00+05:30").getTime();

function updateCountdown() {

  const diff =
    Math.max(0, weddingTime - Date.now());

  const daysEl =
    document.getElementById("cd-days");

  const hoursEl =
    document.getElementById("cd-hours");

  const minsEl =
    document.getElementById("cd-minutes");

  const secsEl =
    document.getElementById("cd-seconds");


  if (daysEl) {

    daysEl.textContent =
      String(
        Math.floor(diff / 86400000)
      ).padStart(2, "0");

  }


  if (hoursEl) {

    hoursEl.textContent =
      String(
        Math.floor(
          (diff % 86400000) / 3600000
        )
      ).padStart(2, "0");

  }


  if (minsEl) {

    minsEl.textContent =
      String(
        Math.floor(
          (diff % 3600000) / 60000
        )
      ).padStart(2, "0");

  }


  if (secsEl) {

    secsEl.textContent =
      String(
        Math.floor(
          (diff % 60000) / 1000
        )
      ).padStart(2, "0");

  }

}

updateCountdown();

setInterval(updateCountdown, 1000);


// ==========================================
// GOOGLE CALENDAR
// ==========================================

const calendarBtn =
  document.getElementById("calendar");

if (calendarBtn) {

  calendarBtn.addEventListener("click", () => {

    const start = "20261115T060000Z";
    const end = "20261115T063000Z";

    const url =
      "https://calendar.google.com/calendar/render" +
      "?action=TEMPLATE" +
      "&text=" +
      encodeURIComponent(
        "Wedding — Shahnaz & Adhil"
      ) +
      "&dates=" +
      start +
      "/" +
      end +
      "&location=" +
      encodeURIComponent(
        "Fr. Lopez Auditorium, Colachel"
      ) +
      "&details=" +
      encodeURIComponent(
        "Wedding ceremony of Shahnaz & Adhil."
      );

    window.open(url, "_blank");

  });

}


// ==========================================
// GUESTBOOK / WISHES
// ==========================================

const form =
  document.getElementById("wishForm");

const list =
  document.getElementById("wishList");

const count =
  document.getElementById("wishCount");


let wishes =
  JSON.parse(
    localStorage.getItem(
      "shahnaz-adhil-wishes"
    ) || "[]"
  );


// Prevent HTML injection
function escapeHtml(str) {

  return str.replace(
    /[&<>"']/g,
    c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[c])
  );

}


// Display wishes
function renderWishes() {

  if (count) {

    count.textContent =
      `${wishes.length} BLESSINGS RECEIVED`;

  }


  if (list) {

    list.innerHTML =
      wishes
        .map(w => `
          <article class="wish-card">

            <h4>
              ${escapeHtml(w.name)}
            </h4>

            <p>
              “${escapeHtml(w.message)}”
            </p>

          </article>
        `)
        .join("");

  }

}


// Submit wish
if (form) {

  form.addEventListener(
    "submit",
    e => {

      e.preventDefault();

      const nameInput =
        document.getElementById("wishName");

      const messageInput =
        document.getElementById("wishText");


      if (!nameInput || !messageInput) {
        return;
      }


      const name =
        nameInput.value.trim();

      const message =
        messageInput.value.trim();


      if (!name || !message) {
        return;
      }


      wishes.unshift({
        name: name,
        message: message
      });


      localStorage.setItem(
        "shahnaz-adhil-wishes",
        JSON.stringify(wishes)
      );


      form.reset();

      renderWishes();

    }
  );

}


// Initial display
renderWishes();
