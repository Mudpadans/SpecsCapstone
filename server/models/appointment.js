
const { DataTypes, Model } = require('sequelize')

const {sequelize} = require('../database')

class Appointment extends Model {
}

Appointment.init({
    patientId: {
        type: DataTypes.UUID,
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
