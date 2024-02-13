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
      this.hasOne(models.User, {
        foreignKey: {
          name: 'birthday',
          allowNull: false
        }
      });
    }
  }
  Event.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    note: {
      type: DataTypes.TEXT
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    duration: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};