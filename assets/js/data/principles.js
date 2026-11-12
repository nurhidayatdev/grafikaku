// Data 9 Prinsip Desain (Modul 1 / F03 & F04) Lengkap dengan Evaluasi Mini Per Prinsip
const principlesData = [
  {
    id: 'unity',
    name: 'Unity (Kesatuan)',
    caption: 'Contoh Karya Beranotasi &mdash; Unity',
    desc: 'Kesatuan adalah hubungan harmonis antarunsur desain sehingga seluruh bagian tampak saling mendukung sebagai satu kesatuan utuh. Kesatuan diciptakan melalui konsistensi gaya gambar, warna, tipografi, dan perataan yang teratur.',
    keywords: ['Kesatuan', 'Harmoni', 'Keterhubungan', 'Gaya konsisten'],
    explanation: 'Unity membuat poster terasa sebagai satu kesatuan utuh, bukan kumpulan elemen acak. Samakan gaya ilustrasi dan skema warna untuk memperkuat kesatuan.',
    reading: 'Kiri: bentuk dan posisi terpisah tanpa kesamaan gaya. Kanan: unsur mengulang gaya kartu, garis tepi, dan perataan sehingga terlihat satu kelompok terpadu.',
    avoid: 'Menyamakan semua ukuran elemen sampai judul kehilangan prioritas hierarki visual.',
    hasToggle: false,
    pins: [
      { top: '35%', left: '26%', text: 'Pin 1: Pengulangan bentuk geometris yang konsisten antar kartu.' },
      { top: '48%', left: '50%', text: 'Pin 2: Penyelarasan garis tengah (alignment) pengikat komposisi.' },
      { top: '35%', left: '74%', text: 'Pin 3: Palet warna indigo terpadu yang menyatukan seluruh elemen.' }
    ],
    quiz: {
      question: "Bagaimanakah cara utama menciptakan prinsip Unity (Kesatuan) pada perancangan poster promosi SMK?",
      options: [
        { key: "A", text: "Menggunakan 10 jenis jenis huruf (font) yang berbeda pada setiap baris kalimat" },
        { key: "B", text: "Menempatkan elemen secara acak tanpa adanya perataan (alignment)" },
        { key: "C", text: "Menggunakan palet warna yang konsisten dan gaya ilustrasi yang selaras di seluruh halaman" },
        { key: "D", text: "Membuat semua gambar berukuran raksasa tanpa menyisakan ruang kosong" }
      ],
      answer: "C",
      explanation: "Tepat Sekali! Kesatuan (Unity) dicapai melalui konsistensi gaya visual, keselarasan palet warna, dan keteraturan perataan sehingga karya tampak utuh dan terpadu."
    }
  },
  {
    id: 'balance',
    name: 'Balance (Keseimbangan)',
    caption: 'Contoh Karya Beranotasi &mdash; Balance',
    desc: 'Keseimbangan adalah pembagian bobot visual agar susunan tidak terasa berat sebelah tanpa tujuan. Ukuran, kepadatan, posisi, dan kontras memengaruhi bobot. Simetris memakai susunan serupa di dua sisi; asimetris memakai unsur berbeda yang tetap terasa saling mengimbangi.',
    keywords: ['Bobot visual', 'Simetris', 'Asimetris', 'Keseimbangan'],
    explanation: 'Balance dapat dicapai secara simetris maupun asimetris. Perhatikan letak unsur visual pada contoh di atas.',
    reading: 'Kiri: dua bentuk serupa mengapit garis tengah (simetris). Kanan: satu bentuk besar diimbangi beberapa bentuk kecil (asimetris). Keduanya dapat dipilih sesuai tujuan.',
    avoid: 'Menganggap bahwa semua susunan tidak simetris pasti salah atau tidak seimbang.',
    hasToggle: true,
    pins: [
      { top: '38%', left: '26%', text: 'Pin 1: Bobot visual unsur sisi kiri penyeimbang bidang gambar.' },
      { top: '50%', left: '50%', text: 'Pin 2: Garis simetri imajiner sebagai sumbu tumpu keseimbangan.' },
      { top: '38%', left: '74%', text: 'Pin 3: Unsur pengimbang visual sisi kanan yang menyetarakan bobot.' }
    ],
    quiz: {
      question: "Apakah perbedaan mendasar antara Keseimbangan Simetris dan Keseimbangan Asimetris?",
      options: [
        { key: "A", text: "Simetris hanya boleh memakai warna hitam putih, sedangkan asimetris bebas" },
        { key: "B", text: "Simetris memiliki unsur serupa di kedua sisi sumbu, sedangkan asimetris mengimbangi unsur berbeda dengan bobot visual yang setara" },
        { key: "C", text: "Asimetris berarti karya berat sebelah dan rusak tanpa keseimbangan" },
        { key: "D", text: "Simetris selalu menghasilkan desain yang jelek dan membosankan" }
      ],
      answer: "B",
      explanation: "Benar! Keseimbangan simetris memakai tata letak serupa seperti cermin, sedangkan asimetris memadukan elemen berbeda ukuran/warna namun tetap setara secara bobot visual."
    }
  },
  {
    id: 'composition',
    name: 'Composition (Komposisi)',
    caption: 'Contoh Karya Beranotasi &mdash; Composition',
    desc: 'Komposisi adalah pengaturan seluruh unsur dalam bidang gambar. Komposisi memandu urutan pandang pembaca secara alami dari informasi utama ke informasi pendukung.',
    keywords: ['Tata letak', 'Urutan baca', 'Pengelompokan', 'Hierarki'],
    explanation: 'Komposisi mengatur posisi judul, gambar, dan ajakan bertindak agar pesan tersampaikan secara logis dan efektif.',
    reading: 'Kiri: unsur menyebar acak tanpa hierarki. Kanan: area judul, ilustrasi, keterangan, dan footer dikelompokkan dengan jarak konsisten.',
    avoid: 'Memindahkan unsur hanya untuk sekadar mengisi ruang kosong tanpa fungsi komunikasi.',
    hasToggle: false,
    pins: [
      { top: '24%', left: '50%', text: 'Pin 1: Area judul utama di bagian atas sebagai pintu masuk pembaca.' },
      { top: '52%', left: '50%', text: 'Pin 2: Pusat visual ilustrasi pendukung yang relevan dengan pesan.' },
      { top: '78%', left: '50%', text: 'Pin 3: Blok keterangan teks dan tombol ajakan bertindak (CTA).' }
    ],
    quiz: {
      question: "Apa tujuan utama penataan Komposisi yang baik pada sebuah media komunikasi grafis?",
      options: [
        { key: "A", text: "Memenuhi semua bidang kosong hingga tidak tersisa ruang putih sama sekali" },
        { key: "B", text: "Menyembunyikan informasi penting agar pembaca penasaran" },
        { key: "C", text: "Memastikan gambar diletakkan miring secara acak di setiap sudut" },
        { key: "D", text: "Memandu alur pandang mata pembaca secara alami dari informasi utama ke informasi pendukung" }
      ],
      answer: "D",
      explanation: "Luar Biasa! Komposisi mengatur alur pembacaan (eye tracking) secara runtut dan hierarkis sehingga pesan tersampaikan secara efektif."
    }
  },
  {
    id: 'proportion',
    name: 'Proportion (Proporsi)',
    caption: 'Contoh Karya Beranotasi &mdash; Proportion',
    desc: 'Proporsi membahas perbandingan ukuran antarbagian atau perbandingan bagian dengan keseluruhan bidang gambar. Pertahankan rasio lebar dan tinggi objek agar tidak terdistorsi.',
    keywords: ['Rasio', 'Perbandingan ukuran', 'Skala proporsional'],
    explanation: 'Proporsi yang tepat menjaga bentuk objek tetap natural dan memastikan judul lebih dominan dibanding teks tubuh.',
    reading: 'Kiri: objek ditarik melebar secara tidak proporsional (distorsi). Kanan: objek mempertahankan aspek rasio asli yang wajar.',
    avoid: 'Menganggap bahwa gambar terbesar dalam poster selalu merupakan desain yang paling tepat.',
    hasToggle: false,
    pins: [
      { top: '32%', left: '28%', text: 'Pin 1: Objek terdistorsi akibat pengubahan ukuran tanpa mengunci rasio.' },
      { top: '48%', left: '50%', text: 'Pin 2: Skala perbandingan proporsional tinggi dan lebar objek.' },
      { top: '32%', left: '72%', text: 'Pin 3: Objek proporsional dengan bentuk alami yang nyaman dipandang.' }
    ],
    quiz: {
      question: "Kesalahan fatal apa yang terjadi jika seorang desainer mengubah ukuran gambar tanpa mengunci aspek rasio (aspect ratio)?",
      options: [
        { key: "A", text: "Objek gambar mengalami distorsi (gepeng atau terlalu lonjong) sehingga tidak proporsional" },
        { key: "B", text: "Warna gambar otomatis berubah menjadi hitam putih" },
        { key: "C", text: "File gambar langsung terhapus dari software desain" },
        { key: "D", text: "Resolusi teks otomatis menjadi lebih tajam" }
      ],
      answer: "A",
      explanation: "Tepat! Proporsi mewajibkan penjagaan rasio dimensi panjang dan lebar agar objek tidak terdistorsi (gepeng/melar)."
    }
  },
  {
    id: 'rhythm',
    name: 'Rhythm (Irama)',
    caption: 'Contoh Karya Beranotasi &mdash; Rhythm',
    desc: 'Irama muncul ketika pengulangan atau perubahan teratur membuat mata mengikuti pola visual. Bentuk, garis, ukuran, dan jarak dapat membentuk irama yang dinamis.',
    keywords: ['Pengulangan', 'Pola teratur', 'Interval', 'Arah baca'],
    explanation: 'Irama memberi gerak visual yang menyenangkan dan membantu pembaca menelusuri langkah-langkah informasi secara bertahap.',
    reading: 'Kiri: jarak antarelemen acak sehingga membingungkan. Kanan: bentuk dan interval berulang membuat arah baca mengalir lancar.',
    avoid: 'Mengulang ornamen dekorasi terlalu berlebihan hingga menutupi keterbacaan teks.',
    hasToggle: false,
    pins: [
      { top: '48%', left: '22%', text: 'Pin 1: Titik awal ritme pengulangan motif berjarak konsisten.' },
      { top: '48%', left: '50%', text: 'Pin 2: Interval ruang pengikat irama gerakan visual.' },
      { top: '48%', left: '78%', text: 'Pin 3: Titik akhir panduan arah baca pembaca.' }
    ],
    quiz: {
      question: "Bagaimanakah irama (Rhythm) tercipta di dalam tata letak desain grafis?",
      options: [
        { key: "A", text: "Dengan memasukkan file lagu MP3 ke dalam poster cetak" },
        { key: "B", text: "Menaruh seluruh objek di tengah tanpa ada perulangan sama sekali" },
        { key: "C", text: "Melalui pengulangan unsur visual (bentuk, garis, warna, jarak) secara teratur atau terarah" },
        { key: "D", text: "Mengganti jenis huruf pada setiap kata dalam satu paragraf" }
      ],
      answer: "C",
      explanation: "Sangat Tepat! Irama dalam grafis visual tercipta dari keteraturan pengulangan interval, bentuk, atau warna yang memandu gerak pandang mata penikmat desain."
    }
  },
  {
    id: 'emphasis',
    name: 'Emphasis (Penekanan)',
    caption: 'Contoh Karya Beranotasi &mdash; Emphasis',
    desc: 'Penekanan menjadikan informasi paling penting sebagai pusat perhatian (focal point). Perbedaan ukuran, kontras warna pekat, dan ketebalan huruf menciptakan penekanan yang tegas.',
    keywords: ['Pusat perhatian', 'Kontras', 'Focal point', 'Hierarki visual'],
    explanation: 'Tentukan satu informasi utama yang paling krusial, lalu berikan bobot visual tertinggi padanya agar langsung ditangkap audiens.',
    reading: 'Kiri: seluruh elemen berukuran sama sehingga membosankan. Kanan: lingkaran besar hitam menjadi pusat perhatian dominan.',
    avoid: 'Membuat semua teks dan elemen sama besar dan tebal karena akan menghilangkan pusat perhatian.',
    hasToggle: false,
    pins: [
      { top: '50%', left: '26%', text: 'Pin 1: Unsur sekunder dengan kontras lembut sebagai pendukung.' },
      { top: '48%', left: '50%', text: 'Pin 2: FOKUS UTAMA: Kontras tajam dan ukuran terbesar sebagai pusat perhatian.' },
      { top: '50%', left: '74%', text: 'Pin 3: Unsur pelengkap yang mengalirkan pandangan kembali ke fokus.' }
    ],
    quiz: {
      question: "Jika semua teks dan gambar dalam sebuah poster dibuat berukuran sama besar dan warna sama mencolok, apa yang terjadi pada prinsip Emphasis?",
      options: [
        { key: "A", text: "Poster menjadi sangat seimbang dan sempurna" },
        { key: "B", text: "Prinsip emphasis hilang karena mata audiens bingung menentukan informasi mana yang paling utama" },
        { key: "C", text: "Pesan promosi menjadi dua kali lebih cepat dipahami" },
        { key: "D", text: "Biaya cetak poster menjadi lebih hemat" }
      ],
      answer: "B",
      explanation: "Benar! Jika segala sesuatu ditekankan, maka tidak ada satu pun yang menonjol. Emphasis menuntut pemilihan satu titik fokus utama."
    }
  },
  {
    id: 'simplicity',
    name: 'Simplicity (Kesederhanaan)',
    caption: 'Contoh Karya Beranotasi &mdash; Simplicity',
    desc: 'Kesederhanaan mempertahankan unsur yang mendukung pesan dan menghilangkan dekorasi yang tidak diperlukan. Desain sederhana tetap memuat seluruh informasi penting secara jernih.',
    keywords: ['Relevansi', 'Fokus', 'Seleksi unsur', 'Efisien visual'],
    explanation: 'Desain yang baik bukan yang tidak bisa ditambahkan lagi, melainkan yang tidak bisa dikurangi lagi tanpa merusak makna.',
    reading: 'Kiri: terlalu banyak pernak-pernik dekoratif yang mengganggu. Kanan: visual bersih, fokus, dan langsung menyampaikan inti pesan.',
    avoid: 'Menyamakan sederhana dengan kekurangan informasi penting bagi audiens.',
    hasToggle: false,
    pins: [
      { top: '35%', left: '28%', text: 'Pin 1: Elemen dekorasi berlebihan yang berpotensi membingungkan.' },
      { top: '50%', left: '50%', text: 'Pin 2: Penyederhanaan bentuk ke esensi informasi utama.' },
      { top: '35%', left: '72%', text: 'Pin 3: Pesan esensial yang tersaji lugas tanpa gangguan visual.' }
    ],
    quiz: {
      question: "Apakah makna dari prinsip Simplicity (Kesederhanaan) dalam perancangan media grafis?",
      options: [
        { key: "A", text: "Menghapus semua informasi penting hingga poster menjadi kertas polos kosong" },
        { key: "B", text: "Membuat desain tanpa perencanaan dan asal jadi dalam waktu 1 menit" },
        { key: "C", text: "Hanya boleh menggunakan gambar lingkaran saja" },
        { key: "D", text: "Mempertahankan elemen fungsional yang mendukung pesan dan mengeliminasi ornamen yang tidak perlu" }
      ],
      answer: "D",
      explanation: "Tepat Sekali! Simplicity adalah selektivitas visual: mempertahankan yang bernilai komunikasi dan membuang gangguan visual (visual noise)."
    }
  },
  {
    id: 'clarity',
    name: 'Clarity (Kejelasan)',
    caption: 'Contoh Karya Beranotasi &mdash; Clarity',
    desc: 'Kejelasan memastikan pembaca langsung memahami pesan tanpa perlu menebak-nebak. Gunakan kata yang lugas, kontras teks yang tinggi terhadap latar, serta tipografi yang mudah dibaca.',
    keywords: ['Keterbacaan', 'Pesan langsung', 'Bebas ambiguitas', 'Kontras teks'],
    explanation: 'Kejelasan memadukan pesan verbal dan visual agar dapat dibaca dengan mudah bahkan dari jarak pandang tertentu.',
    reading: 'Kiri: teks dan garis saling bertumpuk sehingga sulit terbaca. Kanan: judul dan keterangan terpisah jelas dengan keterbacaan prima.',
    avoid: 'Memakai efek bayangan tebal atau singkatan bahasa yang tidak dipahami oleh kelompok audiens target.',
    hasToggle: false,
    pins: [
      { top: '32%', left: '50%', text: 'Pin 1: Judul lugas dengan kontras minimal 4.5:1 memenuhi standar WCAG AA.' },
      { top: '54%', left: '50%', text: 'Pin 2: Jarak baris (line-height) 1.5x ukuran teks untuk kemudahan membaca.' },
      { top: '76%', left: '50%', text: 'Pin 3: Pemisahan tegas antara area judul dan teks keterangan.' }
    ],
    quiz: {
      question: "Faktor apa yang paling krusial untuk menjamin tercapainya prinsip Clarity (Kejelasan) pada teks judul?",
      options: [
        { key: "A", text: "Menggunakan jenis huruf berlekuk rumit dengan warna yang menyerupai background" },
        { key: "B", text: "Kontras warna yang kuat terhadap latar belakang dan pemilihan jenis huruf yang mudah dibaca" },
        { key: "C", text: "Menumpuk teks judul di atas foto yang ramai tanpa pelindung kontras" },
        { key: "D", text: "Memperkecil ukuran teks judul sekecil mungkin" }
      ],
      answer: "B",
      explanation: "Benar! Clarity bergantung pada keterbacaan (readability) yang didukung kontras tajam antar teks dan latar belakang."
    }
  },
  {
    id: 'space',
    name: 'Space (Ruang)',
    caption: 'Contoh Karya Beranotasi &mdash; Space',
    desc: 'Ruang mencakup area berisi objek (ruang positif) serta area kosong di sekelilingnya (ruang negatif / white space). Ruang kosong bukan sisa yang harus diisi, melainkan elemen desain aktif untuk memberi napas bagi komposisi.',
    keywords: ['Ruang positif', 'Ruang negatif', 'Margin', 'White space', 'Jeda visual'],
    explanation: 'Ruang negatif memberikan jeda istirahat bagi mata dan menonjolkan elemen informasi utama di sekitarnya.',
    reading: 'Kiri: bidang sesak penuh elemen tanpa ruang bernapas. Kanan: penerapan margin dan padding yang lega membuat desain elegan.',
    avoid: 'Merasa takut melihat ruang kosong sehingga memaksakan penambahan gambar dekorasi tak berguna.',
    hasToggle: false,
    pins: [
      { top: '24%', left: '22%', text: 'Pin 1: Margin tepi bidang gambar yang mencegah desain terasa terpotong.' },
      { top: '50%', left: '50%', text: 'Pin 2: Ruang positif tempat bertumpunya objek informasi utama.' },
      { top: '78%', left: '78%', text: 'Pin 3: Ruang negatif (white space) yang memberikan jeda visual nyaman.' }
    ],
    quiz: {
      question: "Mengapa Ruang Negatif (White Space) dianggap sebagai elemen desain yang aktif, bukan sekadar 'ruang kosong sisa'?",
      options: [
        { key: "A", text: "Karena desainer malas mengisi gambar di area tersebut" },
        { key: "B", text: "Karena software grafis akan rusak bila seluruh kanvas terisi penuh" },
        { key: "C", text: "Karena memberi jeda nafas bagi mata pembaca, mencegah rasa sesak, dan menonjolkan elemen penting" },
        { key: "D", text: "Hanya berfungsi untuk menghemat pemakaian tinta saat mencetak di printer" }
      ],
      answer: "C",
      explanation: "Luar Biasa! White space adalah alat visual yang disengaja untuk mengarahkan fokus mata dan menciptakan komposisi yang elegan serta teratur."
    }
  }
];
