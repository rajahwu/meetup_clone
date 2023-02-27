'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email, firstName, lastName } = this;
      return {id, username, email, firstName, lastName };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static async login({credential, password}) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if(user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ username, email, password, firstName, lastName }) {
      const hashedPassword = bcrypt.hashSync(password);
      if(!username) {
        username = null
      }
      const user = await User.create({
        username,
        email,
        hashedPassword,
        firstName,
        lastName
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      User.hasMany(models.Attendance, { foreignKey: 'userId', onDelete: 'CASCADE', hook: true })
      User.hasMany(models.Group, { foreignKey: 'organizerId', onDelete: 'CASCADE', hook: true  })
      User.hasMany(models.Membership, { foreignKey: 'userId', onDelete: 'CASCADE', hook: true  })
      User.belongsToMany(models.Group, {
        through: models.Membership,
        foreignKey: 'userId',
        otherKey: 'groupId'
      })
      User.belongsToMany(models.Event, 
        { through: models.Attendance,
          foreignKey: 'userId',
          otherKey: 'eventId'
        })
    }
  }
  User.init({
    username: {
      allowNull: true,
      type: DataTypes.STRING(30),
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if(value && Validator.isEmail(value)) {
            throw new Error("Cannot be an email")
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60],
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'email', 'hashedPassword']
      }
    },
    scopes: {
      currentUser: {
        attributes: {
          exclude: ['hashedPassword']
        }
      },
      loginUser: {
        attributes: {}
      }
    },
  });
  return User;
};