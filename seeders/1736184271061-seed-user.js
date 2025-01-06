
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [
  {
    "id_user": 1,
    "nama_user": "admin",
    "status_user": "admin"
  },
  {
    "id_user": 2,
    "nama_user": "bambang",
    "status_user": "mahasiswa"
  },
  {
    "id_user": 3,
    "nama_user": "agus",
    "status_user": "staff"
  }
]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};
