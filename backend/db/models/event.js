'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    groupId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      validate: {
        minLen: function(value) {
          value.length >= 5
        }
      }
    },
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    startDate: {
      type: DataTypes.DATE,
      validate: {
        isAfter: Date.now()
      }
    },
    endDate: {
      type: DataTypes.DATE,
      validate: {
        isAfter: this.startDate
      }
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};