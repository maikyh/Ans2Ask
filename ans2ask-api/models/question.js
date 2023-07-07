import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Question = sequelize.define('Question', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  }
});