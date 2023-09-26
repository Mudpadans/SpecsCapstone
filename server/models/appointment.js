
const sequelize = require('../database');
const { DataTypes, Model } = require('sequelize');

class Appointment extends Model {
}
console.log(sequelize)

Appointment.init({
    patientId: {
        type: DataTypes.UUID, // Assuming UUIDs are used
        allowNull: false,
    },
    doctorId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Confirmed', 'Canceled', 'Completed'),
        defaultValue: 'Pending',
        allowNull: false,
    },
    appointmentType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    appointmentText: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Appointment',
    timestamps: true,
});

module.exports = Appointment;
