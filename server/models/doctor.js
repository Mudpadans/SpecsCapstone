const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const doctorSchema = new mongoose.Schema({
    user_type: { type: String},
    first_name: { type: String},
    last_name: { type: String},
    email: { type: String},
    password: { type: String},
    phone_number: { type: Number},
    dob: { type: Date},
    credentials: { type: String},
    specializations: { type: String},
}, { timestamps: true });

doctorSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('Doctor', doctorSchema);