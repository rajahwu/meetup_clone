'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attendance.belongsTo(models.User, { foreignKey: 'userId' })
      Attendance.belongsTo(models.Event, { foreignKey: 'eventId' })
    }
  }
  Attendance.init({
    id : {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};