# Spesifikasi Desain Web: Neo-Brutalism / Retro Pop

Dokumen ini berisi panduan sistem desain berdasarkan referensi gambar UI/UX. Gaya yang digunakan adalah **Neo-Brutalism** dengan elemen grafis melayang, *hard shadows*, dan warna-warna pop yang kontras.

## 1. Tema & Estetika
*   **Gaya:** Neo-Brutalism, Retro Pop, Memphis Design.
*   **Ciri Khas:** 
    *   Border hitam tebal (2px - 4px).
    *   *Hard drop shadow* (bayangan solid tanpa *blur*).
    *   Sudut membulat (*rounded corners*) yang tegas.
    *   Elemen dekoratif geometris yang tersebar di latar belakang.

---

## 2. Palet Warna (Color Palette)

Desain ini menggunakan warna latar yang lembut dipadukan dengan elemen aksen yang sangat mencolok.

*   **Warna Dasar (Base):**
    *   `Background` (Krem/Beige): `#F4EFE6` atau `#FDF7ED`
    *   `Card/Container` (Putih): `#FFFFFF`
    *   `Text & Border` (Hitam pekat): `#000000` atau `#111111`
*   **Warna Aksen (Accents):**
    *   🟡 `Yellow` (Tombol utama): `#FFD166` atau `#FFC700`
    *   💖 `Pink` (Background foto/Ikon): `#EF476F` atau `#FF61A6`
    *   🟦 `Blue` (Badge nama): `#8AB4F8` atau `#AEC6CF`
    *   🟩 `Green/Teal` (Ikon/Elemen): `#06D6A0`
    *   🟪 `Purple` (Elemen dekoratif): `#9D4EDD` atau `#B983FF`

---

## 3. Tipografi (Typography)

Gunakan font *Sans-Serif* yang tebal dan bersih untuk menonjolkan kesan modern dan *bold*.

*   **Font Family Rekomendasi:** `Inter`, `Clash Display`, `Space Grotesk`, atau `Poppins`.
*   **Hierarki:**
    *   `H1` (Hero Title): Sangat besar, *Black/Extra Bold* (misal: "I teach UX/UI...").
    *   `H2` (Section Title): Besar, *Bold* (misal: "What I do").
    *   `H3` (Card Title): Sedang, *Bold* (misal: "Product Design").
    *   `Body`: Reguler/Medium, warna abu-abu gelap atau hitam untuk keterbacaan tinggi.

---

## 4. UI Components & Styling (CSS/Tailwind)

Kunci utama dari desain ini ada pada kombinasi `border` dan `box-shadow`.

### A. Kontainer Utama (Main Wrapper)
*   **Border:** `3px solid #000000`
*   **Radius:** `24px` (Sudut membulat besar)
*   **Shadow:** *Hard shadow* di bagian bawah dan kanan.
*   *Tailwind:* `border-4 border-black rounded-[24px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white`

### B. Tombol (Buttons)
*   **Bentuk:** *Pill* (Sangat membulat ujungnya).
*   **Warna:** Kuning (`#FFD166`) dengan teks hitam tebal.
*   **Border:** `2px solid #000000`
*   **Shadow:** `4px 4px 0px 0px #000000`
*   *Efek Hover:* Posisi tombol sedikit bergeser ke bawah/kanan dan bayangan mengecil untuk efek "ditekan".
*   *Tailwind:* `bg-[#FFC700] text-black font-bold py-3 px-8 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all`

### C. Kartu (Cards) - *Section "What I do"*
*   **Bentuk:** Persegi panjang vertikal.
*   **Radius:** `16px`
*   **Border:** `2px solid #000000`
*   **Shadow:** `6px 6px 0px 0px #000000`
*   **Padding:** Luas (sekitar `24px` atau `32px`).
*   *Tailwind:* `bg-white rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6`

### D. Badge / Tag (Misal: "Kristina")
*   **Bentuk:** *Pill*.
*   **Warna:** Biru atau warna aksen lainnya.
*   **Shadow:** *Hard shadow* hitam, sama seperti tombol.

---

## 5. Layouting

*   **Desktop View:**
    *   **Navbar:** Logo di kiri, menu navigasi di tengah/kanan, rapi dan sejajar.
    *   **Hero Section:** Dibagi dua kolom. Teks besar dan CTA di kiri, foto profil dengan aksen bentuk (seperti *shield* pink) di kanan.
    *   **Features:** Grid 3 kolom untuk menampilkan kartu "What I do".
*   **Mobile View:**
    *   **Navbar:** Menggunakan *Hamburger menu*.
    *   **Hero Section:** Tumpuk (*Stacked*). Teks hero di atas, tombol CTA, lalu diikuti foto profil di bawahnya. Teks disesuaikan ukurannya menjadi lebih kecil agar *mobile-friendly*.
    *   **Features:** Grid berubah menjadi 1 kolom vertikal (*stacked*).

---

## 6. Elemen Dekoratif (Floating Elements)
Desain ini menggunakan banyak stiker/bentuk abstrak yang melayang (ikon bola basket, logo figma, bentuk hati, kursor).
*   **Implementasi:** Gunakan gambar SVG atau PNG dengan *transparent background*.
*   **Styling:** Berikan `position: absolute`, border hitam, dan hard shadow pada elemen-elemen ini, lalu tempatkan dengan `top`, `left`, `right`, `bottom` atau rotasi (`rotate`) secara acak di sekitar pinggiran layar (menggunakan `overflow-hidden` pada *body* agar tidak membuat *horizontal scroll*).