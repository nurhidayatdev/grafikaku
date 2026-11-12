# Instrumen Pengujian Functional Suitability — GrafikaKu

**Acuan Standar:** Product Quality Model **ISO/IEC 25010:2011** & Ukuran **ISO/IEC 25023:2016**  
**Cakupan Subkarakteristik:**
1. **Functional completeness** (`FCp-1-G` — *Functional coverage*)
2. **Functional correctness** (`FCr-1-G` — *Functional correctness*)

> Catatan: Instrumen ini disusun khusus untuk menguji subkarakteristik *Functional completeness* dan *Functional correctness* pada aplikasi web **GrafikaKu**.

---

## 1. Identitas Pengujian

| Butir | Isi |
|-------|-----|
| **Nama dan versi sistem** | GrafikaKu — Media Pembelajaran Interaktif SMK DKV (Web Alpha / v1.0) |
| **Platform** | Web (Single Page Application — HTML5, CSS3, Vanilla JS) |
| **Kelompok penguji** | ...................................................... |
| **Tanggal pengujian** | ...................................................... |
| **Cara ukur** | Eksternal (`E`) — Pengujian pada sistem yang dijalankan menggunakan *test case* |
| **Dokumen spesifikasi yang dipakai** | `project_context.md`, `design.md`, dan implementasi sistem (`index.html`, `assets/js/app.js`) |

---

## 2. Ketentuan Umum & Kriteria Nilai

### 2.1 Aturan Menghitung `A` dan `B`
1. Tetapkan nilai `B` terlebih dahulu dari **Inventaris 1** sebelum pengujian dijalankan.
2. Nilai setiap fungsi didukung bukti: tangkapan layar (*screenshot*), hasil *test case*, atau catatan lokasi.
3. Pada **`FCp-1-G`**, fungsi dihitung **hilang** (`A`) bila tidak ditemukan atau tidak dapat dijalankan sama sekali. Fungsi yang ada tetapi hasilnya salah **bukan** fungsi hilang, dan dihitung pada `FCr-1-G`.
4. Pada **`FCr-1-G`**, fungsi hilang **tidak masuk `B`** karena kebenarannya tidak dapat diuji.
5. Satu fungsi dinyatakan **tidak benar** bila **sedikitnya satu *test case*-nya gagal** (hasil aktual berbeda dari hasil yang diharapkan).

### 2.2 Kriteria Interpretasi Nilai `X`
Rumus kedua ukuran: $X = 1 - \frac{A}{B}$ (nilai antara `0,00` sampai `1,00`; makin dekat ke `1,00` makin baik).

| Nilai X | Kategori |
|---------|----------|
| `0,81 – 1,00` | Sangat baik |
| `0,61 – 0,80` | Baik |
| `0,41 – 0,60` | Cukup |
| `0,21 – 0,40` | Kurang |
| `0,00 – 0,20` | Sangat kurang |

---

## 3. Inventaris Dasar

### 3.1 Inventaris 1: Fungsi yang Dispesifikasikan
Jumlah baris pada tabel ini menjadi nilai **`B`** pada `FCp-1-G` ($B = 14$).

| No | ID Fungsi | Fungsi yang Dispesifikasikan | Sumber Spesifikasi |
|----|-----------|------------------------------|--------------------|
| 1 | `F-01` | Menampilkan halaman Beranda dan ringkasan progres belajar siswa | `project_context.md` (F01), `design.md` §3.1 |
| 2 | `F-02` | Menavigasi antarhalaman melalui *hash routing* dan menu *hamburger* responsif | `project_context.md` (F02), `design.md` §2.1 |
| 3 | `F-03` | Menampilkan materi 9 Prinsip Desain Grafis beserta tab navigasi dan mode Balance (Simetris/Asimetris) | `project_context.md` (F03), `design.md` §3.3 |
| 4 | `F-04` | Menampilkan kanvas karya beranotasi interaktif (pin hotspot) pada Modul 1 | `design.md` §3.3, `app.js` (`showAnnotation`) |
| 5 | `F-05` | Menjalankan kuis *checkpoint* per prinsip dengan pengacakan opsi dan penguncian (*gating*) prinsip berikutnya | `project_context.md` (F04–F05), `app.js` (`checkPrincipleCheckpoint`) |
| 6 | `F-06` | Menampilkan halaman CP & TP beserta latihan pemanasan pencocokan istilah (*warmup*) | `project_context.md` (F14), `design.md` §3.2 |
| 7 | `F-07` | Menjalankan Latihan Interaktif: menandai area penekanan (*Emphasis*) dan mengurutkan langkah SOP | `project_context.md` (F09), `app.js` (`markArtworkTarget`, `checkSopOrder`) |
| 8 | `F-08` | Menjalankan Kuis Akhir 10 soal acak beserta perhitungan skor dan pembukaan akses Modul 2 (KKTP $\ge 75$) | `project_context.md` (F11), `app.js` (`renderQuizResultScreen`) |
| 9 | `F-09` | Mengelola pembukaan kunci (*unlock*) Modul 2 & Modul 3 serta menampilkan modal peringatan jika terkunci | `app.js` (`handleModul2Click`, `handleModul3Click`, `openLockedModal`) |
| 10 | `F-10` | Menampilkan SOP penggunaan software desain dengan *switcher* (Photoshop, CorelDRAW, Canva) pada Modul 2 | `project_context.md` (F07), `app.js` (`selectSoftwareView`) |
| 11 | `F-11` | Mengunduh berkas lembar kerja latihan (AS10) pada Modul 2 | `project_context.md` (TP 2), `app.js` (`downloadFileLatihan`) |
| 12 | `F-12` | Mengunggah dan mengirimkan (*submit*) tugas karya Modul 2 dengan validasi nama berkas `M2_*.png` dan checklist rubrik | `project_context.md` (F08), `app.js` (`handleSubmissionFileSelect`, `submitModul2Work`) |
| 13 | `F-13` | Menjalankan simulasi interaktif Diagram Alur Komunikasi Visual (F08) pada Modul 3 | `project_context.md` (F10), `app.js` (`assignFlowLabel`, `checkFlowDiagram`) |
| 14 | `F-14` | Menjalankan evaluasi *checkpoint* Modul 3 dengan pengacakan opsi dan membuka *banner* selesai menuju Kuis Akhir | `project_context.md` (F13), `app.js` (`checkModul3Checkpoint`) |
| 15 | `F-15` | Menampilkan modal Glosarium dengan fitur pencarian kata kunci, filter kategori, dan akordion istilah | `design.md` §2.1, `app.js` (`filterGlossary`, `setGlossaryScope`) |

> **Catatan:** Total fungsi dispesifikasikan pada Inventaris 1 = **`15` fungsi** (`F-01` s.d. `F-15`), sehingga **`B` pada `FCp-1-G` = 15**.

---

### 3.2 Inventaris 2: Test Case
*Test case* disusun dengan teknik kotak hitam (*black-box testing*): partisi ekuivalensi dan analisis nilai batas (*boundary value*), mencakup masukan yang **sah** maupun **tidak sah** (merujuk ISO/IEC/IEEE 29119-4).

| No | ID Test Case | ID Fungsi | Masukan dan Kondisi | Hasil yang Diharapkan |
|----|--------------|-----------|---------------------|-----------------------|
| 1 | `TC-01-01` | `F-01` | Membuka halaman `#beranda` saat baru pertama kali diakses (`localStorage` kosong) | Halaman Beranda tampil, progres belajar menampilkan `0%` (atau 0 prinsip selesai), tombol CTA utama dapat diklik menuju `#cptp` / Modul 1 |
| 2 | `TC-02-01` | `F-02` | Mengklik menu navigasi `CP & TP` lalu `Modul 1` pada desktop, dan mengklik ikon *hamburger* pada viewport mobile ($\le 768\text{px}$) | URL hash berubah sesuai menu (`#cptp`, `#modul1`), tampilan halaman berganti tanpa *reload*, dan menu mobile terbuka/tertutup dengan benar |
| 3 | `TC-03-01` | `F-03` | Membuka Modul 1 prinsip `Balance`, lalu mengklik tombol toggle `Simetris` dan `Asimetris` | Tampilan ilustrasi/mode berubah sesuai pilihan `Simetris` atau `Asimetris` dan keterangan prinsip tetap terbaca jelas |
| 4 | `TC-04-01` | `F-04` | Mengklik pin hotspot bernomor (`1`, `2`, `3`) pada kanvas karya Modul 1 | *Popover* atau kotak analisis bukti visual menampilkan penjelasan sesuai nomor pin yang diklik |
| 5 | `TC-05-01` | `F-05` | Pada checkpoint prinsip `Unity` (prinsip 1), memilih jawaban **benar** lalu klik tombol periksa jawaban *(masukan sah)* | Muncul umpan balik hijau berhasil, status prinsip 1 tersimpan lulus, dan tab prinsip 2 (`Balance`) terbuka (*unlocked*) |
| 6 | `TC-05-02` | `F-05` | Pada checkpoint prinsip `Unity`, tidak memilih opsi apa pun lalu klik periksa jawaban *(masukan tidak sah)* | Sistem menolak pemeriksaan dan menampilkan pesan peringatan untuk memilih jawaban terlebih dahulu; prinsip 2 tetap terkunci |
| 7 | `TC-05-03` | `F-05` | Pada checkpoint prinsip `Unity`, memilih jawaban **salah** lalu klik periksa jawaban | Muncul umpan balik merah bahwa jawaban belum tepat, opsi jawaban dikocok ulang, dan prinsip 2 tetap terkunci |
| 8 | `TC-06-01` | `F-06` | Membuka `#cptp` dan mencocokkan pasangan istilah dan definisi yang **tepat** pada pemanasan interaktif | Pasangan istilah ditandai cocok/benar dan memberikan umpan balik positif |
| 9 | `TC-07-01` | `F-07` | Pada Latihan Interaktif: mengklik target area penekanan yang tepat lalu periksa jawaban; serta memilih urutan SOP yang benar lalu cek urutan | Sistem menampilkan umpan balik jawaban benar untuk identifikasi penekanan dan urutan SOP sesuai prosedur |
| 10 | `TC-07-02` | `F-07` | Pada Latihan Interaktif: memilih urutan langkah SOP secara terbalik/salah lalu klik cek urutan *(masukan tidak sah)* | Sistem menampilkan umpan balik bahwa urutan belum tepat dan menyediakan tombol reset urutan |
| 11 | `TC-08-01` | `F-08` | Menyelesaikan 10 soal Kuis Akhir dengan **8 jawaban benar** (Skor = `80`, di atas batas KKTP 75) *(masukan sah)* | Skor akhir tampil `80 / 100`, status **Memenuhi Ambang Tuntas**, dan akses Modul 2 terbuka (`grafikaku_modul2_unlocked = true`) |
| 12 | `TC-08-02` | `F-08` | Menyelesaikan 10 soal Kuis Akhir dengan **7 jawaban benar** (Skor = `70`, nilai batas bawah KKTP 75) *(nilai batas)* | Skor akhir tampil `70 / 100`, status **Perlu Peningkatan** (belum tuntas KKTP 75), dan Modul 2 tidak terbuka oleh hasil kuis ini |
| 13 | `TC-08-03` | `F-08` | Pada soal Kuis Akhir, mengklik tombol `Berikutnya`/`Selesai` tanpa memilih opsi jawaban apa pun *(masukan tidak sah)* | Sistem menampilkan peringatan atau menahan pengiriman jawaban hingga opsi dipilih |
| 14 | `TC-09-01` | `F-09` | Mengklik menu `Modul 2` saat `grafikaku_modul2_unlocked` masih kosong/`false` | Sistem mencegah masuk ke Modul 2 dan menampilkan modal informasi bahwa Modul 2 masih terkunci beserta syarat pembukaannya |
| 15 | `TC-10-01` | `F-10` | Pada `#modul2`, mengklik tab switcher `Adobe Photoshop`, `CorelDRAW`, dan `Canva` secara bergantian | Daftar langkah SOP berubah dinamis sesuai software yang dipilih |
| 16 | `TC-11-01` | `F-11` | Pada `#modul2`, mengklik tombol unduh berkas lembar kerja latihan (`AS10`) | Proses pengunduhan berkas latihan terpicu tanpa error |
| 17 | `TC-12-01` | `F-12` | Memilih berkas `M2_Budi_XI-DKV.png`, mencentang seluruh checklist rubrik, lalu klik tombol `Kirim Tugas` *(masukan sah)* | Pratinjau gambar muncul, validasi nama berkas bertanda `✓ Format berkas valid`, tombol submit aktif, status submit tersimpan di `localStorage` |
| 18 | `TC-12-02` | `F-12` | Memilih berkas bernama `poster_tugas.jpg` (tidak sesuai pola `M2_*.png`) dan tidak mencentang checklist rubrik *(masukan tidak sah)* | Muncul catatan peringatan format nama berkas (`⚠️ Catatan: Nama berkas...`) dan tombol `Kirim Tugas` tetap nonaktif (*disabled*) hingga syarat checklist terpenuhi |
| 19 | `TC-13-01` | `F-13` | Pada `#modul3`, menempatkan seluruh label alur komunikasi visual pada slot yang tepat lalu klik `Periksa Alur` *(masukan sah)* | Sistem menampilkan umpan balik bahwa seluruh tahapan alur produksi sudah benar |
| 20 | `TC-13-02` | `F-13` | Pada `#modul3`, menempatkan label alur pada posisi yang tertukar/salah lalu klik `Periksa Alur` *(masukan tidak sah)* | Sistem menampilkan umpan balik tahapan yang masih keliru dan tombol reset dapat mengembalikan posisi label |
| 21 | `TC-14-01` | `F-14` | Pada checkpoint Modul 3, memilih jawaban **benar** lalu klik periksa jawaban *(masukan sah)* | Muncul umpan balik hijau penjelasan jawaban, status lulus tersimpan di `localStorage`, dan `modul3CompletionBanner` tampil dengan tombol menuju Kuis Akhir |
| 22 | `TC-14-02` | `F-14` | Pada checkpoint Modul 3, memilih jawaban **salah** lalu klik periksa jawaban *(masukan tidak sah)* | Muncul umpan balik merah bahwa jawaban belum tepat dan opsi jawaban dikocok ulang pada percobaan berikutnya |
| 23 | `TC-15-01` | `F-15` | Membuka modal Glosarium, mengetik kata kunci `"Balance"` pada kolom cari, dan mengklik kategori filter *(masukan sah)* | Daftar istilah tersaring hanya menampilkan istilah yang cocok dengan `"Balance"` dan akordion dapat dibuka/tutup |
| 24 | `TC-15-02` | `F-15` | Membuka modal Glosarium dan mengetik kata kunci acak `"xyz123"` yang tidak ada di data *(masukan tidak sah)* | Daftar istilah menampilkan kondisi kosong / pesan bahwa istilah tidak ditemukan tanpa error JavaScript |

---

## 4. Lembar Instrumen Pengujian

### 4.1 `FCp-1-G` Functional Coverage (*Functional Completeness*)

| Komponen | Isi |
|----------|-----|
| **Subkarakteristik** | Functional completeness |
| **Yang diukur** | Proporsi fungsi yang dispesifikasikan dan sudah diimplementasikan |
| **A** | Jumlah fungsi yang hilang |
| **B** | Jumlah fungsi yang dispesifikasikan (`15`) |
| **Rumus** | $X = 1 - \frac{A}{B}$ |
| **Sumber data** | Inventaris 1; dokumen spesifikasi; sistem GrafikaKu yang dijalankan |
| **Kriteria "hilang"** | Sistem tidak memiliki kemampuan menjalankan fungsi yang dispesifikasikan: fungsi tidak ditemukan, atau tidak dapat dijalankan sama sekali |

**Langkah Pengujian:**
1. Ambil seluruh fungsi dari Inventaris 1 sebagai `B` (`15` fungsi).
2. Cari tiap fungsi pada aplikasi GrafikaKu dan jalankan satu kali dengan masukan yang sah.
3. Tandai fungsi yang tidak ditemukan atau tidak dapat dijalankan sebagai **Hilang (`Ya`)**, dan simpan buktinya (nama berkas tangkapan layar atau catatan).
4. Jumlahkan fungsi hilang sebagai `A`, lalu hitung $X = 1 - \frac{A}{B}$.

#### Lembar Kerja `FCp-1-G`

| No | ID Fungsi | Fungsi yang Dispesifikasikan | Sumber Spesifikasi | Hilang? (Ya) | Hilang? (Tidak) | Bukti (Screenshot / Catatan) |
|----|-----------|------------------------------|--------------------|:------------:|:---------------:|------------------------------|
| 1 | `F-01` | Menampilkan halaman Beranda dan ringkasan progres belajar siswa | `project_context.md` (F01) | [ ] | [ ] | |
| 2 | `F-02` | Menavigasi antarhalaman melalui *hash routing* dan menu *hamburger* responsif | `project_context.md` (F02) | [ ] | [ ] | |
| 3 | `F-03` | Menampilkan materi 9 Prinsip Desain Grafis beserta tab navigasi dan mode Balance | `project_context.md` (F03) | [ ] | [ ] | |
| 4 | `F-04` | Menampilkan kanvas karya beranotasi interaktif (pin hotspot) pada Modul 1 | `design.md` §3.3 | [ ] | [ ] | |
| 5 | `F-05` | Menjalankan kuis *checkpoint* per prinsip dengan pengacakan opsi dan *gating* | `project_context.md` (F04–F05) | [ ] | [ ] | |
| 6 | `F-06` | Menampilkan halaman CP & TP beserta pemanasan pencocokan istilah | `project_context.md` (F14) | [ ] | [ ] | |
| 7 | `F-07` | Menjalankan Latihan Interaktif (tandai penekanan & urutkan SOP) | `project_context.md` (F09) | [ ] | [ ] | |
| 8 | `F-08` | Menjalankan Kuis Akhir 10 soal acak beserta skor & pembukaan Modul 2 | `project_context.md` (F11) | [ ] | [ ] | |
| 9 | `F-09` | Mengelola pembukaan kunci Modul 2 & Modul 3 serta modal terkunci | `app.js` (`openLockedModal`) | [ ] | [ ] | |
| 10 | `F-10` | Menampilkan SOP penggunaan software dengan *switcher* (PS/CDR/Canva) | `project_context.md` (F07) | [ ] | [ ] | |
| 11 | `F-11` | Mengunduh berkas lembar kerja latihan (AS10) pada Modul 2 | `project_context.md` (TP 2) | [ ] | [ ] | |
| 12 | `F-12` | Mengunggah & mengirim tugas Modul 2 dengan validasi `M2_*.png` & rubrik | `project_context.md` (F08) | [ ] | [ ] | |
| 13 | `F-13` | Menjalankan simulasi interaktif Diagram Alur Komunikasi Visual (F08) | `project_context.md` (F10) | [ ] | [ ] | |
| 14 | `F-14` | Menjalankan *checkpoint* Modul 3 (opsi acak) & *banner* selesai ke Kuis Akhir | `project_context.md` (F13) | [ ] | [ ] | |
| 15 | `F-15` | Menampilkan modal Glosarium dengan pencarian, filter, dan akordion | `design.md` §2.1 | [ ] | [ ] | |

**Hasil `FCp-1-G`:**
- `A` (jumlah fungsi hilang) = `......`
- `B` (jumlah fungsi dispesifikasikan) = `15`
- `X = 1 - A / B` = `......`
- **Kategori:** `......` *(merujuk Tabel 2.2)*

---

### 4.2 `FCr-1-G` Functional Correctness (*Functional Correctness*)

| Komponen | Isi |
|----------|-----|
| **Subkarakteristik** | Functional correctness |
| **Yang diukur** | Proporsi fungsi yang memberi hasil yang benar |
| **A** | Jumlah fungsi yang tidak benar |
| **B** | Jumlah fungsi yang dipertimbangkan |
| **Rumus** | $X = 1 - \frac{A}{B}$ |
| **Kriteria masuk B** | Seluruh fungsi yang **tidak hilang** menurut `FCp-1-G` |
| **Kriteria "tidak benar"** | Sedikitnya satu *test case* fungsi itu gagal (hasil aktual berbeda dari hasil yang diharapkan) |

**Langkah Pengujian:**
1. Tetapkan fungsi yang tersedia (tidak hilang pada `FCp-1-G`) sebagai `B`.
2. Jalankan semua *test case* tiap fungsi dari Inventaris 2 dan catat hasil aktualnya pada **Lembar Kerja 1**.
3. Bandingkan hasil aktual dengan hasil yang diharapkan, lalu tetapkan `Lulus?` (`Ya` atau `Tidak`).
4. Rangkum per fungsi pada **Lembar Kerja 2**. Jumlahkan fungsi yang tidak benar sebagai `A`, lalu hitung $X = 1 - \frac{A}{B}$.

#### Lembar Kerja 1 `FCr-1-G` (Hasil Test Case)

| No | ID Fungsi | ID Test Case | Masukan dan Kondisi | Hasil yang Diharapkan | Hasil Aktual | Lulus? (Ya/Tidak) |
|----|-----------|--------------|---------------------|-----------------------|--------------|:-----------------:|
| 1 | `F-01` | `TC-01-01` | Buka `#beranda` saat `localStorage` kosong | Progres tampil `0%`, CTA utama aktif menuju halaman belajar | | |
| 2 | `F-02` | `TC-02-01` | Klik menu `CP & TP`, `Modul 1`, dan ikon *hamburger* mobile | Hash berubah, halaman berpindah tanpa reload, menu mobile toggle | | |
| 3 | `F-03` | `TC-03-01` | Pada prinsip `Balance`, klik toggle `Simetris` dan `Asimetris` | Ilustrasi/mode berubah sesuai pilihan `Simetris`/`Asimetris` | | |
| 4 | `F-04` | `TC-04-01` | Klik pin hotspot (`1`, `2`, `3`) pada kanvas Modul 1 | Kotak/popover anotasi tampil sesuai pin yang diklik | | |
| 5 | `F-05` | `TC-05-01` | Checkpoint `Unity`: pilih jawaban **benar** → periksa | Feedback hijau tampil, prinsip 1 lulus, prinsip 2 terbuka | | |
| 6 | `F-05` | `TC-05-02` | Checkpoint `Unity`: tidak memilih opsi → periksa | Sistem menolak dan tampil pesan peringatan pilih opsi; prinsip 2 terkunci | | |
| 7 | `F-05` | `TC-05-03` | Checkpoint `Unity`: pilih jawaban **salah** → periksa | Feedback merah tampil, opsi dikocok ulang, prinsip 2 terkunci | | |
| 8 | `F-06` | `TC-06-01` | Pada `#cptp`, cocokkan pasangan istilah & definisi yang tepat | Pasangan ditandai benar dan muncul umpan balik positif | | |
| 9 | `F-07` | `TC-07-01` | Latihan: tandai area penekanan tepat & susun urutan SOP benar | Umpan balik benar tampil untuk kedua aktivitas latihan | | |
| 10 | `F-07` | `TC-07-02` | Latihan: susun urutan SOP salah → cek urutan | Umpan balik belum tepat tampil dan tombol reset berfungsi | | |
| 11 | `F-08` | `TC-08-01` | Kuis Akhir: jawab **8/10 benar** (Skor `80`) | Skor `80 / 100`, status Tuntas, Modul 2 terbuka (`true`) | | |
| 12 | `F-08` | `TC-08-02` | Kuis Akhir: jawab **7/10 benar** (Skor `70`, batas KKTP 75) | Skor `70 / 100`, status Perlu Peningkatan, Modul 2 tidak terbuka | | |
| 13 | `F-08` | `TC-08-03` | Kuis Akhir: klik lanjut/selesai tanpa memilih opsi | Sistem memberi peringatan / menahan submit | | |
| 14 | `F-09` | `TC-09-01` | Klik `Modul 2` saat `grafikaku_modul2_unlocked` bernilai `false` | Akses ditolak dan modal informasi terkunci tampil | | |
| 15 | `F-10` | `TC-10-01` | Pada `#modul2`, klik tab `Photoshop`, `CorelDRAW`, `Canva` | Langkah SOP berubah dinamis sesuai software yang dipilih | | |
| 16 | `F-11` | `TC-11-01` | Pada `#modul2`, klik tombol unduh berkas latihan (`AS10`) | Unduhan berkas terpicu tanpa error | | |
| 17 | `F-12` | `TC-12-01` | Upload `M2_Budi_XI-DKV.png` + centang seluruh rubrik → `Kirim Tugas` | Preview tampil, validasi `✓ Format berkas valid`, status tersimpan | | |
| 18 | `F-12` | `TC-12-02` | Upload `poster_tugas.jpg` + rubrik belum dicentang | Peringatan nama berkas tampil, tombol `Kirim Tugas` tetap *disabled* | | |
| 19 | `F-13` | `TC-13-01` | Pada `#modul3`, pasang semua label alur komunikasi dengan benar → periksa | Umpan balik benar tampil untuk seluruh tahapan alur | | |
| 20 | `F-13` | `TC-13-02` | Pada `#modul3`, pasang label alur tertukar/salah → periksa | Umpan balik keliru tampil dan reset mengembalikan label | | |
| 21 | `F-14` | `TC-14-01` | Checkpoint Modul 3: pilih jawaban **benar** → periksa | Feedback hijau tampil, tersimpan di `localStorage`, banner selesai muncul | | |
| 22 | `F-14` | `TC-14-02` | Checkpoint Modul 3: pilih jawaban **salah** → periksa | Feedback merah tampil dan opsi dikocok ulang | | |
| 23 | `F-15` | `TC-15-01` | Modal Glosarium: cari `"Balance"` dan klik filter kategori | Daftar tersaring sesuai `"Balance"`, akordion dapat dibuka/tutup | | |
| 24 | `F-15` | `TC-15-02` | Modal Glosarium: cari `"xyz123"` (tidak ada di data) | Tampil keadaan kosong / pesan tidak ditemukan tanpa error JS | | |

#### Lembar Kerja 2 `FCr-1-G` (Rangkuman per Fungsi)

| No | ID Fungsi | Fungsi | Jumlah Test Case | Jumlah Gagal | Tidak Benar? (Ya/Tidak) |
|----|-----------|--------|:----------------:|:------------:|:-----------------------:|
| 1 | `F-01` | Beranda & progres belajar | 1 | | |
| 2 | `F-02` | Navigasi hash & menu responsif | 1 | | |
| 3 | `F-03` | Materi 9 Prinsip & mode Balance | 1 | | |
| 4 | `F-04` | Kanvas karya beranotasi (hotspot) | 1 | | |
| 5 | `F-05` | Checkpoint per prinsip (acak & gating) | 3 | | |
| 6 | `F-06` | Halaman CP & TP + warmup | 1 | | |
| 7 | `F-07` | Latihan Interaktif (penekanan & SOP) | 2 | | |
| 8 | `F-08` | Kuis Akhir 10 soal & pembukaan Modul 2 | 3 | | |
| 9 | `F-09` | Penguncian akses & modal terkunci | 1 | | |
| 10 | `F-10` | SOP software switcher Modul 2 | 1 | | |
| 11 | `F-11` | Unduh lembar kerja latihan Modul 2 | 1 | | |
| 12 | `F-12` | Upload/submit tugas Modul 2 & rubrik | 2 | | |
| 13 | `F-13` | Simulasi Diagram Alur Modul 3 | 2 | | |
| 14 | `F-14` | Checkpoint Modul 3 & banner selesai | 2 | | |
| 15 | `F-15` | Modal Glosarium (cari, filter, akordion) | 2 | | |

**Hasil `FCr-1-G`:**
- `A` (jumlah fungsi tidak benar) = `......`
- `B` (jumlah fungsi yang dipertimbangkan / tidak hilang) = `......`
- `X = 1 - A / B` = `......`
- **Kategori:** `......` *(merujuk Tabel 2.2)*

---

## 5. Rekapitulasi, Daftar Temuan, dan Pengesahan

### 5.1 Rekap per Ukuran

| Subkarakteristik | ID | Tingkat | Cara Ukur | A | B | X | Kategori |
|------------------|----|---------|-----------|:---:|:---:|:---:|----------|
| Functional completeness | `FCp-1-G` | HR | E | | | | |
| Functional correctness | `FCr-1-G` | HR | E | | | | |

**Rata-rata Nilai Dua Subkarakteristik:**  
$$\text{Rata-rata} = \frac{X_{\text{FCp-1-G}} + X_{\text{FCr-1-G}}}{2} = \dots\dots \quad (\text{Kategori: } \dots\dots)$$

---

### 5.2 Daftar Temuan

| No | ID Fungsi | Jenis Temuan (`Hilang` / `Tidak benar`) | Bukti (`Screenshot` / `ID Test Case Gagal`) | Keterangan Singkat |
|----|-----------|-----------------------------------------|---------------------------------------------|--------------------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

---

### 5.3 Pengesahan

| Ketua Kelompok Penguji | Validator / Pemilik Produk | Dosen Pengampu |
|------------------------|----------------------------|----------------|
| <br><br>( ........................................ ) | <br><br>( ........................................ ) | <br><br>( ........................................ ) |

