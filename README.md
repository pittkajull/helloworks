# HelloWorks — Website (React + Tailwind)

Landing page **HelloWorks** — studio kreatif digital (website custom, desain, otomasi, UI/UX, merchandise) —
dibangun dengan **React + Tailwind CSS** (Vite).

Project ini hasil migrasi dari HTML/CSS/JS polos; UI dipertahankan **identik** dengan versi lama
(backup ada di folder `old-versi/`).

## Cara menjalankan

```bash
npm install        # install dependencies
npm run dev        # dev server → http://localhost:5173
npm run build      # build produksi ke dist/
npm run preview    # preview hasil build
npm run lint       # lint (oxlint)
```

## Chatbot AI (maskot "Halo" → chat)

Maskot di pojok kanan bawah adalah **chatbot AI** yang paham konten website ini
(layanan, tim, proses, kontak). Dia ngobrol lewat **OpenRouter** (`deepseek-chat-v3:free`).

**API key disimpan di SERVER — bukan di frontend** (biar gak bisa dicomot orang dari devtools).

```bash
cp .env.example .env        # sekali: isi OPENROUTER_API_KEY (dari openrouter.ai/keys)
npm run chat:server         # terminal 1 — proxy chat (http://localhost:8787)
npm run dev                 # terminal 2 — frontend (http://localhost:5173)
```

- Di dev, Vite meng-proxy `/api` → `localhost:8787` otomatis (lihat `vite.config.js`).
- **Produksi** cukup 1 proses: `npm run build && node server/chat-proxy.js` —
  server ini sekaligus serve `dist/` + endpoint `/api/chat` (SPA fallback sudah dihandle).
- Env opsional: `PORT`, `CHAT_MODEL`, `SITE_URL` (lihat `.env.example`).
- Detail bot (knowledge website, tone santai, guardrails anti-leak) ada di `server/chat-proxy.js`
  (fungsi `buildSystemPrompt`) — model DILARANG ngarang harga/paket & dilarang bocorin
  data internal; pertanyaan harga diarahkan ke kontak resmi.

> ⚠️ `.env` tidak ikut di-commit (sudah di `.gitignore`). Jangan pernah taruh API key
> di file frontend (`src/`) — itu bakal ke-commit & kebaca siapa pun.

## Bahasa (i18n)

Website mendukung **2 bahasa**: **Indonesia** (default) & **English** — bisa diganti lewat toggle
`ID / EN` di header (desktop & menu mobile). Pilihan tersimpan di `localStorage` (`helloworks-lang`)
dan `<html lang>` ikut ter-update.

- Terjemahan ada di `src/lib/i18n.js` (objek `translations` — key datar, tinggal tambah key baru)
- `LanguageProvider` & helper `Lines` (render `\n` jadi `<br/>`) di `src/lib/i18n.jsx`
- Komponen pakai hook `useLang()` → `t('key')`
- Headline brand (We build better ways, Never stop building, dll) sengaja tetap English di kedua
  bahasa — bagian identitas visual & sudah di-tuning supaya pas di layout.

## Halaman (routing — react-router-dom)

| Route          | Halaman                    | Isi                                                          |
|----------------|----------------------------|--------------------------------------------------------------|
| `/`            | Landing (landing page)     | Hero, About, Services, Values, Contact + semua animasi       |
| `/team`        | Tim HelloWorks             | 5 co-founder — hover foto → 2 pilihan (Profile / Portfolio)   |
| `/team/:slug`  | Profil per orang           | About, karya pilihan, sertifikat + CTA buka portfolio lengkap |
| `/lab`         | Lab                        | Concept builds & eksperimen (pengganti portfolio)            |
| `/playbook`    | Playbook                   | Cara kerja: siklus 7 langkah + aturan yang gak pernah dilanggar |
| `/services/:slug` | Layanan                 | Halaman per layanan (website/design/automation/uiux/merch)     |

Navbar punya dropdown **"Other"** → **Team**, **Playbook**, & **Lab** (beneran) + tab placeholder berlabel
`soon` (Journal, FAQ).

> ⚠️ **Deploy di hosting statis (mis. Laragon):** butuh *rewrite rule* supaya semua route
> diarahkan ke `index.html` (SPA fallback), mis. `.htaccess`:
> `RewriteRule ^ index.html [L]`. `vite preview` & `vite dev` sudah handle ini otomatis.

## Struktur project

```
src/
├── lib/
│   ├── i18n.js             # translations id/en + useLang() + getInitialLang()
│   ├── i18n.jsx            # LanguageProvider + Lines (render \n jadi <br/>)
│   ├── motion.js           # easing curve bersama
│   └── members.js          # data tim (TEAM) + konten profil per orang (PROFILE, id/en)
├── main.jsx               # entry point React (+ BrowserRouter)
├── App.jsx                # router: rute "/" dan "/team", Header/Footer di-share
├── index.css              # Tailwind + design tokens (warna, font) + overlay grain
├── components/
│   ├── Header.jsx         # navbar + dropdown "Other" + mobile menu (AnimatePresence)
│   ├── Hero.jsx           # section 1 — hero (entrance animation)
│   ├── Intro.jsx          # section 2 — about (id="about")
│   ├── Marquee.jsx        # pita teks berjalan (bisa custom words & tone)
│   ├── Services.jsx       # section 3 — services (id="services")
│   ├── Work.jsx           # section 4 — values (id="values")
│   ├── Contact.jsx        # section 5 — contact (id="contact")
│   ├── Reveal.jsx         # helper scroll-reveal (Motion) — dipakai semua section
│   ├── Mascot.jsx         # maskot "Halo" — eye-track, blink, wave, speech bubble
│   ├── MascotTyping.jsx   # Halo versi ngetik di depan laptop (section Values)
│   ├── Gear.jsx           # gear SVG berputar (dekorasi)
│   ├── ScrollManager.jsx  # scroll ke hash / atas tiap ganti halaman
│   └── Footer.jsx         # footer
└── pages/
    ├── Landing.jsx        # halaman "/" — merangkai semua section
    ├── Team.jsx           # halaman "/team" — kartu 5 co-founder + hover 2 aksi
    ├── Member.jsx         # halaman "/team/:slug" — profil 1 orang (5 route, 1 komponen)
    ├── Lab.jsx            # halaman "/lab" — concept builds & eksperimen
    ├── Playbook.jsx       # halaman "/playbook" — siklus proses & aturan kerja
    └── Service.jsx        # halaman "/services/:slug" — 1 komponen, 5 layanan
```

Animasi pakai [Motion](https://motion.dev) (`motion/react`). Semua animasi otomatis
non-aktif untuk user dengan `prefers-reduced-motion` (aksesibilitas).

Setiap section adalah file terpisah supaya gampang di-debug & dirombak isinya.
Konten (daftar services, projects, tim) disimpan sebagai **array data di bagian atas file** masing-masing — tinggal edit di situ.

## Design tokens (Tailwind v4 `@theme` di `src/index.css`)

| Token | Value    | Utility contoh        |
|-------|----------|-----------------------|
| ink   | `#171717` | `text-ink`, `bg-ink`  |
| paper | `#f5f1e9` | `bg-paper`            |
| acid  | `#d9f85b` | `bg-acid`, `text-acid`|
| blue  | `#1939d5` | `bg-blue`, `text-blue`|
| flame | `#ff5f36` | `bg-flame`            |

Font: `font-sans` (Manrope), `font-mono` (DM Mono), `font-serif` (Georgia).
Breakpoint mobile: `max-[700px]:` (sama dengan media query `@media (max-width: 700px)` di CSS lama).
