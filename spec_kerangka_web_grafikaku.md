# Spesifikasi Pembangunan: Kerangka Web, Beranda, Navigasi, Halaman CP & TP, Tampilan Responsif
**Proyek:** GrafikaKu — Website Pembelajaran Desain Grafis
**Pertemuan:** 11 (Development 1)
**Penanggung jawab:** Nur Hidayat
**Hasil yang dikumpulkan:** Web alpha kerangka; test case F03 dan F04 terisi (diuji oleh Nailha)
**Target:** Dokumen ini dipakai sebagai prompt/acuan untuk AI builder (Antigravity) membangun web.

---

## 1. Ruang Lingkup Tugas

Bangun bagian **kerangka (skeleton)** dari website GrafikaKu, mencakup:

1. Kerangka dasar web (struktur halaman, routing, layout dasar)
2. Halaman **Beranda**
3. **Menu navigasi** (navbar)
4. Halaman **pengantar CP dan TP**
5. **Tampilan responsif** di semua halaman (desktop, tablet, ponsel)

Terkait test case **F01, F02, F13** (dibuat oleh Nur sendiri) serta **F03, F04** (dibuat oleh Nailha, untuk diuji terhadap modul yang akan dibangun Nailha — lihat bagian Catatan Pengujian).

---

## 2. Referensi Desain (wajib diikuti — lihat `Panduan_Atribut_Desain_GrafikaKu.docx`)

### 2.1 Tipografi
- **Judul (H1):** Poppins, 32px, Bold — judul utama tiap layar
- **Judul bagian (H2):** Poppins, 24px, SemiBold — judul modul/bagian
- **Subjudul (H3):** Poppins, 18px, SemiBold — subbagian/judul kartu
- **Teks isi:** Open Sans, 16px, Regular
- **Teks kecil:** Open Sans, 14px, Regular — keterangan gambar, label, catatan
- **Teks tombol:** Poppins, 16px, Medium
- Line-height teks isi: 1.5× ukuran huruf
- Teks rata kiri; judul maksimal 2 baris
- Fallback font: sans-serif bawaan perangkat
- Font via Google Fonts: **Poppins** & **Open Sans**

### 2.2 Palet Warna
| Nama | Hex | Penggunaan |
|---|---|---|
| Indigo (primer) | `#4338CA` | Tombol utama, header, tautan, menu aktif |
| Amber (aksen) | `#F59E0B` | Penanda penting, lencana, sorotan |
| Hijau tua (sukses) | `#0F766E` | Jawaban benar, modul selesai, pesan berhasil |
| Merah tua (galat) | `#B91C1C` | Jawaban salah, pesan kesalahan |
| Abu gelap (teks) | `#1F2937` | Teks utama & judul |
| Abu sedang | `#4B5563` | Teks pendukung/keterangan |
| Indigo muda | `#EEF2FF` | Latar kartu / bagian disorot |
| Putih | `#FFFFFF` | Latar halaman |

Semua kombinasi teks-latar wajib memenuhi kontras minimal **4.5:1 (WCAG AA)**.

### 2.3 Layout & Spacing
- Grid: 12 kolom (desktop), 8 kolom (tablet), 4 kolom (ponsel)
- Lebar konten maksimal **1120px**, di tengah halaman
- Satuan jarak kelipatan 8px (8, 16, 24, 32, 48)
- Sudut membulat: 8px (tombol, input), 12px (kartu)
- Target sentuh minimal **44×44px**
- Ikon: satu keluarga outline, stroke 2px

### 2.4 Komponen yang Dibutuhkan di Tahap Ini
- **Bilah navigasi**: latar putih + bayangan tipis; berisi logo, menu Beranda/Modul/Latihan/Kuis; menu aktif bergaris bawah indigo
- **Tombol primer**: latar indigo, teks putih, radius 8px, tinggi 44px, hover lebih gelap
- **Tombol sekunder**: latar putih, border indigo 2px, teks indigo, ukuran sama dengan tombol primer
- **Kartu modul**: latar indigo muda, radius 12px, berisi nomor modul, judul, ringkasan, progress bar, lencana status
- **Lencana status modul**: Terkunci (abu + ikon gembok), Terbuka (indigo), Selesai (hijau + ikon centang)
- **Bilah kemajuan (progress bar)**: tinggi 8px, radius penuh, bagian terisi indigo + teks persentase

---

## 3. Spesifikasi Halaman

### 3.1 Struktur Navigasi (Navbar — tampil di semua halaman)
- Logo "GrafikaKu" (kiri)
- Menu: **Beranda | Modul | Latihan | Kuis**
- Menu aktif digarisbawahi warna indigo
- Di ponsel: navbar berubah jadi menu hamburger/bottom nav yang tetap mudah disentuh (≥44×44px)

### 3.2 Halaman Beranda
**Teks pembuka (dari naskah resmi — gunakan persis):**
> "Selamat datang di GrafikaKu. Pelajari cara menyusun unsur desain, coba alat dasar pada software pilihanmu, lalu buat poster yang menyampaikan pesan dengan jelas. Mulailah dari Modul 1 dan ikuti latihan secara bertahap."

**Komponen Beranda:**
- Bilah navigasi
- Judul sambutan (H1, pakai teks di atas atau ringkasannya)
- Tiga **kartu modul** (Modul 1, 2, 3) — tampilkan nomor, judul, ringkasan singkat, progress bar, lencana status (awal: Modul 1 = Terbuka, Modul 2 & 3 = Terkunci, sesuai aturan gerbang modul terbuka bertahap)
- Bilah kemajuan keseluruhan (progress belajar total)
- Tombol primer **"Mulai Belajar"** → mengarah ke Modul 1 (atau ke halaman pengantar CP/TP jika pengguna baru)
- Catatan desain: warna indigo dominan

**Petunjuk belajar (tampilkan sebagai bagian info, boleh di Beranda atau halaman pengantar):**
1. Baca tujuan dan teks singkat pada setiap halaman.
2. Amati gambar dan jelaskan bukti visual sebelum menyebut prinsipnya.
3. Kerjakan latihan, baca umpan balik, dan ulangi bagian yang belum dipahami.
4. Kerjakan praktik di luar web melalui satu software pilihan.
5. Simpan berkas kerja dan ekspor PNG. Guru menilai praktik serta karya.
6. Gunakan kuis untuk memeriksa konsep; kuis tidak menggantikan bukti keterampilan.

### 3.3 Halaman Pengantar CP dan TP

**Capaian Pembelajaran (CP) — Fase F, elemen Prinsip Dasar Desain dan Komunikasi:**
> "Murid mampu menerapkan prinsip unity (kesatuan), balance (keseimbangan), composition (komposisi), proportion (proporsi), rhythm (irama), emphasis (penekanan), simplicity (kesederhanaan), clarity (kejelasan), space (ruang), serta fungsi komunikasi visual kepada komunikator dan komunikan."

**Tujuan Pembelajaran (TP) — tampilkan sebagai 3 kartu/blok berurutan:**

| TP | Rumusan |
|---|---|
| **TP 1** | Peserta didik mampu menjelaskan sembilan prinsip dasar desain grafis (unity, balance, composition, proportion, rhythm, emphasis, simplicity, clarity, space) serta mengidentifikasi penerapannya pada karya desain grafis. |
| **TP 2** | Peserta didik mampu mengoperasikan fitur dasar perangkat lunak desain grafis sesuai prosedur untuk membuat dan menyimpan objek grafis sederhana. |
| **TP 3** | Peserta didik mampu menerapkan prinsip dasar desain grafis dalam membuat karya desain visual yang komunikatif, dengan memperhatikan kejelasan pesan, sasaran audiens, dan fungsi komunikasi visual. |

Urutan TP 1 → TP 2 → TP 3 sejajar dengan urutan Modul 1 → Modul 2 → Modul 3.

Tampilkan halaman ini dengan:
- Judul H1: "Capaian Pembelajaran & Tujuan Pembelajaran" (atau sejenis)
- Blok teks CP (H2 + paragraf)
- Tiga kartu/section TP berurutan (gunakan gaya Kotak Materi: latar putih, border abu muda)
- Tombol navigasi lanjut ke Beranda/Modul 1

### 3.4 Tampilan Responsif
- Wajib tampil baik di **desktop, tablet, dan ponsel** (grid 12/8/4 kolom)
- Navbar, kartu modul, dan teks menyesuaikan lebar layar tanpa elemen terpotong
- Semua tombol dan menu tetap memenuhi target sentuh 44×44px di ponsel

---

## 4. Referensi Desain Visual (Figma)
Wireframe Hi-Fi acuan tampilan: https://www.figma.com/design/3RLcA8JjVl4Hi6UiGHUVgr/Kelompok-6?node-id=0-1&p=f&t=vuhTUU1UWO6Foj3S-0

---

## 5. Catatan Pengujian (Black Box)
Setelah kerangka selesai dibangun, siapkan agar dapat diuji terhadap test case berikut (dibuat oleh Nailha, hasil akhir: "test case F03 dan F04 terisi"):
- **F01** — pengujian kerangka web/beranda (disusun Nur)
- **F02** — pengujian menu navigasi (disusun Nur)
- **F13** — pengujian tampilan responsif (disusun Nur)
- **F03, F04** — terkait pengujian Modul 1 dan galeri contoh karya (dibuat Nailha; Nur menguji ini terhadap build Nailha pada tahap berikutnya — bukan bagian yang dibangun Nur, hanya diuji)

> Catatan: F03 dan F04 adalah test case untuk fitur Modul 1 (dibangun oleh Nailha), yang diuji oleh Nur pada pertemuan ini. Pastikan kerangka web sudah mendukung integrasi halaman Modul agar pengujian ini bisa dijalankan.

---

## 6. Output yang Diharapkan
- Website alpha dengan kerangka halaman: Beranda, Navigasi, Pengantar CP & TP (serta placeholder/stub untuk Modul, Latihan, Kuis agar navbar berfungsi)
- Tampilan responsif di 3 breakpoint (desktop/tablet/ponsel)
- Konsisten dengan panduan atribut desain (huruf, warna, komponen) di atas
