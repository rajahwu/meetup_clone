'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Venue.belongsToMany(models.Group, {
      //   through: models.Event,
      //   foreignKey: 'venueId ',
      //   otherKey: 'groupId'
      // })
      // Venue.hasMany(models.Event, { foreignKey: 'venueId' })
    }
  }
  Venue.init({
    groupId: {
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Venue',
  });
  return Venue;
};