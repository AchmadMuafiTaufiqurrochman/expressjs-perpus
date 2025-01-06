const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('peminjaman', {
    id_peminjaman: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_buku: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'buku',
        key: 'id_buku'
      }
    },
    tanggal_dipinjam: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    tanggal_dikembalikan: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'peminjaman',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_peminjaman" },
        ]
      },
      {
        name: "id_user",
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
      {
        name: "buku dipinjam",
        using: "BTREE",
        fields: [
          { name: "id_buku" },
        ]
      },
    ]
  });
};
