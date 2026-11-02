# PANDUAN MEMBUAT REPO BARU DI GITHUB + MEMBANGUN DESAIN MADU·記録

> Jalur paling bersih: buat proyek React baru (Vite), salin file dari `madu-cosmic-identity-kit.zip`, lalu push ke GitHub. Total ±15 menit.

---

## LANGKAH 1 — Buat repo kosong di GitHub

1. Buka https://github.com/new
2. **Repository name:** `madu-cosmic-identity` (atau nama bebas)
3. Pilih **Public** atau **Private**
4. **JANGAN** centang "Add a README" (biarkan kosong total agar push pertama tidak bentrok)
5. Klik **Create repository** → biarkan halaman hasilnya terbuka (ada URL repo Anda, misal `https://github.com/USERNAME/madu-cosmic-identity.git`)

## LANGKAH 2 — Buat proyek React baru (Vite) di komputer

Buka terminal/VS Code, lalu:

```bash
npm create vite@latest madu-cosmic-identity -- --template react
cd madu-cosmic-identity
npm install
```

Instal semua dependency desain:

```bash
npm install three@^0.187.0 @react-three/fiber@^9.8.2 @react-three/drei@^10.7.9 lenis framer-motion@11.18.0 lucide-react@0.516.0 sonner
npm install -D tailwindcss@3.4.17 postcss autoprefixer
npx tailwindcss init -p
```

## LANGKAH 3 — Salin file dari paket zip

Ekstrak `madu-cosmic-identity-kit.zip`, lalu:

1. **Hapus** isi `src/` bawaan Vite (App.jsx, App.css, index.css, assets/) — kecuali `main.jsx`
2. **Salin seluruh isi** folder `src/` dari zip ke `src/` proyek
3. **Salin** `public/favicon.svg` dan `public/index.html` dari zip → timpa `index.html` di **root proyek** (Vite menyimpan index.html di root, bukan di public)
4. **Timpa** `tailwind.config.js` root dengan versi dari zip
5. Edit `tailwind.config.js`: pastikan `content` memuat `"./index.html"` dan `"./src/**/*.{js,jsx}"`

## LANGKAH 4 — Wajib: alias `@/` (penyebab gagal paling umum)

Semua file memakai `import ... from "@/components/..."`. Tambahkan alias di `vite.config.js`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
```

## LANGKAH 5 — Sambungkan entry point

Pastikan `src/main.jsx` seperti ini (nama file `App.js` dari zip, tanpa x):

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
```

Catatan: zip memakai `App.js`, bukan `App.jsx` — karena itu import memakai `./App.js`.

## LANGKAH 6 — Jalankan & periksa

```bash
npm run dev
```

Buka http://localhost:5173 — seharusnya langsung tampil: aurora bergerak, meteor, planet 3D, jejak kristal mengikuti mouse, border liquid metal berputar.

**Jika belum sama, cek urutan ini:**
- Layar kosong + error `Failed to resolve import "@/..."` → Langkah 4 belum benar
- Styling rusak/polos → `tailwind.config.js` belum tertimpa atau `content` salah → ulangi Langkah 3.5
- Font salah → `index.html` root belum tertimpa (Langkah 3.3)
- 3D tidak muncul → dependency three belum terinstal (Langkah 2)
- Orbit Scanner diam → pastikan `Scanner.jsx` versi zip (posisi dihitung langsung saat render)

## LANGKAH 7 — Push ke GitHub

```bash
git init
git add .
git commit -m "MADU Cosmic Identity — landing page"
git branch -M main
git remote add origin https://github.com/USERNAME/madu-cosmic-identity.git
git push -u origin main
```

Ganti `USERNAME/...` dengan URL repo dari Langkah 1. Jika diminta login, gunakan **Personal Access Token** sebagai password (buat di GitHub → Settings → Developer settings → Tokens).

## LANGKAH 8 (opsional) — Deploy ke Vercel seperti 4 kanal MADU Anda

1. https://vercel.com/new → **Import** repo `madu-cosmic-identity`
2. Framework terdeteksi otomatis: **Vite** → klik **Deploy**
3. Selesai — Anda mendapat URL `*.vercel.app`

## Verifikasi akhir (checklist design.md bagian 13)

- [ ] Aurora + meteor + planet 3D bergerak
- [ ] Jejak kristal lavender mengikuti mouse
- [ ] Border metalik berputar di semua kartu
- [ ] Kuis 15 soal → hasil planet; misi pill 0/3 → 3/3
- [ ] 4 kanal MADU terbuka setelah 3 misi selesai
