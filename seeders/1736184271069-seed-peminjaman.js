
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('peminjaman', [
  {
    "id_peminjaman": 1,
    "id_user": 2,
    "id_buku": 2,
    "tanggal_dipinjam": "2025-01-01",
    "tanggal_dikembalikan": "2025-01-02"
  },
  {
    "id_peminjaman": 2,
    "id_user": 1,
    "id_buku": 10,
    "tanggal_dipinjam": "2025-01-06",
    "tanggal_dikembalikan": "2025-04-02"
  },
  {
    "id_peminjaman": 3,
    "id_user": 3,
    "id_buku": 6,
    "tanggal_dipinjam": "2025-01-06",
    "tanggal_dikembalikan": null
  }
]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('peminjaman', null, {});
  }
};
