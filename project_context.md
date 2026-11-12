# 📐 GrafikaKu — Project Context

> Media Pembelajaran Interaktif Berbasis Web untuk SMK DKV  
> Mata Pelajaran: Dasar-Dasar Desain Grafis (Prinsip & Prosedur)

---

## 🧑‍🤝‍🧑 Tim Pengembang

| No | Nama | Peran / Fitur |
|----|------|---------------|
| 1 | **Nur Hidayat** | Koordinator, F01, F02, F03, F09 |
| 2 | **Nailha Dinda Aprilia** | F04, F05, F06 |
| 3 | **Islatul Adha** | F07, F08, F10, F11 |
| 4 | **M. Abi Rafdi Alkhairi** | F12, F13, F14 |

---

## 🎯 Tujuan Proyek

Membangun media pembelajaran interaktif berbasis web **single-page application (SPA)** yang membantu siswa SMK DKV memahami:
- **Prinsip-prinsip Desain Grafis** (TP 1 — Modul 1)
- **SOP Penggunaan Software Desain** (TP 2 — Modul 2)
- **Alur Produksi & Media Desain Grafis** (TP 3 — Modul 3)

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| **Markup** | HTML5 (Semantic) |
| **Style** | CSS3 (Custom Properties, Flexbox, Grid) |
| **Logic** | Vanilla JavaScript (ES6+) |
| **State** | `localStorage` (no backend) |
| **Font** | Google Fonts (Space Grotesk + DM Serif Display) |
| **Routing** | Hash-based (`#beranda`, `#modul1`, dll.) |
| **Build** | Tidak ada — file statis langsung |

> ⚠️ **Tidak ada framework, tidak ada backend, tidak ada package manager.**  
> Semua berjalan sebagai file HTML/CSS/JS statis.

---

## 📁 Struktur File

```
grafikaku/
├── index.html                    ← File utama (selalu sinkron dengan Alpha)
├── GrafikaKu — Web Alpha.html    ← Salinan identik index.html (selalu sinkron!)
├── design_system.md              ← Panduan desain Neo-Brutalism (referensi utama)
├── project_context.md            ← File ini
│
├── assets/
│   ├── css/
│   │   └── style.css             ← Semua styling (CSS variables, komponen)
│   │
│   ├── js/
│   │   ├── app.js                ← Logika utama SPA (~1500+ baris)
│   │   └── data/
│   │       ├── principles.js     ← Data 9 kuis prinsip desain (Modul 1)
│   │       └── quiz_glossary.js  ← Data 10 soal kuis akhir + glosarium
│   │
│   └── img/                      ← Aset gambar (ilustrasi, ikon)
│
└── docs/                         ← Dokumen pendukung (RPP, rubrik, dll.)
```

> 🔑 **Aturan kritis:** `index.html` dan `GrafikaKu — Web Alpha.html` **harus selalu identik**. Setiap perubahan pada satu file wajib disinkronkan ke file lainnya.

---

## 🎨 Design System (Neo-Brutalism / Retro Pop)

Referensi lengkap: [`design_system.md`](./design_system.md)

### Palet Warna

| Token CSS | Nilai | Fungsi |
|-----------|-------|--------|
| `--background` | `#F4EFE6` | Latar halaman (krem/beige) |
| `--black` | `#000000` | Teks utama, border |
| `--white` | `#FFFFFF` | Background kartu |
| `--yellow` | `#FFD166` | Aksen primer |
| `--yellow-light` | `#FFF8E1` | Background highlight lembut |
| `--pink` | `#FF61A6` | Aksen sekunder |
| `--blue` | `#8AB4F8` | Aksen tersier |
| `--green` | `#06D6A0` | Status sukses / selesai |

### Shadow & Border

```css
--shadow-card: 6px 6px 0px 0px #000000;
--shadow-sm:   2px 2px 0px 0px #000000;
--border-thick: 2.5px solid var(--black);
```

### Larangan Desain

- ❌ Glassmorphism (`backdrop-filter`, `rgba(255,255,255,...)` border)
- ❌ Teks `color: #FFFFFF` di atas background terang
- ❌ Hardcode warna — gunakan CSS variables
- ❌ Drop shadow halus / diffuse — harus hard shadow offset
- ✅ Border hitam tebal, offset shadow, tipografi bold

---

## 🗺️ Routing & Navigasi

| Hash Route | Halaman | Keterangan |
|------------|---------|-----------|
| `#beranda` | Beranda | Dashboard + progress siswa |
| `#modul1` | Modul 1 | TP 1 — Prinsip Desain |
| `#modul2` | Modul 2 | TP 2 — SOP Software Desain |
| `#modul3` | Modul 3 | TP 3 — Alur Produksi |
| `#latihan` | Latihan Interaktif | Latihan soal (F09) |
| `#kuis` | Kuis Akhir | 10 soal shuffled (F11) |
| `#cptp` | CP & TP | Referensi Capaian Pembelajaran |

---

## 💾 State Management (localStorage)

| Key | Tipe | Deskripsi |
|-----|------|-----------|
| `grafikaku_passed_checkpoints` | `JSON Array` | Index prinsip yang telah lulus checkpoint (Modul 1) |
| `grafikaku_visited_principles` | `JSON Array` | Index prinsip yang telah dibuka |
| `grafikaku_modul2_unlocked` | `boolean string` | Apakah Modul 2 sudah terbuka |
| `grafikaku_m2_submitted` | `boolean string` | Apakah tugas Modul 2 sudah disubmit |
| `grafikaku_m2_filename` | `string` | Nama file tugas terakhir yang disubmit |
| `grafikaku_m3_checkpoint_passed` | `boolean string` | Apakah checkpoint Modul 3 sudah lulus |

---

## 📚 Fitur (F01–F14)

| Kode | Fitur | Status | PIC |
|------|-------|--------|-----|
| F01 | Halaman Beranda + dashboard progres | ✅ Done | Nur |
| F02 | Navigasi hash-based + hamburger mobile | ✅ Done | Nur |
| F03 | Modul 1 — 9 Prinsip Desain (konten + materi) | ✅ Done | Nur |
| F04 | Modul 1 — Checkpoint kuis per prinsip (gated) | ✅ Done | Nailha |
| F05 | Modul 1 — Shuffled MCQ per sesi | ✅ Done | Nailha |
| F06 | Modul 1 — Banner selesai → CTA ke Latihan | ✅ Done | Nailha |
| F07 | Modul 2 — SOP software switcher (PS/CDR/Canva) | ✅ Done | Islatul |
| F08 | Modul 2 — Sistem submit/upload tugas + rubrik | ✅ Done | Islatul |
| F09 | Latihan Interaktif (soal drag, highlight, dsb.) | ✅ Done | Nur |
| F10 | Modul 3 — Diagram alur produksi F08 | ✅ Done | Islatul |
| F11 | Kuis Akhir — 10 soal shuffled (soal + opsi) | ✅ Done | Islatul |
| F12 | Modul 3 — Tabel perbandingan media cetak/digital | ✅ Done | Abi |
| F13 | Modul 3 — Studi kasus + checkpoint shuffled | ✅ Done | Abi |
| F14 | Halaman CP & TP referensi kurikulum | ✅ Done | Abi |

---

## 📖 Implementasi per TP

### TP 1 — Prinsip Desain Grafis (Modul 1)

**Tujuan:** Siswa mampu mengidentifikasi dan menjelaskan 9 prinsip desain grafis.

**Prinsip yang diimplementasi:**
1. Unity (Kesatuan)
2. Balance (Keseimbangan)
3. Emphasis (Penekanan)
4. Proportion (Proporsi)
5. Hierarchy (Hierarki)
6. Repetition (Repetisi)
7. Rhythm (Ritme)
8. White Space (Ruang Kosong)
9. Movement (Pergerakan)

**Mekanisme:**
- Navigasi antar prinsip dengan tombol Prev/Next
- Checkpoint MCQ per prinsip (wajib lulus sebelum lanjut)
- Opsi dikocok acak tiap sesi (`getShuffledCheckpointForPrinciple()`)
- Jawaban salah → opsi dikocok ulang
- Semua 9 prinsip selesai → banner completion → CTA ke Latihan

**Data:** `assets/js/data/principles.js` — 9 objek prinsip dengan soal MCQ unik

---

### TP 2 — SOP Penggunaan Software Desain (Modul 2)

**Tujuan:** Siswa mampu mengikuti SOP penggunaan software desain grafis.

**Komponen:**
- **Software Switcher:** Tab pilihan Adobe Photoshop / CorelDRAW / Canva
- **SOP Steps:** Langkah-langkah terstruktur per software (renderSoftwareSteps)
- **Video Tutorial:** Embed video demonstrasi
- **Download Lembar Kerja:** Tombol unduh AS10
- **Submission System:** Upload file tugas (simulasi — localStorage)
- **Rubrik Penilaian:** Checklist kriteria penilaian 4 aspek

**Fungsi JS Utama:**
```javascript
selectSoftwareView(softwareName)    // Ganti tab software
renderSoftwareSteps()               // Render langkah SOP aktif
handleSubmissionFileSelect(e)       // Handle pemilihan file
updateSubmissionButtonState()       // Enable/disable tombol submit
submitModul2Work()                  // Proses submit + simpan ke localStorage
renderSubmissionStatus()            // Tampilkan status submit terakhir
```

**Data:** `softwareStepsData` object di `app.js` — 3 software × N langkah

---

### TP 3 — Alur Produksi & Media Desain Grafis (Modul 3)

**Tujuan:** Siswa mampu menjelaskan alur produksi desain grafis dan membedakan media cetak vs digital.

**Komponen:**
- **Diagram Alur Produksi (F08):** Flowchart interaktif tahapan produksi
- **Tabel Perbandingan Media:** Cetak vs Digital (resolusi, format, distribusi, dsb.)
- **Studi Kasus:** 2 kartu kasus nyata untuk didiskusikan
- **Rubrik Penilaian:** Kriteria evaluasi proyek nyata
- **Checkpoint MCQ:** 5 soal shuffled (soal + opsi diacak)
- **Banner Selesai:** Muncul setelah lulus checkpoint → CTA ke Kuis Akhir

**Fungsi JS Utama:**
```javascript
prepareShuffledM3Checkpoint()    // Acak urutan soal + opsi
renderModul3Checkpoint()         // Render kartu soal
checkModul3Checkpoint()          // Validasi jawaban, simpan ke localStorage
```

---

### Kuis Akhir (F11)

**Mekanisme:**
- 10 soal dari `quiz_glossary.js`
- Urutan soal diacak per sesi (`prepareShuffledQuiz()`)
- Opsi jawaban diacak per soal
- Skor akhir ditampilkan dengan feedback

---

## 🔧 Fungsi Utama di app.js

```javascript
// Navigasi
showView(viewId)                    // Switch halaman (hash routing)
initApp()                           // Inisialisasi aplikasi

// Shuffle Utilities
shuffleArray(arr)                   // Fisher-Yates shuffle (in-place)
getShuffledCheckpointForPrinciple(idx)  // Checkpoint prinsip dikocok
prepareShuffledQuiz()               // Kuis akhir dikocok
prepareShuffledM3Checkpoint()       // Checkpoint Modul 3 dikocok

// Modul 1
renderPrinciple(idx)                // Render konten prinsip ke-idx
checkPrincipleCheckpoint()          // Validasi jawaban checkpoint

// Modul 2
selectSoftwareView(name)            // Pilih software (PS/CDR/Canva)
renderSoftwareSteps()               // Render SOP langkah
submitModul2Work()                  // Submit tugas
renderSubmissionStatus()            // Tampilkan status submit

// Modul 3
renderModul3Checkpoint()            // Render soal checkpoint M3
checkModul3Checkpoint()             // Validasi & simpan hasil

// Kuis
renderQuiz()                        // Render soal kuis akhir
submitQuiz()                        // Hitung & tampilkan skor

// Glosarium
renderGlossary()                    // Render daftar istilah
```

---

## ✅ Checklist Ketercapaian

### Teknis
- [x] Shuffled MCQ semua kuis (prinsip + kuis akhir + M3 checkpoint)
- [x] Gating Modul 1 (harus lulus checkpoint untuk lanjut)
- [x] localStorage state management
- [x] Submission system Modul 2 (simulasi upload)
- [x] Responsive navigation (hamburger mobile)
- [x] Hash-based routing tanpa reload
- [x] Syntax valid (`node -c assets/js/app.js` → 0 error)

### Konten
- [x] 9 prinsip desain dengan soal MCQ unik
- [x] SOP 3 software (Photoshop, CorelDRAW, Canva)
- [x] Alur produksi F08 (diagram flowchart)
- [x] Tabel perbandingan media cetak vs digital
- [x] 10 soal kuis akhir dengan glosarium
- [x] Rubrik penilaian tiap TP
- [x] Referensi CP & TP kurikulum

### Desain
- [x] Neo-Brutalism konsisten di semua halaman
- [x] Tidak ada glassmorphism / rgba border transparan
- [x] Tidak ada teks putih di atas background terang
- [x] Hard shadow offset hitam di semua kartu
- [x] CSS variables digunakan konsisten

---

## ⚠️ Known Issues & Catatan

| Issue | Status | Detail |
|-------|--------|--------|
| Submission Modul 2 hanya simulasi | 🟡 By design | File dipilih tapi tidak benar-benar diupload ke server (pure static) |
| Prinsip 1 (Unity) langsung bisa dibuka | 🟢 OK | Sengaja unlock default agar siswa bisa mulai |
| `color: #FFFFFF` di principleHeading | 🟡 Perlu verifikasi | Di dalam dark `.materi-card` — mungkin sudah benar |
| Latihan interaktif `color: #FFFFFF` | 🔴 Perlu fix | Heading "Tandai Bagian Penekanan" dan "Mengurutkan Prosedur SOP" |
| Intro modal heading `#FFFFFF` | 🔴 Perlu fix | Line 957, 968 di index.html |
| Locked modal heading | 🟡 Perlu verifikasi | Mungkin intentional jika modal berlatar gelap |

---

## 📌 Catatan Pengembangan

1. **Selalu sinkronkan kedua HTML:** Setelah edit `index.html`, copy isi ke `GrafikaKu — Web Alpha.html`
2. **Validasi JS setelah edit:** Jalankan `node -c assets/js/app.js`
3. **Jangan gunakan framework/CDN baru** tanpa diskusi tim
4. **Data soal ada di `assets/js/data/`** — jangan hardcode di `app.js`
5. **Semua teks UI dalam Bahasa Indonesia**
6. **Design system adalah hukum** — cek `design_system.md` sebelum menambah komponen baru

---

*Dibuat: November 2026 — Tim GrafikaKu Capstone SMK DKV*

