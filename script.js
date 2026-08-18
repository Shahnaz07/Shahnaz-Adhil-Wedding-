const slides = [
  "assets/couple-1.png",
  "assets/couple-2.png",
  "assets/couple-3.png"
];

let current = 0;
const heroImage = document.getElementById("heroImage");
const slideNumber = document.getElementById("slideNumber");
const lineEls = document.querySelectorAll(".slider-lines i");

function showSlide(n) {
  current = (n + slides.length) % slides.length;

  heroImage.style.opacity = "0";

  setTimeout(() => {
    heroImage.style.backgroundImage = `url("${slides[current]}")`;
    heroImage.style.opacity = "1";
  }, 180);

  slideNumber.textContent =
    `${String(current + 1).padStart(2, "0")} / 03`;

  lineEls.forEach((el, i) => {
    el.classList.toggle("active", i === current);
  });
}

showSlide(0);

document.getElementById("next").addEventListener("click", () => {
  showSlide(current + 1);
});

document.getElementById("prev").addEventListener("click", () => {
  showSlide(current - 1);
});

setInterval(() => showSlide(current + 1), 6500);

document.getElementById("enter").addEventListener("click", () => {
  document.getElementById("opening").classList.add("hide");
  document.body.classList.remove("locked");
});

const weddingTime =
  new Date("2026-11-15T11:30:00+05:30").getTime();

function countdown() {
  const diff = Math.max(0, weddingTime - Date.now());

  const vals = [
    Math.floor(diff / 86400000),
    Math.floor((diff % 86400000) / 3600000),
    Math.floor((diff % 3600000) / 60000),
    Math.floor((diff % 60000) / 1000)
  ];

  document.querySelectorAll("#countdown b").forEach((el, i) => {
    el.textContent = String(vals[i]).padStart(2, "0");
  });
}

countdown();
setInterval(countdown, 1000);

document.getElementById("calendar").addEventListener("click", () => {
  const start = "20261115T060000Z";
  const end = "20261115T063000Z";

  const url =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" +
    encodeURIComponent("Wedding — Shahnaz & Adhil") +
    "&dates=" +
    start +
    "/" +
    end +
    "&location=" +
    encodeURIComponent("Fr. Lopez Auditorium, Colachel") +
    "&details=" +
    encodeURIComponent("Wedding ceremony of Shahnaz & Adhil.");

  window.open(url, "_blank");
});

const form = document.getElementById("wishForm");
const list = document.getElementById("wishList");
const count = document.getElementById("wishCount");

let wishes = JSON.parse(
  localStorage.getItem("shahnaz-adhil-wishes") || "[]"
);

function safe(s) {
  return s.replace(
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

function render() {
  count.textContent =
    `${wishes.length} BLESSINGS RECEIVED`;

  list.innerHTML = wishes
    .map(
      w => `
        <article class="wish-card">
          <h4>${safe(w.name)}</h4>
          <p>“${safe(w.message)}”</p>
        </article>
      `
    )
    .join("");
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const name =
    document.getElementById("wishName").value.trim();

  const message =
    document.getElementById("wishText").value.trim();

  if (!name || !message) return;

  wishes.unshift({
    name,
    message
  });

  localStorage.setItem(
    "shahnaz-adhil-wishes",
    JSON.stringify(wishes)
  );

  form.reset();
  render();
});

render();

const audio = document.getElementById("audio");
const music = document.getElementById("music");

audio.src = "assets/music.mp3";

music.addEventListener("click", async () => {
  try {
    if (audio.paused) {
      await audio.play();
      music.classList.add("playing");
    } else {
      audio.pause();
      music.classList.remove("playing");
    }
  } catch (err) {
    alert(
      "Please add your music file as assets/music.mp3"
    );
  }
});