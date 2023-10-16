
const { DataTypes } = require('sequelize')
const { sequelize } = require('../database')

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    patient_id: DataTypes.INTEGER,
    doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    appointment_date: DataTypes.DATE,
    status: {
        type: DataTypes.ENUM(
            'Pending', 
            'Confirmed',
            'Completed'
        ),
        defaultValue: 'Pending',
    },
    appointment_type: DataTypes.STRING,
    appointment_text: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'Appointment',
    timestamps: true,
    underscored: true
    })

module.exports = Appointment;