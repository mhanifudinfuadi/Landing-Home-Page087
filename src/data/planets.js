export const PLANETS = [
    {
        id: "mercury", name: "Mercury", jp: "水星", kind: "stifin", type: "THINKING",
        identity: "Yang Berpikir dalam Diam",
        narrative: "Paling dekat dengan matahari, namun jarang terlihat — seperti pikiran terdalammu: cepat, jernih, dan setia menemukan jalan bahkan di siang yang paling terang.",
        chips: ["Jernih", "Tajam", "Tenang"],
        quote: "Keheningan yang berpikir adalah doa yang paling jujur.",
        strengths: ["Melihat inti persoalan saat orang lain baru melihat permukaannya", "Kata-katamu jarang, tetapi selalu jatuh di tempat yang tepat", "Keteguhan yang tidak butuh tepuk tangan"],
        pattern: "Kamu mencintai lewat kejelasan — memahami dulu, baru memercayai.",
        growth: "Belajarlah bahwa beberapa hal indah justru tidak bisa dijelaskan.",
        grad: ["#8EDCF4", "#4C7DD9"], orbit: { rx: 62, spd: 0.9, size: 5 },
    },
    {
        id: "venus", name: "Venus", jp: "金星", kind: "stifin", type: "FEELING",
        identity: "Eternal Beauty", big: true, star: true,
        narrative: "Bintang pertama yang berani menyalakan dirinya saat senja turun. Venus mencintai lebih dulu, lebih dalam, dan lebih lama dari yang sanggup langit hitung.",
        chips: ["Lembut", "Setia", "Berani Mencintai"],
        quote: "Mencintai adalah orbit yang tidak pernah meminta pulang.",
        strengths: ["Kehangatan yang membuat orang asing merasa pulang", "Kesetiaan yang tidak diumumkan, hanya dibuktikan", "Kepekaan membaca hati yang bahkan belum berbicara"],
        pattern: "Kamu mencintai lewat kehadiran — hadir dulu, bertanya kemudian.",
        growth: "Simpanlah sebagian kehangatanmu untuk dirimu sendiri.",
        grad: ["#E8A8D8", "#BCAEFF"], orbit: { rx: 98, spd: 0.7, size: 8 },
    },
    {
        id: "earth", name: "Earth", jp: "地球", kind: "stifin", type: "SENSING",
        identity: "Yang Menjaga Api Rumah",
        narrative: "Satu-satunya planet yang berani menampung kehidupan. Earth adalah tangan yang menggenggam tanah dengan erat, agar mimpi tidak melayang terlalu jauh.",
        chips: ["Membumi", "Sabar", "Dapat Diandalkan"],
        quote: "Cinta yang paling tulus adalah yang rela menjadi tanah.",
        strengths: ["Keteguhan yang membuat orang berani bersandar", "Kerja sunyi yang tidak pernah meminta panggung", "Ingatan pada hal-hal kecil yang berarti"],
        pattern: "Kamu mencintai lewat perbuatan — bukti-bukti kecil, setiap hari.",
        growth: "Izinkan sesekali kakimu meninggalkan tanah; langit tidak semenakutkan itu.",
        grad: ["#9BE3C0", "#4C9E7A"], orbit: { rx: 134, spd: 0.6, size: 8 },
    },
    {
        id: "mars", name: "Mars", jp: "火星", kind: "stifin", type: "INSTING",
        identity: "Burning Passion", big: true, star: true,
        narrative: "Merahnya bukan amarah, melainkan rindu yang menyala. Mars berlari paling kencang bukan untuk pergi — melainkan untuk membuktikan bahwa jarak bisa dikalahkan.",
        chips: ["Berani", "Membara", "Pantang Pergi"],
        quote: "Keberanian adalah rindu yang memilih untuk tetap tinggal.",
        strengths: ["Nyali yang menyalakan orang-orang di sekitarmu", "Kecepatan bertindak saat yang lain masih ragu", "Hati yang gagal seribu kali dan bangkit seribu satu"],
        pattern: "Kamu mencintai lewat perjuangan — mendahulukan luka daripada penyesalan.",
        growth: "Pejuang terhebat tahu kapan berhenti; pelukan juga sebuah kemenangan.",
        grad: ["#F0A08A", "#D95F4C"], orbit: { rx: 170, spd: 0.5, size: 7 },
    },
    {
        id: "jupiter", name: "Jupiter", jp: "木星", kind: "stifin", type: "INTUITING",
        identity: "Sang Pemimpi yang Luas",
        narrative: "Paling besar, paling lapang — Jupiter memeluk puluhan bulan tanpa pernah merasa sempit. Begitu pula jiwamu: selalu ada ruang untuk satu mimpi lagi.",
        chips: ["Lapang", "Optimis", "Visioner"],
        quote: "Hati yang luas tidak pernah kehabisan langit.",
        strengths: ["Melihat cahaya jauh sebelum orang lain melihat fajar", "Memberi orang alasan untuk berani bermimpi", "Lapang dada yang menampung badai orang lain"],
        pattern: "Kamu mencintai lewat kemungkinan — melihat versi terbaik seseorang, lalu menuntunnya ke sana.",
        growth: "Mimpi besar butuh langkah kecil; jangan pernah malu pada keduanya.",
        grad: ["#E8C68E", "#C98E4C"], orbit: { rx: 206, spd: 0.35, size: 12 },
    },
    {
        id: "saturn", name: "Saturn", jp: "土星", kind: "dimension", type: "DISCIPLINE",
        identity: "Sang Penjaga Janji",
        narrative: "Cincinnya adalah janji yang tidak pernah putus. Saturnus mengajarkan bahwa keteraturan bukanlah rantai — melainkan cara cinta bertahan paling lama.",
        chips: ["Setia pada Janji", "Teratur", "Sabar"],
        quote: "Yang bertahan paling lama bukan yang paling terang, melainkan yang paling konsisten.",
        grad: ["#D9C89B", "#A08E5F"], orbit: { rx: 242, spd: 0.28, size: 10, ring: true },
    },
    {
        id: "uranus", name: "Uranus", jp: "天王星", kind: "dimension", type: "ORIGINALITY",
        identity: "Sang Pemberontak Lembut",
        narrative: "Satu-satunya planet yang memilih berputar miring — bukan karena melawan, tetapi karena ia lahir dengan sudut pandangnya sendiri.",
        chips: ["Asli", "Berbeda", "Berani Sendiri"],
        quote: "Menjadi berbeda adalah cara paling jujur untuk menjadi diri sendiri.",
        grad: ["#8EDCF4", "#5FA8C9"], orbit: { rx: 278, spd: 0.22, size: 9 },
    },
    {
        id: "neptune", name: "Neptune", jp: "海王星", kind: "dimension", type: "DEPTH",
        identity: "Sang Penyair Laut Dalam",
        narrative: "Paling jauh, paling biru, paling dalam. Neptunus menyimpan samudra yang tak terlihat — seperti perasaanmu yang hanya bisa dibaca oleh mereka yang sabar menyelam.",
        chips: ["Dalam", "Imajinatif", "Reflektif"],
        quote: "Perasaan terdalam tidak pernah berteriak; ia menunggu untuk ditemukan.",
        grad: ["#8277D9", "#4C4C9B"], orbit: { rx: 314, spd: 0.18, size: 9 },
    },
    {
        id: "pluto", name: "Pluto", jp: "冥王星", kind: "bonus", type: "BONUS",
        identity: "Yang Setia dari Kejauhan",
        narrative: "Dicoret dari daftar, tetapi tidak pernah berhenti mengorbit. Pluto mengingatkan kita: nilai sebuah cahaya tidak ditentukan oleh siapa yang menghitungnya.",
        chips: ["Tabah", "Misterius", "Abadi"],
        quote: "Yang tersisih pun tetap mengelilingi cintanya.",
        grad: ["#A6AEC9", "#6B7390"], orbit: { rx: 350, spd: 0.14, size: 4 },
    },
];

export const STIFIN_PLANETS = PLANETS.filter((p) => p.kind === "stifin");

export const TYPE_TO_PLANET = { T: "mercury", F: "venus", S: "earth", N: "jupiter", I: "mars" };

export const GIFTS = {
    mercury: { gift: "kejernihan berpikir", lensa: "nalar yang tenang" },
    venus: { gift: "keberanian untuk mencintai lebih dulu", lensa: "hati" },
    earth: { gift: "pijakan yang tidak pernah goyah", lensa: "perbuatan nyata" },
    jupiter: { gift: "langit mimpi yang tak bertepi", lensa: "kemungkinan" },
    mars: { gift: "api yang menolak padam", lensa: "perjuangan" },
};

export const PERSPECTIVES = [
    { planet: "Saturnus", text: "Sang Penjaga Janji berbisik: cinta yang abadi dibangun dari janji-janji kecil yang ditepati." },
    { planet: "Uranus", text: "Sang Pemberontak Lembut menambahkan: caramu yang berbeda dalam mencintai bukanlah kesalahan — itu tanda tanganmu." },
    { planet: "Neptunus", text: "Sang Penyair Laut Dalam menutup kisah: sisakan kedalaman yang hanya untukmu; misteri adalah bagian dari cahaya." },
];
