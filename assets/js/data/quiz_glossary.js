// Data 10 Soal Kuis Resmi Modul 1 & Glosarium GrafikaKu (Relevan dengan TP 1, TP 2, TP 3)
const quizDataModul1 = [
    {
    id: 1,
    tp: "TP 1: Prinsip Dasar Desain",
    level: "C2 (Pemahaman)",
    question: "Prinsip desain yang menata agar bobot visual terbagi secara wajar dan tidak terasa berat sebelah tanpa tujuan dinamakan...",
    options: [
      { key: "A", text: "Unity (Kesatuan)" },
      { key: "B", text: "Balance (Keseimbangan)" },
      { key: "C", text: "Emphasis (Penekanan)" },
      { key: "D", text: "Rhythm (Irama)" }
    ],
    answer: "B",
    explanation: "Balance (Keseimbangan) adalah pembagian bobot visual agar susunan tidak terasa berat sebelah. Keseimbangan dapat dicapai secara simetris maupun asimetris."
  },
    {
    id: 2,
    tp: "TP 1: Prinsip Dasar Desain",
    level: "C4 (Analisis Kasus)",
    question: "Ketika poster memiliki satu judul utama yang berukuran paling besar dan memiliki warna paling mencolok sehingga langsung menarik pandangan pertama pembaca, prinsip yang diterapkan adalah...",
    options: [
      { key: "A", text: "Repetition (Repetisi)" },
      { key: "B", text: "White Space (Ruang Kosong)" },
      { key: "C", text: "Proportion (Proporsi)" },
      { key: "D", text: "Emphasis (Penekanan / Pusat Perhatian)" }
    ],
    answer: "D",
    explanation: "Emphasis (Penekanan) berfungsi menentukan elemen mana yang menjadi fokus utama atau pintu masuk pertama perhatian mata pembaca (focal point)."
  },
    {
    id: 3,
    tp: "TP 1: Prinsip Dasar Desain",
    level: "C2 (Pemahaman)",
    question: "Pengulangan bentuk geometris, warna tema, dan gaya ikon yang konsisten di seluruh bagian media agar terasa sebagai satu kesatuan utuh mencerminkan prinsip...",
    options: [
      { key: "A", text: "Unity (Kesatuan)" },
      { key: "B", text: "Contrast (Kontras)" },
      { key: "C", text: "Asimetri" },
      { key: "D", text: "White Space" }
    ],
    answer: "A",
    explanation: "Unity (Kesatuan) membuat poster terasa sebagai satu kesatuan utuh melalui konsistensi gaya gambar, palet warna terpadu, dan perataan yang selaras."
  },
    {
    id: 4,
    tp: "TP 1: Prinsip Dasar Desain",
    level: "C3 (Penerapan Hierarki)",
    question: "Pengurutan tingkat kepentingan teks mulai dari Judul Utama (besar), Subjudul (sedang), hingga Paragraf Keterangan (kecil) agar pembaca dapat memindai informasi dengan mudah disebut prinsip...",
    options: [
      { key: "A", text: "White Space" },
      { key: "B", text: "Simetri" },
      { key: "C", text: "Hierarchy (Hierarki Visual)" },
      { key: "D", text: "Noise" }
    ],
    answer: "C",
    explanation: "Hierarki visual mengatur urutan pembacaan informasi berdasarkan tingkat kepentingan pesan melalui variasi ukuran, ketebalan jenis huruf, dan posisi."
  },
    {
    id: 5,
    tp: "TP 1: Prinsip Dasar Desain",
    level: "C3 (Penerapan Kontras)",
    question: "Perbedaan tajam antara warna latar belakang gelap (navy pekat) dan teks warna kuning terang untuk memastikan keterbacaan yang optimal merupakan penerapan prinsip...",
    options: [
      { key: "A", text: "Proportion (Proporsi)" },
      { key: "B", text: "Contrast (Kontras)" },
      { key: "C", text: "White Space" },
      { key: "D", text: "Rhythm" }
    ],
    answer: "B",
    explanation: "Contrast (Kontras) menciptakan perbedaan visual yang jelas antarunsur yang berdampingan, mencegah kebosanan visual dan menjamin teks mudah terbaca."
  },
    {
    id: 6,
    tp: "TP 1: Prinsip Dasar Desain",
    level: "C2 (Pemahaman Ruang)",
    question: "Area kosong atau jeda tanpa gambar maupun teks yang sengaja dibiarkan agar desain terasa bernapas, teratur, dan tidak sesak disebut...",
    options: [
      { key: "A", text: "Emphasis" },
      { key: "B", text: "Balance" },
      { key: "C", text: "Composition" },
      { key: "D", text: "White Space (Ruang Negatif/Kosong)" }
    ],
    answer: "D",
    explanation: "White Space (ruang kosong/negatif) memberi jeda visual bagi mata, memisahkan antarkelompok informasi, dan mencegah kekacauan tampilan."
  },
    {
    id: 7,
    tp: "TP 1: Prinsip Dasar Desain",
    level: "C2 (Pemahaman Proporsi)",
    question: "Kesesuaian perbandingan ukuran antar-elemen (misalnya proporsi ukuran foto kepala manusia terhadap tubuh, atau proporsi logo terhadap bidang poster) diatur oleh prinsip...",
    options: [
      { key: "A", text: "Proportion (Proporsi / Skala)" },
      { key: "B", text: "Unity" },
      { key: "C", text: "Repetition" },
      { key: "D", text: "Komunikan" }
    ],
    answer: "A",
    explanation: "Proportion (Proporsi) adalah hubungan perbandingan ukuran antarelemen atau antara elemen dengan keseluruhan bidang desain agar harmonis."
  },
    {
    id: 8,
    tp: "TP 2: Perangkat Lunak & SOP Grafis",
    level: "C3 (Penerapan Prosedur SOP)",
    question: "Dalam alur SOP pembuatan dokumen pada software grafis, sebelum melakukan ekspor akhir ke format .PNG (1080 x 1350 px), langkah penting yang wajib dilakukan untuk menjamin keamanan proyek kerja adalah...",
    options: [
      { key: "A", text: "Menghapus seluruh layer teks dan panduan grid" },
      { key: "B", text: "Mengubah resolusi layar menjadi hitam putih" },
      { key: "C", text: "Menyimpan berkas master proyek (.PSD / .CDR) secara berkala" },
      { key: "D", text: "Memperbesar ukuran objek hingga keluar batas artboard" }
    ],
    answer: "C",
    explanation: "SOP baku industri dan lab SMK mewajibkan penyimpanan berkas kerja master (.PSD/.CDR) dengan layer utuh sebelum diekspor ke format siap pakai (.PNG/.JPG) agar dapat diedit kembali."
  },
    {
    id: 9,
    tp: "TP 1: Prinsip Dasar Desain",
    level: "C2 (Pemahaman Tata Letak)",
    question: "Pengaturan tata letak dan penataan menyeluruh seluruh unsur desain dalam satu bidang gambar agar pesan tersampaikan secara logis dan terpadu disebut...",
    options: [
      { key: "A", text: "Emphasis" },
      { key: "B", text: "Composition (Komposisi)" },
      { key: "C", text: "Simetri" },
      { key: "D", text: "Noise" }
    ],
    answer: "B",
    explanation: "Composition (Komposisi) adalah pengaturan keseluruhan unsur dalam bidang gambar untuk memandu urutan pandang pembaca secara efektif."
  },
    {
    id: 10,
    tp: "TP 3: Komunikasi Visual",
    level: "C4 (Analisis Alur Komunikasi)",
    question: "Dalam alur proses komunikasi grafis (Komunikator &rarr; Pesan &rarr; Media &rarr; Komunikan), pihak yang bertindak sebagai sasaran penerima, pembaca, dan penafsir pesan visual disebut...",
    options: [
      { key: "A", text: "Komunikator (Desainer / Klien)" },
      { key: "B", text: "Media Grafis" },
      { key: "C", text: "Pesan Visual" },
      { key: "D", text: "Komunikan (Audience / Target Pembaca)" }
    ],
    answer: "D",
    explanation: "Komunikan adalah target pembaca atau masyarakat yang menerima, melihat, dan menginterpretasikan pesan visual yang dibuat oleh komunikator melalui media."
  }
];

const glossaryData = [
  {
    term: "Unity (Kesatuan)",
    moduleScope: "Modul 1: Prinsip Dasar Desain",
    category: "Prinsip Desain (TP 1)",
    desc: "Keterpaduan hubungan harmonis antarunsur desain sehingga seluruh bagian tampak menyatu sebagai satu karya utuh yang saling mendukung.",
    example: "Penggunaan palet warna brand yang konsisten dan gaya ilustrasi vektor yang sama di seluruh materi poster."
  },
  {
    term: "Balance (Keseimbangan)",
    moduleScope: "Modul 1: Prinsip Dasar Desain",
    category: "Prinsip Desain (TP 1)",
    desc: "Pembagian bobot visual agar susunan tidak terasa berat sebelah. Dibagi menjadi Keseimbangan Simetris (formal) dan Asimetris (dinamis).",
    example: "Sebuah elemen gambar besar di sebelah kiri diimbangi oleh judul tebal dan blok teks di sebelah kanan (keseimbangan asimetris)."
  },
  {
    term: "Composition (Komposisi)",
    moduleScope: "Modul 1: Prinsip Dasar Desain",
    category: "Prinsip Desain (TP 1)",
    desc: "Pengaturan dan penataan menyeluruh letak unsur-unsur dalam bidang gambar agar memandu pandangan mata pembaca secara alami dan logis.",
    example: "Menata layout dengan aturan sepertiga (Rule of Thirds) dan grid layout untuk menjaga keteraturan."
  },
  {
    term: "Proportion (Proporsi)",
    moduleScope: "Modul 1: Prinsip Dasar Desain",
    category: "Prinsip Desain (TP 1)",
    desc: "Perbandingan ukuran antara satu unsur dengan unsur lainnya atau dengan keseluruhan bidang media agar tampak wajar dan proporsional.",
    example: "Ukuran tombol aksi (Call-To-Action) yang seimbang dengan ukuran kartu informasi tanpa membuatnya terdistorsi."
  },
  {
    term: "Rhythm (Irama / Gerak)",
    moduleScope: "Modul 1: Prinsip Dasar Desain",
    category: "Prinsip Desain (TP 1)",
    desc: "Pola pengulangan unsur secara teratur atau bervariasi yang mengarahkan gerak pandang mata penikmat desain dari satu elemen ke elemen berikutnya.",
    example: "Deretan ikon langkah kerja 1, 2, dan 3 yang dihubungkan oleh garis putus-putus berirama mengalir."
  },
  {
    term: "Emphasis (Penekanan)",
    moduleScope: "Modul 1: Prinsip Dasar Desain",
    category: "Prinsip Desain (TP 1)",
    desc: "Titik pusat perhatian utama (focal point) dalam karya yang sengaja dibuat paling mencolok untuk menarik pandangan mata pertama kali.",
    example: "Memberi ukuran jauh lebih besar dan warna jingga menyala pada kata 'DISKON 70%' di antara teks deskripsi abu-abu."
  },
  {
    term: "Contrast (Kontras)",
    moduleScope: "Modul 1: Prinsip Dasar Desain",
    category: "Prinsip Desain (TP 1)",
    desc: "Perbedaan tajam dan mencolok antara dua unsur visual yang berdampingan guna menegaskan hierarki dan menjamin keterbacaan (readability).",
    example: "Teks putih tebal di atas latar belakang biru navy gelap yang memenuhi standar kontras WCAG AA."
  },
  {
    term: "Repetition (Repetisi)",
    moduleScope: "Modul 1: Prinsip Dasar Desain",
    category: "Prinsip Desain (TP 1)",
    desc: "Pengulangan unsur visual tertentu (warna, bentuk, garis, tekstur) secara berkala untuk memperkuat ritme dan konsistensi identitas visual.",
    example: "Format bullet point berbentuk segi enam yang digunakan konsisten pada setiap bab lembar kerja."
  },
  {
    term: "White Space (Ruang Negatif)",
    moduleScope: "Modul 1: Prinsip Dasar Desain",
    category: "Prinsip Desain (TP 1)",
    desc: "Area kosong tanpa teks atau gambar yang sengaja dibiarkan melingkupi elemen penting agar karya memiliki jeda nafas dan tidak terasa penuh sesak.",
    example: "Jarak margin lebar di tepi halaman majalah yang memisahkan teks artikel dari tepi kertas."
  },
  {
    term: "Toolbox & Layer",
    moduleScope: "Modul 2: Software Desain Grafis",
    category: "Perangkat Lunak & SOP (TP 2)",
    desc: "Toolbox berisi alat kerja esensial (Selection, Pen, Shape, Type), sedangkan Panel Layer mengatur tumpukan bidang gambar secara terpisah.",
    example: "Menempatkan teks judul di atas layer bentuk tumbler agar teks tidak tertutup objek lain."
  },
  {
    term: "Format Berkas Master vs Ekspor",
    moduleScope: "Modul 2: Software Desain Grafis",
    category: "Perangkat Lunak & SOP (TP 2)",
    desc: "Berkas master (.PSD/.CDR) menyimpan seluruh layer yang dapat diedit, sedangkan format ekspor (.PNG/.PDF) adalah hasil final siap tampil/cetak.",
    example: "Menyimpan file master 'M2_Tumbler.psd' lalu mengekspor gambar final 'M2_Tumbler.png' (1080 x 1350 px)."
  },
  {
    term: "Komunikator",
    moduleScope: "Modul 3: Komunikasi Visual",
    category: "Alur Komunikasi (TP 3)",
    desc: "Pihak yang memprakarsai komunikasi atau desainer/klien yang memiliki ide, gagasan, atau pesan yang ingin disampaikan.",
    example: "Panitia pameran sekolah yang ingin mengundang siswa hadir ke acara grafika tahunan."
  },
  {
    term: "Pesan (Message)",
    moduleScope: "Modul 3: Komunikasi Visual",
    category: "Alur Komunikasi (TP 3)",
    desc: "Gagasan, informasi, instruksi, atau ajakan yang telah diolah ke dalam bentuk visual (teks, simbol, tipografi, warna, dan foto).",
    example: "Informasi tanggal, jam, tema karya, dan cara mendaftar pameran grafika."
  },
  {
    term: "Media (Channel)",
    moduleScope: "Modul 3: Komunikasi Visual",
    category: "Alur Komunikasi (TP 3)",
    desc: "Saluran fisik atau digital tempat karya grafis disajikan untuk menjangkau komunikan secara efektif.",
    example: "Poster digital Instagram, spanduk cetak vinyl, standing banner, atau brosur cetak lipat tiga."
  },
  {
    term: "Komunikan (Audience)",
    moduleScope: "Modul 3: Komunikasi Visual",
    category: "Alur Komunikasi (TP 3)",
    desc: "Pihak sasaran pembaca atau masyarakat luas yang menerima, melihat, membaca, dan merespons pesan visual yang disampaikan.",
    example: "Siswa-siswi SMK jurusan DKV dan masyarakat umum pecinta seni grafis."
  }
];
