# Dokumen Lembar Uji Black Box Testing (Test Case)
## Proyek Media Belajar GrafikaKu — Tahap Development 1 & 2 (Pertemuan 11 & 12)

Dokumen ini disusun sebagai bukti pelaksanaan dan pelaporan **Black Box Testing** sesuai dengan **Tabel 11 Proposal GrafikaKu Revisi** untuk digunakan dalam sesi asistensi dan laporan kemajuan proyek.

---

### RINGKASAN PEMBAGIAN TUGAS PENGUJIAN
Berdasarkan jadwal timeline proyek:
- **Pengujian Tahap 1 (Pertemuan 11 / Dev 1):**
  - **Nur Hidayat** menguji: `F03` dan `F04` (buatan Nailha).
  - **Nailha Dinda Aprilia** menguji: `F05`, `F06`, dan `F07` (buatan Islatul).
  - **Islatul Adha** menguji: `F08` (buatan Abi).
  - **M. Abi Rafdi Alkhairi** menguji: `F01`, `F02`, dan `F13` (buatan Nur).
- **Pengujian Tahap 2 (Pertemuan 12 / Dev 2):**
  - **Nur Hidayat** menguji: `F10` (buatan Islatul - termasuk nilai batas 75).
  - **Nailha Dinda Aprilia** menguji: `F11` (buatan Abi).
  - **Islatul Adha** menguji: `F12` (buatan Abi) dan `F14` (buatan Nur).
  - **M. Abi Rafdi Alkhairi** menguji: `F09` (buatan Nailha).

---

## TABEL TEST CASE LENGKAP: TAHAP DEVELOPMENT 1 (PERTEMUAN 11)

| No. Uji | Kode Fitur | Skenario Uji | Langkah Pengujian | Hasil yang Diharapkan | Hasil Pengamatan Sebenarnya | Skor (1/0) | Penguji & Tanggal |
|---|---|---|---|---|---|:---:|---|
| **TC-01** | **F01** | Beranda dan menu navigasi utama | Membuka web lalu menekan setiap menu pada navbar (`Beranda`, `Modul 1–3`, `CP & TP`, `Glosarium`) | Halaman tujuan tampil seketika tanpa reload (SPA), tautan aktif bergaris bawah/highlight, dan navigasi kembali ke Beranda tersedia | Seluruh halaman berpindah mulus secara SPA via hash routing; tautan aktif ter-highlight; logo dan menu mengarah kembali ke Beranda dengan benar | **1** *(Lolos)* | M. Abi Rafdi Alkhairi<br>*(Nov 2026)* |
| **TC-02** | **F01** | Tombol aksi utama Mulai Belajar | Pada kartu hero Beranda, menekan tombol oranye `[Mulai Belajar →]` | Pengguna langsung diarahkan ke halaman pengantar CP dan TP (`#cptp`) | Halaman berpindah ke `#cptp` menampilkan teks Capaian Pembelajaran dan daftar Tujuan Pembelajaran | **1** *(Lolos)* | M. Abi Rafdi Alkhairi<br>*(Nov 2026)* |
| **TC-03** | **F02** | Pengantar CP dan TP serta tombol lanjut | Membuka halaman `#cptp`, mengamati rincian 3 TP, lalu menekan tombol `[Mulai Modul 1: Prinsip Desain →]` | Rincian TP 1, TP 2, TP 3 tampil lengkap; tombol mengarahkan pengguna langsung ke materi Modul 1 (`#modul1`) | Tiga TP DKV Fase F tampil jelas beserta pemanasan; penekanan tombol langsung membuka Modul 1 | **1** *(Lolos)* | M. Abi Rafdi Alkhairi<br>*(Nov 2026)* |
| **TC-04** | **F03** | Penjelajahan 9 subhalaman prinsip desain | Menekan tombol `Berikutnya >` dan `< Sebelumnya` serta tab 1 s.d. 9 pada Modul 1 | Urutan halaman prinsip benar (1. Unity s.d. 9. White Space), tidak ada tautan rusak, indikator nomor prinsip bertambah | Urutan 9 prinsip berjalan runtut; teks deskripsi, kata kunci, dan analisis visual berganti sesuai tab yang ditekan | **1** *(Lolos)* | Nur Hidayat<br>*(Nov 2026)* |
| **TC-05** | **F04** | Hotspot pin karya beranotasi | Menekan titik penanda (Pin 1, 2, 3) pada kanvas karya prinsip di Modul 1 | Label dan penjelasan prinsip tampil interaktif pada kotak popover tanpa merusak tata letak | Kotak anotasi popover muncul di atas kanvas dengan penjelasan posisi dan fungsi elemen visual yang tepat | **1** *(Lolos)* | Nur Hidayat<br>*(Nov 2026)* |
| **TC-06** | **F04** | Toggle keseimbangan simetris & asimetris | Membuka tab *Balance*, lalu menekan tombol toggle `[Simetris]` dan `[Asimetris]` | Ilustrasi karya berganti antara komposisi simetri tumpu dan asimetri bobot setara | Gambar SVG berganti seketika antara sumbu simetris dan beban asimetris; caption penjelasan menyesuaikan | **1** *(Lolos)* | Nur Hidayat<br>*(Nov 2026)* |
| **TC-07** | **F05** | Pengenalan antarmuka software berlabel | Pada Modul 2, menekan kartu antarmuka berlabel: *Toolbox*, *Kanvas*, dan *Panel Layer* | Nama komponen dan rincian fungsi kerja bagian yang ditekan tampil di kotak keterangan bawah | Saat kartu ditekan, kotak detail menampilkan fungsi Selection/Type tool, dimensi Artboard 1080x1350 px, dan hierarki layer | **1** *(Lolos)* | Nailha Dinda Aprilia<br>*(Nov 2026)* |
| **TC-08** | **F06** | Panduan software bertahap sesuai SOP | Membaca dan menelusuri 6 langkah SOP kerja software dari langkah pertama hingga ekspor | Langkah tersaji terstruktur urut; langkah ke-6 memuat petunjuk simpan berkas master (`.psd`/`.cdr`) dan ekspor (`.png`) | Panduan memuat 6 langkah lengkap dengan format penamaan berkas master dan resolusi ekspor 1080 x 1350 px | **1** *(Lolos)* | Nailha Dinda Aprilia<br>*(Nov 2026)* |
| **TC-09** | **F07** | Pemutar video panduan tertanam | Menekan tombol putar (*play*), jeda (*pause*), dan kontrol volume/layar penuh pada video tutorial | Video tutorial berjalan tertanam di dalam halaman secara responsif tanpa menutup antarmuka web | Video player HTML5 merespons klik putar, jeda, penggeser durasi (*seek*), dan volume dengan lancar | **1** *(Lolos)* | Nailha Dinda Aprilia<br>*(Nov 2026)* |
| **TC-10** | **F08** | Alur komunikasi grafis dan studi kasus | Memilih tombol label (Komunikator, Pesan, Media, Komunikan) untuk mengisi 4 kotak alur lalu klik `[Periksa Alur Bagan]` | Label menempati kotak urutan; susunan benar menampilkan notifikasi hijau sukses; susunan keliru menampilkan petunjuk | Kotak terisi berurutan; penekanan periksa menghasilkan umpan balik hijau: *"Sempurna! Alur komunikasi visual terangkai runtut..."* | **1** *(Lolos)* | Islatul Adha<br>*(Nov 2026)* |
| **TC-11** | **F13** | Tampilan responsif pada ponsel dan desktop | Membuka web pada resolusi layar ponsel (360 px) dan desktop (1366 px) di berbagai peramban modern | Tata letak menyesuaikan layar, menu berganti hamburger di ponsel, tidak terjadi pergeseran atau gulir horizontal samping | Pada 360 px lebar pas 345 px dengan menu hamburger drawer; pada 1366 px grid modul rapi tanpa overflow horizontal | **1** *(Lolos)* | M. Abi Rafdi Alkhairi<br>*(Nov 2026)* |

---

## TABEL TEST CASE LENGKAP: TAHAP DEVELOPMENT 2 (PERTEMUAN 12)

| No. Uji | Kode Fitur | Skenario Uji | Langkah Pengujian | Hasil yang Diharapkan | Hasil Pengamatan Sebenarnya | Skor (1/0) | Penguji & Tanggal |
|---|---|---|---|---|---|:---:|---|
| **TC-12** | **F09** | Latihan 1: Menandai titik penekanan (*emphasis*) | Mengklik langsung pada elemen lingkaran tengah *"FOKUS"* di kanvas karya SVG lalu menekan `[Periksa Jawaban]` | Cincin target (*marker ring*) muncul melingkari objek yang dipilih; notifikasi hijau jawaban benar tampil dengan penjelasan | Cincin target mengunci objek; notifikasi hijau muncul menyatakan elemen tengah dominan sebagai pusat perhatian | **1** *(Lolos)* | M. Abi Rafdi Alkhairi<br>*(Nov 2026)* |
| **TC-13** | **F09** | Latihan 1: Uji masukan salah / kosong | Menekan tombol `[Periksa Jawaban]` tanpa mengklik objek kanvas terlebih dahulu | Muncul pesan peringatan merah agar siswa menandai gambar dahulu, penilaian tidak diproses | Muncul kotak merah tebal: *"Silakan klik langsung pada salah satu elemen karya di kanvas untuk menandai bagian penekanan!"* | **1** *(Lolos)* | M. Abi Rafdi Alkhairi<br>*(Nov 2026)* |
| **TC-14** | **F09** | Latihan 2: Mengurutkan prosedur kerja SOP | Memilih 4 kartu langkah kerja software secara acak/runtut lalu menekan tombol `[Periksa Urutan SOP]` | Urutan benar menghasilkan konfirmasi sukses; urutan salah menampilkan arahan perbaikan alur kerja | Urutan: *Buat Dokumen $\rightarrow$ Susun Objek $\rightarrow$ Simpan Master $\rightarrow$ Ekspor PNG* tervalidasi benar dengan umpan balik hijau | **1** *(Lolos)* | M. Abi Rafdi Alkhairi<br>*(Nov 2026)* |
| **TC-15** | **F10** | Kuis evaluasi: Menjawab seluruh soal benar (Skor 100) | Menjawab 10 butir soal kuis dengan kunci jawaban benar hingga soal terakhir lalu klik kumpulkan | Nilai akhir 100/100, umpan balik tuntas, lencana hijau kelulusan, dan pembuka gerbang Modul 2 tampil | Layar evaluasi menampilkan skor 100/100 (Benar: 10 dari 10), badge tuntas, dan modul berikutnya dinyatakan terbuka | **1** *(Lolos)* | Nur Hidayat<br>*(Nov 2026)* |
| **TC-16** | **F10** | Kuis evaluasi: Ambang batas ketuntasan 75 | Menjawab kuis sehingga memperoleh nilai tepat/minimal 75 (misal benar 8 dari 10 soal = 80) | Status tuntas KKTP ($\ge 75$) muncul dan gerbang Modul 2 & 3 otomatis terbuka | Skor 80/100 berstatus *"Selamat! Anda Memenuhi Ambang Tuntas"* dan Modul 2 dapat langsung diakses | **1** *(Lolos)* | Nur Hidayat<br>*(Nov 2026)* |
| **TC-17** | **F10** | Kuis evaluasi: Validasi tanpa memilih opsi | Menekan tombol `[Soal Berikutnya →]` tanpa memilih salah satu opsi jawaban A/B/C/D | Sistem tidak berpindah soal; muncul peringatan validasi merah bahwa opsi harus dipilih | Muncul pesan merah: *"Silakan pilih salah satu opsi jawaban terlebih dahulu sebelum melanjutkan!"* dan soal tidak berganti | **1** *(Lolos)* | Nur Hidayat<br>*(Nov 2026)* |
| **TC-18** | **F11** | Unduhan berkas lembar kerja latihan | Membuka Modul 2 dan menekan tombol oranye `[Unduh File Latihan (AS10)]` | File latihan berhasil terunduh ke komputer lokal dan dapat dibuka di aplikasi vektor/browser | Berkas `AS10_Tumbler_Latihan.svg` otomatis terunduh; saat dibuka menampilkan pola cetak tumbler AS10 lengkap | **1** *(Lolos)* | Nailha Dinda Aprilia<br>*(Nov 2026)* |
| **TC-19** | **F12** | Glosarium istilah desain format akordion | Menekan menu Glosarium di navbar, mengklik istilah desain, dan mengetik kata di kotak pencarian | Modal glosarium muncul; klik istilah membuka akordion contoh penerapan; filter pencarian menyaring istilah instan | 13 istilah tampil rapi; akordion buka-tutup berfungsi mulus; pencarian kata kunci menyaring istilah secara *real-time* | **1** *(Lolos)* | Islatul Adha<br>*(Nov 2026)* |
| **TC-20** | **F14** | Progres belajar & gerbang antarmodul permanen | Menyelesaikan kuis dengan nilai $\ge 75$, mengecek Beranda, lalu memuat ulang halaman (*Ctrl + F5*) | Progres Beranda meningkat proporsional, status Modul 2 berubah menjadi `[✓ Terbuka]`, dan status tidak hilang saat refresh | Data tersimpan di `localStorage`; saat browser dimuat ulang, Modul 2 tetap terbuka permanen dan progres belajar tersimpan utuh | **1** *(Lolos)* | Islatul Adha<br>*(Nov 2026)* |

---

### REKAPITULASI HASIL PENGUJIAN (CALCULATION)
- **Total Skenario Uji:** 20 Butir Uji (Mencakup 18 Skenario Standar Tabel 11 + Uji Validasi Masukan & Toggle).
- **Jumlah Skenario Berhasil (1):** 20
- **Jumlah Skenario Gagal (0):** 0
- **Tingkat Keterpenuhan Fitur (*Feature Completeness*):**
  $$X = \frac{A}{B} = \frac{20}{20} = 1.00 \quad (100\%)$$
  *(Target minimal proposal $\ge 0.90$ / $90\%$, **Status: Memenuhi Syarat & Siap Uji Ahli**).*

