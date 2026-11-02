# MADU·記録 Cosmic Identity — Spesifikasi Desain & Motion (Setia Kode)

> Dokumen ini mendeskripsikan landing page **persis seperti yang sudah terbentuk** di repo ini (per 2 Nov 2026). Tujuannya: diberikan ke AI assistant di repo lain agar hasil reproduksi 100% sama. Setiap nilai di bawah diambil dari kode aktual, bukan konsep.
> Cara pakai: berikan file ini + seluruh folder `src/` + `PANDUAN_UPGRADE.md` ke AI assistant, kerjakan 4 langkah prompt di bagian 12, lalu cocokkan dengan checklist bagian 13.

---

## 1. Identitas & Stack

- Nama: **MADU·記録** (Cosmic Identity) — eksplorasi kepribadian STIFIn lewat planet, gerbang 4 kanal dokumentasi MADU
- Tagline hero: "EXPLORE THE PLANETS. UNDERSTAND YOUR MIND. DISCOVER WHO YOU ARE."
- Bahasa: Indonesia + aksen kanji Jepang
- Stack: React 19.0.0, Tailwind CSS 3.4.17, three ^0.187.0, @react-three/fiber ^9.8.2, @react-three/drei ^10.7.9, framer-motion 11.18.0, lenis ^1.3.27, lucide-react 0.516.0, sonner 2.0.3
- Path alias: `@/` → `src/`
- Single page `/` dengan anchor: `#hero #arsip(dihapus) #planets #scanner #kuis #bandingkan #destinasi`

## 2. File Tree

```
public/index.html, public/favicon.svg
src/App.js
src/App.css
src/index.css
src/data/planets.js            — 9 profil planet
src/data/quiz.js               — 15 soal + pemetaan
src/context/CosmicContext.js   — suasana 3D (palet, slider, log meteor)
src/context/MissionContext.jsx — 3 misi & gerbang kanal
src/components/CrystalTrailCursor.jsx
src/components/DockNav.jsx
src/components/Hero.jsx
src/components/MarqueeRibbon.jsx
src/components/Planets.jsx
src/components/Scanner.jsx
src/components/Quiz.jsx
src/components/Compare.jsx
src/components/MaduGate.jsx
src/components/Footer.jsx
src/components/Reveal.jsx
src/components/three/CosmicCanvas.jsx
```

## 3. Token Warna

| Token | Nilai |
|---|---|
| Deep Space bg | `#03050C` |
| Panel glass | `rgba(10,13,24,0.62)` + `backdrop-blur(20px)` |
| Panel solid | `#10162B`, gradien ubin `#172344 → #10162B` |
| Soft Lavender (aksen utama) | `#BCAEFF` |
| Nebula Purple | `#8277D9` |
| Cyan Glow | `#8EDCF4` / aksen `#22D3EE` |
| Stardust text | `#F4F5FF` / `#F8FAFC` |
| Muted | `#A6AEC9` / `#94A3B8` |
| Border dasar | `rgba(255,255,255,0.08)` |
| Success | `#34D399` / `#9BE3C0`, Warn `#E8C68E` / amber |
| Gradien teks `.aurora-text` | linear 100deg `#22D3EE → #8B5CF6 (45%) → #EC4899` |
| Gradien tombol primary | `from-[#BCAEFF] to-[#8EDCF4]` |

## 4. Tipografi & Font

- Google Fonts (di `index.html`): **Unbounded** (300–900, display), **Plus Jakarta Sans** (body), **JetBrains Mono** (mono/label)
- Tailwind `fontFamily`: `display: Unbounded`, `sans: Plus Jakarta Sans`, `mono: JetBrains Mono`
- Hero H1: `text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.02]`
- H2 seksi: `text-2xl sm:text-3xl lg:text-4xl font-800 tracking-tight`
- Overline label: `font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-300`

## 5. CSS Global Kunci (`index.css`)

- `body { background:#03050C; color:#F8FAFC; font-family:"Plus Jakarta Sans" }`
- `.glass-card { background:rgba(10,13,24,.62); border:1px solid rgba(255,255,255,.08); backdrop-filter:blur(20px) }`
- **Liquid Metal Border** (dari LIQUID_METAL_BUTTON.md, diterapkan ke semua border):
  ```css
  @property --lm-angle { syntax:"<angle>"; inherits:false; initial-value:120deg; }
  @keyframes lm-rotate { to { --lm-angle:480deg } }
  .glass-card::before, .liquid-border::before {
    content:""; position:absolute; inset:0; border-radius:inherit; padding:1px;
    background: conic-gradient(from var(--lm-angle),
      rgba(255,255,255,.75), rgba(148,163,184,.12) 22%, rgba(255,255,255,.5) 38%,
      rgba(100,116,139,.1) 55%, rgba(255,255,255,.65) 74%, rgba(148,163,184,.15) 88%, rgba(255,255,255,.75));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    pointer-events:none; animation: lm-rotate 7s linear infinite; z-index:2;
  }
  ```
- `.liquid-header` (navbar): `border-bottom` gradien metalik horizontal via `border-image`
- `.text-outline`: stroke teks `rgba(148,163,184,.28)`, fill transparan (wordmark footer)
- Marquee: `@keyframes marquee-drift` translateX 0→-50%, `.animate-marquee` 46s linear infinite, pause saat hover
- `.pulse-dot`: denyut emerald 2.2s
- Slider range kustom: track gradien cyan→violet, thumb putih glow cyan 16px
- `:focus-visible { outline:2px solid #BCAEFF }`; `prefers-reduced-motion` mematikan semua animasi
- Scrollbar 9px, thumb gradien `#164E63 → #4C1D95`

## 6. Engine 3D — `three/CosmicCanvas.jsx`

Canvas **fixed inset-0 z-0 pointer-events-none**, kamera `fov 55 posisi [0,0,6.5]`, `dpr [1,1.75]`, alpha true. Lima lapis:

1. **AuroraVeil** — plane shader FBM (simplex 4 oktaf), uniform `uTime uIntensity uColorA/B/C`, additive blending, warna lerp 0.04/frame menuju palet aktif, posisi `[0,1.4,-9]`, skala 2.4× viewport
2. **Starfield** — 2.200 titik, twinkle sinus per titik (`uTime`), rotasi Y 0.008 rad/s + parallax pointer (lerp 0.03), densitas via uniform `uDensity`
3. **Meteors** — 70 instanced box, spawn kanan-atas acak, kecepatan `(5+rand*9)*meteorSpeed`, arah kiri-bawah (y × 0.52), rotasi `atan2(0.52,1)`, tiap meteor masuk `meteorLogRef` (throttle 0.35s)
4. **CosmicPlanet** — sphere 96 seg, vertex displacement FBM 0.055, fragment pita nebula + rim fresnel `pow(...,2.0)*2.2`, 2 torus ring (1.55 & 1.85 radius, cyan/violet additive), rotasi mengikuti pointer; di hero posisi `[3.4,-0.6,-4.5]` skala 1.55
5. **CameraDrift** — kamera lerp 0.035 mengikuti pointer ±0.9/±0.55

State suasana: `CosmicContext` (`paletteKey`, `intensity`, `starDensity`, `meteorSpeed` + `settingsRef`, `meteorLogRef`). Palet: `borealis` (hijau), `violet` (default), `sakura` (pink 桜).

## 7. Crystal Trail Cursor — `CrystalTrailCursor.jsx`

Sesuai CRYSTAL_TRAIL_CURSOR_DESIGN.md:

- Canvas `fixed inset-0 z-[6] pointer-events-none`, `data-testid="crystal-cursor"`
- Spawn saat `mousemove` jarak > 4px; jumlah `min(floor(dist/5), 5)`; offset acak ±5px
- Kristal: poligon 3–5 sisi, radius per verteks acak 0.6–1.5, ukuran 4–12px, rotasi awal acak, kecepatan rotasi ±0.05 rad/frame
- Warna: fill `rgba(180,120,255, life*0.1)`, stroke `rgba(180,120,255, life*0.8)`, lineWidth 1
- Umur: `life` 1.0, berkurang 0.01/frame (≈1,6 dtk); maks 500 kristal (200 bila lebar < 768px)
- Clear per frame (`clearRect`), nonaktif total bila `prefers-reduced-motion`

## 8. Struktur Seksi (atas → bawah) & Motion

### 8.1 DockNav (fixed top, z-50, `liquid-header`)
- Masuk: `y:-70→0, opacity 0→1, dur 0.9s delay 0.15s, ease [0.22,1,0.36,1]`; bg `slate-950/40 → /80` saat scroll > 24px
- Kiri: Logo SVG (planet gradien + cincin -18° + bintang; hover rotate 18°) + wordmark `MADU·記録`
- Tengah: **5 ubin ikon magnetik** — Planet(Globe), Scanner(ScanLine), Kuis(ListChecks), Bandingkan(Scale), Destinasi(Rocket); ukuran `h-9 w-9 sm:h-11 sm:w-11`, gradien `#172344→#10162B`, ikon `#BCAEFF`; efek gaussian: `g = exp(-(dx²)/(2·55²))`, `translateY = -12g px`, `scale = 1+0.35g`, glow bila g>0.5; transisi 0.12s saat melacak, pegas `cubic-bezier(.34,1.56,.64,1) 0.45s` saat kursor pergi
- Tooltip label di bawah dock (opacity toggle); titik aktif cyan via IntersectionObserver (`rootMargin -40% 0 -55%`)
- Kanan: pill **"Misi n/3"** → `#destinasi`, dot emerald berdenyut bila 3/3
- testid: `nav-home-link`, `dock-{planets|scanner|kuis|bandingkan|destinasi}`, `dock-tooltip`, `mission-pill`

### 8.2 Hero `#hero` (min-h-screen)
- Badge glass: ikon Orbit + "STIFIn × Tata Surya — Eksplorasi Diri" (delay 0.35s)
- H1 masked reveal 3 baris: `EXPLORE THE PLANETS.` (putih) / `UNDERSTAND YOUR MIND.` (aurora-text) / `DISCOVER WHO YOU ARE.` (putih); tiap baris `y 115%→0`, dur 1.05s, delay 0.45+0.16i, ease `[0.22,1,0.36,1]`, wrapper `overflow-hidden`
- Subjudul (delay 1.15s): ajakan menyelesaikan 3 misi
- CTA (delay 1.35s): **Jelajahi Planet** (gradien lavender→cyan, shine sweep 0.7s, hover glow+lift) → `#planets`; **Ikuti Kuis** (glass) → `#kuis`
- Teks vertikal kanan (`writing-mode:vertical-rl`): `内なる宇宙 — INNER UNIVERSE`
- Indikator scroll: garis 40px dengan segmen cyan jatuh loop 1.6s
- testid: `hero-section`, `hero-badge`, `hero-explore-button`, `hero-quiz-button`, `hero-scroll-indicator`

### 8.3 MarqueeRibbon
- Item: `MERCURY 水星 THINKING` · `VENUS 金星 FEELING` · `EARTH 地球 SENSING` · `JUPITER 木星 INTUITING` · `MARS 火星 INSTING` · `内なる宇宙 DISCOVER`, dipisah ikon Sparkles lavender; duplikasi array untuk loop mulus
- testid: `cosmic-marquee`

### 8.4 Planets `#planets` — "01 — Explore the Planets 惑星"
- Grid 12 kolom: **Venus & Mars besar** (`sm:col-span-6`, orb 84px + narasi), 6 planet lain `lg:col-span-4` (orb 60px), **Pluto bonus** `col-span-12` border putus-putus horizontal
- Kartu = `<button>` glass; hover: `-translate-y-[5px]`, border lavender, shadow `0 18px 50px rgba(130,119,217,.18)`; active `scale .98`; kanji besar `text-white/12 → /25` pojok kanan atas
- Label jenis: `STIFIn type · THINKING/FEELING/SENSING/INTUITING/INSTING` (Mercury/Venus/Earth/Jupiter/Mars), `Dimension · DISCIPLINE/ORIGINALITY/DEPTH` (Saturn/Uranus/Neptune), `Bonus · 冥王星` (Pluto)
- Catatan emas: "pemetaan planet ke STIFIn adalah metafora kreatif, bukan asesmen resmi"
- **Modal profil**: overlay `bg-[#03050C]/80 backdrop-blur-md` + panel `#10162B/95` max-w-lg; masuk `fade+scale .96→1 + y 30→0` 0.4s; isi: orb 92px, kanji, narasi, chips lavender, kutipan (border-l cyan), tombol **Planet Berikutnya** (siklus) & **Tutup**; tutup via ×, klik luar, atau **Escape**
- Membuka planet memanggil `visitPlanet(id)` (misi 1 butuh 3 planet unik)
- testid: `planet-card-{id}`, `planet-modal`, `planet-modal-close`, `planet-modal-next`, `planet-modal-close-btn`

### 8.5 Scanner `#scanner` — "02 — Orbit Scanner 走査"
- SVG orrery `viewBox 0 0 760 440`, pusat (380,220), matahari radial putih→ungu r=10; 8 orbit elips `rx = 62+36i, ry = rx·0.44`, stroke `rgba(190,198,255,.12)`
- Planet digerakkan rAF: `angle += spd · speed · dt`, kecepatan dasar Mercury .9 → Neptune .18; **posisi dihitung langsung saat render** (bukan useMemo atas ref — bug lama "orbit diam")
- Slider kecepatan segmented: `■(0) 0.25x 0.5x 1x(default) 2x 4x` (`SPEEDS = [0,0.25,0.5,1,2,4]`)
- Aturan: `ROUND_TIME 7s`, `TOTAL_ROUNDS 8`, menang bila `≥ WIN_TARGET (5)` terpindai; salah klik memangkas 1.5s; target ditandai ring dashed cyan, hover ring putih; label nama selalu tampil di atas planet
- Panel kanan: aturan, slider, chip planet (hijau emerald bila terpindai), kartu flash identitas+kutipan planet terakhir, badge "Misi ketiga selesai"
- Menang → `setScannerWin(true)` + `toast.success`
- testid: `scanner-canvas`, `scanner-planet-{id}`, `scanner-start-button`, `scanner-target`, `scanner-round`, `scanner-timer`, `scanner-result`, `scanner-speed-slider`, `scanner-chips`, `scanner-win-badge`

### 8.6 Quiz `#kuis` — "03 — Discover Your Inner Universe 発見"
- 15 soal satu-per-satu (AnimatePresence slide x 24px, 0.35s), opsi **A–E tetap** dipetakan `["T","F","S","N","I"]`; tombol opsi ber-border liquid metal, huruf A–E di ubin gradien
- Progress: `Pertanyaan n / 15` + bar gradien
- Selesai → `setQuizResult({top})` + toast; **ResultPanel**: orb 96px, nama+kanji+tipe, catatan tumpang tindih bila selisih 2 teratas ≤1 ("manusia jarang hanya satu orbit"), narasi, 3 kolom (Kekuatan / Pola Berpikir / Perjalanan Bertumbuh), **grafik 5 dimensi** (bar animasi width 0.9s, bar dominan gradien), 3 perspektif (Saturnus/Uranus/Neptunus), aksi: **Ulangi Kuis** (reset state), **Lihat Profil** (scroll ke #planets + toast), **Salin Ringkasan** (clipboard + toast)
- Disclaimer eksploratif di bawah panel
- testid: `quiz-panel`, `quiz-progress`, `quiz-option-{a..e}`, `quiz-result`, `quiz-overlap-note`, `quiz-chart`, `quiz-retry-button`, `quiz-profile-button`, `quiz-copy-button`

### 8.7 Compare `#bandingkan` — "04 — Bandingkan 比較"
- Dua `<select>` (default Mercury vs Mars), ikon ArrowLeftRight di tengah; dua kolom: orb 52px, chips, pola pikir, kutipan
- Paragraf "Cara saling melengkapi" dari `GIFTS` (gift+lensa per planet): template "{A} membawa {giftA}, {B} membawa {giftB}… satu melihat lewat {lensaA}, satu lagi lewat {lensaB}" — netral, tidak ada tipe "lebih baik"
- testid: `compare-select-a/b`, `compare-col-{id}`, `compare-complement`

### 8.8 MaduGate `#destinasi` — "05 — Destinasi MADU 目的地"
- Kiri: 3 baris misi (`mission-row-{planets|quiz|scanner}`) dengan progres (n/3, 1/1), ikon nomor → CheckCircle2 emerald saat selesai; status gerbang (`gate-status`)
- Kanan: **4 kartu kanal** (`channel-card-{sport|layanan|activity|info}`) — MADU SPORT スポーツ, MADU LAYANAN 奉仕, MADU ACTIVITY 活動 (dua-duanya ke kegiatan-pelayanan-madu.vercel.app), MADU INFO 情報
- Terkunci (sampai 3 misi selesai): `<button> opacity-45 grayscale cursor-not-allowed` + badge "Terkunci"; klik → `toast.error` + scroll ke `#planets`. Terbuka: `<a target="_blank">` dengan hover lift
- Pill navbar "Misi n/3" membaca state yang sama

### 8.9 Footer
- Brand + tagline + disclaimer metafora; grid navigasi 5 anchor; **wordmark raksasa outline `MADU記録`** (`text-[19vw] md:text-[12rem] text-outline`); bar bawah `© 2026 MADU Archive — Cosmic Identity`
- testid: `footer-link-{planets|scanner|kuis|bandingkan|destinasi}`

## 9. State Management

- `MissionContext`: `visited[]`, `quizResult`, `scannerWin` → `missions` (3 objek `{id,label,done,progress}`), `doneCount`, `gateOpen`; **tidak ada localStorage** (reset saat refresh, sesuai spesifikasi)
- `CosmicContext`: suasana 3D via `settingsRef` (tanpa re-render per frame)
- Toast: `<Toaster theme="dark" position="bottom-center">` (sonner), style panel `#10162B`

## 10. Motion Global

- **Lenis**: `duration 1.25, smoothWheel true`, loop rAF manual, destroy saat unmount
- **Reveal.jsx** (dipakai semua seksi): `initial {opacity:0, y:32} → whileInView`, `viewport {once:true, margin:-70px}`, `dur 0.9s`, ease `[0.22,1,0.36,1]`, prop `delay`
- Pola hover universal: lift `translateY(-4..5px)` + glow shadow berwarna tema; active `scale .98`
- Semua animasi CSS & kristal nonaktif pada `prefers-reduced-motion`

## 11. index.html

- `<html lang="id">`, title `MADU·記録 — Explore the Planets, Discover Who You Are`, meta description Cosmic Identity, favicon `/favicon.svg` (mark logo), preconnect + 3 font Google, theme-color `#03050C`

## 12. Routing ke AI Assistant (4 prompt berurutan)

1. **Fondasi:** "Terapkan index.css, tailwind.config (fontFamily display/sans/mono), font & meta di index.html, favicon.svg, context CosmicContext.js + MissionContext.jsx — jangan ubah halaman dulu."
2. **Atmosfer:** "Pasang three/CosmicCanvas.jsx (5 lapis sesuai spek bagian 6) sebagai background fixed z-0, CrystalTrailCursor.jsx (bagian 7), Reveal.jsx, dan Lenis di App.js."
3. **Kerangka:** "Buat DockNav.jsx (magnet gaussian bagian 8.1), Hero.jsx (masked reveal 8.2), MarqueeRibbon.jsx, Footer.jsx."
4. **Konten:** "Buat data/planets.js + data/quiz.js, lalu Planets.jsx, Scanner.jsx, Quiz.jsx, Compare.jsx, MaduGate.jsx persis bagian 8.4–8.8 dengan semua testid."

## 13. Checklist Verifikasi 100% Sama

- [ ] Aurora + meteor + planet 3D bergerak; meteor tercatat (Scanner chips menghijau)
- [ ] **Orbit Scanner bergerak** (posisi dihitung saat render, bukan useMemo atas ref)
- [ ] Kuis 15 soal → hasil planet + grafik; misi pill 0/3 → 3/3
- [ ] 3 planet dibuka → misi 1 selesai; scanner menang ≥5 → misi 3 selesai
- [ ] Kanal MADU terkunci (button abu-abu) → terbuka (link) setelah 3 misi; klik terkunci memicu toast + scroll ke #planets
- [ ] Border liquid metal berputar pada semua kartu; garis navbar metalik
- [ ] Jejak kristal lavender mengikuti mouse; hilang pada prefers-reduced-motion
- [ ] Modal planet: Escape/klik luar menutup; "Planet Berikutnya" bersiklus
- [ ] Semua testid bagian 8 ada di DOM
