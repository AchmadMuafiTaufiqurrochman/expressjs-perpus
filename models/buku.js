const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buku', {
    id_buku: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nama_buku: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    tahun_buku: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nama_penulis: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'buku',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_buku" },
        ]
      },
    ]
  });
};
