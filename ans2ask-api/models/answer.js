import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Answer = sequelize.define('Answer', {
	body: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	thanks: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	},
	questionId: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
});