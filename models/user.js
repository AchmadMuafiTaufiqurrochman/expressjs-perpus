const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id_user: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nama_user: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    status_user: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
      {
        name: "nama_user",
        using: "BTREE",
        fields: [
          { name: "nama_user" },
        ]
      },
    ]
  });
};
