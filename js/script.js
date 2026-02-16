// script.js

const startBtn = document.getElementById("startBtn");
const sound = document.getElementById("ramadanSound");
const loopDuration = 60;

startBtn.addEventListener("click", function () {
  // تشغيل الصوت بطريقة مضمونة
  const playPromise = sound.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log("Sound started successfully!");
      })
      .catch((error) => {
        console.log("Playback blocked, trying workaround...", error);
        // Workaround: reset currentTime قبل play
        sound.currentTime = 0;
        sound.play().catch((err) => console.log("Still blocked:", err));
      });
  }

  // إخفاء الزر
  startBtn.style.display = "none";

  // loop أول دقيقة
  sound.addEventListener("timeupdate", () => {
    if (sound.currentTime >= loopDuration) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  });
});

// ===== Stars =====
const starCanvas = document.getElementById("stars");
const sctx = starCanvas.getContext("2d");
function resizeCanvas() {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const stars = Array.from({ length: 150 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  r: Math.random() * 1.5,
}));
function drawStars() {
  sctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  stars.forEach((st) => {
    sctx.beginPath();
    sctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
    sctx.fill();
    st.y += 0.2;
    if (st.y > starCanvas.height) st.y = 0;
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// ===== Confetti =====
function startConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const pieces = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 5 + 2,
  }));
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "#facc15";
      ctx.fill();
      p.y += 1.2;
      if (p.y > canvas.height) p.y = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
}
startConfetti();

// ===== Moving Characters =====
const charCanvas = document.getElementById("characters");
const cctx = charCanvas.getContext("2d");
charCanvas.width = window.innerWidth;
charCanvas.hei;
