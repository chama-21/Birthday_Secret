/* ============================================================================
   CUSTOMIZATION AREA
   Edit everything in this block to personalize the experience.
   Nothing outside this block needs to change for basic personalization.
   ============================================================================ */

const HER_NAME = "My Love";

const BIRTHDAY_MESSAGE = `Happy Birthday, my love. ❤️

I hope this year brings you countless reasons to smile,
new memories,
new adventures,
and everything you've been wishing for, especially your placements.

Thank you for being part of my life.

NOW, YOU CAN CLOSE THIS, AND PLEASE DON'T ABUSE ME, CAUSE YOU ASKED ME NOT TO OVERDO IT.
BUT HONESTLY, I WANT TO DO SO MUCH MORE FOR YOU.`;

// The photo shown on the "Happy Birthday, My Love" screen (scene 8).
// If the file is missing, it's skipped silently and the couple illustration
// comes back on its own — the scene never breaks.
const BIRTHDAY_PHOTO = {
  src: "assets/photos/Happy_birthday.jpeg",
  caption: "Make a wish 🎂", // set to "" to hide the caption
  // true  -> this photo replaces the couple illustration + CSS cake here
  // false -> show the couple illustration above it as well
  replaceCoupleImage: true,
};
// Each memory supports an optional photo. If the image file doesn't exist,
// a designed placeholder is shown automatically — nothing breaks.
const MEMORIES = [
  {
    title: "The beginning",
    description: "I don't know when and how it all begun, but if I were to make a guess, it would be this day and Dhurandhar 2 will always be my favourite movie.",
    date: "22nd Mar, 2026",
    image: "assets/photos/Beginning.jpeg",
  },
  {
    title: "The stupid conversations",
    description: "I remember this day, we were sitting and I was playing UFC, and later felt guilty about it 😂.",
    date: "",
    image: "assets/photos/Stupid_Conversations.jpeg",
  },
  {
    title: "The endless calls",
    description: "The calls that somehow ran for hours, just on \" AUR BATAO!?\".",
    date: "",
    image: "assets/photos/Endless_Calls.jpeg",
  },
  {
    title: "The moments that made us laugh",
    description: "Well laugh for you guys, embarrassment for me and my child. 😭",
    date: "12th May, 2026",
    image: "assets/photos/Made_us_laugh.jpeg",
  },
  {
    title: "The arguments (and the apologies)",
    description: "The fights that felt huge at the time, and the \"pleaseee\" that always followed.",
    date: "",
    image: "assets/photos/Argue_Apologies.jpeg",
  },
  {
    title: "And everything in between",
    description: "All the small, quiet moments that never got a name of their own, but it was us in between.",
    date: "",
    image: "assets/photos/In_between.jpeg",
  },
];

// Choose ONE type: "message" | "image" | "video" | "audio"
// See README.md for how each type works.
const FINAL_SURPRISE = {
  type: "message",
  content: "This is where one very last little surprise goes — a message, a photo, a video, or a voice note. Your call.",
};

// Set to true once assets/audio/music.mp3 exists and you want the toggle to show.
const ENABLE_MUSIC = false;

/* ============================================================================
   END CUSTOMIZATION AREA
   ============================================================================ */

const SCENES = [
  "intro",
  "gift",
  "couple",
  "us",
  "memories",
  "playful",
  "emotional",
  "birthday",
  "message",
  "surprise",
  "final",
];

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const state = {
  currentSceneIndex: 0,
  memoryIndex: 0,
};

/* ----------------------------------------------------------------------
   Scene management
   ---------------------------------------------------------------------- */

function getSceneEl(name) {
  return document.getElementById(`scene-${name}`);
}

function showScene(name) {
  document.querySelectorAll(".scene").forEach((el) => el.classList.remove("is-active"));
  const el = getSceneEl(name);
  if (!el) return;
  el.classList.add("is-active");
  window.scrollTo({ top: 0, behavior: "auto" });
  revealSceneLines(el);
  runSceneEnterHook(name);
}

function nextScene() {
  if (state.currentSceneIndex < SCENES.length - 1) {
    state.currentSceneIndex += 1;
    showScene(SCENES[state.currentSceneIndex]);
  }
}

function goToScene(name) {
  const idx = SCENES.indexOf(name);
  if (idx !== -1) {
    state.currentSceneIndex = idx;
    showScene(name);
  }
}

/* Reveal each .line / .btn inside the active scene in sequence, based on
   the numeric data-line attribute. Keeps pacing readable but not slow. */
function revealSceneLines(sceneEl) {
  const items = Array.from(sceneEl.querySelectorAll("[data-line]"));
  items.forEach((el) => el.classList.remove("is-visible"));

  if (items.length === 0) return;

  const step = prefersReducedMotion ? 90 : 650;
  const baseDelay = prefersReducedMotion ? 0 : 300;

  items.forEach((el) => {
    const order = Number(el.getAttribute("data-line")) || 0;
    setTimeout(() => {
      el.classList.add("is-visible");
    }, baseDelay + order * step);
  });
}

/* Scene-specific setup that should happen each time a scene becomes active. */
function runSceneEnterHook(name) {
  switch (name) {
    case "couple":
      playEntranceSequence();
      break;
    case "memories":
      initMemories();
      break;
    case "birthday":
      setupBirthdayScene();
      break;
    case "message":
      setupMessageScene();
      break;
    default:
      break;
  }
}

/* ----------------------------------------------------------------------
   SCENE 3 — the scripted "love story" entrance: they walk in from either
   side, bump shoulders, fall in love, then the real couple.png photo
   fades in as the pose that stays on screen for the rest of the scene.
   ---------------------------------------------------------------------- */

function playEntranceSequence() {
  const frame = document.getElementById("entranceFrame");
  const stage = document.getElementById("entranceStage");
  const boy = document.getElementById("entranceBoy");
  const girl = document.getElementById("entranceGirl");
  const glow = document.getElementById("entranceGlow");
  const finalImg = document.getElementById("coupleFinalImg");
  if (!frame || !stage || !boy || !girl || !finalImg) return;

  // Reset to a clean starting state in case this scene is revisited.
  frame.classList.remove("is-walking");
  stage.classList.remove("is-fading");
  finalImg.classList.remove("is-visible");
  boy.classList.remove("is-smitten");
  girl.classList.remove("is-smitten");
  if (glow) glow.classList.remove("is-bright");

  if (prefersReducedMotion) {
    // Skip straight to the resting pose — no walking/bumping animation.
    stage.classList.add("is-fading");
    finalImg.classList.add("is-visible");
    return;
  }

  // 1) They walk in from opposite sides and bump on arrival.
  requestAnimationFrame(() => frame.classList.add("is-walking"));

  // 2) Shortly after they meet, the "falling in love" beat: big heart,
  //    a soft glow, both characters get a happy little pulse.
  setTimeout(() => {
    boy.classList.add("is-smitten");
    girl.classList.add("is-smitten");
    if (glow) glow.classList.add("is-bright");
    spawnBigHeart(stage);
    spawnSparkleBurst(frame);
  }, 1250);

  // 3) Hold the moment, then crossfade into the real seated photo.
  setTimeout(() => {
    stage.classList.add("is-fading");
    finalImg.classList.add("is-visible");
  }, 2650);
}

function spawnBigHeart(container) {
  if (prefersReducedMotion) return;
  const heart = document.createElement("span");
  heart.className = "big-heart is-popping";
  heart.textContent = "❤️";
  container.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove(), { once: true });
}

/* ----------------------------------------------------------------------
   Couple illustration (single image, scenes 4/7/8): pointer/touch tilt,
   tap-to-react, graceful fallback.
   ---------------------------------------------------------------------- */

function playSingleBump(img) {
  if (!img) return;
  const frame = img.closest(".couple-frame");

  img.classList.remove("is-bumping");
  void img.offsetWidth; // restart animation on repeated taps
  img.classList.add("is-bumping");

  if (frame) spawnSparkleBurst(frame);
  if (frame) setTimeout(() => spawnBigHeart(frame), 260);

  setTimeout(() => img.classList.remove("is-bumping"), 950);
}

function setupCoupleInteractions() {
  // Pointer-driven 3D tilt on every wrapper.
  if (!prefersReducedMotion) {
    document.querySelectorAll("[data-tilt]").forEach((el) => {
      let rafId = null;

      const applyTilt = (clientX, clientY) => {
        const rect = el.getBoundingClientRect();
        const px = (clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
        const py = (clientY - rect.top) / rect.height - 0.5;
        const maxTilt = 8; // degrees
        const rotateY = px * maxTilt * 2;
        const rotateX = -py * maxTilt;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
      };

      const resetTilt = () => {
        if (rafId) cancelAnimationFrame(rafId);
        el.style.transform = "rotateX(0deg) rotateY(0deg)";
      };

      el.addEventListener("pointermove", (e) => applyTilt(e.clientX, e.clientY));
      el.addEventListener("pointerleave", resetTilt);

      el.addEventListener(
        "touchmove",
        (e) => {
          if (e.touches[0]) applyTilt(e.touches[0].clientX, e.touches[0].clientY);
        },
        { passive: true }
      );
      el.addEventListener("touchend", resetTilt, { passive: true });
    });
  }

  // Tap/click the couple photo (scenes 4/7/8) to replay a little reaction.
  document.querySelectorAll("[data-couple-single]").forEach((img) => {
    img.addEventListener("click", () => playSingleBump(img));

    img.addEventListener(
      "error",
      () => {
        const frame = img.closest(".couple-frame");
        const holder = img.parentElement;
        img.remove();
        const fallback = document.createElement("div");
        fallback.className = "couple-img-fallback";
        fallback.textContent = "Add assets/couple.png";
        holder.appendChild(fallback);
        if (frame) frame.classList.add("is-visible");
      },
      { once: true }
    );
  });

  // Graceful fallback for the entrance-sequence images specifically.
  ["entranceBoy", "entranceGirl", "coupleFinalImg"].forEach((id) => {
    const img = document.getElementById(id);
    if (!img) return;
    img.addEventListener(
      "error",
      () => {
        img.style.visibility = "hidden";
      },
      { once: true }
    );
  });
}

function spawnSparkleBurst(anchorEl) {
  if (prefersReducedMotion) return;
  const frame = anchorEl.closest(".couple-frame") || anchorEl.closest(".entrance-frame") || anchorEl;
  if (!frame) return;
  const symbols = ["✨", "💙", "⭐"];
  const count = 6;
  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.className = "sparkle-burst";
    span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const distance = 50 + Math.random() * 30;
    span.style.setProperty("--sx", `${Math.cos(angle) * distance}px`);
    span.style.setProperty("--sy", `${Math.sin(angle) * distance - 20}px`);
    span.style.position = "absolute";
    span.style.left = "50%";
    span.style.top = "40%";
    frame.appendChild(span);
    span.addEventListener("animationend", () => span.remove());
  }
}

// Reveal every .couple-frame in the currently active scene (used by scenes
// that don't have a unique id, e.g. "us" and "emotional").
function revealCoupleFramesIn(sceneEl) {
  sceneEl.querySelectorAll(".couple-frame").forEach((frame) => {
    frame.classList.remove("is-visible");
    requestAnimationFrame(() => frame.classList.add("is-visible"));
  });
}

/* ----------------------------------------------------------------------
   Particles (hearts) — used sparingly, on key transitions only
   ---------------------------------------------------------------------- */

function spawnParticles(count) {
  if (prefersReducedMotion) return;
  const layer = document.getElementById("particleLayer");
  const hearts = ["💙", "✨", "🩵"];
  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.className = "particle";
    span.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    span.style.left = `${Math.random() * 90 + 5}%`;
    span.style.setProperty("--drift", `${Math.random() * 60 - 30}px`);
    span.style.animationDuration = `${3.5 + Math.random() * 2.5}s`;
    layer.appendChild(span);
    span.addEventListener("animationend", () => span.remove());
  }
}

/* ----------------------------------------------------------------------
   SCENE 1 — intro
   ---------------------------------------------------------------------- */

document.getElementById("btnOpenIntro").addEventListener("click", () => {
  spawnParticles(10);
  setTimeout(nextScene, 350);
});

/* ----------------------------------------------------------------------
   SCENE 2 — gift box
   ---------------------------------------------------------------------- */

document.getElementById("btnOpenGift").addEventListener("click", (e) => {
  const box = document.getElementById("giftBox");
  const btn = e.currentTarget;
  box.classList.add("is-open");
  btn.disabled = true;
  spawnParticles(14);
  setTimeout(nextScene, 900);
});

/* ----------------------------------------------------------------------
   SCENE 3 — couple appears (handled via runSceneEnterHook + revealSceneLines)
   ---------------------------------------------------------------------- */

document.getElementById("btnContinueCouple").addEventListener("click", nextScene);

/* ----------------------------------------------------------------------
   SCENE 4 — "This is us"
   ---------------------------------------------------------------------- */

document.getElementById("btnContinueUs").addEventListener("click", nextScene);

/* ----------------------------------------------------------------------
   SCENE 5 — memory journey
   ---------------------------------------------------------------------- */

function initMemories() {
  const track = document.getElementById("memoryTrack");
  const dotsWrap = document.getElementById("memoryDots");
  if (track.childElementCount > 0) {
    // already built — just re-render current position
    renderMemoryPosition();
    return;
  }

  track.innerHTML = "";
  dotsWrap.innerHTML = "";

  MEMORIES.forEach((memory, i) => {
    const card = document.createElement("div");
    card.className = "memory-card";
    card.dataset.index = String(i);

    const media = document.createElement("div");
    media.className = "memory-card-media";

    const img = document.createElement("img");
    img.alt = memory.title;
    img.loading = "lazy";
    img.src = memory.image;
    // Feed the same file to the blurred backdrop behind the photo.
    media.style.setProperty("--photo-bg", `url("${memory.image}")`);
    img.addEventListener("error", () => {
      img.remove();
      const placeholder = document.createElement("div");
      placeholder.className = "memory-card-placeholder";
      placeholder.textContent = `0${i + 1}`;
      media.appendChild(placeholder);
    });
    media.appendChild(img);

    const body = document.createElement("div");
    body.className = "memory-card-body";
    body.innerHTML = `
      <div class="memory-card-index">Memory 0${i + 1}${memory.date ? " · " + memory.date : ""}</div>
      <div class="memory-card-title">${memory.title}</div>
      <div class="memory-card-desc">${memory.description}</div>
    `;

    card.appendChild(media);
    card.appendChild(body);
    track.appendChild(card);

    const dot = document.createElement("div");
    dot.className = "memory-dot";
    dotsWrap.appendChild(dot);
  });

  // Swipe support
  let touchStartX = null;
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
  );
  track.addEventListener(
    "touchend",
    (e) => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        dx < 0 ? memoryStep(1) : memoryStep(-1);
      }
      touchStartX = null;
    },
    { passive: true }
  );

  // Keyboard support
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") memoryStep(1);
    if (e.key === "ArrowLeft") memoryStep(-1);
  });

  state.memoryIndex = 0;
  renderMemoryPosition();
}

function memoryStep(delta) {
  const next = state.memoryIndex + delta;
  if (next < 0 || next > MEMORIES.length - 1) return;
  state.memoryIndex = next;
  renderMemoryPosition();
}

function renderMemoryPosition() {
  const cards = document.querySelectorAll("#memoryTrack .memory-card");
  cards.forEach((card, i) => {
    card.classList.remove("is-active", "is-prev");
    if (i === state.memoryIndex) {
      card.classList.add("is-active");
    } else if (i < state.memoryIndex) {
      card.classList.add("is-prev");
    }
  });

  const dots = document.querySelectorAll("#memoryDots .memory-dot");
  dots.forEach((dot, i) => dot.classList.toggle("is-active", i === state.memoryIndex));

  const fill = document.getElementById("memoryProgressFill");
  const pct = ((state.memoryIndex + 1) / MEMORIES.length) * 100;
  fill.style.width = `${pct}%`;

  document.getElementById("memPrev").disabled = state.memoryIndex === 0;
  document.getElementById("memNext").disabled = state.memoryIndex === MEMORIES.length - 1;
}

document.getElementById("memPrev").addEventListener("click", () => memoryStep(-1));
document.getElementById("memNext").addEventListener("click", () => memoryStep(1));
document.getElementById("btnFinishMemories").addEventListener("click", nextScene);

/* ----------------------------------------------------------------------
   SCENE 6 — playful
   ---------------------------------------------------------------------- */

document.getElementById("btnContinuePlayful").addEventListener("click", nextScene);

/* ----------------------------------------------------------------------
   SCENE 7 — emotional (line reveal handles pacing; frame revealed too)
   ---------------------------------------------------------------------- */

document.getElementById("btnContinueEmotional").addEventListener("click", nextScene);

/* ----------------------------------------------------------------------
   SCENE 8 — birthday reveal
   ---------------------------------------------------------------------- */
function setupBirthdayScene() {
  document.getElementById("birthdayName").textContent = `Happy Birthday, ${HER_NAME}`;

  const scene = getSceneEl("birthday");
  const coupleFrame = scene.querySelector(".couple-frame--cake");
  const photo = document.getElementById("birthdayPhoto");
  const photoImg = document.getElementById("birthdayPhotoImg");
  const caption = document.getElementById("birthdayPhotoCaption");
  const usePhoto = Boolean(photo && photoImg && BIRTHDAY_PHOTO && BIRTHDAY_PHOTO.src);

  // Falls back to the original couple + CSS cake if the photo can't be used.
  const showCouple = !usePhoto || !BIRTHDAY_PHOTO.replaceCoupleImage;

  if (coupleFrame) coupleFrame.hidden = !showCouple;

  if (showCouple) {
    const cake = document.getElementById("cakeEl");
    cake.classList.remove("is-visible");
    setTimeout(() => {
      cake.classList.add("is-visible");
      spawnParticles(18);
    }, 700);
  }

  if (!usePhoto) return;

  photo.hidden = false;
  photo.classList.remove("is-visible");
  caption.textContent = BIRTHDAY_PHOTO.caption || "";
  caption.hidden = !BIRTHDAY_PHOTO.caption;
  photoImg.alt = `Happy birthday, ${HER_NAME}`;

  // Only (re)load the file the first time this scene is entered.
  if (photoImg.getAttribute("src") !== BIRTHDAY_PHOTO.src) {
    photoImg.addEventListener(
      "error",
      () => {
        // Photo missing — hide it and restore the original couple + cake.
        photo.hidden = true;
        if (coupleFrame) {
          coupleFrame.hidden = false;
          coupleFrame.classList.add("is-visible");
          document.getElementById("cakeEl").classList.add("is-visible");
        }
      },
      { once: true }
    );
    photoImg.src = BIRTHDAY_PHOTO.src;
  }

  setTimeout(() => {
    photo.classList.add("is-visible");
    spawnParticles(18);
  }, 600);
}

// Tap the birthday photo for the same little sparkle reaction as the
// couple illustration elsewhere in the experience.
(function setupBirthdayPhotoTap() {
  const photo = document.getElementById("birthdayPhoto");
  if (!photo) return;
  photo.addEventListener("click", () => {
    const inner = photo.querySelector(".birthday-photo-inner");
    if (!inner) return;
    inner.classList.remove("is-bumping");
    void inner.offsetWidth; // restart the animation on repeated taps
    inner.classList.add("is-bumping");
    spawnSparkleBurst(photo);
    setTimeout(() => spawnBigHeart(photo), 260);
    setTimeout(() => inner.classList.remove("is-bumping"), 950);
  });
})();

document.getElementById("btnContinueBirthday").addEventListener("click", nextScene);

/* ----------------------------------------------------------------------
   SCENE 9 — final message
   ---------------------------------------------------------------------- */

function setupMessageScene() {
  document.getElementById("letterText").textContent = BIRTHDAY_MESSAGE;
  const card = document.getElementById("letterCard");
  card.classList.remove("is-visible");
  setTimeout(() => card.classList.add("is-visible"), 200);
}

document.getElementById("btnContinueMessage").addEventListener("click", nextScene);

/* ----------------------------------------------------------------------
   SCENE 10 — final surprise
   ---------------------------------------------------------------------- */

document.getElementById("btnOpenSurprise").addEventListener("click", (e) => {
  e.currentTarget.remove();
  renderFinalSurprise();
  spawnParticles(12);
});

function renderFinalSurprise() {
  const wrap = document.getElementById("surpriseContent");
  wrap.hidden = false;

  const finish = () => {
    const btn = document.createElement("button");
    btn.className = "btn btn--primary";
    btn.style.marginTop = "8px";
    btn.textContent = "Continue";
    btn.addEventListener("click", nextScene);
    wrap.appendChild(btn);
    requestAnimationFrame(() => wrap.classList.add("is-visible"));
  };

  const fallbackToMessage = (reason) => {
    wrap.innerHTML = `<div class="surprise-message">${escapeHtml(FINAL_SURPRISE.content || "You. Always you.")}</div>`;
    finish();
  };

  switch (FINAL_SURPRISE.type) {
    case "image": {
      const img = document.createElement("img");
      img.alt = "One last surprise";
      img.src = FINAL_SURPRISE.content;
      img.addEventListener("error", () => fallbackToMessage("image missing"));
      wrap.appendChild(img);
      finish();
      break;
    }
    case "video": {
      const video = document.createElement("video");
      video.src = FINAL_SURPRISE.content;
      video.controls = true;
      video.playsInline = true;
      video.addEventListener("error", () => fallbackToMessage("video missing"));
      wrap.appendChild(video);
      finish();
      break;
    }
    case "audio": {
      const label = document.createElement("div");
      label.className = "surprise-message";
      label.textContent = "One more voice note for you 🎙️";
      const audio = document.createElement("audio");
      audio.src = FINAL_SURPRISE.content;
      audio.controls = true;
      audio.style.width = "100%";
      audio.addEventListener("error", () => fallbackToMessage("audio missing"));
      wrap.appendChild(label);
      wrap.appendChild(audio);
      finish();
      break;
    }
    case "message":
    default: {
      fallbackToMessage("message type");
      break;
    }
  }
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ----------------------------------------------------------------------
   SCENE 11 — physical gift (final screen, no further action)
   ---------------------------------------------------------------------- */

/* ----------------------------------------------------------------------
   Music toggle — never autoplays; hides itself if audio is unavailable
   ---------------------------------------------------------------------- */

function setupAudio() {
  if (!ENABLE_MUSIC) return;
  const toggle = document.getElementById("audioToggle");
  const icon = document.getElementById("audioIcon");
  const audio = document.getElementById("bgMusic");
  let checked = false;
  let playing = false;

  const reveal = () => {
    if (checked) return;
    checked = true;
    toggle.hidden = false;
  };

  // If the browser can read metadata, the file exists and is playable.
  audio.addEventListener("loadedmetadata", reveal, { once: true });
  audio.addEventListener(
    "error",
    () => {
      toggle.hidden = true;
    },
    { once: true }
  );
  audio.load();

  toggle.addEventListener("click", () => {
    if (!playing) {
      audio.play().then(() => {
        playing = true;
        icon.textContent = "🔊";
        toggle.setAttribute("aria-pressed", "true");
      }).catch(() => {
        /* Autoplay-style restrictions or missing file — fail silently. */
      });
    } else {
      audio.pause();
      playing = false;
      icon.textContent = "🔇";
      toggle.setAttribute("aria-pressed", "false");
    }
  });
}

/* ----------------------------------------------------------------------
   Extra hook: reveal couple-frame elements on scenes without a unique id
   ---------------------------------------------------------------------- */

const originalRunSceneEnterHook = runSceneEnterHook;
function extendedRunSceneEnterHook(name) {
  originalRunSceneEnterHook(name);
  if (name === "us" || name === "emotional" || name === "birthday") {
    const el = getSceneEl(name);
    revealCoupleFramesIn(el);
  }
}

/* ----------------------------------------------------------------------
   Init
   ---------------------------------------------------------------------- */

function init() {
  setupAudio();
  setupCoupleInteractions();
  showScene(SCENES[state.currentSceneIndex]);
}

// Swap in the extended hook before first paint.
runSceneEnterHook = extendedRunSceneEnterHook;

document.addEventListener("DOMContentLoaded", init);
