# A Little Secret For You 💌

A tiny interactive birthday experience, built to live behind a QR code hidden in a physical gift. No frameworks, no build step, no backend — just HTML, CSS, and vanilla JS.

## 1. Run it locally

You don't strictly need a server, but browsers are happier loading images/fonts over `http://` than `file://`. Easiest options:

**Option A — VS Code**
Install the "Live Server" extension, right-click `index.html`, choose "Open with Live Server."

**Option B — Python (already on most machines)**
```bash
cd birthday-experience
python3 -m http.server 8000
```
Then open `http://localhost:8000` on your computer, or on your phone (same Wi-Fi) at `http://YOUR-COMPUTER-IP:8000`.

**Option C — just double-click `index.html`**
Works in most cases, but a local server is more reliable.

## 2. Replace the cartoon image

Your uploaded couple illustration is already saved as `assets/couple.png`. To swap it for a different version later, just replace that file — keep the filename the same and the site updates automatically. A tall/portrait image works best.

## 3. Add real memories

Open `script.js` and find the `CUSTOMIZATION AREA` at the very top. Edit the `MEMORIES` array:

```js
const MEMORIES = [
  {
    title: "The beginning",
    description: "Write the real story here.",
    date: "March 2023",           // optional — leave "" to hide
    image: "assets/photos/memory1.jpg",
  },
  // ...add, remove, or reorder entries freely
];
```

Drop your photos into `assets/photos/` using the filenames referenced above (or point `image` at whatever filename you use). If a photo is missing, the card automatically shows a soft placeholder instead of breaking.

## 4. Add music (optional)

1. Add an MP3 at `assets/audio/music.mp3`.
2. In `script.js`, set `const ENABLE_MUSIC = true;`.

Music never autoplays (mobile browsers block it anyway) — a small 🔇 button appears in the top-right once the file is detected, and she taps it to turn music on.

## 5. Add the final surprise

Still in the `CUSTOMIZATION AREA`, edit `FINAL_SURPRISE`. Pick exactly one `type`:

```js
// A written message (default, always works, needs no files)
const FINAL_SURPRISE = { type: "message", content: "Your closing words here." };

// A photo
const FINAL_SURPRISE = { type: "image", content: "assets/photos/final.jpg" };

// A video
const FINAL_SURPRISE = { type: "video", content: "assets/audio/final.mp4" };

// A voice recording
const FINAL_SURPRISE = { type: "audio", content: "assets/audio/final-voice.mp3" };
```

If the referenced file is missing, it quietly falls back to a text message so the experience never breaks.

## 6. Personalize the rest

Also in `script.js`:

```js
const HER_NAME = "...";           // used in the birthday reveal
const BIRTHDAY_MESSAGE = `...`;   // the final letter — edit freely, keep the backticks
```

Line-by-line story text (the "Wait...", "This is us.", etc.) lives directly in `index.html` inside each `<section class="scene">` if you want to tweak the wording itself.

## 7. Deploy with GitHub Pages

1. Create a new GitHub repository (public is simplest).
2. Upload the whole `birthday-experience` folder contents to the repo root (`index.html`, `style.css`, `script.js`, `assets/`, this `README.md`).
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment," set **Source** to "Deploy from a branch."
5. Choose branch `main` (or `master`) and folder `/ (root)`, then **Save**.
6. Wait a minute or two — GitHub will give you a URL like:
   `https://your-username.github.io/your-repo-name/`
7. Open that URL to confirm everything works, especially on your phone.

## 8. Generate the QR code

Once the site is live at its GitHub Pages URL:

1. Go to any QR generator (e.g. [qr-code-generator.com](https://www.qr-code-generator.com) or [qrcode-monkey.com](https://www.qrcode-monkey.com)).
2. Paste in your GitHub Pages URL.
3. Download the QR code as a PNG.
4. Print it small enough to tuck inside the physical gift.

## Notes

- Everything is mobile-first — test on your own phone before wrapping the gift.
- The site respects `prefers-reduced-motion` and works fully with a keyboard.
- Nothing here requires Node, npm, or a build step — it's just static files.

Happy birthday to her. 🎂
