const { DataTypes } = require('sequelize');

module.exports = {
  idCat: { type: DataTypes.INTEGER, allowNull: false },
  img: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING },
  subtitle: { type: DataTypes.STRING },
  desc: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.DOUBLE, defaultValue: 1 },
};
