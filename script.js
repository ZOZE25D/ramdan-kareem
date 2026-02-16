// ===== Smart Sound =====
const sound = document.getElementById("ramadanSound");
let soundPlayed = false;
const loopDuration = 60;

document.addEventListener("click", () => {
  if(!soundPlayed){
    sound.currentTime=0;
    sound.play().catch(()=>{});
    soundPlayed = true;
  }
});
sound.addEventListener("timeupdate", () => {
  if(sound.currentTime>=loopDuration){
    sound.currentTime=0;
    sound.play().catch(()=>{});
  }
});

// ===== Stars =====
const starCanvas=document.getElementById("stars");
const sctx=starCanvas.getContext("2d");
function resizeCanvas(){starCanvas.width=window.innerWidth; starCanvas.height=window.innerHeight;}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const stars=Array.from({length:150},()=>({x:Math.random()*window.innerWidth, y:Math.random()*window.innerHeight, r:Math.random()*1.5}));
function drawStars(){
  sctx.clearRect(0,0,starCanvas.width,starCanvas.height);
  sctx.fillStyle="white";
  stars.forEach(st=>{sctx.beginPath(); sctx.arc(st.x,st.y,st.r,0,Math.PI*2); sctx.fill(); st.y+=0.2; if(st.y>starCanvas.height) st.y=0;});
  requestAnimationFrame(drawStars);
}
drawStars();

// ===== Confetti =====
function startConfetti(){
  const canvas=document.getElementById("confetti"); const ctx=canvas.getContext("2d");
  canvas.width=window.innerWidth; canvas.height=window.innerHeight;
  const pieces=Array.from({length:100},()=>({x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*5+2}));
  function draw(){ ctx.clearRect(0,0,canvas.width,canvas.height); pieces.forEach(p=>{ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle="#facc15"; ctx.fill(); p.y+=1.2; if(p.y>canvas.height)p.y=0;}); requestAnimationFrame(draw);}
  draw();
}
startConfetti();

// ===== Moving Characters (Lanterns + Fanis) =====
const charCanvas=document.getElementById("characters"); const cctx=charCanvas.getContext("2d");
charCanvas.width=window.innerWidth; charCanvas.height=window.innerHeight;

const lanterns=Array.from({length:8},()=>({x:Math.random()*charCanvas.width, y:Math.random()*charCanvas.height, size:30+Math.random()*30, speed:0.5+Math.random()*1.5}));
function drawLanterns(){ cctx.clearRect(0,0,charCanvas.width,charCanvas.height);
  lanterns.forEach(l=>{ cctx.font=l.size+"px serif"; cctx.fillText("🏮",l.x,l.y); l.y-=l.speed; if(l.y<-50) l.y=charCanvas.height+50;});
  requestAnimationFrame(drawLanterns);
}
drawLanterns();

window.addEventListener("resize",()=>{ charCanvas.width=window.innerWidth; charCanvas.height=window.innerHeight;});

// ===== Parallax Mouse =====
const moon=document.querySelector(".crescent");
document.addEventListener("mousemove",e=>{ const x=(e.clientX/window.innerWidth-0.5)*30; const y=(e.clientY/window.innerHeight-0.5)*30; moon.style.transform=`translate(${x}px,${y}px) rotateY(${x}deg)`;});

// ===== Gyroscope =====
window.addEventListener("deviceorientation", e=>{ const x=e.gamma/3; const y=e.beta/8; moon.style.transform=`translate(${x}px,${y}px) rotateY(${x}deg)`;});
