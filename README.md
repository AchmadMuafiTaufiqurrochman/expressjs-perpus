SiPupus adalah sebuah aplikasi Restfull API Perpustakaan sederhana. Aplikasi ini menggunakan protokol HTTP dengan metode GET, PUT, DELETE.
Tech Stack yang digunakan dalam aplikasi ini :

- Nodejs 18.8.0
- Database Mysql 8.0.30
- PM2 (deployment)
- Docker (containerization)
  
# Deployment

Berikut adalah panduan untuk deployment source code pada aplikasi SiPupus :

## Install langsung pada OS

1. Clone repo github SiPuspus :
	
```bash
git clone https://github.com/AchmadMuafiTaufiqurrochman/expressjs-perpus.git
```
	
2. Buka terminal dan install dependency yang dibutuhkan dengan command :
	
```bash
npm install
```
	
3. Dalam direktori project ini ada 3 file utama :
	a. index.js : Aplikasi utama yang akan di run
	b. database.js : Koneksi database mysql
	c. response.js : Formatting response json rest api
	
4. Cek pada file `database.js` sesuaikan dengan enviroment yang ada pada file tersebut ketika setup database.

5. Jika dirasa sudah siap, jalankan perintah pada terminal command line, untuk testing program dalam enviroment development :
	
```bash
npm run dev
```
    
5. Untuk menjalankan aplikasi dalam enviroment production, install dependency pm2 secara global :

```bash
npm install pm2 -g
```

6. Jalankan Aplikasi dengan pm2 

```bash
pm2 start index.js
```
## Menggunakan Docker Container

1. Clone repo github SiPuspus :
   
```bash
git clone https://github.com/AchmadMuafiTaufiqurrochman/expressjs-perpus.git
```
2. Buka terminal dan build aplikasi docker container dengan command :

```bash
docker compose up --build
```

# Setup Database 

## 1. Setup Database

Langkah-langkah untuk mengatur database Aplikasi siPuspus:

### a. Buat Database Baru

1. Masuk ke MySQL menggunakan terminal:
    
    ```bash
    mysql -u root -p
    ```
    
2. Buat database baru dengan nama yang diinginkan, misalnya `perpus`:
    
    ```sql
    CREATE DATABASE perpus;
    USE perpus;
    ```
    

### b. Impor File SQL

1. Keluar dari MySQL jika masih aktif dengan perintah:
    
    ```sql
    EXIT;
    ```
    
2. Gunakan perintah berikut untuk mengimpor file SQL:
    
    ```bash
    mysql -u root -p perpus < /path/to/perpus.sql
    ```
    
    Ganti `/path/to/perpus.sql` dengan lokasi file SQL Anda. Misalnya:
    
    ```bash
    mysql -u root -p perpus < /mnt/data/perpus.sql
    ```
    

## 2. Cek Tabel

Setelah database berhasil diimpor, gunakan langkah berikut untuk memeriksa tabel yang ada:

1. Masuk ke MySQL kembali:
    
    ```bash
    mysql -u root -p
    ```
    
2. Pilih database yang telah dibuat:
    
    ```sql
    USE perpus;
    ```
    
3. Tampilkan daftar tabel:
    
    ```sql
    SHOW TABLES;
    ```
    
4. Maka akan tampil output tabel seperti ini :
	
```sql
+------------------+
| Tables_in_perpus |
+------------------+
| buku             |
| peminjaman       |
| user             |
+------------------+
3 rows in set (0.00 sec)
```
	

## 3. Cek Data

Untuk memeriksa data yang telah diimpor, gunakan perintah berikut:

### a. Cek Data dari Tabel `user`

```sql
SELECT * FROM user;
```

	Hasil dari query diatas  :

```sql
+---------+-----------+-------------+                                  
| id_user | nama_user | status_user |                             
+---------+-----------+-------------+                             
|       1 | admin     | admin       |          
|       2 | bambang   | mahasiswa   |                             
|       3 | agus      | staff       |                      
+---------+-----------+-------------+                                  
3 rows in set (0.00 sec)
```
### b. Cek Data dari Tabel `buku`

```sql
SELECT * FROM buku;
```

	Hasil dari query diatas  :

```sql
+---------+-------------------------------------+------------+------------------+
| id_buku | nama_buku                           | tahun_buku | nama_penulis     |  
+---------+-------------------------------------+------------+------------------+  
|       1 | Pemrograman untuk Pemula            |       2019 | Ahmad Ridwan     |
|       2 | Belajar Data Mining                 |       2021 | Nina Fadilah     |
|       3 | Dasar-dasar Machine Learning        |       2020 | Rendi Pratama    |
|       4 | Jaringan Komputer Modern            |       2018 | Siti Rahmah      |
|       5 | Keamanan Cyber untuk Pemula         |       2022 | Fajar Nugroho    |
|       6 | Panduan Lengkap HTML dan CSS        |       2017 | Lisa Santoso     |
|       7 | Pengantar Algoritma dan Pemrograman |       2019 | Taufik Hidayat   |
|       8 | Flutter untuk Pemula                |       2020 | Eka Putra        |
|       9 | Manajemen Proyek IT                 |       2021 | Arif Wahyudi     |
|      10 | Optimasi Database                   |       2018 | Yusuf Firmansyah |
+---------+-------------------------------------+------------+------------------+
10 rows in set (0.00 sec)
```

### c. Cek Data dari Tabel `peminjaman`

```sql
SELECT * FROM peminjaman;
```

	Hasil dari query diatas  :

```sql
+---------------+---------+---------+------------------+----------------------+
| id_peminjaman | id_user | id_buku | tanggal_dipinjam | tanggal_dikembalikan |
+---------------+---------+---------+------------------+----------------------+
|             1 |       2 |       2 | 2025-01-01       | 2025-01-02           |
|             2 |       1 |      10 | 2025-01-06       | 2025-04-02           |
|             3 |       3 |       6 | 2025-01-06       | NULL                 |
+---------------+---------+---------+------------------+----------------------+
3 rows in set (0.00 sec)
```

## Catatan Tambahan

- Pastikan MySQL sudah diinstal di sistem.
- Jika terjadi kesalahan saat impor, pastikan file SQL tidak korup dan memiliki format yang benar.
- Jika menggunakan docker container tidak perlu untuk membuat database dan impor file sql untuk migrasi dan seeding. Karena semua telah di setup secara otomatis oleh docker engine ketika container dijalankan.

# Cara menggunakan API

Pada aplikasi ini menggunakan port default :3000. Jika ingin berinteraksi dengan API ini bisa menggunakan ip locahost dan port aplikasi 

```
localhost:3000/(endpoint)
```

API ini memungkinkan Anda untuk mengelola data user, peminjaman, dan pengembalian buku di sistem perpustakaan. Berikut adalah dokumentasi lengkap untuk setiap endpoint yang tersedia menggunakan `curl` dan format respons JSON yang dirapikan dengan `jq`.

## **Persiapan**

1. Pastikan `curl` dan `jq` telah terinstal di sistem Anda.
    - Untuk menginstal `jq` di Linux:
        
        ```bash
        sudo apt install jq
        ```
        
2. Semua endpoint dijalankan pada `localhost` dengan port `3000`.

---

## **1. GET `/user`**

**Deskripsi**: Mendapatkan data semua user.

#### Perintah:

```bash
curl -X GET http://localhost:3000/user | jq
```

---

## **2. GET `/peminjaman`**

**Deskripsi**: Mendapatkan data semua peminjaman buku.

#### Perintah:

```bash
curl -X GET http://localhost:3000/peminjaman | jq
```

---

## **3. GET `/peminjaman/belum-dikembalikan`**

**Deskripsi**: Mendapatkan data peminjaman buku yang belum dikembalikan.

#### Perintah:

```bash
curl -X GET http://localhost:3000/peminjaman/belum-dikembalikan | jq
```

---

## **4. POST `/meminjam`**

**Deskripsi**: Menambahkan data peminjaman buku.

#### **Payload**:

```json
{
  "id_user": 1,
  "id_buku": 10,
  "tanggal_dipinjam": "2025-01-06"
}
```

#### Perintah:

```bash
curl -X POST http://localhost:3000/meminjam \
-H "Content-Type: application/json" \
-d '{"id_user":1,"id_buku":10,"tanggal_dipinjam":"2025-01-06"}' | jq
```

---

## **5. PUT `/dikembalikan`**

**Deskripsi**: Memperbarui tanggal pengembalian buku. Hanya dapat diakses oleh `nama_user: admin`.

#### **Payload**:

```json
{
  "nama_user": "admin",
  "id_peminjaman": 1,
  "tanggal_dikembalikan": "2025-01-06"
}
```

#### Perintah:

```bash
curl -X PUT http://localhost:3000/dikembalikan \
-H "Content-Type: application/json" \
-d '{"nama_user":"admin","id_peminjaman":1,"tanggal_dikembalikan":"2025-01-06"}' | jq
```

---
