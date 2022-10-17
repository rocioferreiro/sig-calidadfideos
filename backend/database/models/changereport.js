'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChangeReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChangeReport.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      });

      ChangeReport.belongsTo(models.Sample, {
        foreignKey: 'lastSampleId',
        as: 'lastSample',
        onDelete: 'CASCADE',
      });

      ChangeReport.belongsTo(models.Sample, {
        foreignKey: 'newSampleId',
        as: 'newSample',
        onDelete: 'CASCADE',
      });
    }
  }
  ChangeReport.init({
    type: DataTypes.STRING,
    date: DataTypes.DATE,
    lastSampleId: DataTypes.INTEGER,
    newSampleId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ChangeReport',
  });
  return ChangeReport;
};
