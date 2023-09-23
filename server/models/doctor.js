const { DataTypes, Model, sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');


class Doctor extends Model {
    // Add a hook for password hashing
    static init(sequelize) {
        super.init({
            // Fields
            user_type: DataTypes.STRING,
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            phone_number: DataTypes.INTEGER,
            dob: DataTypes.DATE,
            credentials: DataTypes.STRING,
            specializations: DataTypes.STRING,
        }, {
            hooks: {
                beforeCreate: async (doctor) => {
                    doctor.password = await bcrypt.hash(doctor.password, 10);
                },
                beforeUpdate: async (doctor) => {
                    if (doctor.changed('password')) {
                        doctor.password = await bcrypt.hash(doctor.password, 10);
                    }
                }
            },
            sequelize,
            modelName: 'Doctor',
            timestamps: true,
        });
    }
}

module.exports = Doctor;
