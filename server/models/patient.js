const { DataTypes } = require('sequelize');
const {sequelize} = require('../database');

const Patient = sequelize.define('Patient', {
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
    immunizations: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    surgeries: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    hospitalizations: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    medications: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    allergies: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    weight: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Patient',
    timestamps: true,
    underscored: true
})

module.exports = Patient