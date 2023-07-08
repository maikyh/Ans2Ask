import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('ans2ask', 'maikyh', '11maiky11', {
  host: 'localhost',
  dialect: 'postgres'
});