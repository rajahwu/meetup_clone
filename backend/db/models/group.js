'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsTo(models.User, { foreignKey: 'organizerId' })
      Group.hasMany(models.GroupImage, { foreignKey: 'groupId',  onDelete: 'CASCADE', hooks: true })
      Group.hasMany(models.Membership, { foreignKey: 'groupId', onDelete: 'CASCADE', hooks: true })
      Group.hasMany(models.Event, { foreignKey: 'groupId', onDelete: 'CASCADE', hooks: true })

      Group.hasMany(models.Venue, { foreignKey: 'groupId', onDelete: 'CASCADE', hooks: true })
      
      Group.belongsToMany(models.User, {
        through: models.Membership,
        foreignKey: 'groupId',
        otherKey: 'userId'
      })
    }
  }
  Group.init({
    organizerId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [0,60]
      }
    },
    about: {
      type: DataTypes.STRING,
      validate: {
        minLen: function (value) {
          value.length >= 50
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      isIn: [["Online", "In person"]]
    },
    private: DataTypes.BOOLEAN,
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};