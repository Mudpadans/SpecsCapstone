
const { DataTypes } = require('sequelize')
const {sequelize} = require('../database')
const { Doctor } = require('./doctor')
const { Patient } = require('./patient')

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    patient_id: DataTypes.UUID,
    doctor_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    appointment_date: DataTypes.DATE,
    status: {
        type: DataTypes.ENUM(
            'Pending', 
            'Confirmed', 
            'Canceled', 
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
    })

Appointment.belongsTo(Patient, { as: 'Patient', foreignKey: 'patient_id' });
Appointment.belongsTo(Doctor, { as: 'Doctor', foreignKey: 'doctor_id' });

module.exports = {
    Appointment: Appointment
}