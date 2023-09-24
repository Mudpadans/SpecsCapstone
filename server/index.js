require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 4000;
const CONNECTION_STRING = process.env.CONNECTION_STRING; 

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres', 
  logging: false,
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connected')
  
    const Patient = require('./models/patient'); 
    const Doctor = require('./models/doctor');
    const Appointment = require('./models/appointment');

    Patient.init(sequelize);
    Doctor.init(sequelize);
    Appointment.init(sequelize);

    app.use(express.json());
    app.use(cors());

    const userController = require('./controllers/users');
    const appointmentController = require('./controllers/appointments');

    app.post('/signup', userController.signup);
    app.post('/login', userController.login);
    app.post('/refresh', userController.refresh);

    app.post('/createAppointment', appointmentController.createAppointment);
    app.get('/getAppointments', appointmentController.getAppointments);
    app.get('/getDetails/:appointment_id', appointmentController.getDetails);
    app.put('/updateAppointment/:appointment_id', appointmentController.updateAppointment);
    app.delete('/deleteAppointment/:appointment_id', appointmentController.deleteAppointment);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log('Error connecting to the database', err));