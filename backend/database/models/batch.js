'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Batch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Batch.hasMany(models.BatchSample, {
        foreignKey: 'batchId',
        as: 'batchSamples',
        onDelete: 'CASCADE',
      })
      Batch.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
        onDelete: 'CASCADE',
      });
    }
  }
  Batch.init({
    sku: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    batchNumber: DataTypes.INTEGER,
    productionDate: DataTypes.DATE,
    state: DataTypes.STRING,
    shatterLevel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Batch',
  });
  return Batch;
};
