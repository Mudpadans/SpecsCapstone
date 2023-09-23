const { DataTypes, Model, sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');

class Patient extends Model {
    // Add a hook for password hashing
    static init(sequelize) {
        super.init({
            // Fields
            user_type: { type: DataTypes.STRING, allowNull: false },
            first_name: { type: DataTypes.STRING, allowNull: false },
            last_name: { type: DataTypes.STRING, allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false },
            password: { type: DataTypes.STRING, allowNull: false },
            phone_number: { type: DataTypes.INTEGER, allowNull: false },
            dob: { type: DataTypes.DATE, allowNull: false },
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
        });
    }
}

module.exports = Patient;
