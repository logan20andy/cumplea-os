// =========================================================================
// 1. CARTAS TIERNAS E INGENIOSAS PARA REBECA BELITO (ESCORPIO ♏)
// Puedes reemplazar los "img" con rutas locales como "img/foto1.jpg"
// =========================================================================
const RECUERDOS_REBECA = [
  {
    titulo: "MI ESTRELLA ANTARES EN EL UNIVERSO ♏",
    mensaje: "Dicen que Antares es el corazón brillante de la constelación de Escorpio, pero para mí el corazón más hermoso y luminoso del universo eres tú, mi querida Rebeca. ¡Feliz cumpleaños!",
    img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80"
  },
  {
    titulo: "TU MAGIA ÚNICA DE ESCORPIO ✨",
    mensaje: "Amo esa mezcla perfecta que tienes: tan intensa, leal, inteligente y a la vez tan tierna y dulce conmigo. No hay nadie en este mundo como tú, Rebeca Belito.",
    img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80"
  },
  {
    titulo: "¡QUE SE CUMPLAN TODOS TUS SUEÑOS! 🎂",
    mensaje: "Hoy brindo por tu sonrisa, por tus metas y por cada aventura que nos espera juntos. Que la vida te devuelva multiplicado todo el amor bonito que das.",
    img: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=800&q=80"
  },
  {
    titulo: "MI PERSONA FAVORITA EN EL MUNDO 💖",
    mensaje: "Si volviera a nacer y tuviera que elegir entre millones de estrellas, te volvería a elegir a ti mil veces más. Gracias por hacerme tan feliz cada día.",
    img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80"
  },
  {
    titulo: "POR MUCHOS CUMPLEAÑOS MÁS A TU LADO 🥂",
    mensaje: "Disfruta tu día como la reina que eres. Aquí estoy y estaré siempre para cuidarte, engreírte y celebrar cada uno de tus triunfos. ¡Te amo muchísimo!",
    img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80"
  }
];

const FRASES_ORBITA = [
  "FELIZ CUMPLEAÑOS REBECA ♏",
  "MI REINA ESCORPIO 💖",
  "BRILLAS MÁS QUE ANTARES ✨",
  "TE AMO INFINITAMENTE",
  "HOY CELEBRAMOS TU VIDA 🎂",
  "MI UNIVERSO ENTERO",
  "ERES ÚNICA Y MARAVILLOSA",
  "FELIZ VUELTA AL SOL 🌟"
];

// =========================================================================
// 2. SISTEMA DE MÚSICA (ARREGLADO PARA SONAR AL PULSAR EL BOTÓN)
// =========================================================================
let audioCtx = null;
let isPlayingMusic = false;
let musicInterval = null;
let usingMp3 = false;

const bgAudio = document.getElementById("bg-audio");
const btnMusic = document.getElementById("btn-music");

function startMusic() {
  if (isPlayingMusic) return;

  bgAudio.volume = 0.65;
  const playPromise = bgAudio.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        usingMp3 = true;
        isPlayingMusic = true;
        btnMusic.textContent = "🎵";
      })
      .catch(() => {
        usingMp3 = false;
        startSynthMusic();
      });
  } else {
    startSynthMusic();
  }
}

function stopMusic() {
  isPlayingMusic = false;
  btnMusic.textContent = "🔇";
  if (usingMp3) {
    bgAudio.pause();
  } else {
    clearTimeout(musicInterval);
  }
}

function toggleMusic() {
  if (isPlayingMusic) stopMusic();
  else startMusic();
}

function startSynthMusic() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  isPlayingMusic = true;
  btnMusic.textContent = "🎵";
  playBirthdayLoop();
}

function playNote(freq, duration, time) {
  if (!audioCtx || !isPlayingMusic) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, time);

  gain.gain.setValueAtTime(0.001, time);
  gain.gain.exponentialRampToValueAtTime(0.16, time + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(time);
  osc.stop(time + duration);
}

function playBirthdayLoop() {
  if (!isPlayingMusic || usingMp3) return;
  const notes = [
    [261.63, 0.35], [261.63, 0.35], [293.66, 0.7], [261.63, 0.7], [349.23, 0.7], [329.63, 1.3],
    [261.63, 0.35], [261.63, 0.35], [293.66, 0.7], [261.63, 0.7], [392.00, 0.7], [349.23, 1.3],
    [261.63, 0.35], [261.63, 0.35], [523.25, 0.7], [440.00, 0.7], [349.23, 0.7], [329.63, 0.7], [293.66, 1.2],
    [466.16, 0.35], [466.16, 0.35], [440.00, 0.7], [349.23, 0.7], [392.00, 0.7], [349.23, 1.4]
  ];

  let now = audioCtx.currentTime + 0.05;
  let totalTime = 0;
  notes.forEach(([freq, dur]) => {
    playNote(freq, dur * 0.95, now + totalTime);
    totalTime += dur;
  });

  musicInterval = setTimeout(() => {
    if (isPlayingMusic && !usingMp3) playBirthdayLoop();
  }, (totalTime + 0.7) * 1000);
}

// =========================================================================
// 3. EFECTOS DE CONFETI DORADO/ESCORPIO Y ESTRELLAS FUGACES EN EL INICIO
// =========================================================================
const bgCanvas = document.getElementById("bg-fx-canvas");
const bgCtx = bgCanvas.getContext("2d");
let confettiPieces = [];
let shootingStars = [];

function resizeBgCanvas() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}
resizeBgCanvas();
window.addEventListener("resize", resizeBgCanvas);

// Crear explosión de confeti de cumpleaños
function launchBirthdayConfetti(amount = 110) {
  const palette = ["#ff2a85", "#00f3ff", "#ffd700", "#b829ff", "#ffffff"];
  for (let i = 0; i < amount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 9 + 3;
    confettiPieces.push({
      x: bgCanvas.width / 2,
      y: bgCanvas.height / 2,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      size: Math.random() * 7 + 4,
      color: palette[Math.floor(Math.random() * palette.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      alpha: 1
    });
  }
}

// Estrellas fugaces suaves en la pantalla de inicio
setInterval(() => {
  if (document.getElementById("screen-intro").classList.contains("active")) {
    shootingStars.push({
      x: Math.random() * bgCanvas.width,
      y: Math.random() * bgCanvas.height * 0.4,
      vx: -(Math.random() * 8 + 6),
      vy: Math.random() * 4 + 2,
      len: Math.random() * 70 + 40,
      alpha: 1
    });
  }
}, 1600);

function animateGlobalFX() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

  // Estrellas fugaces
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i];
    s.x += s.vx;
    s.y += s.vy;
    s.alpha -= 0.025;
    if (s.alpha <= 0) {
      shootingStars.splice(i, 1);
      continue;
    }
    bgCtx.save();
    bgCtx.strokeStyle = `rgba(180, 248, 255, ${s.alpha})`;
    bgCtx.lineWidth = 2;
    bgCtx.beginPath();
    bgCtx.moveTo(s.x, s.y);
    bgCtx.lineTo(s.x - s.vx * 4, s.y - s.vy * 4);
    bgCtx.stroke();
    bgCtx.restore();
  }

  // Confeti de cumpleaños
  for (let i = confettiPieces.length - 1; i >= 0; i--) {
    const c = confettiPieces[i];
    c.x += c.vx;
    c.y += c.vy;
    c.vy += 0.16; // gravedad suave
    c.vx *= 0.98;
    c.rotation += c.rotSpeed;
    c.alpha -= 0.009;

    if (c.alpha <= 0 || c.y > bgCanvas.height + 20) {
      confettiPieces.splice(i, 1);
      continue;
    }
    bgCtx.save();
    bgCtx.translate(c.x, c.y);
    bgCtx.rotate((c.rotation * Math.PI) / 180);
    bgCtx.globalAlpha = c.alpha;
    bgCtx.fillStyle = c.color;
    bgCtx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
    bgCtx.restore();
  }

  requestAnimationFrame(animateGlobalFX);
}
animateGlobalFX();

// =========================================================================
// 4. NAVEGACIÓN ENTRE PANTALLAS CON TRANSICIÓN ÉPICA
// =========================================================================
const screenIntro = document.getElementById("screen-intro");
const screenCake = document.getElementById("screen-cake");
const screenGalaxy = document.getElementById("screen-galaxy");
const portalFlash = document.getElementById("portal-flash");

btnMusic.addEventListener("click", toggleMusic);

document.getElementById("btn-empezar").addEventListener("click", () => {
  // 1. Arrancar música al instante
  startMusic();

  // 2. Destello de portal + explosión de confeti de cumpleaños
  portalFlash.classList.add("active");
  launchBirthdayConfetti(140);

  setTimeout(() => {
    portalFlash.classList.remove("active");
    screenIntro.classList.remove("active");
    screenCake.classList.add("active");
    startFireworks();
  }, 380);
});

document.getElementById("btn-iniciar-galaxia").addEventListener("click", () => {
  if (!isPlayingMusic) startMusic();
  portalFlash.classList.add("active");
  launchBirthdayConfetti(90);

  setTimeout(() => {
    portalFlash.classList.remove("active");
    screenCake.classList.remove("active");
    screenGalaxy.classList.add("active");
    document.getElementById("btn-reset-cam").classList.remove("hidden");
    initGalaxy3D();
  }, 380);
});

// Fuegos artificiales en Pantalla 2
function startFireworks() {
  const canvas = document.getElementById("fireworks-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ["#00f3ff", "#ff2a85", "#ffe600", "#b829ff", "#ff66b2"];

  function createBurst() {
    const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
    const y = Math.random() * canvas.height * 0.45 + 50;
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 * i) / 50;
      const speed = Math.random() * 3.8 + 1;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color
      });
    }
  }

  setInterval(() => {
    if (screenCake.classList.contains("active")) createBurst();
  }, 850);

  function animateFW() {
    if (!screenCake.classList.contains("active")) return;
    ctx.fillStyle = "rgba(5, 1, 14, 0.22)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03;
      p.alpha -= 0.015;
      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(animateFW);
  }
  createBurst();
  animateFW();
}

// =========================================================================
// 5. GALAXIA 3D EN THREE.JS CON CONSTELACIÓN DE ESCORPIO Y CARTAS
// =========================================================================
function initGalaxy3D() {
  const container = document.getElementById("three-container");
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 14, 24);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 8;
  controls.maxDistance = 42;

  document.getElementById("btn-reset-cam").addEventListener("click", () => {
    camera.position.set(0, 14, 24);
    controls.target.set(0, 0, 0);
  });

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xff2a85, 2.8, 55);
  pointLight.position.set(0, 8, 0);
  scene.add(pointLight);

  // --- A. ESPIRAL DE PARTÍCULAS (TONOS ESCORPIO: CARMESÍ, VIOLETA Y CIAN) ---
  const galaxyGroup = new THREE.Group();
  scene.add(galaxyGroup);

  const count = 10000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const colorInside = new THREE.Color("#ff1e7a");
  const colorMiddle = new THREE.Color("#9d00ff");
  const colorOutside = new THREE.Color("#00f3ff");

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * 18.5 + 0.8;
    const spinAngle = radius * 0.65;
    const branchAngle = ((i % 4) / 4) * Math.PI * 2;

    const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 1.1;
    const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.6;
    const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 1.1;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    const mixedColor = colorInside.clone();
    if (radius < 7) {
      mixedColor.lerp(colorMiddle, radius / 7);
    } else {
      mixedColor.copy(colorMiddle).lerp(colorOutside, (radius - 7) / 11.5);
    }

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  const galaxyGeo = new THREE.BufferGeometry();
  galaxyGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  galaxyGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const galaxyMat = new THREE.PointsMaterial({
    size: 0.15,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
  });

  galaxyGroup.add(new THREE.Points(galaxyGeo, galaxyMat));

  // Estrellas de fondo
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(1800 * 3);
  for (let i = 0; i < 1800 * 3; i++) {
    starPos[i] = (Math.random() - 0.5) * 150;
  }
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.25 })));

  // --- B. PASTEL 3D CENTRAL ---
  const cake3D = new THREE.Group();
  const tierColors = [0xff1e7a, 0x9d00ff, 0x00f3ff];
  const tierRadii = [2.4, 1.8, 1.2];
  const tierHeights = [1.1, 0.95, 0.8];
  let currentY = 0.6;

  tierRadii.forEach((r, idx) => {
    const h = tierHeights[idx];
    const cylGeo = new THREE.CylinderGeometry(r, r, h, 32);
    const cylMat = new THREE.MeshStandardMaterial({
      color: 0x18042b,
      emissive: tierColors[idx],
      emissiveIntensity: 0.38,
      roughness: 0.3
    });
    const mesh = new THREE.Mesh(cylGeo, cylMat);
    mesh.position.y = currentY + h / 2;

    const torusGeo = new THREE.TorusGeometry(r + 0.03, 0.05, 12, 48);
    const torusMat = new THREE.MeshBasicMaterial({ color: idx % 2 === 0 ? 0xff2a85 : 0x00f3ff });
    const ring = new THREE.Mesh(torusGeo, torusMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = currentY + h;

    cake3D.add(mesh, ring);
    currentY += h;
  });

  for (let c = -1; c <= 1; c++) {
    const candle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.7, 12),
      new THREE.MeshBasicMaterial({ color: 0x00f3ff })
    );
    candle.position.set(c * 0.45, currentY + 0.35, 0);

    const flame = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xffe600 })
    );
    flame.position.set(c * 0.45, currentY + 0.8, 0);
    cake3D.add(candle, flame);
  }
  scene.add(cake3D);

  // --- C. FRASES LUMINOSAS EN ÓRBITA ---
  function createTextTexture(text) {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 96;
    const ctx = canvas.getContext("2d");
    ctx.font = "bold 27px Montserrat, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "#ff2a85";
    ctx.shadowBlur = 14;
    ctx.fillStyle = "#c8fbff";
    ctx.fillText(text, 256, 48);
    return new THREE.CanvasTexture(canvas);
  }

  FRASES_ORBITA.forEach((frase, i) => {
    const angle = (i / FRASES_ORBITA.length) * Math.PI * 2;
    const dist = i % 2 === 0 ? 7.8 : 11.2;
    const spriteMat = new THREE.SpriteMaterial({
      map: createTextTexture(frase),
      transparent: true
    });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.position.set(Math.cos(angle) * dist, 0.45, Math.sin(angle) * dist);
    sprite.scale.set(5.3, 1, 1);
    galaxyGroup.add(sprite);
  });

  // --- D. ESFERAS CON FOTOS CLICABLES ---
  const clickableSpheres = [];
  const textureLoader = new THREE.TextureLoader();

  RECUERDOS_REBECA.forEach((recuerdo, idx) => {
    const angle = (idx / RECUERDOS_REBECA.length) * Math.PI * 2 + 0.3;
    const radius = 13.8;

    const holder = new THREE.Group();
    holder.position.set(Math.cos(angle) * radius, 1.3, Math.sin(angle) * radius);

    const haloGeo = new THREE.RingGeometry(1.18, 1.36, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: idx % 2 === 0 ? 0xffd700 : 0xff2a85,
      side: THREE.DoubleSide
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);

    const tex = textureLoader.load(recuerdo.img);
    const photoGeo = new THREE.CircleGeometry(1.18, 32);
    const photoMat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide });
    const photoMesh = new THREE.Mesh(photoGeo, photoMat);
    photoMesh.userData = { recuerdo };

    holder.add(halo, photoMesh);
    galaxyGroup.add(holder);
    clickableSpheres.push({ holder, photoMesh });
  });

  // --- E. INTERACCIÓN (CLIC EN FOTOS + CONFETI AL ABRIR CARTA) ---
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const modal = document.getElementById("memory-modal");

  function onPointerClick(event) {
    if (!modal.classList.contains("hidden")) return;
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const targets = clickableSpheres.map(item => item.photoMesh);
    const intersects = raycaster.intersectObjects(targets);

    if (intersects.length > 0) {
      const data = intersects[0].object.userData.recuerdo;
      document.getElementById("modal-img").src = data.img;
      document.getElementById("modal-title").textContent = data.titulo;
      document.getElementById("modal-text").textContent = data.mensaje;
      modal.classList.remove("hidden");
      launchBirthdayConfetti(60); // Lanza chispitas al abrir cada carta
    }
  }

  renderer.domElement.addEventListener("click", onPointerClick);
  document.getElementById("btn-close-modal").addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // --- F. BUCLE DE ANIMACIÓN ---
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    galaxyGroup.rotation.y = elapsed * 0.15;
    cake3D.rotation.y = -elapsed * 0.32;

    clickableSpheres.forEach((item, i) => {
      item.holder.lookAt(camera.position);
      item.holder.position.y = 1.3 + Math.sin(elapsed * 2 + i) * 0.25;
    });

    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}