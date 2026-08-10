# Instagram Feed — Template HelloWorks

6 post feed (carousel) ukuran **1080×1350** (rasio 4:5 — ukuran feed Instagram sekarang), dibuat pakai font & palet asli website HelloWorks:

| File | Isi | Background |
|---|---|---|
| `post-01-intro.html` | Intro studio — "never stop building." | Paper (krem) |
| `post-02-layanan.html` | 5 layanan (website, design, automation, UI/UX, merch) | Acid (lime) |
| `post-03-misi.html` | Misi — "Tim kecil. Visi besar." | Blue |
| `post-04-proses.html` | Continuous product cycle (7 langkah) | Paper |
| `post-05-filosofi.html` | Quote — "We're not building software..." | Ink (gelap) |
| `post-06-cta.html` | CTA kontak + maskot | Flame (oranye) |

## Cara buka
- **Via dev server** (kalau `npm run dev` jalan): `http://localhost:5173/instagram-feeds/post-01-intro.html`
- **Langsung**: buka file-nya dari folder ini di Chrome/Firefox (klik 2×).

## Cara screenshot pas ukuran 1080×1080
1. Buka file di Chrome.
2. Klik kanan → **Inspect**.
3. Di tab *Elements*, klik elemen `<div class="canvas">` (yang ada border highlight-nya).
4. Klik kanan elemen itu → **Capture node screenshot**.
   → Tersimpan sebagai PNG **persis 1080×1350** (di layar HiDPI hasilnya 2160×2700 — tetap aman buat Instagram).

Font: **Manrope** (headline/body) · **DM Mono** (label) · **Georgia italic** (aksen serif) — semua via Google Fonts.
Palet: `#171717` ink · `#f5f1e9` paper · `#d9f85b` acid · `#1939d5` blue · `#ff5f36` flame.
