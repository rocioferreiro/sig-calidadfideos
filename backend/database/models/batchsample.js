'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BatchSample extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BatchSample.belongsTo(models.Batch, {
        foreignKey: 'batchId',
        as: 'batch',
        onDelete: 'CASCADE',
      });
      BatchSample.belongsTo(models.Sample, {
        foreignKey: 'sampleId',
        as: 'sample',
        onDelete: 'CASCADE',
      });
    }
  }
  BatchSample.init({
    batchId: DataTypes.INTEGER,
    sampleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BatchSample',
  });
  return BatchSample;
};
