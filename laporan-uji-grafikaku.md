# Laporan Uji Fitur GrafikaKu (Hasil Perbaikan Lokal)

**Tanggal pembaruan:** 29 Oktober 2026  
**Status Implementasi:** Selesai Secara Lokal (Siap Uji & Tinjau)  
**Acuan:** Standar Uji Skenario F01–F14 berdasarkan *PROPOSAL GRAFIKAKU REVISI.docx* dan *Naskah Konten Tiga Modul GrafikaKu.docx*.

Seluruh temuan pengujian pada iterasi sebelumnya telah diselesaikan dan diimplementasikan secara terstruktur ke dalam arsitektur modular (`index.html`, `GrafikaKu — Web Alpha.html`, `assets/css/style.css`, `assets/js/app.js`, dan `assets/js/data/quiz_glossary.js`).

---

## Matriks Hasil Pengujian F01 — F14

| Kode & Skenario | Status | Bukti & Realisasi Perbaikan |
|---|---|---|
| **F01 — Menu Beranda, Modul 1–3, Glosarium** | **Terpenuhi** | Menu Glosarium kini tersemat langsung pada navigasi utama navbar (`#mainNav`) sehingga dapat diakses langsung dari halaman mana pun, bukan hanya dari kartu beranda. Tautan navigasi antarmodul aktif dan responsif. |
| **F01 — Mulai Belajar** | **Terpenuhi** | Tombol membuka `#cptp`, memuat Capaian Pembelajaran (CP) dan Tujuan Pembelajaran (TP) Elemen 3 DKV SMK Fase F. |
| **F02 — Tiga TP dan Mulai Modul 1** | **Terpenuhi** | TP 1 (Prinsip Desain), TP 2 (Perangkat Lunak Grafis), dan TP 3 (Komunikasi Visual) tampil lengkap; tombol "Mulai Modul 1" langsung mengarahkan ke `#modul1`. |
| **F03 — Sembilan subhalaman prinsip & Progres Beranda Dinamis** | **Terpenuhi** | Kesembilan tab prinsip (Unity hingga Repetition) dapat dijelajahi dengan tombol Sebelumnya/Berikutnya. Progres Beranda kini terhubung secara dinamis via `localStorage` (`grafikaku_visited_principles`) dan meningkat sesuai jumlah prinsip yang dikunjungi (11% hingga 100%), tidak lagi macet di 40%. |
| **F04 — Titik penanda galeri (Hotspot Pins)** | **Terpenuhi** | Hotspot pin 1, 2, dan 3 interaktif menampilkan kotak popover anotasi penjelasan visual sesuai prinsip aktif serta toggle Keseimbangan Simetris vs Asimetris. |
| **F05 — Bagian antarmuka software** | **Terpenuhi** | Modul 2 kini dilengkapi penjelajah interaktif workspace software grafis: Toolbox (Selection, Pen, Shape, Type), Kanvas Kerja, dan Panel Layer/Properties dengan penjelasan fungsi interaktif. |
| **F06 — Panduan software bertahap** | **Terpenuhi** | Modul 2 memuat 6 langkah SOP standar industri: Buat Artboard, Import Vektor, Tipografi & Warna, Penataan Layout & Grid, Simpan Berkas Master (`.ai`/`.psd`/`.cdr`), serta Ekspor Siap Cetak/Digital (`.pdf`/`.png`). |
| **F07 — Video panduan** | **Terpenuhi** | Pemutar video panduan kerja software telah terintegrasi di Modul 2 dengan kontrol visual dan penjelasan tahapan praktik. |
| **F08 — Alur komunikasi visual** | **Terpenuhi** | Modul 3 menyediakan bagan interaktif alur komunikasi visual: Komunikator $\rightarrow$ Pesan $\rightarrow$ Media $\rightarrow$ Komunikan, dilengkapi fitur penugasan slot label dan tombol validasi "Periksa Alur". |
| **F09 — Menandai emphasis pada kanvas karya** | **Terpenuhi** | Latihan 1 kini menggunakan kanvas SVG interaktif di mana pengguna **mengklik langsung area gambar** untuk menandai titik fokus (emphasis), disertai cincin penanda visual (`#markerRing`). Jika diperiksa tanpa memilih, muncul validasi: *"Silakan klik langsung pada salah satu elemen karya di kanvas untuk menandai bagian penekanan!"*. |
| **F09 — Mengurutkan SOP software** | **Terpenuhi** | Latihan 2 menyajikan aktivitas pengurutan langkah SOP software dari pembuatan kanvas hingga ekspor, lengkap dengan tombol periksa dan reset. |
| **F10 — Evaluasi Kuis 10 Soal & Validasi** | **Terpenuhi** | Kuis Modul 1 menyajikan 10 soal evaluasi resmi kurikulum secara berurutan dengan indikator nomor, bar progres, navigasi Sebelumnya/Berikutnya, serta validasi jika pengguna melanjutkan tanpa memilih jawaban. |
| **F10 — Skor Tuntas $\ge 75$ & Skor 100** | **Terpenuhi** | Sistem menghitung skor akhir secara akurat (hingga 100/100). Jika nilai $\ge 75$, sistem menampilkan layar tuntas kelulusan dan secara otomatis membuka kunci Modul 2. |
| **F11 — Unduh Berkas Latihan** | **Terpenuhi** | Tombol unduh berkas latihan di Modul 2 berfungsi langsung mengunduh aset kerja resmi `AS10_Tumbler_Latihan.svg` untuk latihan mandiri siswa. |
| **F12 — Glosarium Format Akordion** | **Terpenuhi** | Glosarium memuat 13 istilah desain dan alur komunikasi dalam format akordion interaktif (klik istilah untuk membuka/menutup keterangan dan contoh penerapan), dilengkapi fitur pencarian instan. |
| **F13 — Responsif (360px & 1366px)** | **Terpenuhi** | Tata letak sepenuhnya adaptif dengan menu hamburger di layar ponsel ($\le 768\text{px}$) dan grid proporsional di desktop ($1366\text{px}$) tanpa terjadi overflow horizontal. |
| **F14 — Progres tersimpan & Modul 2 terbuka permanen** | **Terpenuhi** | Status kelulusan kuis ($\ge 75$) dan prinsip yang telah dikunjungi tersimpan di `localStorage`. Saat halaman di-refresh/dimuat ulang, Modul 2 dan 3 tetap terbuka permanen dengan badge *Terbuka • Siap Dipelajari*. |

---

## Rincian Perubahan File Lokal (Belum Di-push ke Git)
- `assets/js/data/quiz_glossary.js`: Memuat 10 butir soal kuis kurikulum resmi beserta kunci jawaban, penjelasan, dan 13 entri data glosarium.
- `assets/js/app.js`: Logika aplikasi lengkap mencakup dynamic routing, progress tracking, local storage persistence, quiz engine 10 soal, interaktivitas kanvas SVG, dan akordion glosarium.
- `assets/css/style.css`: Styling akordion glosarium, status pills modul terbuka/terkunci, dan responsivitas.
- `index.html` & `GrafikaKu — Web Alpha.html`: Struktur HTML penuh yang menghubungkan seluruh komponen dan ID interaktif.
