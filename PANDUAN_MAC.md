# PANDUAN INSTAL UNTUK MAC — MADU·記録 Cosmic Identity

> Proyek ini sudah lengkap (ada `package.json`, `vite.config.js`, dll.) — Anda TIDAK perlu membuat proyek dari nol. Cukup ekstrak, install, jalankan.

## LANGKAH 0 — Pastikan Node.js terpasang (sekali saja)

Buka **Terminal** (Cmd+Spasi → ketik "Terminal"), cek:

```bash
node -v
```

- Jika muncul versi (misal `v20.x.x` / `v22.x.x`) → lanjut ke Langkah 1
- Jika `command not found`, pasang Node.js dengan salah satu cara:
  - **Termudah:** unduh installer dari https://nodejs.org (pilih versi LTS) → klik 2x → ikuti wizard
  - **Via Homebrew:** `brew install node` (jika Homebrew sudah ada)

## LANGKAH 1 — Ekstrak proyek

1. Unduh `madu-cosmic-identity-vite.zip`
2. Klik 2x untuk ekstrak → pindahkan folder hasilnya ke lokasi favorit, misal ganti nama jadi `Landing-Home-Page-087`

## LANGKAH 2 — Install & jalankan

Di Terminal:

```bash
cd ~/Landing-Home-Page-087     # sesuaikan dengan lokasi folder Anda
npm install
npm run dev
```

Buka alamat yang muncul (biasanya **http://localhost:5173**) — selesai.

Yang seharusnya langsung terlihat: aurora bergerak, meteor berjatuhan, planet 3D, jejak kristal lavender mengikuti mouse, dan border metalik berputar di semua kartu.

## LANGKAH 3 (opsional) — Push ke GitHub

```bash
git init
git add .
git commit -m "MADU Cosmic Identity — landing page"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

(Buat repo dulu di https://github.com/new — jangan centang "Add a README".)

## LANGKAH 4 (opsional) — Deploy ke Vercel

https://vercel.com/new → Import repo → framework **Vite** terdeteksi otomatis → Deploy.

## Jika ada masalah

| Gejala | Perbaikan |
|---|---|
| `npm: command not found` | Node.js belum terpasang → ulangi Langkah 0 |
| `No package.json found` | Anda berada di folder yang salah → `cd` ke folder hasil ekstrak zip yang di dalamnya ada `package.json` |
| Port 5173 dipakai | `npm run dev -- --port 3000` |
| Layar putih | Buka Console browser (Cmd+Option+J), salin error merahnya, kirim ke saya |
