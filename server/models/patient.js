const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

const {sequelize} = require('../database')

module.exports = {
    Patient: sequelize.define('Patient', {
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
        password: DataTypes.STRING, 
        phone_number: DataTypes.BIGINT,
        dob: DataTypes.DATE,
        medical_history: DataTypes.STRING,
    }, {
        hooks: {
            beforeCreate: async (patient) => {
                patient.password = await bcrypt.hash(patient.password, 10);
            },
            beforeUpdate: async (patient) => {
                if (patient.changed('password')) {
                    patient.password = await bcrypt.hash(patient.password, 10);
                }
            }
        },
        sequelize,
        modelName: 'Patient',
        timestamps: true,
    })
}