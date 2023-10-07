const Doctor = require('./doctor');
const Patient = require('./patient');
const Appointment = require('./appointment');

Doctor.hasMany(Appointment, { foreignKey: 'doctor_id' });
Patient.hasMany(Appointment, { foreignKey: 'patient_id' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctor_id' });
Appointment.belongsTo(Patient, { foreignKey: 'patient_id' });

module.exports = {
    Doctor,
    Patient,
    Appointment
}