import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Question = sequelize.define('Question', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  subject: {
    type: DataTypes.ENUM,
    values: ['All', 'Informatics', 'Mathematics', 'Biology', 'Health', 'Art', 'Business', 'Law', 'Investment', 'History', 'Videogames', 'Chemistry', 'Physics', 'Animation', 'Geography', 'SAT', 'Food', 'Languages'],
    allowNull: false
  },
  coins: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  clicks: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mapOfWords: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});