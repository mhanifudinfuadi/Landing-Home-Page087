# PANDUAN UPGRADE — MADU·記録 Cosmic Identity ke Repo Anda

Paket ini berisi seluruh kode landing page yang sudah teruji. Ikuti langkah berurutan — jangan minta AI mengerjakan semuanya dalam satu prompt.

## 0. Prasyarat

- Proyek **React + Tailwind CSS v3** (CRA atau Vite)
- Instal dependency:
  ```bash
  npm install three @react-three/fiber @react-three/drei lenis framer-motion lucide-react sonner
  ```
- Semua import memakai alias `@/` → arahkan ke folder `src` (jsconfig.json / vite config), atau ganti `@/` jadi path relatif.

## 1. Fondasi (prompt 1)

"Terapkan file-file fondasi ini tanpa mengubah halaman yang ada: `src/index.css` (ganti seluruhnya), `tailwind.config.js` (tambahkan blok fontFamily), font Google di `public/index.html` (Unbounded, Plus Jakarta Sans, JetBrains Mono), lalu buat `src/context/CosmicContext.js` dan `src/context/MissionContext.js` persis seperti terlampir."

## 2. Background 3D (prompt 2)

"Pasang `src/components/three/CosmicCanvas.jsx` sebagai latar fixed di belakang konten, dan `src/components/Reveal.jsx` untuk animasi scroll. Verifikasi aurora, bintang, meteor, dan planet tampil bergerak."

## 3. Kerangka halaman (prompt 3)

"Terapkan `src/App.js` persis seperti terlampir (Lenis + CosmicProvider + MissionProvider + Toaster), lalu tambahkan `DockNav.jsx`, `Hero.jsx`, `MarqueeRibbon.jsx`, `Footer.jsx`."

## 4. Konten interaktif (prompt 4)

"Tambahkan data `src/data/planets.js` dan `src/data/quiz.js`, lalu komponen `Planets.jsx`, `Scanner.jsx`, `Quiz.jsx`, `Compare.jsx`, `MaduGate.jsx` persis seperti terlampir. Uji: modal planet terbuka, kuis 15 soal menghasilkan planet, scanner dapat dimenangkan, dan 4 kanal MADU terbuka setelah 3 misi."

## 5. Catatan penting

- **Bug orbit diam (sudah diperbaiki di paket ini):** posisi planet Scanner harus dihitung langsung saat render — jangan dibungkus `useMemo` dengan dependency `ref.current`, karena mutasi ref tidak memicu perhitungan ulang.
- Ganti URL 4 kanal di `src/components/MaduGate.jsx` bila berubah.
- State misi tidak disimpan (sesuai spesifikasi); tambahkan localStorage bila ingin persisten.
- Judul & meta ada di `public/index.html`.
