// Data 10 Soal Kuis Resmi Modul 1 & Glosarium GrafikaKu
const quizDataModul1 = [
  {
    id: 1,
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
    question: "Ketika poster memiliki satu judul utama yang berukuran paling besar dan memiliki warna paling mencolok sehingga langsung menarik pandangan pertama pembaca, prinsip yang diterapkan adalah...",
    options: [
      { key: "A", text: "Emphasis (Penekanan / Pusat Perhatian)" },
      { key: "B", text: "Repetition (Repetisi)" },
      { key: "C", text: "White Space (Ruang Kosong)" },
      { key: "D", text: "Proportion (Proporsi)" }
    ],
    answer: "A",
    explanation: "Emphasis (Penekanan) berfungsi menentukan elemen mana yang menjadi fokus utama atau pintu masuk pertama perhatian mata pembaca (focal point)."
  },
  {
    id: 3,
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
    question: "Pengurutan tingkat kepentingan teks mulai dari Judul Utama (besar), Subjudul (sedang), hingga Paragraf Keterangan (kecil) agar pembaca dapat memindai informasi dengan mudah disebut prinsip...",
    options: [
      { key: "A", text: "Hierarchy (Hierarki Visual)" },
      { key: "B", text: "White Space" },
      { key: "C", text: "Simetri" },
      { key: "D", text: "Noise" }
    ],
    answer: "A",
    explanation: "Hierarki visual mengatur urutan pembacaan informasi berdasarkan tingkat kepentingan pesan melalui variasi ukuran, ketebalan jenis huruf, dan posisi."
  },
  {
    id: 5,
    question: "Perbedaan tajam antara warna latar belakang gelap (navy pekat) dan teks warna kuning terang untuk memastikan keterbacaan yang optimal merupakan penerapan prinsip...",
    options: [
      { key: "A", text: "Contrast (Kontras)" },
      { key: "B", text: "Proportion (Proporsi)" },
      { key: "C", text: "White Space" },
      { key: "D", text: "Rhythm" }
    ],
    answer: "A",
    explanation: "Contrast (Kontras) menciptakan perbedaan visual yang jelas antarunsur yang berdampingan, mencegah kebosanan visual dan menjamin teks mudah terbaca."
  },
  {
    id: 6,
    question: "Area kosong atau jeda tanpa gambar maupun teks yang sengaja dibiarkan agar desain terasa bernapas, teratur, dan tidak sesak disebut...",
    options: [
      { key: "A", text: "White Space (Ruang Negatif/Kosong)" },
      { key: "B", text: "Emphasis" },
      { key: "C", text: "Balance" },
      { key: "D", text: "Composition" }
    ],
    answer: "A",
    explanation: "White Space (ruang kosong/negatif) memberi jeda visual bagi mata, memisahkan antarkelompok informasi, dan mencegah kekacauan tampilan."
  },
  {
    id: 7,
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
    question: "Pengulangan unsur visual dengan pola teratur atau berirama yang memandu alur gerak mata secara luwes dari satu sisi ke sisi lain dinamakan prinsip...",
    options: [
      { key: "A", text: "Rhythm (Irama / Gerak)" },
      { key: "B", text: "Contrast" },
      { key: "C", text: "Komunikator" },
      { key: "D", text: "White Space" }
    ],
    answer: "A",
    explanation: "Rhythm (Irama) menciptakan kesan alur gerak pandang mata melalui pengulangan bentuk, jarak, atau ritme warna yang dinamis dan teratur."
  },
  {
    id: 9,
    question: "Pengaturan tata letak dan penataan menyeluruh seluruh unsur desain dalam satu bidang gambar agar pesan tersampaikan secara logis dan terpadu disebut...",
    options: [
      { key: "A", text: "Composition (Komposisi)" },
      { key: "B", text: "Emphasis" },
      { key: "C", text: "Simetri" },
      { key: "D", text: "Noise" }
    ],
    answer: "A",
    explanation: "Composition (Komposisi) adalah pengaturan keseluruhan unsur dalam bidang gambar untuk memandu urutan pandang pembaca secara efektif."
  },
  {
    id: 10,
    question: "Dalam alur proses komunikasi grafis (Komunikator &rarr; Pesan &rarr; Media &rarr; Komunikan), pihak yang bertindak sebagai penerima, pembaca, dan penafsir pesan visual disebut...",
    options: [
      { key: "A", text: "Komunikan (Audience / Target Pembaca)" },
      { key: "B", text: "Komunikator (Desainer / Klien)" },
      { key: "C", text: "Media Grafis" },
      { key: "D", text: "Pesan Visual" }
    ],
    answer: "A",
    explanation: "Komunikan adalah target pembaca atau masyarakat yang menerima, melihat, dan menginterpretasikan pesan visual yang dibuat oleh komunikator melalui media."
  }
];

const glossaryData = [
  {
    term: "Unity (Kesatuan)",
    category: "Prinsip Desain",
    desc: "Keterpaduan hubungan harmonis antarunsur desain sehingga seluruh bagian tampak menyatu sebagai satu karya utuh yang saling mendukung.",
    example: "Penggunaan palet warna brand yang konsisten dan gaya ilustrasi vektor yang sama di seluruh materi poster."
  },
  {
    term: "Balance (Keseimbangan)",
    category: "Prinsip Desain",
    desc: "Pembagian bobot visual agar susunan tidak terasa berat sebelah. Dibagi menjadi Keseimbangan Simetris (formal) dan Asimetris (dinamis).",
    example: "Sebuah elemen gambar besar di sebelah kiri diimbangi oleh judul tebal dan blok teks di sebelah kanan (keseimbangan asimetris)."
  },
  {
    term: "Composition (Komposisi)",
    category: "Prinsip Desain",
    desc: "Pengaturan dan penataan menyeluruh letak unsur-unsur dalam bidang gambar agar memandu pandangan mata pembaca secara alami dan logis.",
    example: "Menata layout dengan aturan sepertiga (Rule of Thirds) dan grid layout untuk menjaga keteraturan."
  },
  {
    term: "Proportion (Proporsi)",
    category: "Prinsip Desain",
    desc: "Perbandingan ukuran antara satu unsur dengan unsur lainnya atau dengan keseluruhan bidang media agar tampak wajar dan proporsional.",
    example: "Ukuran tombol aksi (Call-To-Action) yang seimbang dengan ukuran kartu informasi tanpa membuatnya terdistorsi."
  },
  {
    term: "Rhythm (Irama / Gerak)",
    category: "Prinsip Desain",
    desc: "Pola pengulangan unsur secara teratur atau bervariasi yang mengarahkan gerak pandang mata penikmat desain dari satu elemen ke elemen berikutnya.",
    example: "Deretan ikon langkah kerja 1, 2, dan 3 yang dihubungkan oleh garis putus-putus berirama mengalir."
  },
  {
    term: "Emphasis (Penekanan)",
    category: "Prinsip Desain",
    desc: "Titik pusat perhatian utama (focal point) dalam karya yang sengaja dibuat paling mencolok untuk menarik pandangan mata pertama kali.",
    example: "Memberi ukuran jauh lebih besar dan warna jingga menyala pada kata 'DISKON 70%' di antara teks deskripsi abu-abu."
  },
  {
    term: "Contrast (Kontras)",
    category: "Prinsip Desain",
    desc: "Perbedaan tajam dan mencolok antara dua unsur visual yang berdampingan guna menegaskan hierarki dan menjamin keterbacaan (readability).",
    example: "Teks putih tebal di atas latar belakang biru navy gelap yang memenuhi standar kontras WCAG AA."
  },
  {
    term: "Repetition (Repetisi)",
    category: "Prinsip Desain",
    desc: "Pengulangan unsur visual tertentu (warna, bentuk, garis, tekstur) secara berkala untuk memperkuat ritme dan konsistensi identitas visual.",
    example: "Format bullet point berbentuk segi enam yang digunakan konsisten pada setiap bab lembar kerja."
  },
  {
    term: "White Space (Ruang Negatif)",
    category: "Prinsip Desain",
    desc: "Area kosong tanpa teks atau gambar yang sengaja dibiarkan melingkupi elemen penting agar karya memiliki jeda nafas dan tidak terasa penuh sesak.",
    example: "Jarak margin lebar di tepi halaman majalah yang memisahkan teks artikel dari tepi kertas."
  },
  {
    term: "Komunikator",
    category: "Alur Komunikasi",
    desc: "Pihak yang memprakarsai komunikasi atau desainer/klien yang memiliki ide, gagasan, atau pesan yang ingin disampaikan.",
    example: "Panitia pameran sekolah yang ingin mengundang siswa hadir ke acara grafika tahunan."
  },
  {
    term: "Pesan (Message)",
    category: "Alur Komunikasi",
    desc: "Gagasan, informasi, instruksi, atau ajakan yang telah diolah ke dalam bentuk visual (teks, simbol, tipografi, warna, dan foto).",
    example: "Informasi tanggal, jam, tema karya, dan cara mendaftar pameran grafika."
  },
  {
    term: "Media (Channel)",
    category: "Alur Komunikasi",
    desc: "Saluran fisik atau digital tempat karya grafis disajikan untuk menjangkau komunikan secara efektif.",
    example: "Poster digital Instagram, spanduk cetak vinyl, standing banner, atau brosur cetak lipat tiga."
  },
  {
    term: "Komunikan (Audience)",
    category: "Alur Komunikasi",
    desc: "Pihak sasaran pembaca atau masyarakat luas yang menerima, melihat, membaca, dan merespons pesan visual yang disampaikan.",
    example: "Siswa-siswi SMK jurusan DKV dan masyarakat umum pecinta seni grafis."
  }
];

