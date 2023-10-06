const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const {sequelize} = require('../database')

module.exports = {
    Doctor: sequelize.define('Doctor', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        user_type: DataTypes.STRING,
        first_name: DataTypes.STRING, 
        last_name: DataTypes.STRING, 
        email: DataTypes.STRING,
        password: DataTypes.TEXT,
        phone_number: DataTypes.BIGINT,
        dob: DataTypes.DATE,
        credentials: DataTypes.STRING,
        specializations: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Doctor',
        timestamps: true,
    })
}
