import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Token = sequelize.define('Token', {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});