const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

// Ganti dengan konfigurasi database kamu
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'perpus',
});

// Nama tabel yang ingin di-seed
const tables = ['buku', 'user', 'peminjaman']; // Ganti dengan nama tabel kamu

const generateSeeder = async () => {
  // Pastikan folder 'seeders' ada
  const seedersFolder = path.join(__dirname, 'seeders');
  if (!fs.existsSync(seedersFolder)) {
    fs.mkdirSync(seedersFolder);
  }

  for (let table of tables) {
    try {
      // Ambil data dari tabel
      const tableData = await sequelize.query(`SELECT * FROM ${table}`, {
        type: Sequelize.QueryTypes.SELECT,
      });

      // Format data untuk seeder
      const seedData = tableData.map(item => {
        let data = {};
        Object.keys(item).forEach(key => {
          // Jika kolom adalah id auto increment, jangan ikutkan dalam seeding
          if (key !== 'id') {
            data[key] = item[key];
          }
        });
        return data;
      });

      // Format isi file seeder
      const seederContent = `
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('${table}', ${JSON.stringify(seedData, null, 2)});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('${table}', null, {});
  }
};
`;

      // Tulis file seeder ke folder seeders
      const fileName = path.join(seedersFolder, `${new Date().getTime()}-seed-${table}.js`);
      fs.writeFileSync(fileName, seederContent);

      console.log(`Seeder untuk tabel ${table} berhasil dibuat!`);
    } catch (error) {
      console.error(`Gagal membuat seeder untuk tabel ${table}:`, error);
    }
  }
};

generateSeeder();
