# Latithara Cafe

## About Project
Latithara Cafe Web adalah aplikasi web yang dirancang khusus untuk menghadirkan pengalaman kafe virtual bagi para pelanggan dan admin. Dengan fitur-fitur canggih dan antarmuka yang ramah pengguna, Latithara Cafe Web memungkinkan pelanggan untuk dengan mudah mengakses daftar menu, menghubungi kafe, serta berkonsultasi dengan layanan pelanggan berbasis AI. Selain itu, admin memiliki kemampuan untuk menambah, mengedit, dan menghapus item menu sesuai kebutuhan. 

## Features
- Landing Page/Home Page statik (location) 
- halaman Menu makanan dan minuman dinamis 
- formulir kontak untuk pertanyaan user (tanpa login) (POST-API) 
- Login admin default  biar bisa menambahkan 
- CRUD penambahan barang 
- CS terkait menu yang ada di cafe


### User
Melihat Daftar Menu:
-  Melihat daftar menu makanan dan minuman yang dinamis.
-  Melihat deskripsi, harga, dan foto dari setiap item menu.
-  Menggunakan fitur filter dan pencarian untuk menemukan item menu dengan mudah.

Menggunakan Formulir Kontak:
-  Mengirimkan pertanyaan atau feedback melalui formulir kontak.
-  Tidak perlu login untuk mengirimkan formulir.
-  Mendapatkan respons cepat dari layanan pelanggan.

Interaksi dengan Layanan Cuatomer AI:
-  Konsultasi dengan chatbot AI untuk rekomendasi menu dan informasi.
-  Mendapatkan jawaban real-time atas pertanyaan umum.
-  Pengalaman interaksi yang dipersonalisasi berdasarkan riwayat pelanggan.

### Admin
Manajemen Menu:
- Menambah item menu baru dengan deskripsi, harga, dan foto.
- Mengedit item menu yang sudah ada untuk memperbarui informasi atau harga.
- Menghapus item menu yang sudah tidak tersedia.

Akses Admin Default:
- Login menggunakan kredensial admin default.
- Akses penuh ke fitur manajemen dan konfigurasi situs.
- Autentikasi dasar untuk keamanan.

Monitoring dan Manajemen Layanan Customer AI:
-  Memantau interaksi chatbot AI dengan pelanggan.
-  Melatih dan memperbarui AI untuk meningkatkan kualitas layanan.
-  Mengintegrasikan data dari chatbot AI untuk analisis lebih lanjut.

## Tech Stacks
Daftar tools:
- Node
- Axios
- Visual Studio Code
- React Js
- Github
- Github Desktop
- Tailwind
- Supabase
- React router dom
- Vite
- React icons

## Live App Demo
https://mini-project-alterra-eight.vercel.app

## Setup 
Berikut adalah langkah-langkah untuk menjalankan proyek ini secara lokal:

1. Clone repository ini:
   ```bash
   git clone https://github.com/username/coffee-web.git
   cd coffee-web
2. Install dependencies:
   ```bash
    npm install
3. Konfigurasi environment variables:
   ```.env
    VITE_GENERATIVE_LANGUAGE_API_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
    VITE_GENERATIVE_LANGUAGE_API_KEY="AIzaSyDhfg1GTNmsES0CjJiSkgPQSm98CxtVkdc"
    VITE_SUPABASE_URL="https://sksjsvotnzydxcjfanxn.supabase.co"
    VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrc2pzdm90bnp5ZHhjamZhbnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxNjE3NDMsImV4cCI6MjAzMDczNzc0M30.MNUSc9iuL2-  pyi0Vk8syeZzke9g6X2sZ8HrupWfZ7Hk"
   
4. Jalankan server lokal:
```bash
npm run dev

