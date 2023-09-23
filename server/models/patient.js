const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const patientSchema = new mongoose.Schema({
    user_type: { type: String, required: true},
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    phone_number: { type: Number, required: true},
    dob: { type: Date, required: true},
    medical_history: String,
}, { timestamps: true });

patientSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('Patient', patientSchema);