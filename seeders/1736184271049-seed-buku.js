
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('buku', [
  {
    "id_buku": 1,
    "nama_buku": "Pemrograman untuk Pemula",
    "tahun_buku": 2019,
    "nama_penulis": "Ahmad Ridwan"
  },
  {
    "id_buku": 2,
    "nama_buku": "Belajar Data Mining",
    "tahun_buku": 2021,
    "nama_penulis": "Nina Fadilah"
  },
  {
    "id_buku": 3,
    "nama_buku": "Dasar-dasar Machine Learning",
    "tahun_buku": 2020,
    "nama_penulis": "Rendi Pratama"
  },
  {
    "id_buku": 4,
    "nama_buku": "Jaringan Komputer Modern",
    "tahun_buku": 2018,
    "nama_penulis": "Siti Rahmah"
  },
  {
    "id_buku": 5,
    "nama_buku": "Keamanan Cyber untuk Pemula",
    "tahun_buku": 2022,
    "nama_penulis": "Fajar Nugroho"
  },
  {
    "id_buku": 6,
    "nama_buku": "Panduan Lengkap HTML dan CSS",
    "tahun_buku": 2017,
    "nama_penulis": "Lisa Santoso"
  },
  {
    "id_buku": 7,
    "nama_buku": "Pengantar Algoritma dan Pemrograman",
    "tahun_buku": 2019,
    "nama_penulis": "Taufik Hidayat"
  },
  {
    "id_buku": 8,
    "nama_buku": "Flutter untuk Pemula",
    "tahun_buku": 2020,
    "nama_penulis": "Eka Putra"
  },
  {
    "id_buku": 9,
    "nama_buku": "Manajemen Proyek IT",
    "tahun_buku": 2021,
    "nama_penulis": "Arif Wahyudi"
  },
  {
    "id_buku": 10,
    "nama_buku": "Optimasi Database",
    "tahun_buku": 2018,
    "nama_penulis": "Yusuf Firmansyah"
  }
]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('buku', null, {});
  }
};
