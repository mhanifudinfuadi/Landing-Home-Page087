# COPY_ROMANTIC.md — Naskah Puitis MADU·記録 (Tanpa Kata "STIFIn")

> Naskah pengganti untuk seluruh caption landing page. Aturan utama:
> 1. **Kata "STIFIn" dihapus total** dari seluruh halaman. Label tipe diganti: `STIFIn type · X` → `Jiwa · X`; `Dimension · X` → `Penjaga · X`; Pluto → `Rahasia · 冥王星`.
> 2. **Mars & Venus adalah bintang utama** (protagonis) — kartu paling besar, badge "★ Bintang Utama", glow lavender permanen, disebut di hero & seksi planet.
> 3. Nada: romantis, dalam, puitis. Planet = cara jiwa mencintai dunia.
> Sudah diterapkan penuh di proyek ini — file ini untuk merutekan perubahan yang sama ke repo Anda.

---

## 1. Hero

- Badge: `Dua Bintang · Satu Langit — Eksplorasi Diri`
- H1 (3 baris):
  - `EVERY HEART HAS AN ORBIT.`
  - `EVERY SOUL HAS A LIGHT.` (gradien aurora)
  - `DISCOVER WHO YOU ARE.`
- Subjudul: `Di antara sembilan cahaya ini ada satu yang berdenyut dengan ritmemu. Mars dan Venus — sang pejuang dan sang kekasih — akan menunjukkan jalan.`
- CTA: `Mulai Perjalanan` (#planets) · `Temukan Planetmu` (#kuis)
- Teks vertikal: `内なる宇宙 — INNER UNIVERSE`

## 2. Marquee

`MARS 火星 SANG PEJUANG` · `VENUS 金星 SANG KEKASIH` · `EVERY HEART HAS AN ORBIT` · `内なる宇宙 INNER UNIVERSE` · `SEMBILAN CAHAYA 惑星` · `MERCURY · EARTH · JUPITER · SATURN · URANUS · NEPTUNE · PLUTO`

## 3. Seksi Planet (01 — Sembilan Cahaya 惑星)

- H2: `Setiap planet adalah cara jiwa mencintai dunia.`
- Sub: `Klik cahaya mana pun untuk mendengar kisahnya. Mars dan Venus menunggumu paling depan — dua bintang utama langit ini.`
- Catatan emas: `Kisah-kisah ini puisi, bukan diagnosis — cermin untuk berkaca, bukan kotak untuk membatasi.`
- Tombol kartu: `Dengar Kisahnya` · Tombol modal: `Kisah Berikutnya` / `Tutup`

### Profil planet (identity — narasi — kutipan)

- **Mercury 水星 · Jiwa · THINKING** — *Yang Berpikir dalam Diam*: "Paling dekat dengan matahari, namun jarang terlihat — seperti pikiran terdalammu: cepat, jernih, dan setia menemukan jalan bahkan di siang yang paling terang." — “Keheningan yang berpikir adalah doa yang paling jujur.”
- **Venus 金星 · Jiwa · FEELING ★** — *Sang Kekasih Fajar*: "Bintang pertama yang berani menyalakan dirinya saat senja turun. Venus mencintai lebih dulu, lebih dalam, dan lebih lama dari yang sanggup langit hitung." — “Mencintai adalah orbit yang tidak pernah meminta pulang.”
- **Earth 地球 · Jiwa · SENSING** — *Yang Menjaga Api Rumah*: "Satu-satunya planet yang berani menampung kehidupan. Earth adalah tangan yang menggenggam tanah dengan erat, agar mimpi tidak melayang terlalu jauh." — “Cinta yang paling tulus adalah yang rela menjadi tanah.”
- **Mars 火星 · Jiwa · INSTING ★** — *Sang Pejuang yang Rindu*: "Merahnya bukan amarah, melainkan rindu yang menyala. Mars berlari paling kencang bukan untuk pergi — melainkan untuk membuktikan bahwa jarak bisa dikalahkan." — “Keberanian adalah rindu yang memilih untuk tetap tinggal.”
- **Jupiter 木星 · Jiwa · INTUITING** — *Sang Pemimpi yang Luas*: "Paling besar, paling lapang — Jupiter memeluk puluhan bulan tanpa pernah merasa sempit. Begitu pula jiwamu: selalu ada ruang untuk satu mimpi lagi." — “Hati yang luas tidak pernah kehabisan langit.”
- **Saturn 土星 · Penjaga · DISCIPLINE** — *Sang Penjaga Janji*: "Cincinnya adalah janji yang tidak pernah putus. Keteraturan bukan rantai — melainkan cara cinta bertahan paling lama." — “Yang bertahan paling lama bukan yang paling terang, melainkan yang paling konsisten.”
- **Uranus 天王星 · Penjaga · ORIGINALITY** — *Sang Pemberontak Lembut*: "Satu-satunya planet yang memilih berputar miring — bukan karena melawan, tetapi karena ia lahir dengan sudut pandangnya sendiri." — “Menjadi berbeda adalah cara paling jujur untuk menjadi diri sendiri.”
- **Neptune 海王星 · Penjaga · DEPTH** — *Sang Penyair Laut Dalam*: "Paling jauh, paling biru, paling dalam. Neptunus menyimpan samudra yang tak terlihat — seperti perasaanmu yang hanya bisa dibaca oleh mereka yang sabar menyelam." — “Perasaan terdalam tidak pernah berteriak; ia menunggu untuk ditemukan.”
- **Pluto 冥王星 · Rahasia** — *Yang Setia dari Kejauhan*: "Dicoret dari daftar, tetapi tidak pernah berhenti mengorbit. Nilai sebuah cahaya tidak ditentukan oleh siapa yang menghitungnya." — “Yang tersisih pun tetap mengelilingi cintanya.”

Kekuatan/pola/pertumbuhan tiap planet (untuk hasil kuis) ada lengkap di `src/data/planets.js`.

## 4. Orbit Scanner (02 — 走査)

- H2: `Tangkap cahayanya sebelum ia berlalu.`
- Aturan: `8 putaran — tangkap 5 cahaya untuk menang` · `Setiap cahaya hanya singgah 7 detik` · `Menangkan, dan satu pintu langit terbuka`
- Label target: `Tangkap: {Planet}` · Chip: `Cahaya tertangkap — n`
- Menang: `Langit mengakuimu — kamu menang!` · Kalah: `Tertangkap n/8 — cahaya masih menunggu.`
- Tombol: `Mulai Menangkap` / `Tangkap Lagi` · Badge menang: `Satu pintu langit terbuka`

## 5. Kuis (03 — Temukan Planetmu 発見)

- H2: `Lima belas pertanyaan, satu jawaban di dadamu.`
- Sub: `Jawablah dengan jujur — bukan yang paling baik, melainkan yang paling kamu. Tidak ada jawaban yang salah di langit ini.`
- Hasil — eyebrow: `Planetmu`; catatan tumpang tindih: `Dua cahaya di dadamu hampir sama terang — wajar, jiwa jarang hanya satu orbit.`
- Kolom: `Cahayamu` / `Caramu Mencintai` / `Perjalananmu`
- Tombol: `Ulangi Perjalanan` · `Lihat Planetmu` · `Abadikan Kisah`
- Disclaimer: `Ini cermin puisi, bukan vonis — kamu selalu lebih luas dari jawaban mana pun.`

## 6. Bandingkan (04 — Dua Orbit 比較)

- H2: `Dua orbit tak pernah bertabrakan — mereka saling menunggu.`
- Sub: `Tidak ada cahaya yang lebih tinggi. Hanya cara mencintai yang berbeda, saling menggenapkan.`
- Paragraf penggenap: `{A} membawa {giftA}; {B} membawa {giftB}. Saat keduanya berbagi langit, satu melihat lewat {lensaA}, satu lagi lewat {lensaB} — dan cinta menjadi utuh.`
- Gift: Mercury "kejernihan berpikir"/nalar yang tenang · Venus "keberanian untuk mencintai lebih dulu"/hati · Earth "pijakan yang tidak pernah goyah"/perbuatan nyata · Jupiter "langit mimpi yang tak bertepi"/kemungkinan · Mars "api yang menolak padam"/perjuangan

## 7. Destinasi MADU (05 — Gerbang Cahaya 目的地)

- H2: `Selesaikan tiga perjalanan, empat pintu terbuka.`
- Sub: `Cahaya menyambut jiwa yang tekun — selesaikan misimu, dan keempat kanal MADU akan menyala untukmu.`
- Misi: `Dengarkan 3 kisah planet` · `Temukan planetmu (kuis)` · `Taklukkan Orbit Scanner`
- Status: terkunci `Gerbang menunggu ketekunanmu` · terbuka `Gerbang menyala — selamat datang, penjelajah.`
- Toast terkunci: `Pintunya masih tertutup — selesaikan {n} perjalanan lagi.`

## 8. Footer

- Tagline: `Setiap hati punya orbitnya. Temukan cahayamu — lalu lanjutkan perjalanan ke empat kanal MADU.`
- Disclaimer: `Kisah planet di laman ini adalah metafora puitis, bukan asesmen psikologis.`
- Bar bawah: `内なる宇宙 Tidak ada jiwa yang tersesat di langit ini`
