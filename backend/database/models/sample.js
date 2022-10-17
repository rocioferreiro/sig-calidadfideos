'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sample extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sample.hasMany(models.ChangeReport, {
        foreignKey: 'lastSampleId',
        as: 'oldReports',
        onDelete: 'CASCADE',
      });

      Sample.hasMany(models.ChangeReport, {
        foreignKey: 'newSampleId',
        as: 'newReports',
        onDelete: 'CASCADE',
      });

      Sample.hasMany(models.BatchSample, {
        foreignKey: 'sampleId',
        as: 'batchSamples',
        onDelete: 'CASCADE',
      });
    }
  }
  Sample.init({
    state: DataTypes.STRING,
    packingDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Sample',
  });
  return Sample;
};
