# Waroeng Digital

**Waroeng Digital** adalah sebuah aplikasi web Single Page Application yang mensimulasikan sebuah platform pemesanan makanan online dengan cita rasa kuliner khas Indonesia. Aplikasi ini dibangun sepenuhnya menggunakan **JavaScript**, HTML, dan CSS, tanpa menggunakan framework eksternal seperti React atau Vue.

Aplikasi ini dirancang untuk menjadi portofolio yang menunjukkan kemampuan dalam membangun aplikasi web modern dari dasar, mencakup manajemen state, routing sisi klien, otentikasi, dan manipulasi DOM secara dinamis.

Url website: https://evaluasi-js-pekan4.vercel.app/
Url github: https://github.com/seiawanrizqi9-cyber/evaluasi-js-pekan4
Link File Presentasi: https://www.canva.com/design/DAG0VNyZQ8U/4NoXkrjzNJ6S_pbpGf-9JQ/edit

---

## 🚀 Fitur Utama

Aplikasi ini memiliki dua peran utama: **User** dan **Admin**, dengan fitur yang berbeda untuk masing-masing peran.

### Fitur untuk User

- **Otentikasi**: Sistem login dan registrasi yang aman. Sesi login disimpan menggunakan `sessionStorage`.
- **Navigasi Halaman**:
  - **Beranda**: Halaman utama yang berisi informasi tentang Waroeng Digital dan ulasan pelanggan.
  - **Kategori**: Menampilkan makanan yang dikelompokkan berdasarkan kategori (Nasi, Daging, Pedas, dll.).
  - **Regional**: Menampilkan makanan yang dikelompokkan berdasarkan asal daerah (Sumatera, Jawa, Bali, dll.).
- **Keranjang Belanja**: Pengguna dapat menambahkan item ke keranjang, mengatur jumlah, dan melihat total harga.
- **Proses Checkout**: Simulasi proses checkout untuk menyelesaikan pesanan.
- **Ulasan & Rating**: Pengguna dapat memberikan ulasan dan rating bintang pada halaman beranda.
- **Tema Terang & Gelap**: Terdapat tombol untuk mengubah tema tampilan antara mode terang dan gelap.
- **Desain Responsif**: Tampilan yang beradaptasi dengan baik di berbagai ukuran layar, dari desktop hingga mobile.

### Fitur untuk Admin

- **Login Khusus**: Admin memiliki password khusus untuk mengakses dashboard.
- **Dashboard Admin**: Halaman khusus untuk mengelola data makanan.
- **Manajemen Menu (CRUD)**:
  - **Create**: Menambahkan menu makanan baru melalui form, termasuk nama, harga, deskripsi, gambar (upload), multi-kategori, dan daerah (opsional).
  - **Read**: Melihat semua menu yang telah ditambahkan dalam format tabel.
  - **Update**: Mengedit detail makanan (saat ini menggunakan `prompt`).
  - **Delete**: Menghapus makanan dari daftar.

---

## 🎯 Masalah & Solusi

Proyek ini dikembangkan untuk menjawab beberapa tantangan umum dalam dunia kuliner digital:

1.  **Akses Mudah ke Makanan Lokal**

    - **Masalah**: Sulitnya menemukan dan memesan makanan khas dari berbagai daerah tanpa harus mengunjungi lokasi aslinya.
    - **Solusi**: Aplikasi ini menyediakan halaman **Regional** yang memungkinkan pengguna untuk menjelajahi dan memesan kuliner nusantara secara praktis dari mana saja.

2.  **Pencarian yang Tidak Efisien**

    - **Masalah**: Pengguna seringkali bingung saat dihadapkan pada terlalu banyak pilihan menu tanpa pengelompokan yang jelas.
    - **Solusi**: Fitur **Kategori** (seperti Nasi, Daging, Pedas) membantu pengguna menyaring pilihan dengan cepat sesuai selera atau jenis makanan yang diinginkan.

3.  **Dukungan untuk UMKM**

    - **Masalah**: Banyak UMKM kuliner lokal yang memiliki produk berkualitas namun kesulitan menjangkau pasar yang lebih luas secara digital.
    - **Solusi**: Dengan fitur **Dashboard Admin**, platform ini memberikan "etalase" online bagi UMKM untuk mengelola dan mempromosikan produk mereka ke lebih banyak pelanggan.

4.  **Pengalaman Pengguna yang Rumit**
    - **Masalah**: Proses pemesanan online terkadang rumit dan tidak intuitif, mengurangi kenyamanan pelanggan.
    - **Solusi**: Aplikasi ini dirancang dengan antarmuka yang bersih, alur pemesanan yang sederhana (tambah ke keranjang, checkout), dan fitur tambahan seperti **tema terang/gelap** untuk kenyamanan pengguna.

---

## 🛠️ Tumpukan Teknologi (Tech Stack)

Aplikasi ini adalah **100% Client-Side** dan tidak memerlukan backend khusus.

- **Frontend**:

  - **HTML**: Struktur semantik untuk konten web.
  - **CSS**: Styling modern dengan **Flexbox**, **Grid Layout**, **CSS Variables** (untuk theming), dan **Media Queries** (untuk responsivitas).
  - **Vanilla JavaScript**: Otak dari aplikasi, digunakan untuk semua logika, termasuk:
    - **ES6 Modules**: Mengorganisir kode ke dalam file-file terpisah (`main.js`, `ui.js`, `storage.js`).
    - **Async/Await**: Untuk menangani operasi asinkron seperti membaca file gambar.
    - **DOM Manipulation**: Membangun UI secara dinamis tanpa me-refresh halaman.

- **Database**:

  - **Browser `localStorage`**: Digunakan sebagai "database" utama untuk menyimpan data pengguna, daftar menu, dan ulasan secara persisten.
  - **Browser `sessionStorage`**: Digunakan untuk menyimpan status sesi login pengguna.

- **Ikon**:
  - **Font Awesome**: Untuk ikon-ikon yang digunakan di seluruh aplikasi.

---

## ⚙️ Cara Menjalankan Secara Lokal

Karena aplikasi ini menggunakan ES6 Modules (`import`/`export`), Anda tidak bisa langsung membuka file `index.html` di browser. Anda perlu menjalankannya melalui sebuah server lokal. Cara termudah adalah menggunakan ekstensi **Live Server** di Visual Studio Code.

1.  **Clone Repository**

    ```bash
    git clone https://github.com/username/repo-name.git
    ```

2.  **Buka di VS Code**

    Buka folder proyek yang sudah di-clone di Visual Studio Code.

3.  **Install Live Server**

    Jika belum terpasang, cari dan install ekstensi `Live Server` dari marketplace VS Code.

     <!-- Ganti dengan screenshot ekstensi Live Server -->

4.  **Jalankan Aplikasi**

    Klik kanan pada file `index.html` di dalam explorer VS Code, lalu pilih **"Open with Live Server"**.

    Browser akan otomatis terbuka dan menjalankan aplikasi di alamat seperti `http://127.0.0.1:5500`.

---

## 🚀 Cara Deploy

Aplikasi ini adalah situs statis, sehingga sangat mudah untuk di-deploy. Anda bisa menggunakan layanan hosting statis gratis seperti GitHub Pages, Netlify, atau Vercel.

### Deploy menggunakan GitHub Pages

1.  **Push ke GitHub**: Pastikan semua kode Anda sudah di-push ke repository GitHub.

2.  **Aktifkan GitHub Pages**:

    - Masuk ke repository Anda di GitHub.
    - Klik tab **"Settings"**.
    - Di menu samping, pilih **"Pages"**.
    - Pada bagian "Build and deployment", di bawah "Source", pilih **"Deploy from a branch"**.
    - Pilih branch yang ingin Anda deploy (biasanya `main` atau `master`).
    - Klik **"Save"**.

3.  **Selesai!**
    Tunggu beberapa menit, dan situs Anda akan tersedia di URL seperti:
    `https://<username>.github.io/<repository-name>/`

### Deploy menggunakan Netlify/Vercel

1.  Buat akun di Netlify atau Vercel.
2.  Hubungkan akun GitHub Anda.
3.  Pilih repository proyek ini.
4.  Pengaturan build bisa dikosongkan karena ini adalah situs statis.
5.  Klik **"Deploy Site"**.

---

## Credentials untuk Testing

- **User**: Bisa mendaftar dengan email dan password apa saja.
- **Admin**:
  - **Email**: (email apa saja)
  - **Password**: `chefwaroeng#25`

## Penutup
Mungkin Sekian yang bisa saya jelaskan kepada para pembaca semoga website ini bermanfaat untuk kita bersama!
