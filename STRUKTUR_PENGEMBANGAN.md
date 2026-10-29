# Struktur Kerangka Pengembangan Web GrafikaKu

Dokumen ini menjelaskan struktur arsitektur modular dari proyek web **GrafikaKu** yang telah dipisahkan agar rapi, modular, mudah dirawat (*maintainable*), dan siap untuk kolaborasi tim kelompok.

---

## 📁 Struktur Direktori

```text
grafikaku/
│
├── index.html                           # Entry-point utama web (SPA loader)
├── GrafikaKu — Web Alpha.html           # Salinan build alpha resmi untuk arsip/pengumpulan
│
├── assets/                              # Aset statis terpisah
│   ├── css/
│   │   └── style.css                    # Seluruh variabel palet warna, tipografi, grid & responsivitas
│   │
│   ├── js/
│   │   ├── app.js                       # Logika routing, event handler, state kuis, latihan, & modal
│   │   └── data/
│   │       └── principles.js            # Data 9 prinsip dasar desain grafis (F03 & F04)
│   │
│   └── images/                          # Direktori aset gambar & icon pendukung (F04, mockup)
│
├── pages/                               # Modular partials / komponen halaman per fitur
│   ├── beranda.html                     # Section 1: Beranda & ringkasan 3 modul (F01)
│   ├── cptp.html                        # Section 2: Halaman pengantar CP, TP, & pemanasan interaktif (F02)
│   ├── modul1.html                      # Section 3: Modul 1 (9 prinsip, kanvas karya beranotasi, toggle simetris/asimetris) (F03, F04)
│   ├── latihan.html                     # Section 4: Latihan interaktif hierarki & emphasis (F09)
│   ├── kuis.html                        # Section 5: Kuis evaluasi berbasis skor batas tuntas 75 (F10)
│   └── testcase.html                    # Section 6: Lembar pengujian Black Box F03 & F04 terisi (Nur Hidayat)
│
└── docs/ & panduan/                     # Dokumen referensi & proposal tim
    ├── PROPOSAL GRAFIKAKU REVISI.docx
    ├── Panduan_Atribut_Desain_GrafikaKu.docx
    ├── Naskah Konten Tiga Modul GrafikaKu.docx
    ├── Section 1.png                    # Acuan wireframe Lo-Fi & Hi-Fi Figma
    ├── cp dan tp.pdf
    └── timeline revisi 2.pdf
```

---

## 🧩 Pembagian Modul & Tanggung Jawab (Separation of Concerns)

1. **`assets/css/style.css`**:
   - Memusatkan desain token (`:root` CSS variables): warna Indigo (`#4338CA`), Amber (`#F59E0B`), Navy (`#1E2A5E`), Green (`#0F766E`), Red (`#B91C1C`).
   - Menyediakan grid responsif 12-kolom (desktop), 8-kolom (tablet), dan 4-kolom (ponsel), dengan ukuran tombol sentuh $\ge 44 \times 44\text{ px}$.

2. **`assets/js/data/principles.js`**:
   - Berisi array `principlesData` untuk 9 prinsip desain (Unity, Balance, Composition, Proportion, Rhythm, Emphasis, Simplicity, Clarity, Space).
   - Setiap entri memuat deskripsi, kata kunci, analisis contoh, tips kesalahan, dan koordinat *hotspot pin* beranotasi.

3. **`assets/js/app.js`**:
   - **Router SPA**: Mengelola perpindahan halaman via hash routing (`#beranda`, `#cptp`, `#modul1`, `#latihan`, `#kuis`, `#testcase`).
   - **Interaktivitas Modul 1**: Render SVG dinamis, *hotspot annotation popover*, dan *toggle* mode Simetris/Asimetris.
   - **Pemanasan Interaktif**: Engine pencocokan istilah dan definisi (Unity, Balance, Rhythm, Emphasis).
   - **Latihan & Kuis**: Penilaian interaktif otomatis dan umpan balik skor batas tuntas $\ge 75$.
   - **Modal Manager**: Pop-up glosarium dan dialog kunci antar-modul.

4. **`pages/*.html`**:
   - File template modular untuk masing-masing bagian halaman web sehingga anggota kelompok (Nur Hidayat, Nailha Dinda, Islatul Adha, Abi Rafdi) dapat mengedit bagian masing-masing tanpa konflik kode di satu file raksasa.

