
const { DataTypes, Model } = require('sequelize')

const {sequelize} = require('../database')

module.exports = {
    Appointment: sequelize.define('Appointment', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        patient_id: DataTypes.UUID,
        doctor_id: DataTypes.UUID,
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
}
