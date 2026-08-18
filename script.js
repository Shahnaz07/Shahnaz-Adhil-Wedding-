document.addEventListener("DOMContentLoaded", () => {
  const enterBtn = document.getElementById("enter");
  const openingOverlay = document.getElementById("opening");
  const audio = document.getElementById("audio");

  if (enterBtn && openingOverlay) {
    enterBtn.addEventListener("click", () => {
      document.body.classList.remove("locked");
      openingOverlay.style.display = "none";

      if (audio) {
        audio.play().catch((err) => {
          console.log("Audio playback failed or was blocked:", err);
        });
      }
    });
  }

  // Slider controls
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      // Add slide previous logic here if needed
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      // Add slide next logic here if needed
    });
  }
});
