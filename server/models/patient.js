const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

const {Sequelize} = require('sequelize')
const {CONNECTION_STRING} = process.env; 

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres', 
  logging: false,
});

module.exports = {
    Patient: sequelize.define('Patient', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        user_type: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING, 
        phone_number: DataTypes.INTEGER,
        dob: DataTypes.DATE,
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
    })
}