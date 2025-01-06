var DataTypes = require("sequelize").DataTypes;
var _buku = require("./buku");
var _peminjaman = require("./peminjaman");
var _user = require("./user");

function initModels(sequelize) {
  var buku = _buku(sequelize, DataTypes);
  var peminjaman = _peminjaman(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  peminjaman.belongsTo(buku, { as: "id_buku_buku", foreignKey: "id_buku"});
  buku.hasMany(peminjaman, { as: "peminjamans", foreignKey: "id_buku"});

  return {
    buku,
    peminjaman,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
