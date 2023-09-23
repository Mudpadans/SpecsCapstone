const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    appointment_date: Date,
    status: {
        type: String,
        enum: [
            'Pending',
            'Confirmed',
            'Canceled',
            'Completed'
        ],
        default: 'Pending',
        required: true
    },
    appointment_type: { type: String, required: true},
    appointment_text: { type: String, required: true},
}, { timestamps: true })

module.exports = mongoose.model('Appointment', appointmentSchema);