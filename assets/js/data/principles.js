// Data 9 Prinsip Desain (Modul 1 / F03 & F04)
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ];

    let currentPrincipleIndex = 1; // Default ke Balance (Prinsip ke-2)
    let currentBalanceMode = 'simetris';
